<template>
  <div id="app">
    <div id="top">
      <img
        id="logo"
        alt="CRAWL logo"
        src="./assets/images/logo.png"
      >
    </div>
    <NavBar v-bind:user="user" />
    <div>
      <router-view />
    </div>
    <GoogleMap
      v-show="false"
      :userLocation.sync="userLocation"
    />
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from './components/NavBar.vue';
import GoogleMap from './components/GoogleMap.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    GoogleMap,
  },
  data() {
    return {
      crawlDate: null,
      title: null,
      user: {},
      places: [],
      markers: [],
      userLocation: {},
    };
  },
  watch: {
    // whenever userlocation changes, this function will run
    // userLocation: function () {
    //   // update user's location in the user table
    //   axios.put(`/api/user/${this.user.id}`, this.userLocation)
    // },
    // after a user is logged in and stored in state, put their crawls in the global object
    user() {
      axios.get(`/api/crawl/one/${this.user.id}`)
        .then((response) => {
          this.$store.createdCrawls = response.data;
        })
        .then(() => {
          axios.put(`/api/user/${this.user.id}`, this.userLocation);
        })
        .then(() => {
          // update the joined crawls array on the store, hopefully triggering renders elsewehere
          axios.get(`/api/crawl/joined/${this.user.id}`)
            .then((response) => {
              response.data.forEach(joined => {
                axios.get(`/api/crawl/details/${joined.Id_Crawl}`)
                  .then(res => {
                    // don't include crawls the user created in joinedCrawls
                    if (res.data[0].Id_Creator !== this.user.id) {
                      const joinedCrawlIds = [];
                      this.$store.joinedCrawls.forEach((crawl) => {
                        joinedCrawlIds.push(crawl.Id);
                      });
                      // check for duplicates in the database
                      if (!joinedCrawlIds.includes(res.data[0].Id)) {
                        this.$store.joinedCrawls.push(res.data[0]);
                      }
                    }
                  });
              });
            });
          this.showLocation = true;
        });
    },
  },
  created() {
    // create an axios get reques to grab the user information and check if they are logged in
    axios.get('/api/auth/google/login')
      .then((response) => {
        if (response.data.redirect === '/') {
          const { user, email, image } = response.data;
          axios.get(`/api/user/${email}`)
            .then(({ data }) => {
              console.log(data, 'app created');
              const { Id, Phone_Number } = data[0];
              this.user = {
                id: Id,
                name: user,
                email,
                image,
                phoneNumber: Phone_Number,
              };
              this.$store.appUser = {
                id: Id,
                name: user,
                email,
                image,
                phoneNumber: Phone_Number,
              };
            });
        } else if (response.data.redirect === '/login') {
          window.location.href = '/api/auth/google/callback/';
        }
      })
      .catch((error) => {
        alert(error);
        window.location = '/login';
      });
  },
};
</script>

<style scoped>
  @import "./assets/styles/app.scss";
</style>

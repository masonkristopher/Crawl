<template>
  <div id="app">
    <div id="top">
      <img id="logo" alt="CRAWL logo" src="./assets/images/logo.png">
    </div>
    <NavBar v-bind:user="user"/>
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
          axios.put(`/api/user/${this.user.id}`, this.userLocation)
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
            .then((response) => {
              console.log(response, 'app created');
              const { Id, Phone_Number } = response.data[0];
              this.user = {
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

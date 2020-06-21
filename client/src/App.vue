<template>
  <div id="app">
    <div id="logo-area">
      <NavBar v-bind:user="user"/>
      <img id="logo" alt="CRAWL logo" src="./assets/images/logo.png">
    </div>
    <div>
      <router-view></router-view>
    </div>
    <GoogleMap v-show="false" :userLocation.sync="userLocation"></GoogleMap>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import GoogleMap from './components/GoogleMap'
import axios from 'axios'

export default {
  name: "App",
  components: {
    NavBar,
    GoogleMap,
  },
  data () {
    return {
      crawlDate: null,
      title: null,
      user: {},
      places: [],
      markers: [],
      userLocation: {},
    }
  },
  watch: {
    // whenever userlocation changes, this function will run
    userLocation: function () {
      // update user's location in the user table
      axios.put(`${process.env.VUE_APP_MY_IP}/api/user/`, this.userLocation)
    },
    // after a user is logged in and stored in state, put their crawls in the global object
    user: function () {
      axios.get(`${process.env.VUE_APP_MY_IP}/api/crawl/one/${this.user.id}`)
        .then((response) => {
          this.$store.createdCrawls = response.data;
        })
    },
  },
  created () {
    // create an axios get reques to grab the user information and check if they are logged in
    axios.get('/api/auth/google/login')
      .then(response => {
        if (response.data.redirect === '/') {
          const { user, email, image } = response.data
          axios.get(`${process.env.VUE_APP_MY_IP}/api/user/${email}`)
            .then((response) => {
              console.log(response, 'app created')
              this.user = {id: response.data[0].Id,
                      name: user,
                      email: email,
                      image
                    }
              })
        } else if (response.data.redirect === '/login') {
          window.location.href = 'api/auth/google';
        }
      })


      .catch(function (error) {
        alert(error);
        // window.location = "/login"
      })
  },
};
</script>

<style scoped>
  @import "./assets/styles/app.scss";
</style>

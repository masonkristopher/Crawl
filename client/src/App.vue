<template>
  <div id="app">
    {{userLocation}} in App
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
      console.log('watched')
    }
  },
  created () {
    // create an axios get reques to grab the user information and check if they are logged in
    axios.get('/api/auth/google/login')
      .then(response => {
        if (response.data.redirect === '/') {
          const { userId, user, email, image } = response.data
          this.user = {id: userId,
                       name: user,
                       email: email,
                       image
                      }
        } else if (response.data.redirect === '/login') {
          window.location.href = 'api/auth/google';
        }
      })
      .then(() => {
        axios.get(`${process.env.VUE_APP_MY_IP}/api/user/${this.user.email}`)
          .then((response) => {
            console.log(response);
            this.user.id = response.data[0].Id;
          })
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

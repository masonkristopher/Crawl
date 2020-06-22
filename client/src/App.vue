<template>
  <div id="app">
    <div id="top">
      <img id="logo" alt="CRAWL logo" src="./assets/images/logo.png">
    </div>

    <div>
      <NavBar v-bind:user="user"/>
    </div>

    <notifications group="success" classes="notif" position="top center" />
    <notifications group="failure" classes="notif" position="left center" />

    <router-view> </router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import axios from 'axios'

export default {
  name: "App",
  components: {
    NavBar,
  },
  data () {
    return {
      crawlDate: null,
      title: null,
      user: {},
      places: [],
      markers: [],
    }
  },
  created () {
    // create an axios get reques to grab the user information and check if they are logged in
    axios.get('/api/auth/google/login')
      .then(response => {
        if (response.data.redirect === '/') {
          const { user, email, image } = response.data
          this.user = {
                       name: user,
                       email: email,
                       image,
                       phoneNumber: null
                      }
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

<style>
@import "./assets/styles/app.css";
</style>

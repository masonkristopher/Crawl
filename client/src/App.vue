<template>
  <div id="app">
    <div>
      <img id="logo" alt="CRAWL logo" src="./assets/images/logo.png">
      <h1>hello {{this.user}} your email is {{this.email}}</h1>
    </div>

    <div>
      <NavBar/>
    </div>

    <router-view></router-view>
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
      user: '',
      email: '',
      places: [],
      markers: [],
    }
  },
  created () {
    // create an axios get reques to grab the user information and check if they are logged in
    axios.get('/api/auth/google/login')
      .then(response => {
        if (response.data.redirect === '/') {
          alert(`welcome! ${response.data.user} your email is ${response.data.email}`)
          this.user = response.data.user;
          this.email = response.data.email;
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

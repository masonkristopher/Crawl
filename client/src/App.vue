<template>
  <div id="app">
    <div id="logo-area">
      <NavBar v-bind:user="user"/>
      <img id="logo" alt="CRAWL logo" src="./assets/images/logo.png">
    </div>
    <div>
      <router-view></router-view>
    </div>
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

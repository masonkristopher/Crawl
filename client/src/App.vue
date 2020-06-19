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
          const { user, email, image } = response.data
          axios.get(`${process.env.VUE_APP_MY_IP}/api/user/${email}`)
            .then((response) => {

              this.user = {id: response.data[0].Id,
                           name: user,
                           email,
                           image
                          }
            })
        } else if (response.data.redirect === '/login') {
          window.location.href = 'api/auth/google';
        }
        /// save user location to database
      })
      .catch(function (error) {
        alert(error);
        window.location = "/login"
      })
  },
};
</script>

<style scoped>
  @import "./assets/styles/app.scss";
</style>

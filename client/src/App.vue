<template>
  <div id="app">
    <div>
      <img id="logo" alt="CRAWL logo" src="./assets/images/logo.png">
    </div>
    <div>
      <!-- syncing App's crawlDate and title with CreateCrawl's crawlDate and title -->
      <CreateCrawl :crawlDate.sync="crawlDate" :title.sync="title" />
      <NavBar/>
    </div>
    <div>
      <google-map />
    </div>
  </div>
</template>

<script>
// import GoogleLogin from "./components/GoogleLogin";
import NavBar from './components/NavBar.vue'
import GoogleMap from './components/GoogleMap'
import CreateCrawl from './components/CreateCrawl'
import axios from 'axios'

export default {
  name: "App",
  components: {
    // GoogleLogin,
    NavBar,
    GoogleMap,
    CreateCrawl,
  },
  data () {
    return {
      crawlDate: null,
      title: null,
      user: '',
    }
  },
  created () {
    // create an axios get reques to grab the user information and check if they are logged in
    axios.get('/api/auth/google/login')
      .then(function (response) {
        if (response.data.redirect === '/') {
          alert(`welcome ${response.data.user}`)
          this.user = response.data.user;
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

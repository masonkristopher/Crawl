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
import NavBar from './components/NavBar.vue'
import GoogleMap from './components/GoogleMap'
import CreateCrawl from './components/CreateCrawl'

export default {
  name: "App",
  components: {
    NavBar,
    GoogleMap,
    CreateCrawl,
  },
  data () {
    return {
      crawlDate: null,
      title: null,
    }
    GoogleMap
  }
};
</script>

<style>
@import "./assets/styles/app.css";
</style>

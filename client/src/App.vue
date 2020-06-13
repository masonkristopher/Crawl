<template>
  <div id="app">
    <div>
      <NavBar/>
    </div>
    <div>
      <CreateCrawl :crawlDate.sync="crawlDate" />
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
  name: 'App',
  components: {
    NavBar,
    GoogleMap,
    CreateCrawl,
  },
  data () {
    return {
      crawlDate: null,
    }
  }
}
</script>

<style>
 @import './assets/styles/app.css';
</style>

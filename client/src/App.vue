<template>
  <div id="app">
    <div>
      <img id="logo" alt="CRAWL logo" src="./assets/images/logo.png">
    </div>
    <div>
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

export default {
  name: 'App',
  components: {
    NavBar,
    GoogleMap
  }
}
</script>

<style>
 @import './assets/styles/app.css';
</style>

<template>
  <div id="app">
    <img id="header-img" alt="CRAWL logo" src="./assets/logo.png">
    <HelloWorld msg="poop lol"/>
    <google-map />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import GoogleMap from './components/GoogleMap'

export default {
  name: 'App',
  components: {
    HelloWorld,
    GoogleMap
  }
}
</script>

<style>
 @import './assets/styles/app.css';
</style>

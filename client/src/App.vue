<template>
  <div id="app">
    <img id="header-img" alt="CRAWL logo" src="./assets/logo.png">
    <HelloWorld msg="poop lol"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
 @import './assets/styles/app.css';
</style>

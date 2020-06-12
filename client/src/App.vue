<template>
  <div id="app">
    <div>
      <NavBar/>
    </div>
    <div>
      <HelloWorld msg="poop lol"/>
    </div>
    <div>
      <google-map />
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue'
import GoogleMap from './components/GoogleMap'

export default {
  name: 'App',
  components: {
    NavBar,
    HelloWorld,
    GoogleMap
  }
}
</script>

<style>
 @import './assets/styles/app.css';
</style>

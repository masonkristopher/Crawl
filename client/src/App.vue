<template>
  <div id="app">
    <div>
      <NavBar/>
    </div>
    <div>
      <HelloWorld msg="poop lol"/>
    </div>    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    HelloWorld
  }
}
</script>

<style>
 @import './assets/styles/app.css';
</style>

<template>
  <div class='nav-bar'>
    <SideBar id="sidebar-button" v-bind:user="user"/>
    <router-link class="nav-link" to="/home">Home</router-link>
    <router-link class="nav-link" to="/create">Create</router-link>
  </div>
</template>

<script>
import SideBar from './SideBar.vue'

export default {
  name: 'NavBar',
  components: {
        SideBar,
  },
  props: ['user'],
}
</script>

<style scoped>
@import '../assets/styles/navbar.scss';

</style>
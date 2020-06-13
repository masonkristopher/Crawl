<template>
<div class='nav-bar'>
        <SideBar id="sidebar-button" />
        <a class="nav-link" href="default.asp">Home</a>
        <a class="nav-link" href="default.asp">Create</a>
  </div>

</template>

<script>
import SideBar from './SideBar.vue'

export default {
  name: 'NavBar',
  components: {
        SideBar,
  },
  props: {
    msg: String
  }
}
</script>

<style>
@import '../assets/styles/navbar.scss';

</style>
<template>
<div class='nav-bar'>
        <img id="logo" alt="CRAWL logo" src="../assets/logo.png">
        <a class="nav-link" href="default.asp">Home</a>
        <a class="nav-link" href="default.asp">Profile</a>
  </div>

</template>

<script>
export default {
  name: 'NavBar',
  props: {
    msg: String
  }
}
</script>

<style>
@import '../assets/styles/navbar.scss';

</style>
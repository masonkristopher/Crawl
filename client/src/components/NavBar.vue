<template>
  <div class="nav-bar">
    <SideBar
      id="sidebar-button"
      :user="user"
    />
    <router-link
      class="nav-link"
      to="/create"
    >
      Create
    </router-link>
  </div>
</template>

<script>
import SideBar from './SideBar.vue';

export default {
  name: 'NavBar',
  components: {
    SideBar,
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style>
@import '../assets/styles/navbar.scss';
</style>

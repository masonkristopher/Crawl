<template>
    <div id="Dashboard">
      <google-map :places.sync="places" :markers.sync="markers"/>
    </div>
</template>

<script>
  import GoogleMap from '../GoogleMap'
  
  export default {
    name: "Dash",
    components: {
      GoogleMap,
    },
    data () {
      return {
        user: '',
        places: [],
        markers: [],
      }
    },
  }
</script>

<style>
@import '../../assets/styles/dash.scss';
</style>
<template>
  <div id="create-component">
    <ul id="crawl-forms">
      <li><input type="text" name="title" v-model="title" @input="$emit('update:title', title)"></li>
      <li><input type="datetime-local" name="datetime" v-model="crawlDate" @input="$emit('update:crawlDate', crawlDate)"></li>
      <button v-on:click.stop="saveCrawl(); saveLocations();">
        Save crawl
      </button>
    </ul>

    <div>
      <google-map :places.sync="places" :markers.sync="markers"/>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import GoogleMap from './components/GoogleMap'

export default {
  name: 'CreateCrawl',
  components: {
    GoogleMap,
  },
  data () {
    return {
      crawlDate: null,
      title: null,
      user: '',
      places: [],
      markers: [],
    }
  },
  methods: {
    saveCrawl: function () {
      const { crawlDate, title } = this.$parent;
      const date = crawlDate.split("T")[0];
      const time = crawlDate.split("T")[1];
      axios.post(`${process.env.VUE_APP_MY_IP}/api/crawl/add`, {
        title: title,
        crawlDate: date,
        crawlTime: time,
      })
      .catch((err) => {
        console.log(err, 'save crawl in createCrawl');
      })
    },

    saveLocations: function () {
      const { places, markers } = this.$parent;
      let locations = [];
      for (let x = 0; x < markers.length; x++) {
        locations.push({
          name: markers[x].position.name,
          streetNumber: places[x].address_components[0].long_name,
          street: places[x].address_components[1].short_name,
          city: places[x].address_components[3].short_name,
          state: places[x].address_components[5].short_name,
          zip: places[x].address_components[7].short_name,
          lat: markers[x].position.lat,
          lon: markers[x].position.lng,
          formatted: places[x].formatted_address,
        })
      }
      locations.forEach((location) => {
        axios.post('http://localhost:8081/api/location/add', location)
          .catch((err) => {
            console.log(err, 'error in savelocation in createcrawl')
          })
      });
    }
  }
}
</script>

<style>
@import '../assets/styles/createcrawl.scss';
</style>
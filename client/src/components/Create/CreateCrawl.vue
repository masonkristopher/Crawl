<template>
  <div id="create-component">
    <ul id="crawl-forms">
      <li>Title: <br><input type="text" name="title" v-model="title" @input="$emit('update:title', title)"></li>
      <br>
      <br>
      <li>Time & Date: <br><input type="datetime-local" name="datetime" v-model="crawlDate" @input="$emit('update:crawlDate', crawlDate)"></li>
      <br>
      <button v-on:click.stop="saveCrawl">
        Save crawl
      </button>
    </ul>

    <div>
      <google-map id="create-map" :places.sync="places" :markers.sync="markers"/>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import GoogleMap from '../GoogleMap'

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
      const { crawlDate, title } = this;
      const date = crawlDate.split("T")[0];
      const time = crawlDate.split("T")[1];
      let crawlId = null;
      console.log('test');
      axios.post(`${process.env.VUE_APP_MY_IP}/api/crawl/add`, {
        // idCreator: this.$parent.user.id,
        title: title,
        crawlDate: date,
        crawlTime: time,
      })
        .then((response) => {
          crawlId = response.data.insertId;
          console.log(response, 'insert id');
          return this.saveLocations();
          //iterate through places
          // insert location id with crawl id
          // data.insertId
        })
        .then(() => {
          const { markers } = this;
          const locations = Promise.all(markers.map((marker) => {
            return axios.get(`/api/location/${marker.position.lat}+${marker.position.lng}`)
          }))
          return locations;
        })
        .then((response) => {
          // response.data
          console.log('array1', response);
          console.log(crawlId);
        })
        .catch((err) => {
          console.log(err, 'save crawl in createCrawl');
        })
        
// const asyncMap = (tasks, callback) => {
//   //convert our tasks to an array of promises
//   let promisifiedTasks = tasks.map((task) => {
//     return new Promise(task);
//   });
  
//   //promise.all will return a single promise that fulfills only when each promise passed to it has fulfilled
//   return Promise.all(promisifiedTasks)
//     .then((values) => {callback(values);});
// };
    },

    saveLocations: function () {
      const { places, markers } = this;
      let locations = [];
      for (let x = 0; x < markers.length; x++) {
        const { address_components, formatted_address } = places[x];
        const { position } = markers[x];
        locations.push({
          name: position.name,
          streetNumber: address_components[0].long_name,
          street: address_components[1].short_name,
          city: address_components[3].short_name,
          state: address_components[5].short_name,
          zip: address_components[7].short_name,
          lat: position.lat,
          lon: position.lng,
          formatted: formatted_address,
        })
      }
      locations.forEach((location) => {
        axios.post(`${process.env.VUE_APP_MY_IP}/api/location/add`, location)
          .catch((err) => {
            console.log(err, 'error in savelocation in createcrawl')
          })
      });
    }
  }
}
</script>

<style>
@import '../../assets/styles/createcrawl.scss';
</style>
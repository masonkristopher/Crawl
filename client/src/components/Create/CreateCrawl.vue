<template>
  <div id="create-component">
    <ul id="crawl-forms">
      <!-- make App listen to changes in title by using emit and v-model -->
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
      <google-map id="create-map" :selected.sync="selected"/>
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
      selected: [],
    }
  },
  methods: {
    //saves crawl to the database
    saveCrawl: function () {
      const { crawlDate, title } = this;
      const date = crawlDate.split("T")[0];
      const time = crawlDate.split("T")[1];
      let crawlId = null;
      let order = 1;
      axios.post(`${process.env.VUE_APP_MY_IP}/api/crawl/add`, {
        // idCreator: this.$parent.user.id, ??
        title: title,
        crawlDate: date,
        crawlTime: time,
      })
        .then((response) => {
          // save locations to database, and store the crawlId that was just created
          crawlId = response.data.insertId;
          return this.saveLocations();
        })
        .then(() => {
          // get locations from the database
          const { selected } = this;
          selected.map((location) => {
            axios.get(`${process.env.VUE_APP_MY_IP}/api/location/${location.lat}+${location.lng}`)
              .then((data) => {
                // add locationId + crawlId + order to location_crawl table
                data.data.forEach((response) => { 
                axios.post(`${process.env.VUE_APP_MY_IP}/api/join/lc/${response.Id}+${crawlId}+${order}`)
                order++;
                })
              })
          })
        })
        .catch((err) => {
          console.log(err, 'unable to save crawl');
        })

    },

    saveLocations: function () {
      const { selected } = this;
      // add locations to database
      selected.forEach((location) => {
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
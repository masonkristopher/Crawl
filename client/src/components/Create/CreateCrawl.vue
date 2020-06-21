<template>
  <div id="create-crawl">
    <br/>
      <ul id="crawl-forms">
        <!-- make App listen to changes in title by using emit and v-model -->
        <li>Name your crawl: <br><input type="text" name="title" v-model="title" @input="$emit('update:title', title)"></li>
        <br>
        <br>
        <li>When is your crawl? <br><input type="datetime-local" name="datetime" v-model="crawlDate" @input="$emit('update:crawlDate', crawlDate)"></li>
        <br>
        <button v-on:click.stop="saveCrawl">
          Save crawl
        </button>
        <div v-if="crawlId !== null">
          <h3>Give this to your friends to have them join:</h3>
          <h3 >{{url}}/crawl/joined/{{this.$parent.user.id}}/{{this.title}}/{{crawlId}}</h3>
        </div>
      </ul>
      <google-map id="create-map" :selected.sync="selected"/>

    
    
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
      selected: [],
      crawlId: null,
      url: process.env.VUE_APP_MY_IP,
    }
  },
  methods: {
    //saves crawl to the database
    saveCrawl: function () {
      const { crawlDate, title } = this;
      const date = crawlDate.split("T")[0];
      const time = crawlDate.split("T")[1];
      let order = 1;
      axios.post(`${process.env.VUE_APP_MY_IP}/api/crawl/add`, {
        // idCreator: this.$parent.user.id,
        idCreator: this.$parent.user.id,
        title: title,
        crawlDate: date,
        crawlTime: time,
      })
        .then((response) => {
          // save locations to database, and store the crawlId that was just created
          this.crawlId = response.data.insertId;
          // ********************* this.$parent.user.id instead of 1 *****************
          this.saveUserCrawl(this.$parent.user.id, this.crawlId);
          return this.saveLocations();
        })
        .then(() => {
          // get locations from the database
          const { selected } = this;
          const promises = selected.map((location) => 
            axios.get(`${process.env.VUE_APP_MY_IP}/api/location/${location.name}`)
          )
          //promise.all ensures each promise resolves before moving on
          return Promise.all(promises)
        })
        .then((data) => {
          // add locationId + crawlId + order to location_crawl table
          data.forEach((response) => {
            axios.post(`${process.env.VUE_APP_MY_IP}/api/join/lc/${response.data[0].Id}+${this.crawlId}+${order}`)
            order++;
          })
        })
        .then(() => {
          // update our global data so navbar can update
         axios.get(`${process.env.VUE_APP_MY_IP}/api/crawl/one/${this.$parent.user.id}`)
        .then((response) => {
          this.$store.createdCrawls = response.data;
         })
        })
        .catch((err) => {
          console.log(err, 'unable to save crawl');
        })
    },

    saveLocations: function () {
      const { selected } = this;
      // add locations to database
      const promises = selected.map((location) => {
        return axios.post(`${process.env.VUE_APP_MY_IP}/api/location/add`, location)
      });
      return Promise.all(promises);
    },

    saveUserCrawl: function(userId, crawlId) {
      axios.post(`${process.env.VUE_APP_MY_IP}/api/join/uc/${userId}+${crawlId}`)
        .catch((err) => {
          console.log(err);
        })
    },
  }
}
</script>

<style scoped>
  @import '../../assets/styles/createcrawl.scss';
</style>

<template>
  <div id="create">
    <ul id="crawl-forms">
      <!-- make App listen to changes in title by using emit and v-model -->
      <li><label class="form_label">Title: </label><br><input class="form_field crawl-title" type="text" autocomplete="off" name="title" v-model="title" @input="$emit('update:title', title)"></li>
      <br><br><br><br><br>
      <li><label class="form_label">Time & Date:</label><br><input class="form_field crawl-time-date" type="datetime-local" name="datetime" v-model="crawlDate" @input="$emit('update:crawlDate', crawlDate)"></li>
      <br>
      <button id="save-crawl-button" v-on:click.stop="saveCrawl">
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
        // idCreator: this.$parent.user.id,
        idCreator: 1,
        title: title,
        crawlDate: date,
        crawlTime: time,
      })
        .then((response) => {
          // save locations to database, and store the crawlId that was just created
          crawlId = response.data.insertId;
          // ********************* this.$parent.user.id instead of 1 *****************
          this.saveUserCrawl(1, crawlId);
          return this.saveLocations();
        })
        .then(() => {
          // get locations from the database
          const { selected } = this;
          const promises = selected.map((location) => 
            axios.get(`${process.env.VUE_APP_MY_IP}/api/location/${location.name}`)
          )
          console.log(promises, 'promises');
          //promise.all ensures each promise resolves before moving on
          return Promise.all(promises)
        })
        .then((data) => {
          // add locationId + crawlId + order to location_crawl table
          data.forEach((response) => {
            axios.post(`${process.env.VUE_APP_MY_IP}/api/join/lc/${response.data[0].Id}+${crawlId}+${order}`)
            order++;
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

<style>
@import '../../assets/styles/createcrawl.scss'
</style>
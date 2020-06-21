<template>
<div>
  <h1>Viewing crawl locations for {{ crawlName }}</h1>
  <button v-on:click="join">Join</button>
  <div>
    <Map :userId.sync="userId" :crawlId.sync="crawlId">
  </div>
</div>
</template>

<script>
import axios from "axios";
import Map from "./Gmap.vue";

export default {
  name: "JoinedCrawl",
  components: {
    Map,
  },
  data() {
    return {
      userId: this.$route.params.userId,
      crawlId: this.$route.params.crawlId,
      crawlName: this.$route.params.crawlName,
    }
  },
  methods: {
    join() {
      axios.post(`${process.env.VUE_APP_MY_IP}/api/crawl/join/${this.crawlId}/${this.userId}`)
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}
</script>

<style>

</style>
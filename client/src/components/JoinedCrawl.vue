<template>
<div>
  <h1>Viewing crawl locations for {{ crawlName }}</h1>
  <button v-on:click="join">Join</button>
  <div>
    <Map v-bind:userId="userId" v-bind:crawlId="crawlId" />
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
      /////* ********** this should be this.$parent.user.id, cuz we want it to be the person who logged in
      userId: this.$route.params.userId,
      crawlId: this.$route.params.crawlId,
      crawlName: this.$route.params.crawlName,
    }
  },
  methods: {
    join() {
      console.log(this.$route.params)
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

<style scoped>
  @import "../assets/styles/joinedcrawl.scss"
</style>
<template>
<div>
  <h1>Viewing crawl locations for {{ crawl.Title }} on {{crawl.Crawl_Date}} at {{crawl.Crawl_Time}}</h1>
  <div>
    <Map v-bind:userId="userId" v-bind:crawlId="crawlId"/>
  </div>
</div>
</template>

<script>
import Map from "./Gmap.vue";
import axios from "axios"

export default {
  name: "JoinedCrawl",
  components: {
    Map,
  },
  data() {
    return {
      userId: this.$parent.user.id,
      crawlId: this.$route.params.crawlId,
      // crawlName: this.$route.params.crawlName,
      crawl: {},

    }
  },
  mounted() {
    axios.get(`api/crawl/details/${this.$route.params.crawlId}`)
      .then((response) => {
        this.crawl = response.data[0];
      })
  }
}
</script>

<style scoped>
  @import "../assets/styles/joinedcrawl.scss"
</style>
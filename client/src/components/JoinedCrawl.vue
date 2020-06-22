<template>
<div>
  <h1>Viewing crawl locations for {{ crawlName }}</h1>
  <div>
    <Map v-bind:userId="userId" v-bind:crawlId="crawlId"/>
  </div>
</div>
</template>

<script>
import Map from "./Gmap.vue";

export default {
  name: "JoinedCrawl",
  components: {
    Map,
  },
  data() {
    return {
      userId: this.$parent.user.id,
      crawlId: this.$route.params.crawlId,
      crawlName: this.$route.params.crawlName,
    }
  },
}
</script>

<style scoped>
  @import "../assets/styles/joinedcrawl.scss"
</style>
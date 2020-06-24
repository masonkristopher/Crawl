<template>
  <div>
    <h1>
      Viewing bars for {{ crawl.Title }} on {{ new Date(Date.parse(crawl.Crawl_Date)).toDateString() }} at {{ crawl.Crawl_Time }}
    </h1>
    <div>
      <Map
        :userId="userId"
        :crawlId="crawlId"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Map from './Gmap.vue';

export default {
  name: 'JoinedCrawl',
  components: {
    Map,
  },
  data() {
    return {
      userId: this.$parent.user.id,
      crawlId: this.$route.params.crawlId,
      // crawlName: this.$route.params.crawlName,
      crawl: {},
    };
  },
  mounted() {
    axios.get(`api/crawl/details/${this.$route.params.crawlId}`)
      .then(({ data }) => {
        [this.crawl] = data;
      });
  },
};
</script>

<style scoped>
  @import '../assets/styles/joinedcrawl.scss'
</style>

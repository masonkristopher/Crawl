<template>
  <div>
    <h1>Viewing crawl locations for {{ crawl.Title }} on {{ new Date(Date.parse(crawl.Crawl_Date)).toDateString() }} at {{ crawl.Crawl_Time }}</h1>
    <Participants />
    <div>
      <CrawlMap
        v-bind:userId="userId"
        v-bind:crawlId="crawlId"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CrawlMap from './CrawlMap.vue';
import Participants from './Participants.vue';

export default {
  name: 'JoinedCrawl',
  components: {
    CrawlMap,
    Participants,
  },
  data() {
    return {
      // note that this userId is currently defunct
      userId: this.$parent.user.id,
      crawlId: this.$route.params.crawlId,
      // crawlName: this.$route.params.crawlName,
      crawl: {},
    };
  },
  mounted() {
    axios.get(`api/crawl/details/${this.$route.params.crawlId}`)
      .then((response) => {
        const { data } = response;
        const [crawl] = data;
        this.crawl = crawl;
      });
  },
};
</script>

<style scoped>
  @import '../assets/styles/joinedcrawl.scss'
</style>

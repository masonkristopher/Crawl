<template>
  <div>
    <h3>Name: {{ crawl.Title }}</h3>
    <h3>
      When: {{ new Date(Date.parse(crawl.Crawl_Date)).toDateString() }} at {{ crawl.Crawl_Time }}
    </h3>
    <CrawlStatus />
    <Participants />
    <div>
      <CrawlMap
        :userId="userId"
        :crawlId="crawlId"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CrawlMap from './CrawlMap.vue';
import Participants from './Participants.vue';
import CrawlStatus from './CrawlStatus.vue';

export default {
  name: 'JoinedCrawl',
  components: {
    CrawlMap,
    Participants,
    CrawlStatus,
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
      .then(({ data }) => {
        [this.crawl] = data;
      });
  },
};
</script>

<style scoped>
  @import '../assets/styles/joinedcrawl.scss'
</style>

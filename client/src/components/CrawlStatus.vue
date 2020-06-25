<template>
  <div id="crawl-status">
    <h3>Status: {{ crawlStatus || 'Go Home You\'re Drunk!' }}</h3>
    <button
      v-if="crawlStatus === 'Not Started!'"
      @click="changeStatus"
    >
      Start Crawl!
    </button>
    <button
      v-else-if="crawlStatus"
      @click="changeStatus"
    >
      Move On!
    </button>
    <!-- <p>{{ }} votes so far!</p>
    <p>Need {{ }} votes to move on!</p> -->
    <Participants
      :crawlId="crawlId"
      :crawlStatus="crawlStatus"
    />
  </div>
</template>

<script>
import axios from 'axios';
import Participants from './Participants.vue';

export default {
  name: 'CrawlStatus',
  components: {
    Participants,
  },
  props: {
    crawlId: {
      type: Number,
      default: null,
    },
    userId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      crawlStatus: 'Loading',
    };
  },
  beforeMount() {
    this.getStatus();
  },
  methods: {
    changeStatus() {
      return axios.post(`/api/status/change/${this.crawlId}`)
        .then(({ data }) => {
          this.crawlStatus = data;
        })
        .catch(err => console.error(err));
    },
    getStatus() {
      return axios.get(`/api/status/${this.crawlId}`)
        .then(({ data }) => {
          this.crawlStatus = data;
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<style scoped>
</style>

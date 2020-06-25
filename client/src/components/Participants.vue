<template>
  <div>
    <h2>Crawlers:</h2>
    <div
      v-for="participant in crawlUsers"
      :key="participant.id"
    >
      <Participant :participant="participant" />
    </div>
  </div>
</template>
<script>

import axios from 'axios';
import Participant from './Participant.vue';

export default {
  name: 'Participants',
  components: {
    Participant,
  },
  props: ['crawlId'],
  data() {
    return {
      crawlUsers: [],
    };
  },
  mounted() {
    axios.get(`api/crawl/joined/by/${this.crawlId}`)
      .then(({ data }) => {
        this.crawlUsers = data;
        console.log('crawlUsers===>', this.crawlUsers);
      });
  },
  methods: {
    // addParticipants(id) {
    //   axios.get('/api/crawl/users', {
    //     body: {
    //       userId: id,
    //     },
    //   });
    // },
  },
};
</script>

<style scoped>
</style>

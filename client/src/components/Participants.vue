<template>
  <div>
    <h2>Crawlers:</h2>
    <div
      v-for="participant in participants"
      :key="participant.id"
    >
      <Participant :participant="participant" />
    </div>
  </div>
</template>
<script>

// import axios from 'axios';
import Participant from './Participant.vue';

export default {
  name: 'Participants',
  components: {
    Participant,
  },
  props: {
    participants: {
      type: String,
      default: 'egghead',
    },
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

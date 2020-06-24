<template>
  <div>
    <p>{{ participant.Email }}</p>
    <button @click="{sendtext(7072947750, 'hurry the fuck up!')}">
      Text 'em hurry the fuck up!
    </button>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Participant',
  props: ['participant'],
  methods: {
    sendtext(to, body) {
      axios.post('api/twilio', { to, body })
        .then(() => {
        // set the status state to 'send which will later trigger a redirect
          console.log('line22, should mean message sent');
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

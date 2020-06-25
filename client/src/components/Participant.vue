<template>
  <div>
    <p>{{ participant.Name_First }}</p>
    <div v-if="participant.Phone_Number">
      <button @click="{sendtext(participant.Phone_Number, 'hurry the fuck up!')}">
        Text 'em hurry the fuck up!
      </button>
    </div>
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
          console.log('line22, should mean message sent');
        })
        .catch((err) => {
          console.log('this error is because the user has no phone number:', err);
        });
    },
  },
};
</script>

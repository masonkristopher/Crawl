<template>
  <div>
    <p>Participant</p>
  </div>
</template>

<script>
export default {
  name: 'Participant',
  props: {
    participant: {
      type: String,
      default: 'meathead',
    },
  },
};
</script>

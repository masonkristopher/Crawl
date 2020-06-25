<template>
  <div>
    <p>{{ participant.Email }}</p>
  </div>
</template>

<script>
export default {
  name: 'Participant',
  props: ['participant'],
};
</script>

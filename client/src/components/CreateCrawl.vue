<template>
  <div>
    <input type="text">
    <input type="datetime-local" name="datetime" v-model="crawlDate" @input="$emit('update:crawlDate', crawlDate)">
  </div>


</template>

<script>
export default {
  name: 'CreateCrawl',
  // props: {
  //   localCrawlDate: {
  //     type: Date,
  //   }
  // }
}
</script>

<style>

</style>
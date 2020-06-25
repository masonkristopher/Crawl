<template>
  <div id="crawl-status">
    <h3>Status: {{ }}</h3>
    <button>Force Move</button>
    <button>Move On!</button>
    <p>{{ }} votes so far!</p>
    <p>Need {{ }} votes to move on!</p>
  </div>
</template>

<script>
export default {
  name: 'CrawlStatus',
};
</script>

<style scoped>
</style>

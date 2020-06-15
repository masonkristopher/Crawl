<template>
  <div id="create-component">
    <ul id="crawl-forms">
      <li><input type="text" name="title" v-model="title" @input="$emit('update:title', title)"></li>
      <li><input type="datetime-local" name="datetime" v-model="crawlDate" @input="$emit('update:crawlDate', crawlDate)"></li>
      <button v-on:click.stop="saveCrawl">
        Save crawl
      </button>
    </ul>
  </div>


</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateCrawl',
    data () {
    return {
      crawlDate: null,
      title: null,
    }
  },
  methods: {
    saveCrawl: function () {
      const { crawlDate, title } = this.$parent
      const date = crawlDate.split("T")[0];
      const time = crawlDate.split("T")[1];
      axios.post('http://localhost:8081/api/crawl/add', {
        title: title,
        crawlDate: date,
        crawlTime: time,
      })
      .then(() => console.log('Crawl saved'))
    }
  }
}
</script>

<style>
@import '../assets/styles/createcrawl.scss';
</style>
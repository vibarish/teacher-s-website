<template>
  <div>
    <h4>Раздел для родителей</h4>
    <vue3-markdown-it :source='news' />
  </div>
</template>
<script>
import { ref } from 'vue';
export default {
  setup() {
    const news = ref('Для родителей');

    const getParents = async function() {
      fetch('https://teacher-bab78.firebaseio.com/parents.json').then((response) => {
        if (response.ok) {
          return response.json();
        }
      }).then((data) => {
        news.value = data.parentNews;
      });
    }

    getParents();

    return {
      news, getParents
    }
  }
}
</script>
<style scoped>
</style>
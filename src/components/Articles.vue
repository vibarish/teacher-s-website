<template>
  <div>
    <h2>Новости</h2>
    <p>{{ news }}</p>
    <hr>
    <h2> Статьи по немецкому языку</h2>
    <button @click="back" class="prev">&#8249;</button>
    <button @click="forward" class="next">&#8250;</button>
    <component class="article" :is="articleLoop()">
      <p>Default</p>
    </component>  
  </div>
</template>
<script>
import article1 from '../Content/myArticle';
import article2 from '../Content/article2';
import article3 from '../Content/Article3'
import article4 from '../Content/Article5'

import { ref, onMounted } from 'vue'

export default {
  setup() {
    const selectedArticle = ref(article1);
    const currentPage = ref(1);
    const news = ref('Новостей пока нет');

  const forward = () => {
    if (currentPage.value > 0 && currentPage.value < 4)
        currentPage.value += 1
      else {
        currentPage.value = 1;
      }
  }

  const back = () => {
    if (currentPage.value > 1 && currentPage.value < 5)
        currentPage.value -= 1
      else {
        currentPage.value = 4;
      }
  }

  const articleLoop = () => {
    switch (currentPage.value) {
      case 1: return selectedArticle.value = article1;
      case 2: return selectedArticle.value = article2;
      case 3: return selectedArticle.value = article3;
      case 4: return selectedArticle.value = article4;
    }
  }

  const getNews = () => {
    fetch('https://teacher-bab78.firebaseio.com/news.json').then((response) => {
      if (response.ok) {
          return response.json();
        }
    }).then((data) => {
      news.value = data.currentNews;
    });
  }

  onMounted(getNews);

  return {
    selectedArticle, currentPage, news,
    forward, back, articleLoop, getNews
  }
  }
}
</script>
<style scoped>
 button {
   background-color: rgba(16, 22, 77, 0.301);
   color: #fff;
   cursor: pointer;
   width: 4rem;
   height: 3rem;
   margin: 0.5rem;
   transition:all 0.5s ease;
   border-radius: 10%;
   border: none;
   text-transform: uppercase;
   font-size: 2rem;
 }
 button:hover {
   background-color: blue;
 }
 .article {
   border-style: double;
   border-color: rgba(108, 24, 156, 0.301);
   padding: 0.5rem;
   border-radius: 1rem;
 }
</style>
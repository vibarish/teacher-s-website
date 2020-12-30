<template>
  <div>
    <h2>Новости</h2>
    <p>{{ news }}</p>
    <h2> Статьи по немецкому языку</h2>
    <button @click="back" class="prev">Предыдущая статья</button>
    <button @click="forward" class="next">Следующая статья</button>

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

export default {
  components: {
    article1
  },
  data() {
    return {
      selectedArticle: article1,
      currentPage: 1,
      news: 'Новостей пока нет'
    }
  },
   methods: {
    forward() {
       if (this.currentPage > 0 && this.currentPage < 4)
        this.currentPage += 1
      else {
        this.currentPage = 1;
      }
    },
    back() {
      if (this.currentPage > 1 && this.currentPage < 5)
        this.currentPage -= 1
      else {
        this.currentPage = 4;
      }
    },
    articleLoop() {
      switch (this.currentPage) {
        case 1: return this.selectedArticle = article1;
        case 2: return this.selectedArticle = article2;
        case 3: return this.selectedArticle = article3;
        case 4: return this.selectedArticle = article4;
      }
    },
    getNews() {
      fetch('https://teacher-bab78.firebaseio.com/news.json').then((response) => {
          if (response.ok) {
            return response.json();
          }
        }).then((data) => {
          this.news = data.currentNews;
        });
    }
  },
  mounted() {
    this.getNews();
  }
}
</script>
<style scoped>
 button {
   background-color: rgba(16, 22, 77, 0.931);
   color: #fff;
   cursor: pointer;
   width: 8rem;
   height: 3rem;
   margin: 0.5rem;
   padding: 0.3rem;
   transition:all 0.5s ease;
   border-radius: 10%;
   border: none;
   text-transform: uppercase;
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
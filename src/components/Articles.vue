<template>
  <div>
    <h2>Новости</h2>
    <vue3-markdown-it :source='news' />
    <hr>
    <h2> Статьи </h2>
    <button @click="back" class="prev">&#8249;</button>
    <button @click="forward" class="next">&#8250;</button>
    <vue3-markdown-it class="article" :source='articleArr[articleArrCounter]' />
  </div>
</template>
<script>
import firebase from 'firebase';
import useDownload  from '../hooks/firebaseDownload';
import { ref, reactive, onMounted } from 'vue'

export default {
  setup() {
    const [ fileArray, nameArray ] = useDownload('articles');

    const news = ref();
    let articles = ref();

    const articleArr = reactive([]);
    const articleArrCounter = ref(0);

    const database = firebase.database();

    const forward = () => {
      if (articleArrCounter.value < articleArr.length - 1)
          articleArrCounter.value += 1;
        else {
          articleArrCounter.value = 0;
        }
    }

    const back = () => {
      if (articleArrCounter.value > 0)
          articleArrCounter.value -= 1;
        else {
          articleArrCounter.value = articleArr.length - 1;
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

    const articleRef = database.ref('articles/');
    articleRef.on('value', (data) => {
      data.forEach((childSnapshot) => {
        // var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        articleArr.push(childData.article);
        // console.log(childKey);
    // ...
  });
    });

    onMounted(getNews);

    return {
      news, forward, back, getNews,
      fileArray, nameArray, articles,
      articleArr, articleArrCounter
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
img {
  width: 60rem;
}
</style>
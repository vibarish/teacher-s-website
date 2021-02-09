<template>
  <div>
    <h3>Методические материалы</h3>
    <div class="columns" v-if="isLoggedIn">
      <ul>
        <!-- Имена файлов -->
        <a v-for="item in nameArray" :key="item.id" > {{ item }} </a>
      </ul>
      <ul>
        <!-- Путь для скачивания -->
        <a :href="item" v-for="item in fileArray" :key="item.id" > Скачать </a>
      </ul>
    </div>
    <p v-else>Пожалуйста, сначала войдите на сайт при помощи электронной почты или зарегистрируйтесь!</p>
  </div>
</template>
<script>
import { computed } from 'vue';
import useDownload  from '../hooks/firebaseDownload';
import {useStore} from 'vuex'

export default {
  setup() {
    const [ fileArray, nameArray ] = useDownload('metod');
    const store = useStore();
    const isLoggedIn = computed(() => {
      return store.getters.isAuthenticated;
    })
    console.log('Залогинился?',isLoggedIn);

    return { fileArray, nameArray, isLoggedIn }
}
}
</script>
<style scoped>
   ul {
    display: flex;
    flex-direction: column;
  }
  .columns {
    display: flex;
    flex-direction: row;
  }
</style>
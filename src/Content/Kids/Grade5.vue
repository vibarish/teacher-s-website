<template>
  <div>
    Материалы для 5 класса
    <div class="columns">
      <ul>
        <!-- Имена файлов -->
        <a v-for="item in nameArray" :key="item.id" > {{ item }} </a>
      </ul>
      <ul>
        <!-- Путь для скачивания -->
        <a :href="item" v-for="item in fileArray" :key="item.id" > Скачать </a>
      </ul>
    </div>
  </div>
</template>
<script>
import useDownload  from '../../hooks/firebaseDownload';

export default {
  setup() {
    const [ fileArray, nameArray ] = useDownload('class5');

    return { fileArray, nameArray }
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
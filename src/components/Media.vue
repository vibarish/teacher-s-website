<template>
  <div>
    <h2>
      Фотографии
    </h2>

  <!-- Самодельная карусель для рисунков -->
  <div class="picCarousel">
    <div class="nav">
      <button @click="back">Назад</button>
      <button @click="forward" @wheel="forward">Вперед</button>
    </div>
    <img id="image" :src='fileArray[picNumber]'>
    <p>{{ nameArray[picNumber] }}</p>
    <label for="image">Фото с праздника Nikolaustag</label>
  </div>
  </div>
</template>
<script>
import { ref, reactive } from 'vue'
import firebase from 'firebase';

export default {
  setup() {
    const picNumber = ref(0);

    const fileArray = reactive([]);
    const nameArray = reactive([]);

    const storage = firebase.storage();
    const listRef = storage.ref('foto_nikolaustag');

    listRef.listAll()
    .then((res) => {
      res.items.forEach((itemRef) => {
    // All the items under listRef.
        storage.ref('foto_nikolaustag' + '/' + itemRef.name).getDownloadURL().then(
          imgUrl => {
            fileArray.push(imgUrl);       //Добавляем в массив Путь файла
            /* Убираем расширение файла из названия */
            const trimString = itemRef.name.split('.').slice(0, -1).join('.');
            nameArray.push(trimString); //Добавляем в массив имя файла
          }
        );
  });
    })

    const forward = () => {
      if (picNumber.value < 18)
        picNumber.value += 1
      else {
        picNumber.value = 1;
      } 
    }

    const back = () => {
      if (picNumber.value > 1)
        picNumber.value -= 1
      else {
        picNumber.value = 18;
      }
    }
    setInterval(forward, 3000);

    return {picNumber, forward, back, nameArray, fileArray}
  }
}
</script>
<style scoped>
  img {
    max-width: 100%;
    max-height: 90%;
  }
  button {
   background-color: rgba(16, 22, 77, 0.931);
   color: #fff;
   cursor: pointer;
   width: 8rem;
   height: 2rem;
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
  button:active {
   background-color: rgb(117, 117, 149);
 }
 .picCaorusel {
   display: flex;
   flex-direction: column;
 }
 .nav {
   display: flex;
   flex-direction: row;
   justify-content: space-between;
 };
</style>
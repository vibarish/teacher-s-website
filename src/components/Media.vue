<template>
  <div>
    <h2>
      Фотографии
    </h2>
  <!-- Самодельная карусель для рисунков -->
  <div class="picCarousel">
    <div class="nav">
      <button @click="back">&#8249; </button>
      <button @click="forward">&#8250;</button>
    </div>
    <div>
      <img id="image"
       :src='imgSource'
        alt="Loading"
        @load="onImgLoad"
        @click="forward"
      >
      <div v-if="imgLoading == true" class="img-background">
      </div>
    </div>
    <div class="label-style">
      <label for="image">Фото с праздника Nikolaustag {{ nameArray[picNumber] }}</label>
    </div>
  </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue'
import useDownload  from '../hooks/firebaseDownload';

export default {
  setup() {
    const picNumber = ref(0);

    const [ fileArray, nameArray ] = useDownload('foto_nikolaustag');

    const arrLength = computed(() => {
      return nameArray.length;
    })

    const imgSource = computed(() => {
      return fileArray[picNumber.value];
    })

    const imgLoading = ref(false);
    const onImgLoad = () => {
      imgLoading.value = false;
    }

    const forward = () => {
      imgLoading.value = true;
      if (picNumber.value < arrLength.value - 1)  {
        picNumber.value += 1
      }
      else {
        picNumber.value = 0;
      } 
    }

    const back = () => {
      imgLoading.value = true;
      if (picNumber.value > 0)
        picNumber.value -= 1
      else {
        picNumber.value = arrLength.value - 1;
      }
    }
      // setInterval(forward, 3000);

    return { picNumber, forward, back, nameArray,
      imgSource, onImgLoad, imgLoading }
    }
}
</script>
<style scoped>
  img {
    max-width: 100%;
    max-height: 70vh;
    cursor: pointer;
  }
  .img-background {
    background-color: rgba(66, 71, 66, 0.76);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 59;
  }
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
   background-color: rgba(0, 0, 255, 0.459);
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
   position: relative;
   top: 10rem;
 }
 .picCaorusel {
   display: flex;
   flex-direction: column;
   align-items: center;
 }
 h2 {
   height: 0;
   margin: 0;
   padding: 0;
 }
 .label-style {
   text-align: center;
 }
</style>
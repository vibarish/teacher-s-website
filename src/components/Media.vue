<template>
  <div>
    <h2>
      Фотографии
    </h2>
    <!-- <swiper
      :navigation="{
        hideOnClick: true
      }"
      :breakpoints="{
        320: {
          slidesPerView: 1,
          spaceBetween: 10
      },
      // when window width is >= 480px
        640: {
          slidesPerView: 2,
          spaceBetween: 20
      },
      // when window width is >= 640px
        1280: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }"
      scrollbar
      :speed="1200"
      :autoplay="{
        delay:5000
      }"
      :loop="true"
      :freeMode="true"
      :pagination="{ 
        clickable: true, dynamicBullets: true
      }"
      mousewheel
      keyboard
    >
      <swiper-slide><img src="../Content/foto_nikolaustag/1.jpg"></swiper-slide>
      <swiper-slide><img src="../Content/foto_nikolaustag/2.jpg"></swiper-slide>
      <swiper-slide><img src="../Content/foto_nikolaustag/3.jpg"></swiper-slide>
      <swiper-slide><img src="../Content/foto_nikolaustag/4.jpg"></swiper-slide>
      <swiper-slide><img src="../Content/foto_nikolaustag/5.jpg"></swiper-slide>
      <swiper-slide><img src="../Content/foto_nikolaustag/6.jpg"></swiper-slide>
  </swiper> -->
  <!-- Самодельная карусель для рисунков -->
  <div class="picCarousel">
    <div class="nav">
      <button @click="back">Назад</button>
      <button @click="forward" @wheel="forward">Вперед</button>
    </div>
    <img id="image" :src='require(`../Content/foto_nikolaustag/${picNumber}.jpg`)'>
    <label for="image">Фото с праздника Nikolaustag</label>
  </div>
  </div>
</template>
<script>
  // import Swiper core and required components
  // import SwiperCore, { Navigation, Pagination, Scrollbar,
  //        A11y, Keyboard, Mousewheel, Autoplay } from 'swiper';

  // // Import Swiper Vue.js components
  // import { Swiper, SwiperSlide } from 'swiper/vue';

  // // Import Swiper styles
  // import 'swiper/swiper.scss';
  // import 'swiper/components/navigation/navigation.scss';
  // import 'swiper/components/pagination/pagination.scss';
  // import 'swiper/components/scrollbar/scrollbar.scss';

  // SwiperCore.use([Navigation, Pagination, Scrollbar,
  //                A11y, Keyboard, Mousewheel, Autoplay]);

  export default {
    data() {
      return {
        picNumber: 1
      }
    },
    components: {
      // Swiper,
      // SwiperSlide,
    },
    methods: {
      forward() {
        if (this.picNumber < 19)
          this.picNumber += 1
        else {
          console.log('Перебор завершен');
          this.picNumber = 1;
        } 
      },
      back() {
        if (this.picNumber > 1)
          this.picNumber -= 1
        else {
          console.log('Перебор завершен');
          this.picNumber = 19;
        }
      }
    },
    created() {
      setInterval(this.forward, 3000);
    }
  }
</script>
<style scoped>
  img {
    max-width: 100%;
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
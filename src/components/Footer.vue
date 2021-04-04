<template>
  <div>
    <footer>
      <span>Copyright © 2015-{{ currentYear }} Барышников Василий</span>
      <div class="menu">
        <router-link to="/" >На главную</router-link>
        <router-link to="/contacts" >Контакты </router-link>
        <router-link to="/method" > Методика </router-link>
      </div>
      <div class="menu">
        <router-link to="/kids" >Ученикам </router-link>
        <router-link to="/parents" >Родителям </router-link>
        <router-link to="/media" >Фото </router-link>
        <router-link to="/admin" v-if="isAdminLogged" > Админ </router-link>
      </div>
    </footer>
  </div>
</template>
<script>
import { computed } from 'vue'
export default {
  setup() {
    const currentYear = computed(() => {
      const date = new Date(); 
      return date.getFullYear();
    })
    return {currentYear}
  }
}
</script>
<style scoped>
  footer {
    background-color: rgba(26, 41, 53, 0.945); 
    color: white;
    width: 100%;
    height: 10rem;
    font-size: 1.3rem;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  span {
    padding: 0.5rem;
  }
  .menu {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
  }
  a {
    color: white;
    font-size: 1rem;
    text-decoration: none;
    background-color: rgba(100, 175, 237, 0);
    margin: 0.2rem;
    border-radius: 0.3rem;
    padding: 0;
  }
  a:hover {
    color:rgb(194, 212, 229);
    background-color: rgba(137, 43, 226, 0);
  }
</style>
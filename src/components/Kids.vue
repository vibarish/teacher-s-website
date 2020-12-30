<template>
  <div>
    <h2>Ученикам</h2>
    <ul>
      <router-link to="/kids/grade4" >Для 4 класса</router-link>
      <router-link to="/kids/grade5" >Для 5 класса</router-link>
      <router-link to="/kids/grade6" >Для 6 класса</router-link>
      <router-link to="/kids/grade7" >Для 7 класса</router-link>
    </ul>
    <hr>
    <router-view></router-view>
  </div>
</template>
<style scoped>
  ul {
    display: flex;
    flex-direction: column;
  }
</style>
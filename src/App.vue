<template>
<div id="app">
  <myHeader></myHeader>
  <myFooter></myFooter>
</div>
</template>
<script>
import myHeader from './components/Header.vue'
import myFooter from './components/Footer.vue'
import { ref } from 'vue';

export default {
  name: "App",
  components: {
    myHeader, myFooter
  },
  setup() {
  const blockScroll = ref(false)
  return { blockScroll }
  },
  created() {
    this.$store.dispatch('autologin');
  },
  computed: { 
    didAutologout() {
      return this.$store.getters.didAutologout;
    }},
    watch: {
    didAutologout(currentValue, oldValue) {
      if (currentValue && currentValue !== oldValue) {
         this.$router.replace('/kids');
      }}
  }
}
</script>
<style>
  html {
    font-size: 14px;
    font-family: 'Josefin Sans', sans-serif;
    line-height: 1.5;
  }
  body {
    margin: 0;
    min-width: 200px;
  }
  body.modal-open {
    overflow: hidden;
  }
  h2 {
    text-align: center;
  }
  p, li {
    max-width: 60rem;
    text-align: justify;
  }
a {
    color: black;
    font-size: 1.2rem;
    text-decoration: none;
    background-color: rgb(100, 175, 237);
    margin: 0.2rem;
    border-radius: 0.3rem;
    padding: 0.1rem;
  }
  a:hover {
    color:white;
    background-color: blueviolet;
  }
</style>

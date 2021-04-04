<template>
<div>
  <myHeader></myHeader>
  <myFooter></myFooter>
</div>
</template>
<script>
import myHeader from './components/Header'
import myFooter from './components/Footer'
// import Nav from './components/Navigation'

// Modal opens
// document.body.classList.add('modal-open');
// // Modal closes
// document.body.classList.remove('modal-closed');
export default {
  data() {
    return{
      blockScroll:false
    }
  },
  components: {
    myFooter, myHeader
  },
  created() {
    this.$store.dispatch('autologin');
  },
  computed: { 
    didAutologout() {
      return this.$store.getters.didAutologout;
    }
  },
  watch: {
    didAutologout(currentValue, oldValue) {
      if (currentValue && currentValue !== oldValue) {
         this.$router.replace('/kids');
      }
    }
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

<template>
  <div>
    <h2>ВНИМАНИЕ! Уважаемые родители!</h2>
    <p>{{ news }}</p>
    <!-- <p> В настоящее время консультации для родителей не проводятся</p> -->
    <!-- <img src="images/skype.png" alt="skype" style="width:140px;height:150px" align="middle"> -->
    <p>
      Проведение веб-консультаций в режиме on-line.
      Требования  к  проведению  веб-консультаций.
      Требования к аппаратному и программному обеспечению:
    </p>
    <ol>
      <li>Наличие персонального компьютера</li>
      <li>Наличие работающего Интернет-канала</li>
      <li>Наличие веб-камеры и микрофона</li>
      <li>Установленная на персональном компьютере<br> и настроенная на работу с веб-камерой
      и микрофоном программа Skype.</li>
    </ol>
  </div>
</template>
<script>
import { ref } from 'vue';
export default {
  setup() {
    const news = ref('Для родителей');

    const getParents = async function() {
      fetch('https://teacher-bab78.firebaseio.com/parents.json').then((response) => {
        if (response.ok) {
          return response.json();
        }
      }).then((data) => {
        news.value = data.parentNews;
      });
    }

    getParents();

    return {
      news, getParents
    }
  }
}
</script>
<style scoped>
</style>
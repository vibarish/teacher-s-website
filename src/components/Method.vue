<template>
  <div>
    <h2>
      Методические указания
    </h2>
  <ul v-if="isLoggedIn">
    <a href="https://drive.google.com/file/d/1cLiq2sX_8RSNEKdFMfuqsaa64_QTSAJg/view?usp=sharing" variant="light" target="blank">Презентация праздника Nicolaustag</a>
    <a href="https://drive.google.com/file/d/1lnKezXjdKJh5lrbWRY0ndlWfLVn90UiJ/view?usp=sharing" variant="light" target="blank">Сценарий внеклассного мероприятия Nicolaustag</a>
    <a href="https://drive.google.com/file/d/1zUkLOSL5VUw8lUj7Y7qrcJeodzjHyB3t/view?usp=sharing" variant="light" target="blank">Технологическая карта урока немецкого языка в 4 классе</a>
    <a href="https://drive.google.com/file/d/1FGLk0mFsX-HykpMaB8O7dZdYOXtWq-Nd/view?usp=sharing" variant="light" target="blank">Конспект урока "Путешествие в Кёльн"</a>
    <a href="https://drive.google.com/file/d/1tvA-H94OQ5lH-qWubTCLp2LggMnvfzKN/view?usp=sharing" variant="light" target="blank">Cценарий праздника алфавита</a>
    <a href="https://drive.google.com/file/d/17_DmSna2b8ZBUV_EolagjC7IPmhw1BFu/view?usp=sharing" variant="light" target="blank">Технологическая карта урока в 6-м классе</a>
    <a href="https://drive.google.com/file/d/1BHWJCaHsxEQijnlYcg9ZaDAL8g2EaBSb/view?usp=sharing" variant="light" target="blank">Технологическая карта урока в 5-м классе</a>
  </ul>
  <p v-else>Пожалуйста, сначала войдите на сайт при помощи электронной почты или зарегистрируйтесь!</p>
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  }
}
</script>
<style scoped>
  ul {
    display: flex;
    flex-direction: column;
  }
</style>
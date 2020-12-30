<template>
  <div>
    <h2>Добро пожаловать на страницу администратора!</h2>
    <div class="news">
      <label for="current-news">Раздел "Новости"</label>
      <textarea id="current-news" v-model="$store.state.newsMessage"
        cols="10" rows="10"></textarea>
      <button @click="sendMessage">Отправить новость</button>

      <div >
        <p>Загрузить файл на сервер:</p>
        <input type="file" @change="previewImage" accept="image/*" >
       </div>
       <div>
         <p>Прогресс: {{uploadValue.toFixed()+"%"}}
          <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
        </div>
      <div v-if="imageData!=null">
        <img class="preview" :src="picture">
        <br>
      <button @click="onUpload">Загрузить</button>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase';
export default {
  data() {
    return {
      imageData: null,
      picture: null,
      uploadValue: 0
    }
  },
  methods: {
    previewImage() {
      this.uploadValue = 0;
      this.picture = 0;
      this.imageData = event.target.files[0];
    },
    onUpload() {
      this.picture = null;
      const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`, snapshot => {
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes) * 1000;
      }, error => {console.log(error.message)},
      () => {this.uploadValue = 100;
      storageRef.snapshot.ref.getDownloadUrl().then((url) => {
        this.picture = url;
      })})
    },
    sendMessage() {
      fetch('https://teacher-bab78.firebaseio.com/news.json',{
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            currentNews: this.$store.state.newsMessage,
          })
        })
      }
  },
  beforeRouteLeave(_, _2, next) {
    const userLeave = confirm('Вы точно хотите покинуть страницу');
    next(userLeave);
  }
}
</script>
<style scoped>
  div {
    display: flex;
    flex-direction: column;
    max-width: 80%;
    margin: 0.5rem;
  }
  textarea {
    font-size: 1.2rem;
    padding: 0.5rem;
  }
  button{
    background-color: rgb(149, 137, 137);
    margin: 0.4rem;
    height: 3rem;
    border-radius: 10%;
    cursor: pointer;
    font-size: 1.3rem;
    padding: 0.3rem;
    transition: all 0.2s ease-in;
    color: white;
    text-decoration: none;
    border-block-style: none;
  }
  button:hover {
    background-color: rgba(77, 77, 126, 0.829);
  }
   button:active {
    background-color: rgba(174, 174, 238, 0.829);
  }
</style>

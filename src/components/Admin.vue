<template>
  <div>
    <div v-if="$store.getters.isAuthAsAdmin">
      <h2>Добро пожаловать на страницу администратора!</h2>
      <div >
        <div class="news">
          <label for="current-news" @click="inputToggle = false">Раздел "Новости"</label>
          <textarea v-if="inputToggle === false" class="current-news" v-model="$store.state.newsMessage"
            cols="10" rows="10"></textarea>
          <button @click="sendNews" v-if="inputToggle === false">Опубликовать</button>
        </div>
        <div class="news">
          <label for="current-news" @click="inputToggle = true">Раздел "Родителям"</label>
          <textarea v-if="inputToggle === true" class="current-news" v-model="$store.state.parentsMessage"
            cols="10" rows="10">
          </textarea>
          <button @click="sendParents" v-if="inputToggle === true">Опубликовать</button>
        </div>
        <div class="download" >
          <h3>Загрузить файл</h3>
          <select v-model="selected">
            <option disabled value="">Ваш выбор</option>
            <option>Добавить в методику</option>
            <option>Добавить в 5 класс</option>
          </select>
          <span>Добавляем файл в раздел:</span>
          <span style="color: blue">{{ selected }}</span>
          <input type="file" @change="previewImage" id="actual-btn" hidden/>
          <label for="actual-btn">Открыть файл</label>
        </div>
        <!-- <div>
          <p>Прогресс: {{uploadValue.toFixed()+"%"}}
            <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
          </div> -->
        <div v-if="imageData!=null">
          <!-- <img class="preview" :src="picture"> -->
          <br>
        <button @click="onUpload">Загрузить</button>
        </div>
      </div>
    </div>
    <div v-else>
      <span>Пожайлуста авторизуйтесь!</span>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase';
import { ref } from 'vue'
import { useStore } from 'vuex'
// import { onBeforeRouteLeave } from 'vue-router'
export default {
  setup() {
    const imageData = ref(null);
    const picture = ref(null);
    const uploadValue = ref(0);
    const inputToggle = ref(false);
    const selected = ref(null);
    const folder = ref(null);

    const store = useStore();

    const previewImage = () => {
      uploadValue.value = 0;
      picture.value = 0;
      imageData.value = event.target.files[0];
    }

    const onUpload = () => {
      switch (selected.value) {
      case 'Добавить в методику':
        folder.value = 'metod'
        break;
      case 'Добавить в 5 класс':
        folder.value = 'class5'
        break;
      }

      picture.value = null;
      const storageRef = firebase.storage().ref(`${folder.value}/${imageData.value.name}`).put(imageData.value);
      
      storageRef.on(`state_changed`, snapshot => {
        uploadValue.value = (snapshot.bytesTransferred/snapshot.totalBytes) * 1000;
      }, error => {console.log(error.message)},
      () => {uploadValue.value = 100;
      storageRef.snapshot.ref.getDownloadUrl().then((url) => {
        picture.value = url;
      })})
    }

    // function sendTextToServer() {
    //   fetch(`https://teacher-bab78.firebaseio.com/parents.json`,{
    //     method: 'PUT',
    //     headers: {
    //       'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       parentNews: store.state.parentsMessage,
    //     })
    //   })
    // }

    // const sendParents = sendTextToServer;
    // const sendNews = sendTextToServer('news', store.state.newsMessage);

    const sendParents = () => {
      fetch('https://teacher-bab78.firebaseio.com/parents.json',{
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          parentNews: store.state.parentsMessage,
        })
      })
    }

    const sendNews = () => {
      fetch('https://teacher-bab78.firebaseio.com/news.json',{
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          currentNews: store.state.newsMessage,
        })
      })
    }

    // onBeforeRouteLeave((_, _2, next) => {
    //   const userLeave = confirm('Вы точно хотите покинуть страницу');
    //   next(userLeave);
    // })

    return {
      imageData, picture, uploadValue, previewImage,
      onUpload, sendParents, sendNews, inputToggle, selected,
      folder
    }
  },
}
</script>
<style scoped>
  /* div {
    display: flex;
    flex-direction: column;
    max-width: 80%;
    margin: 0.5rem;
  } */
  textarea {
    font-size: 1.2rem;
    height: 10rem;
    padding: 0.5rem;
  }
  button, input#file-upload-button {
    text-align: center;
    background-color: rgb(70, 80, 114);
    margin: 0.4rem;
    height: 2.5rem;
    width: 9rem;
    border-radius: 8%;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.5rem;
    transition: all 0.2s ease-in;
    color: white;
    text-decoration: none;
    border-block-style: none;
  }
  button:hover, label:hover {
    background-color: rgba(77, 116, 126, 0.829);
  }
   button:active {
    background-color: rgba(174, 174, 238, 0.829);
  }
  .news {
    display: flex;
    flex-direction: column;
  }
  label {
    width: 12rem;
    height: 1.5rem;
    text-align: center;
    background-color: rgb(97, 59, 98);
    margin: 0.4rem;
    border-radius: 8%;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.5rem;
    transition: all 0.2s ease-in;
    color: white;
    text-decoration: none;
    border-block-style: none;
  }
  select {
    height: 2rem;
    font-size: 1.2rem;
  }
  .download {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 20rem;
    width: 20rem;
    padding: 0.5rem;
    border:solid;
    border-radius: 5%;
    border-color: blue;
  }
</style>

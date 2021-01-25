<template>
  <div>
    Материалы для 5 класса
    <ul>
      <a :href="myFile" v-for="item in fileArray" :key="item.id" >{{ item }} </a>
    </ul>
  </div>
</template>
<script>
import firebase from 'firebase';
import { ref, reactive } from 'vue'

export default {
  setup() {
    const myFile = ref(null);
    const fileFromArray = ref(null);
    const fileArray = reactive([]);

    const storage = firebase.storage();
    const listRef = storage.ref('class5');

    const storageAllFiles = listRef.listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
      // All the items under listRef.
          fileArray.push(itemRef.name);
          console.log(fileArray[3]);

          storage.ref('class5/' + itemRef.name).getDownloadURL().then(
            imgUrl => {
              myFile.value = imgUrl;
            }
          );
    });
      })

    return {
      myFile, storageAllFiles,
      fileArray, fileFromArray
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
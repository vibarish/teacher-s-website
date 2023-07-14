import { reactive } from 'vue';
import firebase from '../firebaseInit.js';
import ref from "firebase";

export default function useDownload(folder) {
  const fileArray = reactive([]);
  const nameArray = reactive([]);

  const storage = firebase.storage()
  // const storage = getStorage(firebase)
  const listRef = storage.ref(folder);

  listRef.listAll()
    .then((res) => {
      res.items.forEach((itemRef) => {
    // All the items under listRef.
        storage.ref(folder + '/' + itemRef.name).getDownloadURL().then(
          imgUrl => {
            fileArray.push(imgUrl);       //Добавляем в массив Путь файла
            /* Убираем расширение файла из названия */
            const trimString = itemRef.name.split('.').slice(0, -1).join('.');
            nameArray.push(trimString); //Добавляем в массив имя файла
          }
        );
  });
    })

  return [ fileArray, nameArray ]
}
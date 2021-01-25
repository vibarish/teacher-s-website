import { createApp } from 'vue';
import { createStore} from 'vuex';

import App from './App.vue';
import router from './router';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyC0TzwMD-I4eIBFJd6rDM8bw_u2NSqWD7g",
  authDomain: "teacher-bab78.firebaseapp.com",
  databaseURL: "https://teacher-bab78.firebaseio.com",
  projectId: "teacher-bab78",
  storageBucket: "teacher-bab78.appspot.com",
  messagingSenderId: "58146608224",
  appId: "1:58146608224:web:f791ba60d316c94cfe5f05"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

import authModule from './store/modules/auth/index'

export const store = createStore({
  modules: {
    auth: authModule
  }

});

const app = createApp(App);
app.use(store);
app.use(router).mount('#app');
    
import { createApp } from 'vue';
import { createStore} from 'vuex';

import App from './App.vue';
import router from './router/index';
import markdown from './directives/markdown';
import authModule from './store/modules/auth/index';

import VueMarkdownIt from 'vue3-markdown-it';

export const store = createStore({
  modules: {
    auth: authModule
  }
});

const app = createApp(App);
app.use(store);
/* Преобразование введенного текста с разметкой markdown */
app.directive('markdown', markdown);
/* Библиотека vue3-markdown-it */
app.use(VueMarkdownIt);

app.use(router);
app.mount('#app');

    
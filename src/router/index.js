import { createRouter, createWebHashHistory } from 'vue-router'

import grade4 from '../Content/Kids/Grade4.vue'
import grade5 from '../Content/Kids/Grade5.vue'
import grade6 from '../Content/Kids/Grade6.vue'
import grade7 from '../Content/Kids/Grade7.vue'

import article from '../components/Articles.vue'
import contacts from '../components/Contacts.vue'
import projects from '../components/Projects.vue'
import kidsInfo from '../components/Kids.vue'
import parents from '../components/Parents.vue'
import media from '../components/Media.vue'
import admin from '../components/Admin.vue'
import sidebar from '../components/Sidebar.vue'
import notFound from '../components/NotFound.vue'

// import { store } from '../main'

// export function getAuth () {
//   return store.state.isAdmin;
// }
// console.log(store);

const routes = [
  { 
    path: '/',
    name: 'Главная',
    component: article
  },
  {
    path: '/:notFound(.*)',
    component: notFound
  },
  {
    path: '/admin',
    name: 'adminPanel',
    component: admin,
    // meta: {needsAuth: true},
  },
  {
    path: '/contacts',
    name: 'Контакты',
    component: contacts
  },
  {
    path: '/projects',
    name: 'Проекты',
    component: projects
  },
  {
    path: '/kids',
    component: kidsInfo,
    name: 'kids',
    children: [
      {
        path: 'grade4',
        name: 'grade4',
        component: grade4,
      },
      {
        path: 'grade5',
        name: 'grade5',
        component: grade5
      },
      {
        path: 'grade6',
        name: 'grade6',
        component: grade6
      },
      {
        path: 'grade7',
        name: 'grade7',
        component: grade7
      }
    ]
  },
  {
    path: '/parents',
    name: 'Родителям',
    component: parents
  },
  {
    path: '/media',
    name: 'Медиа',
    component: media,
  },
  {
    path: '/sidebar',
    name: 'sidebar',
    component: sidebar
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log(savedPosition);
    if (savedPosition) {
      return { 
        savedPosition
      }
  }
    return { left: 0, top: 388 }
  }
})

// router.beforeEach(function(to, from, next) {
//   if (to.meta.needsAuth) {
//     console.log('Требуется Регистрация!');
//     next({name: 'sidebar'})
//   }
//   // // console.log(store.isAuthAsAdmin);
//   next();
// })

export default router

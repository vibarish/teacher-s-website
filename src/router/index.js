import { createRouter, createWebHashHistory } from 'vue-router'

import grade4 from '../Content/Kids/Grade4'
import grade5 from '../Content/Kids/Grade5'
import grade6 from '../Content/Kids/Grade6'
import grade7 from '../Content/Kids/Grade7'

import article from '../components/Articles'
import contacts from '../components/Contacts'
import method from '../components/Method'
import kidsInfo from '../components/Kids'
import parents from '../components/Parents'
import media from '../components/Media'
import admin from '../components/Admin'
import sidebar from '../components/Sidebar'
import notFound from '../components/NotFound'

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
    path: '/method',
    name: 'Методика',
    component: method
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

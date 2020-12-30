<template>
  <div class="wrapper" :class="{isActive}">
      <img @click="sideBarHandler" src="../Content/img/bundestag_cr.jpg">
      
    <div class="sidebar" :class="{sidebarIsActive}" >
      <sidebar-component @close-bar="sideBarHandler"></sidebar-component>
    </div>
    <!-- Занавес -->
    <main v-if="sidebarIsActive" @click="sideBarHandler" class="backdrop"></main>
    <div>
      <header class="header" @mouseleave="outHandler" @ontouchcancel="outHandler">
        <div class="container">
          <div class="header_body">
            <div class="header_logo" @click="sideBarHandler">
              <span>Сайт учителя немецкого языка </span> 
            </div>
            <div @click="activeHandler"
                 :class="{isActive}"
                 class="header_burger"
                 >
              <span> </span>
            </div>
            <nav class="header_menu" :class="{isActive}">
              <div class="header_list">
                <router-link to="/" >На главную</router-link>
                <router-link to="/contacts" >Контакты </router-link>
                <router-link to="/method" > Методика </router-link>
                <router-link to="/kids" >Ученикам </router-link>
                <router-link to="/parents" >Родителям </router-link>
                <router-link to="/media" >Фото </router-link>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <span v-if="isLoggedIn && !isAdminLogged" id="idNote">Вы авторизованы </span>
      <span v-if="isAdminLogged" id="idNote">Вы авторизованы как администратор </span>
        <div id="dinamic-content">
          <router-view></router-view>
        </div>
    </div>
  </div>
</template>
<script>
import Sidebar from './Sidebar.vue'
  export default {
    data() {
      return {
        isActive: false,
        sidebarIsActive: false
      }
    },
    components: {
      'sidebar-component': Sidebar
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isAuthenticated;
      },
      isAdminLogged() {
        return this.$store.getters.isAuthAsAdmin;
      }
    },
    methods: {
      outHandler() {
        if (!this.sidebarIsActive) {
          this.isActive = false;
          document.body.classList.remove('modal-open')
        }
        else {
          return;
        }
      },
      activeHandler() {
        this.isActive = !this.isActive
        if (this.isActive == true)
          document.body.classList.add('modal-open')
        else 
          document.body.classList.remove('modal-open')
      },
      sideBarHandler() {
        this.sidebarIsActive = !this.sidebarIsActive;
        if (this.sidebarIsActive == true) {
          document.body.classList.add('modal-open');
        }
        else 
          document.body.classList.remove('modal-open')
      },
      onDemand() {
      },
    },
    mounted() {
      this.onDemand();
    }
  }
</script>
<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 5rem);
    margin: 0;
    padding: 0;
  }
  .backdrop {
    background-color: rgba(66, 71, 66, 0.76);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 59;
  }
  div {
    font-size: 1.3rem;
    margin: 0.5rem
  }
  img {
    width:100%;
    position: relative;
    margin: 0;
    cursor: pointer;
  }
  #idNote {
    font-size: 1.2rem;
    margin: 2rem 0 0;
    color: blue;
  }
  #admin-form {
    margin: 0.5rem;
  }
  .sidebar {
    width: 25rem;
    height: 100%;
    background-color: white;
    position: fixed;
    text-align: justify;
    top:0;
    left: -100rem;
    z-index: 60;
    display: flex;
    margin:0;
    padding: 0.5rem;
    transition: all 0.5s  ease-out;
  }
  .sidebarIsActive {
    left: 0;
    display: flex;
    flex-direction: column;
  }
  .container {
    max-width: 1180px;/* 1180px */
    margin: 0px  auto;
    padding: 0px 10px;
  }
  .header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 50;
  }
  .header_logo {
    color: #fff;
    position: relative;
    z-index: 4;
    font-size: 1.3rem;
    text-align: center;
    cursor:pointer;
  }
  .header:before {
    content:'';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color:rgba(6, 105, 144, 0.712);
    z-index: 3;
  }
  .header_body {
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 80px;
    align-items: center;
  }
  .header_list {
    display: flex;
    position: relative;
    z-index: 3;
    cursor: pointer;
    align-content: center;
    justify-content: center;
    text-align: center;
  }
  .header_list a {
    list-style: none;
    color: #fff;  
    text-transform: uppercase;
    font-size: 1rem;
    text-decoration: none;
    margin: 0px 0px 0px 20px;
    transition: all 0.3s  ease 0s;
    background-color: rgba(255, 255, 255, 0);
  }
  .header_list a:hover {
    color: rgb(162, 192, 226);
  }
  .header_burger {
    display: none;
  }
  @media (max-width:767px) {
    .sidebar {
      width: 100%;
    }
    .content {
      padding: 30px 0px 0px 0px;
    }
    .header_body {
      height: 50px;
    }
    .header_list a {
      margin: 0px 0px 20px 0px;
    }
    .header_list {
      display: flex;
      flex-direction: column;
    }
    .header_logo {
      flex: 20px 0 20px;
    }
    .header_burger {
      display: block;
      position: relative;
      width: 30px;
      height: 20px;
      z-index: 3;
      position: relative;
      cursor: pointer;
    }
    .header_burger::before,
    .header_burger::after {
      content: ' ';
      background-color: #fff;
      position: absolute;
      width: 100%;
      height: 2px;
      left: 0;
      transition: all 0.3s  ease 0s;
    }
    .header_burger span {
      position: absolute;
      left: 0;
      background-color: #fff;
      width: 100%;
      height: 2px;
      top: 10px;
      transition: all 0.3s  ease 0s;
    }
    .header_burger:before  {
      top: 0;
    }
    .header_burger:after {
      bottom: 0;
    }
    .header_burger.isActive::before {
      transform: rotate(45deg);
      top: 9px;
    }
     .header_burger.isActive::after {
      transform: rotate(-45deg);
      bottom: 9px;
    }
    .header_burger.isActive span {
      transform: scale(0);
    }
    .header_menu {
      position: fixed;
      top: -100%;
      left: 0;
      width: 100%;
      background-color:rgba(6, 105, 144, 0.781);
      padding: 70px 10px  20px 0px;
      transition: all 0.5s  ease 0s;
      cursor: pointer;
    }
    div {
      font-size: 1.1rem;
      margin: 0;
    }
    .header_menu.isActive {
      top: 0;
    }

  }
  
  /* span.router-link-active {
    color:rgb(75, 214, 219);
  } */
  #dinamic-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
  }
</style>
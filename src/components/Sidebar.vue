<template>
  <div>
    <div class="close"></div>
    <button id="close-btn" @click="closeBar">
      X
    </button>
    <h3>О сайте</h3>
    <p>
      Сайт учителя немецкого языка <br>
    </p>
    <form class="input-form" @submit.prevent="submitForm">
      <div v-if="!isLoggedIn">
        <div>
          <span v-if="mode === 'login'"> Войти </span>
          <span v-else> Зарегистрироваться </span>
        </div>
        <label for="login">Введите ваш e-mail</label>
        <input id="login" type="text" v-model.trim="email" />
        <label for="pass">Введите пароль</label>
        <input id="pass" type="password" v-model.trim="password" />
      </div>
      <div v-else>
        <p v-if="isLoggedIn">Вы авторизованы {{ $store.state.email }}</p>
      </div>
     
       <div id="in-out-btn">
        <button v-if="!isLoggedIn" class="enter-btn">
          {{ submitButtonCaption }}
        </button>
        <button v-if="!isLoggedIn" class="enter-btn" @click.prevent="switchAuthMode">
          {{ switchModeButtonCaption }}
        </button>
        <button v-if="isLoggedIn" class="enter-btn" @click.prevent="logout">
          Выйти
        </button>
        <p class="custom-alert" :class="{erMsgActive}">
          {{erMsgText}}
        </p>
      </div>
        <router-link to="/admin" v-if="isAdminLogged">
          <button  class="enter-btn" @click="adminHandler">
            Администратор
          </button>
        </router-link>
    </form>
  </div>
</template>
<script>
import firebase from "firebase";
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex'

export default {
  setup(_1, context) {
    const email = ref('');
    const password = ref('');
    const formIsValid = ref(true);
    const mode = ref('login');
    const isLoading = ref(false);
    const error = ref(null);
    const erMsgActive = ref(false);
    const erMsgText = ref('');

    const store = useStore();

    const errorTimer = () => {
      return setTimeout(() => erMsgActive.value = true, 2000);
    }
    
    const logout = () => {
      email.value = "";
      password.value = "";
      return store.dispatch('logout');
    }

    const submitForm = async function() {
      if (
        email.value === "" ||
        password.value === "" ||
        password.value.length < 6
      ) {
        formIsValid.value = false;
        erMsgActive.value = true;
        erMsgText.value =`Пожайлуста введите корректные данные 
                        (Пароль больше 6 символов, заполненные поля почты и пароля)`
        setTimeout(() => erMsgActive.value = false, 3000);
        return;
      }

      formIsValid.value = true;
      isLoading.value = true;

      try {
        if (mode.value === "login") {
           await firebase
           .auth()
           .signInWithEmailAndPassword(email.value, password.value); 

          await store.dispatch("login", {
            email: email.value,
            password: password.value,
          });
        } else {
          await store.dispatch("signup", {
            email: email.value,
            password: password.value,
          });
        }
      } catch (err) {
        erMsgActive.value = true;
        erMsgText.value =`Такой пользователь еще не зарегистрирован!`
        setTimeout(() => erMsgActive.value = false, 3000);       
        error.value = err.message || "Не удалось зарегистрироваться";
      }

      isLoading.value = false;
    }

    const switchAuthMode = () => {
      if (mode.value === "login") {
        mode.value = "signup";
      } else {
        mode.value = "login";
      }
    }

    const closeBar = () => {
      context.emit("close-bar");
    }

    const adminHandler = () => {
      closeBar();
    }

    watch(formIsValid, () => {
      console.log(`Форма верна ${formIsValid.value}, Время вышло ${erMsgActive.value}`);
      setTimeout(() => erMsgActive.value = true, 3000);
    })

    const isAdminLogged = computed(() => {
      return store.getters.isAuthAsAdmin;
    })

    const isLoggedIn = computed(() => {
      return store.getters.isAuthenticated;
    })

    const submitButtonCaption = computed(() => {
      if (mode.value === "login") {
        return "Войти";
      } else {
        return "Регистрация";
      }
    })

    const switchModeButtonCaption = computed(() => {
      if (mode.value === "login") {
        return "Регистрация";
      } else {
        return "Войти";
      }
    })

    return {
      email, password, formIsValid, mode, isLoading, error,
      erMsgActive, erMsgText, errorTimer, logout, submitForm,
      switchAuthMode, closeBar, adminHandler, isAdminLogged,
      isLoggedIn, submitButtonCaption, switchModeButtonCaption
    }
  }
};
</script>
<style scoped>
p,
h3 {
  color: rgb(30, 36, 66);
  padding: 0.5rem;
  font-size: 1.3rem;
  text-align: justify;
  line-height: 1.25;
}
.input-form {
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 12rem;
  align-content: center;
  justify-content: space-between;
  align-self: center;
  align-items:center;
  margin: 0.2rem;
  color: black;
  text-align: center;
}
input {
  border-radius: 10%;
  cursor: pointer;
  padding: 0.2rem;
}
button.enter-btn {
  background-color: white;
  margin: 0.4rem;
  height: 3rem;
  border-radius: 5%;
  cursor: pointer;
  font-size: 1.3rem;
  padding: 0.3rem;
  transition: all 0.2s ease-in;
  color: rgb(29, 34, 61);
  text-decoration: none;
  border-style: none;
}
button.enter-btn:hover {
  background-color: rgba(77, 77, 126, 0.829);
  color: white;
}
button.enter-btn:active {
  background-color: rgba(174, 174, 238, 0.829);
  border-style: none;
}
/* Крестик */
#close-btn {
  cursor: pointer;
  font-size: 2rem;
  top: 4%;
  left: 85%;
  position: absolute;
  transition: all 0.2s ease-in;
  width: 2rem; 
  border-style: none;
  background-color: white;
  transition: all 0.2s ease-in;
}
#close-btn:hover {
  color: #8a2387;
  font-size: 2.5rem;
}

#in-out-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.custom-alert {
  background-color: rgb(207, 189, 189);
  color: black;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  position: absolute;
  top: 22rem;
  margin: 0.5rem;
  display: none;
}
.custom-alert.erMsgActive {
  display: flex;
}
</style>

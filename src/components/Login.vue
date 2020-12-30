<template>
  <div>
        <div id="admin-form">
          <b-form @submit.prevent="onSubmit" v-if="show">
            <!-- Ввод имени -->
            <b-form-group id="input-group-2" label="Ваше имя:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.name"
                required
                placeholder="Введите имя"
              ></b-form-input>
            </b-form-group>
            <!-- Ввод пароля -->
            <b-form-group
              id="input-group-1"
              label="Введите пароль:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.password"
                type="password"
                required
                placeholder="Введите пароль"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Отправить</b-button>
            <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
          </b-form>
          <!-- Вывод данных с сервера -->
          <b-card class="mt-3" header="Ответ с сервера">
            <pre class="m-0">{{ getName }}</pre>
            <pre class="m-0">{{ getPass }}</pre>
          </b-card>
            <b-button @click="onDemand" variant="primary">Получить данные</b-button>
        </div>
     
   
  </div>
</template>
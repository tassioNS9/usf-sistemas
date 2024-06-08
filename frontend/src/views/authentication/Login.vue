<template>

  <section class="bg-[url('@/assets/background-main.jpg')] dark:bg-gray-900 ">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-screen">
      <div class="bg-indigo-700 w-full absolute top-0 h-10">
        header
      </div>
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        UFS SISTEMAS
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Faça login em sua conta
          </h1>
          <form class="space-y-4 md:space-y-6" action="post" @submit.prevent="login">
            <div>
              <label for="cpf" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
              <input type="text" name="cpf" id="cpf" v-model="user.cpf"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com" required="true">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
              <input type="password" name="password" id="password" v-model="user.password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="true">
              <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="errorLogin">
                {{ "CPF ou senha incorretos!" }}</p>
            </div>
            <div>
              <button type="submit"
                class="flex w-full justify-center rounded-md  bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Entrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">

import api from '@/services/api';
import { reactive, ref } from 'vue';
import { useAuth } from '@/stores/auth.js';
import { useRouter } from "vue-router";
const auth = useAuth();
const router = useRouter()
const user = reactive({
  cpf: '07469410562',
  password: '1234567'
})
const errorLogin = ref(false)

async function login() {

  await api.post('/api/auth', user, {
    headers: { 'Content-Type': 'application/json' },
  }).then(response => {
    errorLogin.value = false
    console.log(response)
    auth.setToken(response.data.user.token);
    auth.setUser(response.data.user);
    auth.setIsAuth(true);
    router.push({ path: '/app/dashboard' });
    window.location.href = '/app/dashboard'
  }).catch(err => {
    errorLogin.value = true

  });



}




</script>

<style scoped></style>
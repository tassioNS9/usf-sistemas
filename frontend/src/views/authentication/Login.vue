<template>
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-400">Faça Login em sua conta</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form @submit.prevent = "login" class="space-y-6" action="#" method="POST">
      <div>
        <label for="cpf" class="block text-sm font-medium leading-6 text-gray-900">CPF</label>
        <div class="mt-2">
          <input id="cpf" v-model="user.cpf" name="cpf" type="text" autocomplete="cpf" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Senha</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Esqueceu a Senha?</a>
          </div>
        </div>
        <div class="mt-2">
          <input id="password" v-model="user.password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md  bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Entrar</button>
      </div>
    </form>
  </div>
</div>
</template>


<script setup lang="ts">

import api from '@/services/api';
import {reactive} from 'vue';
import {useAuth} from '@/stores/auth.js';
import {useRouter} from "vue-router";
const auth = useAuth();
const router = useRouter()
const user = reactive({
  cpf:'07469410562',
  password:'12345678'
})

async function login(){
  try {
    const {data} = await api.post('/api/auth', user);
    console.log('aqui')
    console.log(data.user)
    auth.setToken(data.user.token);
    auth.setUser(data.user);
    auth.setIsAuth(true);
    router.push('/app/dashboard');
  } catch (error) {
    console.log(error);
  }
}


</script>

<style scoped>
</style>
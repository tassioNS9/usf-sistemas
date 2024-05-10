
<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <NewSidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>

</template>



<script  lang="ts">
import NewSideBar from "@/components/NewSideBar.vue";
import { reactive } from "vue";
import Header from "@/components/Header.vue";
import axiosInstance from 'axios'
import {useAuth} from '@/stores/auth.js';
//const authStore = useAuth()


//axiosInstance.defaults.headers.common['Authorization'] = 'Bearer '+authStore.token

export default{
  name:'Home'
}
type Register = {
    name: string
    nickName: string
    birthDate: string
    email: string
    password: string
    confirmPassword: string
}

const data = reactive<Register>({
    name: '',
    nickName: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: ''
})

function testt() {
    console.log(data)
}

</script>

<style scoped></style>

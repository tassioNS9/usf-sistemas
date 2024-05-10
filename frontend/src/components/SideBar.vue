

<template>
    <div class="flex">
        <!-- Backdrop -->
        <div :class="isOpen ? 'block' : 'hidden'"
            class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden" @click="isOpen = false" />
        <!-- End Backdrop -->

        <div :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
            class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
            <div class="flex items-center justify-center mt-8">
                <div class="flex items-center">
                    <svg class="w-12 h-12" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                            fill="#4C51BF" stroke="#4C51BF" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
                            fill="white" />
                    </svg>

                    <span class="mx-2 text-2xl font-semibold text-white">UFS Sistemas</span>
                </div>
            </div>

            <nav class="mt-10">
                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'Dashboard' ? activeClass : inactiveClass]" to="/app/dashboard">
                    <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                            fill="currentColor" />
                        <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z"
                            fill="currentColor" />
                    </svg>

                    <span class="mx-4">Dashboard</span>
                </router-link>


                <li class=" text-gray-500 transition duration-75 group-hover:text-gray-500 dark:text-gray-400 list-none">
               <button type="button"
                  class="flex items-center px-6 py-2 mt-3 duration-200 border-l-4"
                  aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                  <svg
                     class=" flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-white"
                     aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                     <path
                        d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                  </svg>
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Administrador</span>
                  <svg class="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 4 4 4-4" />
                  </svg>
               </button>
               <ul id="dropdown-example" class="hidden py-2 space-y-2">
                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'ListaUsuarios' ? activeClass : inactiveClass]" to="/app/lista-usuarios">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd" />
                    </svg>

                    <span class="mx-4">Lista de Usuários</span>
                </router-link>

                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'ListaUnidades' ? activeClass : inactiveClass]" to="/app/lista-unidades">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd" />
                    </svg>

                    <span class="mx-4">Lista de Unidades</span>
                </router-link>

                
                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'ListaIndicadores' ? activeClass : inactiveClass]" to="/app/lista-indicadores">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd" />
                    </svg>

                    <span class="mx-4">Lista de Indicadores</span>
                </router-link>

                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'RegistroUsuario' ? activeClass : inactiveClass]" to="/app/registro-usuario">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd" />
                    </svg>

                    <span class="mx-4">Cadastar Usuário</span>
                </router-link>
                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'RegistroUnidade' ? activeClass : inactiveClass]" to="/app/registro-unidade">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd" />
                    </svg>

                    <span class="mx-4">Cadastar Unidade</span>
                </router-link>
               </ul>
            </li>
          

                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'Indicadores' ? activeClass : inactiveClass]" to="/app/indicadores">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd" />
                    </svg>

                    <span class="mx-4">Indicadores</span>
                </router-link>

                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'Avaliacoes' ? activeClass : inactiveClass]" to="/app/avaliacoes">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fill-rule="evenodd"
                            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                            clip-rule="evenodd" />
                    </svg>

                    <span class="mx-4">Avaliações</span>
                </router-link>

                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'Perfil' ? activeClass : inactiveClass]" to="/app/perfil">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                        <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                        <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                    </svg>

                    <span class="mx-4">Meu Perfil</span>
                </router-link>
               <a
                  class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4">
                  <svg
                     class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                     aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                  </svg>
                  <span @click="logout()" class="mx-4 cursor-pointer">Sair</span> 
               </a>
         
            </nav>
        </div>
    </div>
</template>

<!-- <script setup lang="ts">

</script> -->


<script setup lang="ts">
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'
 import { useAuth } from "@/stores/auth";

 const auth = useAuth();

 const logout =  () => {
    auth.clear()
    //router.push('/')
 }

const { isOpen } = useSidebar()
const activeClass = ref(
    'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100',
)
const inactiveClass = ref(
    'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
)
</script>

<style></style>
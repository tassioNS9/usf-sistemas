<template>
    <div class="flex h-screen bg-gray-200 font-roboto">
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div class="container mx-auto px-6 py-8">
                    <section class="bg-slate-300  rounded-3xl  p-8 text-cyan-600">
                        <div class="max-w-3xl mx-auto px-4 py-8  lg:py-8">
                            <CardComponent>
                                <h2 class=" text-xl font-bold text-indigo-700 dark:text-white">Meu Perfil</h2>
                            </CardComponent>
                            <Loading v-if="load" />
                            <form action="#" v-else-if="!load">
                                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div class="sm:col-span-2">
                                        <label for="name"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                        <input type="text" name="name" id="name" v-model="userData.name"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    </div>
                                    <div class="w-full">
                                        <label for="cpf"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
                                        <input type="text" name="cpf" id="cpf" v-model="userData.cpf" readonly
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    </div>
                                    <div class="w-full">
                                        <label for="office"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cargo/Função</label>
                                        <input type="text" name="office" id="office" v-model="userData.office"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    </div>
                                    <div class="sm:col-span-2">
                                        <label for="unit"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unidade
                                            de
                                            Saúde</label>
                                        <h2
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            {{ userData.unit?.name }}
                                        </h2>
                                    </div>

                                    <div class="w-full">
                                        <label for="office"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                                        <input type="text" name="office" id="office"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    </div>

                                    <div class="w-full">
                                        <label for="office"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Confirmar Senha</label>
                                        <input type="text" name="office" id="office"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            value="">
                                    </div>

                                </div>
                                <div class="flex items-center space-x-4 mt-4">
                                    <button type="submit"
                                        class="text-white bg-indigo-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Atualizar
                                    </button>

                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    </div>
</template>

<script setup lang="ts">
import axiosInstance from 'axios'
import { ref, onMounted, reactive, computed } from 'vue'
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useAuth } from '@/stores/auth.js';
import Loading from '@/components/Loading.vue';
import Sidebar from '@/components/SideBar.vue'
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue'
import CardComponent from '@/components/CardComponent.vue'
const load = ref(false);
const auth = useAuth();




const userData = ref<User>({
    id: 0,
    id_unit: 0,
    name: '',
    password: '',
    cpf: '',
    office: '',
})


const rules = computed(() => {
    return {
        name: { required },
        office: { required },

    }
})

const v$ = useVuelidate(rules, userData)



onMounted(async () => {
    load.value = true
    userData.value = await auth.checkToken()
    console.log(userData.value)
    load.value = false
})

</script>

<style scoped></style>

<template>
    <section class=" dark:bg-gray-900">
        <div class="max-w-2xl px-4 py-8  lg:py-16">
            <h2 class="mb-4 text-xl font-bold text-indigo-700 dark:text-white">Informações do Usuário</h2>
            <form action="#">
                <div class="grid gap-4 mb-4 sm:grid-cols-4 sm:gap-6 sm:mb-5">
                    <div class="sm:col-span-3">
                        <label for="name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                        <input type="text" name="name" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value="" placeholder="Type product name" >
                    </div>
                    <div class="sm:col-span-3">
                        <label for="cpf"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
                        <input type="text" name="cpf" id="cpf"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value="" placeholder="Product brand" >
                    </div>
                    <div class="sm:col-span-3">
                        <label for="office"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cargo/Função</label>
                        <input type="text" name="office" id="office"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value="" placeholder="$299" >
                    </div>
                    <div class="sm:col-span-3" >
                        <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unidade
                            de
                            Saúde</label>
                        <select id="unit"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option >Selecione a Unidade</option>
                            <option value="TV">TV/Monitors</option>
                            <option value="PC">PC</option>
                            <option value="GA">Gaming/Console</option>
                            <option value="PH">Phones</option>
                        </select>

                        <div class="w-full">
                            <label for="office"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                            <input type="text" name="office" id="office"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value="" placeholder="$299">
                        </div>

                        <div class="w-full">
                            <label for="office"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                            <input type="text" name="office" id="office"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value="" placeholder="$299">
                        </div>
                    </div>

                </div>
                <div class="flex items-center space-x-4">
                    <button type="submit"
                        class="text-white bg-indigo-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Atualizar
                    </button>

                </div>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import NewSideBar from "@/components/NewSideBar.vue";
import axiosInstance from 'axios'
import { ref, onMounted, reactive, computed } from 'vue'
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

interface UserInferface {
    name: string;
    password: string;
    cpf: string;
    unit?: UnitInterface;
    id_unit: string;
    office: string;
}

interface UnitInterface {
    id: string;
    address: string;
    city: string;
    name: string;
    neighborhood: string;
    tel: string;
}

const userEdit = ref<UserInferface>({
    name: '',
    password: '',
    cpf: '',
    id_unit: '',
    office: ''
})

import { useAuth } from '@/stores/auth';
//import { confirmation } from '@/functions';

// const authStore = useAuth()

// axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token

// onMounted(() => {
//     //getUsers();
//     //getUnits();
// })
//const authStore = useAuth()

const load = ref(false);

const rules = computed(() => {
    return {
        name: { required },
        cpf: { required },
        office: { required },
        id_unit: { required }
    }
})

const v$ = useVuelidate(rules, userEdit)



</script>

<style scoped></style>

<template>
    <div class="p-8 text-cyan-700 font-extrabold">
        <section class=" dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 class="mb-4 text-xl font-bold text-indigo-700 dark:text-white">Criar Novo Indicador</h2>
                <form action="#" @submit.prevent="createIndicator" method="post">
                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div class="sm:col-span-2">
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição
                            </label>
                            <input type="text" name="description" id="description" v-model="dataIndicator.description"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="">
                                <p  class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.description.$error">
                            {{  "Descrição Obrigatória!"}}</p>
                        </div>
                        <div class="w-full">
                            <label for="brand"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dimensão</label>
                            <input type="text" name="brand" id="brand" v-model="dataIndicator.dimension"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="">
                                <p  class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.dimension.$error">
                            {{  "Dimensão Obrigatória!"}}</p>
                        </div>

                        <div class="w-full">
                            <label for="brand"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fontes</label>
                            <input type="text" name="brand" id="brand" v-model="dataIndicator.sources"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="">
                        
                        </div>
                        <div class="w-[150px]">
                            <label for="objective"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Objetivo</label>
                            <input type="number" name="objective" id="objective" v-model="dataIndicator.objective"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="">
                                <p  class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.objective.$error">
                            {{  "Objetivo Obrigatório!"}}</p>
                        </div>
                        <div>
                            <div class="sm:col-span-4">
                                <label for="type_indicator"
                                    class="block text-sm font-medium leading-6 text-gray-900">Tipo
                                    do indicador
                                </label>
                                <div class="flex mt-3">
                                    <div class=" sm:col-span-4 flex items-center me-4">
                                        <input id="inline-radio" type="radio" :value="typeIndicator.BOOL" name="inline-radio-group" v-model="dataIndicator.type_Indicator"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="inline-radio"
                                            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Binário
                                            (SIM ou Não)</label>
                                    </div>
                                    <div class="flex items-center me-4">
                                        <input id="inline-2-radio" type="radio" :value="typeIndicator.NUMERIC" name="inline-radio-group" v-model="dataIndicator.type_Indicator"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="inline-2-radio"
                                            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Númerico</label>
                                    </div>
                                    <p  class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.type_Indicator.$error">
                            {{  "Tipo do indicador é Obrigatório!"}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit"
                        class=" bg-indigo-700 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-indigo-800">
                        Criar indicador
                    </button>
                </form>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { required, minLength, maxLength } from '@vuelidate/validators'
import axiosInstance from '@/services/api';
import NewSideBar from "@/components/NewSideBar.vue";
import Swal from 'sweetalert2';
import { useVuelidate } from '@vuelidate/core'
const typeAvaliation = ref('');
const formatter = ref({
    date: 'DD MMM YYYY',
    month: 'MMM',
})

enum typeIndicator {
  BOOL = 'BOOL',
  NUMERIC = 'NUMERIC',
}

type Indicator = {
    description: string
    objective: number
    dimension: string
    type_Indicator: typeIndicator
    sources: string
}



const dataIndicator = ref<Indicator>({
    description: '',
    objective: 0,
    dimension: '',
    type_Indicator: typeIndicator.BOOL,
    sources: '',
})

const items = ref([])
const dateValue = ref([]);
console.log(dateValue.value)


const rules = computed(() => {
    return {
        description: { required }, // Matches state.firstName
        objective: { required }, // Matches state.lastName
        dimension: { required },
        type_Indicator: { required },
    }
})

const v$ = useVuelidate(rules, dataIndicator)


const createIndicator = async (e: any) => {
    const result = await v$.value.$validate()
    console.log(result)

    if (result) {
        axiosInstance.post('/api/indicators',
            {
                description: dataIndicator.value.description,
                objective: dataIndicator.value.objective,
                dimension: dataIndicator.value.dimension,
                type_Indicator: dataIndicator.value.type_Indicator,
                sources: dataIndicator.value.sources,

            }, {
            headers: { 'Content-Type': 'application/json' },

        }).then(res => {
            Swal.fire({
                title: "OK!",
                text: "Indicador registrado com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });
            console.log(res)
        }).catch(err => {
            Swal.fire({
                title: 'Erro ao cadastrar Indicador!',
                text: 'Algum erro inesperado aconteceu!',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            console.log(err)
        })
    } else {
        Swal.fire({
            title: 'Erro ao cadastrar!',
            text: 'Por favor verifique os campos!',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }

}



</script>
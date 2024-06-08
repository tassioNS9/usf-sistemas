<template>
    <Container>
        <CardComponent>
            <h3 class="text-xl font-bold text-indigo-700 dark:text-white">
                Lista de Indicadores
            </h3>
        </CardComponent>
        <div class="relative overflow-x-auto shadow-md bg-white sm:rounded-lg">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-1/2">
                    <form class="flex items-center" @submit.prevent="getFilteredIndicators(descriptionSearch)">
                        <InputSearch v-model="descriptionSearch" />
                    </form>
                </div>
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Descrição
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Objetivo
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tipo Indicador
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Dimensão
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Fontes
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Editar</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        v-for="(indicator, index) in dataIndicators" :key="indicator.id">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ indicator.description }}
                        </th>
                        <td class="px-6 py-4">
                            {{ indicator.objective }}
                        </td>
                        <td class="px-6 py-4">
                            {{ indicator.type_Indicator === 'NUMERIC' ? 'Númerico' : 'Binário' }}
                        </td>
                        <td class="px-6 py-4">
                            {{ indicator.dimension }}
                        </td>
                        <td class="px-6 py-4">
                            {{ indicator.sources }}
                        </td>
                        <td @click="openEditModal(indicator)" class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Avaliar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Container>

    <ModalCardComponent>
                    <CardComponent>
                        <h2 class="text-xl font-bold text-indigo-700 ">Registar avaliação</h2>
                    </CardComponent>
                    <form action="post" @submit.prevent="createEvaluation">
                        <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-8">
                            <div class="sm:col-span-2" v-if="typeIndicatorData === 'NUMERIC'">
                                <label for="valueNum"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor</label>
                                <input type="number" name="valueNum" id="valueNum" v-model="dataEvaluation.valueNum"
                                    class="remove-arrows bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.valueNum?.$error">
                                    {{ "Valor é Obrigatório!" }}</p>
                            </div>
                            <div class="sm:col-span-2" v-if="typeIndicatorData === 'BOOL'">
                                <label for="valueBol"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor</label>
                                <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input id="bordered-radio-1" type="radio" v-model="dataEvaluation.valueBol"
                                        :value=true name="bordered-radio"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="bordered-radio-1"
                                        class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">SIM</label>
                                </div>
                                <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input id="bordered-radio-2" type="radio" name="bordered-radio"
                                        v-model="dataEvaluation.valueBol" :value=false
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="bordered-radio-2"
                                        class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">NÃO</label>

                                </div>
                                <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.valueBol?.$error">
                                    {{ "Selecione uma opção!" }}</p>
                            </div>

                            <div class="sm:col-span-2">
                                <input type="month" v-model="dataEvaluation.date_evaluation"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400"
                                    v-if="v$.date_evaluation.$error">
                                    {{ "Data inválida!" }}</p>
                            </div>
                        </div>
                        <div class=" flex items-center space-x-4">
                            <button type="submit"
                                class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none">
                                CONFIRMAR
                            </button>
                        </div>
                    </form>
    </ModalCardComponent>

</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import Swal from 'sweetalert2';
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, maxValue } from '@vuelidate/validators'
import axiosInstance from '@/services/api';
import { useAuth } from "@/stores/auth";
import { type Evaluation } from "@/types/user";
import Container from '@/components/Container.vue'
import CardComponent from '@/components/CardComponent.vue'
import InputSearch from '@/components/InputSearch.vue'
import ModalCardComponent from "@/components/ModalCardComponent.vue";
import useModalToggle from "@/composables/useModalToggle";
import useIndicatorsList from "@/composables/useIndicatorsList";
const auth = useAuth();

enum typeIndicator {
    BOOL = 'BOOL',
    NUMERIC = 'NUMERIC',
}

const typeIndicatorData = ref('')
const {isOpenModal} = useModalToggle()
const dataEvaluation = ref<Evaluation>({
    id_indicator: 0,
    id_unit: 0,
    date_evaluation: '' as any,
    evaluator: auth.fullName,
    valueNum: null,
    valueBol: true
})
const descriptionSearch = ref('')

const getFilteredIndicators = async (description: string) => {
    console.log(description)
    const search = description ? `/search?searchString=${description}` : ''


    await axiosInstance.get(`/api/indicators${search}`).then(response => {
        (dataIndicators.value = response.data.data, console.log("Indicators", response.data.data))
    }).catch(error => {
        console.log(error)
    })
}


const openEditModal = (data: any) => {
    isOpenModal.value = true
    typeIndicatorData.value = data.type_Indicator
    dataEvaluation.value.id_indicator = data.id
}

const rules = computed(() => {

    if (typeIndicatorData.value === typeIndicator.BOOL) {
        dataEvaluation.value.valueNum = null
        return {
            id_indicator: { required },
            id_unit: { required },
            date_evaluation: { required, minValue: minValue(new Date('2023-01-01') as any), maxValue: maxValue(new Date() as any) },
            valueBol: { required }
        }
    } else {
        dataEvaluation.value.valueBol = null
        return {
            id_indicator: { required },
            id_unit: { required },
            date_evaluation: { required, minValue: minValue(new Date('2023-01-01') as any), maxValue: maxValue(new Date() as any) },
            valueNum: { required, minValue: minValue(1) }
        }
    }


})

const v$ = useVuelidate(rules, dataEvaluation)


const createEvaluation = async () => {
    dataEvaluation.value.date_evaluation = new Date(dataEvaluation.value.date_evaluation) as any
    console.log('first', dataEvaluation.value.date_evaluation)



    const result = await v$.value.$validate()
    console.log(result)
    console.log(v$.value)

    if (result) {
        await axiosInstance.post('/api/evaluations',
            {
                id_indicator: dataEvaluation.value.id_indicator,
                id_unit: auth.userAuthetincated.id_unit,
                evaluator: dataEvaluation.value.evaluator,
                date_evaluation: dataEvaluation.value.date_evaluation,
                valueNum: dataEvaluation.value.valueNum,
                valueBol: dataEvaluation.value.valueBol

            }, {
            headers: { 'Content-Type': 'application/json' },

        }).then(res => {
            Swal.fire({
                title: "OK!",
                text: "Avaliação criada com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });

            console.log(res)
        }).catch(err => {
            Swal.fire({
                title: 'Erro ao criar avaliação!',
                text: 'Algum erro inesperado aconteceu!',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            console.log(err)
        })
    } else {
        Swal.fire({
            title: 'Erro ao criar avaliação!',
            text: 'Por favor verifique os campos!',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }

    dataEvaluation.value.valueNum = null

}

const {dataIndicators, isload} = useIndicatorsList()

</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button { 
    -webkit-appearance: none;
    
}
input[type=number] { 
   -moz-appearance: textfield;
   appearance: textfield;

}

</style>
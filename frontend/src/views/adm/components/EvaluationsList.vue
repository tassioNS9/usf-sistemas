<template>
    <Container>
        <CardComponent>
            <h3 class="text-xl font-bold text-indigo-700 dark:text-white">
                Lista de Avaliações
            </h3>
        </CardComponent>
        <Loading v-if="isload" />
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white" v-else>
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">

                <!---fitro-->
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>

                        <th scope="col" class="px-6 py-3">
                            Indicador
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tipo do Indicador
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Avaliador(a)
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Valor
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Mês da Avaliação
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        v-for="(evaluation, index) in dataEvaluations" :key="evaluation.id">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ evaluation?.indicator?.description }}
                        </th>
                        <td class="px-6 py-4">
                            {{ evaluation?.indicator?.type_Indicator }}
                        </td>
                        <td class="px-6 py-4">
                            {{ evaluation?.evaluator }}
                        </td>
                        <td class="px-6 py-4">
                            {{ evaluation.valueBol === null ? evaluation.valueNum : formatTypeBol(evaluation.valueBol)
                            }}
                        </td>
                        <td class="px-6 py-4">
                            {{ formatData(evaluation.date_evaluation.toString()) }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- <NavPage /> -->
        </div>
    </Container>
</template>

<script setup lang="ts">
import axiosInstance from '@/services/api'
import { ref, onMounted} from 'vue'
import Loading from '@/components/Loading.vue';
import { formatData } from '@/utils/formatDate'
import { formatTypeBol } from '@/utils/formatTypeBol';
import NavPage from '@/components/NavPage.vue'
import CardComponent from '@/components/CardComponent.vue'
import Container from '@/components/Container.vue'
import useEvaluationsList from '@/composables/useEvaluationsList';


const getFilteredEvaluations = async (description: string) => {

    await axiosInstance.get(`/api/evaluations/unit/2/1`).then(response => {
        (dataEvaluations.value = response.data.data, console.log("Evaluations", response.data.data))
    }).catch(error => {
        console.log(error)
    })
}

const {dataEvaluations, isload}= useEvaluationsList()


</script>
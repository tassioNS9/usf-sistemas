<template>
    <section class="bg-slate-300 mt-3 mx-auto rounded-3xl max-w-[900px] min-h-[500px] p-8">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 class="mb-4 text-xl font-bold text-indigo-700  dark:text-white">Nova Avaliação</h2>
            <form action="#">
                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">

                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecionar
                            Indicador</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option>Indicador</option>
                            <option value="TV">TV/Monitors</option>
                            <option value="PC">PC</option>
                            <option value="GA">Gaming/Console</option>
                            <option value="PH">Phones</option>
                        </select>
                    </div>

                    <div class="w-full">
                        <label for="value" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor do
                            Indicador</label>
                        <input type="number" name="value" id="value"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="">

                        <!-- <div class="flex mt-4">
                                <div class=" sm:col-span-4 flex items-center me-4">
                                    <input id="inline-radio" type="radio" value="" name="inline-radio-group"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="inline-radio"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        SIM</label>
                                </div>
                                <div class="flex items-center me-4">
                                    <input id="inline-2-radio" type="radio" value="" name="inline-radio-group"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="inline-2-radio"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">NÃO</label>
                                </div>
                            </div> -->
                    </div>

                    <div class="relative max-w-sm">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input datepicker type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Select date">
                    </div>

                </div>
                <button type="submit"
                    class=" bg-indigo-700 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-indigo-800">
                    Salvar Avaliação
                </button>
            </form>
        </div>
    </section>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Swal from 'sweetalert2';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
const typeAvaliation = ref('');
// const formatter = ref({
//     date: 'DD MMM YYYY',
//     month: 'MMM',
// })



type Evaluation = {
    id_indicator: string
    user_id: string
    date_evaluation: Date
    valueNum?: number | null
    valueBol?: boolean | null
}



const dataEvaluation = ref<Evaluation>({
    id_indicator: '',
    user_id: '',
    date_evaluation: new Date(),
    valueNum: null,
    valueBol: null
})

const items = ref([])
const dateValue = ref([]);
console.log(dateValue.value)

const rules = computed(() => {
    const localRules = {
        valueNum: { required }
    }
    if (dataEvaluation.value.valueNum === null) {
        localRules.valueNum = { required }
    }
    return {
        id_indicator: { required }, // Matches state.firstName
    }
})

const v$ = useVuelidate(rules, dataEvaluation)


//const v$ = useVuelidate(rules, data)



</script>
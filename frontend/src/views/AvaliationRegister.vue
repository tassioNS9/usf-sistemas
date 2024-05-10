<template>
        <section class=" dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 class="mb-4 text-xl font-bold text-indigo-700  dark:text-white">Nova Avaliação</h2>
                <form action="#">
                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div class="w-full">
                            <label for="value"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor do Indicador</label>
                            <input type="number" name="value" id="value"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="">
                        </div>
                        <div>
                            <label for="category"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecionar
                                Indicador</label>
                            <select id="category"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option >Selecão Indicador</option>
                                <option value="TV">TV/Monitors</option>
                                <option value="PC">PC</option>
                                <option value="GA">Gaming/Console</option>
                                <option value="PH">Phones</option>
                            </select>

                            <div class="sm:col-span-8 mt-2">
                                <label for="type_indicator"
                                    class="block text-sm font-medium leading-6 text-gray-900">Valor
                                    do indicador
                                </label>
                                <div class="flex mt-3">
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

                                </div>
                            </div>
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
const typeAvaliation = ref('');
const formatter = ref({
    date: 'DD MMM YYYY',
    month: 'MMM',
})

const items = ref([])
const dateValue = ref([]);
console.log(dateValue.value)

const rules = computed(() => {
    return {

        //office: { required }
    }
})


//const v$ = useVuelidate(rules, data)



</script>
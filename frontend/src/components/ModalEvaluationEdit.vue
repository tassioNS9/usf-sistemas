<template>
     <div :class="`modal ${!open && 'opacity-0 pointer-events-none'
            } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`">
            <div class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay" @click="open = false" />

            <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
                <div
                    class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close">
                    <svg class="text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                        viewBox="0 0 18 18">
                        <path
                            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                    </svg>
                    <span class="text-sm">(Esc)</span>
                </div>

                <!-- Add margin if you want to see some of the overlay behind the modal -->
                <div class="px-6 py-4 text-left modal-content">
                    <!-- Title -->
                    <div class="flex items-center justify-between pb-3">

                        <div class="z-50 cursor-pointer modal-close" @click="open = false">
                            <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18"
                                height="18" viewBox="0 0 18 18">
                                <path
                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                            </svg>
                        </div>
                    </div>

                    <!-- Body -->
                    <div class="min-w-[250px] px-4 py-8 mx-auto lg:py-16">
                        <h2 class="mb-4 text-xl font-bold text-indigo-700 dark:text-white">Registar avaliação</h2>
                        <form action="post" @submit.prevent="createEvaluation">
                            <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                <div class="sm:col-span-2" v-if="typeIndicatorData === 'NUMERIC'">
                                    <label for="valueNum"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor</label>
                                    <input type="number" name="valueNum" id="valueNum" v-model="dataEvaluation.valueNum"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                    <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400"
                                        v-if="v$.valueNum?.$error">
                                        {{ "Valor é Obrigatório!" }}</p>
                                </div>
                                <div class="sm:col-span-2" v-if="typeIndicatorData === 'BOOL'">
                                    <label for="valueBol"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor</label>
                                    <div
                                        class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                        <input id="bordered-radio-1" type="radio" 
                                            v-model="dataEvaluation.valueBol" :value=true name="bordered-radio"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="bordered-radio-1"
                                            class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">SIM</label>
                                    </div>
                                    <div
                                        class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                        <input  id="bordered-radio-2" type="radio"
                                            name="bordered-radio" v-model="dataEvaluation.valueBol"  :value=false
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="bordered-radio-2"
                                            class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">NÃO</label>
                                 
                                    </div>
                                    <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400"
                                        v-if="v$.valueBol?.$error">
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
                    </div>
                </div>
            </div>
        </div>
</template>
<template>
    <section class="bg-slate-300  rounded-3xl  p-8 text-cyan-600">
        <div class="max-w-3xl mx-auto px-4 py-8  lg:py-8">
            <CardComponent>
                    <h2 class=" text-xl font-bold text-indigo-700 dark:text-white">Cadastrar nova Unidade</h2>
                </CardComponent>
            <form action="post" @submit.prevent="createUnit">
                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div class="sm:col-span-2">
                        <label for="name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Nome</label>
                        <input type="text" v-model="data.name" name="name" id="name" autocomplete="given-name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.name.$error">
                            {{ v$.name.$errors[0].$params.type === 'required' ? "Campo obrigatório!" : "Nome inválido!"}}</p>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="cpf"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Endereco</label>
                        <input type="text" name="cpf" id="cpf" v-model="data.address"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.address.$error">
                            {{ "Campo obrigatório!" }}</p>
                    </div>
                    <div class="w-full">
                        <label for="office"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Cidade</label>
                        <input type="text" name="office" id="office" v-model="data.city"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.city.$error">
                            {{ "Campo obrigatório!" }}</p>

                    </div>

                    <div class="w-full">

                        <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Estado
                        </label>
                        <select id="state" name="state" autocomplete="state-name" v-model="data.state"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option>Selecione o estado</option>
                            <option v-for="(state, index) in brazilStates" :value="state.name" :key="state.uf">
                                {{ state.name }}</option>
                        </select>
                        <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.state.$error">
                            {{ "Campo obrigatório!" }}</p>
                    </div>

                    <div class="w-full">
                        <label for="neighborhood"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bairro</label>
                        <input type="text" name="neighborhood" id="neighborhood" v-model="data.neighborhood"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">

                    </div>

                    <div class="w-full">
                        <label for="tel"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                        <input type="text" name="tel" id="tel" v-model="data.tel"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    </div>

                </div>
                <div class="flex items-center space-x-4 mt-4">
                    <button type="submit"
                        class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Confirmar
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import axiosInstance from '@/services/api';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { brazilStates } from "@/utils/statesDate";
import Swal from 'sweetalert2';
import CardComponent from '@/components/CardComponent.vue'
import {type Unit} from '@/types/user'

const data = ref<Unit>({
    name: '',
    tel: '',
    address: '',
    state: '',
    city: '',
    neighborhood: ''

})

const rules = computed(() => {
    return {
        name: { required, minLength: minLength(3) }, // Matches state.firstName
        address: { required, minLength: minLength(8) },
        city: { required },
        state: { required },
        //office: { required }
    }
})

const v$ = useVuelidate(rules, data)

const createUnit = async (e: any) => {
    const result = await v$.value.$validate()
    console.log(result)

    if (result) {
        axiosInstance.post('/api/units',
            {
                name: data.value.name,
                tel: data.value.tel,
                address: data.value.address,
                state: data.value.state,
                city: data.value.city,
                neighborhood: data.value.neighborhood


            }, {
            headers: { 'Content-Type': 'application/json' },

        }).then(res => {
            Swal.fire({
                title: "OK!",
                text: "Unidade cadastrada com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });
            console.log(res)
        }).catch(err => {
            Swal.fire({
                title: 'Erro ao Cadastar!',
                text: `${err.data.message}`,
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            console.log(err)
        })
    } else {
        Swal.fire({
            title: 'Erro ao Cadastar!',
            text: 'Por favor verifique os campos!',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }

}

</script>

<style scoped></style>
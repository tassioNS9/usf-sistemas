<template>
    <div class="mt-1 mx-auto rounded-3xl  p-4">
        <CardComponent>
            <h3 class="text-xl font-bold text-indigo-700 dark:text-white">
                Lista de Unidades
            </h3>
        </CardComponent>

        <Loading v-if="isload" />
        <div class="relative overflow-x-auto shadow-md bg-white sm:rounded-lg" v-else>
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-1/2">
                    <form class="flex items-center" @submit.prevent="getFilteredUnits(searchUnit)">
                        <InputSearch v-model="searchUnit" />
                    </form>
                </div>

            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Unidade Médica
                        </th>
                        <th scope="col" class="px-6 py-3 ">
                            Endereço
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Cidade
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Estado
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Editar</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        v-for="(unit, index) in dataUnits" :key="unit.id">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ unit?.name }}
                        </th>
                        <td class="px-6 py-4 ">
                            {{ unit.address }}
                        </td>
                        <td class="px-6 py-4">
                            {{ unit.city }}
                        </td>
                        <td class="px-6 py-4">
                            {{ unit.state }}
                        </td>
                        <td @click="openEditModal(unit)" class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <ModalCardComponent>
        <CardComponent>
            <Title text="Atualizar Unidade" />
        </CardComponent>
        <form action="post" @submit.prevent="updateUnit">
            <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                <div class="sm:col-span-2">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome da
                        Unidade</label>
                    <input type="text" name="name" id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        v-model="editUnit.name" placeholder="Type product name">
                    <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.name.$error">
                        {{ v$.name.$errors[0].$params.type === 'required' ? "Nome obrigatório!" : "Email inválido!" }}
                    </p>
                </div>
                <div class="sm:col-span-2">
                    <label for="address"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço</label>
                    <input type="text" name="address" id="address" v-model="editUnit.address"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.address.$error">
                        {{ v$.address.$errors[0].$params.type === 'required' ? "Endereço obrigatório!" : "Email inválido!" }}</p>
                </div>
                <div class="w-full">
                    <label for="city"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                    <input type="text" name="city" id="city" v-model="editUnit.city"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Cidade">
                    <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.city.$error">
                        {{ v$.city.$errors[0].$params.type === 'required' ? "Campo obrigatório!" : "Email inválido!" }}
                    </p>
                </div>
                <div class="w-full">
                    <label for="state"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                    <select id="state" name="state" autocomplete="state-name" v-model="editUnit.state"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option v-for="(state, index) in brazilStates" :value="state.name" :key="state.uf">{{ state.name
                            }}</option>
                    </select>
                    <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.state.$error">
                        {{ v$.state.$errors[0].$params.type === 'required' ? "Campo obrigatório!" : "Email inválido!" }}
                    </p>
                </div>
            </div>
            <div class=" flex items-center space-x-4">
                <button type="submit"
                    class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none">
                    Atualizar
                </button>
            </div>
        </form>
    </ModalCardComponent>
</template>

<script setup lang="ts">
import axiosInstance from '@/services/api'
import { brazilStates } from '@/utils/statesDate'
import { ref, onMounted, reactive, computed } from 'vue'
import useVuelidate from "@vuelidate/core";
import Swal from 'sweetalert2';
import { required, minLength, email } from "@vuelidate/validators";
import { useAuth } from '@/stores/auth';
import { type Unit } from '@/types/user'
import Loading from '@/components/Loading.vue'
import InputSearch from '@/components/InputSearch.vue';
import CardComponent from '@/components/CardComponent.vue'
import ModalCardComponent from '@/components/ModalCardComponent.vue';
import Title from "@/components/Title.vue"
import useModalToggle from '@/composables/useModalToggle';
import useUnitsList from '@/composables/useUnitsList';

//const authStore = useAuth()

//axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token

const editUnit = ref<Unit>({
    name: '',
    address: '',
    city: '',
    neighborhood: '',
    tel: '',
    state: ''
})

const searchUnit = ref('')
const { isOpenModal } = useModalToggle()
const rules = computed(() => {
    return {
        name: { required },
        address: { required },
        city: { required },
        neighborhood: { required },
        state: { required }
    }
})

const v$ = useVuelidate(rules, editUnit)


const getFilteredUnits = async (description: string) => {
    console.log(description)
    const search = description ? `/search?searchString=${description}` : ''


    await axiosInstance.get(`/api/units${search}`).then(response => {
        (dataUnits.value = response.data.data)
    }).catch(error => {
        console.log(error)
    })
}

const openEditModal = (data: any) => {
    editUnit.value = data
    isOpenModal.value = true
}

const updateUnit = async (e: any) => {
    const result = await v$.value.$validate()
    if (result) {
        await axiosInstance.put(`/api/units/${editUnit.value.id}`,
            {
                name: editUnit.value.name,
                address: editUnit.value.address,
                city: editUnit.value.city,
                state: editUnit.value.state

            }, {
            headers: { 'Content-Type': 'application/json' },

        }).then(res => {
            Swal.fire({
                title: "OK!",
                text: "Unidade editada com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });

            console.log(res)
        }).catch(err => {
            Swal.fire({
                title: 'Erro ao atualizar cadastro!',
                text: 'Algum erro inesperado aconteceu!',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            console.log(err)
        })
    } else {
        Swal.fire({
            title: 'Erro ao atualizar cadastro!',
            text: 'Por favor verifique os campos!',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }

}


const {dataUnits, isload} = useUnitsList()

</script>

<style>
.modal {
    transition: opacity 0.25s ease;
}
</style>
<template>
    <div class=" mt-3 mx-auto rounded-3xl  p-8">
        <h3 class="mb-4 text-xl font-bold text-indigo-700 dark:text-white">
            Lista de Unidades
        </h3>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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

    <div>
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
                        <h2 class="mb-4 text-xl font-bold text-indigo-700 dark:text-white">Atualizar Unidade</h2>
                        <form action="#">
                            <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                <div class="sm:col-span-2">
                                    <label for="name"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome da
                                        Unidade</label>
                                    <input type="text" name="name" id="name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        v-model="editUnit.name" placeholder="Type product name">
                                    <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.name.$error">
                                        {{ v$.name.$errors[0].$params.type === 'required' ? "Nome obrigatório!" : "Email inválido!"}}</p>
                                </div>
                                <div class="sm:col-span-2">
                                    <label for="address"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço</label>
                                    <input type="text" name="address" id="address" v-model="editUnit.address"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400"
                                        v-if="v$.address.$error">
                                        {{ v$.address.$errors[0].$params.type === 'required' ? "Endereço obrigatório!" :
                                        "Email inválido!"}}</p>
                                </div>
                                <div class="w-full">
                                    <label for="city"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                                    <input type="text" name="city" id="city" v-model="editUnit.city"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Cidade">
                                    <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.city.$error">
                                        {{ v$.city.$errors[0].$params.type === 'required' ? "Campo obrigatório!" :
                                        "Email inválido!"}}</p>
                                </div>
                                <div class="w-full">
                                    <label for="state"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                                    <select id="state" name="state" autocomplete="state-name" v-model="editUnit.state"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option v-for="(state, index) in brazilStates" :value="state.name"
                                            :key="state.uf">{{ state.name }}</option>
                                    </select>
                                    <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.state.$error">
                                        {{ v$.state.$errors[0].$params.type === 'required' ? "Campo obrigatório!" :
                                        "Email inválido!"}}</p>
                                </div>
                            </div>
                            <div class=" flex items-center space-x-4">
                                <button type="submit" @click="updateUnit"
                                    class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none">
                                    Atualizar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axiosInstance from '@/services/api'
import { brazilStates } from '@/utils/statesDate'
import { ref, onMounted, reactive, computed } from 'vue'
import useVuelidate from "@vuelidate/core";
import Swal from 'sweetalert2';
import { required, minLength, email } from "@vuelidate/validators";
import NewSideBar from '@/components/NewSideBar.vue';

interface UnitInterface {
    id: string,
    name: string;
    address: string;
    city: string;
    neighborhood: string;
    tel: string;
    state: string;
}

const dataUnits = ref<UnitInterface[]>([])
const editUnit = ref<UnitInterface>({
    id: '',
    name: '',
    address: '',
    city: '',
    neighborhood: '',
    tel: '',
    state: ''
})
const activeEdit = ref(false)
const load = ref(false);

const open = ref(false)

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
//import { useAuthStore } from '@/stores/auth';
//import { confirmation } from '@/functions';

//const authStore = useAuthStore()

//axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken

// items: [] as { id: number, body: string, username: string, likes: number }[]

onMounted(() => {
    getUnits();
})



const getUnits = async () => {
    console.log('oi')
    await axiosInstance.get('/api/units').then(
        response => (dataUnits.value = response.data.data, console.log(response.data.data)))
        .catch((error) => {
            console.log(error);
        });
}

const openEditModal = (data: any) => {
    editUnit.value = data
    open.value = true
    console.log(editUnit.value)
    activeEdit.value = true
}

const updateUnit = async (e: any) => {
    e.preventDefault();
    console.log(editUnit.value)
    const result = await v$.value.$validate()
    console.log(result)
    if (result) {
        axiosInstance.put(`/api/units/${editUnit.value.id}`,
            {
                name: editUnit.value.name,
                address: editUnit.value.address,
                city: editUnit.value.city,
                state: editUnit.value.state

            }, {
            headers: { 'Content-Type': 'application/json' },

        }).then(res => {
            Swal.fire({
                title: "Yay!",
                text: "Usuário editado com sucesso!",
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


const toggleActiveEdit = () => {
    activeEdit.value = false;
}

</script>

<style>
.modal {
    transition: opacity 0.25s ease;
}
</style>
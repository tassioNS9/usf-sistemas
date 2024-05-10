<template>
            <div class="p-8">
                <form @submit.prevent="submitForm">
                    <div class="border-b border-gray-900/10 pb-10">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">Cadastrar novo Usuário</h2>

                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols">
                            <div class="sm:col-span-6">
                                <label for="name" class="block text-sm font-medium leading-6 text-gray-900">*Nome</label>
                                <div class="mt-2">
                                    <input type="text" v-model="data.name" name="name" id="name"
                                        autocomplete="given-name"
                                        class=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <p  class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.name.$error">
                            {{ v$.name.$errors[0].$params.type === 'required' ? "Nome obrigatório!" : "Nome inválido!"}}</p>
                                    </div>
                            
                            </div>

                            <div class="sm:col-span-6">
                                <label for="cpf" class="block text-sm font-medium leading-6 text-gray-900">*CPF
                                </label>
                                <div class="mt-2">
                                    <input type="text" name="cpf" id="cpf" maxlength="11" v-model="data.cpf" autocomplete="family-name"
                                        class=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <p  class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.cpf.$error">
                            {{ v$.cpf.$errors[0].$params.type === 'required' ? "CPF obrigatório!" : "CPF inválido!"}}</p>
                                    </div>
                            </div>

                            <div class="sm:col-span-6">
                                <label for="unit" class="block text-sm font-medium leading-6 text-gray-900">*Unidade
                                    de Sáude</label>
                                <div class="mt-2">
                                    <select id="unit" name="unit" autocomplete="unit-name"
                                        placeholder="escolha a unidade" v-model="data.unitId"
                                        class=" px-2 block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                        <option v-for="(unit, index) in dataUnits" :value="unit.id" :key="unit.id">
                                            {{ unit.name }}</option>

                                    </select>
                                    <p  class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.unitId.$error">
                            {{ "Unidade obrigatória!"}}</p>
                                </div>
                            </div>

                            <div class="sm:col-span-6">
                                <label for="office"
                                    class="block text-sm font-medium leading-6 text-gray-900">Cargo/Função
                                </label>
                                <div class="mt-2">
                                    <input type="text" name="office" id="office" autocomplete="family-name"
                                        v-model="data.office"
                                        class=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>

                                <div class="sm:col-span-6">
                                    <label for="office" class="block text-sm font-medium leading-6 text-gray-900">*Senha
                                    </label>
                                    <div class="mt-2">
                                        <input type="text" name="office" id="office" autocomplete="family-name"
                                            v-model="data.password"
                                            class=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                            <p  class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.password.$error">
                            {{ v$.password.$errors[0].$params.type === 'required' ? "Senha Obrigatória!" : "Senha de no minímo 8 caracteres!"}}</p>

                 
                                        </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="mt-2 flex items-center justify-end gap-x-6">
                        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                        <button type="submit" @click="createUser"
                            class="rounded-md bg-indigo-700  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-indigo-800 ">Salvar</button>
                    </div>
                </form>
            </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import NewSideBar from "@/components/NewSideBar.vue";
import { useVuelidate } from '@vuelidate/core'
import { onMounted } from "vue";
import { required, minLength, maxLength } from '@vuelidate/validators'
import axiosInstance from '@/services/api';
import Swal from 'sweetalert2';

const dataUnits = ref<Unit[]>([])

onMounted(() => {
    getUnits();
})

type Unit = {
    id: string
    name: string
    tel: string
    address: string
    state: string
    city: string
    neighborhood: string
}

type User = {
    name: string
    password: string
    cpf: string
    unitId: string
    office: string
}

const data = ref<User>({
    name: '',
    password: '',
    cpf: '',
    unitId: '',
    office: ''
})

const rules = computed(() => {
    return {
        name: { required, minLength: minLength(3) }, // Matches state.firstName
        cpf: { required , minLength: minLength(11), maxLength:maxLength(11)}, // Matches state.lastName
        password:{required, minLength:minLength(8), },
        unitId: { required },
        //office: { required }
    }
})


const v$ = useVuelidate(rules, data)

const getUnits = async () => {
    await axiosInstance.get('/api/units').then(
        response => (dataUnits.value = response.data.data, console.log("units", dataUnits.value)))
        .catch((error) => {
            console.log(error);
        });
}


const createUser = async (e: any) => {
    e.preventDefault();
    console.log('fdkh')
    console.log(data.value.unitId)
    const result = await v$.value.$validate()
    console.log(result)

    if (result) {
        axiosInstance.post('/api/users',
            {
                name: data.value.name,
                password: data.value.password,
                cpf: data.value.cpf,
                id_unit: data.value.unitId,
                office: data.value.office,

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
                title: 'Erro ao atualizar!',
                text: 'Algum erro inesperado aconteceu!',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            console.log(err)
        })
    } else {
        Swal.fire({
            title: 'Erro ao atualizar!',
            text: 'Por favor verifique os campos!',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }

}



const submitForm = async () => {
    const result = await v$.value.$validate();
    if (result) {
        alert("Sucess, form submetido!!")
    } else {
        alert("error, form not submitted!")
    }

}



</script>

<style scoped></style>
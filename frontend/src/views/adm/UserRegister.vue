<template>
    <section class="bg-slate-300  rounded-3xl  p-8 text-cyan-600">
        <div class="max-w-3xl mx-auto px-4 py-8  lg:py-8">
            <h2 class="mb-4 text-xl font-bold text-indigo-700 dark:text-white">Cadastrar novo usuário</h2>
            <form action="post" @submit.prevent="createUser">
                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div class="sm:col-span-2">
                        <label for="name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Nome</label>
                        <input type="text" v-model="data.name" name="name" id="name" autocomplete="given-name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                            <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.name.$error">
                                {{ v$.name.$errors[0].$params.type === 'required' ? "Campo obrigatório!" : "Nome inválido!"}}</p>
                    </div>
                    <div class="w-full">
                        <label for="cpf"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*CPF</label>
                        <input type="text" name="cpf" id="cpf" v-model="data.cpf"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                        <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.cpf.$error">
                                {{ v$.cpf.$errors[0].$params.type === 'required' ? "Campo obrigatório!" : "CPF inválido!"}}</p>
                    </div>
                    <div class="w-full">
                        <label for="office"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cargo/Função</label>
                        <input type="text" name="office" id="office" v-model="data.office"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                             >
                    
                    </div>
                    <div class="sm:col-span-2">
                        <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Unidade
                            de
                            Saúde</label>
                            <select id="unit" name="unit" autocomplete="unit-name" placeholder="escolha a unidade"
                                v-model="data.unitId"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option v-for="(unit, index) in dataUnits" :value="unit.id" :key="unit.id">
                                    {{ unit.name }}</option>

                            </select>
                            <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.unitId.$error">
                                {{ v$.unitId.$errors[0].$params.type === 'required' ? "Campo obrigatório!" : "Nome inválido!"}}</p>
                    </div>

                    <div class="w-full">
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Senha</label>
                            <input type="text" name="password" id="password" v-model="data.password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.password.$error">
                                {{ v$.password.$errors[0].$params.type === 'required' ? "Campo obrigatório!" : "Senha Invalída!"}}</p>
                        </div>

                        <div class="w-full">
                            <label for="confirmPassword"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Confirmar Senha</label>
                            <input type="text" name="confirmPassword" id="confirmPassword" v-model="data.confirmPassword"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                 >
                                 <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.confirmPassword.$error">
                                {{ v$.confirmPassword.$errors[0]}}</p>
                        </div>

                </div>
                <div class="flex items-center space-x-4 mt-4">
                    <button type="submit"
                        class="text-white bg-indigo-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Atualizar
                    </button>

                </div>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import NewSideBar from "@/components/NewSideBar.vue";
import { useVuelidate } from '@vuelidate/core'
import { onMounted } from "vue";
import { required, minLength, sameAs, maxLength } from '@vuelidate/validators'
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
    confirmPassword: string
}

const data = ref<User>({
    name: '',
    password: '',
    cpf: '',
    unitId: '',
    office: '',
    confirmPassword: '',
})

const rules = computed(() => {
    return {
        name: { required, minLength: minLength(3) }, // Matches state.firstName
        cpf: { required, minLength: minLength(11), maxLength: maxLength(11) }, // Matches state.lastName
        password: { required, minLength: minLength(8), },
        unitId:{required},
        confirmPassword: {
            sameAsPassword: sameAs(data.value.password), // can be a reference to a field or computed property
        }
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
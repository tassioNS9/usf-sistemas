<template>
    <form>
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-10">
                <h2 class="text-base font-semibold leading-7 text-gray-900">Cadastro de nova Unidade</h2>


                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-9">
                    <div class="sm:col-span-3">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Nome
                            Unidade</label>
                        <div class="mt-2">
                            <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                                v-model="data.name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.name.$error">
                                {{ v$.name.$errors[0].$params.type === 'required' ? "Nome obrigatório!" : "Email inválido!"}}</p>
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Estado</label>
                        <div class="mt-2">
                            <select id="state" name="state" autocomplete="state-name" v-model="data.state"
                                class="block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:border-primary-500 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option>Selecione o estado</option>
                                <option v-for="(state, index) in brazilStates" :value="state.name" :key="state.uf">
                                    {{ state.name }}</option>
                            </select>
                            <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.state.$error">
                                {{"Estado obrigatório!"}}</p>
                        </div>
                    </div>

                    <div class="col-span-7">
                        <label for="street-address"
                            class="block text-sm font-medium leading-6 text-gray-900">Endereço</label>
                        <div class="mt-2">
                            <input type="text" name="street-address" id="street-address" autocomplete="street-address"
                                v-model="data.address"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.address.$error">
                                {{ v$.address.$errors[0].$params.type === 'required' ? "Nome obrigatório!" : "Email inválido!"}}</p>
                            </div>
                    </div>
                    <div class="sm:col-span-2 sm:col-start-1">
                        <label for="tel" class="block text-sm font-medium leading-6 text-gray-900">Telefone</label>
                        <div class="mt-2">
                            <input type="text" name="tel" id="tel" maxlength="11" autocomplete="address-level2" v-model="data.tel"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>

                    <div class="sm:col-span-2 sm:col-start-1">
                        <label for="city" class="block text-sm font-medium leading-6 text-gray-900">Cidade</label>
                        <div class="mt-2">
                            <input type="text" name="city" id="city" autocomplete="address-level2" v-model="data.city"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.city.$error">
                                {{ v$.city.$errors[0].$params.type === 'required' ? "Campo obrigatório!" : "Email inválido!"}}</p>
                            </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label for="neighnorhood" class="block text-sm font-medium leading-6 text-gray-900">Bairro</label>
                        <div class="mt-2">
                            <input type="text" name="neighnorhood" id="neighnorhood" autocomplete="address-level1"
                                v-model="data.neighborhood"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="mt-2 flex items-center justify-start gap-x-6">
            <button type="submit" @click="createUnit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800">Registrar</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import axiosInstance from '@/services/api';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { brazilStates } from "@/utils/statesDate";
import Swal from 'sweetalert2';
import { onMounted } from "vue";
const dataUnits = ref([])

onMounted(() => {
})


type Unit = {
    name: string
    tel: string
    address: string
    state: string
    city: string
    neighborhood: string
}

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
    e.preventDefault();
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
                title: "Yay!",
                text: "Unidade cadastrada com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });
            console.log(res)
        }).catch(err => {
            Swal.fire({
                title: 'Erro ao Cadastar!',
                text: 'Algum erro inesperado aconteceu!',
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
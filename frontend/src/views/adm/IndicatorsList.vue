<template>
    <div class=" mt-3 mx-auto rounded-3xl  p-8">
        <h3 class="mb-4 text-xl font-bold text-indigo-700 dark:text-white">
      Lista de Indicadores
    </h3>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Descrição
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Objetivo
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tipo Indicador
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Dimensão
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Fontes
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Editar</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        v-for="(indicator, index) in dataIndicatos" :key="indicator.id">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ indicator?.description }}
                        </th>
                        <td class="px-6 py-4">
                            {{ indicator.objective }}
                        </td>
                        <td class="px-6 py-4">
                            {{ indicator.type_Indicator }}
                        </td>
                        <td class="px-6 py-4">
                            {{ indicator.dimension }}
                        </td>
                        <td class="px-6 py-4">
                            {{ indicator.sources }}
                        </td>
                        <td @click="openEditModal(indicator)" class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


    <section v-if="activeEdit" class="bg-white dark:bg-gray-900">
        <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
            <h2 class="mb-4 text-xl font-bold text-indigo-700  dark:text-white">Atualizar Indicador</h2>
            <form action="#">
                <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                    <div class="sm:col-span-2">
                        <label for="description"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                        <input type="text" name="description" id="description"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            v-model="editIndicator.description" placeholder="Descrição">
                        <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.description.$error">
                            {{ v$.description.$errors[0].$params.type === 'required' ? "Descrição Obrigatória!" :
                                "Descrição inválido!" }}</p>
                    </div>
                    <div class="w-full">
                        <label for="objective"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Objetivo</label>
                        <input type="text" name="objective" id="objective" v-model="editIndicator.objective"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Objetivo">
                        <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.objective.$error">
                            {{ v$.objective.$errors[0].$params.type === 'required' ? "Nome obrigatório!" : "Email inválido!"}}</p>
                    </div>
                    <div class="w-full">
                        <label for="dimension"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dimensão</label>
                        <input type="text" name="dimension" id="dimension" v-model="editIndicator.dimension"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Dimensão">
                        <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.dimension.$error">
                            {{ v$.dimension.$errors[0].$params.type === 'required' ? "Nome obrigatório!" : "Email inválido!"}}</p>
                    </div>

                    <div class="w-full">
                        <label for="sources"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fontes</label>
                        <input type="text" name="sources" id="sources" v-model="editIndicator.sources"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Fontes">
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <button type="submit" @click="updateIndicator"
                        class=" bg-indigo-700 hover:bg-indigo-800  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-indigo-800 dark:focus:ring-primary-800">
                        Atualizar
                    </button>
                    <button type="button" @click="toggleActiveEdit()"
                        class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import axiosInstance from '@/services/api'
import { ref, onMounted, reactive, computed } from 'vue'
import useVuelidate from "@vuelidate/core";
import Swal from 'sweetalert2';
import { required, minLength, email } from "@vuelidate/validators";

enum typeIndicator {
  BOOL = 'BOOL',
  NUMERIC = 'NUMERIC',
}

type Indicator = {
    id: string,
    description: string
    objective: number
    dimension: string
    type_Indicator: typeIndicator
    sources: string
}



const dataIndicatos = ref<Indicator[]>([])
const editIndicator = ref<Indicator>({
    id: '',
    description: '',
    objective: 0,
    dimension: '',
    type_Indicator: '' as typeIndicator,
    sources: '',
})
const activeEdit = ref(false)
const load = ref(false);

const rules = computed(() => {
    return {
        description: { required },
        objective: { required },
        dimension: { required },
        type_Indicator: { required },
        sources: { required }
    }
})

const v$ = useVuelidate(rules, editIndicator)


onMounted(() => {
    getIndicators();
})



const getIndicators = async () => {
    console.log('oi')
    await axiosInstance.get('/api/indicators').then(
        response => (dataIndicatos.value = response.data.data, console.log(response.data.data)))
        .catch((error) => {
            console.log(error);
        });
}

const openEditModal = (data: any) => {
    editIndicator.value = data
    console.log(editIndicator.value)
    activeEdit.value = true
}

const updateIndicator = async (e: any) => {
    e.preventDefault();
    console.log(editIndicator.value)
    const result = await v$.value.$validate()
    console.log(result)
    if (result) {
        axiosInstance.put(`/api/indicators/${editIndicator.value.id}`,
            {
                description: editIndicator.value.description,
                objective: editIndicator.value.objective,
                type_indicator:editIndicator.value.type_Indicator,
                dimension: editIndicator.value.dimension,
                sources: editIndicator.value.sources

            }, {
            headers: { 'Content-Type': 'application/json' },

        }).then(res => {
            Swal.fire({
                title: "Yay!",
                text: "Indicador editado com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });
            console.log(res)
        }).catch(err => {
            Swal.fire({
                title: 'Erro ao atualizar Indicador!',
                text: 'Algum erro inesperado aconteceu!',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            console.log(err)
        })
    } else {
        Swal.fire({
            title: 'Erro ao atualizar Indicador!',
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
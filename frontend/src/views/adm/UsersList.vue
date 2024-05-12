<template>
  <div class=" mt-3 mx-auto rounded-3xl  p-8">
    <h3 class="mb-4 text-xl font-bold text-indigo-700 dark:text-white">
      Lista de Usuários
    </h3>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Nome
            </th>
            <th scope="col" class="px-6 py-3">
              CPF
            </th>
            <th scope="col" class="px-6 py-3">
              Unidade Referente
            </th>
            <th scope="col" class="px-6 py-3">
              Cargo
            </th>

            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="user in dataUsers" :key="user.id">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ user?.name }}
            </th>
            <td class="px-6 py-4">
              {{ user?.cpf }}
            </td>
            <td class="px-6 py-4">
              {{ user.unit?.name }}
            </td>
            <td class="px-6 py-4">
              {{ user.office }}
            </td>


            <td class="px-6 py-4 text-right">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                @click="openEditModal(user)">Editar</a>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>


  <section v-if="activeEdit" class="bg-white dark:bg-gray-900">

  </section>

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
              <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                viewBox="0 0 18 18">
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </div>
          </div>

          <!-- Body -->
          <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Atualizar Usuário</h2>
            <form action="#">
              <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                <div class="sm:col-span-2">
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                  <input type="text" name="name" id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    v-model="userEdit.name" placeholder="Nome Usuário">
                  <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.name.$error">
                    {{ "Nome obrigatório!" }}</p>
                </div>
                <div class="w-full">
                  <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
                  <input type="text" name="cpf" id="cpf"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    v-model="userEdit.cpf" placeholder="CPF" readonly>
                  <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.cpf.$error">
                    {{ v$.cpf.$errors[0].$params.type === 'required' ? "CPF obrigatório!" : "CPF inválido!" }}</p>
                </div>
                <div class="w-full">
                  <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cargo</label>
                  <input type="text" name="cargo" id="brand"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    v-model="userEdit.office" placeholder="Cargo">
                  <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.office.$error">
                    {{ "Cargo obrigatório!" }}</p>
                </div>
                <div>
                  <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unidade
                    Referente</label>
                  <select id="unit" v-model="userEdit.id_unit"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">

                    <option v-for="(unit, index) in dataUnits" :value="unit.id">{{ unit.name }}</option>
                  </select>
                  <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.id_unit.$error">
                    {{ "Unidade Obrigatória!" }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <button type="submit" @click="updateUser"
                  class="text-red bg-indigo-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-indigo-800 dark:focus:ring-primary-800">
                  Atualizar
                </button>
                <button type="button" @click="toggleActiveEdit()"
                  class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">

                  Cancelar
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
import axiosInstance from '@/services/api';
import { ref, onMounted, reactive, computed } from 'vue'
import useVuelidate from "@vuelidate/core";
import Swal from 'sweetalert2';
import { required, minLength, email } from "@vuelidate/validators";

interface UserInferface {
  id: string;
  name: string;
  password: string;
  cpf: string;
  unit?: UnitInterface;
  id_unit: string;
  office: string;
}

interface UnitInterface {
  id: string;
  address: string;
  city: string;
  name: string;
  neighborhood: string;
  tel: string;
}
const open = ref(false)
const dataUsers = ref<UserInferface[]>([])
const dataUnits = ref<UnitInterface[]>([])
const userEdit = ref<UserInferface>({
  id: '',
  name: '',
  password: '',
  cpf: '',
  id_unit: '',
  office: ''
})
const activeEdit = ref(false)

import { useAuth } from '@/stores/auth';
//import { confirmation } from '@/functions';

const authStore = useAuth()

axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token

onMounted(() => {
  getUsers();
  getUnits();
})


const load = ref(false);

const rules = computed(() => {
  return {
    name: { required },
    cpf: { required },
    office: { required },
    id_unit: { required }
  }
})

const v$ = useVuelidate(rules, userEdit)

const getUsers = async () => {
  console.log('oi')
  await axiosInstance.get('/api/users').then(
    response => (dataUsers.value = response.data.data, console.log("users", response.data.data)))
    .catch((error) => {
      console.log(error);
    });

}

const getUnits = async () => {
  await axiosInstance.get('/api/units').then(
    response => (dataUnits.value = response.data.data, console.log("units", response.data.data)))
    .catch((error) => {
      console.log(error);
    });
}

const openEditModal = (data: any) => {
  userEdit.value = data
  console.log(userEdit.value)
  activeEdit.value = true
  open.value = true
}

const updateUser = async (e: any) => {
  const result = await v$.value.$validate()
  console.log(result)
  e.preventDefault();
  console.log(userEdit.value)
  console.log(userEdit.value.cpf)
  if (result) {
    axiosInstance.put(`/api/users/${userEdit.value.id}`,
      {
        name: userEdit.value.name,
        cpf: userEdit.value.cpf,
        office: userEdit.value.office,
        id_unit: userEdit.value.id_unit,
        password: userEdit.value.password

      }, {
      headers: { 'Content-Type': 'application/json' },

    }).then(res => {
      console.log(res)
      Swal.fire({
        title: "Yay!",
        text: "Usuário editado com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      open.value = false
    }).catch(err => {
      console.log(err)
      Swal.fire({
        title: 'Oops!',
        text: 'Algum erro inesperado aconteceu!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
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



const toggleActiveEdit = () => {
  activeEdit.value = false;
}

//const deleteDepartment = (id, name)=>{
//confirmation(name, ('/api/departments/'+id), '/departments')
//}
</script>
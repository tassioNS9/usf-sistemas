<template>

  <Container>
    <CardComponent>
      <h3 class="text-xl font-bold text-indigo-700 ">
        Lista de Usuários
      </h3>
    </CardComponent>
    <Loading v-if="isload" />
    <div class="relative overflow-x-auto  shadow-md sm:rounded-lg bg-white" v-else>
      <div class="flex flex-col md:flex-row  items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div class="w-full md:w-1/2">
          <form @submit.prevent="" class="flex items-center">
            <InputSearch v-model="searchName" />
          </form>
        </div>
        <!--select-->
      </div>
      <table class="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

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
              Tipo
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
          <tr class="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="user in filteredUsers" :key="user.id">
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
              {{ user.role === 'USER' ? 'Usuário' : 'Administrador' }}
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
  </Container>

  
  <ModalCardComponent>
    <CardComponent>
      <h2 class="text-xl font-bold text-indigo-700 dark:text-white">Atualizar Usuário</h2>
    </CardComponent>
    <form action="#" @submit.prevent="updateUser">
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
            {{ v$.cpf.$errors[0].$params.type === 'required' ? "CPF obrigatório!" : "CPF inválido!" }}
          </p>
        </div>
        <div class="w-full">
          <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cargo</label>
          <input type="text" name="cargo" id="brand"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            v-model="userEdit.office" placeholder="Cargo">
          <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.office.$error">
            {{ "Cargo obrigatório!" }}</p>
        </div>
        <div class="w-full">
          <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unidade
            Referente</label>
          <select id="unit" v-model="userEdit.id_unit"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            <option v-for="(unit, index) in dataUnits" :value="unit.id">{{ unit.name }}</option>
          </select>
          <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.id_unit.$error">
            {{ "Unidade Obrigatória!" }}</p>
        </div>

        <div class="w-full">
          <label for="type_indicator" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo
            do Usuário
          </label>
          <div class="flex mt-4">
            <div class=" sm:col-span-2 flex items-center me-4">
              <input id="inline-radio" type="radio" name="inline-radio-group" :value="Role.USER" v-model="userEdit.role"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Padrão</label>
            </div>
            <div class="flex items-center me-4">
              <input id="inline-2-radio" type="radio" name="inline-radio-group" :value="Role.ADMIN"
                v-model="userEdit.role"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="inline-2-radio"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Admin</label>
            </div>
          </div>
        </div>
      </div>


      <div class="flex items-center space-x-4">
        <button type="submit"
          class=" bg-indigo-700 hover:bg-indigo-800 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
          Atualizar
        </button>
        <button type="button" @click="cancelEdit()"
          class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Cancelar
        </button>
      </div>
    </form>
  </ModalCardComponent>

</template>

<script setup lang="ts">
import axiosInstance from '@/services/api';
import { ref, watch, onMounted, computed } from 'vue'
import InputSearch from '@/components/InputSearch.vue';
import Container from '@/components/Container.vue'
import CardComponent from '@/components/CardComponent.vue'
import ModalCardComponent from '@/components/ModalCardComponent.vue';
import useUnitsList from '@/composables/useUnitsList';
import useModalToggle from '@/composables/useModalToggle';
import { type User } from "@/types/user";
import { required, minLength, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Swal from 'sweetalert2';


enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

const searchName = ref('')
const unitSelected = ref(0)
const userSelected = ref({})
const page = ref(1)
const total = ref(0)
const load = ref<boolean>(true)
const {isOpenModal} = useModalToggle()
import { useAuth } from '@/stores/auth';
import Loading from '@/components/Loading.vue';
import useUsersList from '@/composables/useUsersList';
const authStore = useAuth()

axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token

const userEdit = ref<User>({
  name: '',
  password: '',
  cpf: '',
  id_unit: 0,
  office: '',
  role: Role.USER
})
// const getUsers = async () => {
//   await axiosInstance.get(`/api/users?page=${page.value}`).then(
//     response => (dataUsers.value = response.data.data, total.value = response.data.total, console.log("users", response.data.total)))
//     .catch((error) => {
//       console.log(error);
//     });

// }

const nextPage = () => {
  page.value = page.value + 1
  console.log(page)
}

const previousPage = () => {
  page.value = page.value - 1
}




const filteredUsers = computed(() => {
  let users = dataUsers.value
  console.log(users)
  console.log(searchName.value)
  if (searchName.value !== '') {
    users = users.filter(item => item.name.includes(searchName.value))
  }
  return users;
})


const openEditModal = (data: any) => {
  isOpenModal.value = true
  userEdit.value = data
}

const cancelEdit = () => {
  isOpenModal.value = false
}


const rules = computed(() => {
  return {
    name: { required },
    cpf: { required },
    office: { required },
    id_unit: { required }
  }
})


const v$ = useVuelidate(rules, userEdit)


const updateUser = async () => {
  const result = await v$.value.$validate()
  console.log(result)
  if (result) {
    await axiosInstance.put(`/api/users/${userEdit.value.id}`,
      {
        name: userEdit.value.name,
        cpf: userEdit.value.cpf,
        office: userEdit.value.office,
        id_unit: userEdit.value.id_unit,
        password: userEdit.value.password,
        role: userEdit.value.role

      }, {
      headers: { 'Content-Type': 'application/json' },

    }).then(res => {
      console.log(res)
      Swal.fire({
        title: "OK!",
        text: "Usuário editado com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      });
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

const { dataUsers, isload } = useUsersList()
const { dataUnits } = useUnitsList()
// watch(unitSelected, async (newQuestion, oldQuestion) => {
//   getFilteredUsers(searchName.value, newQuestion)
// })

// watch(page, async (newQuestion, oldQuestion) => {
//   getUsers();
// })


</script>
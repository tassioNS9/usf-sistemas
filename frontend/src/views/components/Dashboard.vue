<template>
  <!-- <div role="status">
    <svg aria-hidden="true" class="inline w-20 h-20 text-gray-400 animate-spin dark:text-gray-800 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div> -->

<Container>
      <div class="flex flex-col">
        <CardComponent>
          <h3 class=" text-xl font-bold text-indigo-700 ">
            Dashboard
          </h3>
        </CardComponent>
        <div class="flex mt-4 flex-wrap gap-2 w-full justify-between">
          <div class="w-full md:w-1/4 flex flex-col   gap-2">
            <label for="year" class=" w-1/2 px-2 text-gray-900 dark:text-gray-300"> Selecionar Ano
            </label>
            <select id="year" v-model="yearSelected"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected :value=2024>2024</option>
              <option :value=2023>2023</option>
            </select>
          </div>

          <div v-if="auth.role === 'ADMIN'" class="w-full md:w-1/3 flex flex-col  gap-2">
            <label for="units" class=" w-2/3 px-2 text-gray-900 dark:text-gray-300">Selecionar Unidade
            </label>
            <select id="units" v-model="unitSelected"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option v-for="unit in dataUnits " :key="unit.id" :value=unit.id>{{ unit.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap  mx-3 my-6 gap-5">
        <template v-for="indicator in dataIndicators" :key="indicator.id">
          <CreateChart :yearSelected="yearSelected" :evaluations="indicator.evaluations"
            :description-data="indicator.description" />
        </template>
      </div>
    </Container>
</template>


<script setup>
import CreateChart from '@/components/CreateChart.vue';
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue'
import { ref, onMounted, watch } from 'vue'
import { useAuth } from "@/stores/auth";
import axiosInstance from '@/services/api'
import CardComponent from '@/components/CardComponent.vue'
import Container from '@/components/Container.vue'
const load = ref < Boolean > (true)
const dataIndicators = ref([])
const auth = useAuth();
const yearSelected = ref(2024)
const dataUnits = ref([])
const unitSelected = ref(auth.userAuthetincated.id_unit)


watch(yearSelected, (newQuestion, oldQuestion) => {
  console.log('mudando')
  getFilteredEvaluations()


})

watch(unitSelected, (newQuestion, oldQuestion) => {
  console.log('mudando')
  getFilteredEvaluations()


})
const getFilteredEvaluations = async () => {

  await axiosInstance.get(`/api/indicators-numerics/${unitSelected.value}/${yearSelected.value}`).then(response => {
    (dataIndicators.value = response.data.data, console.log("Indicators", response.data))
    //descriptionIndicator.value = response?.data?.data[0]?.indicator.description
  }).catch(error => {
    console.log(error)
  })
}

const getUnits = async () => {
  await axiosInstance.get('/api/units').then(
    response => (dataUnits.value = response.data.data, console.log(response.data.data)))
    .catch((error) => {
      console.log(error);
    });
}




onMounted(() => {
  getFilteredEvaluations()
  getUnits()
})

</script>



<style scoped></style>
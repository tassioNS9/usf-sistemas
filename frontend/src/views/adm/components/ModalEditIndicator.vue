<template>
  <ModalCardComponent>
    <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
      <CardComponent>
        <Title text="Atualizar Indicador" />
      </CardComponent>
      <form action="#" @submit.prevent="updateIndicator">
        <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
          <div class="sm:col-span-2">
            <label for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
            <input type="text" name="description" id="description"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              v-model="editIndicator.description" placeholder="Descrição">
            <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.description.$error">
              {{ "Nome obrigatório!" }}</p>
          </div>
          <div class="w-full">
            <label for="objective" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Objetivo</label>
            <input type="text" name="objective" id="objective"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              v-model="editIndicator.objective" placeholder="Objetivo" readonly>
            <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.objective.$error">
              {{ v$.cpf.$errors[0].$params.type === 'required' ? "CPF obrigatório!" : "CPF inválido!" }}</p>
          </div>
          <div class="w-full">
            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dimensão</label>
            <input type="text" name="cargo" id="brand"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              v-model="editIndicator.dimension" placeholder="Dimensão">
            <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.dimension.$error">
              {{ "Cargo obrigatório!" }}</p>
          </div>

          <div class="w-full">
            <label for="sources" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fontes</label>
            <input type="text" name="sources" id="sources"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              v-model="editIndicator.sources" placeholder="Fontes">
            <p class="px-2 mt-2 text-xs text-red-600 dark:text-red-400" v-if="v$.sources.$error">
              {{ "Cargo obrigatório!" }}</p>
          </div>
        </div>


        <div class="flex items-center space-x-4">
          <button type="submit"
            class=" bg-indigo-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-indigo-800 dark:focus:ring-primary-800">
            Atualizar
          </button>
          <button type="button" @click="toggleActiveEdit()"
            class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </ModalCardComponent>
</template>




<script setup>
import { ref, computed } from "vue";
import axiosInstance from '@/services/api';
import CardComponent from '@/components/CardComponent.vue'
import ModalCardComponent from '@/components/CardComponent.vue'
import Title from "@/components/Title"
</script>
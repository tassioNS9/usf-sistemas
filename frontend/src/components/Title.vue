<template>
    <h3 class="text-xl font-bold text-indigo-700 dark:text-white">
        {{text}}
    </h3>
</template>


<script setup lang="ts">
import {defineProps} from 'vue'

defineProps<{
    text:string
}>()

</script>
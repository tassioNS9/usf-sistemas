<!-- c<template>
    <select class="form-select" :value="modelValue" @change="$event=>$emit('update:modelValue', $event.target?.value)">
        <option v-for="op in options" :key="op.id" :value="op.id">
        {{ op.name }}
        </option>
    </select>
</template>



<script setup lang="ts">
import {ref, onMounted, defineExpose} from 'vue'

defineProps(['modelValue', 'options'])
defineEmits(['update:modelValue'])
const input = ref(null)

onMounted(() => {
//      if(input.value.hasAttribute('autofocus')){
//          input.value.focus()
//  }
})

defineExpose({focus: ()=> input.value?.focus()});

</script> -->
<template>

    <label class="flex mr-4 items-center flex-nowrap">
        <input type="radio" name="show" value="all" checked @change="filter">
        <span class="whitespace-nowrap ml-1">Show All</span>
    </label>

    <label class="flex mr-4 items-center flex-nowrap">
        <input type="radio" name="show" value="today" @change="filter">
        <span class="whitespace-nowrap ml-1">Due Today</span>
    </label>

    <label class="flex mr-4 items-center flex-nowrap">
        <input type="radio" name="show" value="past" @change="filter">
        <span class="whitespace-nowrap ml-1">Past Due</span>
    </label>




    <div class="flex">
        <div class="flex items-center me-4">
            <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mostar somente
                :</label>
        </div>
        <div class="flex items-center me-4">
            <input id="inline-radio" type="radio" value="" name="inline-radio-group"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Todos</label>
        </div>
        <div class="flex items-center me-4">
            <input id="inline-radio" type="radio" value="" name="inline-radio-group"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="inline-radio"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Numéricos</label>
        </div>
        <div class="flex items-center me-4">
            <input id="inline-2-radio" type="radio" value="" name="inline-radio-group"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="inline-2-radio"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Binários</label>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['filter'])

const filter = (e) => {
    emit('filter', e.target.value);
}
</script>
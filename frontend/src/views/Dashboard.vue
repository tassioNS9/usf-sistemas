<template>
    <div class="flex">
Dashboard
        <!-- <BasicChart /> -->
    </div>



</template>


<script  lang="ts">
import BasicChart from '@/components/BasicChart.vue';
import SideBar from '@/components/SideBar.vue';
import NewSideBar from '@/components/NewSideBar.vue'
import { useAuth } from "@/stores/auth";

export default{
    name:'Dashboard'
}

//const auth = useAuth();
</script>

<style scoped></style>
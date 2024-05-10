<template>
    <nav class="navbar navbar-expand-lg bg-success">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">COMPANY</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
             
                    <li class="nav-item px-lg-5">
                        <RouterLink to="/departments" class="nav-link">departments</RouterLink>
                    </li>
                    <li class="nav-item px-lg-5">
                        <RouterLink to="/employees" class="nav-link">employees</RouterLink>
                    </li>
                    <li class="nav-item px-lg-5">
                        <RouterLink to="/graphic" class="nav-link">graphic</RouterLink>
                    </li>
                    <li class="nav-item px-lg-5">
                        <RouterLink to="/reports" class="nav-link">Reports</RouterLink>
                    </li>
                    
                </ul>
                <!-- <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="authStore.user"> -->
                    <li class="nav-item px-lg-5">
                        <!-- <button @click="$event => authStore.logout" class="btn btn-success">Sair</button> -->
                    </li>
                <!-- </ul> -->
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
//import { useAuthStore } from '@/stores/auth';
//const authStore = useAuthStore()
</script>
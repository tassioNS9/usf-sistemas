<template>
    <div class="flex h-screen bg-gray-200 font-roboto">
        <SideBar />

        <div class="flex-1 flex flex-col overflow-hidden">
            <Header />

            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div class="container mx-auto px-6 py-8">
                    <IndicatorsList/>
                </div>
            </main>
            <Footer />
        </div>
    </div>
</template>



<script setup lang="ts">
import SideBar from '@/components/SideBar.vue'
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue'
import IndicatorsList from './components/IndicatorsList.vue';
</script>
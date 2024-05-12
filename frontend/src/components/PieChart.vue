<template>

    <div id="chart">
        <apexchart type="pie" height="380" :options="dataPie.chartOptions" :series="dataPie.series">
        </apexchart>
    </div>



</template>


<script setup>
import { ref } from 'vue'
import { useAuth } from "@/stores/auth";

export default {
    name: 'PieChart',
    components:{
        apexchart: VueApexCharts,
    }
}

const dataPie = ref({
    series: [45, 55],
    chartOptions: {
        chart: {
            width: 380,
            height:380
            type: 'pie',
        },
        labels: ['Team A', 'Team B'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    },
})

//const auth = useAuth();
</script>

<style scoped></style>
<template>
  <div class="flex flex-col">
    <div id="chart">
      <apexchart type="bar" width="450" height="350" :options="dataChart.chartOptions" :series="dataChart.series">
      </apexchart>
    </div>
  </div>

</template>


<script setup lang="ts">
import { ref, defineProps, onMounted, watch } from 'vue'
const props = defineProps({
  evaluations: {
    type: Array,
    required: true,
  },
  descriptionData: {
    type: String,
    required: true
  },
  yearSelected: {
    type: Number,
    required: true
  }
});


const dataChart = ref({

  series: [{
    name: 'Valor do Mês',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }],
  chartOptions: {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,

      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },

    xaxis: {
      categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: false,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      }

    },
    title: {
      text: `${props.descriptionData || ""}`,
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  },

})

const isLoading = ref(false)

watch(() => props.evaluations, async (newQuestion, oldQuestion) => {
  console.log('alterandoo')
  await getValuesDashboard()

}, { deep: true }
)

const getMonthofDate = (date: Date) => {
  let newDate = new Date(date)

  return newDate.getMonth()
}


const resetChart = ()=>{
  dataChart.value.series[0].data.map((item, index) => {
      dataChart.value.series[0].data[index] = 0
    })
}


const getValuesDashboard = () => {
  isLoading.value = true

  if (props.evaluations.length === 0) {
    resetChart(); 
    return
  }
  resetChart();

  props.evaluations.map((item, index) => {

    const month = getMonthofDate(props.evaluations[index]?.date_evaluation)

    dataChart.value.series[0].data[month] = props.evaluations[index]?.valueNum
  })

  isLoading.value = false
}


onMounted(() => {
  getValuesDashboard();
})


</script>

import { createPinia } from 'pinia'
import { createApp , markRaw } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from '@/router/index';
import VueApexCharts from "vue3-apexcharts";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useAuth } from "@/stores/auth";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import Home from './components/Home.vue';
// window.axios = axios

// window.axios.defaults.baseURL = 'http://localhost:5173/company/public'
// window.axios.defaults.headers.common['Accept'] = 'application/json'
// window.axios.defaults.headers.common['Content-Type'] = 'application/json'
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// window.axios.defaults.withCredentials = true
const pinia = createPinia()
const app = createApp(App)
app.use(pinia).use(router).use(VueApexCharts)
//pinia.use(({ store }) => { store.router = markRaw(router) });

//app.component('Home', Home)
app.use(VueSweetalert2)
app.use(VueTailwindDatepicker);

import DashboardLayout from './components/DashboardLayout.vue'
import EmptyLayout from './components/EmptyLayout.vue'

app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)


if (localStorage.getItem('token')) {
    (async () => {
      const auth = useAuth();
      try {
        await auth.verifyTokenToRefresh()
        auth.setIsAuth(true);
   
         await auth.checkToken();
         console.log('passou')
      } catch (error) {
        auth.clear()
      }
    })()
  }

app.mount('#app')

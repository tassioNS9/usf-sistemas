import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
//import routes from "@/router/routes";

import Login from '@/views/authentication/Login.vue';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty' },
  },
  {
    path: "/app/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
  },
  {
    path: "/app/registro-usuario",
    name: "RegistroUsuario",
    component: () => import("../views/adm/UserRegister.vue"),
  },
  {
    path: "/app/registro-unidade",
    name: "RegistroUnidade",
    component: () => import("../views/adm/UnitRegister.vue"),
  },
  // {
  //   path: "/app/home",
  //   name: "home",
  //   component: () => import("../c/HomeView.vue"),
  // },
  {
    path: "/app/perfil",
    name: "Perfil",

    component: () => import("@/views/Profile.vue"),
  },
  {
    path: "/app/avaliacoes",
    name: "Avaliacoes",

    component: () => import("@/views/AvaliationRegister.vue"),
  },
  {
    path: "/app/indicadores",
    name: "Indicadores",

    component: () => import("@/views/IndicatorRegister.vue"),
  },
  {
    path: "/app/lista-usuarios",
    name: "ListaUsuarios",

    component: () => import("@/views/adm/UsersList.vue"),
  },
  {
    path: "/app/lista-unidades",
    name: "ListaUnidades",

    component: () => import("@/views/adm/UnitsList.vue"),
  },
  {
    path: "/app/lista-indicadores",
    name: "ListaIndicadores",

    component: () => import("@/views/adm/IndicatorsList.vue"),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import("../views/authentication/Error.vue")
},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


//router.beforeEach(routes);

export default router

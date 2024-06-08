import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import routesIn from "./routes";

import Login from '@/views/authentication/Login.vue';

// const AuthRoutes = {
//   path: '/auth/login',
//   component: () => import('@/views/authentication/Login.vue'),
//   meta: {
//       requiresAuth: false
//   },
//   children: [

//       {
//           name: 'Login',
//           path: '/auth/login',
//           component: () => import('@/views/authentication/Login.vue')
//       },
//   ]
// };

const MainRoutes = {
  path: '/app',
  meta: {
    requiresAuth: true
  },
  redirect: '/app',
  children: [
      {
          name: 'Dashboard',
          path: '/app/dashboard',
          component: () => import('@/views/DashboardPage.vue'),
      },  
  ]
};


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
   // meta: { layout: 'empty' },
  },

  {
    path: "/app/registro-unidade",
    name: "RegistroUnidade",
    meta:{
      requiresAuth:true, requiresAdmin:true
    },

    component: () => import("@/views/adm/UnitRegisterPage.vue"),
  },
  {
    path: "/app/registro-usuario",
    name: "RegistroUsuario",
    meta: {
      requiresAuth:true,  requiresAdmin:true
    },
    component: () => import("@/views/adm/UserRegisterPage.vue"),
  },
  {
    path: "/app/perfil",
    name: "Perfil",
    meta: {
      requiresAuth:true
    },
    component: () => import("@/views/ProfilePage.vue"),
  },
  {
    path: "/app/avaliacoes",
    name: "Avaliacoes",
    meta: {
      requiresAuth:true
    },
    component: () => import("@/views/EvaluationRegisterPage.vue"),
  },
  {
    path: "/app/indicadores",
    name: "Indicadores",
    meta: {
      requiresAuth:true, requiresAdmin:true
    },
    component: () => import("@/views/IndicatorRegisterPage.vue"),
  },
  {
    path: "/app/lista-usuarios",
    name: "ListaUsuarios",
    meta:{
      requiresAuth:true,  requiresAdmin:true
    },
    component: () => import("@/views/adm/UsersListPage.vue"),
  },
  {
    path: "/app/lista-unidades",
    name: "ListaUnidades",
    meta: {
      requiresAuth:true,  requiresAdmin:true
    },
    component: () => import("@/views/adm/UnitsListPage.vue"),
  },
  {
    path: "/app/lista-indicadores",
    name: "ListaIndicadores",
    meta:{
      requiresAuth:true,  requiresAdmin:true
    },

    component: () => import("@/views/adm/IndicatorsListPage.vue"),
  },
  {
    path: "/app/lista-avaliacoes",
    name: "ListaAvaliacoes",
    meta:{
      requiresAuth:true,  requiresAdmin:true
    },
    component: () => import("@/views/adm/EvaluationsListPage.vue"),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import("@/views/authentication/Error.vue")
},
MainRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes,

})


router.beforeEach(routesIn);

export default router

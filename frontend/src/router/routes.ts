
import { useAuth } from "@/stores/auth";

export default async function routes(to: any, from: any, next: any) {
  const auth = useAuth();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = await auth.checkToken();
    if (!auth.isAuthenticated) {
      console.log('nao autenticado!')
      next({ path: '/'});
    } else {
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (isAuthenticated.role !== 'ADMIN') {
          next({ path: '/user' }); // Redirecionar usuários não administradores
        } else {
          next();
    
        }
      } else {
        next();
      }
    }
    // console.log(to.name);
  } else {
    console.log('caiu aqui')
    next();
  }
}
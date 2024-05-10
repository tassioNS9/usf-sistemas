
import { useAuth } from "@/stores/auth";

export default async function routes(to : any, from : any, next : any) {
  const auth = useAuth();
  if (to.meta?.auth) {

    if (auth.token && auth.user) {
      const isAuthenticated = await auth.checkToken();
      if (isAuthenticated) next();
      else next({ name: "login" });
    } else {
      next({ name: "login" });
    }
    console.log(to.name);
  } else {
    next();
  }
}
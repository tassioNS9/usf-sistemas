import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/services/api';
import router from '@/router';
import dayjs from 'dayjs';
export const useAuth = defineStore('auth', () => {

  const token = ref(localStorage.getItem("token"));
  const user = ref(JSON.parse(localStorage.getItem("user") as string));
  const isAuth = ref(false);

  function setToken(tokenValue : string) {
    localStorage.setItem('token', tokenValue);
    token.value = tokenValue;
  }

  function setUser(userValue : any) {
    localStorage.setItem('user', JSON.stringify(userValue));
    user.value = userValue;
  }

  function setIsAuth(auth : boolean) {
    isAuth.value = auth;
  }

  const isAuthenticated = computed(() => {
      return token.value && user.value;
  })

  const fullName = computed(() => {
    if (user.value) {
      return user.value.name;
    }
    return '';
  })

//   axios.defaults.baseURL = 'http://localhost:8000/api/';

// let refresh = false;

// axios.interceptors.response.use(resp => resp, async error => {
//     if (error.response.status === 401 && !refresh) {
//         refresh = true;

//         const {status, data} = await axios.post('refresh', {}, {
//             withCredentials: true
//         });

//         if (status === 200) {
//             axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

//             return axios(error.config);
//         }
//     }
//     refresh = false;
//     return error;
// })

  async function checkToken() {
    try {
      const tokenAuth = 'Bearer ' + token.value;
     //console.log(tokenAuth)
      const { data } = await api.get("/api/auth/verify", {
        headers: {
          Authorization: tokenAuth,
        },
      });
      console.log("data",data)
      return data;
    } catch (error) {
      clear();
      router.push('/');
      console.log('error',error);
    }
  }

  async function verifyTokenToRefresh(){
console.log(user.value.refreshToken.id)
   // const refreshTokenExpired = dayjs().isAfter(dayjs.unix(data.refreshToken));
    if(!localStorage.getItem('token')){
      console.log('aqui')
      await api.post("/api/refresh-token",{
        refresh_token:user.value.refreshToken.id
      },{
        
          headers:{'Content-Type': 'application/json'},      
      }).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })

  }
  console.log("refreshTokenExpired")
}

  function clear() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    isAuth.value = false;
    token.value = '';
    user.value = '';
    router.push('/')
  }

  return {
    token,
    user,
    setToken,
    setUser,
    checkToken,
    isAuthenticated,
    fullName,
    clear,
    setIsAuth,
    verifyTokenToRefresh,
    isAuth
  }

})

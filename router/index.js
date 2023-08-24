import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Mqtt from '@/pages/Mqtt.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/mqtt',
    name: 'Mqtt',
    component: Mqtt,
  }
]
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})


// router.beforeEach(((to: any), from) => {
  
//   return true
// })


export default router
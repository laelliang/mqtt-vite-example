import { createApp } from 'vue'
import App from './App.vue'
import router from '@router/index'
import store from '@store/index'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

createApp(App).use(router).use(store).use(Antd).mount('#app')

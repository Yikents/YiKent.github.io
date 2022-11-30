import Vue from 'vue'
import App from './App.vue'
import router from './router'
import wotDesign from "@/wotDesign"
import vueAxiosPlugin from 'vue-axios-plugin'
import './assets/font/iconfont.css'

Vue.use(wotDesign);
Vue.use(vueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

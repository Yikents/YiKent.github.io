import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxiosPlugin from 'vue-axios-plugin'
import vantConfig from './vant/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import './assets/font/iconfont.css'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
})
Vue.use(vantConfig);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

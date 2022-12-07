import App from './App'
// vuex
import store from './store/store.js'


//引入网络请求
import { $http } from '@escook/request-miniprogram';
uni.$http = $http;
//全局baseUrl
$http.baseURL = "";
//请求拦截器
$http.beforeRequest = function (options) {
  uni.showLoading({
    title:"数据加载中..."
  })
}
//相应拦截器
$http.afterRequest = function () {
  uni.hideLoading()
}



// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif


// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
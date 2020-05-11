import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// import VCharts from 'v-charts';

import echarts from 'echarts'

import "./plugins/element.js";
// axios
import axios from 'axios';
// 状态栏
import Nprogress from 'nprogress';

import 'nprogress/nprogress.css';


// 默认请求头
// axios.defaults.baseURL = 'http://47.96.74.144:8000/'

axios.defaults.baseURL = 'https://localhost:44310/'

// 请求头拦截
axios.interceptors.request.use(config =>
  {
    // 加载数据时候启动ｎｐｒｏｇｒｅｓｓ
    Nprogress.start()
    return config
  })

axios.interceptors.response.use(config => {
  // 加载数据完成收回状态栏
  Nprogress.done()
  return config
})

Vue.prototype.$http = axios

// Vue.use(VCharts)
Vue.prototype.$echarts = echarts

//格式化时间
Vue.filter('dateFromat',(origin) => {
  const dt = new Date(origin)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2,'0')
  const d = (dt.getDate() + 1 + '').padStart(2,'0')
  // const hh = (dt.getHours() + 1 + '').padStart(2,'0')
  // const mm = (dt.getMinutes() + 1 + '').padStart(2,'0')
  // const ss = (dt.getSeconds() + 1 + '').padStart(2,'0')
  // return `${y} + ${m} + ${d} + ${hh} + ${mm} + ${ss}`
  return `${y} + ${m} + ${d}`
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

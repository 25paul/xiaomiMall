import Vue from 'vue'
import router from './router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import {message} from 'element-ui'

import store from './store'
import App from './App.vue'

axios.defaults.baseURL = '/api';
axios.defaults.timeout = 6000;
// 添加一个接口响应的拦截器
axios.interceptors.response.use(function (response) {
    let res = response.data
    if(res.status == 0) {
        return res.data
    } else if(res.status == 10) {
        window.location.href = '/#/login'
        return Promise.reject(res);
    } else {
        // alert(res.msg)
        message.warning('res.msg')
        return Promise.reject()
    }
})

Vue.use(VueAxios, axios)
Vue.use(VueLazyLoad,{
    loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.use(VueCookie)

Vue.prototype.$message = message;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import APlayer from '@moefe/vue-aplayer';
import axios from 'axios'
Vue.use(APlayer, {
  productionTip: true,
});
//全局设置请求带上cookieo
axios.defaults.withCredentials = true

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

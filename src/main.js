import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import APlayer from "@moefe/vue-aplayer";
import "./elmentUI"
Vue.use(APlayer, {
  productionTip: true,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store, 
  render: (h) => h(App),
}).$mount("#app");

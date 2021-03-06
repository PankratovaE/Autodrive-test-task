import Vue from "vue";
import App from "./App.vue";
import VueMask from 'v-mask';
import store from "./store";
import "@/assets/styles/main.css";

Vue.use(VueMask)
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");


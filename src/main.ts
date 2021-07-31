import Vue from "vue";
import Vuex from "vuex";
import Buefy from "buefy";
import App from "./App.vue";
import "buefy/dist/buefy.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Buefy);
Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

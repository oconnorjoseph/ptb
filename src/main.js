import Vue from "vue";
import App from "./App.vue";
import store from "./store/index.js";
import router from "./router/index.js";
import "./registerServiceWorker.js";

Vue.config.productionTip = false;

// Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/css/bootstrap.min.css";
// Bootstrap-Editable
import "./assets/bootstrap3-editable/js/bootstrap-editable.min.js";
import "./assets/bootstrap3-editable/css/bootstrap-editable.css";
// Font-Awesome
import "font-awesome/css/font-awesome.css";
// Vue-Loading-Overlay-Plugin
import "./plugins/loadingOverlay.js";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

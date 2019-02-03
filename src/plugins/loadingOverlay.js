import Vue from "vue";

import LoadingOverlay from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

const LOADING_OVERLAY_CONFIG = {
  color: "#5bc0de",
  backgroundColor: "#000",
  width: 128, // in px
  height: 128 // in px
};
Vue.use(LoadingOverlay, LOADING_OVERLAY_CONFIG);

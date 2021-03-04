/* eslint-disable @typescript-eslint/no-var-requires */
import Vue from "vue";
import App from "./App.vue";
import "./assets/global.css";
import router from "./router";
import ToggleButton from "vue-js-toggle-button";
import { firebaseApp } from "@/firebase";
import { mutations, store } from "@/store";
import "vue-toast-notification/dist/theme-default.css";
import Lightbox from "vue-easy-lightbox";

const VueToast = require("vue-toast-notification");

Vue.config.productionTip = false;
Vue.use(ToggleButton);
Vue.use(VueToast, { position: "top" });
Vue.use(Lightbox);

firebaseApp.auth().onAuthStateChanged(mutations.setUser);

// If we didn't receive the user yet, await
if (!store.user) {
  new Promise<void>(resolve => {
    firebaseApp.auth().onAuthStateChanged(() => resolve());
  }).then(() => {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  });
} else {
  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");
}

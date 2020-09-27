import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import "@styles/common.scss"
import store from "./store/index"

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@styles/common.scss'
import store from './store/index'
// import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import pageConfig from '@/pages/page1/config/pageConfig'

Vue.use(pageConfig)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

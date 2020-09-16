import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/pages/pages1/home'),
      children: [
        {
          path: '/sys',
          component: () => import('@/pages/pages1/sys')
        },
        {
          path: '/user',
          component: () => import('@/pages/pages1/user')
        }
      ]
    }
  ]
})
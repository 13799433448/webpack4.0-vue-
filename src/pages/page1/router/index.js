import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // 暂时放弃嵌套路由 我也不知道为啥哟 父页面会被多次渲染
  //  解决
  routes: [
    {
      path: '/',
      component: () => import('@/pages/page1/home'),
      children: [
        // UserProfile 会被渲染在 User 的 <router-view> 中
        {
          path: '/sys',
          component: () => import('@/pages/page1/sys')
        },
        {
          path: '/user',
          component: () => import('@/pages/page1/user')
        }
      ]
    },
    // {
    //   path: '/',
    //   component: () => import('@/pages/pages1/home')
    // },
    // {
    //   path: '/sys',
    //   component: () => import('@/pages/pages1/sys')
    // },
    // {
    //   path: '/user',
    //   component: () => import('@/pages/pages1/user')
    // }
  ]
})
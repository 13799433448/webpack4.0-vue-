import Vue from "vue"
import Router from "vue-router"
import routes from "./children"

Vue.use(Router)
let routesList: Array<any> = [
  {
    path: "/",
    component: () => import("@/pages/page1/home.vue"),
    children: [...routes],
  },
]
routesList = routesList.concat(routes)
export default new Router({
  // 暂时放弃嵌套路由 我也不知道为啥哟 父页面会被多次渲染
  //  解决
  routes: [...routesList],
  // routes: [
  //   {
  //     path: "/",
  //     component: () => import("@/pages/page1/home.vue"),
  //     children: [...routes],
  //   },
  // ],
})

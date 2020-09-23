// 1. 确保在声明补充的类型之前导入 'vue'
// 2. 定制一个文件，设置你想要补充的类型
//    在 types/vue.d.ts 里 Vue 有构造函数类型
import VueRouter, { Route } from 'vue-router'

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter // 这表示this下有这个东西
    $route: Route
    $http: any
    $Message: any
    $Modal: any
  }
}

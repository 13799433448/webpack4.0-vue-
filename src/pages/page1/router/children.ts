import home from '@/pages/page1/home.vue'
import sys from '@/pages/page1/sys.vue'
import user from '@/pages/page1/user.vue'

export default [
  {
    path: '/home',
    name: 'home',
    component: home,
  },
  {
    path: '/sys',
    component: sys,
  },
  {
    path: '/user',
    component: user,
  },
]

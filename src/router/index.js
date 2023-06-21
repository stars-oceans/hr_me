import Store from '@/store'
import Vue from 'vue'
import Router from 'vue-router'
// 修改名字的方法
import setDocumentTitle from '@/utils/get-page-title'
Vue.use(Router) //Vue扩展一个属性叫$router和$route

/* Layout */
import Layout from '@/layout'

// departments
import approvals from './modules/approvals'
import attendances from './modules/attendances'
import departments from './modules/departments'
import employees from './modules/employees.js'
import permission from './modules/permission'
import salarys from './modules/salarys.js'
import setting from './modules/setting.js'
import social from './modules/social'
// 静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: '首页', icon: 'dashboard' }
    },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
// ============================  动态路由 =============================//
// 动态路由
export const asyncRoutes = [
  //先空着这里，后面来补充功能
  departments,
  employees,
  setting,
  salarys,
  social, 
  attendances,
  approvals,
  permission
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...asyncRoutes]
})

const router = createRouter()

// 白名单
const whitelist = ['/login', '/404']
// 路由前置守卫
router.beforeEach((to, from, next) => {
  const token = Store.state.user.token
  if (token) {
    if (to.path == '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whitelist.includes(to.path)) {
      next()
    }
  }
})

// 路由后置守卫
router.afterEach((to, from)=>{
document.title = setDocumentTitle(to.meta.title)
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router

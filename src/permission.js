import NProgress from 'nprogress'; // 进度条导航（页面ur1下一条进度）
import 'nprogress/nprogress.css';
import router from './router';

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] //白名单（无需权限token有无的判断，直接进入的页面路径）

router.beforeEach(async (to, from, next) => {
    next()
})

// 全局后置守卫：路由页面跳转后！触发的后置守卫函数
router.afterEach(() => {

})

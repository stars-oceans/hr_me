import Cookies from 'js-cookie'
// 浏览器-前端本地存储方式 (重要：值都是字符串)
// (1):localStorage
// (2):sessionStorage->内置了一些方法
//使用：存入sessionStorage.setItem('key名'，value值

// 使用：取出sessionStorage.getItem('key名')->值
// (3):cookie
// 原生 js
// 存入：document.cookie='key名=value值；
// 取出： document.cookie会拿出所有的cookie.里值自己写原生js,操作cookie
// 借助s-cookie的包，人家把存入和取值的过程写好了，暴露出来几个方法让你直接用
const state = {
  sidebar: { // 侧边栏
    // Cookies.get('sidebarStatus')本地值'0'(侧边栏收起)'1'（侧边栏展开）
    //知识点：字符串'0'代表true  数字 0 代表的是 false

    //0和！1意思：隐式类型转换，true和false
    //发现跟原来的意思对应不上了，反了，所以再一次前面加！取反回来

    //当第一次打开，Cookie.里默认无值，取出null(假)，就会使用：后面的值给opened
    //效果：默认上来侧边栏打开
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false // 侧边栏收起是否有动画（看变量名分析）
    //false使用过渡动画，true不使用过度动画
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1) // 虽然这里是数字，但是到了浏览器里就是字符串了
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  //关闭左侧导航
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0) // 本地存入0
    state.sidebar.opened = false // state里opened变为false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },

  // 关闭侧边栏
  // 参数1：store对象，我们要提交得store.commit
  // 现在{commit}=store解构赋值直接拿到commit方法
  // 参数2：layout/index.vue调用传入对象{withoutAnimation:false}
  // withoutAnimation }=withoutAnimation:false
  // 左侧withoutAnimation变量值就是false
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  // 切换设备标记英文字符串
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

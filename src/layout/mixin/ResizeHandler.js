import store from '@/store'; // 引入store对象，因为这里js文件，不能用this.$store

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: { //侦听器(this.$route->路由信息对象) 
    $route(route) {// 当路由页面切换的时候，此函数自动执行
      if (this.device === 'mobile' && this.sidebar.opened) { //移动端+侧边栏打开
       // 就把侧边栏关闭
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() { //混入vue组件在挂载之前执行
    //resize窗口尺寸改变就触发
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile() //获取body大小
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    // 判断是否为 移动端设备
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH  //WIDTH =992  小于992，就返回true(判定为移动设备)
      // 有的浏览器分辨率不是10%，而是125%，宽度会有小数误差，所以-1
    },
    //  重置 vuex 的设备标识和从 pc-> 移动端的时候关闭侧边栏导航
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}

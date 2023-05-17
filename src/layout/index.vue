<template>
<!--登录后主负面的容器-->
  <div :class="classObj" class="app-wrapper">
   <!--移动端并且侧边栏打开，-->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
   <!-- 自定义 侧边栏导航 -->
    <sidebar class="sidebar-container" />
    <!-- 右侧容器 -->
    <div class="main-container">
      <!--右侧->头部导航-->
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <!--右侧->下面主体内容部分-->
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,//组件名可以在模板里大写/小写都可以，建议小写和-链接的写法（烤串法）(侧边栏)
    AppMain
  },
  // 混入：提取公共的配置项和值，使用的地方注入回来
  mixins: [ResizeMixin],
  computed: {
    // 侧边栏状态对象
    sidebar() {
      return this.$store.state.app.sidebar
    },
    // 设备(desktop'->pc端，'mobi1e'->移动端)
    device() {
      //modules.对象里遇到namespaced:true(开启命名空间)
      //影响statel的取值方式：store.state.模块名.变量名
      //模块名：new Vuex.Store({modules:{key名就是模块名})
      //store/modules,/app.js中查看值
      return this.$store.state.app.device
    },
    //来自于src/settings.js->vuex里settings.js,导出一个控制头部导航是否固定定位
    //此值：true/false
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      // class类名：布尔值
      return {
        hideSidebar: !this.sidebar.opened,// 侧边栏打开了，hideSidebar类名不要
        openSidebar: this.sidebar.opened, // 侧边栏打开了，openSidebar类名要
        withoutAnimation: this.sidebar.withoutAnimation,//vuex里withoutAnimation为false,不要动画类名
        mobile: this.device === 'mobile'//只有移动端才有mobile类名
      }
    }
  },
  methods: {
    // 移动端半透明蒙层->点击事件
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>

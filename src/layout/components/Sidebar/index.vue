<template>
  <!--左侧侧边栏完全容器-->
  <div :class="{'has-logo':showLogo}">
    <!-- logo 组件 -->
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!-- 
        内容容器el-scrollbar是elementUI隐藏的彩蛋（组件-官方文档没有）
        滚动条组件：自带e1-scrol1bar类名（内部设置超出隐藏，不出现滚动条）
        身上class,会出现在内容容器div身上
        wrap-class类名会出现此div子标签身上（真正内容容器里） 
    -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!--menu菜单组件-->
      <!-- 
          default-active当前默认激活菜单的index
          collapse是否水平折叠收起菜单（默认false不要）
          unique-opened是否只保持一个子菜单的展开（默认false) 
      -->
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">

        <!--文档说：el-menu里应该每行是el-menu-item,为何这里是sidebar-item呢？
          封装成sidebar.-item组件（内部有el-menu-item真正的每一项）
          V-for循环，每次执行都是独立的，值都是不同的
          route: 路由的规则对象
          -->
        <sidebar-item
        v-for="route in routes" 
        :key="route.path" 
        :item="route" 
        :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
//大佬：怎么生成左边的侧边栏导航的?
//答案：直接拿到路由规则对象数组，遍历sidebar-item产生(el-menu-item)侧边栏每一行
//按理来说：循环8个才对，为何只有5个在页面上呢?
export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      //   this.$router.options.routes 可以拿到初始化时配置的路由规则
      //  this.$route 可以拿到当前路由信息 （包括路由路径，参数0)

      //this.$router.options.routes路由表规则对象数组
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    // 是否展示侧边栏顶部1ogo组件->vuex(settings)->初始值src/settings.
    // js(true展示)
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    //Co11apse折叠
    //是否折叠
    //opened:打开状态(true)->返回给isCollapse(false->没有折叠)
    isCollapse() {
      // 拿到vuex里侧边栏opened,状态值(true展开，false折叠)
      return !this.sidebar.opened
    }
  }
}
</script>

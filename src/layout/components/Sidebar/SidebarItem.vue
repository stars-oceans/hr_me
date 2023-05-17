<template>
  <!--如果路由对象nidden字段为true,就不让这个路由对象产生侧边栏一行导航
    知识点：对象.不存在属性值为undefined(nul1具体值，你得赋予才能是nu11)
    -->
  <div v-if="!item.hidden">
    <!--路由对象chi1dren只有一个要展示侧边栏导航的就用这个
      路由对象children没有/children.里都隐藏的g个子对象，也用这个 -->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <!--v-if="only0 neChild.meta当前对象没有children/children筛选为g,但是你父级路由对象
      没有meta,我也不给你显示左侧导航-->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <!--中间夹插槽传入1ink中s1ot,就是a标签中间显示的文字+图标内容-->
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
         <!--今天自定义menu-item每行侧边栏导航，要显示的内容(item组件显示)-->
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <!--路由对象chi1dren有2个以上要展示的，就会用这个（非常复杂->递归组件）-->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(child.path)" class="nest-menu" />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: 直接挂载到组件身上（独立的）
    this.onlyOneChild = null
    return {}
  },
  methods: {
    //字面：判断是否有一个孩子要展示？children里是否有一个对象而且nidden不能为true
    //children形参：父级item路由对象children数组（子路由规则对象数组）
    //parent形参：父级item路由对象
    hasOneShowingChild(children = [], parent) {
      //数组.filter方法->过虑
      //遍历左边数组里没项，执行()里函数体
      //当函数体return true,fi1ter内部会收集当前遍历这个值，形成一个新数组
      //在遍历结束以后，新数组留在原地
      const showingChildren = children.filter(item => {
        //item是chilren数组里每个路由规则对象
        if (item.hidden) {
          return false // return给filter方法内部，告诉filter遍历时，遇到return false,此
          // item项就不会被filter内部新数组收集
        } else {
          this.onlyOneChild = item // 暂存一下当前仅有的一个孩子路由对象(？)
          return true // 让filter收集起来
        }
      })


      // 如果子菜单里只有一个路由对象需要显示导航，就命中这里
      if (showingChildren.length === 1) {
        //return 给 hasOne...
        return true
      }

      //知识点：this指向（口诀）
      //普通函数(function),this指向调用者
      //箭头函数，this指向外层函数this的值
      if (showingChildren.length === 0) {
        //例如：path:'/login',component:'登录页面'解构到这个对象里
        //后续把这个对象path改成''，又添加一对key+value:noShowingChildren:true
        //{path:',component:'登录页面'，noShowingChildren:true}
        //path:'/'component:Layout,redirect:'/dashboard',children:[{}]
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },

    // 处理导航跳转的路由链接（拼接）
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) { // 判断父级路由对象里path值，是不是外链
        return this.basePath // 直接返回父级的外链地址
      }

      // 父级path和自己path都不是外链地址，拼接
      // 父级拼接子路由对象path,形成，个完整的路由链接地址，并返回
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

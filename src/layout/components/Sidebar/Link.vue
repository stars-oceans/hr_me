<template>
  <!-- 1ink->链接组件
内部采用Vue内置的component动态组件：官方文档：https://cn.vuejs.org/v2/api/#component -->

  <!-- 
  v-bind="{id:'myA',title:'wo'}"（快捷绑定多个属性)
给标签渲染 id='myA'title='wo'
 -->
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    //链接要跳转的路径（外链/路由完整地址从根开始）
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    // 判断点击导航要跳转的链接，是否为外链（是true)
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      // 如果是外链地址，就component位置，渲染一个a标签
      if (this.isExternal) {
        return 'a'
      }
      //非外链，用路由提供router-Iink组件，跳转项目内组件页面 
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      // link决定跳转目标是否为外链
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'  // 一个标识而已，没啥用
        }
      }
      //非外链，给router-Iink绑定to属性值，就是要跳转的路由链接
      return {
        to: to
      }
    }
  }
}
</script>

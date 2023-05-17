<template>
  <!-- 字体文件是外部链接用div,非外链用sVg标签展示 -->
  <!-- svg里use,同源策略，不能使用外链地址 -->
  <!-- 
  此SvgIcon组件会被views.里页面使用
  <svg-icon @click="btn"@test="fn"></svg-icon>
  在svgIcon这个组件内，可以用$listeners接收所有绑定的事件(vue内置)
  $listeners值：{click:btn,test:fn}
  v-on:事件名="事件处理函数”->一个个绑定@事件名
  v-on=" {  } " ->快速给所在标签同时绑定多个事件和相应处理函数
 -->
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate'
//知识点：template内模板语法，只能用export default里模板配置项数据名
//不能直接用script里定义的普通变量

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    //  是否为外链( 如果外链返回 true )
    isExternal() {
      //里面调用import方法
      //登录页：user password eye这个值是字符串
      return isExternal(this.iconClass)
    },
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    //外链icon样式
    styleExternalIcon() {
      return {
        //蒙层：用css的方式设置图标
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>

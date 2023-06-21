<template>
  <section class="app-main">
    <!-- vue内置组件->过渡组件 -->
    <transition name="fade-transform" mode="out-in">
      <!--右下角路由页面切换有动画 
      key的作用: 新旧虚拟DOM对比的时候，加快对比效率使用标记
      暂无演示效果：防止路由挂载点不更新(key改变，标签就会重新渲染)

      如果有 key 虚拟 DOM 就会用key名进行对比,如果没有key,就用标签名进行对比
       -->
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
//Vue里采用了虚拟DOM概念 (通过s模拟出来保存节点关键信息的对象)
//真实D0M:document.querySelector('css选择器')获取对象（包含2g0+属性标签相关的）
//标签的c1ass名字改变了（但是我们知道），vue需要对比旧的DoM对象所有属性和新的D0M对象所有属性对比
//这个时候，对比要对比200多次，很浪费时间和性能
//Vue提出了虚拟DoM的概念
//template=>vue处理=>虚拟DoM=>真实D0M(显示)
//js对象，只保存关键的信息
//<p class="my"><span>123</span> </p>

//虚拟DOM结构
/**
 *  let dom = {
 * type : 'p',
 * attribute : [{ class : 'my' }],
 * children : [
 *      {  
 *        type : 'span',
 *        attribute : [],
 *        children : [],
 *        text : '123
 *      }
 * ]
 * }
 * 
 * //对比1-2次就能找到span的attribute变化了，然后只更新span的class到真实dom
 */
export default {
  name: 'AppMain',
  computed: {
    key() {
      //当前路由对象里路由路径path值
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #ecebeb;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

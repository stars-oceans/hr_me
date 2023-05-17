<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  //Vue组件创建的方式有2种：
  //1. .vue文件+template模板
  //2. .render渲染函数方式，创建组件
  render(h, context) {
    //参数1：createElement用于创建VNode(虚拟DoM)
    //参数2：context如果组件是一个函数组件，为没有实例(this)的函数组件提供上下文信息
    //上下文：运行时环境对象(this)
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      //例如：'el-icon-haha'includes()方法在原地true
      //例如：'dashboard'includes()方法在原地false
      if (icon.includes('el-icon')) {
        //如果用的是elementUI内置的字体名字，我们用i配合class使用字体方式渲染图标
        //render函数中，可以使用jsx语法（底层babe1l的翻译）
        //js中直接写标签，叫5sx语法，在标签里再嵌入js代码要用一个}包裹起来
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        // 如果icon名字是自己svg文件名，就用svg-icon组件来渲染svg图形
        vnodes.push(<svg-icon icon-class={icon} />)
      }
    }

    if (title) {
      // 如果有标题, 会加在图标后面
      // title 属性/插槽 都可以决定侧边栏导航文字显示
      // solt 原来2.6 以前的写法,具名插槽.证明<item> 组件的时候可以自定义标题</item>
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
    //返回方式1：
    //h()参数1：接收标签名，参数2：接收的子标签数组/文字内容
    //return h函数创建出来的虚拟DoM
    //返回方式2：
    //直接返回标签数组
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>

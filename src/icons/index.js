import SvgIcon from '@/components/SvgIcon'; // 全局svgIcon组件，显示svg图形
import Vue from 'vue';
// 知识点：引入路径是一个文件夹，默认找index.js或者index.vue

// 全局注册组件（一次注册，任意.vue文件内使用）
Vue.component('svg-icon', SvgIcon)


//  非常难（了解即可），不用硬读
//教：打印分析
// require.context(是webpack内置api,用于自动化导入模块)
// 场景：从一个文件夹引入很多模块
// 参数1：要读取的文件夹路径（隔壁sVg文件夹）
// 参数2：是否遍历子目录(false不要)
// 参数3：符合正则的才会导入 .svg 结尾的文件

const req = require.context('./svg', false, /\.svg$/)
//requireContext变量值：就是req
//方法名其实也是一个对象，也有属性可以访问
const requireAll = requireContext => {
  // 每个要引入文件名传入req中，进行webpack引入
 return  requireContext.keys().map(requireContext) }
requireAll(req)

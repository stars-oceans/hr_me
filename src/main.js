import Vue from 'vue';

// CSS重置（有的标签有默认的样式，重置掉）
// p标签默认margin,.body也有margin,a标签默认颜色和下划线...
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss'; // global css
import App from './App';
import router from './router';
import store from './store';



import '@/icons'; // icon
import '@/permission'; // permission control

// 打包生产的环境，会使用mock模拟接
// if (process.env.NODE_ENV === 'production') {
//   //http://mockjs.com/mock官方
//   //1.前后端商量好了，有哪些页面，需要哪些接口，每个接口里需要哪些数据字段
//   //2.前后端同时开发/前端先开发（后端暂无接口可用，但是有确定好的字段）
//   //3.可以采用mock来模拟接口（和模拟返回的随机数据
//   // motk也是封装好的一个包（但是一般在nodejs.环境使用）拦截ajax请求返回模拟数据
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
import Component from '@/components';
Vue.use(Component) // 注册自己的插件

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,  // 在这里给Vue原型$route和$router赋值
  store,
  render: h => h(App)
})

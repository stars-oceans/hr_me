import store from '@/store';
import axios from 'axios';
import { Message } from 'element-ui';
// 拦截器
const service = axios.create({
  // baseURL axios请求基地址
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    // 取出 tokken 值
    const token = store.state.user.token
    if (token) {
      // 后台解析的方法要求必须前面跟接一个 Bearer 和空格的 字符串
      config.headers['Authorization'] = `Bearer ${token}`
    }
    console.log(token);
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message } = response.data
    console.log(success);
    console.log(response);
    if (success) {
      // 给 login
      return response
    } else {
      Message.error(message);
      // 如果为 假
      return Promise.reject(message)
    }

  },
  error => {
    //4xx的响应状态，
    // 如果后台返回了响应数据，我们就用一下，如果没有，就error对象本身message 值
    Message.error((error.response && error.response.data
      && error.response.data.message) || error.message);
    return Promise.reject(error)
  }
)

export default service

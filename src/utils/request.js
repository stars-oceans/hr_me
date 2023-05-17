import axios from 'axios'
// 拦截器
const service = axios.create({
// baseURL axios请求基地址
  baseURL: process.env.VUE_APP_BASE_API, 
  timeout: 5000 
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
      return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service

//导入axios方法用request变量接收
import request from '@/utils/request'


// 第三层封装：封装请求方法
// 按需导出函数
export function getList(params) {
  // 本函数,指向目标 url 发请求,带上参数
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

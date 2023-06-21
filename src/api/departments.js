import request from '@/utils/request.js'

/**
 * 获取 部门列表
 * @returns Promise 对象
 */
export const  getDepartmentsList = ()=>{
  return request({
    url : '/company/department',
    method : 'get'
  })
}
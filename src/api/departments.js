import request from '@/utils/request.js';

/**
 * 获取 部门列表
 * @returns Promise 对象
 */
export const getDepartmentsList = () => {
  return request({
    url: '/company/department',
    method: 'get'
  })
}

/**
 * 新增部门 的接口
 * Method： POST
 * @returns Promise 对象
 */
export const addDepartmentItem = (data) => {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/**
 *  获取员工的简单列表
 * **/
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 *获取详情的接口
 * @param {*} depId  传入部门的 ID
 * @returns  promise 对象
 */
export function getDepartdetails(depId) {
  console.log(depId);
  return request({
    url: `/company/department/${depId}`
  })
}

/** TODO:
 * 修改部门信息的 接口  不过好像接口有点问题,
 * 点击修改结果删除了
 * @param {*} depId 部门的 id
 * @param {*} data  修改准备提交的数据
 * @returns  promise 对象 
 */
export function updateDepardetails(depId, data) {

  return request({
    url: `/company/department/${depId}`,
    method: 'put',
    data : data
  })
}

/**
 * 删除部门的 接口
 * @param {*} depId 删除部门的 id
 * @returns promise 对象
 */
export function deleteDepardetails(depId){
return request({
  url : `/company/department/${depId}`,
  method : 'DELETE'
})
}
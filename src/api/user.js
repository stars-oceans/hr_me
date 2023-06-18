import request from '@/utils/request';
// 第三层封装：封装请求方法

/**
 * 
 * @param {object} data 手机号 +  密码对象
 * @returns promise 对象
 */
export function loginAPI(data) {
  // console.log(data.username);
  // console.log(data.password);
  return request({
    url: '/sys/login',
    method: 'POST',
    data: {
      mobile : data.username,
     password : data.password
    }
  })
}

/**
 *  获取用户的基本资料
 *
 * **/
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * 获取员工的基本信息 { 接口里面只为了获取头像 }
 * @id : 员工的 id
 */

export const getUserAvatar = function (id){
     return  request({
      // method : 'get',
      url : `/sys/user/${id}`
     })
}


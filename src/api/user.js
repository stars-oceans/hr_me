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
    // headers:{)/axios默认会携带请求头Content-Type:'application/,json'
    // Content-Type:'application,/json'->请求体里参数名和值，会变成JSoN字符串格式给后台
    // data:{
    //     mobile : data.mobile,
    //     password : data.password
    // }
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

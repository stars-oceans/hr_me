import request from '@/utils/request'

 export function getRoleAPI(params){
  return request({
     url: '/sys/role',
     params
  })
 }
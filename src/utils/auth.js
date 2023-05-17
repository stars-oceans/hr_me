// 操作 token 的三个方法

import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token' // 获取 token, 设置 token 都对浏览器
// 本地 Cookie 里这个 key 名操作 -> 一处定义下面重复使用 (统一修改方便)

// 从浏览器本地里, 拿到存的 token 字符串
export function getToken() {
  return Cookies.get(TokenKey)
}

// 往浏览器本地里里面, 设置token 字符串到 cookie中
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 把 token 从cookie 删除掉
export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 判断我们外面传入的名字为 'admin' || editer
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  //数组.indexof(值)作用：在数组里找值首次出现的数组下标
  return valid_map.indexOf(str.trim()) >= 0
}

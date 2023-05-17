/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * 格式化时间对象变成字符串
 * Parse the time to string
 * @param {(Object|string|number)} time //时间对象/时间字符串/时间毫秒
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) { //(容错判做)妆有传参/传递time值是空
    return null  //直接返回nu11出去
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}' // 格式化目标格式
  let date // 保存日期对象
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {  //如果time时间是字符串
      if ((/^[0-9]+$/.test(time))) {  //只能由0-9的数字组成(+匹配左侧1到多次)
        // support "1548221490638"
        //把毫秒字符串格式化成数字
        time = parseInt(time)
      } else {
        // support safari (支持工0S内置的浏览器，时间字符串只能用/不能用-)
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        //字符串.replace()替换方法，把参数1匹配的，直接换成参数2，并返回新的字符串
        //g全局匹配，
        //可以匹配多次，不然只能替换1个-
        //m多行匹配，如果字符串里包含回车多行，也能匹配到
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }
    // 如果是数字，并且长度1g位（传入进来的是秒），但是new Date()里要求传入的是毫秒
    // 1s = 1000ms
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }

  // **********************战术分割线（上面判断time值得到date日期对象）************************* //
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  //要把占位符替换，用了replace()方法
  //正则：先匹配左右两侧必须是(}，接着匹配}中间为([ymdhisa])+任意一个一次到多次
  //replace()参数2，可以直接是一个替换的值，也可以是一个回调函数，用函数return值来进行替换
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

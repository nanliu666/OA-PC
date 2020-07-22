/**
 * 金额转中文
 * 思路：
 * 个 十   百   千   万
 *    十万 百万 千万 亿
 *    十亿 百亿 千亿
 * 1  2    3    4    5
 *    6    7    8    9
 *    10
 *
 */
export function getAmountChinese(val) {
  const amount = +val
  if (Number.isNaN(amount) || amount < 0) return ''
  const NUMBER = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const N_UNIT1 = ['', '拾', '佰', '仟']
  const N_UNIT2 = ['', '万', '亿']
  const D_UNIT = ['角', '分']
  let [integer, decimal] = amount.toFixed(2).split('.')
  if (integer && integer.length > 12) return '金额过大无法计算'
  let res = ''
  // 整数部分
  if (integer) {
    for (let i = 0, len = integer.length; i < len; i++) {
      const num = integer.charAt(i)
      const pos = len - i - 1 // -1 排除个位干扰
      if (i === len - 1 && num === '0') break
      res += NUMBER[num] + N_UNIT1[pos % 4]
      if (pos % 4 === 0) {
        // 排除个位数后 万和亿位置都是4的倍数
        res += N_UNIT2[Math.floor(pos / 4)]
      }
    }
  }
  res += '圆'
  if (decimal) {
    // 小数部分
    for (let i = 0; i < 2; i++) {
      const num = decimal.charAt(i)
      num !== '0' && (res += NUMBER[num] + D_UNIT[i])
    }
  }
  return res
}

/**
 * 计算两个时间差经历的时间的文字描述
 * @param {*} timestamp - 毫秒
 */
export const timeCalculate = (start, end) => {
  const label = ['分钟', '小时', '天', '月', '年']
  const unit = [60, 60, 24, 30, 12]
  let restTime = Math.floor((end - start) / 1000)
  let res = ''
  for (let i = 0, len = unit.length; i < len; i++) {
    const pos = len - i // 从年开始算，分钟换算成年 === Math.pow(60, 4)
    const temp = unit.slice(0, pos).reduce((p, c) => p * c, 1)
    const time = Math.floor(restTime / temp)
    time > 0 && (res += time + label[pos - 1])
    restTime -= time * temp
  }
  return res
}

/**
 * 简易防抖函数
 * @param {Function} func -防抖目标函数
 * @param {Number}} gap - 防抖时间间隔
 */
export const debounce = (func, gap) => {
  let timer
  return function() {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, arguments)
    }, gap)
  }
}
/**
 * 对象取值
 * @param {Object} obj
 * @param {String} path
 */
export const get = (obj, path, defaultValue) => {
  var paths = path.split('.'),
    current = obj,
    i

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return defaultValue
    } else {
      current = current[paths[i]]
    }
  }
  return current
}

/**
 * 下划线转驼峰
 * @param {String} name - 字符串
 */
export const toHump = (name) =>
  name.replace(/_(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
/**
 * 将用户输入的连续单个数字合并为一个数
 * @param {Array} expressions - 记录计算表达式的数组
 * @returns {Array} 新的数组
 */
export const mergeNumberOfExps = (expressions) => {
  const res = []
  const isNumChar = (n) => /^[\d|.]$/.test(n)
  for (let i = 0; i < expressions.length; i++) {
    if (i > 0 && isNumChar(expressions[i - 1]) && isNumChar(expressions[i])) {
      res[res.length - 1] += expressions[i]
      continue
    }
    res.push(expressions[i])
  }
  return res
}
/**
 * 校验表达式是否符合计算法则
 * @param {Array} expressions - 合并数字后的表达式数组
 * @returns {Boolean}
 */
export const validExp = (expressions, mergeNum = true) => {
  const temp = mergeNum ? mergeNumberOfExps(expressions) : expressions
  const arr = temp.filter((t) => !'()'.includes(t))
  // 去括号后 length应该为奇数  并且第一个字符和最后一个字符应该为数字而非计算符号
  if (
    temp.length % 2 === 0 ||
    arr.length % 2 === 0 ||
    Number.isNaN(+arr[0]) ||
    Number.isNaN(+arr[arr.length - 1])
  ) {
    return false
  }
  for (let i = 0; i < arr.length - 1; i += 2) {
    if (typeof +arr[i] !== 'number' || !Number.isNaN(+arr[i + 1])) return false
  }
  return true
}

function stringify(obj) {
  return JSON.stringify(obj, (key, val) => {
    if (typeof val === 'function') {
      return `${val}`
    }
    return val
  })
}

function parse(str) {
  JSON.parse(str, (k, v) => {
    if (v.indexOf && v.indexOf('function') > -1) {
      return eval(`(${v})`)
    }
    return v
  })
}

export function jsonClone(obj) {
  return parse(stringify(obj))
}

// 深拷贝对象
export function deepClone(obj) {
  const _toString = Object.prototype.toString

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true)
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime())
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags = []
    if (obj.global) {
      flags.push('g')
    }
    if (obj.multiline) {
      flags.push('m')
    }
    if (obj.ignoreCase) {
      flags.push('i')
    }

    return new RegExp(obj.source, flags.join(''))
  }

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

  for (const key in obj) {
    result[key] = deepClone(obj[key])
  }

  return result
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

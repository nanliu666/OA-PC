import { validatenull } from '@/util/validate'
import website from '@/config/website'

const keyName = website.key + '-'
/**
 * 存储localStorage
 */
export const setStore = (params = {}) => {
  let { name, content, type = 'local' } = params
  let storage = 'localStorage'
  if (type === 'session') {
    storage = 'sessionStorage'
  }
  name = keyName + name
  let obj = {
    dataType: typeof content,
    content: content,
    type: type,
    datetime: new Date().getTime()
  }
  window[storage].setItem(name, JSON.stringify(obj))
}
/**
 * 获取localStorage
 */

export const getStore = (params = {}) => {
  let { name, debug } = params
  name = keyName + name
  let obj = {},
    content
  obj = window.localStorage.getItem(name)
  if (validatenull(obj)) obj = window.sessionStorage.getItem(name)
  if (validatenull(obj)) return
  try {
    obj = JSON.parse(obj)
  } catch {
    return obj
  }
  if (debug) {
    return obj
  }
  if (obj.dataType == 'string') {
    content = obj.content
  } else if (obj.dataType == 'number') {
    content = Number(obj.content)
  } else if (obj.dataType == 'boolean') {
    content = eval(obj.content)
  } else if (obj.dataType == 'object') {
    content = obj.content
  }
  return content
}
/**
 * 删除localStorage
 */
export const removeStore = (params = {}) => {
  let { name, type = 'local' } = params
  let storage = 'localStorage'
  if (type === 'session') {
    storage = 'sessionStorage'
  }
  name = keyName + name
  window[storage].removeItem(name)
}

/**
 * 获取全部localStorage
 */
export const getAllStore = (params = {}) => {
  let list = []
  let { type = 'local' } = params
  let storage = 'localStorage'
  if (type === 'session') {
    storage = 'sessionStorage'
  }
  for (let i = 0; i <= window[storage].length; i++) {
    list.push({
      name: window[storage].key(i),
      content: getStore({
        name: window[storage].key(i)
      })
    })
  }
  return list
}

/**
 * 清空全部localStorage
 */
export const clearStore = (params = {}) => {
  let { type = 'local' } = params
  let storage = 'localStorage'
  if (type === 'session') {
    storage = 'sessionStorage'
  }
  window[storage].clear()
}

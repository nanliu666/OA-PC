/**
 * author: Waizau.Tam
 */

import store from 'src/store'

/**
 *
 * @param nameSpace
 * @returns {boolean}
 */
function p(nameSpace) {
  // if (
  //     store.getters.user &&
  //     (store.getters.user.userType === 1 ||
  //         store.getters.user.userType === "1")
  // ) {
  //     return true;
  // } else
  if (nameSpace === '*' || nameSpace === undefined) {
    // 定义*为能所有人都能访问的
    return true
  } else if (!nameSpace || nameSpace.length <= 0) {
    return false
  } else {
    if (!store.getters.user) {
      return false
    }
    const plist = store.getters.privileges || []

    if (!plist || plist.length <= 0) {
      return false
    }

    let passed

    if (nameSpace instanceof Array) {
      for (let i = 0; i < nameSpace.length; ++i) {
        if (plist.indexOf(nameSpace[i]) >= 0) {
          passed = true
          break
        }
      }
    } else {
      passed = plist.indexOf(nameSpace) >= 0
    }
    // eslint-disable-next-line no-unsafe-finally
    return !!passed
  }
}

function install(Vue) {
  Vue.prototype.$p = p

  // 权限指令
  Vue.directive('p', {
    bind: function(el, binding, vnode) {
      if (!Vue.prototype.$p(binding.value)) {
        vnode.context.$nextTick(() => el.parentNode.removeChild(el))
      }
    }
  })
}

export default install

export const $p = p

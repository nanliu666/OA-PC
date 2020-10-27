/**
 * 全站权限配置
 *
 */
import router from './router/router'
import store from './store'
import { validatenull } from '@/util/validate'
import { getToken } from '@/util/auth'
import { filterTree } from '@/util/util'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false })
const lockPage = store.getters.website.lockPage //锁屏页
const userPaths = ['/info/index', '/info/securitySetting']
const userCenterMenu = {
  menuName: '个人中心',
  menuType: 'Dir',
  menuId: null,
  children: [
    {
      menuId: '312122',
      menuName: '个人信息',
      menuType: 'Menu',
      isOwn: 1,
      isShow: 1,
      code: 'userinfo',
      alias: 'userInfo',
      path: '/info/index',
      children: []
    },
    {
      menuId: '312123',
      menuName: '安全设置',
      isOwn: 1,
      isShow: 1,
      code: 'user_securitySetting',
      alias: 'securitySetting',
      path: '/info/securitySetting',
      children: []
    }
  ]
}
function comparePath(pathA, pathB) {
  if (pathA.indexOf(':') > 0) {
    return pathA.replace(/:\w*$/, '') === pathB.replace(/\w*$/, '')
  } else {
    return pathA === pathB
  }
}
/**
 * 更新左侧菜单和顶部菜单
 **/
function updateMenu(currentPath) {
  let currentMenu = null
  if (userPaths.includes(currentPath)) {
    currentMenu = userCenterMenu
  } else {
    const menuAll = store.getters.menuAll
    menuAll.some((menu) => {
      if (
        filterTree(
          [menu],
          (menu) => comparePath(menu.path, currentPath) && menu.menuType === 'Menu',
          true
        ).length > 0
      ) {
        currentMenu = menu
        return true
      }
      return false
    })
  }
  // 用找到的根菜单数据更新左侧菜单和顶部菜单状态
  if (currentMenu) {
    store.commit('SET_MENU', currentMenu)
  } else {
    // 找不到对应根菜单，将顶部菜单置为工作台
    store.commit('SET_MENU', { menuId: null })
  }
}
router.beforeEach((to, from, next) => {
  const meta = to.meta || {}
  const isMenu = meta.menu === undefined ? to.query.menu : meta.menu
  store.commit('SET_IS_MENU', isMenu === undefined)
  if (getToken()) {
    if (store.getters.isLock && to.path !== lockPage) {
      //如果系统激活锁屏，全部跳转到锁屏页
      next({ path: lockPage })
    } else if (to.path === '/login') {
      //如果登录成功访问登录页跳转到主页
      next({ path: '/' })
    } else {
      //如果用户信息为空则获取用户信息，获取用户信息失败，跳转到登录页
      if (store.getters.token.length === 0) {
        store.dispatch('FedLogOut').then(() => {
          next({ path: '/login' })
        })
      } else {
        const value = to.path
        updateMenu(value)
        const label = to.query.tagName || to.name
        // 每次路由跳转时找到目标路径对应的根菜单数据
        const meta = to.meta || router.$avueRouter.meta || {}
        const i18n = to.query.i18n
        if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
          store.commit('ADD_TAG', {
            label: label,
            value: value,
            params: to.params,
            query: to.query,
            meta: (() => {
              if (!i18n) {
                return meta
              }
              return {
                i18n: i18n
              }
            })(),
            group: router.$avueRouter.group || []
          })
        }
        next()
      }
    }
  } else {
    //判断是否需要认证，没有登录访问去登录页
    if (meta.isAuth === false) {
      next()
    } else {
      const path = { path: '/login' }
      const previewUrl = to.query.type ? encodeURI(to.fullPath) : ''
      const toPath = previewUrl ? _.assign(path, { query: { previewUrl } }) : path
      next(toPath)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
  let title = store.getters.tag.label
  let i18n = store.getters.tag.meta.i18n
  title = router.$avueRouter.generateTitle(title, i18n)
  //根据当前的标签也获取label的值动态设置浏览器标题
  router.$avueRouter.setTitle(title)
})

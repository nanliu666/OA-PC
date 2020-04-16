import { setToken, setRefreshToken, removeToken, removeRefreshToken } from '@/util/auth'
import { Message } from 'element-ui'
import { setStore, getStore } from '@/util/store'
import { isURL, validatenull } from '@/util/validate'
import { deepClone } from '@/util/util'
import website from '@/config/website'
import { loginByUsername, getUserInfo, logout, refreshToken, getButtons } from '@/api/user'
import { getTopMenu, getRoutes } from '@/api/system/menu'
import md5 from 'js-md5'

function addPath(ele, first) {
  const menu = website.menu
  const propsConfig = menu.props
  const propsDefault = {
    label: propsConfig.label || 'name',
    path: propsConfig.path || 'path',
    icon: propsConfig.icon || 'icon',
    children: propsConfig.children || 'children'
  }
  const icon = ele[propsDefault.icon]
  ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0
  if (!isChild) ele[propsDefault.children] = []
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path] + '/index'
  } else {
    ele[propsDefault.children].forEach((child) => {
      addPath(child)
    })
  }
}

const user = {
  state: {
    tenantId: getStore({ name: 'tenantId' }) || '',
    userInfo: getStore({ name: 'userInfo' }) || [],
    permission: getStore({ name: 'permission' }) || {},
    roles: [],
    menu: getStore({ name: 'menu' }) || [],
    menuId: getStore({ name: 'menuId' }) || [],
    menuAll: getStore({ name: 'menuAll' }) || [],
    token: getStore({ name: 'token' }) || '',
    refreshToken: getStore({ name: 'refreshToken' }) || ''
  },
  actions: {
    //根据用户名登录
    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(
          userInfo.tenantId,
          userInfo.username,
          md5(userInfo.password),
          userInfo.type,
          userInfo.key,
          userInfo.code
        )
          .then((res) => {
            if (res.error_description) {
              Message({
                message: res.error_description,
                type: 'error'
              })
            } else {
              commit('SET_TOKEN', res.access_token)
              commit('SET_REFRESH_TOKEN', res.refresh_token)
              commit('SET_TENANT_ID', res.tenant_id)
              commit('SET_USER_INFO', res)
              commit('DEL_ALL_TAG')
              commit('CLEAR_LOCK')
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    GetButtons({ commit }) {
      return new Promise((resolve) => {
        getButtons().then((res) => {
          const data = res.data
          commit('SET_PERMISSION', data)
          resolve()
        })
      })
    },
    //根据手机号登录
    LoginByPhone({ commit }, userInfo) {
      return new Promise((resolve) => {
        loginByUsername(userInfo.phone, userInfo.code).then((res) => {
          const data = res.data
          commit('SET_TOKEN', data)
          commit('DEL_ALL_TAG')
          commit('CLEAR_LOCK')
          resolve()
        })
      })
    },
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            const data = res.data
            commit('SET_ROLES', data.roles)
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    //刷新token
    refreshToken({ state, commit }) {
      window.console.log('handle refresh token')
      return new Promise((resolve, reject) => {
        refreshToken(state.refreshToken, state.tenantId)
          .then((res) => {
            commit('SET_TOKEN', res.access_token)
            commit('SET_REFRESH_TOKEN', res.refresh_token)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_MENU', [])
            commit('SET_MENU_ID', {})
            commit('SET_MENU_ALL', [])
            commit('SET_ROLES', [])
            commit('DEL_ALL_TAG')
            commit('CLEAR_LOCK')
            removeToken()
            removeRefreshToken()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    //注销session
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_MENU_ID', {})
        commit('SET_MENU_ALL', [])
        commit('SET_MENU', [])
        commit('SET_ROLES', [])
        commit('DEL_ALL_TAG')
        commit('CLEAR_LOCK')
        removeToken()
        removeRefreshToken()
        resolve()
      })
    },
    //获取顶部菜单
    GetTopMenu() {
      return new Promise((resolve) => {
        getTopMenu().then((res) => {
          const data = res.data || []
          resolve(data)
        })
      })
    },
    //获取系统菜单
    GetMenu({ commit, dispatch }, topMenuId) {
      return new Promise((resolve) => {
        getRoutes(topMenuId).then((res) => {
          const data = res.data
          let menu = deepClone(data)
          menu.forEach((ele) => {
            addPath(ele, true)
          })
          commit('SET_MENU', menu)
          dispatch('GetButtons')
          resolve(menu)
        })
      })
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token
      setStore({ name: 'token', content: state.token, type: 'session' })
    },
    SET_MENU_ID(state, menuId) {
      state.menuId = menuId
      setStore({ name: 'menuId', content: state.menuId, type: 'session' })
    },
    SET_MENU_ALL: (state, menuAll) => {
      state.menuAll = menuAll
      setStore({ name: 'menuAll', content: state.menuAll, type: 'session' })
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      setRefreshToken(refreshToken)
      state.refreshToken = refreshToken
      setStore({ name: 'refreshToken', content: state.refreshToken, type: 'session' })
    },
    SET_TENANT_ID: (state, tenantId) => {
      state.tenantId = tenantId
      setStore({ name: 'tenantId', content: state.tenantId, type: 'session' })
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
      setStore({ name: 'userInfo', content: state.userInfo })
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      let menuAll = state.menuAll
      if (!validatenull(menu)) {
        const obj = menuAll.filter((ele) => ele.path === menu[0].path)[0]
        if (!obj) {
          menuAll = menuAll.concat(menu)
          state.menuAll = menuAll
        }
        setStore({ name: 'menuAll', content: menuAll, type: 'session' })
      }
      setStore({ name: 'menu', content: state.menu, type: 'session' })
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSION: (state, permission) => {
      let result = []

      function getCode(list) {
        list.forEach((ele) => {
          if (typeof ele === 'object') {
            const chiildren = ele.children
            const code = ele.code
            if (chiildren) {
              getCode(chiildren)
            } else {
              result.push(code)
            }
          }
        })
      }

      getCode(permission)
      state.permission = {}
      result.forEach((ele) => {
        state.permission[ele] = true
      })
      setStore({ name: 'permission', content: state.permission, type: 'session' })
    }
  }
}
export default user

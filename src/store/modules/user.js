import { setToken, setRefreshToken, removeToken, removeRefreshToken } from '@/util/auth'
import { Message } from 'element-ui'
import { setStore, getStore } from '@/util/store'
import { filterTree, flatTree, sortTree } from '@/util/util'
import { loginByUsername, getUserInfo, logout, refreshToken, getUserPrivilege } from '@/api/user'
import md5 from 'js-md5'

const user = {
  state: {
    tenantId: getStore({ name: 'tenantId' }) || '',
    userInfo: getStore({ name: 'userInfo' }) || [],
    privileges: getStore({ name: 'privileges' }) || [],
    orgs: getStore({ name: 'orgs' }) || [],
    info: getStore({ name: 'info' }) || [],
    roles: [],
    menu: getStore({ name: 'menu' }) || [],
    menuAll: getStore({ name: 'menuAll' }) || [],
    token: getStore({ name: 'token' }) || '',
    refreshToken: getStore({ name: 'refreshToken' }) || '',
    menuLoading: false
  },
  actions: {
    set_info: ({ commit }, info) => {
      commit('SET_INFO', info)
    },
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
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    GetUserPrivilege({ commit }, userId) {
      return new Promise((resolve) => {
        commit('SET_MENU_LOADING', true)
        getUserPrivilege(userId).then((data) => {
          commit('SET_MENU_LOADING', false)
          commit(
            'SET_ORGS',
            data.orgPrivileges.filter((org) => org.isOwn === 1)
          )
          const menuAll = filterTree(
            data.menuPrivileges,
            (node) => node.isOwn === 1 && node.menuType !== 'Button'
          )
          sortTree(menuAll, (a, b) => a.sort - b.sort)
          commit('SET_MENU', menuAll[0].children)
          commit('SET_MENU_ALL', menuAll)
          commit(
            'SET_PRIVILEGES',
            flatTree(data.menuPrivileges)
              .filter((node) => node.isOwn === 1 && node.menuType === 'Button')
              .map((item) => item.path)
          )
          resolve(menuAll)
        })
      })
    },
    //根据手机号登录
    LoginByPhone({ commit }, userInfo) {
      return new Promise((resolve) => {
        loginByUsername(userInfo.phone, userInfo.code).then((data) => {
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
          .then((data) => {
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
    // 获取系统菜单
    SetMenu({ commit }, menu) {
      return new Promise((resolve) => {
        commit('SET_MENU', menu)
        resolve(menu)
      })
    }
  },
  mutations: {
    SET_INFO: (state, info) => {
      state.info = info
      setStore({ name: 'info', content: state.info, type: 'session' })
    },
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token
      setStore({ name: 'token', content: state.token, type: 'session' })
    },
    SET_MENU_ALL: (state, menuAll) => {
      state.menuAll = menuAll
      setStore({ name: 'menuAll', content: menuAll, type: 'session' })
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
      setStore({ name: 'userInfo', content: state.userInfo, type: 'session' })
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      setStore({ name: 'menu', content: state.menu, type: 'session' })
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ORGS: (state, orgs) => {
      state.orgs = orgs
      setStore({ name: 'orgs', content: orgs, type: 'session' })
    },
    SET_PRIVILEGES: (state, privileges) => {
      state.privileges = privileges
      setStore({ name: 'privileges', content: privileges, type: 'session' })
    },
    SET_MENU_LOADING: (state, menuLoading) => {
      state.menuLoading = menuLoading
    }
  }
}
export default user

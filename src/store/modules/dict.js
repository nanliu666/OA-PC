import { getStore, setStore } from '@/util/store'

import { getDictionary } from '@/api/system/dict'

const dict = {
  state: {
    flowRoutes: getStore({ name: 'flowRoutes' }) || {},
    commonDict: getStore({ name: 'commonDict' }) || {}
  },
  actions: {
    //发送错误日志
    FlowRoutes() {
      return
      // return new Promise((resolve, reject) => {
      //   getDictionary({ code: 'flow' })
      //     .then((res) => {
      //       commit('SET_FLOW_ROUTES', res)
      //       resolve()
      //     })
      //     .catch((error) => {
      //       reject(error)
      //     })
      // })
    },
    CommonDict({ state, commit }, name) {
      return new Promise((resolve, reject) => {
        if (state.commonDict[name]) {
          resolve(state.commonDict[name])
          return
        }
        getDictionary({ code: name })
          .then((data) => {
            commit('SET_COMMON_DICT', { name, data })
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  },
  mutations: {
    SET_FLOW_ROUTES: (state, data) => {
      state.flowRoutes = data.map((item) => {
        return {
          routeKey: `${item.code}_${item.dictKey}`,
          routeValue: item.remark
        }
      })
      setStore({
        name: 'flowRoutes',
        content: state.flowRoutes
      })
    },
    SET_COMMON_DICT: (state, { name, data }) => {
      state.commonDict[name] = data
      setStore({
        name: 'commonDict',
        content: state.commonDict
      })
    }
  }
}

export default dict

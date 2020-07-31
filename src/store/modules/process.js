let hasCondition = (state, formId, needIndex = false) => {
  let index = state.processConditions.findIndex((d) => d.__config__.formId === formId)
  return needIndex ? index : index > -1
}

const process = {
  state: {
    processConditions: [], // processConditions 用于传递流程图需要的条件
    formItemList: [] // 流程节点表单权限控制——组件列表
  },
  actions: {},
  mutations: {
    //所有mutations中的方法的第一个参数一定是state变量，用来进行对state中的状态的操作
    //第二个参数是可选参数，用于调用该 mutations 方法的时候传参
    initPConditions(state, data) {
      state.processConditions = data
    },
    addPCondition(state, data) {
      if (data.__config__.formId === null || data.__config__.formId === undefined) return
      if (!hasCondition(state, data.__config__.formId)) {
        state.processConditions.unshift(data)
      }
    },
    delPCondition(state, formId) {
      if (formId === null || formId === undefined) return
      let index = hasCondition(state, formId, true)
      let cons = state.processConditions
      index > -1 && cons.splice(index, 1)
    },
    //  * 清除所有的条件
    clearPCondition(state) {
      state.processConditions = []
    },
    updateFormItemList(state, list) {
      state.formItemList = list
    }
  }
}

export default process

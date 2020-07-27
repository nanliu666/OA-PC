let hasCondition = (state, formId, needIndex = false) => {
  let index = state.processConditions.findIndex((d) => d.__config__.formId === formId)
  return needIndex ? index : index > -1
}

const process = {
  state: {
    processConditions: [
      {
        __config__: {
          name: '单选',
          label: '请假天数',
          type: 'number',
          icon: 'icon-basics-radio-outlined',
          defaultValue: 2,
          layout: 'colFormItem',
          required: true,
          shouldPrint: true,
          formId: 5,
          renderKey: 1594631434747
        },
        __slot__: {
          options: [
            { label: '选项一', value: 1 },
            { label: '选项二', value: 2 }
          ]
        },
        __pc__: {
          span: 12,
          tag: 'el-radio-group',
          props: { size: 'medium' },
          style: { width: '100%' }
        },
        __mobile__: { renderType: 'select', tag: 'van-field-select-picker', props: {} },
        placeholder: '请选择',
        __vModel__: 'field5',
        tag: 'el-input-number'
      },
      {
        __config__: {
          name: '多选',
          label: '是否需要假條',
          type: 'radio',
          icon: 'icon-basics-checkbox-outlined',
          defaultValue: [],
          layout: 'colFormItem',
          shouldPrint: true,
          required: true,
          formId: 6,
          renderKey: 1594631435830
        },
        __slot__: {
          options: [
            { label: '选项一', value: 1 },
            { label: '选项二', value: 2 }
          ]
        },
        __pc__: { span: 12, tag: 'el-checkbox-group', style: { width: '100%' }, props: {} },
        __mobile__: { renderType: 'select', tag: 'multi-picker', props: {} },
        placeholder: '请选择',
        __vModel__: 'field6',
        tag: 'el-radio-group'
      }
    ], // processConditions 用于传递流程图需要的条件
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

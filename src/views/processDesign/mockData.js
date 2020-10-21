export default {
  basicSetting: {
    icon: '12',
    processName: '入职',
    categoryId: '1283677855282483201',
    processAdmin: '1285518000080068610',
    remark: '简单入职背景填写',
    initiator: [
      {
        hasChildren: false,
        id: '1257943561580855298',
        name: '后端组',
        orgId: '1257943561580855298',
        orgName: '后端组',
        parentId: '1252523599903072261'
      }
    ]
  },
  processData: {
    type: 'start',
    content: '所有人',
    properties: { title: '发起人', initiator: 'ALL' },
    nodeId: 'TlC',
    prevId: '__vue_devtool_undefined__',
    childNode: '__vue_devtool_undefined__',
    conditionNodes: '__vue_devtool_undefined__',
    parallelNodes: [
      {
        type: 'parallel',
        content: '请设置审批人',
        properties: { title: '审批人1', priority: 0 },
        nodeId: 'UlC',
        prevId: 'TlC',
        parallelNodes: [
          {
            type: 'parallel',
            content: '请设置审批人',
            properties: { title: '审批人1', priority: 0 },
            nodeId: 'WlC',
            prevId: 'UlC'
          },
          {
            type: 'parallel',
            content: '请设置审批人',
            properties: { title: '审批人2', priority: 1, isDefault: true },
            nodeId: 'XlC',
            prevId: 'UlC'
          }
        ]
      },
      {
        type: 'parallel',
        content: '请设置审批人',
        properties: { title: '审批人2', priority: 1, isDefault: true },
        nodeId: 'VlC',
        prevId: 'TlC'
      }
    ]
  },
  // processData: {
  //   type: 'start',
  //   content: '所有人',
  //   properties: { title: '发起人', initiator: 'ALL', formOperates: [] },
  //   nodeId: 'Gb2',
  //   childNode: {
  //     type: 'approver',
  //     content: '离职测测,李小龙',
  //     properties: {
  //       title: '审批人',
  //       assigneeType: 'optional',
  //       formOperates: [],
  //       counterSign: true,
  //       optionalMultiUser: true,
  //       optionalRange: 'USER',
  //       approvers: [
  //         {
  //           workNo: '4342',
  //           name: '离职测测',
  //           userId: '1283302477003075585',
  //           id: '1252523599903072258_1283302477003075585',
  //           type: 'user'
  //         },
  //         {
  //           workNo: '4344',
  //           name: '李小龙',
  //           userId: '1283307826803585025',
  //           id: '1252523599903072258_1283307826803585025',
  //           type: 'user'
  //         }
  //       ]
  //     },
  //     nodeId: 'Nb2',
  //     prevId: 'Gb2',
  //     variable: 'optional_Nb2_id',
  //     childNode: {
  //       type: 'copy',
  //       content: 'E',
  //       properties: { title: '抄送人', members: [], userOptional: true },
  //       nodeId: 'Ob2',
  //       prevId: 'Nb2'
  //     }
  //   }
  // },
  formData: {
    showBtn: false,
    fields: [
      {
        __config__: {
          name: '多行文本',
          label: '多行文本',
          type: 'textarea',
          layout: 'colFormItem',
          icon: 'icon-basics-mtext-outlined',
          shouldPrint: true,
          required: true,
          formId: 1,
          defaultValue: null
        },
        __slot__: {},
        __pc__: { span: 24, tag: 'el-input', props: { type: 'textarea', rows: '2' } },
        __mobile__: {
          renderType: 'textarea',
          tag: 'van-field',
          props: { autosize: true, type: 'textarea' }
        },
        placeholder: '请输入',
        maxlength: 200,
        __vModel__: 'field1'
      },
      {
        __config__: {
          name: '数字',
          label: '数字',
          type: 'number',
          layout: 'colFormItem',
          icon: 'icon-basics-digit-outlined',
          shouldPrint: true,
          required: true,
          formId: 5,
          defaultValue: null
        },
        __slot__: {},
        __pc__: {
          span: 24,
          tag: 'el-input-number',
          style: { width: '100%' },
          props: { 'controls-position': 'right' }
        },
        __mobile__: { renderType: 'input', tag: 'van-field', props: { type: 'number' } },
        placeholder: '请输入',
        __vModel__: 'field5'
      },
      {
        __config__: {
          name: '单行文本',
          label: '单行文本',
          type: 'input',
          layout: 'colFormItem',
          icon: 'icon-basics-textfield-outlined',
          shouldPrint: true,
          required: true,
          formId: 7,
          defaultValue: null
        },
        __slot__: {},
        __pc__: { span: 24, tag: 'el-input', props: {} },
        __mobile__: { tag: 'van-field', renderType: 'input', props: {} },
        placeholder: '请输入',
        maxlength: 20,
        __vModel__: 'field7'
      },
      {
        __config__: {
          name: '说明',
          type: 'desc',
          layout: 'colFormItem',
          icon: 'icon-basics-explain-outlined',
          shouldPrint: true,
          formId: 6,
          renderKey: 1594885546293
        },
        __slot__: {},
        __pc__: { span: 24, tag: 'div', props: {} },
        __mobile__: { renderType: 'desc', tag: 'tips', props: {} },
        placeholder: '请输入说明文字'
      },
      {
        __config__: {
          name: '日期',
          label: '日期',
          type: 'date',
          icon: 'icon-basics-date-outlined',
          defaultValue: null,
          span: 24,
          layout: 'colFormItem',
          shouldPrint: true,
          required: true,
          formId: 13
        },
        __slot__: {},
        __pc__: {
          span: 24,
          tag: 'el-date-picker',
          props: { type: 'date', format: 'yyyy-MM-dd', 'value-format': 'yyyy-MM-dd' },
          style: { width: '100%' }
        },
        __mobile__: {
          renderType: 'select',
          tag: 'van-field-datetime-picker',
          props: { pickerType: 'date', props: {} }
        },
        placeholder: '请选择',
        __vModel__: 'field13'
      },
      {
        __config__: {
          name: '日期区间',
          label: '日期区间',
          type: 'daterange',
          icon: 'icon-basics-daterange-outlined',
          layout: 'colFormItem',
          defaultValue: [],
          shouldPrint: true,
          required: true,
          formId: 14,
          renderKey: 1595658299794,
          error: false,
          errorMsg: null
        },
        __slot__: {},
        __pc__: {
          span: 24,
          tag: 'el-date-picker',
          props: {
            type: 'daterange',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            format: 'yyyy-MM-dd',
            'value-format': 'yyyy-MM-dd'
          },
          style: { width: '100%' }
        },
        __mobile__: {
          renderType: 'daterange',
          noLabel: true,
          tag: 'date-range-picker',
          props: {
            pickerType: 'date',
            startLabel: '开始时间',
            endLabel: '结束时间',
            placeholder: '请选择',
            autoCalc: true
          }
        },
        __vModel__: 'field14'
      }
    ]
  },
  advancedSetting: { approverDistinct: 1, isOpinion: true, tip: '这里是填写提示' }
}

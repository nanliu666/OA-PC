const flowGroupOptions = [
  {
    label: '假勤管理',
    value: 1
  },
  {
    label: '人事管理',
    value: 2
  },
  {
    label: '财务管理',
    value: 3
  },
  {
    label: '业务管理',
    value: 4
  },
  {
    label: '行政管理',
    value: 5
  },
  {
    label: '法务管理',
    value: 6
  },
  {
    label: '其他',
    value: 7
  }
]
const validate = (rule, value, callback) => {
  callback()
}
export let info = [
  {
    span: 24,
    prop: 'flowImg',
    itemType: 'slot',
    label: '审批图标',
    clearable: true,
    options: flowGroupOptions,
    props: {
      label: 'label',
      value: 'value'
    },
    required: true
  },
  {
    span: 24,
    prop: 'flowName',
    itemType: 'input',
    label: '审批名称',
    required: true
  },
  {
    span: 24,
    prop: 'flowGroup',
    itemType: 'select',
    label: '分组',
    clearable: true,
    options: flowGroupOptions,
    props: {
      label: 'label',
      value: 'value'
    },
    required: true
  },
  {
    span: 24,
    prop: 'initiator',
    itemType: 'slot',
    label: '谁可以发起审批',
    rules: [
      { required: true, validator: validate, trigger: 'change' },
      {
        required: true,
        message: '请选择谁可以发起审批',
        trigger: 'blur'
      }
    ]
  },
  {
    span: 24,
    prop: 'admin',
    itemType: 'slot',
    label: '谁可以管理这个审批',
    rules: [
      { required: true, validator: validate, trigger: 'change' },
      {
        required: true,
        message: '请选择谁可以管理这个审批',
        trigger: 'blur'
      }
    ]
  },
  {
    span: 24,
    prop: 'flowRemark',
    itemType: 'input',
    type: 'textarea',
    label: '审批描述',
    clearable: true,
    maxlength: 200,
    showWordLimit: true,
    autosize: {
      minRows: 6,
      maxRows: 10
    }
  }
]

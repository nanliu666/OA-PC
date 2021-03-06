const validate = (rule, value, callback) => {
  callback()
}
export let info = [
  {
    span: 24,
    prop: 'approverDistinct',
    itemType: 'slot',
    label: '审批人去重'
  },
  {
    span: 24,
    prop: 'approverNull',
    label: '审批人为空时',
    itemType: 'slot',
    props: {
      label: 'label',
      value: 'value'
    },
    rules: [
      { required: true, validator: validate, trigger: 'change' },
      {
        required: true,
        message: '请选择审批人为空时',
        trigger: 'blur'
      }
    ]
    // required: true
  },
  {
    span: 24,
    prop: 'isOpinion',
    label: '审批意见',
    itemType: 'slot',
    props: {
      label: 'label',
      value: 'value'
    }
  },

  {
    span: 24,
    prop: 'tip',
    itemType: 'input',
    type: 'textarea',
    label: '审批意见填写提示',
    clearable: true,
    maxlength: 200,
    showWordLimit: true,
    autosize: {
      minRows: 6,
      maxRows: 10
    }
  }
]

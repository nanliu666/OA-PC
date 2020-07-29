// const validate = (rule, value, callback) => {
//   callback()
// }
export let info = [
  // {
  //   span: 24,
  //   prop: 'icon',
  //   itemType: 'slot',
  //   label: '审批图标',
  //   clearable: true,
  //   options: [],
  //   props: {
  //     label: 'label',
  //     value: 'value'
  //   },
  //   required: true
  // },
  {
    span: 24,
    prop: 'processName',
    itemType: 'input',
    maxlength: 20,
    label: '审批名称',
    required: true
  },
  {
    span: 24,
    prop: 'categoryId',
    itemType: 'select',
    label: '分组',
    clearable: true,
    options: [],
    props: {
      label: 'name',
      value: 'id'
    },
    required: true
  },
  {
    span: 24,
    prop: 'initiator',
    itemType: 'slot',
    label: '谁可以发起审批'
    // rules: [
    //   { required: true, validator: validate, trigger: 'change' },
    //   {
    //     required: true,
    //     message: '请选择谁可以发起审批',
    //     trigger: 'blur'
    //   }
    // ]
  },
  {
    span: 24,
    prop: 'processAdmin',
    itemType: 'select',
    label: '谁可以管理这个审批',
    options: [],
    props: {
      label: 'userName',
      value: 'userId'
    },
    rules: [
      {
        required: true,
        message: '请选择谁可以管理这个审批',
        trigger: 'blur'
      }
    ]
  },
  {
    span: 24,
    prop: 'remark',
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

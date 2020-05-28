let status = [
  {
    label: '试用期',
    value: 'Try'
  },
  {
    label: '正式',
    value: 'Formal'
  },
  {
    label: '待离职',
    value: 'WaitLeave'
  }
]
export let searchConfig = {
  requireOptions: [
    {
      type: 'input',
      field: 'search',
      label: '',
      data: '',
      options: [],
      config: { placeholder: '姓名/工号', 'suffix-icon': 'el-icon-search' }
    }
  ],
  popoverOptions: [
    {
      type: 'input',
      field: 'phonenum',
      label: '手机号码',
      data: '',
      options: [],
      config: { optionLabel: 'jobName', placeholder: '请输入手机号码' }
    },
    {
      type: 'treeSelect',
      field: 'orgs',
      label: '部门',
      data: [],
      config: {
        selectParams: {
          placeholder: '请选择部门',
          multiple: false
        },
        treeParams: {
          data: [],
          'check-strictly': true,
          'default-expand-all': false,
          'expand-on-click-node': false,
          clickParent: true,
          filterable: false,
          props: {
            children: 'children',
            label: 'orgName',
            disabled: 'disabled',
            value: 'orgId'
          }
        }
      }
    },
    {
      type: 'select',
      field: 'jobs',
      label: '职位',
      data: [],
      options: [],
      config: { multiple: true, optionLabel: 'jobName', optionValue: 'jobId' }
    },
    {
      type: 'select',
      field: 'workProperties',
      label: '工作性质',
      data: [],
      options: [],
      config: { multiple: true, optionLabel: 'dictValue', optionValue: 'id' }
    },
    {
      type: 'select',
      field: 'statuses',
      label: '员工状态',
      data: '',
      options: status,
      config: { multiple: true, optionLabel: 'label', optionValue: 'value' }
    },
    {
      type: 'dataPicker',
      field: 'beginEntryDate,endEntryDate',
      label: '入职日期',
      data: '',
      options: [],
      config: { type: 'daterange' }
    },
    {
      type: 'input',
      field: 'contractCode',
      label: '合同编号',
      data: '',
      options: [],
      config: { optionLabel: 'jobName', placeholder: '请输入合同编号' }
    },
    {
      type: 'select',
      field: 'contracTypes',
      label: '合同类型',
      data: '',
      options: [],
      config: { multiple: true, optionLabel: 'dictValue', optionValue: 'id' }
    },
    // contractStatus

    {
      type: 'dataPicker',
      field: 'beginBeginDate,endBeginDate',
      label: '合同开始日期',
      data: '',
      options: [],
      config: { type: 'daterange' }
    },
    {
      type: 'dataPicker',
      field: 'beginEndDate,endEndDate',
      label: '合同结束日期',
      data: '',
      options: [],
      config: { type: 'daterange' }
    },
    {
      type: 'input',
      field: 'signNum',
      label: '合同签订次数',
      data: '',
      options: [],
      config: { optionLabel: 'jobName', placeholder: '请输入合同签订次数' }
    }
  ]
}
let contractStatus = [
  {
    label: '已到期',
    value: 'Expired'
  },
  {
    label: '未签订',
    value: 'UnSign'
  }
]
export let searchConfigTodo = {
  requireOptions: [
    {
      type: 'input',
      field: 'search',
      label: '',
      data: '',
      options: [],
      config: { placeholder: '姓名/工号', 'suffix-icon': 'el-icon-search' }
    }
  ],
  popoverOptions: [
    {
      type: 'input',
      field: 'phonenum',
      label: '手机号码',
      data: '',
      options: [],
      config: { optionLabel: 'jobName', placeholder: '请输入手机号码' }
    },
    {
      type: 'treeSelect',
      field: 'orgs',
      label: '部门',
      data: [],
      config: {
        selectParams: {
          placeholder: '请选择部门',
          multiple: false
        },
        treeParams: {
          data: [],
          'check-strictly': true,
          'default-expand-all': false,
          'expand-on-click-node': false,
          clickParent: true,
          filterable: false,
          props: {
            children: 'children',
            label: 'orgName',
            disabled: 'disabled',
            value: 'orgId'
          }
        }
      }
    },
    {
      type: 'select',
      field: 'jobs',
      label: '职位',
      data: [],
      options: [],
      config: { multiple: true, optionLabel: 'jobName', optionValue: 'jobId' }
    },
    {
      type: 'select',
      field: 'workProperties',
      label: '工作性质',
      data: [],
      options: [],
      config: { multiple: true, optionLabel: 'dictValue', optionValue: 'id' }
    },
    {
      type: 'select',
      field: 'statuses',
      label: '员工状态',
      data: '',
      options: status,
      config: { multiple: true, optionLabel: 'label', optionValue: 'value' }
    },
    {
      type: 'dataPicker',
      field: 'beginEntryDate,endEntryDate',
      label: '入职日期',
      data: '',
      options: [],
      config: { type: 'daterange' }
    },
    {
      type: 'select',
      field: 'contractStatuses',
      label: '合同状态',
      data: '',
      options: contractStatus,
      config: { multiple: true, optionLabel: 'label', optionValue: 'value' }
    }
  ]
}
let contractStatuss = [
  {
    label: '未执行',
    value: 'UnExecute'
  },
  {
    label: '执行中',
    value: 'InExecute'
  },
  {
    label: '已到期',
    value: 'Expired'
  },
  {
    label: '未签订',
    value: 'UnSign'
  },
  {
    label: '已解除',
    value: 'Relieve'
  }
]
export let searchConfigRecord = {
  requireOptions: [
    {
      type: 'input',
      field: 'search',
      label: '',
      data: '',
      options: [],
      config: { placeholder: '姓名/工号', 'suffix-icon': 'el-icon-search' }
    }
  ],
  popoverOptions: [
    {
      type: 'input',
      field: 'phonenum',
      label: '手机号码',
      data: '',
      options: [],
      config: { optionLabel: 'jobName', placeholder: '请输入手机号码' }
    },
    {
      type: 'treeSelect',
      field: 'orgs',
      label: '部门',
      data: [],
      config: {
        selectParams: {
          placeholder: '请选择部门',
          multiple: false
        },
        treeParams: {
          data: [],
          'check-strictly': true,
          'default-expand-all': false,
          'expand-on-click-node': false,
          clickParent: true,
          filterable: false,
          props: {
            children: 'children',
            label: 'orgName',
            disabled: 'disabled',
            value: 'orgId'
          }
        }
      }
    },
    {
      type: 'select',
      field: 'jobs',
      label: '职位',
      data: [],
      options: [],
      config: { multiple: true, optionLabel: 'jobName', optionValue: 'jobId' }
    },
    {
      type: 'select',
      field: 'workProperties',
      label: '工作性质',
      data: [],
      options: [],
      config: { multiple: true, optionLabel: 'dictValue', optionValue: 'id' }
    },
    {
      type: 'select',
      field: 'statuses',
      label: '员工状态',
      data: '',
      options: status,
      config: { multiple: true, optionLabel: 'label', optionValue: 'value' }
    },
    {
      type: 'dataPicker',
      field: 'beginEntryDate,endEntryDate',
      label: '入职日期',
      data: '',
      options: [],
      config: { type: 'daterange' }
    },
    {
      type: 'input',
      field: 'contractCode',
      label: '合同编号',
      data: '',
      options: [],
      config: { optionLabel: 'jobName', placeholder: '请输入合同编号' }
    },
    {
      type: 'select',
      field: 'contracTypes',
      label: '合同类型',
      data: '',
      options: [],
      config: { multiple: true, optionLabel: 'dictValue', optionValue: 'id' }
    },
    {
      type: 'select',
      field: 'contractStatuses',
      label: '合同状态',
      data: '',
      options: contractStatuss,
      config: { multiple: true, optionLabel: 'label', optionValue: 'value' }
    },
    {
      type: 'dataPicker',
      field: 'beginBeginDate,endBeginDate',
      label: '合同开始日期',
      data: '',
      options: [],
      config: { type: 'daterange' }
    },
    {
      type: 'dataPicker',
      field: 'beginEndDate,endEndDate',
      label: '合同结束日期',
      data: '',
      options: [],
      config: { type: 'daterange' }
    }
  ]
}

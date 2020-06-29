import { isMobile } from '@/util/validate'
import { provinceAndCityData } from 'element-china-area-data'

let sixList = [
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 0
  }
]
let marriageList = [
  {
    label: '已婚',
    value: 1
  },
  {
    label: '未婚',
    value: 0
  }
]
// isEmail
// const validateEmail = (rule, value, callback) => {
//   if (!isEmail(value)) {
//     callback(new Error('邮箱不正确'))
//   } else {
//     callback()
//   }
// }
const validatePhone = (rule, value, callback) => {
  if (!isMobile(value)) {
    callback(new Error('手机号码格式不正确'))
  } else {
    callback()
  }
}

export let infoForm = [
  {
    span: 10,
    prop: 'name',
    itemType: 'input',
    label: '姓名',
    required: true
  },
  {
    span: 10,
    offset: 2,
    prop: 'sex',
    itemType: 'radio',
    filterable: true,
    label: '性别',
    options: sixList,
    props: {
      label: 'label',
      value: 'value'
    },
    required: true
  },
  {
    span: 10,
    prop: 'phonenum',
    itemType: 'input',
    label: '手机号码',
    maxlength: 11,
    props: {
      onlyNumber: true
    },
    rules: [
      { required: true, validator: validatePhone, trigger: 'blur' },
      { required: true, message: '请输入手机号码', trigger: 'blur' }
    ],
    required: true
  },
  {
    span: 10,
    offset: 2,
    prop: 'email',
    itemType: 'input',
    label: '邮箱',
    props: {},
    rules: [
      // {required: true, validator: validateEmail, trigger: 'blur'},
      { required: true, message: '请输入邮箱', trigger: 'blur' }
    ],

    required: true
  },
  {
    span: 10,
    prop: 'idType',
    options: [],
    itemType: 'select',
    label: '证件类型',
    props: {
      label: 'dictValue',
      value: 'dictKey'
    },
    required: true
  },
  {
    span: 10,
    offset: 2,
    prop: 'idNo',
    itemType: 'input',
    label: '证件号码',
    maxlength: 18,
    rules: [
      { required: true, validator: '', trigger: 'blur' },
      { required: true, message: '请输入证件号码', trigger: 'blur' }
    ],
    required: true
  },
  {
    span: 10,
    prop: 'birthDate',
    itemType: 'datePicker',
    label: '出生日期',
    required: true
  },
  {
    span: 10,
    offset: 2,
    prop: 'educationalLevel',
    options: [],
    itemType: 'select',
    label: '最高学历',
    props: {
      label: 'dictValue',
      value: 'dictKey'
    },
    required: true
  },
  {
    span: 10,
    prop: 'firstWorkDate',
    itemType: 'datePicker',
    label: '首次参加工作时间'
  },
  {
    span: 10,
    offset: 2,
    prop: 'marriage',
    itemType: 'radio',
    label: '婚姻状况',
    options: marriageList
  },
  {
    span: 10,
    prop: 'health',
    itemType: 'input',
    label: '健康状况'
  },
  {
    span: 10,
    offset: 2,
    prop: 'nation',
    options: [],
    itemType: 'select',
    label: '民族',
    props: {
      label: 'dictValue',
      value: 'dictKey'
    }
  },
  {
    span: 10,
    prop: 'politicalStatus',
    options: [],
    itemType: 'select',
    label: '政治面貌',
    props: {
      label: 'dictValue',
      value: 'dictKey'
    }
  },
  {
    span: 10,
    offset: 2,
    prop: 'native',
    options: [],
    itemType: 'cascader',
    label: '籍贯',
    props: {
      label: 'label',
      value: 'value'
    }
  },
  {
    span: 10,
    prop: 'householdType',
    options: [],
    itemType: 'select',
    label: '户口类型',

    props: {
      label: 'dictValue',
      value: 'dictKey'
    }
  },
  {
    span: 10,
    offset: 2,
    prop: 'idAddress',
    itemType: 'input',
    label: '身份证地址',
    props: {}
  },
  {
    span: 10,
    prop: 'userAddress',
    itemType: 'input',
    label: '现住址',
    props: {}
  }
]
export let contacts = [
  {
    span: 10,
    prop: 'name',
    itemType: 'input',
    label: '紧急联系人姓名',
    props: {},
    required: true
  },
  {
    span: 10,
    offset: 2,
    itemType: 'select',
    prop: 'relationship',
    options: [],
    props: {
      label: 'dictValue',
      value: 'dictKey'
    },
    label: '紧急联系人关系'
  },
  {
    span: 10,
    prop: 'phone',
    itemType: 'input',
    label: '紧急联系人电话',
    maxlength: 11,
    props: {
      onlyNumber: true
    },
    required: true,
    rules: [
      { required: true, validator: validatePhone, trigger: 'blur' },
      { required: true, message: '请输入手机号码', trigger: 'blur' }
    ]
  }
]
export let family = [
  {
    span: 10,
    prop: 'relationship',
    itemType: 'select',
    options: [],
    props: {
      label: 'dictValue',
      value: 'dictKey'
    },
    label: '关系'
  },
  {
    span: 10,
    offset: 2,
    prop: 'name',
    itemType: 'input',
    label: '姓名',
    props: {},
    required: true
  },
  {
    span: 10,
    prop: 'age',
    itemType: 'input',
    label: '年龄',
    maxlength: 2,
    props: {
      onlyNumber: true
    }
  },
  {
    span: 10,
    offset: 2,
    prop: 'companyName',
    itemType: 'input',
    label: '工作单位',
    props: {}
  },
  {
    span: 10,
    prop: 'jobName',
    itemType: 'input',
    label: '职位'
  },
  {
    span: 10,
    offset: 2,
    prop: 'phone',
    itemType: 'input',
    label: '联系电话',
    maxlength: 2,
    props: {},
    required: true,
    rules: [
      { required: true, validator: validatePhone, trigger: 'blur' },
      { required: true, message: '请输入手机号码', trigger: 'blur' }
    ]
  }
]
export let education = [
  {
    span: 10,
    prop: 'educationTime',
    itemType: 'datePicker',
    type: 'daterange',
    label: '受教育时间',
    required: true,
    'unlink-panels': true
  },
  {
    span: 10,
    offset: 2,
    prop: 'schoolName',
    itemType: 'input',
    label: '学校名称',
    props: {}
  },
  {
    span: 10,
    prop: 'majorName',
    itemType: 'input',
    label: '专业',
    props: {}
  },
  {
    span: 10,
    offset: 2,
    prop: 'educationalLevel',
    itemType: 'select',
    label: '学历',
    options: [],
    props: {
      label: 'dictValue',
      value: 'dictKey'
    },
    required: true
  },
  {
    span: 10,
    prop: 'educationalType',
    itemType: 'select',
    label: '教育类型',
    options: [],
    props: {
      label: 'dictValue',
      value: 'dictKey'
    }
  }
]
export let work = [
  {
    span: 10,
    prop: 'workTime',
    itemType: 'datePicker',
    type: 'daterange',
    label: '在职时间',
    required: true,
    'unlink-panels': true
  },
  {
    span: 10,
    offset: 2,
    prop: 'companyName',
    itemType: 'input',
    label: '单位名称',
    props: {},
    required: true
  },
  {
    span: 10,
    prop: 'jobName',
    itemType: 'input',
    label: '职位名称',
    props: {}
  },
  {
    span: 10,
    offset: 2,
    prop: 'salary',
    itemType: 'input',
    label: '薪资',
    props: {
      onlyNumber: true
    }
  },
  {
    span: 10,
    prop: 'witnessName',
    itemType: 'input',
    label: '证明人名称',
    props: {}
  },
  {
    span: 10,
    offset: 2,
    prop: 'witnessPhone',
    itemType: 'input',
    label: '证明人电话',
    maxlength: 11,
    props: {
      onlyNumber: true
    }
  },
  {
    span: 10,
    prop: 'isSecret',
    itemType: 'radio',
    label: '有无守密义务或竞业禁止义务',
    options: [
      {
        label: '有',
        value: 1
      },
      {
        label: '无',
        value: 0
      }
    ],
    props: {
      label: 'label',
      value: 'value'
    },
    required: true
  }
]
export let train = [
  {
    span: 10,
    prop: 'time',
    type: 'daterange',
    itemType: 'datePicker',
    label: '培训日期',
    required: true,
    'unlink-panels': true
  },
  {
    span: 10,
    offset: 2,
    prop: 'name',
    itemType: 'input',
    label: '培训课程',
    required: true
  },
  {
    span: 10,
    prop: 'companyName',
    itemType: 'input',
    label: '培训机构'
  }
]
export let certificate = [
  {
    span: 10,
    prop: 'name',
    itemType: 'input',
    label: '证书名称',
    required: true
  },
  {
    span: 10,
    offset: 2,
    prop: 'code',
    itemType: 'input',
    label: '证书编号'
  },
  {
    span: 10,
    prop: 'companyName',
    itemType: 'input',
    label: '发证机构'
  },
  {
    span: 10,
    offset: 2,
    prop: 'issueDate',
    itemType: 'datePicker',
    label: '发证日期'
  }
]
export let personInfo = [
  {
    span: 10,
    prop: 'name',
    itemType: 'input',
    label: '姓名',
    disabled: true,
    required: true
  },
  {
    span: 10,
    offset: 2,
    prop: 'sex',
    itemType: 'radio',
    filterable: true,
    disabled: true,
    label: '性别',
    options: sixList,
    props: {
      label: 'label',
      value: 'value'
    },
    required: true
  },
  {
    span: 10,
    prop: 'phonenum',
    itemType: 'input',
    label: '手机号码',
    disabled: true,
    maxlength: 11,
    props: {
      onlyNumber: true
    },
    rules: [
      // {required: true, validator: validatePhone, trigger: 'blur'},
      { required: true, message: '请输入手机号码', trigger: 'blur' }
    ]
  },
  {
    span: 10,
    offset: 2,
    prop: 'email',
    itemType: 'input',
    disabled: true,
    label: '邮箱',
    props: {},
    rules: [
      // {required: true, validator: validateEmail, trigger: 'blur'},
      { required: true, message: '请输入邮箱', trigger: 'blur' }
    ],

    required: true
  }
]
let probation = [
  {
    value: 0,
    label: '无试用期'
  },
  {
    value: 1,
    label: '1个月'
  },
  {
    value: 2,
    label: '2个月'
  },
  {
    value: 3,
    label: '3个月'
  },
  {
    value: 4,
    label: '4个月'
  },
  {
    value: 5,
    label: '5个月'
  },
  {
    value: 6,
    label: '6个月'
  }
]
export let employment = [
  {
    span: 10,
    prop: 'entryDate',
    itemType: 'datePicker',
    label: '预计入职日期',
    required: true,
    rules: [
      {
        required: true,
        message: '请选择预计入职日期',
        trigger: 'change'
      }
    ]
  },
  {
    span: 10,
    offset: 2,
    clearable: true,
    prop: 'probation',
    options: probation,
    itemType: 'select',
    label: '试用期',
    props: {
      label: 'label',
      value: 'value'
    },
    required: true
  },
  {
    span: 10,
    prop: 'companyId',
    options: [],
    itemType: 'select',
    label: '入职公司',
    disabled: true,
    props: {
      label: 'orgName',
      value: 'orgId'
    },
    required: true
  },
  {
    disabled: true,
    span: 10,
    prop: 'orgId',
    itemType: 'treeSelect',
    label: '部门',
    offset: 2,
    props: {
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
    span: 10,
    prop: 'jobId',
    options: [],
    itemType: 'select',
    label: '职位',
    disabled: true,
    props: {
      label: 'jobName',
      value: 'jobId'
    },
    required: true
  },
  {
    span: 10,
    offset: 2,
    prop: 'positionId',
    options: [],
    itemType: 'select',
    label: '岗位',
    props: {
      label: 'name',
      value: 'id'
    }
  },
  {
    span: 10,
    prop: 'workProperty',
    options: [],
    itemType: 'select',
    label: '工作性质',
    props: {
      label: 'dictValue',
      value: 'dictKey'
    },
    required: true
  },
  {
    span: 10,
    offset: 2,
    prop: 'workAddressId',
    options: [],
    itemType: 'select',
    label: '工作地址',
    props: {
      label: 'address',
      value: 'id'
    }
  },
  {
    span: 10,
    prop: 'city',
    options: provinceAndCityData,
    itemType: 'cascader',
    label: '工作城市',
    props: {
      label: 'label',
      value: 'value'
    }
  }
]
export let salary = [
  {
    span: 10,
    prop: 'probationSalary',
    itemType: 'input',
    label: '试用期月薪',
    props: {
      onlyNumber: true
    },
    rules: [
      {
        required: true,
        message: '请输入试用期月薪',
        trigger: 'change'
      }
    ],
    required: true
  },
  {
    span: 10,
    offset: 2,
    prop: 'formalSalary',
    itemType: 'input',
    label: '转正月薪',
    props: {
      onlyNumber: true
    },
    rules: [
      {
        required: true,
        message: '请输入转正月薪',
        trigger: 'change'
      }
    ],
    required: true
  }
]
let years = [
  {
    value: 1,
    label: '1年'
  },
  {
    value: 2,
    label: '2年'
  },
  {
    value: 3,
    label: '3年'
  },
  {
    value: 4,
    label: '4年'
  },
  {
    value: 5,
    label: '5年'
  },
  {
    value: 6,
    label: '6年'
  },
  {
    value: 7,
    label: '7年'
  },
  {
    value: 8,
    label: '8年'
  },
  {
    value: 9,
    label: '9年'
  },
  {
    value: 10,
    label: '10年'
  },
  {
    value: 11,
    label: '11年'
  },
  {
    value: 12,
    label: '12年'
  }
]
export let labour = [
  {
    span: 10,
    prop: 'companyId',
    options: [],
    itemType: 'select',
    label: '合同公司',
    disabled: true,
    required: true,
    props: {
      label: 'orgName',
      value: 'orgId'
    }
  },
  {
    span: 10,
    offset: 2,
    prop: 'contractType',
    options: [],
    itemType: 'select',
    label: '合同类型',
    required: true,
    props: {
      label: 'dictValue',
      value: 'dictKey'
    }
  },
  {
    span: 10,
    prop: 'contractPeriod',
    options: years,
    itemType: 'select',
    label: '合同期限',
    props: {
      label: 'label',
      value: 'value'
    }
  },
  {
    span: 10,
    offset: 2,
    prop: 'contractBeginDate',
    itemType: 'datePicker',
    label: '合同开始日期',
    rules: [
      {
        required: true,
        message: '请选择合同开始日期',
        trigger: 'change'
      }
    ],
    required: true
  },
  {
    span: 10,
    prop: 'contractEndDate',
    itemType: 'datePicker',
    label: '合同结束日期',
    rules: [
      {
        required: true,
        message: '请选择合同结束日期',
        trigger: 'change'
      }
    ],
    required: true
  }
]

let isRisks = [
  {
    label: '是',
    value: 1
  },
  {
    label: '否',
    value: 0
  }
]

let orther = [
  { label: '养老保险', value: 'isYangl' },
  { label: '医疗保险', value: 'isYil' },
  { label: '失业保险', value: 'isGs' },
  { label: '工伤保险', value: 'isShiy' },
  { label: '生育保险', value: 'isShengy' },
  { label: '住房公积金', value: 'isGjj' }
]
export let fiveRisks = [
  {
    span: 10,
    prop: 'isShbx',
    itemType: 'radio',
    filterable: true,
    label: '是否缴纳社会保险',
    options: isRisks,
    props: {
      label: 'label',
      value: 'value'
    }
  },
  {
    span: 10,
    offset: 2,
    prop: 'baseMoney',
    itemType: 'input',
    label: '社会保险基数',
    props: {
      onlyNumber: true
    }
  },
  {
    span: 24,
    prop: 'risks',
    itemType: 'checkbox',
    options: orther,
    label: '其他',
    props: {
      label: 'label',
      value: 'value'
    }
  }
]
let OfficeSpace = [
  {
    label: '无安排',
    value: '无安排'
  },
  {
    label: '办公室内',
    value: '办公室内'
  },
  {
    label: '办公大厅',
    value: '办公大厅'
  }
]

let phoneConfig = [
  {
    label: '无配备',
    value: '无配备'
  },
  {
    label: '直线',
    value: '直线'
  },
  {
    label: '分机带长途',
    value: '分机带长途'
  },
  {
    label: '分机不带长途',
    value: '分机不带长途'
  }
]
export let office = [
  {
    span: 10,
    prop: 'officeSpace',
    options: OfficeSpace,
    itemType: 'select',
    label: '办公位安排',
    props: {
      label: 'label',
      value: 'value'
    }
  },
  {
    span: 10,
    offset: 2,
    prop: 'telphone',
    itemType: 'select',
    options: phoneConfig,
    label: '电话配备',
    props: {
      label: 'label',
      value: 'value'
    }
  },
  {
    span: 10,
    prop: 'isComputer',
    itemType: 'radio',
    filterable: true,
    label: '是否电脑配置',
    options: isRisks,
    props: {
      label: 'label',
      value: 'value'
    }
  },
  {
    span: 10,
    offset: 2,
    prop: 'other',
    itemType: 'input',
    label: '其他',
    props: {}
  }
]
export let other = [
  {
    span: 10,
    prop: 'isHouse',
    itemType: 'radio',
    filterable: true,
    label: '是否安排住房',
    options: isRisks,
    props: {
      label: 'label',
      value: 'value'
    }
  },
  {
    span: 10,
    offset: 2,
    prop: 'houseStandard',
    itemType: 'input',
    label: '住房标准',
    props: {}
  },
  {
    span: 10,
    prop: 'remark',
    itemType: 'input',
    type: 'textarea',
    label: '备注',
    props: {}
  }
]

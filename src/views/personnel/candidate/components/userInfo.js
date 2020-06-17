import { isMobile, isEmail } from '@/util/validate'

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
const validateEmail = (rule, value, callback) => {
  if (!isEmail(value)) {
    callback(new Error('邮箱不正确'))
  } else {
    callback()
  }
}
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
      { required: true, validator: validateEmail, trigger: 'blur' },
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
    props: {}
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
    }
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
    props: {}
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
    label: '职位',
    props: {
      onlyNumber: true
    }
  },
  {
    span: 10,
    offset: 2,
    prop: 'phone',
    itemType: 'input',
    label: '联系电话',
    maxlength: 2,
    props: {}
  }
]
export let education = [
  {
    span: 10,
    prop: 'educationTime',
    itemType: 'datePicker',
    type: 'daterange',
    label: '受教育时间'
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
    }
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
    label: '在职时间'
  },
  {
    span: 10,
    offset: 2,
    prop: 'companyName',
    itemType: 'input',
    label: '单位名称',
    props: {}
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
  }
]
export let train = [
  {
    span: 10,
    prop: 'time',
    type: 'daterange',
    itemType: 'datePicker',
    label: '培训日期'
  },
  {
    span: 10,
    offset: 2,
    prop: 'name',
    itemType: 'input',
    label: '培训课程'
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
    label: '证书名称'
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

export let personInfo = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '姓名：', // lable
      disabled: true,
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'userName'
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '性别：', // lable
      disabled: true,
      value: sixList,
      dataType: 1, // 当inType=1时生效
      inType: 7, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'sex'
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '手机号：', // lable
      disabled: true,
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'phonenum'
    },
    {
      attrId: '4', // ：key唯一值
      attrName: '邮箱：', // lable
      disabled: true,
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'email'
    }
  ]
}
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
export let employment = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '预计入职日期：', // lable
      value: '', // 单选框多选框的potion的值
      inType: 4, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择预计入职日期', // 提示必填提示
      props: 'entryDate',
      rules: [
        {
          required: true,
          message: '请选择预计入职日期',
          trigger: 'change'
        }
      ]
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '试用期：', // lable
      value: probation, // 单选框多选框的potion的值
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择试用期', // 提示必填提示
      props: 'probation',
      rules: [
        {
          required: true,
          message: '请选择试用期',
          trigger: 'change'
        }
      ]
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '入职公司：', // lable
      disabled: true,
      value: '',
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择入职公司', // 提示必填提示
      props: 'companyId',
      rules: [
        {
          required: true,
          message: '请选择入职公司',
          trigger: 'change'
        }
      ]
    },
    {
      attrId: '4', // ：key唯一值
      attrName: '部门：', // lable
      value: [], // 单选框多选框的potion的值
      inType: 11, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择部门', // 提示必填提示
      disabled: true,
      props: 'orgId',
      rules: [
        {
          required: true,
          message: '请选择部门',
          trigger: 'blur'
        }
      ]
    },
    {
      attrId: '5', // ：key唯一值
      attrName: '职位：', // lable
      disabled: true,
      value: '',
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '职位', // 提示必填提示
      props: 'jobId',
      rules: [
        {
          required: true,
          message: '请选择职位',
          trigger: 'change'
        }
      ]
    },
    {
      attrId: '6', // ：key唯一值
      attrName: '岗位：', // lable
      value: '', // 单选框多选框的potion的值
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '岗位', // 提示必填提示
      props: 'positionId'
    },
    {
      attrId: '7', // ：key唯一值
      attrName: '工作性质：', // lable
      value: '', // 单选框多选框的potion的值
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '工作性质', // 提示必填提示
      props: 'workProperty',
      rules: [
        {
          required: true,
          message: '请选择工作性质',
          trigger: 'change'
        }
      ]
    },
    {
      attrId: '8', // ：key唯一值
      attrName: '工作地址：', // lable
      value: '', // 单选框多选框的potion的值
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '工作地址', // 提示必填提示
      props: 'workAddressId'
    },
    {
      attrId: '9', // ：key唯一值
      attrName: '工作城市：', // lable
      value: '', // 单选框多选框的potion的值
      inType: 8, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '工作城市', // 提示必填提示
      props: 'city'
    }
  ]
}
export let salary = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '试用期月薪：', // lable
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '试用期月薪', // 提示必填提示
      props: 'probationSalary',
      rules: [
        {
          required: true,
          message: '请输入试用期月薪',
          trigger: 'change'
        }
      ]
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '转正月薪：', // lable
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '转正月薪', // 提示必填提示
      props: 'formalSalary',
      rules: [
        {
          required: true,
          message: '请输入转正月薪',
          trigger: 'change'
        }
      ]
    }
  ]
}
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
export let labour = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '合同公司：', // lable
      disabled: true,
      value: '', // 单选框多选框的potion的值
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '合同公司', // 提示必填提示
      props: 'companyId',
      rules: [
        {
          required: true,
          message: '请输入合同公司',
          trigger: 'change'
        }
      ]
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '合同类型：', // lable
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '合同类型', // 提示必填提示
      props: 'contractType',
      rules: [
        {
          required: true,
          message: '请选择合同类型',
          trigger: 'change'
        }
      ]
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '合同期限：', // lable
      value: years, // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '合同期限', // 提示必填提示
      props: 'contractPeriod'
    },
    {
      attrId: '4', // ：key唯一值
      attrName: '合同开始日期：', // lable
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 4, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '合同开始日期', // 提示必填提示
      props: 'contractBeginDate',
      rules: [
        {
          required: true,
          message: '请输入合同开始日期',
          trigger: 'change'
        }
      ]
    },
    {
      attrId: '5', // ：key唯一值
      attrName: '合同结束日期：', // lable
      value: '', // 单选框多选框的potion的值
      inType: 4, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '合同结束日期', // 提示必填提示
      props: 'contractEndDate',
      rules: [
        {
          required: true,
          message: '请输入合同结束日期',
          trigger: 'change'
        }
      ]
    }
  ]
}
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
export let fiveRisks = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '是否缴纳社会保险：', // lable
      value: isRisks, // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 7, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '缴纳社会保险', // 提示必填提示
      props: 'isShbx'
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '社会保险基数：', // lable
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '社会保险基数', // 提示必填提示
      props: 'baseMoney'
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '其他：', // lable
      value: orther, // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 9, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '其他', // 提示必填提示
      props: 'risks',
      span: 24
    }
  ]
}
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
export let office = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '办公位安排：', // lable
      value: OfficeSpace, // 单选框多选框的potion的值
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '办公位安排', // 提示必填提示
      props: 'officeSpace'
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '电话配备：', // lable
      value: phoneConfig, // 单选框多选框的potion的值
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '电话配备', // 提示必填提示
      props: 'telphone'
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '是否电脑配置：', // lable
      value: isRisks, // 单选框多选框的potion的值
      inType: 7, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '是否电脑配置', // 提示必填提示
      props: 'isComputer',
      span: 12
    },
    {
      attrId: '4', // ：key唯一值
      attrName: '其他：', // lable
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '其他', // 提示必填提示
      props: 'other',
      span: 12
    }
  ]
}
export let other = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '是否安排住房：', // lable
      value: isRisks, // 单选框多选框的potion的值
      inType: 7, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '是否安排住房', // 提示必填提示
      props: 'isHouse',
      span: 12
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '住房标准：', // lable
      value: '', // 单选框多选框的potion的值
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '住房标准', // 提示必填提示
      props: 'houseStandard',
      span: 12
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '备注：', // lable
      inType: 10, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '备注', // 提示必填提示
      props: 'remark',
      span: 12
    }
  ]
}

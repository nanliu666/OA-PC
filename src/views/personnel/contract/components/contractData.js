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
export let signedData = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '合同编号：', // lable
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请输入合同编号', // 提示必填提示
      props: 'code',
      span: 12
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '合同公司：', // lable
      value: '', // 单选框多选框的potion的值
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择合同公司', // 提示必填提示
      props: 'name',
      span: 12,
      rules: [
        {
          required: true,
          message: '请选择合同公司',
          trigger: 'change'
        }
      ]
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '合同类型：', // lable
      value: '', // 单选框多选框的potion的值
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择合同类型', // 提示必填提示
      props: 'type',
      span: 12,
      rules: [
        {
          required: true,
          message: '请选择合同类型',
          trigger: 'change'
        }
      ]
    },
    {
      attrId: '4', // ：key唯一值
      attrName: '合同期限：', // lable
      value: years, // 单选框多选框的potion的值
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择合同期限', // 提示必填提示
      props: 'period',
      span: 12
    },
    {
      attrId: '5', // ：key唯一值
      attrName: '合同起止日期：', // lable
      inType: 4, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择合同起止日期', // 提示必填提示
      props: 'beginDate',
      span: 12,
      rules: [
        {
          required: true,
          message: '请选择合同起止日期',
          trigger: 'change'
        }
      ]
    },
    {
      attrId: '6', // ：key唯一值
      attrName: '合同结束日期：', // lable
      inType: 4, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择合同结束日期', // 提示必填提示
      props: 'endDate',
      span: 12,
      rules: [
        {
          required: true,
          message: '请选择合同起止日期',
          trigger: 'change'
        }
      ]
    },
    {
      attrId: '7', // ：key唯一值
      attrName: '合同签订日期：', // lable
      inType: 4, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择合同签订日期', // 提示必填提示
      props: 'signDate',
      span: 12,
      rules: [
        {
          required: true,
          message: '请选择合同起止日期',
          trigger: 'change'
        }
      ]
    },
    {
      attrId: '8', // ：key唯一值
      attrName: '备注：', // lable
      inType: 10, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '备注', // 提示必填提示
      props: 'remark',
      span: 24
    }
  ]
}

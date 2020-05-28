export let NewRequirement = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '申请公司:', // lable
      disabled: true,
      attrValue: 'companyId', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '', // 提示必填提示
      props: 'companyId'
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '用人部门:', // lable
      disabled: true,
      attrValue: 'orgId', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '', // 提示必填提示
      props: 'orgId'
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '招聘职位:', // lable
      attrValue: 'jobId', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'jobId'
    },
    {
      attrId: '4', // ：key唯一值
      attrName: '招聘岗位：', // lable
      attrValue: 'positionId', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'positionId'
    },
    {
      attrId: '5', // ：key唯一值
      attrName: '工作性质：', // lable
      attrValue: 'workProperty', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 3, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'workProperty'
    },
    {
      attrId: '6', // ：key唯一值
      attrName: '需求人数', // lable
      attrValue: 'needNum', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'needNum'
    },
    {
      attrId: '8', // ：key唯一值
      attrName: '到岗日期', // lable
      attrValue: 'joinDate', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 4, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'joinDate'
    },
    {
      attrId: '9', // ：key唯一值
      attrName: '紧急程度', // lable
      attrValue: 'emerType', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 3, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'emerType'
    },
    {
      attrId: '10', // ：key唯一值
      attrName: '薪酬范围', // lable
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 12, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '最小值', // 提示必填提示
      props: '',
      props2: ''
    },
    {
      attrId: '12', // ：key唯一值
      attrName: '工作年限', // lable
      attrValue: 'workYear', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '', // 提示必填提示
      props: 'workYear'
    },
    {
      attrId: '13', // ：key唯一值
      attrName: '学历要求', // lable
      attrValue: 'educationalLevel', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 3, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '', // 提示必填提示
      props: 'educationalLevel'
    }

    // ,{
    //   attrId: '13', // ：key唯一值
    //   attrName: '	职位要求', // lable
    //   attrValue: 'requirement', // v-model绑定值
    //   attrvalue: '', // 后台返回值
    //   minLen: '', // 最小长度
    //   maxLen: '200', // 最大长度
    //   value: '', // 单选框多选框的potion的值
    //   dataType: 1, // 当inType=1时生效
    //   inType: 10, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
    //   message: '最大值', // 提示必填提示
    //   props: 'requirement'
    // },
  ]
}

export let NewRequirement = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '申请公司:', // lable
      disabled: true,
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '', // 提示必填提示
      props: 'companyName'
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '用人部门:', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择部门', // 提示必填提示
      props: 'orgId'
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '招聘职位:', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择职位', // 提示必填提示
      props: 'jobId'
    },
    {
      attrId: '4', // ：key唯一值
      attrName: '招聘岗位：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择岗位', // 提示必填提示
      props: 'positionId'
    },
    {
      attrId: '5', // ：key唯一值
      attrName: '工作性质：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择工作性质', // 提示必填提示
      props: 'workProperty'
    },
    {
      attrId: '6', // ：key唯一值
      attrName: '需求人数', // lable
      attrValue: '', // v-model绑定值
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
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 4, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择发布时状态', // 提示必填提示
      props: 'joinDate'
    },
    {
      attrId: '9', // ：key唯一值
      attrName: '紧急程度', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'EmerType'
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
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择工作年限', // 提示必填提示
      props: 'workYear'
    },
    {
      attrId: '13', // ：key唯一值
      attrName: '学历要求', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请选择学历要求', // 提示必填提示
      props: 'EducationalLevel'
    },
    {
      attrId: '14', // ：key唯一值
      attrName: '职位要求:', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '200', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 10, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '', // 提示必填提示
      props: 'requirement',
      span: 24
    },
    {
      attrId: '15', // ：key唯一值
      attrName: '工作职责:', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '200', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 10, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '', // 提示必填提示
      props: 'duty',
      span: 24
    },
    {
      attrId: '16', // ：key唯一值
      attrName: '招聘原因:', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 7, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '', // 提示必填提示
      props: 'RecruitmentReason',
      span: 24
    },
    {
      attrId: '17', // ：key唯一值
      attrName: '申请理由:', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '200', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 10, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '', // 提示必填提示
      props: 'reason',
      span: 24
    }
  ]
}

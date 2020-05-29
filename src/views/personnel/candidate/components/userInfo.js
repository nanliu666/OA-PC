export let infoForm = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '姓名：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      status: false, // 是否设置规则
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'name',
      rules: [
        {
          required: true,
          message: '请输入职位类别名称',
          trigger: 'blur'
        }
      ]
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '性别：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      status: false, // 是否设置规则
      dataType: 1, // 当inType=1时生效
      inType: 7, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'six'
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '手机号码：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      status: true, // 是否设置规则
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'phone'
    },
    {
      attrId: '4', // ：key唯一值
      attrName: '邮箱：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      status: true, // 是否设置规则
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'email',
      rules: [
        {
          required: true,
          message: '请输入职位类别名称',
          trigger: 'blur'
        }
      ]
    },
    {
      attrId: '5', // ：key唯一值
      attrName: '出生日期：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 4, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'birth'
    },
    {
      attrId: '6', // ：key唯一值
      attrName: '年龄：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'age'
    },
    {
      attrId: '7', // ：key唯一值
      attrName: '最高学历：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'education'
    },
    {
      attrId: '8', // ：key唯一值
      attrName: '首次参加工作时间：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 4, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'fisrtWork'
    },
    {
      attrId: '9', // ：key唯一值
      attrName: '工龄：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: 'workAge', // 提示必填提示
      props: 'workAge'
    },
    {
      attrId: '10', // ：key唯一值
      attrName: '婚姻状况：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'marriage'
    },
    {
      attrId: '11', // ：key唯一值
      attrName: '健康状况：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'healthy'
    },
    {
      attrId: '12', // ：key唯一值
      attrName: '民族：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'nation'
    },
    {
      attrId: '13', // ：key唯一值
      attrName: '政治面貌：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'Politics'
    },
    {
      attrId: '14', // ：key唯一值
      attrName: '籍贯：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 8, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'nativePlace'
    },
    {
      attrId: '15', // ：key唯一值
      attrName: '户籍类型：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'householdRegister'
    },
    {
      attrId: '16', // ：key唯一值
      attrName: '身份证地址：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'IDaddress'
    },
    {
      attrId: '17', // ：key唯一值
      attrName: '现住址：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'newAddress'
    }
  ]
}
export let contacts = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '紧急联系人姓名：', // lable
      value: '', // 单选框多选框的potion的值
      status: true, // 是否设置规则
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'name',
      rules: [
        {
          required: true,
          message: '请输入职位类别名称',
          trigger: 'blur'
        }
      ]
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '紧急联系人关系：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      status: false, // 是否设置规则
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'contacts',
      rules: [
        {
          required: true,
          message: '请输入职位类别名称',
          trigger: 'blur'
        }
      ]
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '紧急联系人电话：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'telephone',
      rules: [
        {
          required: true,
          message: '请输入职位类别名称',
          trigger: 'blur'
        }
      ]
    }
  ]
}
export let education = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '受教育时间：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'time'
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '学历：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'education'
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '教育类型：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'type'
    },
    {
      attrId: '4', // ：key唯一值
      attrName: '学校名称：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'name'
    },
    {
      attrId: '5', // ：key唯一值
      attrName: '学校名称：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'name'
    }
  ]
}
export let family = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '姓名：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'name'
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '关系：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'relationship'
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '年龄：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'age'
    },
    {
      attrId: '4', // ：key唯一值
      attrName: '工作单位：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'workUnit'
    },
    {
      attrId: '5', // ：key唯一值
      attrName: '职位：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'position'
    },
    {
      attrId: '6', // ：key唯一值
      attrName: '联系电话：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'telephone'
    }
  ]
}
export let work = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '在职时间：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'workTime'
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '单位名称：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'unitName'
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '职位名称：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'position'
    },
    {
      attrId: '4', // ：key唯一值
      attrName: '离职薪资：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'money'
    },
    {
      attrId: '5', // ：key唯一值
      attrName: '证明人：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'person'
    },
    {
      attrId: '6', // ：key唯一值
      attrName: '证明人联系电话：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'telephone'
    },
    {
      attrId: '7', // ：key唯一值
      attrName: '有无守密义务或竞业禁止义务：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'obligation'
    },
    {
      attrId: '8', // ：key唯一值
      attrName: '遵守义务时间：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'obligationTime'
    },
    {
      attrId: '9', // ：key唯一值
      attrName: '具体内容：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'content'
    }
  ]
}
export let train = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '培训时间：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 4, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'trainTime'
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '培训课程：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'trainClass'
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '培训机构：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'trainOrg'
    }
  ]
}
export let certificate = {
  basicAttrs: [
    {
      attrId: '1', // ：key唯一值
      attrName: '证书名称：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'name'
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '证书编号：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'code'
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '发证机构：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'organ'
    },
    {
      attrId: '4', // ：key唯一值
      attrName: '发证日期：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 4, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '请填写工号', // 提示必填提示
      props: 'date'
    }
  ]
}
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
      dataType: 1, // 当inType=1时生效
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
      dataType: 1, // 当inType=1时生效
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
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
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
      value: '', // 单选框多选框的potion的值
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
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      disabled: true,
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
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
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
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
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: years, // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '合同期限', // 提示必填提示
      props: 'contractPeriod'
    },
    {
      attrId: '4', // ：key唯一值
      attrName: '合同开始日期：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
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
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
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
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: isRisks, // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 7, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '缴纳社会保险', // 提示必填提示
      props: 'isShbx'
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '社会保险基数：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '社会保险基数', // 提示必填提示
      props: 'baseMoney'
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '其他：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
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
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: OfficeSpace, // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '办公位安排', // 提示必填提示
      props: 'officeSpace'
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '电话配备：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: phoneConfig, // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '电话配备', // 提示必填提示
      props: 'telphone'
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '是否电脑配置：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: isRisks, // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 7, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '是否电脑配置', // 提示必填提示
      props: 'isComputer',
      span: 12
    },
    {
      attrId: '4', // ：key唯一值
      attrName: '其他：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
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
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: isRisks, // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 7, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '是否安排住房', // 提示必填提示
      props: 'isHouse',
      span: 12
    },
    {
      attrId: '2', // ：key唯一值
      attrName: '住房标准：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '住房标准', // 提示必填提示
      props: 'houseStandard',
      span: 12
    },
    {
      attrId: '3', // ：key唯一值
      attrName: '备注：', // lable
      attrValue: '', // v-model绑定值
      attrvalue: '', // 后台返回值
      minLen: '', // 最小长度
      maxLen: '', // 最大长度
      value: '', // 单选框多选框的potion的值
      dataType: 1, // 当inType=1时生效
      inType: 10, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
      message: '备注', // 提示必填提示
      props: 'remark',
      span: 12
    }
  ]
}

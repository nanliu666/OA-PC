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

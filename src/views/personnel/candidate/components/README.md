## 简介
## inputArray 用法

... 
{
  basicAttrs: [
    {
     minLen:'', // 文本框 最小长度
     maxLen:'',//文本框 最大长度
      attrId: '1', // ：key唯一值
      attrName: '在职时间：', // lable
      inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮，6：带有遮罩的input框，7：radio框（单选），
             8：联动选择框，9：复选框，10：区域文本框，11：树形下拉框
      message: '请填写工号', // 提示必填提示
      props: 'workTime', //双向绑定数据
      disabled: true,// 禁用
      span: 24// 栅格系统 没有默认12，
        rules: [ // 规则设置 同官网一样
              {
                required: true,
                message: '',
                trigger: 'change'
              }
            ]
    },
    }
    提交数据前调用这个方法
    submitForm() {
      return Promise.all(
        ['attrsForm'].map((it) => {
          return new Promise((resolve, reject) => {
            this.$refs[it].validate((valid) => {
              if (valid) {
                resolve(it)
              } else {
                reject(it)
              }
            })
          })
        })
      )
        .then(() => {
          this.$emit('update:form', this.form)
          return true
        })
        .catch((err) => {
          this.$nextTick(() => {
            this.$refs[err] &&
              this.$refs[err].$el &&
              this.$refs[err].$el.scrollIntoView &&
              this.$refs[err].$el.scrollIntoView({
                behavior: 'auto',
                block: 'end'
              })
          })
          return false
        })
    },
...

<template>
  <div style="height: 100%">
    <div class="header">
      <div>
        <i
          class="el-icon-arrow-left"
          style="font-weight: 800"
        /> 登记表详情
      </div>
    </div>
    <div class="person">
      <div class="name">
        {{ personInfo.name }}
      </div>
      <div class="flex flex-flow flex-justify-between">
        <div class="person_position flex flex-items flex-flow">
          <div>
            {{ personInfo.department }}
          </div>
          <div>{{ personInfo.position }}</div>
          <div>
            {{ personInfo.status }}
          </div>
        </div>
      </div>
    </div>
    <div class="basicInfo">
      <div
        class="title"
        @click="submitForm('ruleForm')"
      >
        基本信息
      </div>
      <div>
        <avue-form
          ref="form"
          v-model="form"
          :option="option"
          @submit="submit"
          @error="error"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistrationFormEdit',
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
        date2: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      },
      personInfo: {
        name: '张琪',
        department: 'ucd部门',
        position: 'ue设计师',
        status: '面试中'
      },
      form: {
        name: '1',
        six: '1',
        age: '1',
        marriage: '1',
        birth: '1',
        height: '1',
        weight: '1',
        education: '1',
        adress: '1',
        contacts: '1',
        type: '1',
        PresentAddress: '1',
        relatives: '1',
        telephtone: '1'
      },
      option: {
        menuBtn: false,
        labelPosition: 'top',
        size: 'medium',
        column: [
          {
            label: '姓名',
            prop: 'name',
            type: 'input',
            row: false,
            span: 12,
            placeholder: '请输入职位类别名称',
            rules: [
              {
                required: true,
                message: '请输入职位类别名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '性别',
            prop: 'six',
            type: 'input',
            row: false,
            span: 12,
            placeholder: '请输入描述',
            rules: [
              {
                required: true,
                message: '请输入职位类别名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '年龄',
            prop: 'age',
            type: 'input',
            row: false,
            span: 12,
            placeholder: '请输入描述',
            rules: [
              {
                required: true,
                message: '请输入职位类别名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '婚姻状况',
            prop: 'marriage',
            type: 'input',
            row: false,
            span: 12,
            placeholder: '请输入描述',
            rules: [
              {
                required: true,
                message: '请输入职位类别名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '出生日期',
            prop: 'birth',
            type: 'input',
            row: false,
            span: 12,
            placeholder: '请输入描述',
            rules: [
              {
                required: true,
                message: '请输入职位类别名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '身高',
            prop: 'height',
            type: 'input',
            row: false,
            span: 12,
            placeholder: '请输入描述',
            rules: [
              {
                required: true,
                message: '请输入职位类别名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '体重',
            prop: 'weight',
            type: 'input',
            row: false,
            span: 12,
            placeholder: '请输入描述',
            rules: [
              {
                required: true,
                message: '请输入职位类别名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '最高学历',
            prop: 'education',
            type: 'input',
            row: false,
            span: 12,
            placeholder: '请输入描述',
            rules: [
              {
                required: true,
                message: '请输入职位类别名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '身份证地址',
            prop: 'adress',
            type: 'input',
            row: false,
            span: 12,
            placeholder: '请输入描述',
            rules: [
              {
                required: true,
                message: '请输入职位类别名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '户口类型',
            prop: 'type',
            type: 'input',
            row: false,
            span: 12,
            placeholder: '请输入描述',
            rules: [
              {
                required: true,
                message: '请输入职位类别名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '紧急联系人',
            prop: 'contacts',
            type: 'input',
            row: false,
            span: 12,
            placeholder: '请输入描述',
            rules: [
              {
                required: true,
                message: '请输入职位类别名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '现住址',
            prop: 'PresentAddress',
            type: 'input',
            row: false,
            span: 12,
            placeholder: '请输入描述',
            rules: [
              {
                required: true,
                message: '请输入职位类别名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '是否有亲属再本公司工作',
            prop: 'relatives',
            type: 'input',
            row: false,
            span: 12,
            placeholder: '请输入描述',
            rules: [
              {
                required: true,
                message: '请输入职位类别名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '紧急电话',
            prop: 'telephtone',
            type: 'input',
            row: false,
            span: 12,
            placeholder: '请输入描述',
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
    }
  },
  methods: {
    submitForm() {
      Promise.all(
        ['form'].map((it) => {
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
          // this.submitFunc(status);
        })
        .catch((err) => {
          this.$nextTick(() => {
            this.$refs[err] &&
              this.$refs[err].$el &&
              this.$refs[err].$el.scrollIntoView &&
              this.$refs[err].$el.scrollIntoView({
                behavior: 'smooth'
              })
          })
        })
    },
    submit(data, done) {
      setTimeout(() => {
        done()
      }, 500)
    },
    error() {
      // console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #202940;
  line-height: 28px;
  font-weight: bold;
  margin-top: 14px;
}

.person {
  background: #ffffff;
  border-radius: 4px;
  height: 102px;
  padding: 24px;
  margin-top: 15px;
  box-sizing: border-box;

  .name {
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #333333;
    line-height: 30px;
  }

  .person_position {
    font-size: 14px;
    color: #757c85;
    line-height: 20px;

    div:nth-child(2) {
      margin: 0 16px 0 12px;
    }

    div:nth-child(3) {
      background: rgba(113, 129, 153, 0.1);
      border-radius: 4px;
      padding: 3px 10px;
    }
  }

  .icon {
    span:nth-child(1) {
      margin-right: 24px;
      font-size: 14px;
      color: #757c85;
    }

    span:nth-child(2) {
      font-size: 14px;
      color: #757c85;
    }

    i {
      color: #757c85;
      font-weight: 800;
      margin-right: 4px;
    }
  }
}

.basicInfo {
  margin-top: 16px;
  background: #ffffff;
  border-radius: 4px;
  padding: 0 24px 15px 24px;
  /*.attribute{*/
  /*  div{*/
  /*    !*width: 200px;*!*/
  /*    padding: 15px 0;*/
  /*    ont-size: 14px;*/
  /*  }*/
  /*  div:first-child{*/
  /*    color: #718199;*/

  /*  }*/
  /*  div:nth-child(2){*/
  /*    color: #202940;*/
  /*    !*width: 230px;*!*/
  /*  }*/

  /*}*/
  /*.attribute:nth-child(odd){*/
  /*  width: 50%;*/
  /*  div:first-child{*/
  /*    min-width: 50%;*/
  /*    text-align: right;*/
  /*  }*/
  /*}*/
  /*.attribute:nth-child(even){*/
  /*  width: 50%;*/
  /*  div:first-child{*/
  /*    min-width: 25%;*/
  /*    text-align: right;*/
  /*  }*/
  /*}*/
  .title {
    height: 52px;
    font-size: 16px;
    color: #202940;
    line-height: 52px;
    border-bottom: 1px solid #e3e7e9;
    margin-bottom: 20px;
  }
}
</style>

<template>
  <div
    v-loading="loading"
    style="height: 100%"
  >
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
      <div style="margin:0 100px;">
        <inputArray
          ref="info"
          :form.sync="form"
          :info-form.sync="infoForm"
        />
      </div>
    </div>
    <div class="contacts">
      <div class="title">
        紧急联系人
      </div>
      <div
        class="contactsContent"
        style="margin:0 100px;"
      >
        <div
          v-for="(contacts, i) in contactsform"
          :key="i"
          class="contactsform"
        >
          <span
            v-if="contactsform.length > 1"
            class="delete"
            @click="handleDelete(contacts, i)"
          >
            <el-link type="primary"><i class="el-icon-delete" /> 删除</el-link>
          </span>
          <inputArray
            :ref="`contacts${i}`"
            :info-form.sync="contacts.contacts"
            :form="contacts.form"
          />
        </div>

        <div
          class="flex flex-justify flex-items add "
          @click="handlerAddContacts"
        >
          <i class="el-icon-plus" />添加紧急联系人
        </div>
      </div>
    </div>
    <div class="education">
      <div class="title">
        家庭信息
      </div>
      <div
        class="contactsContent"
        style="margin:0 100px;"
      >
        <div
          v-for="(family, i) in familyform"
          :key="i"
          class="contactsform"
        >
          <span
            v-if="familyform.length > 1"
            class="delete"
            @click="handleDeleteFY(family, i)"
          >
            <el-link type="primary"><i class="el-icon-delete" /> 删除</el-link>
          </span>
          <inputArray
            :ref="`family${i}`"
            :info-form.sync="family.family"
            :form="family.form"
          />
        </div>

        <div
          class="flex flex-justify flex-items add "
          @click="handlerAddFamilyform"
        >
          <i class="el-icon-plus" />添加紧急联系人
        </div>
      </div>
    </div>
    <div class="education">
      <div class="title">
        教育经历
      </div>
      <div
        class="contactsContent"
        style="margin:0 100px;"
      >
        <div
          v-for="(education, i) in educationform"
          :key="i"
          class="contactsform"
        >
          <span
            v-if="educationform.length > 1"
            class="delete"
            @click="handleDeleteED(education, i)"
          >
            <el-link type="primary"><i class="el-icon-delete" /> 删除</el-link>
          </span>
          <inputArray
            :ref="`education${i}`"
            :info-form.sync="education.education"
            :form="education.form"
          />
        </div>

        <div
          class="flex flex-justify flex-items add "
          @click="handlerAddEducationform"
        >
          <i class="el-icon-plus" />添加紧急联系人
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inputArray from './components/inputArray'
import { infoForm, contacts, education, family } from './components/userInfo'

export default {
  name: 'RegistrationFormEdit',
  components: {
    inputArray
  },
  data() {
    return {
      infoForm,
      contactsform: [{ contacts: contacts, form: {} }],
      educationform: [{ education: education, form: {} }],
      familyform: [{ family: family, form: {} }],
      contacts,
      loading: false,
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
        phone: '',
        email: '',
        healthy: '',
        fisrtWork: '',
        nativePlace: '',
        newAddress: '',
        IDaddress: '',
        householdRegister: '',
        nation: '',
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
        telephone: '1'
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
  mounted() {},
  methods: {
    handleDelete(data, i) {
      if (this.contactsform.length > 1) {
        this.contactsform.splice(i, 1)
      }
    },
    handlerAddContacts() {
      this.contactsform.push({ contacts: contacts, form: {} })
    },
    handleDeleteFY(data, i) {
      if (this.familyform.length > 1) {
        this.familyform.splice(i, 1)
      }
    },
    handleDeleteED(data, i) {
      if (this.educationform.length > 1) {
        this.educationform.splice(i, 1)
      }
    },
    handlerAddFamilyform() {
      this.familyform.push({ family: family, form: {} })
    },
    handlerAddEducationform() {
      this.educationform.push({ education: education, form: {} })
    },
    async submitForm() {
      this.$refs.info.submitForm()
      this.contactsform.map((it, i) => {
        let contacts = `contacts${i}`
        this.$refs[contacts][0].submitForm()
      })
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

.education {
  margin-bottom: 60px;
}

.basicInfo,
.education,
.contacts {
  margin-top: 16px;
  background: #ffffff;
  border-radius: 4px;
  padding: 0 24px 15px 24px;
  .add {
    font-size: 14px;
    color: #1e9fff;
    border: 1px dashed #efefef;
    line-height: 40px;
    cursor: pointer;
  }
  .contactsContent {
    .contactsform {
      position: relative;
      .delete {
        position: absolute;
        right: 10px;
        top: 0px;
        z-index: 9000;
      }
    }
    .contactsform:not(:nth-child(1)) {
      border-top: 1px dashed #e3e7e9;
      padding-top: 15px;
      .delete {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
  }
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

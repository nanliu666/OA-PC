<template>
  <div
    v-loading="loading"
    style="height: 100%"
  >
    <div v-if="!modity">
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
    </div>
    <div class="basicInfo">
      <div
        class="title"
        @click="submitForm('ruleForm')"
      >
        基本信息
      </div>
      <div style="margin:0 100px;">
        <!--        <inputArray-->
        <!--          ref="info"-->
        <!--          :form.sync="form"-->
        <!--          :info-form.sync="infoForm"-->
        <!--        />-->
        <commonForm
          ref="form"
          :model="form"
          :columns="infoForm"
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
          <!--          <inputArray-->
          <!--            :ref="`contacts${i}`"-->
          <!--            :info-form.sync="contacts.contacts"-->
          <!--            :form="contacts.form"-->
          <!--          />-->
          <commonForm
            :ref="`contacts${i}`"
            :model="contacts.form"
            :columns="contacts.contacts"
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
    <div class="famliy">
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
          <commonForm
            :ref="`family${i}`"
            :model="family.form"
            :columns="family.family"
          />
          <!--          <inputArray-->
          <!--            :ref="`family${i}`"-->
          <!--            :info-form.sync="family.family"-->
          <!--            :form="family.form"-->
          <!--          />-->
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
          <commonForm
            :ref="`education$${i}`"
            :model="education.form"
            :columns="education.education"
          />
          <!--          <inputArray-->
          <!--            :ref="`education${i}`"-->
          <!--            :info-form.sync="education.education"-->
          <!--            :form="education.form"-->
          <!--          />-->
        </div>

        <div
          class="flex flex-justify flex-items add "
          @click="handlerAddEducationform"
        >
          <i class="el-icon-plus" />添加教育经历
        </div>
      </div>
    </div>
    <div class="education">
      <div class="title">
        工作经验
      </div>
      <div
        class="contactsContent"
        style="margin:0 100px;"
      >
        <div
          v-for="(work, i) in workform"
          :key="i"
          class="contactsform"
        >
          <span
            v-if="workform.length > 1"
            class="delete"
            @click="handleDeleteWK(work, i)"
          >
            <el-link type="primary"><i class="el-icon-delete" /> 删除</el-link>
          </span>
          <commonForm
            :ref="`work${i}`"
            :model="work.form"
            :columns="work.work"
          />
          <!--          <inputArray-->
          <!--            :ref="`education${i}`"-->
          <!--            :info-form.sync="work.work"-->
          <!--            :form="work.form"-->
          <!--          />-->
        </div>

        <div
          class="flex flex-justify flex-items add "
          @click="handlerAddWorkform"
        >
          <i class="el-icon-plus" />添加工作经验
        </div>
      </div>
    </div>
    <div class="education">
      <div class="title">
        培训经历
      </div>
      <div
        class="contactsContent"
        style="margin:0 100px;"
      >
        <div
          v-for="(train, i) in trainform"
          :key="i"
          class="contactsform"
        >
          <span
            v-if="trainform.length > 1"
            class="delete"
            @click="handleDeleteTR(train, i)"
          >
            <el-link type="primary"><i class="el-icon-delete" /> 删除</el-link>
          </span>
          <commonForm
            :ref="`train${i}`"
            :model="train.form"
            :columns="train.train"
          />
          <!--          <inputArray-->
          <!--            :ref="`train${i}`"-->
          <!--            :info-form.sync="train.train"-->
          <!--            :form="train.form"-->
          <!--          />-->
        </div>

        <div
          class="flex flex-justify flex-items add "
          @click="handlerAddTrainform"
        >
          <i class="el-icon-plus" />添加培训经历
        </div>
      </div>
    </div>
    <div class="education">
      <div class="title">
        资格证书
      </div>
      <div
        class="contactsContent"
        style="margin:0 100px;"
      >
        <div
          v-for="(certificate, i) in certificateform"
          :key="i"
          class="contactsform"
        >
          <span
            v-if="certificateform.length > 1"
            class="delete"
            @click="handleDeleteCE(certificate, i)"
          >
            <el-link type="primary"><i class="el-icon-delete" /> 删除</el-link>
          </span>
          <commonForm
            :ref="`certificate${i}`"
            :model="certificate.form"
            :columns="certificate.certificate"
          />
          <!--          <inputArray-->
          <!--            :ref="`certificate${i}`"-->
          <!--            :info-form.sync="certificate.certificate"-->
          <!--            :form="certificate.form"-->
          <!--          />-->
        </div>

        <div
          class="flex flex-justify flex-items add "
          @click="handlerAddCEform"
        >
          <i class="el-icon-plus" />添加资格证书
        </div>
      </div>
    </div>
    <div class="footer flex flex-items flex-justify">
      <el-button
        type="primary"
        size="medium"
        @click="handleSave"
      >
        保存
      </el-button>
      <el-button
        size="medium"
        @click="close"
      >
        取消
      </el-button>
    </div>
  </div>
</template>

<script>
import { provinceAndCityData, CodeToText } from 'element-china-area-data'
import { putpersonInfo } from '@/api/personnel/selectedPerson'
import {
  infoForm,
  contacts,
  education,
  family,
  work,
  train,
  certificate
} from './components/userInfo'
export default {
  name: 'RegistrationFormEdit',
  components: {},
  props: {
    modity: {
      type: Boolean
    },
    data: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      infoForm,
      contactsform: [{ contacts: contacts, form: {} }],
      educationform: [{ education: education, form: {} }],
      familyform: [{ family: family, form: {} }],
      workform: [{ work: work, form: {} }],
      trainform: [{ train: train, form: {} }],
      certificateform: [{ certificate: certificate, form: {} }],
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
        name: '',
        sex: '',
        phonenum: '',
        email: '',
        idType: '',
        idNo: '',
        birthDate: '',
        educationalLevel: '',
        firstWorkDate: '',
        marriage: '',
        health: '',
        nation: '',
        politicalStatus: '',
        native: [],
        householdType: '',
        idAddress: '',
        userAddress: ''
      },
      idType: [],
      EducationalLevel: [],
      Nation: [],
      PoliticalStatus: [],
      HouseholdType: [],
      UserRelationship: [],
      EducationalType: []
    }
  },
  watch: {
    data: {
      handler(val) {
        for (let key in this.form) {
          this.form[key] = val[key]
        }
        this.form.native = [val.nativeProvinceCode]
        this.form.native = []
        val.nativeProvinceCode && this.form.native.push(val.nativeProvinceCode)
        val.nativeCityCode && this.form.native.push(val.nativeCityCode)
        val.emer &&
          val.emer.map((it) => {
            this.contactsform = []
            this.contactsform.push({ contacts: contacts, form: { ...it } })
          })
        val.family &&
          val.family.map((it) => {
            this.familyform = []
            this.familyform.push({ family: family, form: { ...it } })
          })
        val.education &&
          val.education.map((it) => {
            it.educationTime = []
            it.beginDate && it.educationTime.push(it.beginDate)
            it.endDate && it.educationTime.push(it.endDate)
            this.educationform = []
            this.educationform.push({ education: education, form: { ...it } })
          })
        val.work &&
          val.work.map((it) => {
            it.workTime = []
            it.beginWorkDate && it.workTime.push(it.beginWorkDate)
            it.endWorkDate && it.workTime.push(it.endWorkDate)
            this.workform = []
            this.workform.push({ work: work, form: { ...it } })
          })
        val.emer &&
          val.train.map((it) => {
            it.time = []
            it.beginDate && it.time.push(it.beginDate)
            it.endDate && it.time.push(it.endDate)
            this.trainform = []
            this.trainform.push({ train: train, form: { ...it } })
          })
        val.certificate &&
          val.certificate.map((it) => {
            this.certificateform = []
            this.certificateform.push({ certificate: certificate, form: { ...it } })
          })
      },
      immediate: true
    },
    form: {
      handler() {},
      deep: true
    },
    educationform: {
      handler() {},
      deep: true
    }
  },
  mounted() {
    this.$store.dispatch('CommonDict', 'idType').then((res) => {
      this.idType = res
      this.options(this.infoForm, 'idType', res)
    })
    this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
      this.EducationalLevel = res
      this.options(this.infoForm, 'educationalLevel', res)
      this.options(education, 'educationalLevel', res)
    })
    this.$store.dispatch('CommonDict', 'Nation').then((res) => {
      this.Nation = res
      this.options(this.infoForm, 'nation', res)
    })
    this.$store.dispatch('CommonDict', 'PoliticalStatus').then((res) => {
      this.PoliticalStatus = res
      this.options(this.infoForm, 'politicalStatus', res)
    })
    this.$store.dispatch('CommonDict', 'HouseholdType').then((res) => {
      this.HouseholdType = res
      this.options(this.infoForm, 'householdType', res)
    })
    this.$store.dispatch('CommonDict', 'UserRelationship').then((res) => {
      this.UserRelationship = res
      this.options(family, 'relationship', res)
      this.options(contacts, 'relationship', res)
    })
    this.$store.dispatch('CommonDict', 'EducationalType').then((res) => {
      this.EducationalType = res
      this.options(education, 'educationalType', res)
      this.options(education, 'educationalType', res)
    })
    this.options(this.infoForm, 'native', provinceAndCityData)
  },
  methods: {
    /**
     * author guanfenda
     * @desc 处理posion赋值
     *
     * */
    options(data, prop, position) {
      data.map((it) => {
        if (it.prop === prop) {
          it.options = position
        }
      })
    },
    /**
     * @author guanfenda
     * 判断是否更新和修改
     * */
    dataPush(form, type) {
      form.map((it) => {
        // 判断是否更新和修改
        if (it.form.id) {
          it.form.operatorType = 'Update'
          type.push(it.form)
        } else {
          let isAdd = false
          for (let key in it.form) {
            if (key) {
              isAdd = true
            }
          }
          if (!isAdd) return
          it.form.operatorType = 'Add'
          type.push(it.form)
        }
      })
    },
    /***
     *
     * @author guanfenda
     * 判断是否删除
     *
     * */
    datadelete(form, type) {
      form.map((it) => {
        // 判断是否更新和修改
        let index = type.findIndex((item) => {
          return it.id === item.id
        })
        if (index < 0) {
          it.operatorType = 'Del'
          type.push(it)
        }
      })
    },
    /**
     * @author guanfenda
     * 登记表提交
     * */
    handleSave() {
      this.$refs.form
        .validate()
        .then(() => {
          let emer = []
          this.dataPush(this.contactsform, emer)
          this.data.emer && this.datadelete(this.data.emer, emer)
          let family = []
          this.dataPush(this.familyform, family)
          this.data.family && this.datadelete(this.data.family, family)
          let education = []
          this.dataPush(this.educationform, education)
          this.data.education && this.datadelete(this.data.education, education)
          let work = []
          this.dataPush(this.workform, work)
          this.data.work && this.datadelete(this.data.work, work)
          let train = []
          this.dataPush(this.trainform, train)
          this.data.train && this.datadelete(this.data.train, train)
          let certificate = []
          this.dataPush(this.certificateform, certificate)
          this.data.certificate && this.datadelete(this.data.certificate, certificate)
          education.map((it) => {
            if (it.educationTime.length > 0) {
              it.beginDate = it.educationTime[0]
              it.endDate = it.educationTime[1]
            }
          })
          work.map((it) => {
            if (it.workTime.length > 0) {
              it.beginWorkDate = it.workTime[0]
              it.beginWorkDate = it.workTime[1]
            }
          })
          train.map((it) => {
            if (it.time.length > 0) {
              it.beginDate = it.time[0]
              it.endDate = it.time[1]
            }
          })
          this.form.nativeProvinceCode = this.form.native[0] || ''
          this.form.nativeProvinceName = CodeToText[this.form.native[0]] || ''
          this.form.nativeCityCode = this.form.native[1] || ''
          this.form.nativeCityName = CodeToText[this.form.native[1]] || ''
          let params = {
            personId: this.$route.query.personId,
            ...this.form,
            emer: emer,
            family: family,
            education: education,
            work: work,
            train: train,
            certificate: certificate
          }
          this.loading = true
          putpersonInfo(params).then(() => {
            this.loading = false
            this.$message.success('提交成功')
            this.$emit('close')
          })
        })
        .catch(() => {
          this.loading = false
          this.$refs.form.scrollIntoView()
        })
    },
    close() {
      this.$emit('close')
    },
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
    handleDeleteWK(data, i) {
      if (this.workform.length > 1) {
        this.workform.splice(i, 1)
      }
    },
    handlerAddWorkform() {
      this.workform.push({ work: work, form: {} })
    },
    handleDeleteTR(data, i) {
      if (this.trainform.length > 1) {
        this.trainform.splice(i, 1)
      }
    },
    handlerAddTrainform() {
      this.trainform.push({ train: train, form: {} })
    },
    handleDeleteCE(data, i) {
      this.certificateform.length > 1 && this.certificateform.splice(i, 1)
    },
    handlerAddCEform() {
      this.certificateform.push({ certificate: certificate, form: {} })
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
  padding-top: 14px;
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
  margin-bottom: 0px;
}
.famliy,
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
.footer {
  height: 100px;
  margin-bottom: 20px;
  margin-top: 20px;
  background: #fff;
}
</style>

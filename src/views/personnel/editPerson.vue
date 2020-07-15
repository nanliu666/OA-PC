<template>
  <div>
    <page-header
      :title="title"
      show-back
    />
    <basic-container>
      <el-row
        type="flex"
        justify="center"
        style="padding-top:40px;"
      >
        <el-col
          :xl="16"
          :lg="16"
          :md="18"
          :sm="20"
          :xs="22"
        >
          <el-form
            ref="form"
            :model="form"
            label-position="top"
            :rules="rules"
            size="medium"
          >
            <el-row>
              <el-col :span="10">
                <el-form-item
                  label="关联应聘职位"
                  prop="recruitmentId"
                >
                  <el-select
                    v-model="form.recruitmentId"
                    :disabled="recruitmentIdDisabled"
                    placeholder="请选择应聘职位（对应招聘需求）"
                  >
                    <el-option
                      v-for="item in recruitmentList"
                      :key="item.id"
                      :label="`${item.jobName}(${item.id})`"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item
                  label="用人部门"
                  prop="orgName"
                >
                  <el-input
                    :value="form.orgName"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="姓名"
                  prop="name"
                >
                  <el-input v-model.trim="form.name" />
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item
                  label="性别"
                  prop="sex"
                >
                  <el-radio-group v-model="form.sex">
                    <el-radio :label="1">
                      男
                    </el-radio>
                    <el-radio :label="0">
                      女
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="年龄"
                  prop="age"
                >
                  <el-input
                    v-model="form.age"
                    @input="(v) => inputNumber(v, 'age')"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item
                  label="手机号码"
                  prop="phonenum"
                >
                  <el-input
                    v-model="form.phonenum"
                    maxlength="11"
                    @input="(v) => inputNumber(v, 'phonenum')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="邮箱"
                  prop="email"
                >
                  <el-input v-model="form.email" />
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item
                  label="目前所在地"
                  prop="addressArr"
                >
                  <el-cascader
                    ref="address"
                    v-model="form.addressArr"
                    :options="provinceAndCityData"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="最高学历"
                  prop="educationalLevel"
                >
                  <el-select v-model="form.educationalLevel">
                    <el-option
                      v-for="item in educationalLevelOptions"
                      :key="item.dictKey"
                      :label="item.dictValue"
                      :value="item.dictKey"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item
                  label="毕业学校"
                  prop="university"
                >
                  <el-input v-model="form.university" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="毕业专业"
                  prop="major"
                >
                  <el-input v-model.trim="form.major" />
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item
                  label="工作年限"
                  prop="workAge"
                >
                  <el-input
                    v-model="form.workAge"
                    maxlength="11"
                    @input="(v) => inputNumber(v, 'workAge')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="最近工作单位"
                  prop="lastCompany"
                >
                  <el-input v-model.trim="form.lastCompany" />
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item
                  label="应聘渠道"
                  prop="recruitment"
                >
                  <el-select v-model="form.recruitment">
                    <el-option
                      v-for="item in recruitmentOptions"
                      :key="item.dictKey"
                      :label="item.dictValue"
                      :value="item.dictKey"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="期望月薪"
                  prop="monthSalary"
                >
                  <el-input
                    v-model="form.monthSalary"
                    maxlength="9"
                    @input="(v) => inputNumber(v, 'monthSalary')"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item
                  label="简历"
                  prop="resume"
                >
                  <common-upload
                    v-model="form.resume"
                    :multiple="false"
                    :before-upload="beforeResumeUpload"
                  >
                    <el-button
                      v-if="form.resume.length === 0"
                      size="medium"
                    >
                      上传简历
                    </el-button>
                    <el-button
                      v-else
                      size="medium"
                      type="text"
                    >
                      {{ form.resume[0].localName }}
                    </el-button>
                  </common-upload>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="附件"
                  prop="attachment"
                >
                  <common-upload
                    v-model="form.attachment"
                    :multiple="false"
                  >
                    <el-button
                      v-if="form.attachment.length === 0"
                      size="medium"
                    >
                      上传附件
                    </el-button>
                    <el-button
                      v-else
                      size="medium"
                      type="text"
                    >
                      {{ form.attachment[0].localName || '附件' }}
                    </el-button>
                  </common-upload>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item
                  label="备注"
                  prop="remark"
                >
                  <el-input
                    v-model.trim="form.remark"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="page-bottom">
            <el-button
              v-if="!personId"
              size="medium"
              @click="handleSubmit(true)"
            >
              保存并继续添加
            </el-button>
            <el-button
              v-else
              size="medium"
              @click="goBack"
            >
              取消
            </el-button>
            <el-button
              type="primary"
              size="medium"
              :loading="submitting"
              @click="handleSubmit(false)"
            >
              保存
            </el-button>
          </div>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
import { provinceAndCityData } from 'element-china-area-data'
import { mapGetters } from 'vuex'

import {
  getPersonInfo,
  getRecruitmentList,
  createTalent,
  createCandidate,
  modifyPerson
} from '@/api/personnel/person'

export default {
  name: 'EditPerson',
  components: {
    pageHeader: () => import('@/components/page-header/pageHeader'),
    commonUpload: () => import('@/components/common-upload/commonUpload')
  },
  data() {
    return {
      submitting: false,
      personId: null,
      recruitmentIdDisabled: false,
      form: {
        recruitmentId: null,
        name: null,
        sex: null,
        age: null,
        email: null,
        addressArr: [],
        educationalLevel: null,
        university: null,
        major: null,
        workAge: null,
        recruitment: null,
        monthSalary: null,
        resume: [],
        attachment: [],
        remark: '',
        orgName: ''
      },
      rules: {
        recruitmentId: [{ required: true, message: '请选择招聘需求', trigger: 'change' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        phonenum: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^[0-9]{11}$/, message: '长度必须为11位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
        ],
        addressArr: [{ required: true, message: '请选择所在地址', trigger: 'change' }],
        educationalLevel: [{ required: true, message: '请选择学历', trigger: 'change' }],
        university: [{ required: true, message: '请输入毕业学校', trigger: 'blur' }],
        major: [{ required: true, message: '请输入毕业专业', trigger: 'blur' }],
        workAge: [{ required: true, message: '请输入工作年限', trigger: 'blur' }],
        recruitment: [{ required: true, message: '请选择招聘渠道', trigger: 'change' }],
        monthSalary: [{ required: true, message: '请输入期望月薪', trigger: 'blur' }]
      },
      provinceAndCityData,
      educationalLevelOptions: [],
      recruitmentOptions: [],
      recruitmentList: []
    }
  },
  computed: {
    title() {
      if (this.personId) {
        return '修改人员信息'
      } else if (this.isTalent) {
        return '添加人才库'
      } else {
        return '添加候选人'
      }
    },
    ...mapGetters(['userId'])
  },
  watch: {
    'form.recruitmentId': function(val) {
      if (val) {
        this.form.orgName = (this.recruitmentList.find((item) => item.id === val) || {}).orgName
      }
    }
  },
  async created() {
    this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
      this.educationalLevelOptions = res
    })
    this.$store.dispatch('CommonDict', 'RecruitmentChannel').then((res) => {
      this.recruitmentOptions = res
    })
    this.personId = this.$route.query.personId
    this.isTalent = this.$route.query.isTalent
    await this.getRecruitment()
    // this.getPersonInfo()
    // this.recruitmentId && (this.form.recruitmentId = this.recruitmentId)
  },
  async activated() {
    this.personId = this.$route.query.personId
    this.isTalent = this.$route.query.isTalent
    await this.getPersonInfo()
    if (this.form.recruitmentId || this.$route.query.recruitmentId) {
      this.recruitmentIdDisabled = true
      this.$route.query.recruitmentId && (this.form.recruitmentId = this.$route.query.recruitmentId)
    } else {
      this.recruitmentIdDisabled = false
    }
  },
  beforeRouteLeave(to, from, next) {
    this.clear()
    this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
    next()
  },
  methods: {
    inputNumber(value, key) {
      value = value.replace(/[^\d]/g, '')
      this.form[key] = value
    },
    beforeResumeUpload(file) {
      const regx = /^.*\.(doc|docx|pdf)$/
      // const isLt2M = file.size / 1024 / 1024 < 3

      // if (!isLt2M) {
      //   this.$message.error('上传图片大小不能超过 3MB!')
      //   return false
      // }
      if (!regx.test(file.name)) {
        this.$message.error('上传简历只支持word或pdf文件')
        return false
      }
      return true
    },
    getRecruitment() {
      return new Promise((resolve) => {
        getRecruitmentList({
          userId: this.userId
        }).then((res) => {
          this.recruitmentList = res
          this.form.orgName = (
            this.recruitmentList.find((item) => item.id === this.form.recruitmentId) || {}
          ).orgName
          resolve()
        })
      })
    },
    getPersonInfo() {
      return new Promise((resolve) => {
        if (!this.personId) {
          resolve()
          return
        }
        getPersonInfo(this.personId).then((data) => {
          this.form = {
            orgName: this.form.orgName,
            name: data.name,
            phonenum: data.phonenum,
            sex: data.sex,
            age: data.age,
            email: data.email,
            addressArr: [data.provinceCode, data.cityCode],
            educationalLevel: data.educationalLevel,
            university: data.university,
            major: data.major,
            workAge: data.workAge,
            lastCompany: data.lastCompany,
            recruitment: data.recruitment,
            monthSalary: data.monthSalary,
            resume: data.resumeUrl
              ? [{ fileUrl: data.resumeUrl, localName: `${data.name}的简历` }]
              : [],
            attachment: data.attachmentUrl
              ? [{ fileUrl: data.attachmentUrl, localName: data.attachmentName }]
              : [],
            remark: data.remark
          }
          resolve()
        })
      })
    },
    handleSubmit(shouldContinue = false) {
      let submitFunc
      if (this.personId) {
        submitFunc = modifyPerson
      } else if (this.isTalent) {
        submitFunc = createTalent
      } else {
        submitFunc = createCandidate
      }
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        let inputValue = []
        const form = this.form
        const params = {
          ...this.form,
          resumeUrl: form.resume[0] ? form.resume[0].fileUrl : null,
          attachmentUrl: form.attachment[0] ? form.attachment[0].fileUrl : null,
          attachmentName: form.attachment[0] ? form.attachment[0].localName : null,
          provinceCode: form.addressArr[0],
          cityCode: form.addressArr[1],
          personId: this.personId,
          userId: this.$store.state.user.userInfo.user_id
        }
        if (this.$refs.address.inputValue) {
          inputValue = this.$refs.address.inputValue.split(' / ')
        }
        params.provinceName = inputValue[0]
        params.cityName = inputValue[1]
        this.submitting = true
        submitFunc(params)
          .then(() => {
            this.$message.success('提交成功')
            this.clear()
            this.submitting = false
            if (!shouldContinue) {
              this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
              this.$router.go(-1)
            }
          })
          .catch(() => {
            this.submitting = false
          })
      })
    },
    clear() {
      this.form = this.$options.data().form
      setTimeout(() => {
        this.$refs.form.clearValidate()
      })
    },
    goBack() {
      this.clear()
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-cascader,
.el-select {
  width: 100%;
}
.el-col {
  margin-bottom: 0;
}
.page-bottom {
  display: inline-block;
  padding-bottom: 20px;
}
</style>

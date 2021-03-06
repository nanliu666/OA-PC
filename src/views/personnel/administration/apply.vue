<template>
  <div class="Apply">
    <page-header
      title="新建转正申请"
      show-back
    />
    <basic-container block>
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
            ref="apply"
            label-position="top"
            :rules="rules"
            :model="apply"
            class="demo-form-inline"
          >
            <el-row>
              <el-col :span="10">
                <el-form-item label="入职时间">
                  <el-input
                    :value="apply.entryDate"
                    size="medium"
                    disabled
                    suffix-icon="el-icon-date"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="预计转正时间">
                  <el-input
                    :value="apply.formalDate"
                    size="medium"
                    disabled
                    suffix-icon="el-icon-date"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="试用期工作总结"
                  prop="summary"
                >
                  <el-input
                    v-model="apply.summary"
                    size="medium"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="对公司的意见和建议"
                  prop="advise"
                >
                  <el-input
                    v-model="apply.advise"
                    size="medium"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <appr-picker
                  ref="apprPicker"
                  :process-data="processData"
                />
              </el-col>
            </el-row>

            <el-button
              size="medium"
              @click="goBack()"
            >
              取消
            </el-button>
            <el-button
              :loading="loading"
              type="primary"
              size="medium"
              @click="() => handleSubmit()"
            >
              提交
            </el-button>
          </el-form>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createApply } from '@/api/personnel/person'
import { getStaffBasicInfo } from '@/api/personalInfo'
import { getApproveCount } from '../../../api/approval/approval'

import { Base64 } from 'js-base64'
import { getProcessDetail, getProcessIDByFormKey } from '@/api/apprProcess/apprProcess'
import apprPicker from '@/components/appr-picker/apprPicker'
import { FormKeysCN } from '@/const/approve'

const formFields = [
  { label: '入职时间', prop: 'entryDate', value: null, span: 12 },
  { label: '预计转正时间', prop: 'formalDate', value: null, span: 12 },
  { label: '试用期工作总结', prop: 'summary', value: null, span: 24 },
  { label: '对公司的意见和建议', prop: 'advise', value: null, span: 24 }
]
export default {
  name: 'FormalApply',
  components: {
    apprPicker
  },
  data() {
    return {
      loading: false,
      inputdisabled: true,
      formKey: 'UserFormalInfo',
      processData: null,
      processId: null,
      apply: {
        entryDate: '暂无数据',
        formalDate: '暂无数据',
        advise: '',
        summary: ''
      },
      rules: {
        summary: [{ required: true, message: '请简单说说您的工作心得', trigger: 'blur' }],
        advise: [{ required: true, message: '希望公司哪里可以改进？', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    getStaffBasicInfo({ userId: this.userId }).then((res) => {
      this.apply.entryDate = res.entryDate
      this.apply.formalDate = res.formalDate
    })
  },
  created() {
    this.getProcessDetail()
  },
  methods: {
    // 通过formKey获取processId
    getProcessId() {
      return getProcessIDByFormKey({ formKey: this.formKey })
    },
    getProcessDetail() {
      this.getProcessId().then((res) => {
        this.processId = res.processId
        getProcessDetail({ processId: res.processId }).then((res) => {
          this.json = res.baseJson
          const obj = JSON.parse(Base64.decode(res.baseJson))
          if (typeof obj === 'object') {
            this.processData = obj.processData
          }
        })
      })
    },
    // 提交之前hook
    async checkValid() {
      let valid = true
      if (
        _.get(await getApproveCount({ userId: this.userId, formKey: this.formKey }), 'approveNum') >
        0
      ) {
        valid = false
      }
      return valid
    },
    async handleSubmit(params = {}) {
      if (!(await this.checkValid())) {
        // 已经提交过了
        return this.$message.warning('已存在正在审批中的申请')
      }
      Promise.all([this.$refs['apply'].validate(), this.$refs['apprPicker'].validate()]).then(
        () => {
          params.userId = this.userId
          params.summary = this.apply.summary
          params.advise = this.apply.advise
          params.entryDate = this.apply.entryDate
          params.formalDate = this.apply.formalDate
          this.loading = true
          if (params && params.formalDate && params.entryDate) {
            createApply(params).then((res) => {
              this.loading = false
              if (res && res.id) {
                formFields.forEach((field) => {
                  field.value = params[field.prop]
                })
                this.$refs['apprPicker']
                  .submit({
                    formData: formFields,
                    formId: res.id,
                    formKey: this.formKey,
                    processName: FormKeysCN[this.formKey],
                    processId: this.processId
                  })
                  .then(() => {
                    this.$message({ type: 'success', message: '提交成功' })
                    this.goBack()
                  })
              }
            })
          } else {
            this.$message({
              showClose: true,
              message: '您的账户不符合,或者已经转正,无需提交',
              type: 'warning'
            })
            this.goBack()
          }
        }
      )
    },
    goBack() {
      this.resetForm()
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.back()
    },
    resetForm() {
      this.apply.advise = null
      this.apply.summary = null
    }
  }
}
</script>

<style lang="sass" scoped>
.Apply
  .basic-container--block
    height: calc(100% - 92px)
    min-height: calc(100% - 92px)
</style>

<template>
  <div>
    <page-header
      title="新建转正申请"
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
                <el-form-item
                  label="审批流程"
                  prop="apprProgress"
                >
                  <appr-progress
                    ref="apprProgress"
                    form-key="UserFormalInfo"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-button
              size="medium"
              @click="goBack()"
            >
              取消
            </el-button>
            <el-button
              type="primary"
              size="medium"
              @click="submitForm('apply')"
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
export default {
  name: 'Apply',
  components: {
    apprProgress: () => import('@/components/appr-progress/apprProgress')
  },
  data() {
    var checkAppr = (rule, value, callback) => {
      if (!this.$refs['apprProgress'].validate()) {
        callback(new Error('请选择审批人'))
      } else {
        callback()
      }
    }
    return {
      inputdisabled: true,
      apply: {
        entryDate: '暂无数据',
        formalDate: '暂无数据',
        advise: '',
        summary: ''
      },
      rules: {
        summary: [{ required: true, message: '请简单说说您的工作心得', trigger: 'blur' }],
        advise: [{ required: true, message: '希望公司哪里可以改进？', trigger: 'blur' }],
        apprProgress: [{ required: true, validator: checkAppr }]
      }
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    let params = {
      userId: this.userId
    }
    getStaffBasicInfo(params).then((res) => {
      let { formalDate, entryDate } = res
      this.apply.entryDate = entryDate
      this.apply.formalDate = formalDate
    })
  },
  methods: {
    configurationData(params) {
      params.userId = this.userId
      params.summary = this.apply.summary
      params.advise = this.apply.advise
      params.entryDate = this.apply.entryDate
      params.formalDate = this.apply.formalDate
      return params
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {}
          this.configurationData(params)
          createApply(params)
            .then((res) => {
              if (res && res.id) {
                this.$refs['apprProgress'].submit(res.id).then(() => {
                  this.$message({ type: 'success', message: '提交成功' })
                  this.goBack()
                })
              }
            })
            .catch()
        } else {
          return false
        }
      })
    },
    goBack() {
      this.resetForm()
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
    },
    resetForm() {
      this.apply.advise = ''
      this.apply.summary = ''
    }
  }
}
</script>
<style lang="scss" scoped></style>

<template>
  <div class="apprSubmit fill">
    <page-header
      :title="'发起' + basicSetting.processName + '申请'"
      :show-back="true"
      :back="goBack"
    />
    <basic-container
      v-loading="loading"
      block
    >
      <el-row
        type="flex"
        justify="center"
      >
        <el-col
          :xl="16"
          :lg="16"
          :md="18"
          :sm="20"
          :xs="22"
        >
          <form-parser
            ref="form"
            :form-data.sync="form"
          />
          <appr-picker
            ref="apprPicker"
            :process-data="processData"
            :form-data="form"
          />
          <div class="footer">
            <el-button
              size="medium"
              @click="goBack"
            >
              取消
            </el-button>
            <el-button
              size="medium"
              type="primary"
              :loading="submiting"
              @click="submit"
            >
              提交
            </el-button>
          </div>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import { getProcessDetail } from '@/api/apprProcess/apprProcess'
import apprPicker from '@/components/appr-picker/apprPicker'

import { Base64 } from 'js-base64'

export default {
  name: 'ApprSubmit',
  components: {
    apprPicker
  },
  data() {
    return {
      basicSetting: {},
      formData: {},
      form: {},
      processData: null,
      advancedSetting: {},
      json: '',
      loading: false,
      processId: null,
      submiting: false
    }
  },
  created() {},
  activated() {
    this.processId = this.$route.query.processId
    this.getProcess()
  },
  methods: {
    getProcess() {
      if (!this.processId) {
        return
      }
      this.loading = true
      getProcessDetail({ processId: this.processId })
        .then((res) => {
          this.json = res.baseJson
          const obj = JSON.parse(Base64.decode(res.baseJson))
          if (typeof obj === 'object') {
            this.basicSetting = obj.basicSetting
            this.formData = obj.formData
            this.processData = obj.processData
            this.advancedSetting = obj.advancedSetting
            this.$refs.form.init(obj.formData)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    submit() {
      Promise.all([this.$refs.form.validate(), this.$refs.apprPicker.validate()]).then(([data]) => {
        this.submiting = true
        this.$refs.apprPicker
          .submit({
            formData: data.formFields,
            processId: this.processId,
            processName: this.basicSetting.processName
          })
          .then(() => {
            this.$message.success('审批提交成功')
            this.goBack()
          })
          .finally(() => {
            this.submiting = false
          })
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    clear() {
      this.$refs.form.resetForm()
    }
  }
}
</script>

<style lang="scss" scoped>
.apprSubmit {
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-button + .el-button {
    margin-left: 16px;
  }
}
.basic-container--block {
  height: calc(100% - 92px);
  min-height: calc(100% - 92px);
}
</style>

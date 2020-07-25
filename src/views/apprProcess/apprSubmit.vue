<template>
  <div class="apprSubmit fill">
    <page-header title="提交审批" />
    <basic-container block>
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
            :form-conf="formData"
          />
          <apprUser :process-data="processData" />
          <div class="footer">
            <el-button
              size="medium"
              type="primary"
              @click="submit"
            >
              提交
            </el-button>
            <el-button size="medium">
              取消
            </el-button>
          </div>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import { getProcessDetail } from '@/api/apprProcess/apprProcess'
import apprUser from './components/apprUser'
export default {
  name: 'ApprSubmit',
  components: {
    apprUser
  },
  data() {
    return {
      basicSetting: {},
      formData: {},
      processData: {},
      advancedSetting: {},
      json: ''
    }
  },
  created() {
    this.getProcess()
  },
  methods: {
    getProcess() {
      getProcessDetail().then((res) => {
        this.json = res.baseJson
        const obj = JSON.parse(res.baseJson)
        if (typeof obj === 'object') {
          this.basicSetting = obj.basicSetting
          this.formData = obj.formData
          this.processData = obj.processData
          this.advancedSetting = obj.advancedSetting
        }
      })
    },
    submit() {
      this.$refs.form.submit().then((formData) => {
        // eslint-disable-next-line
        console.log('formData:', formData)
      })
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
</style>

<template>
  <div class="apprSubmit fill">
    <page-header :title="basicSetting.processName || ''" />
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
            :form-conf="formData"
          />
          <apprUser
            ref="apprUser"
            :process-data="processData"
          />
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

import { Base64 } from 'js-base64'

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
      json: '',
      loading: false
    }
  },
  created() {
    this.getProcess()
  },
  methods: {
    getProcess() {
      this.loading = true
      getProcessDetail()
        .then((res) => {
          this.json = res.baseJson
          const obj = JSON.parse(Base64.decode(res.baseJson))
          if (typeof obj === 'object') {
            this.basicSetting = obj.basicSetting
            this.formData = obj.formData
            this.processData = obj.processData
            this.advancedSetting = obj.advancedSetting
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    submit() {
      this.$refs.form.submit().then((formData) => {
        // eslint-disable-next-line
        console.log('formData:', formData)
      })
      // eslint-disable-next-line
      console.log('apprUser:', this.$refs.apprUser.submit())
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

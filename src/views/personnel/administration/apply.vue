<template>
  <div>
    <page-header
      title="新建转正申请"
      class="pageHeader"
      show-back
    />
    <basic-container>
      <el-form
        ref="apply"
        label-position="top"
        :rules="rules"
        :inline="true"
        :model="apply"
        class="demo-form-inline"
      >
        <el-row
          :gutter="24"
          style=" position: relative; left: 90px;"
        >
          <el-col :span="12">
            <el-form-item label="入职时间">
              <el-input
                :value="apply.entryDate"
                size="medium"
                disabled
                suffix-icon="el-icon-date"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
                style="width:156%"
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
                style="width:156%"
                type="textarea"
                :rows="2"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-button
              size="medium"
              @click="resetForm()"
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
          </el-col>
        </el-row>
      </el-form>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOperation } from '@/api/personnel/person'
import { getStaffBasicInfo } from '@/api/personalInfo'
export default {
  data() {
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
        advise: [{ required: true, message: '希望公司哪里可以改进？', trigger: 'blur' }]
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {}
          params.userId = this.userId
          params.summary = this.apply.summary
          params.advise = this.apply.advise
          getOperation(params)
            .then(() => {
              this.$message({ type: 'success', message: '操作成功' })
            })
            .catch()
          return this.resetForm()
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.apply.advise = ''
      this.apply.summary = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.pageHeader {
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  font-weight: bold;
}

.el-form-item {
  width: 48%;
}
</style>

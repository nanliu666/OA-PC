<template>
  <div>
    <div class="roster-header">
      <h4>新建转正申请</h4>
    </div>
    <basic-container>
      <div class="roster-header">
        <h4>转正信息</h4>
      </div>
      <el-form
        label-position="top"
        :rules="rules"
        :inline="true"
        :model="apply"
        class="demo-form-inline"
      >
        <el-row :gutter="24">
          <el-col :span="4" />
          <el-col :span="8">
            <el-form-item label="入职时间">
              <el-input
                v-model="probationperiod.start"
                disabled="false"
                suffix-icon="el-icon-date"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预计转正时间">
              <el-input
                v-model="probationperiod.end"
                disabled="false"
                suffix-icon="el-icon-date"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4" />
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4" />
          <el-col :span="20">
            <el-form-item
              label="试用期工作总结"
              prop="summary"
            >
              <el-input
                v-model="apply.summary"
                type="textarea"
                :rows="2"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>

          <el-col :span="4" />
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4" />
          <el-col :span="20">
            <el-form-item
              label="对公司的意见和建议"
              prop="proposal"
            >
              <el-input
                v-model="apply.proposal"
                type="textarea"
                :rows="2"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4" />
        </el-row>
        <el-form-item>
          <el-button
            size="medium"
            @click="resetForm('ruleForm')"
          >
            取消
          </el-button>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      probationperiod: {
        start: '暂无数据',
        end: '暂无数据'
      },
      apply: {
        summary: '',
        proposal: ''
      },
      rules: {
        summary: [{ required: true, message: '请简单说说您的工作心得', trigger: 'blur' }],
        proposal: [{ required: true, message: '希望公司哪里可以改进？', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.roster-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  h4 {
    font-size: 18px;
  }
}
.state {
  display: flex;
  padding: 0 6px;
  margin-bottom: 10px;
  .on {
    flex: 4;
    background: #ffffff;
    border-radius: 4px;
    margin-right: 20px;
    display: flex;
    > div {
      flex: 1;
      text-align: center;
      height: 46px;
      margin: 30px 0;
      line-height: 46px;
      border-right: 1px solid #e3e7e9;
      cursor: pointer;
      .bottomBox {
        height: 2px;
        width: 68px;
        background: #207efa;
        margin: 0 auto;
        margin-top: 28px;
      }
    }
    :last-of-type {
      border-right: 0;
    }
    .current {
      color: #207efa;
    }
  }
  .left {
    flex: 1;
    background: #ffffff;
    border-radius: 4px;
    > div {
      flex: 1;
      text-align: center;
      height: 46px;
      margin: 30px 0;
      line-height: 46px;
      cursor: pointer;
      .bottomBox {
        height: 2px;
        width: 68px;
        background: #207efa;
        margin: 0 auto;
        margin-top: 28px;
      }
    }
    .current {
      color: #207efa;
    }
  }
}
</style>

<style scoped>
/* 修改表单样式的默认值 */
.el-form-item__label {
  padding: 0;
}
.el-form-item {
  width: 48%;
}

.el-textarea__inner {
  width: 200%;
}
</style>

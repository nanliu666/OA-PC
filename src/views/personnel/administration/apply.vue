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
        </el-row>
      </el-form>
    </basic-container>
    <basic-container class="bottomList">
      <el-button
        size="medium"
        @click="resetForm()"
      >
        取消
      </el-button>
      <el-button
        size="medium"
        @click="submitForm('apply')"
      >
        提交
      </el-button>
    </basic-container>
  </div>
</template>

<script>
import { getOperation, getFormalTime } from '@/api/personnel/roster'
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
  mounted() {
    let params = {}
    params.userId = 'tonken'
    getFormalTime(params).then((res) => {
      this.apply.entryDate = res.entryDate
      this.apply.formalDate = res.formalDate
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {}
          params.userId = 'tonken'
          params.summary = this.apply.summary
          params.advise = this.apply.advise
          getOperation(params)
            .then((res) => {
              if (res.restate) {
                this.$message({ type: 'success', message: res.restate })
              }
            })
            .catch((rej) => {
              if (rej instanceof Object) {
                this.$message({ type: 'success', message: '申请成功' })
              } else {
                this.$message({ message: '该功能暂不可用请联系相关管理员', type: 'warning' })
              }
            })
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
.el-form-item__label {
  padding: 0;
}
.el-form-item {
  width: 48%;
}
.bottomList {
  box-shadow: 0px -10px 10px rgba(49, 48, 48, 0.274);
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 70px;
  width: 100%;
}
</style>

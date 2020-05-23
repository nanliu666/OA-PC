<template>
  <el-dialog
    title="调整试用期"
    :visible="visible"
    width="30%"
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <p class="riskSpan">
      TIPS：如调整试用期，计划转正日期将自动根据入职日期和试用期计算。试用期约定和合同签订有关，请勿随意变更避免出现用工风险。
    </p>
    <el-row
      type="flex"
      :gutter="20"
    >
      <el-col :span="10">
        原定试用期：{{ oldProbation }}
      </el-col>
      <el-col :span="10">
        原定计划转正日期：{{ oldProbationDate }}
      </el-col>
    </el-row>
    <el-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="top"
      class="newOrgDailog"
    >
      <el-form-item
        label="调整后试用期"
        prop="probation"
      >
        <el-select
          ref="probation"
          v-model="form.probation"
          placeholder="请输入"
        >
          <el-option
            v-for="item in probationOptions"
            :key="item.item"
            :label="item.month"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="调整后计划转正日期">
        <el-input
          :value="probationDate"
          placeholder="请选择"
          suffix-icon="el-icon-date"
          disabled
        />
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        @click="handleClose"
      >取消</el-button>
      <el-button
        type="primary"
        size="medium"
        @click="submit"
      >保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { putProbation } from '@/api/personnel/roster'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  name: 'OrgEdit',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      type: 'create',
      oldProbation: null,
      oldProbationDate: null,
      form: {
        probation: null
      },
      userId: null,
      probationDate: null,
      probationOptions: [
        {
          month: '无试用期',
          value: 0
        },
        {
          month: '1月',
          value: 1
        },
        {
          month: '2月',
          value: 2
        },
        {
          month: '3月',
          value: 3
        },
        {
          month: '4月',
          value: 4
        },
        {
          month: '5月',
          value: 5
        },
        {
          month: '6月',
          value: 6
        }
      ],
      rules: {
        probation: [{ required: true, message: '请输入对应时间', trigger: 'blur' }]
      }
    }
  },
  watch: {
    'form.probation': function(newval, oldval) {
      if (newval != oldval) this.calcDate(newval)
    }
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return
        }
        let params = {}
        params.userId = this.userId
        params.probationDate = this.probationDate
        putProbation(params)
        this.$emit('update:visible', false)
      })
    },
    init(row) {
      let { formalDate, probation, userId } = row
      this.oldProbation = probation
      this.oldProbationDate = formalDate
      this.userId = userId
      this.$emit('update:visible', true)
    },
    calcDate(monthCount) {
      let isStr = this.oldProbationDate
      this.probationDate = moment(isStr)
        .add(monthCount, 'M')
        .format('YYYY-MM-DD')
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.newOrgDailog {
  .el-select {
    width: 100%;
  }
}
.addressLoading {
  text-align: center;
}
/deep/ .el-form-item__error {
  padding-top: 0;
}
/deep/ .newOrgDailog {
  .el-form--label-top {
    .el-form-item__label {
      padding: 0 0 0 0;
    }
  }
}
/deep/ .el-dialog__header {
  border-bottom: 1px solid #ccc;
}

.riskSpan {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

/deep/ .el-dialog__body {
  padding: 30px 35px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
</style>

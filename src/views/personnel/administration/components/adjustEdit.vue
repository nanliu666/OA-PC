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

    <div
      v-if="isReject.length && isReject.remark"
      class="comments"
    >
      <span class="commentsSpan">审批意见：</span>
      <span class="isRed">{{ isReject.remark }}</span>
    </div>

    <el-row
      class="probationPeriod"
      type="flex"
      :gutter="20"
    >
      <el-col :span="10">
        原定试用期：{{ oldProbation }} 个月
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
          @change="calcDate(form.probation)"
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
import { putProbation } from '@/api/personnel/person'
import { getApplyRecord } from '@/api/approval/approval'
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
      newEntryDate: null,
      form: {
        probation: null
      },
      int: null,
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
      isReject: {},
      rules: {
        probation: [{ required: true, message: '请输入对应时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return
        }

        putProbation({ userId: this.userId, probation: this.int }).then(() => {
          this.$message({ type: 'success', message: '操作成功' })
        })
        this.$emit('getTableData')
        return this.handleClose()
      })
    },
    async init(row) {
      let { formalDate, probation, userId, entryDate } = row
      this.entryDate = entryDate
      this.oldProbation = probation
      this.oldProbationDate = formalDate
      this.newEntryDate = entryDate
      this.userId = userId
      if (row.apprNo) {
        await getApplyRecord({ apprNo: row.apprNo }).then((res) => {
          this.isReject = res.filter((item) => item.result === 'Reject')
        })
      }
      this.$emit('update:visible', true)
    },
    calcDate(monthCount) {
      this.int = monthCount
      if (monthCount === 0) {
        this.probationDate = this.entryDate
      } else {
        let isStr = this.newEntryDate
        this.probationDate = moment(isStr)
          .add(monthCount, 'M')
          .format('YYYY-MM-DD')
      }
    },
    handleClose() {
      this.form.probation = ''
      this.probationDate = ''
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
  padding-bottom: 16px;
  border-bottom: 1px solid #ccc;
  margin: 0;
}

/deep/ .el-dialog__body {
  padding: 24px 35px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}

.comments {
  margin: 5px auto;
  background: rgba(113, 129, 153, 0.1);
  border-radius: 4px;
  padding: 0 15px;
  .commentsSpan {
    line-height: 34px;
    font-size: 14px;
  }
  .isRed {
    color: #ff0000;
  }
}

.probationPeriod {
  margin: 5px 0;
}
</style>

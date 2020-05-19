<template>
  <el-dialog
    :title="
      type === 'adjustment' ? '调整试用期' : type === 'createChild' ? '新建子组织' : '编辑组织'
    "
    :visible.sync="visible"
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
        原定试用期：{{ month }}
      </el-col>
      <el-col :span="10">
        原定计划转正日期：{{ time }}
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
        v-show="form.orgType !== 'Enterprise'"
        label="调整后试用期"
        prop="parentOrgId"
      >
        <el-select
          ref="parentOrgId"
          v-model="parentOrgId"
          placeholder="请输入"
        >
          <el-option
            v-for="item in parentOrgIdLabel"
            :key="item.item"
            :label="item.month"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="调整后计划转正日期"
        prop="userId"
      >
        <el-input
          v-model="conversiontiem"
          placeholder="请选择"
          suffix-icon="el-icon-date"
          :disabled="true"
        />
        <el-option
          v-for="item in leaderList"
          :key="item.userId"
          :label="item.name"
          :value="item.userId"
        />
        <div
          v-show="loadLeader"
          class="addressLoading"
        >
          <i class="el-icon-loading" />
        </div>
        <div
          v-show="noMoreLeader"
          style="text-align: center; font-size:14px;color: #606266;"
        >
          没有更多了
        </div>
      </el-form-item>
    </el-form>
    <span
      v-if="type === 'create'"
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
      >完成</el-button>
    </span>
    <span
      v-else
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
import { getExtend } from '@/api/personnel/roster'

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
      radioDisable: {
        Company: false,
        Department: false,
        Group: false
      },
      month: null,
      time: null,
      conversiontiem: null,
      parentOrgId: null,
      form: {
        orgType: ''
      },
      parentOrgIdLabel: [
        {
          month: '无试用期',
          value: 'on'
        },
        {
          month: '1月',
          value: 'one'
        },
        {
          month: '2月',
          value: 'two'
        },
        {
          month: '3月',
          value: 'three'
        },
        {
          month: '4月',
          value: 'four'
        },
        {
          month: '5月',
          value: 'five'
        },
        {
          month: '6月',
          value: 'six'
        }
      ],
      rules: {
        parentOrgId: [{ required: true, message: '请输入对应时间', trigger: 'blur' }],
        userId: [{ required: true, message: ' ', trigger: 'blur' }]
      },
      orgTree: [],
      leaderList: [],
      loadLeader: false,
      noMoreLeader: false,
      leaderPageNo: 1,
      loading: false
    }
  },
  watch: {
    parentOrgId: function(newval, oldval) {
      if (newval != oldval) this.conversionTime(newval)
    }
  },
  created() {
    getExtend().then((res) => {
      this.leaderList = res
    })
  },
  methods: {
    loadMoreLeader() {
      if (this.loadLeader || this.noMoreLeader) return
      this.loadLeader = true
    },
    submitAndCreate() {
      this.$refs.ruleForm.validate((valid, obj) => {
        if (!valid) {
          this.$message.error(obj[Object.keys(obj)[0]][0].message)
          return false
        }
      })
    },
    submit() {
      this.$refs.ruleForm.validate((valid, obj) => {
        if (valid) {
          this.$emit('update:visible', false)
        } else {
          this.$message.error(obj[Object.keys(obj)[0]][0].message)
          return false
        }
      })
    },
    create() {
      this.type = 'create'
      this.parentOrgIdLabel = ''
      this.$emit('update:visible', true)
      this.handleOrgNodeClick(this.orgTree[0])
    },
    creAdjustment(row) {
      let { formalDate, probation } = row
      this.month = probation
      this.time = formalDate
      this.type = 'adjustment'
      this.form.parentOrgType = row.orgType
      this.loadRadio()
      this.$emit('update:visible', true)
    },
    edit(row) {
      this.type = 'edit'
      this.form = JSON.parse(JSON.stringify(row))
      this.parentOrgIdLabel = this.findOrgName(row.parentOrgId)
      this.$emit('update:visible', true)
    },
    findOrgName(id) {
      let name = ''
      function deep(arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].orgId === id) {
            name = arr[i].orgName
            return
          }
          if (arr[i].children && arr[i].children.length > 0) {
            deep(arr[i].children)
          }
        }
      }
      deep(this.orgTree)
      return name
    },
    handleClose() {
      this.form = { orgType: '', parentOrgId: '' }
      this.radioDisable = {
        Company: false,
        Department: false,
        Group: false
      }
      this.$emit('update:visible', false)
    },
    loadRadio() {
      if (this.type === 'createChild') {
        if (this.form.parentOrgType === 'Enterprise') {
          this.form.orgType = 'Company'
        } else if (this.form.parentOrgType === 'Company') {
          this.form.orgType = 'Department'
        } else if (this.form.parentOrgType === 'Department') {
          this.radioDisable.Company = true
          this.form.orgType = 'Department'
        } else if (this.form.parentOrgType === 'Group') {
          this.radioDisable.Company = true
          this.radioDisable.Department = true
          this.form.orgType = 'Group'
        }
      }
    },
    handleOrgNodeClick(data) {
      this.form.parentOrgId = data.orgId
      this.parentOrgIdLabel = data.orgName
      if (this.type !== 'createChild') this.$refs.parentOrgId.blur()
    },
    conversionTime(newtiem) {
      // eslint-disable-next-line
      console.log('查看数据节点错误地点', newtiem)
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

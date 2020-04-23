<template>
  <el-dialog
    :title="type === 'create' ? '新建组织' : type === 'createChild' ? '新建子组织' : '编辑组织'"
    :visible.sync="visible"
    width="30%"
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <el-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="top"
      class="newOrgDailog"
    >
      <el-form-item
        label="组织名称"
        prop="orgName"
      >
        <el-input v-model="form.orgName" />
      </el-form-item>
      <el-form-item
        v-if="type === 'edit'"
        label="组织编码"
        prop="orgCode"
      >
        <el-input
          v-model="form.orgCode"
          disabled
        />
      </el-form-item>
      <el-form-item
        v-if="form.orgType !== 'Enterprise'"
        label="上级组织"
        prop="parentOrgId"
      >
        <el-select
          v-model="form.parentOrgId"
          placeholder="请选择上级组织"
          :disabled="type === 'createChild'"
        >
          <el-option
            label="区域一"
            value="shanghai"
          />
          <el-option
            label="区域二"
            value="beijing"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="组织类型"
        prop="orgType"
      >
        <el-radio-group v-model="form.orgType">
          <el-radio
            v-if="form.orgType == 'Enterprise'"
            label="Enterprise"
            disabled
          >
            企业
          </el-radio>
          <el-radio
            v-if="form.orgType !== 'Enterprise'"
            label="Company"
            :disabled="radioDisable.Company"
          >
            公司
          </el-radio>
          <el-radio
            v-if="form.orgType !== 'Enterprise'"
            label="Department"
            :disabled="radioDisable.Department"
          >
            部门
          </el-radio>
          <el-radio
            v-if="form.orgType !== 'Enterprise'"
            label="Group"
            :disabled="radioDisable.Group"
          >
            小组
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="组织负责人"
        prop="userId"
      >
        <el-select
          v-model="form.userId"
          placeholder="请选择活动区域"
        >
          <el-option
            label="区域一"
            value="shanghai"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="remark"
      >
        <el-input
          v-model="form.remark"
          type="textarea"
          :rows="2"
          placeholder="请输入描述"
        />
      </el-form-item>
    </el-form>
    <span
      v-if="type === 'create'"
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        @click="submitAndCreate"
      >完成并继续新建</el-button>
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
      form: {},
      rules: {
        orgName: [{ required: true, message: '请输入组织名称', trigger: 'blur' }],
        parentOrgId: [{ required: true, message: '请选择上级组织', trigger: 'change' }],
        orgType: [{ required: true, message: '请选择组织类型', trigger: 'change' }],
        orgCode: [{ required: true, message: '请输入组织编码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitAndCreate() {},
    submit() {
      this.$emit('update:visible', false)
    },
    create() {
      this.type = 'create'
      this.$emit('update:visible', true)
    },
    createChild(row) {
      this.type = 'createChild'
      this.form.parentOrgId = row.parentOrgId
      this.form.parentOrgType = row.orgType
      this.loadRadio()
      this.$emit('update:visible', true)
    },
    edit(row) {
      this.type = 'edit'
      this.form = row
      this.$emit('update:visible', true)
    },
    handleClose() {
      this.form = {}
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
</style>

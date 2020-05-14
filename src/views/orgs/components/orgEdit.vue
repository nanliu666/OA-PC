<template>
  <el-dialog
    v-loading="loading"
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
        v-show="form.orgType !== 'Enterprise'"
        label="上级组织"
        prop="parentOrgId"
      >
        <el-select
          ref="parentOrgId"
          v-model="form.parentOrgId"
          placeholder="请选择上级组织"
          :disabled="type === 'createChild'"
        >
          <el-option
            style="height: auto;padding:0"
            :value="form.parentOrgId"
            :label="parentOrgIdLabel"
          >
            <el-tree
              ref="orgTree"
              :data="orgTree"
              node-key="orgId"
              :props="{
                children: 'children',
                label: 'orgName'
              }"
              @node-click="handleOrgNodeClick"
            />
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="组织类型"
        prop="orgType"
      >
        <el-radio-group v-model="form.orgType">
          <el-radio
            v-if="form.orgType === 'Enterprise'"
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
          v-loadmore="loadMoreLeader"
          placeholder="请选择组织负责人"
        >
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
import { getOrgTreeSimple, editOrg, createOrg, getUserWorkList } from '@/api/org/org'

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
      form: {
        orgType: ''
      },
      parentOrgIdLabel: '',
      rules: {
        orgName: [{ required: true, message: '请输入组织名称', trigger: 'blur' }],
        parentOrgId: [{ required: true, message: '请选择上级组织', trigger: 'blur' }],
        orgType: [{ required: true, message: '请选择组织类型', trigger: 'change' }],
        orgCode: [{ required: true, message: '请输入组织编码', trigger: 'blur' }]
      },
      orgTree: [],
      leaderList: [],
      loadLeader: false,
      noMoreLeader: false,
      leaderPageNo: 1,
      loading: false
    }
  },
  created() {
    this.loadOrgTree()
    getUserWorkList({ pageNo: this.leaderPageNo, pageSize: 100 }).then((res) => {
      this.leaderList = res.data
      this.leaderPageNo += 1
    })
  },
  methods: {
    loadOrgTree() {
      getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
        this.orgTree = res
      })
    },
    loadMoreLeader() {
      if (this.loadLeader || this.noMoreLeader) return
      this.loadLeader = true
      getUserWorkList({ pageNo: this.leaderPageNo, pageSize: 100 }).then((res) => {
        if (res.data.length > 0) {
          this.leaderList.push(...res.data)
          this.leaderPageNo += 1
          this.loadLeader = false
        } else {
          this.noMoreLeader = true
          this.loadLeader = false
        }
      })
    },
    submitAndCreate() {
      this.$refs.ruleForm.validate((valid, obj) => {
        if (valid) {
          this.loading = true
          createOrg(this.form).then(() => {
            this.$message.success('创建成功')
            this.form = { orgType: '' }
            this.parentOrgIdLabel = ''
            this.$emit('refresh')
            this.loading = false
          })
        } else {
          this.$message.error(obj[Object.keys(obj)[0]][0].message)
          return false
        }
      })
    },
    submit() {
      this.$refs.ruleForm.validate((valid, obj) => {
        if (valid) {
          if (this.type !== 'edit') {
            this.loading = true
            createOrg(this.form).then(() => {
              this.$message.success('创建成功')
              this.$emit('refresh')
              this.loading = false
            })
          } else {
            this.loading = true
            editOrg(this.form).then(() => {
              this.$message.success('修改成功')
              this.$emit('refresh')
              this.loading = false
            })
          }
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
      this.loadOrgTree()
    },
    createChild(row) {
      this.type = 'createChild'
      this.handleOrgNodeClick(row)
      // this.form.parentOrgId = row.parentOrgId
      this.form.parentOrgType = row.orgType
      this.loadRadio()
      this.$emit('update:visible', true)
      this.loadOrgTree()
    },
    edit(row) {
      this.type = 'edit'
      this.form = JSON.parse(JSON.stringify(row))
      this.parentOrgIdLabel = this.findOrgName(row.parentOrgId)
      this.$emit('update:visible', true)
      this.loadOrgTree()
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
      // this.form.orgType = 'Company'
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
</style>

<template>
  <el-dialog
    title="添加分组"
    :visible="visible"
    width="600px"
    append-to-body
    :before-close="close"
  >
    <el-form
      ref="form"
      :model="form"
      label-position="top"
      :rules="rules"
      size="medium"
    >
      <el-form-item
        label="分组名称"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="交接人"
        prop="type"
      >
        <el-radio-group v-model="form.type">
          <el-radio
            v-for="(value, key) in typeDict"
            :key="key"
            :label="key"
          >
            {{ value }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-show="form.type === 'User'"
        label="选择人员"
        prop="userId"
      >
        <lazy-select
          v-model="form.userId"
          :load="loadUser"
          placeholder="请选择人员"
          searchable
          :option-props="{
            value: 'userId',
            key: 'userId',
            formatter: (item) => `${item.name}(${item.workNo})`
          }"
        />
      </el-form-item>
      <el-form-item
        v-show="form.type === 'Job'"
        label="部门"
        prop="orgId"
      >
        <el-tree-select
          ref="orgTree"
          v-model="form.orgId"
          :select-params="orgOptions.selectParams"
          :tree-params="orgOptions.treeParams"
          @change="handleOrgChange"
        />
      </el-form-item>
      <el-form-item
        v-show="form.type === 'Job'"
        label="职位"
        prop="jobId"
      >
        <el-select
          v-model="form.jobId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in jobList"
            :key="item.jobId"
            :label="item.jobName"
            :value="item.jobId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        @click="close"
      >取 消</el-button>
      <el-button
        v-loading="loading"
        size="medium"
        type="primary"
        @click="handleSubmit"
      >
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getUserWorkList, getOrgTreeSimple } from '@/api/org/org'
import { getOrgJob } from '@/api/personnel/roster'
import { modifyResignGroup, createResignGroup } from '@/api/personnel/settings'
// Org-部门负责人，User-指定人员，Job-指定职位
const typeDict = {
  Org: '部门负责人',
  User: '指定人员',
  Job: '指定职位'
}
const ruleDict = {
  Org: {
    name: [{ required: true, message: '请输入分组名称', trigger: 'input' }]
  },
  User: {
    name: [{ required: true, message: '请输入分组名称', trigger: 'input' }],
    userId: [{ required: true, message: '请选择指定人员', trigger: 'change' }]
  },
  Job: {
    name: [{ required: true, message: '请输入分组名称', trigger: 'input' }],
    orgId: [{ required: true, message: '请选择部门', trigger: 'change' }],
    jobId: [{ required: true, message: '请选择职位', trigger: 'change' }]
  }
}
export default {
  name: 'GroupEditDialog',
  components: {
    lazySelect: () => import('@/components/lazy-select/lazySelect'),
    elTreeSelect: () => import('@/components/elTreeSelect/elTreeSelect')
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        type: 'Org',
        userId: null,
        orgId: null,
        jobId: null
      },
      rules: {},
      typeDict,
      loading: false,
      orgOptions: {
        selectParams: {
          placeholder: '请选择组织',
          multiple: false
        },
        treeParams: {
          data: [],
          'check-strictly': true,
          'default-expand-all': false,
          'expand-on-click-node': false,
          clickParent: true,
          filterable: false,
          props: {
            children: 'children',
            label: 'orgName',
            disabled: 'disabled',
            value: 'orgId'
          }
        }
      },
      jobList: []
    }
  },
  watch: {
    'form.type': {
      handler(val) {
        this.rules = ruleDict[val]
        this.$nextTick(() => {
          this.$refs['form'].clearValidate()
        })
      }
    }
  },
  mounted() {
    this.loadOrgData()
  },
  methods: {
    loadUser(params) {
      return getUserWorkList(params)
    },
    handleOrgChange() {
      this.form.jobId = ''
      getOrgJob({ orgId: this.form.orgId }).then((res) => {
        this.jobList = res
      })
    },
    loadOrgData() {
      getOrgTreeSimple({ parentOrgId: '0' }).then((res) => {
        this.orgOptions.treeParams.data = res
        this.$refs['orgTree'] && this.$refs['orgTree'].treeDataUpdateFun(res)
      })
    },
    close() {
      this.clear()
      this.$emit('update:visible', false)
    },
    clear() {
      this.form = this.$options.data().form
      this.$refs['form'].clearValidate()
    },
    init(data) {
      Object.assign(this.form, data)
      this.$emit('update:visible', true)
    },
    handleSubmit() {
      let submitFunc = createResignGroup
      if (this.form.id) {
        submitFunc = modifyResignGroup
      }
      this.loading = true
      submitFunc(this.form)
        .then(() => {
          this.$message.success('操作成功')
          this.close()
          this.$emit('submit')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss">
.el-select {
  width: 100%;
}
</style>

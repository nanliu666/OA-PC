<template>
  <el-dialog
    :title="form.roleId ? '编辑角色' : '新建角色'"
    :visible.sync="roleVisible"
    width="500px"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :before-close="onClose"
    @opened="onOpened"
  >
    <div v-loading="loading">
      <avue-form
        ref="form"
        v-model="form"
        :option="option"
        @submit="handleSubmit"
      >
        <template
          slot="positions"
          slot-scope="{ column }"
        >
          <el-select
            v-model="form.positions"
            :no-data-text="column.noDataText"
            :placeholder="column.placeholder"
          >
            <el-option
              v-for="(item, index) in column.dicData"
              :key="index"
              :label="item[column.props.label]"
              :value="item[column.props.value]"
            />
          </el-select>
        </template>
        <template
          slot="jobs"
          slot-scope="scope"
        >
          <treeSelect
            v-model="form.jobs"
            :option="scope.column"
            @fiter="fiter"
          />
        </template>
      </avue-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          v-if="form.roleId"
          size="medium"
          @click="onClose"
        >
          取消
        </el-button>
        <el-button
          v-else
          size="medium"
          @click="onContinue"
        >
          保存并继续添加
        </el-button>
        <el-button
          type="primary"
          size="medium"
          @click="onClickSave(onClose)"
        >
          保存
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import treeSelect from '../../../components/treeSelect/treeSelect'
import { createRole, getJobs, updateRole } from '../../../api/system/role'

export default {
  name: 'RoleEdit',
  components: {
    treeSelect
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    jobs: {
      type: Array,
      default: () => []
    },
    positions: {
      type: Array,
      default: () => []
    },
    jobProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    positionProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    row: {
      type: Object,
      default: () => {
        return {}
      }
    },
    categoryId: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    const validateTree = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('请选择关联职位'))
      } else {
        callback()
      }
    }
    return {
      jobTree: [],
      noJobRTree: [],
      loading: false,
      roleVisible: true,
      form: {
        roleId: '',
        roleName: '',
        type: 'Job',
        remark: '',
        positions: '',
        jobs: []
      },
      option: {
        menuBtn: false,
        labelPosition: 'top',
        size: 'medium',
        column: [
          {
            label: '角色名称',
            prop: 'roleName',
            row: true,
            span: 24,
            placeholder: '请输入名称',
            rules: [
              {
                required: true,
                message: '请输入角色名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '关联类型',
            prop: 'type',
            type: 'radio',
            row: true,
            span: 24,
            rules: [
              {
                required: true,
                message: '请选择关联类型',
                trigger: 'change'
              }
            ],
            dicData: [
              {
                label: '关联职位',
                value: 'Job'
              },
              {
                label: '关联岗位',
                value: 'Position'
              },
              {
                label: '无关联',
                value: 'No'
              }
            ]
          },
          {
            label: '关联岗位',
            prop: 'positions',
            display: true,
            formslot: true,
            labelslot: true,
            multiple: true,
            errorslot: true,
            placeholder: '请选择关联岗位',
            noDataText: '您还未维护企业的岗位信息，请前往“岗位管理”处添加',
            span: 24,
            props: {
              label: this.positionProps.label,
              value: this.positionProps.id
            },
            dicData: [],
            rules: [
              {
                required: true,
                message: '请选择关联岗位',
                trigger: 'change'
              }
            ]
          },
          {
            label: '关联职位',
            prop: 'jobs',
            props: {
              label: this.jobProps.label,
              value: this.jobProps.id
            },
            formslot: true,
            labelslot: true,
            errorslot: true,
            span: 24,
            limitCheck: treeSelect,
            display: false,
            noDataText: '您还未维护任何职位信息，请前往“职位管理”处添加',
            placeholder: '请选择关联职位',
            rules: [
              {
                required: true,
                message: '请选择关联职位',
                trigger: 'blur'
              },
              {
                validator: validateTree,
                trigger: 'blur'
              }
            ],
            dicData: []
          },
          {
            label: '描述',
            prop: 'remark',
            type: 'textarea',
            row: true,
            span: 24,
            placeholder: '请输入描述'
          }
        ]
      }
    }
  },
  computed: {
    // roleVisible: {
    //   get: function() {
    //     return this.visible
    //   },
    //   set: function(val) {
    //     this.$emit('update:visible', val)
    //   }
    // }
  },
  watch: {
    row: {
      handler: function(newVal) {
        let { roleId, roleName, type, remark, positions, jobs } = { ...newVal }

        let newpositions = []
        if (positions) {
          positions.map((it) => {
            newpositions.push(it.positionId)
          })
        }

        positions = newpositions
        let newjobs = []
        if (jobs) {
          jobs.map((it) => {
            newjobs.push(it.jobId)
          })
        }

        jobs = newjobs
        this.form = {
          roleId,
          roleName,
          type,
          remark,
          positions,
          jobs
        }
      },
      immediate: true,
      deep: true
    },
    roleVisible: {
      handler: function() {
        this.$emit('update:visible', this.roleVisible)
      }
    },
    'form.type': {
      handler(val) {
        const positionColumn = this.findObject(this.option.column, 'positions')
        const jobColumn = this.findObject(this.option.column, 'jobs')
        if (val === 'Position') {
          positionColumn.display = true
          jobColumn.display = false
        } else if (val === 'Job') {
          positionColumn.display = false
          jobColumn.display = true
        } else {
          jobColumn.display = false
          positionColumn.display = false
        }
      },
      immediate: true
    },
    jobs: {
      handler(val) {
        const jobColumn = this.findObject(this.option.column, 'jobs')
        if (this.row.roleId) {
          this.recursion(val, this.row.roleId)
        }
        jobColumn.dicData = val
      },
      immediate: true,
      deep: true
    },
    positions: {
      handler(val) {
        if (val[0]) {
          const positionColumn = this.findObject(this.option.column, 'positions')
          positionColumn.dicData = val
        }
      },
      immediate: true,
      deep: true
    },
    'form.jobs': {
      // 清空关联职位的校验
      handler() {
        this.$refs['form'].validateField('jobs', () => {})
      },
      deep: true
    }
  },
  mounted() {
    this.getJobsFunc()
  },
  methods: {
    getJobsFunc() {
      let params = {
        jobName: ''
      }
      getJobs(params).then((res) => {
        let allData = []
        let relationData = []
        this.jobFilter(res, allData, relationData)

        const jobColumn = this.findObject(this.option.column, 'jobs')
        this.noJobRTree = relationData
        this.filterTree(this.noJobRTree)
        this.jobTree = allData
        jobColumn.dicData = allData
      })
    },
    filterTree(data) {
      data.map((it) => {
        if (!(it.children && it.children.length > 0) && it.orgType) {
          it.disabled = true
        }
        if (it.children && it.children.length > 0) {
          this.filterTree(it.children)
        }
      })
    },
    fiter(check) {
      const jobColumn = this.findObject(this.option.column, 'jobs')
      if (check) {
        jobColumn.dicData = this.noJobRTree
      } else {
        jobColumn.dicData = this.jobTree
      }
      // this.$emit('fiter', check,this.row.roleId)
    },
    jobFilter(arr, data, data2) {
      arr.filter((item) => {
        const obj = {
          children: []
        }
        const obj2 = {
          children: []
        }
        if (item.jobs && item.jobs.length > 0) {
          item.jobs.forEach((item) => {
            const job = {
              label: item.jobName,
              id: item.jobId,
              roles: item.roles
            }
            obj.children.push(job)
            if (!(item.roles && item.roles.length > 0)) {
              obj2.children.push(job)
            } else {
              job.disabled = true
            }
            if (item.roles && item.roles.length > 0 && item.roles[0].roleId === this.row.roleId) {
              job.disabled = false
              obj2.children.push(job)
            }
          })
        }
        if (item.orgType) {
          obj.label = item.orgName
          obj.id = item.orgId
          obj2.label = item.orgName
          obj2.id = item.orgId
          obj2.orgType = item.orgType
          if (item.children && item.children.length > 0) {
            this.jobFilter(item.children, obj.children, obj2.children)
          } else {
            obj.disabled = true
          }
        }
        data.push(obj)
        data2.push(obj2)
      })
    },
    recursion(data, roleId) {
      data.map((it) => {
        if (it.roles && it.roles.length > 0 && it.roles[0].roleId === roleId) {
          it.disabled = false
        }
        if (it.children && it.children.length > 0) {
          this.recursion(it.children, roleId)
        }
      })
    },

    findObject(column, key) {
      return column.find((item) => item.prop === key)
    },

    onOpened() {
      if (this.row.roleId) {
        this.$nextTick(() => {
          const { roleId, roleName, type, remark, jobs, positions } = this.row
          const form = this.form
          form.roleId = roleId
          form.roleName = roleName
          form.type = type
          form.remark = remark
          if (jobs && jobs.length > 0) {
            form.jobs = jobs.map((it) => it.jobId)
          }
          if (positions && positions.length > 0) {
            form.positions = positions[0].positionId
          }
        })
      }
    },

    // 保存并继续添加
    onContinue() {
      this.onClickSave(this.clearForm)
    },
    // 点击保存
    onClickSave(callback) {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          this.form.roleId ? this.updateFunc() : this.createFunc(callback)
        }
      })
    },
    //新建角色
    createFunc(callback) {
      let positions = [{ positionId: this.form.positions.length === 0 ? '' : this.form.positions }]
      let jobs = []
      this.form.jobs.filter((it) => {
        jobs.push({ jobId: it })
      })
      const params = {
        ...this.form,
        positions,
        jobs,
        categoryId: this.categoryId
      }
      this.loading = true
      createRole(params)
        .then(() => {
          this.loading = false
          this.$message.success('新建角色成功')
          this.$emit('reload')
          callback()
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 更新角色
    updateFunc() {
      let positions = [{ positionId: this.form.positions.length === 0 ? '' : this.form.positions }]
      let jobs = []
      this.form.jobs.filter((it) => {
        jobs.push({ jobId: it })
      })
      const params = {
        ...this.form,
        positions,
        jobs,
        categoryId: this.categoryId
      }
      this.loading = true
      updateRole(params).then(() => {
        this.loading = false
        this.$message.success('编辑角色成功')
        this.$emit('reload')
        this.onClose()
      })
    },
    // 关闭弹窗
    onClose() {
      this.roleVisible = false
    },

    // 清空表单
    clearForm() {
      this.$refs.form.resetForm()
      this.form.roleId = ''
      this.form.positions = []
      this.form.jobs = []
    },

    // 清除avue表单组件防重提交
    handleSubmit(form, done) {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__header {
  padding: 16px 0;
  margin: 0 24px;
  border-bottom: 1px solid rgba(208, 211, 214, 0.44);
  font-size: 18px;
  color: #202940;
  line-height: 24px;
}

/deep/ .el-dialog__body {
  padding: 24px;
}

/deep/ .el-dialog__footer {
  padding: 0px 24px 24px;
}

/deep/ .el-form-item__label {
  line-height: 20px;
  font-size: 14px;
  color: #0f0000;
}

/deep/ .el-form-item {
  margin-bottom: 24px;
}
.dialog-footer {
  text-align: right;
}

/deep/ .is-error {
  .tree-button {
    border-color: #f56c6c;
  }
}

/deep/ .el-radio {
  margin-right: 20px;
}
</style>

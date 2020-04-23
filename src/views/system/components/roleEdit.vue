<template>
  <el-dialog
    :title="form.roleId ? '编辑角色' : '新建角色'"
    :visible.sync="roleVisible"
    width="500px"
    top="30px"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :before-close="onClose"
  >
    <div>
      <avue-form
        ref="form"
        v-model="form"
        :option="option"
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
          />
        </template>
      </avue-form>
    </div>

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
  </el-dialog>
</template>

<script>
import treeSelect from '../../../components/treeSelect/treeSelect'
import { createRole, updateRole } from '../../../api/system/role'

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
      form: {
        roleId: '',
        roleName: '',
        type: 'No',
        remark: '',
        positions: [],
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
            limitCheck: true,
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
    roleVisible: {
      get: function() {
        return this.visible
      },
      set: function(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  watch: {
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
    row: {
      handler(val) {
        this.$nextTick(() => {
          const { roleId, roleName, type, remark, jobs, positions } = val
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
      },
      deep: true
    },
    jobs: {
      handler(val) {
        const jobColumn = this.findObject(this.option.column, 'jobs')
        jobColumn.dicData = val
      },
      immediate: true,
      deep: true
    },
    positions: {
      handler(val) {
        if (val[0]) {
          const positionColumn = this.findObject(this.option.column, 'positions')
          positionColumn.dicData = val[0].children
        }
      },
      immediate: true,
      deep: true
    },
    'form.jobs': {
      handler() {
        this.$refs['form'].validateField('jobs', () => {})
      },
      deep: true
    }
  },
  methods: {
    findObject(column, key) {
      return column.find((item) => item.prop === key)
    },

    onContinue() {
      this.onClickSave(this.clearForm)
    },
    onClickSave(callback) {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          this.form.roleId ? this.updateFunc() : this.saveFunc(callback)
        }
      })
    },
    saveFunc(callback) {
      const params = {
        ...this.form
      }
      createRole(params).then(() => {
        this.$message.success('新建角色成功')
        callback()
      })
    },
    updateFunc() {
      const params = {
        ...this.form
      }
      updateRole(params).then(() => {
        this.$message.success('编辑角色成功')
        this.onClose()
      })
    },
    onClose() {
      this.clearForm()
      this.$emit('update:visible', false)
    },

    clearForm() {
      this.$refs.form.resetForm()
      this.form.roleId = ''
      this.form.positions = []
      this.form.jobs = []
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
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

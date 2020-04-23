<template>
  <el-dialog
    title="新建/编辑角色"
    :visible.sync="roleVisible"
    width="500px"
    top="30px"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
  >
    <div>
      <avue-form
        ref="form"
        v-model="form"
        :option="option"
      >
        <template
          slot="positions"
          slot-scope="scope"
        >
          <treeSelect
            v-model="form.positions"
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
        size="medium"
        @click="onContinue"
      >
        保存并继续添加
      </el-button>
      <el-button
        type="primary"
        size="medium"
        @click="onClickSave"
      >
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import treeSelect from '../../../components/treeSelect/treeSelect'

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
    treeList: {
      type: Array,
      default: () => []
    },
    positions: {
      type: Array,
      default: () => []
    },
    props: {
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
            prop: 'jobs',
            type: 'select',
            display: true,
            placeholder: '请选择关联岗位',
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
            prop: 'positions',
            props: {
              label: this.props.label,
              value: this.props.id
            },
            formslot: true,
            labelslot: true,
            errorslot: true,
            span: 24,
            limitCheck: true,
            display: false,
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
    treeList: {
      handler(val) {
        const positionColumn = this.findObject(this.option.column, 'positions')
        positionColumn.dicData = val
      },
      deep: true
    },
    positions: {
      handler(val) {
        const jobColumn = this.findObject(this.option.column, 'jobs')
        jobColumn.dicData = val
      },
      deep: true
    },
    'form.positions': {
      handler() {
        // this.$refs['form'].validateField('positions', () => {
        // })
      },
      deep: true
    }
  },
  methods: {
    findObject(column, key) {
      return column.find((item) => item.prop === key)
    },

    onContinue() {},
    onClickSave() {
      this.$refs.form.validate((vaild) => {
        if (!vaild) {
          return
        }
      })
    },
    saveFunc() {},
    onClose() {
      this.$emit('update:visible', false)
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
</style>

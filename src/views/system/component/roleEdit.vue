<template>
  <el-dialog
    title="新建/编辑角色"
    :visible.sync="roleVisible"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
  >
    <avue-form
      ref="form"
      v-model="form"
      :option="option"
    >
      <template
        slot="relaPosition"
        slot-scope="scope"
      >
        <treeSelect
          v-model="form.relaPosition"
          :option="scope.column"
        />
      </template>
    </avue-form>
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
import treeSelect from './treeSelect'
export default {
  name: 'RoleEdit',
  components: {
    treeSelect
  },
  props: {
    visible: {
      type: Boolean,
      default: false
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
        type: 0,
        remark: '',
        relaPosition: ''
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
                value: 0
              },
              {
                label: '关联岗位',
                value: 1
              },
              {
                label: '无关联',
                value: 2
              }
            ]
          },
          {
            label: '关联岗位',
            prop: 'rela',
            type: 'select',
            display: true,
            placeholder: '请选择关联岗位',
            span: 24,
            dicData: [
              {
                label: '关联职位',
                value: 0
              },
              {
                label: '关联岗位',
                value: 1
              },
              {
                label: '无关联',
                value: 2
              }
            ],
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
            prop: 'relaPosition',
            props: {
              label: 'label',
              value: 'id'
            },
            formslot: true,
            labelslot: true,
            errorslot: true,
            span: 24,
            limitCheck: true,
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
            dicData: [
              {
                id: 1,
                label: '一级 1',
                children: [
                  {
                    id: 4,
                    label: '二级 1-1',
                    children: [
                      {
                        id: 9,
                        label: '三级 1-1-1'
                      },
                      {
                        id: 10,
                        label: '三级 1-1-2'
                      }
                    ]
                  }
                ]
              },
              {
                id: 2,
                label: '一级 2',
                children: [
                  {
                    id: 5,
                    label: '二级 2-1'
                  },
                  {
                    id: 6,
                    label: '二级 2-2'
                  }
                ]
              },
              {
                id: 3,
                label: '一级 3',
                children: [
                  {
                    id: 7,
                    label: '二级 3-1'
                  },
                  {
                    id: 8,
                    label: '二级 3-2'
                  }
                ]
              }
            ]
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
    'form.type'() {
      var column = this.findObject(this.option.column, 'rela')
      if (this.form.text1 === 0) {
        column.display = true
      } else {
        column.display = false
      }
    }
  },
  methods: {
    findObject(column, key) {
      column.find((item) => item.prop === key)
    },

    onContinue() {},
    onClickSave() {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          this.$message.success(JSON.stringify(this.obj0))
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
/deep/.is-error {
  .tree-button {
    border-color: #f56c6c;
  }
}
</style>

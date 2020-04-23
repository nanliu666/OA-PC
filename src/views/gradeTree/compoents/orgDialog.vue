<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialog"
      width="550px"
      :modal-append-to-body="false"
      :before-close="handleClose"
    >
      <div>
        <div>
          <avue-form
            ref="form"
            v-model="form"
            :option="option"
          >
            <template
              slot="parentOrgId"
              slot-scope="scope"
            >
              <treeSelect
                v-model="form.parentOrgId"
                :is-single="isSingle"
                :option="scope.column"
              />
            </template>
          </avue-form>
        </div>
        <div
          v-if="!isEdit"
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
        <div
          v-else
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="medium"
            @click="onContinue"
          >
            取消
          </el-button>
          <el-button
            type="primary"
            size="medium"
            @click="onClickSave"
          >
            保存
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeSelect from '../../../components/treeSelect/treeSelect'
const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]
export default {
  name: 'OrgDialog',
  components: { treeSelect },
  props: {
    isEdit: {
      type: Boolean
    },
    title: {
      type: String
    },
    dialogVisible: {
      type: Boolean
    },
    visible: {
      type: Boolean,
      default: false
    },
    treechecked: {
      type: Array,
      default: function() {
        return []
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
      isSingle: true,
      form: {
        orgName: '',
        remark: '',
        orgType: '',
        userId: '',
        parentOrgId: []
      },
      option: {
        menuBtn: false,
        labelPosition: 'top',
        size: 'medium',
        column: [
          {
            label: '组织名称',
            prop: 'orgName',
            type: 'input',
            row: true,
            span: 24,
            placeholder: '请输入名称',
            rules: [
              {
                required: true,
                message: '请输入职位名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '上级组织',
            prop: 'parentOrgId',
            props: {
              label: 'label',
              value: 'id'
            },
            formslot: true,
            labelslot: true,
            errorslot: true,
            span: 24,
            limitCheck: true,
            placeholder: '请选择所属组织',
            rules: [
              {
                required: true,
                message: '请选择所属组织',
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
            label: '组织类型',
            prop: 'orgType',
            type: 'radio',
            row: true,
            span: 24,
            rules: [
              {
                required: true,
                message: '请选择组织类型',
                trigger: 'change'
              }
            ],
            dicData: [
              {
                label: '公司',
                value: 0
              },
              {
                label: '部门',
                value: 1
              },
              {
                label: '小组',
                value: 2
              }
            ]
          },

          {
            label: '组织负责人',
            prop: 'userId',
            type: 'select',
            display: true,
            filterable: true,
            multiple: true,
            placeholder: '请选择组织负责人',
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
            label: '描述',
            prop: 'remark',
            type: 'textarea',
            row: true,
            span: 24,
            placeholder: '请输入描述'
          }
        ]
      },
      dialog: false,
      options
    }
  },
  watch: {
    'form.parentOrgId': {
      handler: function(val) {
        if (val.length > 0) {
          this.option.column[3].placeholder = '请选择'
          this.option.column[3].dicData = this.options
          // this.option.column[3].placeholder = '请先选择所属组织'
          // this.set()
        } else {
          this.option.column[3].placeholder = '请先选择上级'
          this.option.column[3].dicData = []
          this.form.userId = ''
        }
      },
      deep: true //对象内部的属性监听，也叫深度监听
    },
    dialog: {
      handler: function() {
        this.$emit('update:dialogVisible', this.dialog)
        if (!this.dialog) {
          this.$refs.form.resetFields()
        }
      }
    },
    dialogVisible: {
      handler: function(val) {
        this.dialog = val
      },
      deep: true //对象内部的属性监听，也叫深度监听
    },
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    onContinue() {
      this.dialog = false
    },
    onClickSave() {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          this.dialog = false
        }
      })
    },
    handleClose() {
      this.dialog = false
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
/deep/.el-dialog__footer {
  padding: 0px 24px 24px;
}
/deep/.el-form-item__label {
  line-height: 20px;
  font-size: 14px;
  color: #0f0000;
}
/deep/ .el-form-item {
  margin-bottom: 24px;
}
.dialog-footer {
  text-align: center;
}
</style>

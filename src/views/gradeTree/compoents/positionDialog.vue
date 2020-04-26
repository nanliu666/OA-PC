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
              slot="orgId"
              slot-scope="scope"
            >
              <treeSelect
                v-model="form.orgId"
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
            @click="handleModity"
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
import { postV1Job, putV1Job } from '@/api/organize/position'
import { getOrganization } from '@/api/organize/grade'

const options = [
  {
    label: 'CEO',
    value: '001'
  },
  {
    label: ' 百利宏化工CEO',
    value: '002'
  },
  {
    label: '百利宏医药工CEO',
    value: '003'
  },
  {
    label: '事业部经理1',
    value: '004'
  },
  {
    label: '事业部经理2',
    value: '005'
  },
  {
    label: '事业部经理3',
    value: '006'
  },
  {
    label: '事业部经理4',
    value: '007'
  },
  {
    label: '飞洒',
    value: '008'
  },
  {
    label: '发撒',
    value: '009'
  },
  {
    label: '富士达',
    value: '0010'
  },
  {
    label: '士大夫',
    value: '0011'
  }
]
const category = [
  {
    value: '1',
    label: '研发'
  },
  {
    value: '2',
    label: '测试'
  },
  {
    value: '3',
    label: '前端'
  },
  {
    value: '4',
    label: 'java'
  },
  {
    value: '5',
    label: '项目经理'
  }
]
let orgList = []
export default {
  name: 'PositionDialog',
  components: {
    treeSelect
  },
  props: {
    isEdit: {
      type: Boolean
    },
    orgData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    data: {
      type: Object,
      default: function() {
        return {}
      }
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
        jobName: '', //职位名称
        categoryId: '', //职位类别id
        remark: '', // 描述
        parentId: '', //所属职位
        orgId: [] //所属组织
      },
      option: {
        menuBtn: false,
        labelPosition: 'top',
        size: 'medium',
        column: [
          {
            label: '职位名称',
            prop: 'jobName',
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
            label: '职位类别',
            prop: 'categoryId',
            type: 'select',
            row: true,
            span: 24,
            rules: [
              {
                required: true,
                message: '请选择职位类别',
                trigger: 'change'
              }
            ],
            dicData: category
          },
          {
            label: '所属组织',
            prop: 'orgId',
            props: {
              label: 'label',
              value: 'id'
            },
            formslot: true,
            labelslot: true,
            errorslot: true,
            span: 24,
            limitCheck: false,
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
            dicData: orgList
          },
          {
            label: '上级职位',
            prop: 'parentId',
            type: 'select',
            display: true,
            filterable: true,
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
            label: '描述',
            prop: 'remark',
            type: 'textarea',
            row: true,
            span: 24,
            placeholder: '请输入描述'
          }
        ]
      },
      dialog: true,
      options
    }
  },
  watch: {
    'form.orgId': {
      handler: function(val) {
        if (val.length > 0) {
          this.option.column[3].placeholder = '请选择'
          this.option.column[3].dicData = this.options
        } else {
          this.option.column[3].placeholder = '请先选择所属组织'
          this.option.column[3].dicData = []
          this.form.parentId = ''
        }
      },
      deep: true //对象内部的属性监听，也叫深度监听
    },
    dialog: {
      handler: function() {
        this.$emit('update:dialogVisible', this.dialog)
        if (!this.dialog) {
          this.$refs.form.resetFields()
          // this.form.orgId = []
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
    },
    data: {
      handler: function(val) {
        if (val.jobName) {
          this.form.jobName = val.jobName
          this.form.categoryId = val.categoryId
          this.form.remark = val.remark
          let orgId = val.orgId
          if (orgId) {
            this.form.orgId = [orgId]
          }
          this.form.parentId = val.parentId
        }
      },
      deep: true,
      immediate: true
    },
    orgData: {
      handler: function(val) {
        if (this.isEdit) {
          // jobName: '', //职位名称
          //   categoryId: '',//职位类别id
          //   remark: '', // 描述
          //   parentId: '', //所属职位
          //   orgId: [] //所属组织
          this.form.jobName = val.name
          this.form.categoryId = val.categoryId
          this.form.remark = val.remark
          let orgId = val.parentId
          if (orgId) {
            this.form.orgId = [orgId]
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.getorgData()
  },
  methods: {
    getorgData() {
      let params = {
        parentOrgId: '',
        orgName: '',
        orgType: '',
        userId: '',
        minUserNum: '',
        maxUserNum: ''
      }
      getOrganization(params).then((res) => {
        // console.log(res)
        orgList = res
        function maps(data) {
          data.map((it) => {
            it.id = it.orgId
            it.label = it.orgName
            if (it.children.length > 0) {
              maps(it.children)
            }
          })
        }
        maps(orgList)
        this.option.column[2].dicData = orgList
      })
    },
    onContinue() {
      this.$emit('update:dialogVisible', false)
    },
    handleModity() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let { jobName, categoryId, remark, parentId, orgId } = { ...this.form }
          let params = {
            jobName,
            categoryId,
            remark,
            parentId,
            orgId: orgId[0]
          }
          putV1Job(params).then(() => {
            this.$message.success('修改成功')
            this.$emit('onsubmit', params)
            this.$emit('update:dialogVisible', false)
          })
        }
      })
    },
    onClickSave() {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          // this.$message.success(JSON.stringify(this.obj0))
          let { jobName, categoryId, remark, parentId, orgId } = { ...this.form }
          let params = {
            jobName,
            categoryId,
            remark,
            parentId,
            orgId: orgId[0]
          }
          postV1Job(params).then(() => {
            this.$message.success('保存成功')
            this.$emit('onsubmit', params)
            this.$emit('update:dialogVisible', false)
          })
        }
      })
    },
    handleClose() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style scoped>
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
  text-align: center;
}
</style>

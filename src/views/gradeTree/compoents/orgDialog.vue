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
                :limit-check="limitCheck"
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
            @click="againAdd"
          >
            保存并继续添加
          </el-button>
          <el-button
            type="primary"
            size="medium"
            @click="onClickAdd"
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
let orgList = []
import { getOrganization, postOrganization, putOrganization } from '@/api/organize/grade'
const consc = [
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
export default {
  name: 'OrgDialog',
  components: { treeSelect },
  props: {
    isEdit: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    title: {
      type: String,
      default: function() {
        return ''
      }
    },
    dialogVisible: {
      type: Boolean
    },
    orgData: {
      type: Object,
      default: function() {
        return {}
      }
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
      limitCheck: true,
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
            label: '组织类型',
            prop: 'orgType',
            type: 'radio',
            row: true,
            span: 24,
            rules: [
              {
                required: true,
                message: '请选择组织类型',
                trigger: 'blur'
              }
            ],
            dicData: [
              {
                label: '公司',
                value: 0,
                list: ['Enterprise', 'Company'],
                disabled: false
              },
              {
                label: '部门',
                value: 1,
                list: ['Enterprise', 'Company', 'Department'],
                disabled: false
              },
              {
                label: '小组',
                value: 2,
                list: ['Enterprise', 'Company', 'Department', 'Group'],
                disabled: false
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
            dicData: consc,
            rules: [
              {
                required: true,
                message: '请选择关联岗位',
                trigger: 'blur'
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
    'form.parentOrgId': {
      handler: function() {
        // if (val.length > 0) {
        //   this.option.column[3].placeholder = '请选择'
        //   this.option.column[3].dicData = this.options
        //   // this.option.column[3].placeholder = '请先选择所属组织'
        //   // this.set()
        // } else {
        //   this.option.column[3].placeholder = '请先选择上级'
        //   this.option.column[3].dicData = []
        //   this.form.userId = ''
        // }
      },
      deep: true //对象内部的属性监听，也叫深度监听
    },

    dialogVisible: {
      handler: function(val) {
        this.dialog = val
      },
      deep: true //对象内部的属性监听，也叫深度监听
    },
    orgData: {
      handler: function(val) {
        if (this.isEdit) {
          this.form.orgName = this.orgData.name
          let id = this.orgData.id
          this.form.parentOrgId = [id]
          this.form.remark = this.orgData.remark
          this.form.userId = this.orgData.userId
          let types = {
            Enterprise: 0,
            Company: 0,
            Department: 1,
            Group: 2
          }
          this.form.orgType = types[this.orgData.type]
        }
        this.option.column[2].dicData.map((it) => {
          if (it.list.includes(val.type)) {
            it.disabled = false
          } else {
            it.disabled = true
          }
        })
      },
      immediate: true,
      deep: true
    },
    filterText(val) {
      this.$refs.tree.filter(val)
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
        this.option.column[1].dicData = orgList
      })
    },
    onContinue() {
      this.$emit('update:dialogVisible', false)
    },
    postOrg() {},
    onClickAdd({ ishow = true }) {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          let { orgName, parentOrgId, orgType, userId, remark } = { ...this.form }
          parentOrgId = parentOrgId.join(',')
          userId = userId.join(',')
          let type = {
            0: 'Company',
            1: 'Department',
            2: 'Group'
          }
          orgType = type[orgType]
          let params = {
            orgName,
            parentOrgId,
            orgType,
            userId,
            remark
          }
          postOrganization(params).then(() => {
            this.$message.success('添加成功')
          })
        }
      })
      if (ishow) {
        this.$emit('update:dialogVisible', false)
      } else {
        this.$refs.form.resetFields()
        this.form.userId = ''
      }
    },
    againAdd() {
      this.onClickAdd({ ishow: false })
    },
    onClickSave() {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          let { orgName, parentOrgId, orgType, userId, remark } = { ...this.form }
          parentOrgId = parentOrgId.join(',')
          userId = userId.join(',')
          let type = {
            0: 'Company',
            1: 'Department',
            2: 'Group'
          }
          orgType = type[orgType]
          let params = {
            orgName,
            parentOrgId,
            orgType,
            userId,
            remark
          }
          putOrganization(params).then(() => {
            this.$message.success('修改成功')
            this.handleClose()
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

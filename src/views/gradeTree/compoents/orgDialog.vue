<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialog"
      width="550px"
      :modal-append-to-body="false"
      :before-close="handleClose"
    >
      <div v-loading="loading">
        <div>
          <avue-form
            ref="form"
            v-model="form"
            :option="option"
          >
            <template slot="userId">
              <el-select
                v-model="form.userId"
                v-loadmore="loadMoreLeader"
                placeholder="请选择组织负责人"
                clearable
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
              </el-select>
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
// import treeSelect from '../../../components/treeSelect/treeSelect'
const options = []
let orgList = []
import { getOrganization, postOrganization, putOrganization } from '@/api/organize/grade'
import { getUserWorkList } from '@/api/org/org'
const consc = []
export default {
  name: 'OrgDialog',
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
      allType: ['Enterprise', 'Company', 'Department', 'Group', 'Jod'],
      key: ['orgName', 'code', 'parentOrgId', 'orgType', 'userId', 'remark'],
      loading: false,
      leaderList: [],
      totalPage: '',
      leaderPageNo: 1,
      loadLeader: false,
      limitCheck: true,
      isSingle: true,

      form: {
        orgName: '',
        remark: '',
        orgType: '',
        userId: '',
        parentOrgId: '',
        code: ''
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
            label: '组织编码',
            prop: 'code',
            type: 'input',
            row: true,
            display: false,
            span: 24,
            placeholder: '请输入组织编码',
            disabled: true,
            rules: [
              {
                required: true,
                message: '请输入组织编码',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '上级组织',
            prop: 'parentOrgId',
            type: 'tree',
            props: {
              label: 'label',
              value: 'id'
            },
            span: 24,
            disabled: false,
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
            dicData: orgList,
            change: ({ value }) => {
              if (value && value !== '0') {
                // orgList.filter(it)
                let orgs = []
                this.filterOrg(orgList, value, orgs)

                let selectIndex = this.allType.findIndex((value) => value === orgs[0].orgType)
                let dataIndex = this.allType.findIndex((value) => value === this.orgData.type)
                // let type = selectIndex > dataIndex ? orgs[0].orgType : this.orgData.type
                let type = orgs[0].orgType
                if (selectIndex > dataIndex) {
                  this.form.orgType = ''
                }

                let i = this.find_index(this.option.column, 'orgType')
                this.option.column[i].dicData.map((it, index) => {
                  if (it.list.includes(type)) {
                    // if (selectIndex > dataIndex) {
                    if (!this.form.orgType) this.form.orgType = index
                    // }
                    it.disabled = false
                  } else {
                    it.disabled = true
                  }
                })
              }
            }
          },
          {
            label: '组织类型',
            prop: 'orgType',
            type: 'radio',
            limitCheck: false,
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
            formslot: true,
            labelslot: true,
            errorslot: true,
            display: true,
            filterable: true,
            multiple: true,
            clearable: true,
            placeholder: '请选择组织负责人',
            span: 24,
            dicData: consc
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
      handler: function() {},
      deep: true //对象内部的属性监听，也叫深度监听
    },

    dialogVisible: {
      handler: function(val) {
        this.dialog = val
      },
      deep: true //对象内部的属性监听，也叫深度监听
    },
    isEdit: {
      handler(val) {
        if (val) {
          let i = this.find_index(this.option.column, 'code')
          this.option.column[i].display = true
          if (this.orgData.type === 'Enterprise' && val) {
            // key:['orgName','code','parentOrgId','orgType','userId','remark'],
            let i = this.find_index(this.option.column, 'parentOrgId')
            let index = this.find_index(this.option.column, 'orgType')
            this.option.column[i].display = false
            // this.option.column[3].display =false
            this.option.column[index].dicData = [
              {
                label: '企业',
                value: 3,
                list: ['Enterprise', 'Company'],
                disabled: false
              }
            ]
          }
        }
      },
      immediate: true
    },
    orgData: {
      handler: async function(val) {
        // console.log(val)
        this.loading = true
        await this.getorgData()
        await this.getWordList()
        this.loading = false
        if (this.isEdit) {
          this.form.orgName = this.orgData.name
          this.form.code = this.orgData.code
          this.form.parentOrgId = this.orgData.parentId
          this.form.remark = this.orgData.remark
          this.form.userId = this.orgData.userId
          if (val.parentId === '0') {
            // key:['orgName','code','parentOrgId','orgType','userId','remark'],
            // setTimeout(()=>{
            let i = this.find_index(this.option.column, 'code')
            let index = this.find_index(this.option.column, 'parentOrgId')
            this.option.column[i].disabled = true
            this.option.column[index].disabled = true
            // },500)
          }
        } else {
          setTimeout(() => {
            let i = this.find_index(this.option.column, 'parentOrgId')
            this.form.parentOrgId = this.orgData.id
            this.option.column[i].disabled = true
          }, 500)
        }
        let types = {
          Enterprise: 0,
          Company: 0,
          Department: 1,
          Group: 2
        }
        let i = this.find_index(this.option.column, 'orgType')
        this.form.orgType = types[this.orgData.type]
        this.option.column[i].dicData.map((it) => {
          if (it.list.includes(val.type)) {
            it.disabled = false
          } else {
            it.disabled = true
          }
        })
        if (this.orgData.type === 'Enterprise' && this.isEdit) {
          let i = this.find_index(this.option.column, 'parentOrgId')
          this.option.column[i].display = false
          this.form.orgType = 3
        }
      },
      immediate: true,
      deep: true
    },
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {},
  methods: {
    filterOrg(org, value, orgs) {
      org.filter((it) => {
        if (it.id === value) {
          orgs.push(it)
          // orgs = JSON.parse(JSON.stringify(it))
        }
        if (it.children && it.children.length > 0) {
          this.filterOrg(it.children, value, orgs)
        }
      })
    },
    getWordList() {
      return new Promise((resolve, reject) => {
        getUserWorkList({ pageNo: this.leaderPageNo, pageSize: 1000 })
          .then((res) => {
            this.leaderList = res.data
            this.totalPage = res.totalPage
            this.leaderPageNo += 1
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    loadMoreLeader() {
      if (this.loadLeader) return
      if (this.leaderPageNo > this.totalPage) return
      this.loadLeader = true
      getUserWorkList({ pageNo: this.leaderPageNo, pageSize: 1000 }).then((res) => {
        if (res.data.length > 0) {
          this.leaderList.push(...res.data)
          this.leaderPageNo += 1
        }
        this.loadLeader = false
      })
    },
    getorgData(parentOrgId = '0') {
      let params = {
        parentOrgId: parentOrgId,
        orgName: '',
        orgType: '',
        userId: '',
        minUserNum: '',
        maxUserNum: ''
      }
      return new Promise((resolve) => {
        getOrganization(params).then((res) => {
          orgList = res
          function maps(data) {
            data.map((it) => {
              it.id = it.orgId
              it.label = it.orgName
              if (it.children) {
                maps(it.children)
              }
            })
          }
          maps(orgList)
          let i = this.find_index(this.option.column, 'parentOrgId')
          this.option.column[i].dicData = orgList
          resolve()
        })
      })
    },
    onContinue() {
      this.$emit('update:dialogVisible', false)
    },
    postOrg() {},
    onClickAdd({ ishow = true }) {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          let { orgName, parentOrgId, orgType, userId, remark, code } = { ...this.form }
          // userId = userId.join(',')
          let type = {
            0: 'Company',
            1: 'Department',
            2: 'Group',
            3: 'Enterprise'
          }
          orgType = type[orgType]
          let params = {
            orgName,
            parentOrgId,
            orgType,
            userId,
            code,
            remark
          }
          this.loading = true
          postOrganization(params)
            .then(() => {
              this.$emit('onsubmit')
              this.$message.success('添加成功')
              this.loading = false
              if (ishow) {
                this.$emit('update:dialogVisible', false)
              } else {
                let parentOrgId = JSON.parse(JSON.stringify(this.form.parentOrgId))
                this.$refs.form.resetFields()
                this.form.parentOrgId = parentOrgId
              }
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    againAdd() {
      this.onClickAdd({ ishow: false })
    },
    onClickSave() {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          let { orgName, parentOrgId, orgType, userId, remark, code } = { ...this.form }
          let type = {
            0: 'Company',
            1: 'Department',
            2: 'Group',
            3: 'Enterprise'
          }
          orgType = type[orgType]
          let params = {
            orgId: this.orgData.id,
            orgName,
            parentOrgId,
            orgType,
            userId,
            remark,
            code
          }
          this.loading = true
          putOrganization(params)
            .then(() => {
              this.$emit('onsubmit')
              this.$message.success('修改成功')
              this.loading = false
              this.handleClose()
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    find_index(data, key) {
      let index = ''
      data.map((it, i) => {
        if (it.prop === key) {
          index = i
        }
      })
      return index
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
  text-align: right;
}
</style>

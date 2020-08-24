<template>
  <div style="height:100%">
    <page-header
      title="员工详情"
      show-back
    />
    <div class="personTitle">
      <div class="left">
        <div class="leftTop">
          <div class="orgJob">
            {{ personInfo.name }}
          </div>
          <div class="status">
            {{ statusWord[personInfo.status] }}
          </div>
        </div>
        <div class="leftBottom">
          <div class="name-bottom">
            <span style="padding-left: 0">部门：{{ personInfo.orgName }}</span>
            <span style="border-right:0">职位：{{ personInfo.jobName }}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="btn">
          <el-button
            type="primary"
            size="medium"
            @click="toDetail"
          >
            查看员工详情
          </el-button>
        </div>
      </div>
    </div>
    <basic-container v-loading="containerLoading">
      <div class="tags">
        <i class="el-icon-warning-outline" />
        <span v-if="todoNum !== 0">该员工还有 {{ todoNum }} 项入职事项未完成。</span>
        <span v-if="todoNum === 0">该员工已完成所有入职事项。</span>
      </div>
      <div class="matterList">
        <div class="matterItem">
          <i :class="getRegisterStatus() !== '已确认' ? 'el-icon-warning' : 'el-icon-success'" />
          <div class="title">
            入职登记表
          </div>
          <div class="matterStatus">
            {{ getRegisterStatus() }}
          </div>
          <div class="btnBox">
            <template v-if="$route.query.personId && $route.query.recruitmentId">
              <el-button
                v-if="getRegisterStatus() === '未发送'"
                size="mediun"
                type="text"
                @click="sendRegister"
              >
                发送入职登记表
              </el-button>
              <el-button
                v-else
                size="mediun"
                type="text"
                @click="toRegister"
              >
                查看
              </el-button>
            </template>
          </div>
        </div>
        <div class="matterItem">
          <i :class="contractStatus ? 'el-icon-success' : 'el-icon-warning'" />
          <div class="title">
            合同签订
          </div>
          <div class="matterStatus">
            {{ contractStatus ? '已' : '未' }}签订
          </div>
          <div class="btnBox">
            <el-button
              v-if="!contractStatus"
              size="mediun"
              type="text"
              @click="handleClickContract"
            >
              签订合同
            </el-button>
            <el-button
              v-else
              size="mediun"
              type="text"
              @click="toDetail"
            >
              查看
            </el-button>
          </div>
        </div>
      </div>
    </basic-container>
    <el-dialog
      title="签订合同"
      :visible.sync="contractDialog"
      :modal-append-to-body="false"
      custom-class="contractDialog"
      @close="contractDialog = false"
    >
      <div class="dialogContain">
        <common-form
          ref="form"
          :model="form"
          :columns="columns"
        />
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="medium"
          @click="contractDialog = false"
        >
          取 消
        </el-button>
        <el-button
          size="medium"
          type="primary"
          :loading="loading"
          @click="handleSubmit"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const years = [
  {
    value: 1,
    label: '1年'
  },
  {
    value: 2,
    label: '2年'
  },
  {
    value: 3,
    label: '3年'
  },
  {
    value: 4,
    label: '4年'
  },
  {
    value: 5,
    label: '5年'
  },
  {
    value: 6,
    label: '6年'
  },
  {
    value: 7,
    label: '7年'
  },
  {
    value: 8,
    label: '8年'
  },
  {
    value: 9,
    label: '9年'
  },
  {
    value: 10,
    label: '10年'
  },
  {
    value: 11,
    label: '11年'
  },
  {
    value: 12,
    label: '12年'
  }
]

import PageHeader from '@/components/page-header/pageHeader'
import CommonForm from '@/components/common-form/commonForm'
// import inputArray from '@/views/personnel/candidate/components/inputArray'
import { getStaffBasicInfo, getConpactInfo } from '@/api/personalInfo'
import { getCompany } from '@/api/personnel/selectedPerson'
import { createContract } from '@/api/personnel/entry'
import { getpersonInfo } from '@/api/personnel/selectedPerson'
import { postRegisterSend } from '@/api/personnel/candidate'
import moment from 'moment'

export default {
  name: 'EntryPersonDetail',
  components: { PageHeader, CommonForm },
  data() {
    let validate = (rule, value, callback) => {
      let beginDate = moment(this.form.beginDate).valueOf()
      let endDate = moment(this.form.endDate).valueOf()
      if (beginDate > endDate) {
        // this.infoForm.endDate = ''
        callback(new Error('合同结束日期要大于合同起始日期'))
      } else {
        callback()
      }
    }
    return {
      todoNum: 0,
      containerLoading: false,
      loading: false,
      personInfo: {
        name: '',
        companyName: '',
        orgName: '',
        jobName: '',
        positionName: ''
      },
      statusWord: { Try: '试用期', Formal: '正式', Leaved: '已离职', WaitLeave: '待离职	' },
      contractStatus: false,
      contractDialog: false,
      form: {
        userId: '',
        code: '',
        name: '',
        type: '',
        beginDate: '',
        endDate: '',
        signDate: '',
        period: '',
        remark: ''
      },
      registerForm: {},
      rule: { required: true, validator: validate, trigger: 'change' },
      columns: [
        {
          label: '合同编号', // lable
          itemType: 'input', // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
          prop: 'code',
          span: 11
        },
        {
          label: '合同公司',
          itemType: 'select',
          prop: 'name',
          options: [],
          props: {
            label: 'orgName',
            value: 'orgName'
          },
          span: 11,
          offset: 2,
          required: true
        },
        {
          label: '合同类型',
          itemType: 'select',
          prop: 'type',
          options: [],
          props: {
            label: 'dictValue',
            value: 'dictKey'
          },
          span: 11,
          required: true
        },
        {
          label: '合同期限',
          itemType: 'select',
          prop: 'period',
          options: years,
          props: {
            label: 'label',
            value: 'value'
          },
          span: 11,
          offset: 2
        },
        {
          label: '合同起止日期', // lable
          itemType: 'datePicker',
          prop: 'beginDate',
          required: true,
          span: 11,
          rules: [
            {
              required: true,
              message: '请选择合同起止日期',
              trigger: 'change'
            }
          ]
        },
        {
          label: '合同结束日期', // lable
          itemType: 'datePicker',
          prop: 'endDate',
          required: true,
          offset: 2,
          span: 11,
          rules: [
            {
              required: true,
              message: '请选择合同结束日期',
              trigger: 'change'
            }
          ]
        },
        {
          label: '合同签订日期', // lable
          itemType: 'datePicker',
          prop: 'signDate',
          span: 11,
          required: true
        },
        {
          prop: 'remark',
          itemType: 'input',
          label: '备注',
          rows: 2,
          span: 24,
          type: 'textarea'
        }
      ]
    }
  },
  watch: {
    'form.beginDate': {
      handler(val) {
        // beginDate: '',
        //   endDate: '',
        if (val && this.form.period) {
          this.form.endDate = moment(val)
            .add(this.form.period, 'Y')
            .format('YYYY-MM-DD')
        } else if (val && !this.form.period) {
          let beginDate = moment(this.form.beginDate).valueOf()
          let endDate = moment(this.form.endDate).valueOf()
          if (beginDate > endDate) {
            this.form.endDate = ''
          }
        }
      },
      immediate: true,
      deep: true
    },
    'form.period': {
      handler(val) {
        if (val && this.form.beginDate) {
          this.form.endDate = moment(this.form.beginDate)
            .add(this.form.period, 'Y')
            .format('YYYY-MM-DD')
        }
      },
      immediate: true,
      deep: true
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
    next()
  },
  created() {
    this.getPersonInfo()
  },
  mounted() {
    this.form.userId = this.$route.params.userId
    this.$store.dispatch('CommonDict', 'ContractType').then((res) => {
      this.columns[2].options = res
    })
    this.getCompany()
    this.columns.find((it) => it.prop === 'endDate').rules.push(this.rule)
    // var day = moment("1995-12-25").valueOf()
    // console.log(day)
  },
  methods: {
    getTodoNum() {
      this.todoNum = 0
      if (this.getRegisterStatus() !== '已确认') this.todoNum += 1
      if (!this.contractStatus) this.todoNum += 1
    },
    sendRegister() {
      let params = {
        recruitmentId: this.$route.query.recruitmentId,
        personId: this.$route.query.personId,
        type: 'Entry'
      }
      postRegisterSend(params).then(() => {
        this.$message.success('发送成功')
        this.loadAllData()
      })
    },
    toRegister() {
      let params = {
        recruitmentId: this.$route.query.recruitmentId,
        personId: this.$route.query.personId,
        entry: 1,
        tagName: '入职登记表详情',
        isUser: 1
      }
      this.$router.push({
        path: '/personnel/candidate/registrationForm',
        query: params
      })
    },
    getRegisterStatus() {
      if (this.$route.query.personId) {
        if (this.registerForm.register === 0) {
          return '未发送'
        } else if (this.registerForm.register === 1 && this.registerForm.entryRegister === 0) {
          return '已发送'
        } else if (
          this.registerForm.register === 1 &&
          this.registerForm.entryFill === 1 &&
          this.registerForm.entryRegister === 1
        ) {
          return '已确认'
        }
      } else {
        return '已确认'
      }
    },
    handleSubmit() {
      this.$refs.form
        .validate()
        .then(() => {
          let params = {
            ...this.form
          }
          this.loading = true
          createContract(params)
            .then(() => {
              this.$message.success('签订成功')
              this.loading = false
              this.contractDialog = false
              this.getPersonInfo()
            })
            .catch(() => {
              this.loading = false
            })
        })
        .catch(() => {
          this.$message.error('请完善信息')
          this.loading = false
          this.contractStatus = false
        })
    },
    toDetail() {
      this.$router.push('/personnel/detail/' + this.$route.params.userId)
    },
    handleClickContract() {
      this.contractDialog = true
    },
    getPersonInfo() {
      this.containerLoading = true
      getStaffBasicInfo({ userId: this.$route.params.userId }).then((res) => {
        this.personInfo = res
      })
      getConpactInfo({ userId: this.$route.params.userId }).then((res) => {
        this.form = Object.assign(this.form, res[0])
        // 合同是否签订判断条件是：存在合同并且最新一天合同的签订日期不为空
        if (res.length !== 0 && !_.isEmpty(res[0].signDate)) {
          this.contractStatus = true
        } else {
          this.contractStatus = false
        }
        this.containerLoading = false
        this.getTodoNum()
      })
      if (this.$route.query.personId) {
        getpersonInfo({ personId: this.$route.query.personId }).then((res) => {
          this.registerForm = res
        })
      }
    },
    getCompany() {
      let params = {
        parentOrgId: '0'
      }
      getCompany(params).then((res) => {
        this.columns[1].options = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.personTitle {
  background: #ffffff;
  border-radius: 4px;
  //   width: 100%;
  height: 108px;
  padding: 0 16px 0 24px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 108px;
    overflow-y: auto;
    .leftTop {
      display: flex;
      justify-content: flex-start;
      align-items: left;
      overflow-y: auto;
      margin-bottom: 10px;
      .orgJob {
        font-size: 18px;
        color: #202940;
        margin-right: 16px;
        font-weight: 700;
      }
      .status {
        height: 26px;
        border-radius: 4px;
        font-size: 12px;
        color: #718199;
        line-height: 26px;
        padding: 2px 10px;
        background: rgba(113, 129, 153, 0.1);
      }
    }
    .leftBottom {
      .name-bottom {
        span {
          font-size: 14px;
          color: #202940;
          padding: 0 24px;
          border-right: 1px solid #e3e7e9;
        }
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    .btn {
      height: 34px;
    }
    .el-button + .el-button {
      margin-left: 16px;
    }
  }
}

.dialogContain {
  padding: 0 24px;
}

.tags {
  background: #f7f8fa;
  border-radius: 4px;
  height: 36px;
  line-height: 36px;
  padding: 0 12px;
  margin-bottom: 24px;
  font-size: 14px;
  color: #202940;
  .el-icon-warning-outline {
    color: #207efa;
    margin-right: 8px;
  }
}

.matterList {
  display: flex;
  flex-direction: column;
  background-color: #e3e7e9;
  .matterItem {
    display: flex;
    line-height: 42px;
    height: 42px;
    text-align: center;
    padding: 0 24px;
    .title {
      min-width: 100px;
      text-align: left;
    }
    i {
      line-height: 42px;
      margin-right: 16px;
    }
    .el-icon-success {
      color: #53c962;
    }
    .el-icon-warning {
      color: #ff6464;
    }
    .matterStatus {
      flex: 1;
    }
    .btnBox {
      min-width: 200px;
      text-align: right;
    }
  }
}

/deep/ .el-form-item {
  margin-bottom: 8px;
}

/deep/ .basic-container {
  height: calc(100% - 214px);
}

/deep/ .is-always-shadow {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>

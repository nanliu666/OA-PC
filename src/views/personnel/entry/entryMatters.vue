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
    <basic-container>
      <div class="tags">
        <i class="el-icon-warning-outline" />
        该员工还有 {{ contractStatus ? 0 : 1 }} 项入职事项未完成。
      </div>
      <div class="matterList">
        <!-- <div class="matterItem">
          <i class="el-icon-warning" />
          <div>入职登记表</div>
          <div class="matterStatus">
            未发送
          </div>
          <div>
            <el-button
              size="mediun"
              type="text"
            >
              发送入职登记表
            </el-button>
          </div>
        </div>-->
        <div class="matterItem">
          <i :class="contractStatus ? 'el-icon-success' : 'el-icon-warning'" />
          <div>合同签订</div>
          <div class="matterStatus">
            {{ contractStatus ? '已' : '未' }}签订
          </div>
          <div>
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
      <div
        v-loading="loading"
        class="dialogContain"
      >
        <inputArray
          ref="signedData"
          :el-row-gutter="25"
          :info-form.sync="signedData"
          :form.sync="infoForm"
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
import inputArray from '@/views/personnel/candidate/components/inputArray'
import { getStaffBasicInfo, getConpactInfo } from '@/api/personalInfo'
import { getCompany } from '@/api/personnel/selectedPerson'
import { createContract } from '@/api/personnel/entry'

export default {
  name: 'EntryPersonDetail',
  components: { PageHeader, inputArray },
  data() {
    return {
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
      infoForm: {
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
      signedData: {
        basicAttrs: [
          {
            attrId: '1', // ：key唯一值
            attrName: '合同编号：', // lable
            inType: 1, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
            message: '请输入合同编号', // 提示必填提示
            props: 'code',
            span: 12
          },
          {
            attrId: '2', // ：key唯一值
            attrName: '合同公司：', // lable
            value: '', // 单选框多选框的potion的值
            inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
            message: '请选择合同公司', // 提示必填提示
            props: 'name',
            span: 12,
            rules: [
              {
                required: true,
                message: '请选择合同公司',
                trigger: 'change'
              }
            ]
          },
          {
            attrId: '3', // ：key唯一值
            attrName: '合同类型：', // lable
            value: '', // 单选框多选框的potion的值
            inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
            message: '请选择合同类型', // 提示必填提示
            props: 'type',
            span: 12,
            rules: [
              {
                required: true,
                message: '请选择合同类型',
                trigger: 'change'
              }
            ]
          },
          {
            attrId: '4', // ：key唯一值
            attrName: '合同期限：', // lable
            value: years, // 单选框多选框的potion的值
            inType: 2, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
            message: '请选择合同期限', // 提示必填提示
            props: 'period',
            span: 12
          },
          {
            attrId: '5', // ：key唯一值
            attrName: '合同起止日期：', // lable
            inType: 4, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
            message: '请选择合同起止日期', // 提示必填提示
            props: 'beginDate',
            span: 12,
            rules: [
              {
                required: true,
                message: '请选择合同起止日期',
                trigger: 'change'
              }
            ]
          },
          {
            attrId: '6', // ：key唯一值
            attrName: '合同结束日期：', // lable
            inType: 4, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
            message: '请选择合同结束日期', // 提示必填提示
            props: 'endDate',
            span: 12,
            rules: [
              {
                required: true,
                message: '请选择合同起止日期',
                trigger: 'change'
              }
            ]
          },
          {
            attrId: '7', // ：key唯一值
            attrName: '合同签订日期：', // lable
            inType: 4, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
            message: '请选择合同签订日期', // 提示必填提示
            props: 'signDate',
            span: 12,
            rules: [
              {
                required: true,
                message: '请选择合同起止日期',
                trigger: 'change'
              }
            ]
          },
          {
            attrId: '8', // ：key唯一值
            attrName: '备注：', // lable
            inType: 10, // 当前input类型 1：文本 2：单选框 3：多选框  4：日期 5:按钮
            message: '备注', // 提示必填提示
            props: 'remark',
            span: 24
          }
        ]
      }
    }
  },
  created() {
    this.getPersonInfo()
  },
  mounted() {
    this.infoForm.userId = this.$route.params.userId
    this.$store.dispatch('CommonDict', 'ContractType').then((res) => {
      this.dataFilter(res, this.signedData, 'type', 'dictValue', 'id')
    })
    this.getCompany()
    this.getContractInfo()
    // var day = moment("1995-12-25").valueOf()
    // console.log(day)
  },
  methods: {
    handleSubmit() {
      return Promise.all(
        ['signedData'].map((it) => {
          return new Promise((resolve) => {
            let form = this.$refs[it].submitForm()
            resolve(form)
          })
        })
      ).then((res) => {
        if (res.includes(false)) return
        let params = {
          ...this.infoForm
        }
        this.loading = true
        createContract(params).then(() => {
          this.$message.success('签订成功')
          this.loading = false
          this.contractDialog = false
          this.getPersonInfo()
        })
      })
    },
    toDetail() {
      this.$router.push('/personnel/detail/' + this.$route.params.userId)
    },
    handleClickContract() {
      this.contractDialog = true
    },
    getPersonInfo() {
      getStaffBasicInfo({ userId: this.$route.params.userId }).then((res) => {
        this.personInfo = res
      })
      getConpactInfo({ userId: this.$route.params.userId }).then((res) => {
        if (res.length > 0) {
          this.contractStatus = true
        }
      })
    },
    dataFilter(res, form, props, label, value) {
      let index = ''
      let dict = []
      res &&
        res.map((it) => {
          dict.push({ label: it[label], value: it[value] })
        })
      form.basicAttrs.map((it, i) => {
        if (it.props === props) index = i
      })
      form.basicAttrs[index].value = dict
    },
    getCompany() {
      let params = {
        parentOrgId: '0'
      }
      getCompany(params).then((res) => {
        this.dataFilter(res, this.signedData, 'name', 'orgName', 'orgId')
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

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
          <template v-if="personInfo.status === '7'">
            <el-button
              type="primary"
              size="medium"
              @click="confirmEntry"
            >
              确认入职
            </el-button>
            <el-button
              v-if="!personInfo.register"
              type="primary"
              size="medium"
              @click="handleSend"
            >
              发送入职登记表
            </el-button>
            <el-button
              v-if="personInfo.register"
              type="primary"
              size="medium"
              @click="handleViewRegister"
            >
              查看入职登记表
            </el-button>
            <el-dropdown @command="handleCommand">
              <el-button
                size="medium"
                style="margin-left: 16px"
              >
                更多
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="getOutEntry">
                  放弃入职
                </el-dropdown-item>
                <!-- <el-dropdown-item command="edit">编辑</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template v-if="personInfo.status === ''">
            <el-button
              type="primary"
              size="medium"
              @click="addWillEntry"
            >
              添加到待入职
            </el-button>
            <!-- <el-button size="medium">
              发送入职登记表
            </el-button>-->
            <!-- <el-button type="text">
            查看入职登记表
            </el-button>-->
          </template>
        </div>
      </div>
    </div>
    <basic-container>
      <div
        class="info-wrapper"
        style="padding-top:0"
      >
        <el-row>
          <el-col
            :span="24"
            class="info-title"
          >
            基本信息
          </el-col>
          <div class="info-content">
            <el-form
              label-width="150px"
              class="info-form"
            >
              <el-col
                :span="10"
                :push="2"
              >
                <el-form-item label="姓名:">
                  <span class="info-item-value">{{ personInfo.name }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :push="2"
              >
                <el-form-item label="性别:">
                  <span class="info-item-value">{{ personInfo.sex === 1 ? '男' : '女' }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :push="2"
              >
                <el-form-item label="手机号码:">
                  <span class="info-item-value">{{ personInfo.phonenum }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :push="2"
              >
                <el-form-item label="邮箱:">
                  <span class="info-item-value">{{ personInfo.email }}</span>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </el-row>
      </div>
      <div class="info-wrapper">
        <el-row>
          <el-col
            :span="24"
            class="info-title"
          >
            入职信息
          </el-col>
          <div class="info-content">
            <el-form
              :model="personInfo"
              label-width="150px"
              class="info-form"
            >
              <el-col
                :span="10"
                :push="2"
              >
                <el-form-item :label="personInfo.status === 7 ? '预计入职日期:' : '原定入职日期'">
                  <span class="info-item-value">{{ applyInfo.entryDate }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :push="2"
              >
                <el-form-item label="试用期:">
                  <span class="info-item-value">{{ applyInfo.probation || 0 }}个月</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :push="2"
              >
                <el-form-item label="入职公司:">
                  <span class="info-item-value">{{ applyInfo.companyName }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :push="2"
              >
                <el-form-item label="部门:">
                  <span class="info-item-value">{{ applyInfo.orgName }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :push="2"
              >
                <el-form-item label="职位:">
                  <span class="info-item-value">{{ applyInfo.jobName }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :push="2"
              >
                <el-form-item label="岗位:">
                  <span class="info-item-value">{{ applyInfo.positionName }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :push="2"
              >
                <el-form-item label="工作性质:">
                  <span class="info-item-value">{{ workProperty[applyInfo.workProperty] }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :push="2"
              >
                <el-form-item label="工作地址:">
                  <span class="info-item-value">
                    {{ applyInfo.workProvinceName + applyInfo.workCityName + applyInfo.address }}
                  </span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :push="2"
              >
                <el-form-item label="工作城市:">
                  <span class="info-item-value">
                    {{ applyInfo.workProvinceName + applyInfo.workCityName }}
                  </span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :push="2"
              >
                <el-form-item label="入职登记表:">
                  <span class="info-item-value">{{
                    personInfo.register === 1 ? '已发送' : '未发送'
                  }}</span>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </el-row>
      </div>
    </basic-container>
    <give-out-entry-dialog
      ref="giveOutEntryDialog"
      :visible.sync="giveOutEntryDialog"
      @refresh="getPersonInfo()"
    />
  </div>
</template>
<script>
import PageHeader from '@/components/page-header/pageHeader'
import {
  getOfferApply,
  addOutCandidateAccept,
  postEntryRegisterSend,
  getCandidateAcceptDetail
} from '@/api/personnel/entry'
import GiveOutEntryDialog from './components/giveOutEntryDialog'

export default {
  name: 'EntryPersonDetail',
  components: { PageHeader, GiveOutEntryDialog },
  data() {
    return {
      personInfo: {},
      applyInfo: {},
      statusWord: { '7': '待入职', '': '放弃入职' },
      workProperty: {},
      giveOutEntryDialog: false
    }
  },
  created() {
    this.getPersonInfo()
    this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
      res.forEach((item) => {
        this.workProperty[item.dictKey] = item.dictValue
      })
    })
  },
  activated() {
    this.getPersonInfo()
    this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
      res.forEach((item) => {
        this.workProperty[item.dictKey] = item.dictValue
      })
    })
  },
  methods: {
    addWillEntry() {
      this.$confirm('您确认要将该员工添加到待入职吗？', '添加到待入职', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          personId: this.personInfo.personId,
          userId: this.$store.state.user.userInfo.user_id,
          recruitmentId: this.personInfo.recruitmentId
        }
        addOutCandidateAccept(params)
          .then(() => {
            this.getPersonInfo()
            this.$message.success('添加成功')
          })
          .catch(() => {
            this.$message.error('添加失败')
          })
      })
    },
    handleCommand(command) {
      if (command === 'getOutEntry') {
        this.$refs.giveOutEntryDialog.out(this.personInfo)
      }
    },
    handleSend() {
      let params = {
        recruitmentId: this.personInfo.recruitmentId,
        personId: this.personInfo.personId
      }
      postEntryRegisterSend(params).then(() => {
        this.$message.success('发送成功')
        this.personInfo.register = 1
        this.getPersonInfo()
      })
    },
    getPersonInfo() {
      getOfferApply({ id: this.$route.query.applyId }).then((apply) => {
        this.applyInfo = apply
        getCandidateAcceptDetail({ personId: apply.personId }).then((info) => {
          this.personInfo = info
        })
      })
    },
    confirmEntry() {
      this.$router.push(
        '/personnel/entry/confirmEntry/' +
          this.personInfo.personId +
          '?applyId=' +
          this.$route.query.applyId
      )
    },
    handleViewRegister() {
      let params = {
        recruitmentId: this.personInfo.recruitmentId,
        personId: this.personInfo.personId,
        entry: 1,
        tagName: '入职登记表详情'
      }
      this.$router.push({
        path: '/personnel/candidate/registrationForm',
        query: params
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

.info-item-value {
  color: #202940;
}

.info-title {
  color: #202940;
  line-height: 24px;
  margin-bottom: 16px;
}

.info-wrapper {
  padding-top: 24px;
  padding-bottom: 15px;
  border-bottom: 1px solid #cecece;
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

.el-card__body {
}
</style>

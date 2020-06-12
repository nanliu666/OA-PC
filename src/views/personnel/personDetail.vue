<template>
  <div
    v-loading="loading"
    class="detail-contain"
  >
    <page-header
      :title="isTalent ? '人才库详情' : '候选人详情'"
      :show-back="true"
    />
    <!--人才库详情不展示招聘需求相关信息-->
    <div class="personTitle">
      <div class="left">
        <div class="orgJob">
          {{ personInfo.orgName || '' }} — {{ personInfo.jobName || '' }}
        </div>
        <div
          v-if="!isTalent"
          class="status"
        >
          {{ statusWord[personInfo.status] }}
        </div>
      </div>
      <div class="right">
        <div class="btn">
          <template v-if="personInfo.status === '1'">
            <!-- <el-button type="primary" size="medium" @click="hadlePushAudit">推送审核</el-button> -->
            <el-button
              type="danger"
              size="medium"
              @click="handleWeedOut"
            >
              淘汰
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
                <el-dropdown-item command="changeJob">
                  更改应聘职位
                </el-dropdown-item>
                <el-dropdown-item command="edit">
                  编辑
                </el-dropdown-item>
                <!-- <el-dropdown-item command>
                  下载简历
                </el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <!-- 初选通过 -->
          <template v-if="personInfo.status === '2'">
            <el-button
              type="primary"
              size="medium"
              @click="handleArrange"
            >
              安排面试
            </el-button>
            <el-button
              type="danger"
              size="medium"
              @click="handleWeedOut"
            >
              淘汰
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
                <el-dropdown-item command="edit">
                  编辑
                </el-dropdown-item>
                <!-- <el-dropdown-item command>
                  下载简历
                </el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <!-- 面试中 -->
          <template v-if="personInfo.status === '3'">
            <el-button
              type="primary"
              size="medium"
              @click="handleArrange"
            >
              重新安排面试
            </el-button>
            <el-button
              v-if="personInfo.interview === 0"
              type="primary"
              size="medium"
              @click="handleSend"
            >
              发送面试登记表
            </el-button>
            <el-button
              v-else
              type="text"
              @click="loopUpInterview"
            >
              查看面试登记表
            </el-button>
            <el-button
              type="primary"
              size="medium"
              @click="handleSend"
            >
              发送面试登记表
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
                <el-dropdown-item command="weedOut">
                  淘汰
                </el-dropdown-item>
                <el-dropdown-item command="edit">
                  编辑
                </el-dropdown-item>
                <!-- <el-dropdown-item command>
                  下载简历
                </el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <!-- 面试通过 -->
          <template v-if="personInfo.status === '4'">
            <el-button
              v-if="$route.query.applyId === ''"
              type="primary"
              size="medium"
              @click="handleApplyEmploy(row)"
            >
              申请录用
            </el-button>
            <el-button
              v-else
              type="primary"
              size="medium"
              @click="handleCheckEmploy(row)"
            >
              查看申请
            </el-button>
            <el-button
              type="danger"
              size="medium"
              @click="handleWeedOut"
            >
              淘汰
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
                <el-dropdown-item command="arrange">
                  安排复试
                </el-dropdown-item>
                <el-dropdown-item command="edit">
                  编辑
                </el-dropdown-item>
                <el-dropdown-item command>
                  查看面试评价
                </el-dropdown-item>
                <el-dropdown-item command="toRegistrationForm">
                  查看面试登记表
                </el-dropdown-item>
                <!-- <el-dropdown-item command>
                  下载简历
                </el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <!-- 待发Offer -->
          <template v-if="personInfo.status === '5'">
            <el-button
              type="primary"
              size="medium"
            >
              发送Offer
            </el-button>
            <el-button
              type="danger"
              size="medium"
              @click="handleWeedOut"
            >
              淘汰
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
                <el-dropdown-item command="edit">
                  编辑
                </el-dropdown-item>
                <!-- <el-dropdown-item command>
                  下载简历
                </el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <!-- 已发Offer -->
          <template v-if="personInfo.status === '6'">
            <el-button
              type="primary"
              size="medium"
              @click="handleAcceptOffer"
            >
              接受
            </el-button>
            <el-button
              type="danger"
              size="medium"
              @click="handleWeedOut"
            >
              淘汰
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
                <el-dropdown-item command="offerChange">
                  Offer变更
                </el-dropdown-item>
                <el-dropdown-item command="edit">
                  编辑
                </el-dropdown-item>
                <!-- <el-dropdown-item command>
                  下载简历
                </el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <!-- 已淘汰 -->
          <template v-if="personInfo.status === '0'">
            <el-button
              type="primary"
              size="medium"
              @click="handleRecover"
            >
              恢复为候选人
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
                <!-- <el-dropdown-item command>
                  下载简历
                </el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </div>
      </div>
    </div>
    <div class="person-info">
      <div class="left">
        <div class="left-head">
          <div class="info">
            <div class="name">
              {{ personInfo.name }}
            </div>
            <div class="name-bottom">
              <span style="padding-left: 0">{{ personInfo.sex === 1 ? '男' : '女' }}</span>
              <span>{{ personInfo.age }}岁</span>
              <span>{{ educationalDict[personInfo.educationalLevel] }}</span>
              <span style="border-right:0">{{ personInfo.workAge }}年工作经验</span>
            </div>
          </div>
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="handleCommand('edit')"
          >
            编辑
          </el-button>
        </div>
        <div class="basic-info">
          <div class="title">
            基本信息
          </div>
          <div class="info">
            <el-row :gutter="20">
              <el-col
                :span="8"
                class="key"
              >
                毕业院校：
              </el-col>
              <el-col
                :span="16"
                class="value"
              >
                {{ personInfo.university }}
              </el-col>
              <el-col
                :span="8"
                class="key"
              >
                毕业专业：
              </el-col>
              <el-col
                :span="16"
                class="value"
              >
                {{ personInfo.major }}
              </el-col>
              <el-col
                :span="8"
                class="key"
              >
                标签：
              </el-col>
              <el-col
                :span="16"
                class="value"
              >
                <template v-for="item in personInfo.tags">
                  <!-- :style="{color:item.color}" -->
                  <span
                    :key="item.tagId"
                    class="tag-class"
                  >{{ item.name }}</span>
                </template>
              </el-col>
              <el-col
                :span="8"
                class="key"
              >
                备注：
              </el-col>
              <el-col
                :span="16"
                class="value"
              >
                {{ personInfo.remark }}
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="basic-info">
          <div class="title">
            联系信息
          </div>
          <div class="info">
            <el-row :gutter="20">
              <el-col
                :span="8"
                class="key"
              >
                目前所在地：
              </el-col>
              <el-col
                :span="16"
                class="value"
              >
                {{
                  personInfo.provinceName + '/' + personInfo.cityName
                }}
              </el-col>
              <el-col
                :span="8"
                class="key"
              >
                电话：
              </el-col>
              <el-col
                :span="16"
                class="value"
              >
                {{ personInfo.phonenum }}
              </el-col>
              <el-col
                :span="8"
                class="key"
              >
                邮箱：
              </el-col>
              <el-col
                :span="16"
                class="value"
              >
                {{ personInfo.email }}
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="basic-info">
          <div class="title">
            应聘信息
          </div>
          <div class="info">
            <el-row :gutter="20">
              <el-col
                :span="8"
                class="key"
              >
                最近工作单位：
              </el-col>
              <el-col
                :span="16"
                class="value"
              >
                {{ personInfo.lastCompany }}
              </el-col>
              <el-col
                :span="8"
                class="key"
              >
                期望月薪：
              </el-col>
              <el-col
                :span="16"
                class="value"
              >
                {{ personInfo.monthSalary }}
              </el-col>
              <el-col
                :span="8"
                class="key"
              >
                应聘渠道：
              </el-col>
              <el-col
                :span="16"
                class="value"
              >
                {{
                  recruitmentChannel[personInfo.recruitment]
                }}
              </el-col>
              <el-col
                :span="8"
                class="key"
              >
                附件：
              </el-col>
              <el-col
                :span="16"
                class="value"
              >
                <a
                  class="attachmentUrl"
                  :href="personInfo.attachmentUrl"
                >{{
                  personInfo.attachmentName
                }}</a>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          候选人动态
        </div>
        <el-timeline :reverse="true">
          <el-timeline-item
            v-for="(item, index) in stepsData"
            :key="index"
            :timestamp="item.createTime"
            color="#368AFA"
            placement="top"
          >
            <template slot>
              <div class="action-name">
                {{ item.name }}
              </div>
              <div class="action-content">
                {{ item.content }}
              </div>
            </template>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <weed-out-dialog
      ref="weedOutgDialog"
      :visible.sync="weedOutgDialog"
      @refresh="init"
    />
    <push-audit-dialog
      ref="pushAuditDialog"
      :visible.sync="pushAuditDialog"
      @refresh="init"
    />
    <change-job-dialog
      ref="changeJobDialog"
      :visible.sync="changeJobDialog"
      @refresh="init"
    />
  </div>
</template>
<script>
import PageHeader from '@/components/page-header/pageHeader'
import WeedOutDialog from './candidate/components/weedOutDialog'
import PushAuditDialog from './candidate/components/pushAuditDialog'
import ChangeJobDialog from './candidate/components/changeJobDialog'
// import arrange from './candidate/components/arrangeInterview'
import {
  getPersonInfo,
  getPersonRecord,
  acceptCandidateOffer,
  changeCandidateOffer
} from '@/api/personnel/candidate'
import { getRecruitmentDetail } from '@/api/personnel/recruitment'

export default {
  name: 'Detail',
  components: { PageHeader, WeedOutDialog, PushAuditDialog, ChangeJobDialog },
  data() {
    return {
      personInfo: {},
      statusWord: {
        '0': '已淘汰',
        '1': '待沟通',
        '2': '初选通过',
        '3': '面试中',
        '4': '面试通过',
        '5': '待发Offer',
        '6': '已发Offer'
      },
      educationalDict: {},
      recruitmentChannel: {},
      stepsData: [],
      weedOutgDialog: false,
      pushAuditDialog: false,
      changeJobDialog: false,
      arrangeDialog: false,
      row: {},
      loading: false,
      personId: null,
      isTalent: null
    }
  },
  created() {
    this.personId = this.$route.params.personId
    this.getPersonInfo()
    this.getPersonRecord()
    this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
      res.forEach((item) => {
        this.educationalDict[item.dictKey] = item.dictValue
      })
    })
    this.$store.dispatch('CommonDict', 'RecruitmentChannel').then((res) => {
      res.forEach((item) => {
        this.recruitmentChannel[item.dictKey] = item.dictValue
      })
    })
  },
  activated() {
    this.personId = this.$route.params.personId
    this.isTalent = this.$route.query.isTalent
    this.getPersonInfo()
    this.getPersonRecord()
  },
  methods: {
    loopUpInterview() {
      this.$router.push({
        path: '/personnel/candidate/registrationForm'
      })
    },
    handleSend() {
      this.$message.success('发送成功')
    },
    handleCheckEmploy() {
      let params = {
        formId: this.$route.query.applyId,
        formKey: 'PersonOfferApply'
      }
      this.$router.push({
        path: '/approval/appr/apprDetail',
        query: params
      })
    },
    handleApplyEmploy(row) {
      this.$router.push({
        path: '/personnel/candidate/apply',
        query: {
          personId: row.personId,
          userName: row.userName,
          sex: row.sex,
          email: row.email,
          phonenum: row.phonenum,
          recruitmentId: row.recruitmentId,
          applyId: row.applyId
        }
      })
    },
    handleRegistration() {
      this.$router.push({
        path: '/personnel/candidate/registrationForm'
      })
    },
    handleApply() {
      this.$router.push({
        path: '/personnel/candidate/apply'
      })
    },
    handleArrange() {
      this.arrangeDialog = true
      this.row = JSON.parse(JSON.stringify(this.personInfo))
    },
    init() {
      this.getPersonInfo()
      this.getPersonRecord()
    },
    getPersonInfo() {
      getPersonInfo({ personId: this.personId }).then((res) => {
        this.personInfo = res
        if (!res.recruitmentId) {
          this.getRecruitmentDetail()
        }
      })
    },
    getPersonRecord() {
      getPersonRecord({ personId: this.personId }).then((res) => {
        this.stepsData = res
      })
    },
    // 获取招聘需求
    getRecruitmentDetail() {
      if (!this.$route.query.recruitmentId) {
        return
      }
      getRecruitmentDetail(this.$route.query.recruitmentId).then((res) => {
        Object.assign(this.personId, {
          recruitmentId: res.recruitmentId,
          jobName: res.jobName,
          orgName: res.orgName
        })
      })
    },
    hadlePushAudit() {
      this.$refs.pushAuditDialog.pushAudit(this.personInfo)
    },
    handleWeedOut() {
      this.$refs.weedOutgDialog.out(this.personInfo)
    },
    handleCommand(command) {
      if (command === 'changeJob') {
        this.$refs.changeJobDialog.changeJob(this.personInfo)
      } else if (command === 'weedOut') {
        this.handleWeedOut()
      } else if (command === 'offerChange') {
        this.$confirm('您确认要重新发起录用申请么？重新发起后，已发送的offer将自动作废。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            personId: this.personId,
            userId: this.$store.state.user.userInfo.user_id
          }
          this.loading = true
          changeCandidateOffer(params).then(() => {
            this.$message.success('发起成功')
            this.loading = false
            this.init()
          })
        })
      } else if (command === 'edit') {
        this.$router.push('/personnel/editPerson?personId=' + this.personId)
      } else if (command === 'toRegistrationForm') {
        this.$router.push('/personnel/candidate/registrationForm')
      } else if (command === 'arrange') {
        this.handleArrange(this.personInfo)
      }
    },
    handleAcceptOffer() {
      this.$confirm('您确认要替候选人接受入职offer？接受后该候选人后将会进入待入职状态', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          recruitmentId: this.personInfo.recruitmentId,
          personId: this.personId,
          userId: this.$store.state.user.userInfo.user_id
        }
        this.loading = true
        acceptCandidateOffer(params).then(() => {
          this.$message.success('接受成功')
          this.loading = false
          this.init()
        })
      })
    },
    handleRecover() {
      this.$refs.changeJobDialog.recover(this.personInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-contain {
  height: calc(100% - 64px);
  position: relative;
  //   margin-bottom: 32px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.personTitle {
  background: #ffffff;
  border-radius: 4px;
  //   width: 100%;
  height: 82px;
  padding: 0 16px 0 24px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 82px;
    overflow-y: auto;
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

.person-info {
  flex: 1;
  //   height: calc(100% - 160px);
  overflow-y: scroll;
  background: #ffffff;
  border-radius: 4px;
  padding: 28px 24px;
  display: flex;
  .left {
    flex: 7;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 24px;
    .left-head {
      display: flex;
      margin-bottom: 30px;
      .info {
        flex: 1;
        .name {
          font-size: 18px;
          color: #202940;
          margin-bottom: 16px;
          font-weight: 700;
        }
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
    .basic-info {
      border-bottom: 1px solid #e3e7e9;
      margin-top: 24px;
      .title {
        font-size: 14px;
        color: #202940;
        font-weight: 700;
        margin-bottom: 16px;
      }
      .info {
        .el-col {
          min-height: 24px;
          margin-bottom: 16px;
          line-height: 24px;
          word-break: keep-all;
        }
        .el-col-8 {
          text-align: right;
          font-size: 14px;
          color: #718199;
        }
        .el-col-16 {
          font-size: 14px;
          color: #202940;
          .tag-class {
            padding: 4px 10px;
            margin-right: 16px;
            font-size: 12px;
            color: #718199;
            line-height: 20px;
            background: rgba(113, 129, 153, 0.1);
          }
          .attachmentUrl {
            color: #207efa;
            text-decoration: underline;
          }
        }
      }
    }
  }
  .right {
    flex: 3;
    padding: 0 0 0 16px;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 16px;
      color: #545b66;
      font-weight: 700;
      margin-bottom: 24px;
    }
  }
}
.is-reverse {
  padding-left: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 8px;
}

.action-name {
  font-size: 14px;
  color: #202940;
  line-height: 20px;
}

.action-content {
  font-size: 12px;
  color: #757c85;
  line-height: 12px;
  margin: 4px 0 24px;
}

/deep/ .el-timeline-item__timestamp {
  position: absolute;
  right: 0;
}

/deep/ .el-timeline-item__tail {
  position: absolute;
  left: 7px;
  top: 16px;
  height: calc(100% - 20px);
  border-left: 1px solid #368afa;
}

/deep/ .el-timeline-item__node--normal {
  left: 1px;
}
</style>

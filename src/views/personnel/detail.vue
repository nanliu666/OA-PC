<template>
  <div class="staff-detail-info">
    <page-header
      title="个人信息"
      :back="goBack"
      show-back
    />
    <basic-container class="staff-info-container">
      <div class="staff-info-wrapper">
        <!-- <div class="staff-info-brad">
					<span>
						<i class="el-icon-arrow-left" @click="goBack" />
					</span>
					<span>个人信息</span>
        </div>-->
        <div class="staff-survey">
          <el-container class="survey-inner-container">
            <el-aside width="100px">
              <div class="detail-box">
                <div class="demo-basic--circle">
                  <div class="block">
                    <el-avatar
                      :size="80"
                      :src="allInfo.circleUrl"
                    />
                  </div>
                </div>
              </div>
            </el-aside>
            <el-main>
              <div
                class="grid-content relative-box"
                style="line-height: 50px;"
              >
                <span class="staff-name">{{ allInfo.name }}</span>
                <span class="workNo">({{ allInfo.workNo }})</span>
                <el-button
                  size="mini"
                  plain
                >
                  <span>{{ getStatus() }}</span>
                </el-button>
                <div class="personnel-change-btn">
                  <template v-if="allInfo.status === 'Try' || allInfo.status === 'Formal'">
                    <el-button
                      type="info"
                      size="medium"
                      @click="jumpToApply(allInfo.userId)"
                    >
                      人事异动
                    </el-button>
                  </template>
                  <template v-if="allInfo.status === 'WaitLeave'">
                    <el-button
                      type="primary"
                      size="medium"
                      @click="jumpToLeave"
                    >
                      确认离职
                    </el-button>
                    <el-button
                      size="medium"
                      @click="toChangeLeaveInfo"
                    >
                      调整离职信息
                    </el-button>
                    <el-button
                      size="medium"
                      @click="giveupLeave"
                    >
                      放弃离职
                    </el-button>
                  </template>
                  <template v-if="allInfo.status === 'Leaved'">
                    <el-button
                      type="primary"
                      size="medium"
                      @click="jumpToLeavePrintProve"
                    >
                      开具离职证明
                    </el-button>
                  </template>
                </div>
              </div>
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content">
                    <span>手机号码:</span>
                    <span class="survey-value">{{ allInfo.phonenum }}</span>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content">
                    <span>部门:</span>
                    <span class="survey-value">{{ allInfo.orgName }}</span>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content">
                    <span>职位：</span>
                    <span class="survey-value">{{ allInfo.jobName }}</span>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content">
                    <span>上级领导：</span>
                    <span
                      style="color: #368AFA; cursor: pointer;"
                      @click="checkLeaderInfo(allInfo.leaderId)"
                    >{{ allInfo.leaderName }}</span>
                  </div>
                </el-col>
              </el-row>
              <!-- <el-row :gutter="20">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <span>标签：</span>
                    <span
                      v-for="(item, index) in allInfo.tags"
                      :key="index"
                    >{{
                      item.tagName
                    }}</span>
                  </div>
                </el-col>
              </el-row>-->
              <nav
                v-show="allInfo.status === 'WaitLeave' && leaveNavShow"
                class="nav"
              >
                <span>
                  <i class="el-icon-warning" />
                  提示：该员工因
                  {{ LeaveReason[leaveInfo.reason] }} 预计 {{ leaveInfo.lastDate }} 在离职。
                </span>
                <span
                  class="el-icon-close"
                  style="color:#207EFA;font-size: 20px;cursor:pointer"
                  @click="closeNav"
                />
              </nav>
            </el-main>
          </el-container>
        </div>

        <div class="staff-diff-info">
          <el-tabs
            v-model="tabs.activeTab"
            :stretch="stretch"
            @tab-click="handleClick"
          >
            <el-tab-pane
              label="在职信息"
              name="first"
            >
              <postInfo
                v-if="activeName == 'first'"
                :info.sync="allInfo"
              />
            </el-tab-pane>
            <el-tab-pane
              label="个人信息"
              name="second"
            >
              <personalInfo
                v-if="activeName == 'second'"
                :info.sync="allInfo"
              />
            </el-tab-pane>

            <el-tab-pane
              label="材料附件"
              name="third"
            >
              <upload-Data v-if="activeName == 'third'" />
            </el-tab-pane>
            <el-tab-pane
              label="操作记录"
              name="fourth"
            >
              <action-record v-if="activeName == 'fourth'" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </basic-container>
    <leaveDialog
      ref="leaveDialogRef"
      :refresh="getBasicInfo"
      :leave-reason="LeaveReasonDict"
    />
  </div>
</template>
<script>
import { getStaffBasicInfo } from '../../api/personalInfo.js'
import { getLeaveApply } from '@/api/approval/approval'
import { giveupLeave } from '@/api/leave/leave'
import postInfo from './detail/postInfo/index'
import personalInfo from './detail/staffInfo/index'
import actionRecord from './components/actionRecord'
import uploadData from './components/uploadData'
import leaveDialog from '@/views/personnel/leave/components/leaveDialog'
export default {
  name: 'UserDetail',
  components: {
    personalInfo,
    postInfo,
    actionRecord,
    uploadData,
    leaveDialog
  },
  data() {
    return {
      activeName: 'first',
      stretch: true,
      tabs: {
        activeTab: 'first'
      },
      circleUrl: '',
      allInfo: {},
      box: null,
      topValue: 0,
      leaveNavShow: true,
      leaveInfo: {},
      LeaveReason: {},
      LeaveReasonDict: []
    }
  },
  beforeRouteLeave(to, form, next) {
    document.querySelector('.sidebar-erea').style.position = 'relative'
    document.querySelector('.sidebar-erea').style.top = '0px'
    next()
  },
  mounted() {
    let _this = this
    this.box = document.querySelector('.staff-detail-info')
    // 监听这个dom的scroll事件
    this.box.addEventListener(
      'scroll',
      () => {
        let siderBar = document.querySelector('.sidebar-erea')
        if (_this.box.scrollTop - _this.topValue > 0) {
          if (_this.box.scrollTop >= 224) {
            siderBar.style.position = 'fixed'
            siderBar.style.top = 100 + 'px'
            siderBar.style.right = 20 + 'px'
          }
        } else {
          if (_this.box.scrollTop <= 224) {
            siderBar.style.position = 'relative'
            siderBar.style.top = 0
          }
        }
        _this.topValue = _this.box.scrollTop
      },
      false
    )
  },
  created() {
    this.getCSS()
  },
  activated() {
    this.getBasicInfo()
    this.leaveNavShow = true
  },
  methods: {
    jumpToLeavePrintProve() {
      this.$router.push('/personnel/leave/proveLeave?userId=' + this.allInfo.userId)
    },
    jumpToLeave() {
      this.$router.push('/personnel/leave/confirmLeave?userId=' + this.allInfo.userId)
    },
    toChangeLeaveInfo() {
      this.$refs.leaveDialogRef.showChangeDialog(this.allInfo)
    },
    giveupLeave() {
      giveupLeave({ id: this.leaveInfo.id }).then(() => {
        this.$message.success('操作成功')
        this.getBasicInfo()
      })
    },
    closeNav() {
      this.leaveNavShow = false
    },
    getCSS() {
      return require('./detail/staffInfo.scss')
    },
    getStatus() {
      if (this.allInfo.status == 'Try') {
        return '试用期'
      } else if (this.allInfo.status == 'Formal') {
        return '正式'
      } else if (this.allInfo.status == 'Leaved') {
        return '已离职'
      } else if (this.allInfo.status == 'WaitLeave') {
        return '待离职'
      } else {
        return ''
      }
    },
    checkLeaderInfo(leaderId) {
      this.$router.push('/personnel/detail/' + leaderId)
    },
    getBasicInfo() {
      let params = {
        userId: this.$route.params.userId
      }
      getStaffBasicInfo(params).then((res) => {
        this.allInfo = res
        res.status === 'WaitLeave' &&
          getLeaveApply(params).then((response) => {
            this.leaveInfo = response
          })
        res.status === 'WaitLeave' &&
          this.$store.dispatch('CommonDict', 'LeaveReason').then((res) => {
            this.LeaveReasonDict = res
            res.forEach((item) => {
              this.LeaveReason[item.dictKey] = item.dictValue
            })
          })
      })
    },
    goBack() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
    },
    handleClick(tab) {
      this.activeName = tab.name
    },
    // 跳去异动申请
    jumpToApply(userId) {
      this.$router.push({
        path: '/personnel/transaction/changeApply',
        query: {
          userId
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.basic-container {
  padding: 0 !important;
}
.survey-value {
  color: #0e001c;
  padding-left: 6px;
}
.grid-content {
  > .el-button {
    background: rgba(113, 129, 153, 0.1) !important;
    border-radius: 4px !important;
    width: 44px !important;
    height: 24px !important;
    padding: 0 !important;
    border: none !important;
  }
  .staff-name {
    font-size: 24px;
    color: #333333;
  }
  .workNo {
    line-height: 24px;
    padding: 0 15px;
    color: #202940;
  }
}
.staff-detail-info {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.staff-info-container {
  font-family: 'PingFangSC-Semibold;';
  font-size: 14px;
  /deep/ .el-card__body {
    padding: 0 !important;
  }
}
.staff-info-wrapper {
  // padding: 0 25px 25px 25px;
  background: #f0f2f5;
  // .staff-info-brad {
  //   font-size: 18px;
  //   color: #202940;
  //   padding: 10px 0 20px 0;
  // }
  .staff-survey {
    margin-bottom: 15px;
    .survey-inner-container {
      padding-left: 24px;
      position: relative;
      height: 160px;
      background: #fff;
      box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.08), 0 2px 2px 0 rgba(0, 0, 0, 0.04),
        0 4px 8px 4px rgba(0, 0, 0, 0.04);
      border-radius: 4px;
      font-size: 14px;
      color: #757c85;
      .el-main {
        overflow: hidden;
        padding-top: 20px !important;
      }
    }
  }
}
.detail-box {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
}
.staff-diff-info {
  background: #ffffff;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.08), 0 2px 2px 0 rgba(0, 0, 0, 0.04),
    0 4px 8px 4px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  /deep/ .el-tabs__header {
    .el-tabs__nav-wrap {
      padding-left: 24px;
      line-height: 50px;
      .el-tabs__item {
        font-size: 16px !important;
        color: #545b66 !important;
      }
    }
  }
}
// 人事异动按钮
.relative-box {
  position: relative;
  .personnel-change-btn {
    cursor: pointer;
    // background: #ffffff !important;
    // border-radius: 4px !important;
    // width: 70px !important;
    // height: 30px !important;
    // padding: 5px !important;
    // border: 1px solid #666 !important;
    // color: #666;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 50px;
  }
}
.nav {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  line-height: 26px;
  padding: 5px 20px;
  margin-top: 8px;
  height: 40px;
  margin-right: 50px;
  background: #edf8ff;
  border: 1px solid #73b9ff;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}
</style>

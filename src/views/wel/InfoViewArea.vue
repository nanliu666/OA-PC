<template>
  <div
    v-loading="loading"
    class="info-wrap"
  >
    <!-- 个人信息 -->
    <div
      class="info-box"
      @click="showUserCenter"
    >
      <!-- 头像 -->
      <div class="avatar-img-box">
        <el-image
          v-if="info.avatarUrl"
          class="avatar-img"
          :src="info.avatarUrl"
          fit="fill"
        />
        <i
          v-if="!info.avatarUrl"
          class="icon-usercircle"
        />
      </div>
      <!-- 姓名 -->
      <div class="name-row">
        <span>{{ info.name || '暂无数据' }}</span>
      </div>
      <!-- 部门信息 -->
      <div class="org-row ">
        <span>{{ info.jobName }}</span>
        <span>|</span>
        <span>{{ info.orgName }}</span>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="quick-access">
      <div class="title-wrap">
        <span class="title">快捷入口</span>
        <el-dropdown @command="handleCommand">
          <i class="el-icon-more" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="addMoreQuick">
              快捷入口设置
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div
        v-loading="quickLoading"
        class="main-wrap"
      >
        <div class="content">
          <div
            v-for="(item, index) in showEntryList"
            :key="index"
            class="content-item"
            @click="quickEnterlClick(item.id)"
          >
            <div class="Smectite" />
            <div
              class="icon-box tips"
              :class="{ add: item.id === 'add' }"
            >
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use :[symbolKey]="`#${item.icon ? item.icon : 'icon-infor-small'}`" />
              </svg>
            </div>
            <span>{{ item.name }}</span>
          </div>
          <div
            v-if="showEntryList.length >= 9"
            class="load-more"
            @click="triggerMore"
          >
            <div class="icon-container">
              <i
                :class="[isShowUp ? 'el-icon-arrow-down' : 'el-icon-arrow-up']"
                class="reset-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 工作概览 -->
    <div class="workView-wrap">
      <div class="title">
        工作概览
      </div>
      <div class="main-wrap">
        <div class="content">
          <div
            class="content-item"
            @click="jumpToWaitAppr"
          >
            <span class="num-box">{{ numObj.waitNum }}</span>
            <span class="handel">待我处理</span>
          </div>
          <div
            class="content-item"
            @click="jumpToApprByMe"
          >
            <span class="num-box">{{ numObj.myNum }}</span>
            <span class="handel">我发起的</span>
          </div>
          <div
            class="content-item"
            @click="jumpToCopyApprToMe"
          >
            <span class="num-box">{{ numObj.ccNum }}</span>
            <span class="handel">抄送我的</span>
          </div>
        </div>
      </div>
    </div>
    <entry-dialog
      ref="refEntry"
      :init-data="_.cloneDeep(initQuickEnter)"
      @refresh="refreshEntry"
    />
  </div>
</template>

<script>
import { fetchApproveStat, getShortcutInfo } from '@/api/msg/msg'
import { getStaffBasicInfo } from '@/api/personalInfo'
import { mapGetters } from 'vuex'
export default {
  name: 'InfoViewArea',
  components: {
    EntryDialog: () => import('./components/addEntryQuick')
  },
  data() {
    return {
      quickLoading: false,
      isShowLoadMore: true,
      isShowUp: true,
      symbolKey: 'xlink:href',
      showEntryList: [],
      initQuickEnter: [],
      info: {},
      // 待我处理
      waitForMeNum: 0,
      loading: false,
      numObj: {
        ccNum: 0,
        myNum: 0,
        waitNum: 0
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userId'])
  },

  created() {
    this.loadingUserInfo()
    this.getQuickEntryList()
  },
  methods: {
    triggerMore() {
      this.isShowUp = !this.isShowUp
      this.getShowEntryList(this.isShowUp)
    },
    getShowEntryList(conditions) {
      this.showEntryList = conditions ? this.initQuickEnter.slice(0, 9) : this.initQuickEnter
    },
    /**
     * 获取用户快捷入口
     */
    getQuickEntryList() {
      let params = {
        userId: this.userId
      }
      this.quickLoading = true
      getShortcutInfo(params).then((res) => {
        let initQuickEnterList = res.filter((item) => !!item.path)
        this.initQuickEnter = initQuickEnterList
        this.getShowEntryList(this.initQuickEnter.length > 9)
        this.quickLoading = false
      })
    },
    quickEnterlClick(id) {
      let pathData = this.initQuickEnter.filter((item) => item.id === id)
      this.$router.push(pathData[0].path)
    },
    showUserCenter() {
      this.$router.push('/info/index')
    },
    refreshEntry() {
      this.getQuickEntryList()
    },
    handleCommand() {
      this.$refs.refEntry.entryShow = true
    },
    // 点击添加员工
    jumpToAddUser() {
      this.$router.push({
        path: '/personnel/addRoster'
      })
    },
    // 开发中
    handelClick() {
      this.$message.info('该功能正在开发中')
    },
    // 获取员工信息
    async loadingUserInfo() {
      this.loading = true
      try {
        let res = await getStaffBasicInfo({ userId: this.userInfo.user_id })
        this.info = res
        this.loading = false
        this.$store.dispatch('set_info', res)
        let { ccNum, myNum, waitNum } = await fetchApproveStat({ userId: this.userInfo.user_id })
        this.numObj = { ccNum, myNum, waitNum }
      } catch {
        this.loading = false
      }
    },
    // 跳去通讯录
    goToMailList() {
      this.$router.push({
        path: '/quickAccess/mailList'
      })
    }, // 跳去待我处理
    jumpToWaitAppr() {
      this.$router.push({ path: '/apprProcess/appr/waitAppr' })
    },
    // 跳去我发起的
    jumpToApprByMe() {
      this.$router.push({ path: '/apprProcess/appr/apprByMe' })
    },
    // 跳去抄送我的
    jumpToCopyApprToMe() {
      this.$router.push({ path: '/apprProcess/appr/copyApprToMe' })
    },
    // 跳去通用申请
    jumpToCommonAppr() {
      this.$router.push({ path: '/apprProcess/launchApply' })
    }
  }
}
</script>

<style lang="scss" scoped>
.load-more {
  cursor: pointer;
  margin-top: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: calc(50% - 28px - 24px);
    height: 1px;
    background-color: #e3e7e9;
  }
  &::before {
    left: 24px;
  }
  &::after {
    right: 24px;
  }
  .icon-container {
    background-color: #a0a8ae;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .reset-icon {
      font-size: 12px;
      color: #ffffff;
    }
    .el-icon-arrow-down {
      margin-left: 1px;
      margin-top: 2px;
    }
  }
}
.info-wrap {
  width: 100%;
  height: 100%;
  background: #ffffff;
  overflow: auto;
  box-shadow: 0px 8px 16px 4px rgba(0, 0, 0, 0.04), 0px 4px 4px 0px rgba(0, 0, 0, 0.04),
    0px 0px 4px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
}
// 个人信息开始
.info-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding-top: 32px;
  .avatar-img-box {
    height: 116px;
    width: 116px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background-color: #ececf3;
    overflow: hidden;
    .avatar-img {
      border: 5px solid #ffffff;
      width: 104px;
      height: 104px;
      border-radius: 100%;
    }
    .icon-usercircle {
      font-size: 116px;
      line-height: 116px;
      color: #cfd3d6;
    }
  }
  // 姓名
  .name-row {
    margin-top: 8px;
    span {
      font-size: 16px;
      color: #202940;
      line-height: 24px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
    }
  }
  // 部门信息
  .org-row {
    margin-top: 4px;
    :nth-child(2) {
      margin: 0 4px;
      vertical-align: middle;
    }
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #a0a8ae;
    line-height: 18px;
    font-weight: 400;
    font-family: PingFangSC-Regular, PingFang SC;
  }
}

.quick-access {
  // 标题
  .title-wrap {
    margin-top: 38px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;

    .title {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #212a3f;
      line-height: 24px;
      font-weight: 500;
    }
    i {
      cursor: pointer;
    }
  }
  //
  .main-wrap {
    display: flex;
    justify-content: center;
    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      &::after {
        flex: auto;
        content: ' ';
        width: calc(100% / 3); //这个宽度和子元素宽度一致
        height: 0;
        display: block;
      }
      .content-item {
        width: calc(100% / 3);
        margin-top: 14px;
        height: 76px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .Smectite {
          display: none;
        }
        cursor: pointer;
        span {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #718199;
          letter-spacing: -0.05px;
          display: inline-block;
          text-align: center;
        }
      }
      .content-item:hover {
        span {
          color: #207efa;
        }
        position: relative;
        .Smectite {
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
}
.icon-box {
  width: 48px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  border-radius: 100%;
  margin-bottom: 4px;
  .icon {
    margin-top: 8px;
    width: 40px;
    height: 40px;
  }
}

.add {
  border: 1px dashed #e3e7e9;
  border-radius: 24px;
  color: #a0a8ae;
  .icon {
    width: 16px;
    height: 16px;
  }
}

// 工作概览
.workView-wrap {
  margin-top: 48px;

  .title {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #212a3f;
    line-height: 24px;
    padding-left: 24px;
    font-weight: 500;
  }
  .main-wrap {
    display: flex;
    justify-content: center;

    .content {
      width: 248px;
      display: flex;
      justify-content: space-around;
      .content-item {
        width: 56px;
        height: 95px;
        cursor: pointer;
        .num-box {
          opacity: 0.8;
          font-family: DINAlternate-Bold;
          font-size: 32px;
          color: #202940;
          text-align: center;
          line-height: 32px;
          width: 100%;
          font-weight: bold;
          margin: 24px 0 8px 0;
        }
        .handel {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #718199;
          letter-spacing: -0.05px;
        }
        span {
          text-align: center;
          display: inline-block;
        }
      }
      .content-item:hover span {
        color: #207efa;
      }
    }
  }
}
</style>

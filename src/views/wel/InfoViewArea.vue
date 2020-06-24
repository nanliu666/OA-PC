<template>
  <div
    v-loading="loading"
    class="info-wrap"
  >
    <!-- 个人信息 -->
    <div class="info-box">
      <!-- 头像 -->
      <div class="avatar-row ">
        <div class="avatar-img">
          <i class="icon-usercircle" />
        </div>
      </div>
      <!-- 姓名 -->
      <div class="name-row ">
        <span>{{ info.name }}</span>
      </div>
      <!-- 部门信息 -->
      <div class="org-row ">
        <span>{{ info.positionName }}</span>
        <span>|</span>
        <span>{{ info.companyName }}</span>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="quick-access">
      <div class="title-wrap">
        <span class="title">快捷入口</span>
      </div>
      <div class="main-wrap">
        <div class="content">
          <div
            class="content-item"
            @click="handelClick"
          >
            <div class="icon-box tips">
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-remind-bicolor" />
              </svg>
            </div>
            <span>新建提醒</span>
          </div>
          <div
            class="content-item"
            @click="handelClick"
          >
            <div class="icon-box apply">
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-approval-Seal-bicolor" />
              </svg>
            </div>
            <span>通用申请</span>
          </div>
          <div
            class="content-item"
            @click="handelClick"
          >
            <div class="icon-box  arrange">
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-interview-bicolor" />
              </svg>
            </div>
            <span>安排面试</span>
          </div>
          <div
            class="content-item"
            @click="handelClick"
          >
            <div class="icon-box book">
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-directories-bicolor" />
              </svg>
            </div>
            <span>通讯录</span>
          </div>
          <div
            class="content-item"
            @click="jumpToAddUser"
          >
            <div class="icon-box add">
              +
            </div>
            <span>添加员工</span>
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
          <div class="content-item">
            <span class="num-box">{{ todoCount || '--' }}</span>
            <span class="handel">待我处理</span>
          </div>
          <div class="content-item">
            <span class="num-box">--</span> <span class="handel">我发起的</span>
          </div>
          <div class="content-item">
            <span class="num-box">--</span> <span class="handel">抄送我的</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStaffBasicInfo } from '@/api/personalInfo'
import { mapGetters } from 'vuex'
export default {
  name: 'InfoViewArea',
  props: {
    todoCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      info: {},
      // 待我处理
      waitForMeNum: 0,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.loadingUserInfo()
  },
  methods: {
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
      let res = await getStaffBasicInfo({ userId: this.userInfo.user_id })
      this.$store.dispatch('set_info', res)
      this.info = res
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.info-wrap {
  height: 90vh;
  width: 100%;

  background: #ffffff;
  overflow: auto;
}
// 个人信息开始
.info-box {
  display: flex;
  flex-direction: column;
  align-items: center;

  // 头像
  .avatar-row {
    margin-top: 32px;
    .avatar-img {
      height: 116px;
      width: 116px;
      border-radius: 100%;

      position: relative;

      .icon-usercircle {
        font-size: 116px;
        vertical-align: middle;
        color: #cfd3d6;
      }
    }
  }
  // 姓名
  .name-row {
    margin-top: 8px;
    span {
      font-size: 16px;
      color: #202940;
      line-height: 24px;
    }
  }
  // 部门信息
  .org-row {
    margin-top: 4px;
    :nth-child(2) {
      padding: 0 7px;
      vertical-align: middle;
    }
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #a0a8ae;
    line-height: 18px;
  }
}

// 快捷入口开始
.quick-access {
  // 标题
  .title-wrap {
    margin-top: 38px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    padding: 0 24px;

    .title {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #212a3f;
      line-height: 24px;
    }
    span {
      cursor: pointer;
    }
  }
  //
  .main-wrap {
    display: flex;
    justify-content: center;
    .content {
      width: 248px;
      display: flex;
      flex-wrap: wrap;
      > :nth-child(3n + 2) {
        margin: 0 40px;
      }
      .content-item {
        margin-top: 14px;
        width: 56px;
        height: 76px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        span {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #718199;
          letter-spacing: -0.05px;
          display: inline-block;
          text-align: center;
          width: 56px;
        }
        i {
          display: inline-block;
          font-size: 36px;
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
}
.icon {
  margin-top: 8px;
  width: 32px;
  height: 32px;
}
.add {
  border: 1px dashed #e3e7e9;
  border-radius: 24px;
  font-size: 24px;
  color: #a0a8ae;
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
        .num-box {
          opacity: 0.8;
          font-family: DINAlternate-Bold;
          font-size: 32px;
          color: #202940;
          text-align: center;
          line-height: 32px;
          width: 100%;

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
    }
  }
}
</style>

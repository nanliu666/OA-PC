<template>
  <div class="info-wrap">
    <!-- 个人信息 -->
    <div class="info-box">
      <!-- 头像 -->
      <div class="avatar-row ">
        <div class="avatar-img">
          <img
            src="http://b-ssl.duitang.com/uploads/item/201707/10/20170710210234_y3Kf5.jpeg"
            alt=""
          >
          <span class="add-btn">+</span>
        </div>
      </div>
      <!-- 姓名 -->
      <div class="name-row ">
        <span>SerAti Zhi</span>
      </div>
      <!-- 部门信息 -->
      <div class="org-row ">
        <span>人事专员</span>
        <span>|</span>
        <span>易宝软件广州分公司</span>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="quick-access">
      <div class="title-wrap">
        <span class="title">快捷入口</span> <span>...</span>
      </div>
      <div class="main-wrap">
        <div class="content">
          <div class="content-item">
            <div class="icon-box tips">
              <i class="iconfont icon-menu-entry-filled" />
            </div>
            <span>新建提醒</span>
          </div>
          <div class="content-item">
            <div class="icon-box apply">
              <i class="iconfont icon-menu-recruit-filled" />
            </div>
            <span>通用申请</span>
          </div>
          <div class="content-item">
            <div class="icon-box  arrange">
              <i class="iconfont icon-menu-contract-filled" />
            </div>
            <span>安排面试</span>
          </div>
          <div class="content-item">
            <div class="icon-box book">
              <i class="iconfont icon-menu-flow_W" />
            </div>
            <span>通讯录</span>
          </div>
          <div class="content-item">
            <div class="icon-box add">
              <i class="iconfont icon-tips-add-outlined" />
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
            <span class="num-box">12</span> <span class="handel">待我处理</span>
          </div>
          <div class="content-item">
            <span class="num-box">12</span> <span class="handel">待我处理</span>
          </div>
          <div class="content-item">
            <span class="num-box">12</span> <span class="handel">待我处理</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoViewArea',
  components: {}
}
</script>

<style lang="scss" scoped>
.info-wrap {
  // position: fixed;
  // left: 32px;
  // top: 64px;
  height: 90vh;
  width: 332px;
  // margin-top: 16px;
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
      border: 5px solid #ececf3;
      position: relative;
      img {
        width: 116px;
        height: 116px;
        border-radius: 100%;
      }
      .add-btn {
        display: inline-block;
        text-align: center;
        line-height: 18px;
        border-radius: 100%;
        border: solid 2px #ffffff;
        width: 18px;
        height: 18px;
        color: #ffffff;
        background: #207efa 100%;
        position: absolute;
        right: 0;
        top: 70%;
      }
    }
  }
  // 姓名
  .name-row {
    margin-top: 8px;
    span {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #202940;
      line-height: 24px;
    }
  }
  // 部门信息
  .org-row {
    margin-top: 4px;
    :nth-child(2) {
      vertical-align: text-bottom;
    }
    font-family: PingFangSC-Regular;
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
.tips {
  background: rgb(31, 245, 85);
}
.apply {
  background: rgb(5, 201, 207);
}
.arrange {
  background: rgb(250, 45, 189);
}
.book {
  background: rgb(235, 70, 70);
}
.add {
  background: rgb(252, 255, 58);
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

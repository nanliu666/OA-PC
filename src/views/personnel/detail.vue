<template>
  <basic-container class="staff-info-container">
    <div class="staff-info-wrapper">
      <div class="staff-info-brad">
        <span><i
          class="el-icon-arrow-left"
          @click="goBack"
        /></span>
        <span>个人信息</span>
      </div>
      <div class="staff-survey">
        <el-container class="survey-inner-container">
          <el-aside width="100px">
            <div class="detail-box">
              <div class="demo-basic--circle ">
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
              class="grid-content"
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
            </div>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="grid-content">
                  <span>手机号码:</span>
                  <span class="survey-value"> {{ allInfo.phonenum }}</span>
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
                  <span style="color: #368AFA;">{{ allInfo.leaderName }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <span>标签：</span>
                  <span> {{ allInfo.tags.tagName }}</span>
                </div>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </div>

      <div class="staff-diff-info">
        <el-tabs v-model="tabs.activeTab">
          <el-tab-pane
            label="在职信息"
            name="first"
          >
            在职信息
          </el-tab-pane>
          <el-tab-pane
            label="个人信息"
            name="second"
          >
            <div class="personal-deatil-info">
              <el-row :gutter="20">
                <!-- 内容区域 -->
                <el-col
                  :span="21"
                  class="main-content-erea"
                >
                  <!-- 基本信息 -->
                  <basicInfo :info="allInfo" />
                  <!-- 紧急联系人 -->
                  <emergency />

                  <!-- 薪资银行卡 -->
                  <bank :info="allInfo" />
                  <!-- 社保公积金 -->
                  <social :info="allInfo" />
                  <!-- 教育经历 -->
                  <education />

                  <!-- 工作经历 -->

                  <work />
                  <!-- 培训经历 -->

                  <train />

                  <!-- 证书认证 -->
                  <certificate />

                  <!-- 家庭信息 -->
                  <family />
                </el-col>

                <!-- 右侧锚点导航 -->
                <el-col
                  :span="2"
                  :offset="1"
                  class="sidebar-erea"
                >
                  <div class="sidebar-line">
                    <span class="flow-line" />
                  </div>
                  <ul
                    class="right-aside-bar"
                    style="position:relative;"
                  >
                    <li
                      v-for="(item, index) in asideBar"
                      :key="index"
                      class="asider-bar-item"
                      :class="{ activeBar: index == filterNavItemActive }"
                    >
                      <span @click="goAnchor(item.contentId, index, $event)">{{ item.title }}</span>
                    </li>
                  </ul>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>

          <el-tab-pane
            label="材料附件"
            name="third"
          >
            材料附件
          </el-tab-pane>

          <el-tab-pane
            label="操作信息"
            name="four"
          >
            操作信息
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </basic-container>
</template>
<script>
import { getStaffBasicInfo } from '../../api/personalInfo.js'
import basicInfo from './detail/staffInfo/basicInfo'
import emergency from './detail/staffInfo/emergency'
import education from './detail/staffInfo/education'
import work from './detail/staffInfo/work'
import train from './detail/staffInfo/trainning'
import certificate from './detail/staffInfo/certificate'
import family from './detail/staffInfo/family'
import bank from './detail/staffInfo/bank'
import social from './detail/staffInfo/social-security'
export default {
  components: {
    basicInfo,
    emergency,
    education,
    work,
    train,
    certificate,
    family,
    bank,
    social
  },
  data() {
    return {
      box: null,
      topValue: 0,
      tabs: {
        activeTab: 'first'
      },
      filterNavItemActive: 0,
      asideBar: [
        {
          title: '基本信息',
          contentId: 'basic'
        },
        {
          title: '紧急联系人',
          contentId: 'emergency'
        },
        {
          title: '工资银行卡',
          contentId: 'bank'
        },
        {
          title: '社保公积金',
          contentId: 'social-security'
        },
        {
          title: '教育经历',
          contentId: 'education'
        },
        {
          title: '工作经历',
          contentId: 'work'
        },
        {
          title: '培训经历',
          contentId: 'trainning'
        },
        {
          title: '资格证书',
          contentId: 'certificate'
        },
        {
          title: '家庭信息',
          contentId: 'family'
        }
      ],
      circleUrl: '',
      allInfo: {}
    }
  },
  created() {
    this.getBasicInfo()
  },
  mounted() {
    this.box = document.querySelector('#avue-view')
    // 监听这个dom的scroll事件
    this.box.addEventListener(
      'scroll',
      () => {
        let siderBar = document.querySelector('.sidebar-erea')
        if (this.box.scrollTop - this.topValue > 0) {
          if (this.box.scrollTop >= 240) {
            siderBar.style.position = 'fixed'
            siderBar.style.top = 100 + 'px'
            siderBar.style.right = 20 + 'px'
          }
        } else {
          if (this.box.scrollTop <= 240) {
            siderBar.style.position = 'relative'
            siderBar.style.top = 0
          }
        }
        this.topValue = this.box.scrollTop
      },
      false
    )
  },
  methods: {
    getStatus() {
      if (this.allInfo.status == 'Try') {
        return '试用期'
      } else if (this.allInfo.status == 'Formal') {
        return '正式'
      } else if (this.allInfo.status == 'Leaved') {
        return '已离职'
      } else {
        return '待离职'
      }
    },
    getBasicInfo() {
      let params = {
        userId: '20200426'
      }
      getStaffBasicInfo(params).then((res) => {
        this.allInfo = res.response
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    goAnchor(selector, index, event) {
      //设置跟随线的位置
      document.querySelector('.flow-line').style.top = event.target.offsetTop - 12 + 'px'
      let selecterId = `#${selector}`
      //设置点击的样式
      this.filterNavItemActive = index
      //页面滚动到具体位置
      // this.$el.querySelector(selecterId).scrollIntoView();
      this.box.scrollTop = this.$el.querySelector(selecterId).offsetTop
    }
  }
}
</script>
<style lang="scss" scoped>
li {
  list-style: none;
}
ul {
  margin: 0;
  padding: 0;
}
.el-row {
  margin: 0 !important;
  margin-bottom: 10px !important;
}
.el-col {
  padding: 0 !important;
}
.activeBar {
  color: #368afa;
}
.basic-container {
  padding: 0 !important;
}
.survey-value {
  color: #0e001c;
  padding-left: 6px;
}
.grid-content {
  .el-button {
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
.staff-info-container {
  font-family: 'PingFangSC-Semibold;';
  font-size: 14px;
  /deep/ .el-card__body {
    padding: 0 !important;
  }
}
.staff-info-wrapper {
  padding: 0 25px 25px 25px;
  background: #f0f2f5;
  .staff-info-brad {
    font-size: 18px;
    color: #202940;
    padding: 10px 0 20px 0;
  }
  .staff-survey {
    margin-bottom: 15px;
    .survey-inner-container {
      padding-left: 24px;
      position: relative;
      height: 160px;
      background: #fff;
      box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.08), 0 2px 2px 0 rgba(0, 0, 0, 0.04), 0 4px 8px 4px rgba(0, 0, 0, 0.04);
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
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.08), 0 2px 2px 0 rgba(0, 0, 0, 0.04), 0 4px 8px 4px rgba(0, 0, 0, 0.04);
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
.personal-deatil-info {
  position: relative;
}
.sidebar-line {
  float: left;
  position: relative;
  margin-right: 15px;
  height: 300px;
  width: 2px;
  background: #ccc;
  margin-top: 12px;
}
.flow-line {
  display: inline-block;
  height: 20px;
  width: 3px;
  background: #368afa;
  position: absolute;
  top: 0;
  left: 0;
}
.asider-bar-item {
  line-height: 36px;
  cursor: pointer;
}
.sidebar-erea {
  position: relative;
  right: 0;
}
</style>

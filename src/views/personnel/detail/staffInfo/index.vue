<template>
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
        <ul class="right-aside-bar">
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
</template>

<script>
import basicInfo from './basicInfo'
import emergency from './emergency'
import education from './education'
import work from './work'
import train from './trainning'
import certificate from './certificate'
import family from './family'
import bank from './bank'
import social from './social-security'
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
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      box: null,
      filterNavItemActive: 0,
      topValue: 0,
      allInfo: {},
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
      ]
    }
  },
  watch: {
    info: {
      handler(val) {
        this.allInfo = val
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    let _this = this
    this.box = document.querySelector('#avue-view')
    // 监听这个dom的scroll事件
    this.box.addEventListener(
      'scroll',
      () => {
        let siderBar = document.querySelector('.sidebar-erea')
        if (_this.box.scrollTop - _this.topValue > 0) {
          if (_this.box.scrollTop >= 240) {
            siderBar.style.position = 'fixed'
            siderBar.style.top = 100 + 'px'
            siderBar.style.right = 20 + 'px'
          }
        } else {
          if (_this.box.scrollTop <= 240) {
            siderBar.style.position = 'relative'
            siderBar.style.top = 0
          }
        }
        _this.topValue = _this.box.scrollTop
      },
      false
    )
  },
  methods: {
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

<style></style>

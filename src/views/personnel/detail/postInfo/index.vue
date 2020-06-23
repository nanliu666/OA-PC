<template>
  <div class="personal-deatil-info">
    <el-row :gutter="20">
      <!-- 内容区域 -->
      <el-col
        :span="21"
        class="main-content-erea"
      >
        <!-- 基本信息 -->
        <postBasicInfo :info.sync="allInfo" />
        <!-- 员工状态 -->
        <staffStatus :info.sync="allInfo" />
        <!-- 合同信息 -->
        <compact />
        <!-- 任职记录 -->
        <postRecord />
      </el-col>

      <!-- 右侧锚点导航 -->
      <el-col
        :span="3"
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
</template>

<script>
import postBasicInfo from './basicInfo.vue'
import staffStatus from './staffStatus.vue'
import postRecord from './postRecord.vue'
import compact from './conpact.vue'
export default {
  components: {
    postBasicInfo,
    staffStatus,
    postRecord,
    compact
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
      allInfo: {},
      asideBar: [
        {
          title: '基本信息',
          contentId: 'post-basic'
        },
        {
          title: '员工状态',
          contentId: 'staff-status'
        },
        {
          title: '合同信息',
          contentId: 'pact-info'
        },
        {
          title: '任职记录',
          contentId: 'post-record'
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
    this.box = document.querySelector('.staff-detail-info')
  },
  beforeRouteLeave(to, form, next) {
    this.filterNavItemActive = 0
    document.querySelector('.flow-line').style.top = -2 + 'px'
    next()
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

<style lang="scss" scoped>
.sidebar-line {
  height: 120px !important;
}
</style>

<template>
  <!-- <div>首页</div> -->
  <div class="page clearfix">
    <div class="aside">
      <infoViewArea />
    </div>
    <div class="main">
      <workArea />
      <taskCenterCard />
      <scheduleCard />
      <noticeAndNews />
    </div>
    <mg-footer class="footer-style" />
  </div>
</template>

<script>
import noticeAndNews from './noticeAndNews'
import infoViewArea from './InfoViewArea'
import workArea from './workArea'
import taskCenterCard from './taskCenterCard'
import scheduleCard from './scheduleCard'
export default {
  name: 'Wel',
  components: {
    infoViewArea,
    noticeAndNews,
    workArea,
    taskCenterCard,
    scheduleCard,
    MgFooter: () => import('@/components/footer/footer')
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.footer-style {
  color: #a0a8ae;
  bottom: -8px;
}
.el-font-size {
  font-size: 14px;
}
.page {
  padding-top: 24px;
  width: 100%;
  padding-bottom: 32px;
  display: flex;
  justify-content: space-between;
  .aside {
    height: 100%;
    width: 332px;
    box-shadow: 0px 8px 16px 4px rgba(0, 0, 0, 0.04), 0px 4px 4px 0px rgba(0, 0, 0, 0.04),
      0px 0px 4px 0px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
  }
  .main {
    flex: 1;
    margin-left: 16px;
    height: calc(100% + 24px);
    margin-top: -24px;
    padding-top: 24px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
/* 清楚浮动 */
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
</style>

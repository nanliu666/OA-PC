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
      <mg-footer class="footer-style" />
    </div>
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
  position: relative;
  height: 32px;
  width: 100vw;
  margin-left: -348px;
}
.el-font-size {
  font-size: 14px;
}
.page {
  padding-top: 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .aside {
    height: 100%;
    width: 332px;
    padding-bottom: 32px;
  }
  .main {
    flex: 1;
    margin-left: 16px;
    margin-right: -16px;
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

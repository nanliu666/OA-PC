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
  width: 100vw;
  margin-left: -364px;
  color: #a0a8ae;
}
.el-font-size {
  font-size: 14px;
}
.page {
  margin-top: 24px;
  width: 100%;
  padding-bottom: 25px !important;
  .aside {
    float: left;
    width: 332px;
  }
  .main {
    float: right;
    width: calc(100vw - 415px);
    // width: calc(100% - 22vw);
  }
}
/* 清楚浮动 */
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
</style>

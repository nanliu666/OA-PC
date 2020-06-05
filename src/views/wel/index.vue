<template>
  <!-- <div>首页</div> -->
  <div class="page clearfix">
    <div class="aside">
      <infoViewArea />
    </div>
    <div class="main">
      <workArea />
    </div>
  </div>
</template>

<script>
import infoViewArea from './InfoViewArea'
import workArea from './workArea'
export default {
  name: 'Wel',
  components: {
    infoViewArea,
    workArea
  }
}
</script>

<style lang="scss" scoped>
.el-font-size {
  font-size: 14px;
}
.page {
  margin-top: 24px;
  width: 100%;
  .aside {
    float: left;
    width: 332px;
  }
  .main {
    float: left;
    width: calc(100% - 380px);
    margin-left: 16px;
  }
}
/* 清楚浮动 */
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
</style>

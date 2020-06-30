<template>
  <!-- <div>首页</div> -->
  <div class="page clearfix">
    <div class="aside">
      <infoViewArea :todo-count="todoCount" />
    </div>
    <div class="main">
      <workArea :todo-count.sync="todoCount" />
      <taskCenterCard />
    </div>
  </div>
</template>

<script>
import infoViewArea from './InfoViewArea'
import workArea from './workArea'
import taskCenterCard from './taskCenterCard'
export default {
  name: 'Wel',
  components: {
    infoViewArea,
    workArea,
    taskCenterCard
  },
  data() {
    return {
      todoCount: 0
    }
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

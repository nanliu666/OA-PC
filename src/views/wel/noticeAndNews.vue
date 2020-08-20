<template>
  <div class="notifyAndNews">
    <noticeCard />
    <!-- <newsCard /> -->
  </div>
</template>

<script>
import noticeCard from './noticeCard'
// import newsCard from './newsCard'
export default {
  name: 'NotifyAndNews',
  components: {
    noticeCard
    // newsCard
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.notifyAndNews {
  margin-top: 19px;
  display: flex;
  justify-content: space-between;
  height: 400px;
  /deep/ .el-card__body {
    padding-top: 16px;
  }
}
</style>

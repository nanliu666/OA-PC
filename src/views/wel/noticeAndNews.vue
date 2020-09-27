<template>
  <el-row
    type="flex"
    class="notifyAndNews"
  >
    <el-col
      class="fill"
      :span="12"
    >
      <noticeCard class="fill" />
    </el-col>
    <el-col
      class="fill"
      :span="12"
    >
      <newsCard class="fill" />
    </el-col>
  </el-row>
</template>

<script>
import noticeCard from './noticeCard'
import newsCard from './newsCard'
export default {
  name: 'NotifyAndNews',
  components: {
    noticeCard,
    newsCard
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.notifyAndNews {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  height: 342px;
}
</style>

<template>
  <div class="notifyAndNews">
    <noticeCard />
    <newsCard />
  </div>
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

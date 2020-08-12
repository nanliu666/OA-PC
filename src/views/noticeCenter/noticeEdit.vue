<template>
  <div class="notice-edit">
    <page-header
      :title="title"
      show-back
    />
    <el-card>
      1
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'NoticeEdit',
  data() {
    return {
      title: '发布公告'
    }
  },
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      if (form.path === '/noticeCenter/noticeDrafts') {
        vm.title = '编辑公告'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.notice-edit {
}
</style>

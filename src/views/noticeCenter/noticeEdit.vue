<template>
  <div class="notice-edit">
    <page-header
      :title="title"
      show-back
    />
    <el-card>
      <div class="content-li">
        <div class="li-label">
          <span style="color: red">*</span>
          <span>公告标题</span>
        </div>
        <el-input
          v-model="form.title"
          class="input-class"
          placeholder="请输入公告标题"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'NoticeEdit',
  data() {
    return {
      title: '发布公告',
      form: {
        title: ''
      }
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
  .content-li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .li-label {
      font-size: 16px;
      color: #0e001c;
      margin-right: 16px;
    }
    .input-class {
      flex: 1;
    }
  }
}
</style>

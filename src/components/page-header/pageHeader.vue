<template>
  <div class="header">
    <span class="title">
      <i
        v-if="showBack"
        class="el-icon-arrow-left"
        style="margin-right:12px"
        @click="goBack"
      />
      <span>{{ title }}</span>
      <slot name="subTitle" />
    </span>
    <div class="button--wr">
      <slot name="rightMenu" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 是否展示返回按钮
    showBack: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.title {
  font-weight: bold;
  font-size: 18px;
  padding: 14px 0 16px;
  line-height: 28px;
}
.button--wr {
  padding-bottom: 18px;
  padding-top: 6px;
}
</style>

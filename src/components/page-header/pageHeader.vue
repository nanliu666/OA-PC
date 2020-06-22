<template>
  <div class="header">
    <span class="title">
      <i
        v-if="showBack"
        class="el-icon-arrow-left"
        style="margin-right:12px;cursor: pointer;"
        @click="goBack"
      />
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
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
    },
    // 自定义返回方法
    back: {
      type: Function,
      default: null
    }
  },
  methods: {
    goBack() {
      if (this.back) {
        this.back()
        return
      }
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
  padding: 24px 0 16px;
  line-height: 28px;
}
.button--wr {
  padding-bottom: 16px;
  padding-top: 16px;
}
</style>

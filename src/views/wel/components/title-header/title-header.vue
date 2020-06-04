<template>
  <div class="header">
    <span class="title">
      <span>{{ title }}</span>
      <i
        v-if="showIcon"
        class="el-icon-arrow-right"
        style="margin-right:12px;cursor: pointer;"
      />
    </span>
  </div>
</template>

<script>
export default {
  name: 'TitleHeader',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 是否展示返回按钮
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.title {
  font-family: PingFangSC-Medium;
  font-weight: bold;
  font-size: 18px;
  padding: 14px 0 16px;
  line-height: 28px;
  color: #202940;
}
</style>

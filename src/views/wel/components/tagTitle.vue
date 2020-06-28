<template>
  <div class="header">
    <span class="title">
      <span>{{ title }}</span>
      <i
        v-if="icon"
        class="icon-arrow-right-outlined"
        style="margin-right:12px;cursor: pointer; "
        @click="handelClick"
      />
    </span>
  </div>
</template>

<script>
export default {
  name: 'TagTitle',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 图标
    icon: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handelClick(e) {
      this.$emit('click', e)
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
  color: #202940;
  .icon-arrow-right-outlined:before {
    color: #a0a8ae;
  }
}
.button--wr {
  padding-bottom: 18px;
  padding-top: 6px;
}
</style>

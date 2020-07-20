<template>
  <div class="HeaderTabs">
    <span
      class="tabs__link"
      :class="{ 'tabs__link--active': value === 'iSubmit' }"
      @click="() => $emit('input', 'iSubmit')"
    >
      我提交的招聘需求
    </span>
    <el-divider direction="vertical" />
    <span
      class="tabs__link"
      :class="{ 'tabs__link--active': value === 'all' }"
      @click="() => $emit('input', 'all')"
    >全部招聘需求</span>
  </div>
</template>

<script>
export default {
  name: 'HeaderTabs',
  props: {
    value: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="sass">
$color_active: #368AFA

.HeaderTabs
  .tabs__link
    cursor: pointer
    &--active
      color: $color_active
      cursor: default
</style>

<template>
  <div class="PageHeaderTabs">
    <template v-for="(tab, index) of options">
      <span
        :key="index"
        :class="{ 'tabs__link--active': value === tab.value }"
        class="tabs__link"
        @click="() => handleTabClick(tab.value)"
      >
        {{ tab.label }}
      </span>
      <el-divider
        v-if="_.lt(index + 1, options.length)"
        :key="index"
        direction="vertical"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'PageHeaderTabs',
  props: {
    value: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleTabClick(value) {
      ['input', 'change', 'switch'].forEach((eventName) => {
        this.$emit(eventName, value)
      })
    }
  }
}
</script>

<style lang="sass">
@import "~@/styles/variables.scss"

.PageHeaderTabs
  .tabs__link
    cursor: pointer
    &--active
      color: $primaryColor
      cursor: default
</style>

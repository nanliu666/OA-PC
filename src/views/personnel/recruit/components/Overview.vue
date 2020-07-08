<template>
  <el-row
    class="Overview"
    type="flex"
    :gutter="52"
  >
    <el-col
      v-for="(col, index) of value"
      :key="index"
      :span="8"
      class="Overview__item"
    >
      <span class="Overview__item--label">{{ col.label }}</span>
      <span class="Overview__item--value">{{ col.value }}</span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Overview',
  props: {
    value: {
      type: Array,
      default: _.stubArray
    }
  }
}
</script>

<style lang="sass">
$color_active: #207EFA
$color_border: #CCC
$color_background: #f7f8fa
$color_label: #718199
$color_value: #202940

.Overview
  margin: 20px 0
  border-radius: 4px
  margin-right: 20px
  display: flex
  padding: 20px 0
  background-color: $color_background
  margin-left: -3px
  margin-right: -1px
  .text_active
    color: $color_active
  &__item:not(:last-child)
    border-right: solid 1px $color_border
    padding-left: 0px
    padding-right: 0px
  &__item
    &--label
      width: 80px
      display: block
      font-size: 12px
      color: $color_label
      line-height: 18px
      text-align: center
      margin-bottom: 10px
      margin: auto
    &--value
      margin-top: 5px
      display: block
      text-align: center
      font-family: PingFangSC-Regular
      font-size: 14px
      color: $color_value
</style>

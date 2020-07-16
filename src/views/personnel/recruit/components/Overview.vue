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
      <span
        class="Overview__item--value"
        :class="col | getClass"
      >{{ translator(col) }}</span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Overview',
  filters: {
    getClass: ({ $config: config }) => {
      if (config && config.className) return config.className
      else return ''
    }
  },
  props: {
    value: {
      type: Array,
      default: _.stubArray
    }
  },
  data() {
    return {
      dictionarys: {}
    }
  },
  methods: {
    // 查询字典字段
    translator(col) {
      let { $config: config, value } = col
      if (!config || !config.dictKey || !value) {
        return value
      }

      let dicts = this.dictionarys[config.dictKey]
      // 如果字典为 undefined 时候加载字典
      if (!dicts) this.pushDiction(config.dictKey)
      let result = value
      _.each(dicts, (item) => {
        if (item.dictKey === value.trim()) {
          result = item.dictValue
          return false
        }
      })
      return result
    },

    async pushDiction(dictKey) {
      const dict = await this.$store.dispatch('CommonDict', dictKey)
      this.$set(this.dictionarys, dictKey, dict)
    }
  }
}
</script>

<style lang="sass">
$color_active: #207EFA
$color_background: #f7f8fa
$color_border: #CCC
$color_danger: #FF8B8A
$color_info: #718199
$color_success: #7AD683
$color_text_label: #718199
$color_text_value: #202940
$color_warning: #FFD122
$colors: success $color_success,info $color_info,warning $color_warning,danger $color_danger

.Overview
  margin: 20px 0
  border-radius: 4px
  margin-right: 20px
  display: flex
  padding: 20px 0
  background-color: $color_background
  margin-left: -3px
  margin-right: -1px
  .text--bold
    font-weight: bold
  .text--bolder // alias for bold
    @extend .text--bold
  @each $name, $color in $colors
    .color--#{$name}
      color: $color
  .color--active
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
      color: $color_text_label
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
      color: $color_text_value
</style>
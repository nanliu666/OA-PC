<template>
  <el-row
    class="Overview"
    type="flex"
  >
    <el-col
      v-for="(col, index) of $options.filters.dataFilter(data, props)"
      :key="index"
      :span="8"
      class="Overview__item"
    >
      <span class="Overview__item--label">{{ col.label }}</span>
      <span
        class="Overview__item--value"
        :class="col | getClassName"
      >{{ translator(col) }}</span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Overview',
  filters: {
    getClassName: ({ $config: config }) => {
      if (config && config.className) return config.className
      else return ''
    },
    dataFilter: (data, props) => {
      if (_.isEmpty(data) || _.isEmpty(props)) return []
      return _.map(props, ([prop, label, config]) => {
        let res = { label, value: data[prop] }
        if (config) {
          res.$config = _.cloneDeep(config)
          if (config.handler) {
            res.value = config.handler(data)
          }
          if (config.className && _.isFunction(config.className)) {
            res.$config.className = config.className(data)
          }
        }
        return res
      })
    }
  },
  props: {
    props: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dictionary: {}
    }
  },
  methods: {
    // 查询字典字段
    // 翻译字典
    translator({ value, dictKey, $config: config }) {
      if (!(dictKey = dictKey || _.get(config, 'dictKey'))) {
        return value
      }

      const dicts = this.dictionary[dictKey]
      // 如果字典为 undefined 时候加载字典
      !dicts && this.loadDictionary(dictKey)
      let result = value
      _.each(dicts, (item) => {
        if (item.dictKey === _.trim(value)) {
          result = item.dictValue
          return false
        }
      })
      return result
    },

    async loadDictionary(dictKey) {
      const dict = await this.$store.dispatch('CommonDict', dictKey)
      this.$set(this.dictionary, dictKey, dict)
    }
  }
}
</script>

<style lang="sass" scoped>
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
  background-color: $color_background
  border-radius: 4px
  display: flex
  margin: 20px 0
  padding: 20px 0
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
      color: $color_text_label
      display: block
      font-size: 12px
      line-height: 18px
      margin-bottom: 10px
      margin: auto
      text-align: center
      width: 80px
    &--value
      color: $color_text_value
      display: block
      font-family: PingFangSC-Regular
      font-size: 14px
      margin-top: 5px
      text-align: center
</style>

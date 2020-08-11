<!-- 多条进度条 -->
<template>
  <div class="ChartProgress wrapper">
    <span class="title">{{ title }}</span>
    <div
      ref="container"
      v-loading="loading"
      class="wrapper__main"
    >
      <div class="charts">
        <div
          v-for="({ name, value }, index) of cfg.data"
          :key="index"
          class="charts__item"
        >
          <span class="charts__item--label">{{ name }}</span>
          <el-progress
            :percentage="_.min([100 * value, 100])"
            :show-text="false"
            :stroke-width="30"
            class="charts__item--chart"
            color="#4A9EFF"
          />
          <span class="charts__item--value">{{ `${_.round(100 * value, 2)}%` }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartProgress',

  filters: {
    dataFilter(data, excludes) {
      return _.reject(data, ({ name }) => _.includes(excludes, name))
    }
  },
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    load: {
      type: Function,
      default: async () => await []
    },
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      data: null
    }
  },

  computed: {
    cfg() {
      const data = this.data
      const cfg = this.config

      let res = {}
      res.data = this.$options.filters.dataFilter(
        _.map(data, (item) => ({
          value: item[cfg.value],
          name: cfg.dictKey
            ? this.translator({ value: item[cfg.label], dictKey: cfg.dictKey })
            : item[cfg.label]
        })),
        this.excludes
      )
      return res
    }
  },
  mounted() {
    this.refresh()
  },

  methods: {
    refresh() {
      this.loading = true
      this.load()
        .then((data) => {
          this.data = data
        })
        .finally(() => (this.loading = false))
    },

    // 翻译字典
    translator({ value, dictKey, $config: config }) {
      if (!(dictKey = dictKey || _.get(config, 'dictKey'))) {
        return value
      }
      let dicts = null

      if (_.isString(dictKey)) {
        dicts = this.dictionary[dictKey]
      } else {
        dicts = this.dictionary[_.head(dictKey).code]
      }
      // 如果字典为 undefined 时候加载字典
      if (!dicts) this.loadDictionary(dictKey)
      let result = value
      _.each(dicts, (item) => {
        if (item.dictKey === _.trim(value)) {
          result = item.dictValue
          return false
        }
      })
      return result
    },
    /**
     * 传入字典组字符串则异步加载字典组，传入实例则直接放入data中
     * @param {string| Array} dictKey 传入字典字符串或字典组实例
     * @return {Array} 获取的字典对象
     */
    async loadDictionary(dictKey) {
      let dict = null
      if (_.isEmpty(dictKey)) {
        return
      }
      if (_.isArray(dictKey)) {
        const { code } = _.head(dictKey)
        // 如里是同步则不会触发watch的handler，则第一个列
        // 的字段不会被翻译,所以统一写成异步的形式
        dict = await Promise.resolve(dictKey)
        dictKey = code
      } else {
        dict = await this.$store.dispatch('CommonDict', dictKey)
      }
      this.$set(this.dictionary, dictKey, dict)
      return dict
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~@/views/personnel/databoard/components/styles/chartCommon"
$color_font: #333


.ChartProgress
  position: relative
  .title
    color: $color_font
    font-size: large
    font-weight: bold
    left: 20px
    position: absolute
    top: 20px
  .charts
    box-sizing: border-box
    display: flex
    flex-direction: column
    height: 100%
    justify-content: space-around
    margin-top: 20px
    padding: 20px
    .charts__item
      align-items: center
      display: flex
      justify-content: space-between
      &--label,&--value
        box-sizing: border-box
        width: 10%
        display: inline-block
      &--label
        color: #202940
        width: 20%
        text-align: right
        &::after
          content: ":"
          display: inline-block
          margin-right: .5rem
          margin-left: .2rem
      &--value
        color: #757C85
        &::before
          content: " "
          margin-left: .5rem
      &--chart
        display: inline-block
        width: 70%
      /deep/ .el-progress-bar
        &__outer,&__inner
          border-radius: 0
</style>

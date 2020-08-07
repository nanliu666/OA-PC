<!-- 饼图 -->
<template>
  <div
    v-loading="loading"
    class="ChartPie container"
  >
    <div
      ref="container"
      class="container__chart"
    />
  </div>
</template>

<script>
import echarts from 'echarts'

// 默认设置
const CHART_CONFIG_DEFAULT = {
  grid: {
    // 布局控制
    left: 50,
    right: 50,
    top: 80,
    bottom: 50,
    width: 'auto'
  },
  tooltip: {},
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    top: 20,
    bottom: 20

    // data: []
  },
  series: []
}

export default {
  name: 'CharBar',
  filters: {
    dataFilter(arr, excludes) {
      const sum = _.sumBy(arr, 'value')
      return _.map(
        _.reject(arr, ({ name }) => _.includes(excludes, name)),
        ({ name, value }) => ({
          value,
          name: `${name}:  ${value}人  ${_.round((100 * value) / sum, 2)}%`
        })
      )
    }
  },
  props: {
    colors: {
      type: Array,
      default: () => ['#207EFA', '#4A9EFF', '#33CD66', '#83E69D']
    },
    config: {
      type: [Array, Object],
      default: () => ({ label: 'label', value: 'value' })
    },
    excludes: {
      type: Array,
      default: null
    },
    subtext: {
      type: [Function, String],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    load: {
      type: Function,
      default: async () => []
    },
    // 对x轴进行翻译
    xaxisDictkey: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      data: [],
      dictionary: {},
      loading: false
    }
  },
  computed: {
    /**
     * @returns 对传入的options进行一处理
     */
    opts() {
      const data = this.data
      const config = _.isArray(this.config) ? this.config : [this.config]
      let res = {}
      if (this.title) {
        res.title = {
          text: this.title,
          subtext: this.resolveSubtext()
        }
      }
      res.series = _.map(config, (cfg) => ({
        name: cfg.name || this.title,
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
        data: this.$options.filters.dataFilter(
          _.map(data, (item) => ({
            value: item[cfg.value],
            name: cfg.dictKey
              ? this.translator({ value: item[cfg.label], dictKey: cfg.dictKey })
              : item[cfg.label]
          })),
          this.excludes
        )
      }))
      res.color = this.colors
      return _.defaults(res, this.options)
    }
  },
  watch: {
    data() {
      this.init()
    },
    // 字典组更新的时候再次初始化图形
    dictionary: {
      deep: true,
      handler() {
        this.init()
      }
    }
  },
  mounted() {
    this.$_chart = echarts.init(this.$refs.container)
    this.refresh()
  },
  methods: {
    init(opts = this.opts) {
      const options = _.defaults(_.cloneDeep(opts), CHART_CONFIG_DEFAULT)
      this.$_chart.setOption(options)
      // console.debug(options)
    },
    refresh() {
      this.loading = true
      this.load()
        .then((data) => {
          this.data = data
        })
        .finally(() => (this.loading = false))
    },

    // 处理subtext
    resolveSubtext() {
      return _.isFunction(this.subtext) ? this.subtext(this.data) : this.subtext
    },

    // 翻译字典
    translator({ value, dictKey, $config: config }) {
      if (!(dictKey = dictKey || _.get(config, 'dictKey'))) {
        return value
      }

      const dicts = this.dictionary[dictKey]
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
    async loadDictionary(dictKey) {
      const dict = await this.$store.dispatch('CommonDict', dictKey)
      this.$set(this.dictionary, dictKey, dict)
      return dict
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./styles/chartCommon"
</style>

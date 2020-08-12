<!-- 柱状图组件(兼容折线图) -->
<template>
  <div
    v-loading="loading"
    class="CharBar container"
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
    // left: 50,
    // right: 50,
    top: 80,
    bottom: 50,
    width: 'auto'
  },
  tooltip: {},
  legend: {
    right: 0,
    itemWidth: 14, // 图例颜色大小
    itemHeight: 14
  },
  caculable: true,
  xAxis: {
    data: [],
    axisLabel: {
      color: '#202940'
    }
  },
  yAxis: [
    {
      name: '单位: 人',
      nameTextStyle: {
        color: '#757C85',
        fontSize: 16
      },
      minInterval: '1',
      axisLine: { show: false },
      axisTick: { show: false }
    },
    {
      type: 'value',
      min: 0,
      max: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        formatter: (val) => `${val} %`
      }
    }
  ],
  series: []
}

export default {
  name: 'CharBar',
  props: {
    colors: {
      type: Array,
      default: () => ['#4A9EFF', '#FF6661', '#59D97F']
    },
    config: {
      type: [Array, Object],
      default: () => ({ label: 'label', value: 'value' })
    },
    title: {
      type: String,
      default: ''
    },
    load: {
      type: Function,
      default: async () => []
    },
    // 对换 xy 坐标系
    transform: {
      type: Boolean,
      default: false
    },
    // 对x轴进行翻译
    xaxisDictkey: {
      type: [String, Array],
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
      const { data, transform } = this
      const config = _.isArray(this.config) ? this.config : [this.config]
      let opts = {}
      if (this.title) {
        opts.title = {
          text: this.title
        }
      }
      opts.series = _.map(config, (cfg) => ({
        name: cfg.name || this.title,
        type: cfg.type || 'bar',
        barMaxWidth: '35px',
        data: _.map(data, (item) => item[cfg.value]),
        ...(cfg.yAxisIndex
          ? {
              yAxisIndex: cfg.yAxisIndex,
              tooltip: {
                formatter: ({ name, value }) => `${name}: ${_.round(value, 2)} %`
              }
            }
          : null),
        ...(cfg.stack
          ? {
              stack: cfg.stack
            }
          : null)
      }))
      opts.color = this.colors
      opts.grid = _.assign(
        transform ? { left: 100, right: 100 } : { left: 50, right: 50 },
        CHART_CONFIG_DEFAULT.grid
      )
      opts[transform ? 'yAxis' : 'xAxis'] = _.merge(
        {
          axisLabel: {
            rotate: transform ? 0 : 15
          }
        },
        CHART_CONFIG_DEFAULT.xAxis
      )
      opts[transform ? 'yAxis' : 'xAxis'].data = this.xaxisDictkey
        ? _.map(data, (item) =>
            this.translator({ dictKey: this.xaxisDictkey, value: item[config[0].label] })
          )
        : _.map(data, (item) => item[config[0].label])
      opts[transform ? 'xAxis' : 'yAxis'] = _.cloneDeep(CHART_CONFIG_DEFAULT.yAxis)
      !_.some(config, (cfg) => cfg.yAxisIndex) && opts[transform ? 'xAxis' : 'yAxis'].pop()
      return _.defaults(opts, this.options)
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
      this.$_chart.setOption(_.defaults(_.cloneDeep(opts), CHART_CONFIG_DEFAULT))
    },
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
</style>

<!-- 漏斗图组件 -->
<template>
  <div
    v-loading="loading"
    class="ChartFunnel container"
  >
    <span
      v-show="_.isEmpty(_.get(opts.series, '[0].data'))"
      class="msg__nodata"
    >
      没有数据
    </span>
    <div
      ref="container"
      class="container__chart"
    />
  </div>
</template>

<script>
import echarts from 'echarts'

const CHART_CONFIG_DEFAULT = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}人'
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    top: 20,
    bottom: 20

    // data: []
  },

  series: [
    {
      name: '漏斗图',
      type: 'funnel',
      left: '10%',
      top: 60,
      //x2: 80,
      bottom: 60,
      width: '80%',
      // height: {totalHeight} - y - y2,
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      gap: 2,
      label: {
        show: true,
        position: 'inside',
        formatter: (context) => {
          const { percent } = context
          return `${_.round(percent)}%`
        }
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      }
      // data: []
    }
  ]
}

export default {
  name: 'ChartFunnel',
  filters: {
    dataFilter(data, excludes) {
      // 过滤其中人数为0的项
      return _(data)
        .filter(({ value }) => value)
        .reject(({ name }) => _.includes(excludes, name))
        .value()
    }
  },
  props: {
    colors: {
      type: Array,
      default: () => [
        // blue
        '#115fd4',
        '#207efa',
        '#4a9eff',
        '#73b9ff',
        '#9cd1ff',
        '#c4e6ff',
        // red
        '#862d39',
        '#bf4051',
        '#d27985',
        '#e6b3b9',
        // green
        '#5d862d',
        '#85bf40',
        '#aad279',
        '#cfe6b3'
      ]
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
    sort: {
      type: String,
      default: 'ascending'
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
      type: [String, Array],
      default: null
    },
    // 以最大的数为基数进行百分比计算
    based: {
      type: Boolean,
      default: false
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
        type: 'funnel',
        left: '10%',
        top: 60,
        //x2: 80,
        bottom: 60,
        width: '75%',
        // height: {totalHeight} - y - y2,
        ...(this.based
          ? {
              min: 0,
              max: 100
            }
          : null),
        minSize: '0%',
        maxSize: '100%',
        sort: this.sort,
        label: {
          show: true,
          position: 'inside',
          formatter: (context) => {
            const { name, value } = context.data
            const { percent } = context
            return `${name}: ${value}人 ${
              this.based
                ? _.round(
                    (100 * value) /
                      _(this.data)
                        .map(({ [cfg.value]: value }) => value)
                        .max(),
                    2
                  )
                : _.round(percent, 2)
            }%`
          }
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          label: {
            fontSize: 20
          }
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

    // 处理subtext
    resolveSubtext() {
      return _.isFunction(this.subtext) ? this.subtext(this.data) : this.subtext
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
.ChartFunnel
  position: relative
  .msg__nodata
    position: absolute
    right: 50%
    top: 50%
    transform: translate(-50%, -50%)
    font-size: 2rem
    color: gray
</style>

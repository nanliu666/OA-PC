<!-- 漏斗图组件 -->
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

const CHART_CONFIG_DEFAULT = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}'
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
      sort: 'ascending',
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
  name: 'CharBar',
  filters: {
    dataFormatter(data) {
      // 过滤其中人数为0的项
      return _.filter(data, ({ value }) => value)
    }
  },
  props: {
    colors: {
      type: Array,
      default: () => [
        // blue
        '#2d5186',
        '#4073bf',
        '#799dd2',
        '#b3c7e6',
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
          text: this.title
        }
      }
      res.series = _.map(config, (cfg) => ({
        name: cfg.name || this.title,
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
        sort: 'ascending',
        label: {
          show: true,
          position: 'inside',
          formatter(context) {
            const { name, value } = context.data
            const { percent } = context
            return `${name}: ${value}人 ${_.round(percent, 2)}%`
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
        data: this.$options.filters.dataFormatter(
          _.map(data, (item) => ({
            value: item[cfg.value],
            name: cfg.dictKey
              ? this.translator({ value: item[cfg.label], dictKey: cfg.dictKey })
              : item[cfg.label]
          }))
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
@import "./styles/chartCommon"
</style>

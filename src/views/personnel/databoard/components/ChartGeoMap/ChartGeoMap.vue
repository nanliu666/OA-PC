<!-- 地图组件 -->
<template>
  <div
    v-loading="loading"
    class="ChartGeoMap container"
  >
    <el-button
      v-show="!isProvince"
      class="operation__back"
      type="text"
      @click="() => handleBackBtnClick()"
    >
      返回
    </el-button>
    <div
      ref="container"
      class="container__chart"
    />
  </div>
</template>

<script>
import echarts from 'echarts'
import { getProvinceByName, getProvinceDataByName } from './provinceMappings'

// 超过多少人的时候显示 (省份/市) 的label
const SHOW_WHEN_VALUE_OVER = 10
// 默认显示的地图
const MAPNAME_DEFAULT = '中国'

// 默认设置
const CHART_CONFIG_DEFAULT = {
  visualMap: {
    left: 'right',
    inRange: {
      color: [
        '#313695',
        '#4575b4',
        '#74add1',
        '#abd9e9',
        '#e0f3f8',
        '#ffffbf',
        '#fee090',
        '#fdae61',
        '#f46d43',
        '#d73027',
        '#a50026'
      ]
    },
    text: ['人数', ''], // 文本，默认为数值文本
    calculable: true
  },
  // series: [],
  tooltip: {
    trigger: 'item',
    showDelay: 0,
    transitionDuration: 0.2,
    formatter: function(params) {
      return params.seriesName + '<br/>' + params.name + ': ' + _.defaultTo(params.value, 0)
    }
  }
}

export default {
  name: 'ChartGeoMap',
  filters: {
    dataFormatter(data) {
      // 过滤其中人数为0的项
      return _.filter(data, ({ value }) => value)
    }
  },
  props: {
    colors: {
      type: Array,
      default: () => ['#4A9EFF', '#FF6661', '#59D97F']
    },
    config: {
      type: Array,
      default: () => ({ label: 'label', value: 'value' })
    },
    title: {
      type: String,
      default: ''
    },
    load: {
      type: Array,
      default: () => [async () => [], async () => []]
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
      mapName: MAPNAME_DEFAULT,
      dictionary: {},
      loading: false
    }
  },
  computed: {
    opts() {
      const data = this.data
      const config = this.config
      // 当前使用的配置
      const cfg = config[this.isProvince ? 0 : 1]
      let opts = {}
      if (this.title) {
        opts.title = {
          text: this.title,
          subtext: this.isProvince ? '' : `当前地图:${this.mapName}`
        }
      }
      opts.series = {
        name: cfg.name || this.title,
        type: 'map',
        map: this.mapName,
        roam: true,
        label: {
          show: true,
          formatter: function({ name, value }) {
            return value > SHOW_WHEN_VALUE_OVER ? `${name}: ${value || 0}人` : ''
          }
        },
        data: this.$options.filters.dataFormatter(
          _.map(data, (item) => ({
            value: item[cfg.value],
            name: cfg.dictKey
              ? this.translator({ value: item[cfg.label], dictKey: cfg.dictKey })
              : item[cfg.label],
            $_item: item
          }))
        )
      }
      return _.defaults(opts, CHART_CONFIG_DEFAULT)
    },

    // 当前视图是省份还是市 true - 中国地图， false- 某个省的视图
    isProvince() {
      return _.eq(this.mapName, MAPNAME_DEFAULT)
    }
  },
  watch: {
    data() {
      this.init()
    },
    dictionary: {
      deep: true,
      handler() {
        this.init()
      }
    }
  },
  mounted() {
    this.$_chart = echarts.init(this.$refs.container)
    this.$_chart.on('click', (e) => this.$emit('item-click', e))
    this.loadMap()
    this.refresh()
  },
  beforeDestroy() {
    this.$_chart.dispose()
  },

  methods: {
    init(opts = this.opts) {
      this.$_chart.clear()
      this.$_chart.setOption(opts)
      // this.$_chart.setOption(CHART_CONFIG_USA) // DEBUG: 测试数据
    },
    refresh() {
      this.loadData()
    },

    handleBackBtnClick() {
      this.loadMap(MAPNAME_DEFAULT).then(() => {
        this.loadData()
      })
    },

    async loadData() {
      try {
        const { provinceCode } = getProvinceByName(this.mapName)
        this.loading = true
        const data = await this.load[this.isProvince ? 0 : 1](
          this.isProvince ? null : { provinceCode }
        )
        this.data = data
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },

    /**
     * @param {string} mapName 地图名称，加载指定地图到echarts上
     * @returns {void}
     */
    async loadMap(mapName = this.mapName) {
      this.mapName = mapName
      echarts.registerMap(mapName, await getProvinceDataByName(mapName))
      this.init()
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
.container
  position: relative
  .operation__back
    position: absolute
    right: 2rem
    top: 1rem
    z-index: 100
</style>

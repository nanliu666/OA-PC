<!-- 复杂饼图（内外圈、多颜色渲染） -->
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
  },
  series: []
}

export default {
  name: 'CharComplexBar',
  props: {
    title: {
      type: String,
      default: ''
    },
    load: {
      type: Function,
      default: async () => []
    }
  },
  data() {
    return {
      data: [],
      loading: false
    }
  },
  computed: {
    /**
     * @returns 对传入的options进行一处理
     */
    opts() {
      let { groupDatas, nameDatas } = this.handleData()
      let option = {
        title: {
          text: this.title
        },
        legend: {
          show: false
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '50%'],
            label: {
              position: 'inner'
            },
            labelLine: {
              show: false
            },
            data: groupDatas
          },
          {
            type: 'pie',
            radius: ['50.5%', '70%'],
            label: {
              formatter: '{b}：{d}%',
              backgroundColor: 'transparent',
              color: '#1e1e1e'
            },
            data: nameDatas
          }
        ]
      }
      return option
    }
  },
  watch: {
    data() {
      this.init()
    }
  },
  mounted() {
    this.$_chart = echarts.init(this.$refs.container)
    this.refresh()
  },
  methods: {
    /**
     * 数据处理
     */
    handleData() {
      // 内圈主类颜色
      const MAIN_COLOR = [
        'rgba(51,205,102,1)',
        'rgba(32,126,250,1)',
        'rgba(36,193,167,1)',
        'rgba(251,139,24,1)',
        'rgba(125,45,206,1)',
        'rgba(41,40,205,1)',
        'rgba(251,139,24,1)',
        'rgba(242,53,53,1)'
      ]
      const MAX_LENGTH = 5 // 数组标准线
      const LEAST_COLOR = 0.2 // 最低颜色值
      const BASE_COLOR_LINE = 0.1 // 基准线0.1
      let groupDatas = [] // 内圈分组渲染数据
      let nameDatas = [] // 外圈渲染数据
      const tempData = _.chain(this.data)
        .sortBy(['name', 'num'])
        .groupBy('name')
        .value()
      _.mapKeys(tempData, (value, key) => {
        let numSum = 0
        value.map((item) => {
          numSum += item.num
        })
        // 拼接内圈数据与Echart数据格式
        groupDatas.push({
          name: key,
          value: numSum,
          itemStyle: { color: '' },
          originValue: value
        })
      })
      groupDatas.map((item, index) => {
        // 以内圈主类颜色做余数处理，每6次一个循环
        let groupColor = MAIN_COLOR[index % MAIN_COLOR.length]
        item.itemStyle.color = groupColor
        item.originValue.map((originItem, originIndex) => {
          // 数组长度大于等于5时，倍数变成2
          const TIMES = item.originValue.length >= MAX_LENGTH ? 1 : 2
          // 外圈颜色RGBA的最后一位从1慢慢变成0.2，不断赋值
          let color = groupColor
          const replaceIndex = color.length - 2 // 需要更换的位置的索引
          // 计算公式： 1 - 基准线（0.1）* 倍数（1或者2）* 当前位置
          let colorNumber =
            Number(color[replaceIndex]) - BASE_COLOR_LINE * TIMES * (originIndex + 1)
          colorNumber = colorNumber >= LEAST_COLOR ? colorNumber.toFixed(1) : LEAST_COLOR
          let replaceStr = `,${colorNumber})`
          let tempColor = color.substr(0, replaceIndex - 1) + replaceStr
          nameDatas.push({
            name: originItem.jobName,
            value: originItem.num,
            itemStyle: { color: tempColor }
          })
        })
      })
      return { groupDatas, nameDatas }
    },
    init(opts = this.opts) {
      const options = _.defaults(_.cloneDeep(opts), CHART_CONFIG_DEFAULT)
      this.$_chart.setOption(options)
    },
    refresh() {
      this.loading = true
      this.load()
        .then((data) => {
          this.data = data
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./styles/chartCommon"
</style>

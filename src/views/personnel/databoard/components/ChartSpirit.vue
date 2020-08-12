<!-- 象形柱图组件（男女比例分布） -- 设置各种具象图形元素（如图片、SVG PathData 等）的柱状图 -->
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
export default {
  name: 'CharBar',
  props: {
    title: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => ({
        label: 'sex',
        value: 'workNum'
      })
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
      const { data } = this
      const cfg = this.config
      let maxData = 0
      let manNum = 0
      let womanNum = 0
      let unknownNum = 0
      data.map((item) => {
        maxData += item[cfg.value]
        if (item[cfg.label] === -1) {
          unknownNum = item[cfg.value]
        }
        if (item[cfg.label] === 0) {
          womanNum = item[cfg.value]
        }
        if (item[cfg.label] === 1) {
          manNum = item[cfg.value]
        }
      })

      const copData = [
        {
          value: manNum,
          symbol: `image://${process.env.BASE_URL}img/icon-person-man.png`
        },
        {
          value: womanNum,
          symbol: `image://${process.env.BASE_URL}img/icon-person-woman.png`
        }
      ]
      let option = {
        title: {
          text: this.title,
          subtext: `${unknownNum === 0 ? '' : `未填写性别${unknownNum}人`}`
        },
        tooltip: {},
        xAxis: {
          max: maxData,
          show: false
        },
        yAxis: {
          data: ['男', '女'],
          inverse: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            margin: 10,
            color: '#999',
            fontSize: 16
          }
        },
        grid: {
          top: 'center',
          height: 200,
          left: 70,
          right: 100
        },
        series: [
          {
            type: 'pictorialBar',
            symbolRepeat: 'fixed',
            symbolMargin: '5%',
            symbolClip: true,
            symbolSize: 30,
            symbolBoundingData: maxData,
            data: copData,
            z: 10
          },
          {
            // full data
            type: 'pictorialBar',
            itemStyle: {
              normal: {
                opacity: 0.2
              }
            },
            label: {
              show: true,
              formatter: function(params) {
                return [
                  `${params.value}人`,
                  `${((params.value / maxData) * 100).toFixed(1)} %`
                ].join('\n')
              },
              position: 'right',
              offset: [10, 4],
              color: '#343a50',
              fontSize: 16
            },
            animationDuration: 0,
            symbolRepeat: 'fixed',
            symbolMargin: '5%',
            symbolSize: 30,
            symbolBoundingData: maxData,
            data: copData,
            z: 5
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
    init(opts = this.opts) {
      this.$_chart.setOption(_.defaults(_.cloneDeep(opts)))
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

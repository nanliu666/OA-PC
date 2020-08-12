<!-- 环形进度条 -->
<template>
  <div class="ChartProgressRing container">
    <!--  -->
    <span class="title">{{ title }}</span>
    <div
      ref="container"
      v-loading="loading"
      class="container__chart"
    >
      <el-progress
        :percentage="_.round(_.min([_.defaultTo(data, 0) * 100, 100]), 2)"
        class="container__chart--main"
        :stroke-width="15"
        type="circle"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartProgressRing',
  props: {
    config: {
      type: [Array, Object],
      default: () => ({})
    },
    load: {
      type: Function,
      default: async () => []
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
  computed: {},

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
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~@/views/personnel/databoard/components/styles/chartCommon"
$color_font: #333

.ChartProgressRing
  width: 100%
  position: relative
  .title
    color: $color_font
    position: absolute
    top: 20px
    left: 20px
    font-size: large
    font-weight: bold
  .container
    &__chart
      justify-content: center
      align-items: center
      display: flex
  /deep/.el-progress-circle
    width: 350px !important
    height: 350px !important
    svg
      transform: scale(-1, 1)
  /deep/.el-progress__text
    font-size: 3rem !important
    color: #A0A8AE
</style>

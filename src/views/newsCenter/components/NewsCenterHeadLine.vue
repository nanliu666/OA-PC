<template>
  <div class="NewsCenterHeadLine wrapper">
    <el-row
      :gutter="8"
      class="container"
    >
      <el-col
        v-for="({ span, children, index }, key) of grids"
        :key="key"
        class="container__news"
        :span="span"
      >
        <el-row
          v-if="children"
          class="container--inner"
          :gutter="8"
        >
          <el-col
            v-for="(child, k) of children"
            :key="k"
            class="container__news container__news--inner"
            :span="child.span"
          >
            <div
              class="news"
              @click="() => handleLinkClick(data[child.index])"
            >
              <div class="news__img">
                <img
                  :src="_.get(data[child.index], 'picUrl')"
                  alt="news image"
                >
              </div>

              <span class="news__title">
                {{ _.get(data[child.index], 'title') }}
              </span>
            </div>
          </el-col>
        </el-row>
        <div
          v-else
          class="news"
          @click="() => handleLinkClick(data[index])"
        >
          <img
            class="news__img"
            :src="_.get(data[index], 'picUrl')"
            alt="news image"
          >
          <span class="news__title">
            {{ _.get(data[index], 'title') }}
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'NewsCenterHeadLine',
  props: {
    data: {
      type: Array,
      default: null
    }
  },

  computed: {
    // 根据传入的新闻数量来生成 布局数组[{span: number}]
    grids() {
      const { data } = this
      let grids = []
      let index = 0
      switch (_.size(data)) {
        case 1:
          grids = [{ span: 24 }]
          break
        case 2:
          grids = [{ span: 12 }, { span: 12 }]
          break
        case 3:
          grids = [{ span: 8 }, { span: 8 }, { span: 8 }]
          break
        case 4:
          grids = [{ span: 8 }, { span: 8 }, { span: 8, children: [{ span: 24 }, { span: 24 }] }]
          break
        case 5:
          grids = [
            { span: 8 },
            { span: 16, children: [{ span: 12 }, { span: 12 }, { span: 12 }, { span: 12 }] }
          ]
          break
      }

      _.each(grids, (grid) => {
        if (!grid.children) {
          grid.index = index++
        } else {
          _.each(grid.children, (child) => (child.index = index++))
        }
      })
      return grids
    }
  },

  methods: {
    handleLinkClick({ id }) {
      // 导航到详情页面
      this.$router.push({
        path: '/newsCenter/newsDetail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
$color_active: #368AFA
$color_danger: #ff6464
$color_icon: #A0A8AE
$color_hover: #207EFA

.NewsCenterHeadLine
  .container
    width: 100%
    &__news
      height: 300px
      display: flex
      &--inner
        height: 146px
    &--inner
      width: 100%
  .news
    display: flex
    overflow: hidden
    flex-grow: 1
    position: relative
    &__img
      height: 100%
      width: 100%
      transition: all .1s ease-out
      cursor: pointer
      &:hover
        transform: scale(1.2)
      img
        height: 100%
        width: 100%
        object-fit: cover
    &__title
      background: rgb(0,0,0)
      background: linear-gradient(0deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,.5) 20%, rgba(255,255,255,0) 90%)
      bottom: 0
      cursor: pointer
      color: white
      display: block
      overflow: hidden
      padding-bottom: 1rem
      padding-top: 1rem
      position: absolute
      text-align: center
      text-overflow: ellipsis
      white-space: nowrap
      width: 100%
      &:hover
        color: $color_active
      &::before
        content: " "
        width: 1rem
        display: inline-block
</style>

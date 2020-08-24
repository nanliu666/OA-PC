<template>
  <el-card
    v-loading="loading"
    class="NewsCard wrapper"
    shadow="never"
  >
    <div class="wrapper__top">
      <span class="wrapper__top--title">
        {{ `新闻中心(${page.total})` }}
      </span>
      <span class="wrapper__top--operation">
        <i
          class="icon-arrow-right-outlined"
          @click="() => navigateToNewsCenter()"
        />
      </span>
    </div>

    <div class="wrapper__content">
      <comEmpty v-if="_.isEmpty(paneData)" />
      <ul
        v-else
        class="news"
      >
        <li
          v-for="(row, index) in paneData"
          :key="index"
          class="news__item"
        >
          <el-image
            fit="cover"
            class="news__item--image"
            :src="row.picUrl"
            @click="() => handleItemImageClick(row)"
          />
          <div class="news__item--link">
            <el-tooltip
              class="item"
              effect="dark"
              :content="row.title"
              placement="top"
            >
              <div
                class="news__item--title"
                @click="() => handleItemTitleClick(row)"
              >
                {{ row.title }}
              </div>
            </el-tooltip>
            <div class="news__item--info">
              {{ row.publishTime }}
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="wrapper__bottom">
      <span
        class="wrapper__bottom--operation"
        @click="() => navigateToNewsCenter()"
      >
        查看全部
      </span>
    </div>
  </el-card>
</template>

<script>
import { getNewsCenter } from '@/api/newsCenter/newCenter'

// 默认一次加载5条数据
const PAGE_SIZE_DEFAULT = 5

export default {
  name: 'NewsCard',
  components: {
    comEmpty: () => import('@/components/common-empty/empty')
  },
  data() {
    return {
      loading: false,
      paneData: [],
      page: {
        currentPage: 1,
        size: PAGE_SIZE_DEFAULT,
        total: 0
      }
    }
  },
  created() {
    this.refresh()
  },

  methods: {
    handleItemTitleClick({ id }) {
      this.navigateToDetail(id)
    },
    handleItemImageClick({ id }) {
      this.navigateToDetail(id)
    },

    refresh() {
      return Promise.all([this.loadPaneData()])
    },
    // 加载数据
    async loadPaneData(params) {
      if (this.loading) {
        return
      }
      try {
        this.loading = true
        const page = {
          pageNo: this.page.currentPage,
          pageSize: this.page.size
        }
        const { data, totalNum } = await getNewsCenter(_.assign(null, page, params))
        this.paneData = data
        this.page.total = totalNum
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },

    // 跳转到新闻详情
    navigateToDetail(id) {
      this.$router.push(
        {
          path: '/newsCenter/newsDetail',
          query: {
            id
          }
        }
        // TODO: 从工作台进入的时候， 不显示菜单（因为菜单为空）
        // ({ meta }) => (meta.fullscreen = true)
      )
    },

    navigateToNewsCenter() {
      this.$router.push('/newsCenter/newsCenter', ({ meta }) => (meta.fullscreen = true))
    }
  }
}
</script>

<style lang="sass" scoped>
$color_active: #368AFA
$color_danger: #ff6464
$color_hover: #207EFA
$color_icon: #A0A8AE
$color_placeholder: #757C85

.wrapper
  height: 100%
  width: 50%
  position: relative
  background: white
  /deep/.el-card__body
    display: flex
    justify-content: space-between
    flex-direction: column
  &__top
    display: flex
    justify-content: space-between
    margin-bottom: 1rem
    &--title,&--operation
      font-weight: bold
      font-size: medium
    &--operation
      color: $color_active
      cursor: pointer
      font-weight: normal
  .wrapper__content
    height: 300px
    overflow: auto
    .news
      &__item
        border-bottom: 1px solid #ccc
        display: flex
        justify-content: space-start
        margin-bottom: .5rem
        padding: .5rem
        position: relative
        &--image
          cursor: pointer
          height: 50px
          margin-right: .5rem
          width: 100px
        &--title
          cursor: pointer
          font-size: 14px
        &--info
          bottom: .5rem
          position: absolute
          font-size: smaller
          color: $color_placeholder
  .wrapper__bottom
    &--operation
      color: $color_active
      cursor: pointer
</style>

<template>
  <el-card
    v-loading="loading"
    class="NewsCard wrapper"
  >
    <div class="wrapper__header">
      <a
        class="link"
        @click="() => navigateToNewsCenter()"
      >
        <span class="title">
          {{ `新闻中心(${page.total})` }}
        </span>
        <i class="icon-arrow-right-outlined" />
      </a>
    </div>

    <div class="wrapper__body">
      <ul
        v-if="!_.isEmpty(paneData)"
        class="news__list"
      >
        <li
          v-for="(row, index) in paneData"
          :key="index"
          class="news"
        >
          <img
            class="poster link"
            :src="row.picUrl"
            @click="() => handleItemImageClick(row)"
          >
          <div class="info">
            <a
              class="title link"
              @click="() => handleItemTitleClick(row)"
            > {{ row.title }}</a>
            <div class="date">
              {{ row.publishTime }}
            </div>
          </div>
        </li>
      </ul>
      <comEmpty v-else />
    </div>

    <!-- <div class="wrapper__bottom">
      <span
        v-if="!_.isEmpty(paneData)"
        class="wrapper__bottom--operation"
        @click="() => navigateToNewsCenter()"
      >
        查看全部
      </span>
    </div> -->
  </el-card>
</template>

<script>
import { getNewsCenter } from '@/api/newsCenter/newCenter'

// 默认一次加载5条数据(修改为3行，不出现滚动行为)
const PAGE_SIZE_DEFAULT = 3

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
@import "~@/styles/mixin"
@import "~@/styles/variables"
$color_title: #202940

.wrapper
  &__header
    .title
      font-size: 18px
      font-weight: bold
      color: $color_title
      line-height: 28px
  &__body
    .news__list
      .news
        padding: 16px 0
        display: flex
        & + .news
          border-top: 1px solid #E3E7E9
        .poster
          width: 72px
          height: 60px
          object-fit: cover
          margin-right: -60px
          flex-shrink: 0
        .info
          margin-left: 16px + 60px
          width: 100%
          display: flex
          flex-direction: column
          justify-content: space-between
          .title
            @include ellipsisMultiline
            font-size: 14px
            color: $color_title
            letter-spacing: 0
            &:hover
              color: $primaryColor
          .date
            font-size: 14px
            color: #757C85
  .link
    cursor: pointer
</style>

<template>
  <div class="Details wrapper">
    <page-header
      title="新闻详情"
      show-back
      :back="() => handleBack()"
    />

    <basic-container block>
      <article class="container__article">
        <header>
          <h1 class="article__title">
            {{ _.get(paneData, 'title', null) }}
          </h1>
          <ul class="article__info">
            <li class="author">
              <label class="article__info--lable">
                作者:
              </label>
              <span class="article__info--value">
                {{ _.get(paneData, 'publishUserName', null) }}
              </span>
            </li>
            <li class="time">
              <label class="article__info--label">
                发布时间:
              </label>
              <span class="article__info--value">
                <time :datetime="_.get(paneData, 'publishTime', null)">{{
                  _.get(paneData, 'publishTime', null)
                }}</time>
              </span>
            </li>
            <li class="readed">
              <label class="article__info--label">
                阅读量:
              </label>
              <span class="article__info--value">
                {{ _.get(paneData, 'readNum', null) }}
              </span>
            </li>
          </ul>
        </header>
        <section
          class="article__content"
          v-html="(content = _.get(paneData, 'content', null)) && _.unescape(content)"
        />
      </article>
    </basic-container>
  </div>
</template>

<script>
import { getCenterDetail, getNewsDetail } from '@/api/newsCenter/newCenter'

export default {
  name: 'Details',

  data() {
    return {
      content: null,
      loading: false,
      paneData: null
    }
  },
  computed: {
    id() {
      return _.get(this.$route.query, 'id', null)
    },
    userId() {
      return _.get(this.$route.query, 'userId', null)
    }
  },
  created() {
    this.refresh()
  },

  beforeRouteLeave(to, from, next) {
    const { raw } = this.$route.params
    to.params.raw = raw
    next()
  },

  methods: {
    handleBack() {
      // 关闭当前tag
      this.$store.commit('DEL_TAG', this.$store.getters.tag)
      this.$router.back()
    },

    refresh() {
      if (this.id) {
        // 远程获取数据
        return Promise.all([this.loadPaneData()])
      } else {
        // 预览页面数据在本地传递
        return Promise.all([(this.paneData = this.$route.params.data)]) // 一致性
      }
    },

    async loadPaneData() {
      if (this.loading) {
        return
      }
      try {
        this.loading = true
        const params = _.pickBy({ id: this.id })
        this.paneData = this.userId ? await getNewsDetail(params) : await getCenterDetail(params)
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
$color_info: #757c85

.wrapper
  .basic-container--block
    min-height: calc( 100% - 92px )
    height: 0
  .container__article
    .article__title
      margin: 0
      margin-bottom: 1rem
    .article__info
      display: flex
      color: $color_info
      li
        margin-right: 1rem
    .article__content
      margin-top: 2rem
</style>

<template>
  <li class="NewsCenterListItem wrapper">
    <div class="news">
      <div
        class="news__img"
        @click="() => handleLinkImgClick()"
      >
        <img
          :src="_.get(data, 'picUrl', null)"
          alt="news__img"
        >
      </div>
      <div class="news__content">
        <span
          class="news__content--title"
          @click="() => handleLinkTitleClick()"
        >{{
          _.get(data, 'title', null)
        }}</span>
        <span class="news__content--description">{{ _.get(data, 'brief', null) }}</span>
        <div class="news__content--info">
          <span class="info__date">
            {{ _.get(data, 'publishTime', null) }}
          </span>
          <span class="info__author">
            <label>发布人:</label> {{ _.get(data, 'publishUserName', null) }}</span>
          <span class="info__read"><label>阅读:</label> {{ _.get(data, 'readNum', null) }}</span>
        </div>
      </div>
    </div>
    <el-divider />
  </li>
</template>

<script>
export default {
  name: 'NewsCenterListItem',

  props: {
    data: {
      type: Object,
      default: null
    }
  },

  methods: {
    handleLinkImgClick() {
      this.navigateToDetail()
    },
    handleLinkTitleClick() {
      this.navigateToDetail()
    },

    // 导航到详情页面
    navigateToDetail() {
      const id = _.get(this.data, 'id')
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
$color_aside: #666
$color_danger: #ff6464
$color_hover: #207EFA
$color_icon: #A0A8AE
$size_gutter: .5rem

.wrapper
  list-style: none
  .news
    display: flex
    font-size: 1rem
    padding: $size_gutter
    position: relative
    &__img
      cursor: pointer
      flex-grow: 1
      height: 100px
      margin-right: $size_gutter
      object-fit: cover
      overflow: hidden
      width: 160px
      img
        height: 100%
        object-fit: cover
        transition: all .1s ease-out
        width: 100%
        &:hover
          transform: scale(1.2)
    &__content
      display: flex
      flex-direction: column
      justify-content: space-between
      width: calc(100% - 120px)
      &--title
        font-size: larger
        cursor: pointer
        &:hover
          color: $color_active
      &--description,&--info
        font-size: inherit
        color: $color_aside
      &--description
        // 只显示两行文本并显示省略号
        -webkit-box-orient: vertical
        -webkit-line-clamp: 2
        display: -webkit-box
        overflow: hidden
        text-overflow: ellipsis
      &--info
        display: flex
        align-items: center
        span
          margin-right: $size_gutter
        .info__author
          flex: 1
</style>

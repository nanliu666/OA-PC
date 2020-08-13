<template>
  <div class="notice-detail">
    <page-header
      title="公告详情"
      :show-back="true"
    />
    <div class="notice-content">
      <h1
        class="content-h1"
        v-text="noticeDetail.title"
      />
      <div class="subText">
        <span class="publishUserName">发布人：{{ noticeDetail.publishUserName }}</span>
        <span>发布时间：{{ noticeDetail.publishTime }}</span>
      </div>
      <div v-html="noticeDetail.content" />
      <div
        v-for="(item, index) in noticeDetail.attachment"
        :key="index"
      >
        <iframe
          class="word-class"
          :src="getIframeSrc(item)"
          frameborder="0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getNoticeDeatil } from '@/api/noticeCenter/noticeCenter'
import PageHeader from '@/components/page-header/pageHeader'
export default {
  name: 'NoticeList',
  components: { PageHeader },
  data() {
    return {
      iframeSrc: '',
      noticeDetail: {}
    }
  },
  created() {
    getNoticeDeatil({ id: this.$route.query.id }).then((res) => {
      this.noticeDetail = res
      res.attachment
    })
  },
  methods: {
    getIframeSrc(data) {
      let fileName = data.url.lastIndexOf('.')
      let fileNameLength = data.url.length
      let fileFormat = data.url.substring(fileName + 1, fileNameLength)
      let targetUrl = data.url
      if (fileFormat !== 'pdf') {
        targetUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${targetUrl}`
      }
      return targetUrl
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.notice-detail {
  .notice-content {
    background: #ffffff;
    border-radius: 0 4px 4px 4px;
    min-height: calc(100vh - 68px - 40px - 56px);
    padding: 20px;
    box-sizing: border-box;
    .content-h1 {
      color: #202940;
      margin: 0 0 10px 0;
    }
    .subText {
      font-size: 14px;
      color: #757c85;
      margin-bottom: 20px;
      .publishUserName {
        margin-right: 20px;
      }
    }
    .word-class {
      width: 100%;
      margin-top: 20px;
      min-height: calc(100vh - 320px);
    }
  }
}
</style>

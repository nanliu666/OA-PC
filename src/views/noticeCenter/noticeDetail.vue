<template>
  <div class="notice-detail">
    <page-header
      title="公告详情"
      :show-back="true"
    />
    <el-card class="notice-content">
      <h1
        class="content-h1"
        v-text="noticeDetail.title"
      />
      <div
        v-if="noticeDetail.publishUserName"
        class="subText"
      >
        <span class="publishUserName">发布人：{{ noticeDetail.publishUserName }}</span>
        <span style="padding:0 20px">发布时间：{{ noticeDetail.publishTime }}</span>
        <span>阅读量：{{ noticeDetail.readNum }}</span>
      </div>
      <div v-html="noticeDetail.content" />
      <div
        v-for="(item, index) in noticeDetail.attachment"
        :key="index"
      >
        <iframe
          v-if="iframeList.indexOf(index) > -1"
          class="word-class"
          :src="getIframeSrc(item)"
          frameborder="0"
        />
        <el-image
          v-if="imagesList.indexOf(index) > -1"
          class="word-class"
          :src="item.url"
          fit="cover"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getCenterNoticeDeatil } from '@/api/noticeCenter/noticeCenter'
import PageHeader from '@/components/page-header/pageHeader'
import { mapGetters } from 'vuex'
import { htmlDecode } from '@/util/util'
export default {
  name: 'NoticeList',
  components: { PageHeader },
  data() {
    return {
      iframeSrc: '',
      noticeDetail: {},
      iframeList: [],
      imagesList: []
    }
  },
  beforeRouteLeave(to, from, next) {
    // 进入模式预览后再出去，关闭标签，预览模式下不存在id
    if (!this.$route.query.id) {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
    }
    next()
  },
  computed: {
    ...mapGetters(['noticeDetailVuex'])
  },
  created() {
    this.initData()
  },
  mounted() {
    if (!this.$route.query.id) {
      if (_.isEmpty(this.noticeDetailVuex)) {
        this.$router.go(-1)
      } else {
        this.creatLeaveDialog()
      }
    }
  },
  methods: {
    creatLeaveDialog() {
      window.addEventListener('beforeunload', this.beforeunloadHandler, false)
      this.$once('hook:beforeDestroy', () => {
        this.removeLeaveDialog()
      })
    },
    removeLeaveDialog() {
      window.removeEventListener('beforeunload', this.beforeunloadHandler, false)
    },
    beforeunloadHandler(e) {
      e.returnValue = '确定'
    },
    initData() {
      if (this.$route.query.id) {
        getCenterNoticeDeatil({ id: this.$route.query.id }).then((res) => {
          this.noticeDetail = res
          this.noticeDetail.content = res.content ? htmlDecode(res.content) : ''
          this.getShowIndex()
        })
      } else {
        this.noticeDetail = this.noticeDetailVuex
        this.getShowIndex()
      }
    },
    getIframeSrc(data) {
      let fileName = data.url.lastIndexOf('.')
      let fileNameLength = data.url.length
      let fileFormat = data.url.substring(fileName + 1, fileNameLength)
      let targetUrl = data.url
      if (fileFormat !== 'pdf') {
        targetUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${targetUrl}`
      }
      return targetUrl
    },
    getShowIndex() {
      this.noticeDetail.attachment.map((item, index) => {
        const url = item.url.split('.')
        let fileName = url[url.length - 1]
        if (/\.(doc|doxs|pdf|DOC|DOCS|PDF)$/.test(`.${fileName}`)) {
          this.iframeList.push(index)
        } else if (/\.(jpg|jpeg|png|JPEG|JPG|PNG)$/.test(`.${fileName}`)) {
          this.imagesList.push(index)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.notice-detail {
  .notice-content {
    background: #ffffff;
    margin-bottom: 24px;
    min-height: calc(100vh - 68px - 40px - 56px - 24px);
    box-sizing: border-box;
    .content-h1 {
      color: #202940;
      margin: 0 0 10px 0;
    }
    .subText {
      font-size: 14px;
      color: #757c85;
      margin-bottom: 20px;
    }
    .word-class {
      width: 100%;
      margin-top: 20px;
      min-height: calc(100vh - 320px);
    }
  }
}
</style>

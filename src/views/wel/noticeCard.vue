<template>
  <el-card
    class="notice-card"
    shadow="never"
  >
    <div class="header">
      <span
        class="title"
        @click="toNoticeCenter"
      >
        <span>通知公告</span>
        <i
          class="icon-arrow-right-outlined"
          style="margin-right:12px;cursor: pointer; "
        />
      </span>
    </div>
    <ul class="content-ul">
      <li
        v-for="(item, index) in newsList"
        :key="index"
        class="content-li"
        @click="toDetail(item)"
      >
        <div class="li-title">
          {{ item.title }}
        </div>
        <div class="li-time">
          {{ item.publishTime | dataFilter }}
        </div>
      </li>
    </ul>
    <comEmpty v-if="newsList.length === 0" />
  </el-card>
</template>

<script>
import moment from 'moment'
import { getNoticeCenterList } from '@/api/noticeCenter/noticeCenter'
export default {
  name: 'Notice',
  components: {
    comEmpty: () => import('@/components/common-empty/empty')
  },
  filters: {
    // 时间格式化
    dataFilter: (time) => {
      return moment(time).format('YYYY-MM-DD')
    }
  },
  data() {
    return {
      newsList: []
    }
  },
  created() {
    let parmas = {
      pageNo: 1,
      pageSize: 5
    }
    getNoticeCenterList(parmas).then((res) => {
      let { data } = res
      this.newsList = data
    })
  },
  methods: {
    toNoticeCenter() {
      this.$router.push({
        path: '/noticeCenter/noticeList'
      })
    },
    toDetail(data) {
      this.$router.push({
        path: '/noticeCenter/noticeDetail',
        query: {
          id: data.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.notice-card {
  flex: 1;
  // 头部
  .header {
    .title {
      cursor: pointer;
      span {
        font-size: 18px;
        color: #202940;
        line-height: 28px;
        font-weight: bold;
      }
      .icon-arrow-right-outlined {
        color: #a0a8ae;
      }
    }
  }
  .content-ul {
    .content-li {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e4e4e4;
      height: calc(332px / 6);
      &:last-child {
        border-bottom: 0;
      }
      .li-title {
        font-size: 14px;
        color: #202940;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: calc(100% - 80px);
      }
      .li-time {
        color: #757c85;
        font-size: 14px;
      }
    }
  }
}
</style>

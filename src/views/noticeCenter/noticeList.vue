<template>
  <div class="notice-list">
    <page-header
      title="通知公告"
      :show-back="true"
    />
    <el-card
      v-for="(item, index) in noticeList"
      :key="index"
      class="box-card"
    >
      <div
        class="card-title"
        @click="toNoticeDeatil(item)"
      >
        {{ item.title }}
      </div>
      <div
        class="card-content"
        @click="toNoticeDeatil(item)"
      >
        <div class="card-left">
          <div class="publishTime">
            {{ item.publishTime }}
          </div>
          <div>发布人：{{ item.publishUserName }}</div>
        </div>
        <div>{{ item.readNum }}人阅读</div>
      </div>
    </el-card>
    <div class="pagination-box">
      <el-pagination
        background
        :page-sizes="pageSizes"
        :page-size="5"
        :current-page="currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getNoticeCenterList } from '@/api/noticeCenter/noticeCenter'
import PageHeader from '@/components/page-header/pageHeader'
export default {
  name: 'NoticeList',
  components: { PageHeader },
  data() {
    return {
      pageSizes: [5, 10],
      currentPage: 0,
      noticeList: [],
      totalNum: 0,
      totalPage: 0,
      parmas: {
        pageNo: 1,
        pageSize: 5
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      getNoticeCenterList(this.parmas).then((res) => {
        let { data, totalNum, totalPage } = res
        this.noticeList = data
        this.totalNum = totalNum
        this.totalPage = totalPage
      })
    },
    handleSizeChange(val) {
      this.parmas.pageSize = val
      this.initData()
    },
    handleCurrentChange(val) {
      this.parmas.pageNo = val
      this.initData()
    },
    toNoticeDeatil(data) {
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
.notice-list {
  .box-card {
    cursor: pointer;
    margin-bottom: 16px;
    .card-title {
      font-size: 20px;
      color: #202940;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .card-content {
      font-size: 14px;
      color: #757c85;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .card-left {
        display: flex;
        align-items: center;
        margin-top: 16px;
        .publishTime {
          margin-right: 10px;
        }
      }
    }
  }
  .pagination-box {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
}
</style>

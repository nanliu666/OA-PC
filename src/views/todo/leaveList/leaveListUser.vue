<template>
  <div
    v-loading="loading"
    class="fill"
  >
    <page-header
      title="离职事项详情"
      show-back
    />
    <basic-container block>
      <div class="header">
        <div class="name-row">
          <div class="name-box">
            {{ personData.userName }} 的离职交接事项
          </div>
        </div>
        <div class="info-row">
          <div>
            发起人: <span>{{ personData.userName }}</span>
          </div>
          <div>
            发起时间: <span>{{ personData.createTime }}</span>
          </div>
          <div>
            状态:
            <span class="status-box">{{
              personData.status === 'UnConfirm' ? '待确认' : '已确认'
            }}</span>
          </div>
        </div>
      </div>
      <div class="main-wrap">
        <div class="tips-row">
          您的离职申请已通过，请在离职前尽快与相关部门办理以下离职交接事项：
        </div>
        <div
          v-for="category in personData.data"
          :key="category.categoryId"
          class="category-box"
        >
          <div class="categoryName-row">
            {{ category.categoryName }}
          </div>
          <div
            v-for="detail in category.details"
            :key="detail.detailId"
            class="detail-box"
          >
            {{ detail.detailName }}
          </div>
        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { getLeaveNote } from '@/api/todo/todo'
import { mapGetters } from 'vuex'
export default {
  name: 'LeaveListUser',
  data() {
    return {
      loading: false,
      leaveUserId: '',
      groupId: '',
      personData: {}
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.loadingData()
  },
  methods: {
    loadingData() {
      this.loading = true
      this.leaveUserId = this.$route.query.id
      let params = {
        userId: this.userId,
        leaveUserId: this.leaveUserId
      }
      getLeaveNote(params)
        .then((res) => {
          this.personData = res
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-container--block {
  height: calc(100% - 82px);
  min-height: calc(100% - 82px);
}

// 头部
.header {
  border-bottom: 1px solid #e3e7e9;
  .name-row {
    display: flex;
    justify-content: space-between;
    .name-box {
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #202940;
      line-height: 23px;
      font-weight: bold;
    }
  }
  .info-row {
    margin: 16px 0 30px 0;
    display: flex;
    justify-content: start;
    line-height: 14px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #202940;
    div {
      margin-right: 48px;
      span {
        margin-left: 20px;
      }
    }
  }
}
// 主要内容区
.main-wrap {
  margin-top: 30px;
  .tips-row {
    font-size: 14px;
    color: #0e001c;
    line-height: 20px;
  }
  .category-box {
    .categoryName-row {
      font-size: 16px;
      color: #202940;
    }
    .detail-box {
      font-size: 14px;
      color: #718199;
    }
  }
}
</style>

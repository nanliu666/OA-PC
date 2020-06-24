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
            {{ listData.userName }} 的离职交接事项
          </div>
          <div
            v-if="listData.status === 'UnConfirm'"
            class="btn-box"
          >
            <el-button
              type="primary"
              size="medium"
              :loading="btnLoading"
              @click="confirmleaveNote"
            >
              确认
            </el-button>
            <el-button
              size="medium"
              @click="urgeleaveNote"
            >
              催办
            </el-button>
          </div>
        </div>
        <div class="info-row">
          <div>
            发起人: <span>{{ listData.userName }}</span>
          </div>
          <div>
            发起时间: <span>{{ listData.createTime | dataFliter }}</span>
          </div>
          <div>
            状态:
            <span class="status-box">{{
              listData.status === 'UnConfirm' ? '待确认' : '已确认'
            }}</span>
          </div>
        </div>
      </div>
      <div class="main-wrap">
        <div class="tips-row">
          员工 {{ listData.userName }},请尽快为他办理以下离职交接事项并确认：
        </div>
        <div
          v-for="category in listData.data"
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
import { getLeaveNote, postConfirmleaveNote, postUrgeleaveNote } from '@/api/todo/todo'
import { mapGetters } from 'vuex'
export default {
  name: 'LeaveListOrg',
  filters: {
    dataFliter(time) {
      if (!time) {
        return
      }
      let dateStr = time.split(' ')
      let strGMT =
        dateStr[0] +
        ' ' +
        dateStr[1] +
        ' ' +
        dateStr[2] +
        ' ' +
        dateStr[5] +
        ' ' +
        dateStr[3] +
        ' GMT+0800'
      let date = new Date(Date.parse(strGMT))
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let dates = date.getDate()
      let h = date.getHours()
      let m = date.getMinutes()
      let s = date.getSeconds()
      h = h < 10 ? '0' + h : h
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      return `${year}-${month}-${dates}  ${h}:${m}:${s}`
    }
  },
  data() {
    return {
      loading: false,
      leaveUserId: '',
      groupId: '',
      listData: {},
      btnLoading: false
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
      let arrId = this.$route.query.id.split(',')
      this.leaveUserId = arrId[0]
      this.groupId = arrId[1]
      let params = {
        userId: this.userId,
        leaveUserId: this.leaveUserId,
        groupId: this.groupId
      }
      getLeaveNote(params)
        .then((res) => {
          this.listData = res[0]
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 确认离职交接事项
    async confirmleaveNote() {
      let params = {
        groupId: this.groupId,
        userId: this.leaveUserId
      }
      try {
        await this.$confirm('您确认该员工离职交接事项已完成吗？', '确认离职事项交接完成？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await postConfirmleaveNote(params)
        this.loadingData()
        this.$message.success('确认成功')
      } catch (error) {
        if (error !== 'cancel') {
          throw error
        }
      }
    },
    // 催办
    async urgeleaveNote() {
      await postUrgeleaveNote({
        groupId: this.groupId,
        userId: this.userId
      })
      this.$message.success('催办成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-container--block {
  height: calc(100% - 92px);
  min-height: calc(100% - 92px);
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
  margin-left: 20px;
  .tips-row {
    font-size: 14px;
    color: #0e001c;
    line-height: 20px;

    margin-bottom: 16px;
  }
  .category-box {
    margin-left: 20px;
    .categoryName-row {
      font-size: 14px;
      color: #202940;
      font-weight: bold;

      margin-bottom: 16px;
    }
    .detail-box {
      font-size: 14px;
      color: #718199;

      margin-bottom: 16px;
    }
  }
}
</style>

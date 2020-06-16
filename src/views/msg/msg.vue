<template>
  <div class="fill">
    <page-header
      title="消息中心"
      show-back
    />
    <basic-container block>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="工作消息"
          name="Work"
        />
        <el-tab-pane
          label="系统消息"
          name="System"
        />
      </el-tabs>
      <common-table
        :config="tableConfig"
        :page="page"
        :columns="columns"
        :data="dataList"
        :loading="loading"
        @current-page-change="currentPageChange"
        @page-size-change="pageSizeChange"
      >
        <!-- 操作栏 -->
        <div
          slot="topMenu"
          class="memu"
        >
          <el-select
            v-model="msgQuery.isRead"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div>
            <el-button
              type="text"
              size="medium"
              @click="signAllReadMsg"
            >
              标记所有为已读
            </el-button>

            <el-button
              type="text"
              size="medium"
              @click="delAllReadedMsg"
            >
              删除所有已读消息
            </el-button>
          </div>
        </div>

        <div
          slot="content"
          slot-scope="{ row }"
          class="row-box"
        >
          <div class="content">
            <span
              class="icon"
              :class="!row.isRead ? 'no-read' : ''"
            />{{ row.title }}
            {{ row.content }}
          </div>
          <div class="time">
            {{ row.createTime }}
          </div>
        </div>
      </common-table>
    </basic-container>
  </div>
</template>
<script>
import { getMsgList, creatSignReadMsg, creatDelReadMsg } from '@/api/msg/msg'
import { mapGetters } from 'vuex'
export default {
  name: 'Msg',
  data() {
    return {
      activeName: 'Work',
      // 请求参数
      msgQuery: {
        pageNo: 1,
        pageSize: 10,
        userId: '',
        type: 'Work',
        isRead: ''
      },
      // 选择全部消息或者没读消息
      options: [
        {
          value: '',
          label: '全部消息'
        },
        {
          value: 0,
          label: '没读消息'
        }
      ],
      isRead: '',
      // 表格数据
      dataList: [],
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      tableConfig: {
        showHandler: false,
        enablePagination: true,
        showIndexColumn: false
      },
      columns: [
        {
          label: '',
          prop: 'content',
          slot: true
        }
      ],
      loading: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  watch: {
    // 选择全部消息或者没读消息
    'msgQuery.isRead': {
      deep: true,
      handler: function() {
        this.loadingData()
      }
    }
  },
  created() {
    this.loadingData()
  },
  methods: {
    async loadingData() {
      this.loading = true
      this.msgQuery.userId = this.userId
      let res = await getMsgList(this.msgQuery.userId)
      this.dataList = res.data
      this.page.total = res.totalNum
      this.loading = false
    },
    // 页码切换
    currentPageChange(params) {
      (this.msgQuery.pageNo = params), this.loadingData()
    },
    // 条数切换
    pageSizeChange(params) {
      this.msgQuery.pageSize = params
      this.loadingData()
    },
    // 切换Work和System
    handleClick() {
      if (this.activeName === 'Work') {
        (this.msgQuery.type = 'Work'), this.loadingData()
      } else if (this.activeName === 'System') {
        (this.msgQuery.type = 'System'), this.loadingData()
      }
    },
    // 删除所有已读信息
    async delAllReadedMsg() {
      try {
        await this.$confirm('确定删除所有已读信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await creatDelReadMsg({ userId: this.userId })
        this.loadingData()
        this.$message.success('删除所有已读信息成功')
      } catch (error) {
        if (error !== 'cancel') {
          throw error
        }
      }
    },
    // 标记所有已读信息
    async signAllReadMsg() {
      try {
        await this.$confirm('确定标记所有已读信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await creatSignReadMsg({ userId: this.userId })
        this.loadingData()
        this.$message.success('标记所有为已读信息成功')
      } catch (error) {
        if (error !== 'cancel') {
          throw error
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-container--block {
  height: calc(100% - 82px);
  min-height: calc(100% - 82px);
}

.memu {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.row-box {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .content {
    line-height: 42px;
    .icon {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 100%;
      vertical-align: middle;
      margin-right: 10px;
    }
    .no-read {
      background: #ff6464;
    }
  }
}
</style>

<template>
  <el-row>
    <el-col :span="24">
      <div class="workArea-wrap">
        <el-row :gutter="20">
          <el-col :span="12">
            <!-- 代办事项 -->
            <div
              v-loading="todoLoading"
              class="todolist-wrap"
            >
              <tagCom
                v-model="toDoActiveName"
                title="待办事项"
                :label-array="toDoList"
                class="todolist"
              >
                <!-- 待处理 -->
                <div
                  v-if="toDoListData.length"
                  slot="Pending"
                >
                  <div
                    v-for="item in toDoListData"
                    :key="item.id"
                    class="item-row"
                  >
                    <div class="text-box">
                      <p @click="jumpToDetail(item.type, item.bizId)">
                        【{{ item.type | filterType }}】{{ item.title }}
                      </p>
                      <span
                        v-if="ifShowWarn(item.createTime)"
                      >滞留{{ getWarnText(item.startDate) }}天</span>
                    </div>
                    <div class="time-box">
                      {{ item.createTime | filterDate }}
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  slot="Pending"
                >
                  <div class="placeholder-box">
                    您当前没有待办事项，前往，<el-button
                      type="text"
                      size="medium"
                      @click="goTodoCenter"
                    >
                      代办中心
                    </el-button>
                  </div>
                </div>
                <!-- 预警 -->
                <div
                  v-if="warningList.length"
                  slot="Warning"
                >
                  <div
                    v-for="item in warningList"
                    :key="item.id"
                    class="item-row"
                  >
                    <div class="text-box">
                      <p @click="jumpToDetail(item.type, item.bizId)">
                        【{{ item.type | filterType }}】{{ item.title }}
                      </p>
                      <span v-if="ifShowWarn(item)">滞留{{ getWarnText(item) }}天</span>
                    </div>
                    <div class="time-box">
                      {{ item.createTime | filterDate }}
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  slot="Warning"
                >
                  <div class="placeholder-box">
                    您当前没有待办事项，前往，<el-button
                      type="text"
                      size="medium"
                      @click="goTodoCenter"
                    >
                      代办中心
                    </el-button>
                  </div>
                </div>
                <div
                  v-if="toDoActiveName === 'Pending' ? toDoListData.length : warningList.length"
                  slot="foot"
                  class="view-all"
                >
                  <el-button
                    type="text"
                    size="medium"
                    @click="goTodoCenter"
                  >
                    查看全部
                  </el-button>
                </div>
              </tagCom>
            </div>
          </el-col>
          <el-col :span="12">
            <!-- 消息通知 -->
            <div
              v-loading="warnLoading"
              class="news-wrap"
            >
              <tagCom
                v-model="newActiveName"
                title="消息通知"
                :label-array="newList"
                class="new"
              >
                <div
                  v-if="msgWorkList.length"
                  slot="workNews"
                >
                  <el-tooltip
                    v-for="item in msgWorkList"
                    :key="item.id"
                    :enterable="false"
                    :content="item.content"
                    placement="top"
                  >
                    <div @click="handelRead(item)">
                      <div
                        class="item-row new-item-tips"
                        :class="item.isRead === 0 ? 'new-item-tips' : 'new-item'"
                      >
                        <div class="title">
                          <div
                            v-if="item.isRead === 0"
                            class="icon"
                          />
                          <span>{{ item.title }}</span>
                        </div>
                        <div class="detail">
                          {{ item.content }}
                        </div>
                        <div class="time">
                          {{ item.createTime }}
                        </div>
                      </div>
                    </div>
                  </el-tooltip>
                </div>
                <div
                  v-else
                  slot="workNews"
                >
                  <div class="no-msg-box">
                    暂时没有工作消息通知
                  </div>
                </div>
                <div
                  v-if="msgSystemList.length"
                  slot="systemNews"
                >
                  <el-tooltip
                    v-for="item in msgSystemList"
                    :key="item.id"
                    :enterable="false"
                    effect="dark"
                    :content="item.content"
                    placement="top"
                  >
                    <div @click="handelRead(item)">
                      <div
                        class="item-row new-item-tips"
                        :class="item.isRead === 0 ? 'new-item-tips' : 'new-item'"
                      >
                        <div class="title">
                          <div
                            v-if="item.isRead === 0"
                            class="icon"
                          />
                          <span>{{ item.title }}</span>
                        </div>
                        <div class="detail">
                          {{ item.content }}
                        </div>
                        <div class="time">
                          {{ item.createTime }}
                        </div>
                      </div>
                    </div>
                  </el-tooltip>
                </div>
                <div
                  v-else
                  slot="systemNews"
                >
                  <div class="no-msg-box">
                    暂时没有工作消息通知
                  </div>
                </div>
                <div
                  v-if="newActiveName === 'workNews' ? msgWorkList.length : msgSystemList.length"
                  slot="foot"
                  class="view-all"
                >
                  <el-button
                    type="text"
                    size="medium"
                    @click="goMsgCenter"
                  >
                    查看全部
                  </el-button>
                </div>
              </tagCom>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import moment from 'moment'
import { todoTypeCN } from '@/const/todo'
import { getTodoList } from '@/api/todo/todo'
import { getMsgList, creatSignReadMsg } from '@/api/msg/msg'
import tagCom from './components/tagCom'
import { mapGetters } from 'vuex'
export default {
  name: 'MainContent',
  components: {
    tagCom
  },
  filters: {
    filterType(value) {
      if (!value) return
      return todoTypeCN[value]
    },
    filterDate(createTime) {
      let m = moment(createTime)
      let now = moment()
      if (m.format('YYYY-MM-DD') === now.format('YYYY-MM-DD')) {
        return m.format('HH:mm')
      } else if (m.format('YYYY-MM-DD') === now.subtract(1, 'days').format('YYYY-MM-DD')) {
        return `昨天 ${m.format('HH:mm')}`
      } else if (m.get('year') === now.get('year')) {
        return m.format('MM-DD HH:mm')
      } else {
        return m.format('YYYY-MM-DD HH:mm')
      }
    }
  },
  data() {
    return {
      // 代办事项
      toDoList: [
        {
          label: '待处理',
          name: 'Pending'
        },
        {
          label: '预警',
          name: 'Warning'
        }
      ],
      toDoActiveName: 'Pending',
      // 请求参数
      todoQuery: {
        pageNo: '1',
        pageSize: '10',
        isWarn: '',
        status: 'UnFinished'
      },
      // 列表数据
      toDoListData: [],
      warningList: [],
      todoLoading: false,
      // 消息通知
      newList: [
        {
          label: '工作消息',
          name: 'workNews'
        },
        {
          label: '系统消息',
          name: 'systemNews'
        }
      ],
      newActiveName: 'workNews',
      msgQuery: {
        pageNo: '1',
        pageSize: '10',
        userId: '',
        type: '',
        isRead: null
      },
      msgWorkList: [],
      msgSystemList: [],
      warnLoading: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.loadingToDoData()
    this.loadingMsgData()
  },
  methods: {
    // 获取todoData
    async loadingToDoData() {
      try {
        this.todoQuery.userId = this.userId
        this.todoLoading = true
        this.todoQuery.isWarn = null
        let toDoRes = await getTodoList(this.todoQuery)
        this.toDoListData = toDoRes.data
        this.toDoList[0].label = `待处理(${toDoRes.totalNum})`
        this.$emit('update:todoCount', toDoRes.totalNum)
        this.todoQuery.isWarn = 1
        let warningRes = await getTodoList(this.todoQuery)
        this.warningList = warningRes.data
        this.toDoList[1].label = `预警(${warningRes.totalNum})`
        this.todoLoading = false
      } catch (error) {
        this.todoLoading = false
      }
    },
    // 处理滞留按钮
    ifShowWarn(row) {
      return moment().diff(moment(row.endDate)) > 0
    },
    getWarnText(row) {
      return moment().diff(moment(row.beginDate), 'days')
    },
    // 点击查看代办事项全部，跳到代办中心
    goTodoCenter() {
      // Pending  isWarn参数为空  Warning isWarn参数为1
      let isWarn = null
      if (this.toDoActiveName === 'Warning') {
        isWarn = 1
      }
      this.$router.push({
        path: '/todo/todoList',
        query: {
          status: 'UnFinished',
          isWarn
        }
      })
    },
    // 跳去详情
    jumpToDetail(type, bizId) {
      if (type === 'Interview') {
        // 面试
        this.$router.push({
          path: '/todo/interviewDetail',
          query: { id: bizId }
        })
      } else if (type === 'Approve') {
        // 审批
        this.$router.push({
          path: '/approval/appr',
          query: {
            apprNo: bizId
          }
        })
      } else if (type === 'Recruitment') {
        // 招聘
        this.$router.push({
          path: '/personnel/recruit/specificPage',
          query: {
            id: bizId
          }
        })
      } else if (type === 'ResumeReview') {
        // 简历审核
        this.$router.push({
          path: '/todo/resumeReview',
          query: {
            id: bizId
          }
        })
      } else if (type === 'InterviewRegister') {
        // 面试登记表
        //
      } else if (type === 'Entry') {
        // 入职办理
        //
      } else if (type === 'EntryRegister') {
        // 入职登记表
        //
      } else if (type === 'LeaveList') {
        // 离职事项
        //
      } else if (type === 'Leave') {
        // 离职办理
        //
      }
    },
    async loadingMsgData() {
      try {
        this.warnLoading = true
        this.msgQuery.userId = this.userId
        let { data } = await getMsgList(this.msgQuery)
        this.msgWorkList = data.filter((item) => {
          return item.type === 'Work'
        })
        this.msgWorkList.sort((a, b) => {
          return a.isRead - b.isRead
        })
        this.msgSystemList = data.filter((item) => {
          return item.type === 'System'
        })
        this.msgSystemList.sort((a, b) => {
          return a.isRead - b.isRead
        })
        this.warnLoading = false
      } catch (error) {
        this.warnLoading = false
      }
    },
    // 跳去信息中心
    goMsgCenter() {
      this.$router.push({
        path: '/msg/msg'
      })
    },
    // 确定已读信息
    async handelRead({ id, isRead }) {
      if (isRead === 1) {
        return
      }
      try {
        await this.$confirm('确定已读该信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        let params = {
          id,
          userId: this.userId
        }
        await creatSignReadMsg(params)
        this.loadingMsgData()
        this.$message.success('标记已读成功')
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
// 代办事项
.workArea-wrap {
  /deep/.el-tabs__item {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #757c85;
  }
  /deep/.is-active {
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #202940;
    font-weight: bold;
  }
  /deep/.header {
    padding-left: 24px;
    margin-top: 0;
  }
  /deep/.el-tabs__nav-scroll {
    padding-left: 24px;
  }
  /deep/.el-tabs__content {
    height: 215px;
    overflow-y: auto;
  }
}

.todolist-wrap {
  min-width: 340px;
  height: 375px;
  background: #ffffff;
  position: relative;
  overflow-y: auto;
  .view-all {
    position: absolute;
    bottom: 12px;
    left: 24px;
  }
  // 没有代办数据时显示
  .placeholder-box {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
  }
  .item-row {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #eeeeee;
    padding: 0 24px;
    height: 43px;
    .text-box {
      display: flex;
      justify-self: start;
      align-items: center;
      width: 70%;
      margin-right: 12px;
      p {
        cursor: pointer;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #13141a;
        line-height: 43px;
        height: 43px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0 20px 0 0px;
      }
      span {
        background: #ff8b8a;

        border-radius: 4px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        text-align: center;
        color: #ffffff;
        line-height: 26px;
        padding: 3px 6px;
        min-width: 63px;
        height: 26px;
      }
    }

    .time-box {
      vertical-align: text-bottom;
      font-family: ArialMT;
      font-size: 14px;
      color: #718199;
      line-height: 43px;
      min-width: 80px;
    }
  }
}

// 消息中心
.news-wrap {
  min-width: 340px;
  height: 375px;
  background: #ffffff;
  overflow-y: auto;
  position: relative;
  .view-all {
    position: absolute;
    bottom: 12px;
    left: 24px;
  }
  // 公共样式
  .title {
    min-width: 100px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    line-height: 43px;
    color: #718199;
    display: inline-block;
  }
  .time {
    margin-left: 24px;
    font-size: 14px;
    font-family: ArialMT;
    line-height: 43px;
    display: inline-block;
    min-width: 80px;
    display: inline-block;
  }
  .detail {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 43px;
    display: inline-block;
    text-align: start;
    width: 70%;
    padding-left: 24px;
    // 。。。
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .new-item-tips {
    border-bottom: solid 1px #eeeeee;
    .title {
      width: 98px;
      // span {
      // 	display: inline-block;
      // 	vertical-align: middle;
      // }
      // 小红点
      .icon {
        margin-right: 8px;
        width: 6px;
        height: 6px;
        border-radius: 100%;
        background: #ff6464 100%;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .detail {
      color: #202940;
    }
    .time {
      color: #000000;
    }
  }
  .new-item {
    border-bottom: solid 1px #eeeeee;
    .title {
      padding-left: 14px;
      box-sizing: border-box;
    }
    .detail {
      color: #718199;
    }
    .time {
      color: #718199;
    }
  }
  .item-row {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #eeeeee;
    padding: 0 24px;
    height: 43px;
  }
  .no-msg-box {
    text-align: center;
    line-height: 215px;
  }
}
</style>

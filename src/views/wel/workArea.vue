<template>
  <el-row>
    <el-col :span="24">
      <div class="workArea-wrap">
        <el-row :gutter="20">
          <el-col :span="12">
            <!-- 代办事项 -->
            <div class="todolist-wrap">
              <tagCom
                v-model="toDoActiveName"
                title="代办事项"
                :label-array="toDoList"
                class="todolist"
                @click-icon="handelClick('代办事项')"
                @tab-click="changeTodo"
              >
                <!-- 带处理 -->
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
                  v-if="toDoListData.length"
                  slot="Warning"
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
                  v-if="toDoListData.length"
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
            <div class="news-wrap">
              <tagCom
                v-model="newActiveName"
                title="消息通知"
                :label-array="newList"
                class="new"
                @click-icon="handelClick('消息通知')"
                @tab-click="changeNews"
              >
                <div slot="workNews">
                  <div class="item-row new-item-tips">
                    <div class="title">
                      <div class="icon" />
                      <span>安排面试</span>
                    </div>
                    <div class="detail">
                      海外拓展部市场经理罗常常预计入…罗常常预计入…罗常常预计入…罗常常预计入…dasdasd
                    </div>
                    <div class="time">
                      03-25 10:21
                    </div>
                  </div>
                  <div class=" item-row new-item-tips">
                    <div class="title">
                      <div class="icon" />
                      <span>简历审核</span>
                    </div>
                    <div class="detail">
                      海外拓展部市场经理罗常常预计入…罗常常预计入…罗常常预计入…罗常常预计入…罗常常预计入…罗常常预计入…罗常常预计入…dasdasd
                    </div>
                    <div class="time">
                      03-25 10:21
                    </div>
                  </div>
                  <div class=" item-row new-item">
                    <div class="title">
                      简历审核取消
                    </div>
                    <div class="detail">
                      市场拓展比雷埃夫斯港邮轮码头扩建大苏打实打实的大苏打实打实大苏打dasdadsad
                    </div>
                    <div class="time">
                      03-25 10:21
                    </div>
                  </div>
                  <div class=" item-row new-item">
                    <div class="title">
                      面试安排
                    </div>
                    <div class="detail">
                      大数据统计输出报表大家最想去哪
                    </div>
                    <div class="time">
                      03-25 10:21
                    </div>
                  </div>
                </div>
                <div slot="systemNews">
                  系统消息
                </div>
                <div
                  slot="foot"
                  class="view-all"
                >
                  <el-button
                    type="text"
                    size="medium"
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
import tagCom from './components/tagCom'
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
          label: '待处理(12)',
          name: 'Pending'
        },
        {
          label: '预警(5)',
          name: 'Warning'
        }
      ],
      toDoActiveName: 'Pending',
      // 请求参数
      todoQuery: {
        pageNo: '',
        pageSize: '',
        isWarn: '',
        status: 'UnFinished'
      },
      // 列表数据
      toDoListData: [],
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
      newActiveName: 'workNews'
    }
  },
  created() {
    this.loadingToDoData()
  },
  methods: {
    async loadingToDoData() {
      let res = await getTodoList(this.todoQuery)
      this.toDoListData = res.data
    },
    // 处理滞留按钮
    ifShowWarn(endDate) {
      return moment().diff(moment(endDate)) > 0
    },
    getWarnText(startDate) {
      return moment().diff(moment(startDate), 'days')
    },
    changeTodo() {
      // Pending  isWarn参数为空  Warning isWarn参数为1
      if (this.toDoActiveName === 'Pending') {
        (this.todoQuery.isWarn = ''), this.loadingToDoData()
      } else if (this.toDoActiveName === 'Warning') {
        (this.todoQuery.isWarn = 1), this.loadingToDoData()
      }
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
    changeNews() {},
    handelClick() {
      // console.log(e)
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
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #eeeeee;
    padding: 0 24px;
    height: 43px;
  }
}
</style>

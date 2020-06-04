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
                @tab-click="changeTodo"
              >
                <div slot="Pending">
                  <div class="item-row">
                    <div class="text-box">
                      <p>海外拓展部市场经理罗常常常常常常海外拓展部市场经理罗常常常常常常</p>
                      <span>滞留两天</span>
                    </div>

                    <span class="time-box">03-25 10:21</span>
                  </div>
                  <div class="item-row">
                    <div class="text-box">
                      <p>海外拓展部市常常常常</p>
                      <span>滞留两天</span>
                    </div>

                    <span class="time-box">03-25 10:21</span>
                  </div>
                  <div class="item-row">
                    <div class="text-box">
                      <p>海外拓展部市场经理罗常常常常常常</p>
                      <span>滞留两天</span>
                    </div>

                    <span class="time-box">03-25 10:21</span>
                  </div>
                  <div class="item-row">
                    <div class="text-box">
                      <p>海外拓展部市场经理罗常常常常常常常常常常常常常常常常</p>
                      <span>滞留两天</span>
                    </div>

                    <span class="time-box">03-25 10:21</span>
                  </div>
                  <div class="item-row">
                    <div class="text-box">
                      <p>海外拓展部市场经理罗常常常常常常</p>
                      <span>滞留两天</span>
                    </div>

                    <span class="time-box">03-25 10:21</span>
                  </div>
                </div>
                <div slot="Warning">
                  预警
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
                @tab-click="changeNews"
              >
                <div slot="workNews">
                  <div class="item-row new-item-tips">
                    <div class="title">
                      <div class="icon" />
                      <span>安排面试</span>
                    </div>
                    <div class="detail">
                      海外拓展部市场经理罗常常预计入…
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
                      海外拓展部市场经理罗常常预计入…
                    </div>
                    <div class="time">
                      03-25 10:21
                    </div>
                  </div>
                  <div class=" item-row new-item">
                    <div class="title">
                      简历审核
                    </div>
                    <div class="detail">
                      市场拓展比雷埃夫斯港邮轮码头扩建
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
              </tagCom>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import tagCom from './components/tagCom'
export default {
  name: 'MainContent',
  components: {
    tagCom
    // toDoList
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
  methods: {
    changeTodo() {},
    changeNews() {}
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
  }
  /deep/.el-tabs__nav {
    padding-left: 24px;
  }
}

.todolist-wrap {
  min-width: 506px;
  height: 375px;
  background: #ffffff;

  .todolist {
    .item-row {
      display: flex;
      justify-content: space-between;
      border-bottom: solid 1px #eeeeee;
      padding: 0 24px;
      height: 43px;
      .text-box {
        p {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #13141a;
          line-height: 43px;

          height: 43px;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0 20px 0 0px;
          display: inline-block;
          vertical-align: middle;
        }
        span {
          display: inline-block;
          background: #ff8b8a;
          border-radius: 4px;
          border-radius: 4px;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #ffffff;
          line-height: 20px;
          padding: 3px 6px;
        }
        vertical-align: middle;
        display: inline-block;
      }

      .time-box {
        vertical-align: text-bottom;
        font-family: ArialMT;
        font-size: 14px;
        color: #718199;
        line-height: 43px;
      }
    }
  }
}

// 消息中心
.news-wrap {
  min-width: 506px;
  height: 375px;
  background: #ffffff;

  .new-item-tips {
    height: 43px;
    border-bottom: solid 1px #eeeeee;

    .title {
      min-width: 84px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #718199;
      line-height: 43px;
      display: inline-block;
      width: 98px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      // 小红点
      .icon {
        margin-right: 8px;
        width: 6px;
        height: 6px;
        border-radius: 100%;
        background: #ff6464 100%;
        display: inline-block;
      }
    }
    .detail {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #202940;
      line-height: 43px;
      display: inline-block;
      width: 273px;
      text-align: start;
      min-width: 273px;
      width: 400px;
      // ...
    }
    .time {
      margin-left: 24px;
      font-family: ArialMT;
      font-size: 14px;
      color: #000000;
      line-height: 43px;
      display: inline-block;

      min-width: 80px;
    }
  }
  .new-item {
    border-bottom: solid 1px #eeeeee;
    height: 43px;
    .title {
      min-width: 84px;
      margin-left: 14px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #718199;
      line-height: 43px;
      display: inline-block;
    }
    .detail {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #718199;
      line-height: 43px;
      display: inline-block;
      min-width: 273px;
      width: 400px;
      text-align: start;
    }
    .time {
      font-family: ArialMT;
      font-size: 14px;
      color: #718199;
      line-height: 43px;
      display: inline-block;
      margin-left: 24px;
      min-width: 80px;
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

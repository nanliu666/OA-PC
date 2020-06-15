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
                <div slot="Pending">
                  <div class="item-row">
                    <div class="text-box">
                      <p>海外拓展部市场经理罗常常常常常常海外拓展部市场经理罗常常常常常常</p>
                      <span>滞留两天</span>
                    </div>
                    <div class="time-box">
                      03-25 10:21
                    </div>
                  </div>
                  <div class="item-row">
                    <div class="text-box">
                      <p>
                        海外拓展部市场经理罗常常常常常常海外拓展部市场经理罗常常常常常dsadasdasdasdasdasd常
                      </p>
                      <span>滞留两天</span>
                    </div>
                    <div class="time-box">
                      03-25 10:21
                    </div>
                  </div>
                  <div class="item-row">
                    <div class="text-box">
                      <p>海外拓展常常常常部市场经理罗常常常常常常</p>
                      <span>滞留两天</span>
                    </div>
                    <div class="time-box">
                      03-25 10:21
                    </div>
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
}

.todolist-wrap {
  min-width: 340px;
  height: 375px;
  background: #ffffff;
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

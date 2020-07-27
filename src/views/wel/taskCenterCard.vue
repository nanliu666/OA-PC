<template>
  <div
    v-loading="taskLoading"
    class="taskCenter-wrap"
  >
    <tagCom
      v-model="taskActiveName"
      title="我的任务"
      :label-array="labelArray"
      class="tasklist"
    >
      <!-- 进行中 -->
      <div
        v-if="taskDataList.length"
        :slot="taskActiveName"
      >
        <div
          v-for="(item, index) in taskDataList"
          :key="index"
          class="task-item"
        >
          <!-- 任务内容 -->
          <div class="task-introduce">
            <div class="title-row">
              <span class="type">{{ item.type | filterType }}需求:</span>
              <span class="title">{{ item.title }}</span>
              <span class="emerType">{{ item.emerType | filterEmerType(EmerType) }}</span>
            </div>
            <div class="education-row">
              {{ item.brief | filterBrief(WorkYear, EducationalLevel) }}
            </div>
          </div>
          <!-- 任务类型 -->
          <div class="task-type">
            <div class="type-row">
              任务类型：<span>{{ item.type | filterType }}任务</span>
            </div>
            <div class="endTime-row">
              截止日期：<span>{{ item.endDate }}</span>
              <span
                v-if="isOverdue(item)"
                class="isOverdue"
              >已逾期</span>
            </div>
          </div>
          <!-- 任务进度 -->
          <div class="task-progress">
            <div class="num-box">
              {{ parseInt((item.completeNum / item.totalNum) * 100) }}%
            </div>
            <div class="detail-box">
              <el-progress
                :percentage="parseInt((item.completeNum / item.totalNum) * 100)"
                :format="() => ''"
              />
              <div class="totalNum-row">
                计划招聘{{ item.totalNum }}人
              </div>
              <div class="completeNum-row">
                已入职{{ item.completeNum }}人
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        :slot="taskActiveName"
        class="placeholder-box"
      >
        您当前没有任务，前往
        <el-button
          type="text"
          size="medium"
          @click="goTOTaskCenter"
        >
          任务中心
        </el-button>
      </div>
      <div
        slot="foot"
        class="view-all"
      >
        <el-button
          type="text"
          size="medium"
          @click="goTOTaskCenter"
        >
          查看全部
        </el-button>
      </div>
    </tagCom>
  </div>
</template>

<script>
import { taskTypeCN } from '@/const/taskCenter'
import { fetchTaskList } from '@/api/taskcenter/taskcenter'
import tagCom from './components/tagCom'
import { mapGetters } from 'vuex'
export default {
  name: 'TaskCenterCard',
  components: { tagCom },
  filters: {
    // 过滤任务类型
    filterType(val) {
      if (!val) {
        return
      }
      return taskTypeCN[val]
    },
    // 过滤紧急程度
    filterEmerType(val, obj) {
      if (!val) {
        return
      }
      let result = ''
      let showArr = ['Super', 'urgent']
      if (showArr.indexOf(val) !== -1) {
        result = obj[val]
      }
      return result
    },
    // filter学历和工作年限
    filterBrief(val, WorkYear, EducationalLevel) {
      if (!val) {
        return
      }
      let result = ''
      let arr = val.split('|')
      let work_year = ''
      let educational_level = ''
      educational_level = EducationalLevel[arr[0]]
      work_year = WorkYear[arr[1]]
      if (educational_level && work_year) {
        result = `${educational_level} | ${work_year}`
      } else {
        result = `${educational_level ? educational_level : ''}${work_year ? work_year : ''}`
      }
      return result
    }
  },

  data() {
    return {
      // loading
      taskLoading: false,
      // 标题
      labelArray: [
        {
          label: '进行中',
          name: 'ongoing'
        },
        {
          label: '已逾期',
          name: 'overdue'
        }
      ],
      taskActiveName: 'ongoing',
      // 请求参数
      taskQuery: {
        pageNo: 1,
        pageSize: 10,
        title: '',
        type: '',
        beginEndDate: '',
        endEndDate: '',
        isOverdue: 0,
        status: 'UnFinished',
        userId: ''
      },
      // 任务数据
      taskDataList: [],
      // 字典组
      EmerType: {},
      WorkYear: {},
      EducationalLevel: {},
      nowDate: new Date()
    }
  },
  computed: {
    ...mapGetters(['userId']),
    // 计算是否已逾期
    isOverdue: function() {
      return function({ endDate }) {
        let now = this.nowDate.valueOf()
        let time = new Date(endDate).valueOf()
        if (now > time) {
          return true
        } else {
          return false
        }
      }
    }
  },
  watch: {
    // 监听切换进行中和已逾期
    taskActiveName(nVal) {
      if (nVal === 'overdue') {
        (this.taskQuery.isOverdue = 1), this.loadData()
      } else if (nVal === 'ongoing') {
        (this.taskQuery.isOverdue = 0), this.loadData()
      }
    }
  },

  created() {
    this.loadData()
    this.getCommonDict()
  },
  methods: {
    // 获取数据
    async loadData() {
      this.taskQuery.userId = this.userId
      this.taskLoading = true
      let { data } = await fetchTaskList(this.taskQuery).finally(() => {
        this.taskLoading = false
      })
      this.taskDataList = data
    },
    // 获取相关字典组
    getCommonDict() {
      let commonDictNameArr = ['EmerType', 'WorkYear', 'EducationalLevel']
      commonDictNameArr.forEach((item) => {
        this.$store.dispatch('CommonDict', item).then((res) => {
          let obj = {}
          res.forEach((el) => {
            obj[el.dictKey] = el.dictValue
          })
          this[item] = obj
        })
      })
    },
    // 跳去任务中心
    goTOTaskCenter() {
      this.$router.push({
        path: '/taskCenter/taskCenter'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.taskCenter-wrap {
  .tasklist {
    height: 393px;
    position: relative;
  }
  background: #ffffff;
  /deep/.el-tabs__item {
    font-size: 16px;
    color: #757c85;
    height: 22px;
    line-height: 22px;
    margin-bottom: 8px;
  }

  /deep/.el-tabs__item:hover {
    font-size: 16px;
    color: #73b9ff;
  }
  /deep/.el-tabs__item:active {
    font-size: 16px;
    color: #115fd4;
  }
  /deep/.is-active {
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
    height: 243px;
    overflow-y: auto;
  }

  /deep/.el-progress-bar {
    padding-right: 0;
  }

  // /deep/.el-progress__text {
  // 	display: none;
  // }
  .placeholder-box {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
  }
  .task-item {
    height: 80px;
    margin-left: 24px;
    border-bottom: 1px solid #e3e7e9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // 任务内容
    .task-introduce {
      flex: 2;
      .title-row {
        .title,
        .type {
          font-size: 14px;
          color: #202940;
          line-height: 22px;
          font-weight: bold;
          margin-bottom: 4px;
        }
        .emerType {
          margin-left: 16px;
        }
      }
      .education-row {
        font-size: 14px;
        color: #718199;
        line-height: 22px;
      }
    }
    //    任务类型
    .task-type {
      flex: 1;
      .type-row,
      .endTime-row {
        font-size: 14px;
        color: #718199;
        line-height: 22px;
        span {
          font-size: 14px;
          color: #0e001c;
          line-height: 22px;
        }
        .isOverdue {
          margin-left: 10px;
        }
      }
      .type-row {
        margin-bottom: 4px;
      }
    }
    // 任务进度
    .task-progress {
      flex: 1;
      display: flex;
      justify-content: center;
      .detail-box {
        margin-left: 15px;
        .totalNum-row,
        .completeNum-row {
          font-size: 12px;
          color: #718199;
          line-height: 16px;
        }
      }
      .num-box {
        font-size: 24px;
        color: #78859c;
        display: flex;
        align-items: center;
      }
    }
  }
  .view-all {
    position: absolute;
    bottom: 8px;
    left: 24px;
  }
}
</style>

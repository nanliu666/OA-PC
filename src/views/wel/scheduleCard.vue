<template>
  <div class="scheduleWrap">
    <el-card class="content">
      <div class="header">
        <span class="title">
          <span>日程中心</span>
          <i
            class="icon-arrow-right-outlined"
            style="margin-right:12px;cursor: pointer; "
          />
        </span>
      </div>
      <div class="main-box">
        <!-- 日历 -->
        <div class="calendar-box">
          <div class="calendar-header">
            <div class="content">
              <div
                class="prev-month"
                @click="$refs.Calendar.selectDate('prev-month')"
              >
                <i class="icon-arrow-left-outlined" />
              </div>
              <div class="data-box">
                {{ `${chooseDate.getFullYear()}年${chooseDate.getMonth() + 1}月` }}
              </div>
              <div
                class="next-month"
                @click="$refs.Calendar.selectDate('next-month')"
              >
                <i class="icon-arrow-right-outlined" />
              </div>
            </div>
          </div>
          <el-calendar
            ref="Calendar"
            v-model="chooseDate"
          >
            <template
              slot="dateCell"
              slot-scope="{ date, data }"
            >
              <p
                :class="data.isSelected ? 'is-selected' : ''"
                class="date-item"
              >
                {{ date.getDate() }}
              </p>
            </template>
          </el-calendar>
        </div>
        <!-- 事项 -->
        <div
          v-loading="loading"
          class="matter-box"
        >
          <div class="content">
            <div class="time-row">
              <div class="time-box">
                <!-- <span>{{ chooseDate.getDate() >= 10 ? chooseDate.getDate() : `0${chooseDate.getDate()}` }}日</span>
                <span> 星期{{ num2Chinese }}</span>  -->
                <div class="day">
                  {{ moment(chooseDate).format('DD') }}
                </div>
                <div class="week">
                  <div>星期{{ num2Chinese }}</div>
                  <div>{{ moment(chooseDate).format('YYYY年MM月') }}</div>
                </div>
              </div>
              <el-button
                size="medium"
                icon="icon-tips-plus-outlined"
                @click="handelAddSch"
              >
                添加提醒事项
              </el-button>
            </div>
            <div
              v-if="scheduleList.length"
              class="matter-detail"
            >
              <div
                v-for="(item, index) in scheduleList"
                :key="index"
              >
                <span>{{ item.type | filterScheduleType }}:</span>
                {{ item.title }}
              </div>
            </div>
            <div
              v-else
              class="no-matter"
            >
              <div>当日无任何事项</div>
              <div>有计划工作才会有效率</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <addSchDialog
      ref="schDialog"
      :refresh="loadData"
      :choose-day="chooseDate"
    />
  </div>
</template>

<script>
import moment from 'moment'
import { scheduleTypeCN, dayMapCN } from '@/const/taskCenter'
import { mapGetters } from 'vuex'
import addSchDialog from './components/addSchDialog'
import { fetchScheduleinfo } from '@/api/taskcenter/taskcenter'
export default {
  name: 'ScheduleCard',
  components: {
    addSchDialog
  },
  filters: {
    filterScheduleType(val) {
      if (!val) return
      return scheduleTypeCN[val]
    }
  },
  data() {
    return {
      // 选择的日期，默认当天
      chooseDate: new Date(),
      query: {
        beginRemindDate: '',
        endRemindDate: '',
        userId: ''
      },
      loading: false,
      // 数据List
      scheduleList: []
    }
  },
  computed: {
    ...mapGetters(['userId']),
    num2Chinese() {
      return dayMapCN[this.chooseDate.getDay()]
    }
  },
  watch: {
    chooseDate() {
      this.loadData()
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    moment,
    // loadingData
    loadData() {
      this.loading = true
      this.query.userId = this.userId
      this.query.beginRemindDate = this.chooseDate
      this.query.endRemindDate = this.chooseDate
      fetchScheduleinfo(this.query)
        .then((res) => {
          this.scheduleList = res
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 点击添加提醒事项
    handelAddSch() {
      this.$refs.schDialog.showDialog()
    },
    jumpScheduleCenter() {
      this.$router.push({
        path: '/taskCenter/scheduleCenter'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-calendar-table td.is-selected {
  background: #ffffff;
}
/deep/ .el-calendar-table td.is-chooseDate {
  color: #000;
}
/deep/.el-calendar__header {
  display: none;
}
/deep/.el-calendar-table td {
  border: none;
}
/deep/.el-calendar-table .el-calendar-day {
  border: none;
}
/deep/.el-calendar-table tr td:first-child {
  border: none;
}
/deep/.el-calendar-table tr:first-child td {
  border: none;
}
/deep/.el-calendar-table .el-calendar-day {
  height: 36px;
  text-align: center;
}
/deep/.el-calendar-table .el-calendar-day:hover {
  background: #ffffff;
}
/deep/.el-calendar-day {
  width: 36px;
  line-height: 36px;
  padding: 0;
  margin: 0 auto;
}
.scheduleWrap {
  margin-top: 19px;
  background-color: #ffffff;
  .content {
    // 头部
    .header {
      padding: 16px 0;
      .title {
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
  }
  .main-box {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    .calendar-box {
      flex: 1;
      height: 302px;
      box-sizing: border-box;
      border-right: 2px solid #e3e7e9;
      .calendar-header {
        padding: 0 20px;
        .content {
          height: 42px;
          line-height: 42px;
          display: flex;
          justify-content: space-between;
          text-align: center;

          .data-box {
            flex: 5;
            margin: 0 8px;
            font-weight: bold;
            background: #f9f9f9;
            border-radius: 4px;
            border-radius: 4px;
            color: #202940;
            font-size: 18px;
          }
          .prev-month,
          .next-month {
            opacity: 0.4;
            background: #a0a8ae;
            border-radius: 4px;
            border-radius: 4px;
            color: #ffffff;
            cursor: pointer;
          }
        }
      }
      .date-item {
        margin: 0;
        height: 36px;
        width: 36px;
        line-height: 36px;
        text-align: center;
      }
      .is-selected {
        background: #207efa;
        box-shadow: 0 4px 8px 2px rgba(8, 85, 163, 0.16);
        border-radius: 100%;
        color: #fff;
      }
      .date-item:hover {
        border: 2px solid #207efa;
        line-height: 32px;
        border-radius: 100%;
        box-sizing: border-box;
      }
    }
    // <!-- 事项 -->
    .matter-box {
      flex: 1;
      padding: 0 20px;
      height: 302px;
      position: relative;
      .content {
        border-bottom: 1px solid #e3e7e9;
        .time-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
          height: 34px;
          .time-box {
            display: flex;
            flex-direction: row;
            align-items: center;
            .day {
              margin-right: 10px;
              font-size: 40px;
              font-weight: 550;
              color: #6b6b6b;
            }
            .week {
              color: #6b6b6b;
              font-size: 14px;
            }
          }
          // span {
          //   font-size: 18px;
          //   color: #202940;
          //   line-height: 28px;
          // }
          // :first-child {
          //   margin-right: 16px;
          // }
        }
        .matter-detail {
          height: 244px;
          overflow: auto;
          div {
            background: #edf8ff;
            height: 36px;
            border-left: 3px solid #6aafff;
            font-size: 14px;
            color: #207efa;
            line-height: 36px;
            box-sizing: border-box;
            padding-left: 21px;
            margin: 4px 0;
          }
        }
        .no-matter {
          height: 244px;
          div {
            font-size: 14px;
            color: #202940;
            line-height: 22px;
          }
          :last-child {
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .view-all {
    position: absolute;
    bottom: -48px;
    left: 24px;
  }
}
</style>

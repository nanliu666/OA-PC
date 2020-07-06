<template>
  <div class="fill">
    <page-header
      title="日程中心"
      show-back
    />
    <basic-container
      v-loading="loading"
      block
    >
      <!-- 日期选择框 -->
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
        <el-button
          size="medium"
          icon="icon-tips-plus-outlined"
          @click="handelAddSch(null)"
        >
          添加提醒事项
        </el-button>
      </div>
      <el-calendar
        ref="Calendar"
        v-model="chooseDate"
      >
        <template
          slot="dateCell"
          slot-scope="{ date, data }"
        >
          <el-popover
            v-if="renderList(data).length"
            :ref="data.day"
            placement="top-start"
            trigger="click"
            :visible-arrow="false"
            popper-class="remind-wrap"
          >
            <!-- 点击出现 -->
            <div class="remind-content">
              <div class="day-num">
                {{ date.getDate() }}
              </div>
              <div class="remind-box">
                <div
                  v-for="(item, index) in renderList(data)"
                  :key="index"
                  class="remind-item"
                  :class="today - date <= 0 ? 'blue-tip' : 'grey-tip'"
                >
                  {{ item.type | filterScheduleType }} {{ item.title }}
                  <i
                    class="el-icon-delete"
                    @click="removeSch(item)"
                  />
                </div>
              </div>
              <div class="btn-box">
                <el-button
                  type="text"
                  size="medium"
                  icon="icon-tips-plus-outlined"
                  @click="handelAddSch(data.day)"
                >
                  添加提醒事项
                </el-button>
              </div>
            </div>
            <!-- slot -->
            <div
              slot="reference"
              :class="data.isSelected ? 'is-selected' : ''"
              class="reference-content"
            >
              <div class="day-num">
                {{ date.getDate() }}
              </div>
              <div class="remind-box">
                <div
                  v-for="(item, index) in renderList(data)"
                  :key="index"
                  class="remind-item"
                  :class="today - date <= 0 ? 'blue-tip' : 'grey-tip'"
                >
                  {{ item.type | filterScheduleType }} {{ item.title }}
                </div>
              </div>
            </div>
          </el-popover>
          <el-popover
            v-else
            :ref="data.day"
            placement="top-start"
            trigger="click"
            :visible-arrow="false"
            popper-class="no-remind-wrap"
          >
            <!-- 点击出现 -->
            <div class="no-remind-content">
              <div class="day-num">
                {{ date.getDate() }}
              </div>
              <div class="btn-box">
                <el-button
                  type="text"
                  size="medium"
                  icon="icon-tips-plus-outlined"
                  @click="handelAddSch(data.day)"
                >
                  添加提醒事项
                </el-button>
              </div>
            </div>
            <!-- slot -->
            <div slot="reference">
              <div
                slot="reference"
                :class="data.isSelected ? 'is-selected' : ''"
              >
                <div class="day-num">
                  {{ date.getDate() }}
                </div>
              </div>
            </div>
          </el-popover>
        </template>
      </el-calendar>
    </basic-container>
    <addSchDialog
      ref="schDialog"
      :refresh="loadData"
    />
  </div>
</template>

<script>
import { scheduleTypeCN } from '@/const/taskCenter'
import { mapGetters } from 'vuex'
import addSchDialog from '@/views/wel/components/addSchDialog'
import { fetchScheduleinfo, delScheduleinfo } from '@/api/taskcenter/taskcenter'
export default {
  name: 'ScheduleCenter',
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
      // 选择的日期
      chooseDate: new Date(),
      today: new Date(),
      query: {
        beginRemindDate: '',
        endRemindDate: '',
        userId: ''
      },
      loading: false,
      // 数据List
      scheduleList: [],
      dialogVisible: false
    }
  },

  computed: {
    ...mapGetters(['userId']),
    renderList: function() {
      return (data) => {
        return this.scheduleList.filter((item) => {
          return data.day == item.remindDate
        })
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
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
    handelAddSch(params) {
      if (params) {
        this.$refs[params].doClose()
      }
      this.$refs.schDialog.showDialog()
    },
    // 删除提醒事项
    removeSch({ id }) {
      delScheduleinfo({ id, userId: this.userId }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.loadData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-container--block {
  height: calc(100% - 92px);
  min-height: calc(100% - 92px);
}
/deep/.el-calendar__header {
  display: none;
}
/deep/ .el-calendar-table td.is-today {
  color: #000;
}
/deep/.el-calendar-table .el-calendar-day {
  height: 120px;
  padding: 0;
}

/deep/.el-calendar-table td.is-selected {
  background-color: #ffffff;
}
/deep/.el-calendar-table .el-calendar-day:hover {
  background: #ffffff;
}
/deep/.el-popover__reference {
  height: 100%;
}

// .el-popover {
//   transform: translate(0, 70%);
// }

// 头部
.calendar-header {
  display: flex;
  justify-content: space-between;
  height: 42px;
  line-height: 42px;
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
      // background: #a0a8ae;
      border-radius: 4px;
      border-radius: 4px;
      // color: #ffffff;
      cursor: pointer;
    }
  }
}
.remind-wrap {
  .remind-content {
    width: 200px;
    height: 200px;
    .remind-box {
      overflow: auto;
      height: 120px;
      .remind-item {
        cursor: pointer;
        border-radius: 4px;
        height: 30px;
        margin-bottom: 8px;
        line-height: 30px;
        padding-left: 8px;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        // normal
      }
      .remind-item:hover {
        white-space: normal;
        height: auto;
      }
      .el-icon-delete {
        cursor: pointer;
      }
      .blue-tip {
        background: #207efa;
        color: #ffffff;
      }
      .grey-tip {
        background: #a0a8ae;
        color: #000;
      }
    }
  }
  .day-num {
    height: 36px;
    width: 36px;
    background: #207efa;
    line-height: 36px;
    text-align: center;
    border-radius: 100%;
    box-sizing: border-box;
    box-shadow: 0 4px 8px 2px rgba(8, 85, 163, 0.16);
    color: #fff;
    margin-bottom: 5px;
  }
  .btn-box {
    display: flex;
    justify-content: center;
  }
}

// 点击区域
.reference-content {
  .remind-box {
    overflow: auto;
    height: 76px;
    .remind-item {
      border-radius: 4px;
      height: 30px;
      margin-bottom: 8px;
      line-height: 30px;
      padding-left: 8px;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 5px 10px;
      // normal
    }
    .blue-tip {
      background: #207efa;
      color: #ffffff;
    }
    .grey-tip {
      background: #a0a8ae;
      color: #000;
    }
  }
  .day-num {
    height: 36px;
    width: 36px;
    line-height: 36px;
    text-align: center;
    box-sizing: border-box;
    margin-bottom: 5px;
  }
}

.is-selected {
  margin-bottom: 8px;
  .day-num {
    height: 36px;
    width: 36px;
    background: #207efa;
    line-height: 36px;
    text-align: center;
    border-radius: 100%;
    box-sizing: border-box;
    box-shadow: 0 4px 8px 2px rgba(8, 85, 163, 0.16);
    color: #fff;
  }
}

.no-remind-wrap {
  .no-remind-content {
    width: 200px;
    height: 160px;
    .day-num {
      margin-bottom: 5px;
      height: 36px;
      width: 36px;
      background: #207efa;
      line-height: 36px;
      text-align: center;
      border-radius: 100%;
      box-sizing: border-box;
      box-shadow: 0 4px 8px 2px rgba(8, 85, 163, 0.16);
      color: #fff;
    }
    .btn-box {
      height: 70%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>

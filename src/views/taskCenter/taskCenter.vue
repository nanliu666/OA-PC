<template>
  <div class="fill">
    <page-header
      title="任务中心"
      show-back
    />
    <basic-container block>
      <el-tabs
        v-model="query.status"
        @tab-click="handleTabChange"
      >
        <el-tab-pane
          label="待处理"
          name="UnFinished"
        />
        <el-tab-pane
          label="已完成"
          name="Finished"
        />
      </el-tabs>
      <common-table
        :config="tableConfig"
        :page="page"
        :columns="columns"
        :data="tableData"
        :loading="loading"
        @page-size-change="sizeChange"
        @current-page-change="currentChange"
      >
        <!-- 头部 -->
        <div
          slot="topMenu"
          class="memu"
        >
          <!-- 搜索 -->

          <search-popover
            ref="searchPopover"
            :require-options="requireOptions"
            :popover-options="popoverOptions"
            @submit="handleSubmit"
            @reset="handleReset"
          />

          <el-button
            type="text"
            class="refresh"
            icon="icon-basics-refresh-outlined"
            size="medium"
            @click="loadData"
          />
        </div>
        <div
          slot="content"
          slot-scope="{ row }"
          class="row-box"
        >
          <div class="task-item">
            <!-- 任务内容 -->
            <div class="task-introduce">
              <div
                class="title-row"
                @click="jumpToDetail(row)"
              >
                <span class="type">{{ row.type | filterType }}需求:</span>
                <span class="title">{{ row.title }}</span>
                <span class="emerType">{{ row.emerType | filterEmerType(EmerType) }}</span>
              </div>
              <div class="education-row">
                {{ row.education | CommonDictType(EducationalLevel) }} |
                {{ row.workYears | CommonDictType(WorkYear) }}
              </div>
            </div>
            <!-- 任务类型 -->
            <div class="task-type">
              <div class="type-row">
                任务类型：<span>{{ row.type | filterType }}任务</span>
              </div>
              <div class="endTime-row">
                截止日期：<span>{{ row.endDate }}</span>
                <span
                  v-if="isOverdue(row)"
                  class="isOverdue"
                >已逾期</span>
              </div>
            </div>
            <!-- 任务进度 -->
            <div class="task-progress">
              <div class="num-box">
                {{ parseInt((row.completeNum / row.totalNum) * 100) }}%
              </div>
              <div class="detail-box">
                <el-progress
                  :percentage="parseInt((row.completeNum / row.totalNum) * 100)"
                  :format="() => ''"
                />
                <span class="totalNum-row">计划招聘{{ row.totalNum }}人</span>
                <span class="completeNum-row">已入职{{ row.completeNum }}人</span>
              </div>
            </div>
          </div>
        </div>
      </common-table>
    </basic-container>
  </div>
</template>

<script>
import { taskTypeCN } from '@/const/taskCenter'
import { fetchTaskList } from '@/api/taskcenter/taskcenter'
import { mapGetters } from 'vuex'
export default {
  name: 'TaskCenter',
  components: {
    SearchPopover: () => import('@/components/searchPopOver/index')
  },
  filters: {
    // 过滤任务类型
    filterType(val) {
      if (!val) {
        return
      }
      return taskTypeCN[val]
    },
    // 过滤紧急程度
    filterEmerType(val, List) {
      if (!val) {
        return
      }
      let result = ''
      let showArr = ['Super', 'urgent']
      if (showArr.indexOf(val) !== -1) {
        List.forEach((item) => {
          if (item.dictKey === val) {
            result = item.dictValue
          }
        })
      }
      return result
    },
    //
    CommonDictType: (value, CommonDictarr) => {
      if (!value) return ''
      let result = ''
      CommonDictarr.forEach((item) => {
        if (item.dictKey == value.trim()) {
          result = item.dictValue
          return
        }
      })

      return result
    }
  },
  data() {
    return {
      // 请求参数
      query: {
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
      // loading
      loading: false,
      // 表格
      tableConfig: {
        showHandler: false,
        enablePagination: true,
        showIndexColumn: false,
        showHeader: false
      },
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      tableData: [],
      columns: [
        {
          label: '',
          prop: 'content',
          slot: true
        }
      ],
      // 搜索配置
      requireOptions: [
        {
          type: 'input',
          field: 'title',
          label: '',
          data: '',
          options: [],
          config: { placeholder: '查找岗位', 'suffix-icon': 'el-icon-search' }
        }
      ],
      popoverOptions: [
        {
          type: 'select',
          field: 'type',
          label: '类型',
          data: '',
          options: Object.keys(taskTypeCN).map((key) => ({ value: key, label: taskTypeCN[key] })),
          config: {}
        },
        {
          type: 'dataPicker',
          data: '',
          label: '截止日期',
          field: 'endEndDate'
        },
        {
          type: 'select',
          field: 'isOverdue',
          label: '是否逾期',
          options: [
            { label: '是', value: 1 },
            { label: '否', value: 0 }
          ],
          data: '',
          config: {}
        }
      ],
      // 字典组
      EmerType: [],
      WorkYear: [],
      EducationalLevel: []
    }
  },
  computed: {
    ...mapGetters(['userId']),
    // // 计算是否已逾期
    isOverdue: function() {
      return function({ endDate }) {
        let nowDate = new Date()
        let now = nowDate.valueOf()
        let time = new Date(endDate).valueOf()
        if (now > time) {
          return true
        } else {
          return false
        }
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
      this.query.userId = this.userId
      this.loading = true
      let { data, totalNum } = await fetchTaskList(this.query).finally(() => {
        this.loading = false
      })
      this.tableData = data
      this.tableData.forEach((item) => {
        let arr = item.brief.split('|')
        item.education = arr[0]
        item.workYears = arr[1]
      })
      this.page.total = totalNum
    },
    // 切换完成没完成
    handleTabChange() {
      this.page.currentPage = 1
      this.loadData()
    },
    // 条数改变
    sizeChange(val) {
      this.page.size = val
      this.loadData()
    }, // 页码改变
    currentChange(val) {
      this.page.currentPage = val
      this.loadData()
    },
    // 搜索
    handleSubmit(params) {
      this.query = { ...this.query, ...params }
      this.loadData()
    },
    // 重置
    handleReset() {
      this.query = { status: this.query.status }
    },
    // 获取相关字典组
    getCommonDict() {
      let commonDictNameArr = [
        'EmerType',
        'WorkYear',
        'EducationalLevel'
        // 'RecruitmentReason',
        // 'WorkProperty',
        // 'ContractType',
        // 'LeaveReason',
        // 'ChangeReason'
      ]
      commonDictNameArr.forEach((item) => {
        this.$store.dispatch('CommonDict', item).then((res) => {
          // this.workPropertyList = res
          // 将res =》 [{dictKey:"",dictValue:"",id:""},{dictKey:"",dictValue:"",id:""}]
          let targetArr = []
          res.forEach((el) => {
            targetArr.push({ dictKey: el.dictKey, dictValue: el.dictValue, id: el.id })
          })
          this[item] = targetArr
        })
      })
    },
    // 跳去任务详情
    jumpToDetail({ bizId }) {
      this.$router.push({
        path: '/personnel/recruit/specificPage',
        query: {
          id: bizId
        }
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
/deep/.el-progress-bar {
  padding-right: 0;
}
/deep/.el-card__body {
  padding-top: 14px;
}
// 搜索样式
.memu {
  display: flex;
  justify-content: space-between;
  .refresh {
    color: #a0a8ae;
  }
}

.task-item {
  height: 80px;
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
        color: #207efa;
        line-height: 22px;
        font-weight: bold;
        cursor: pointer;
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
      .totalNum-row {
        margin-right: 8px;
        font-size: 12px;
        color: #718199;
        line-height: 16px;
      }
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
</style>

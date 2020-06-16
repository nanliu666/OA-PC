<template>
  <div class="fill">
    <page-header
      title="代办中心"
      show-back
    />
    <basic-container block>
      <!--UnFinished-待完成，Finished-已完成-->
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
      >
        <div
          slot="title"
          slot-scope="{ row }"
        >
          <el-button
            type="text"
            size="medium"
            @click="jumpToDetail(row)"
          >
            {{ row.title }}
          </el-button>
          <el-tag
            v-if="ifShowWarn(row)"
            type="danger"
          >
            停滞{{ getWarnText(row) }}天
          </el-tag>
        </div>
        <div
          slot="topMenu"
          class="memu"
        >
          <search-popover
            ref="searchPopover"
            :require-options="searchConfig.requireOptions"
            :popover-options="searchConfig.popoverOptions"
            @submit="handleSubmit"
            @reset="handleReset"
          />
          <el-button
            type="text"
            class="refresh"
            icon="el-icon-refresh-right"
            size="medium"
            @click="loadData"
          />
        </div>
      </common-table>
    </basic-container>
  </div>
</template>
<script>
import { todoTypeCN } from '@/const/todo'
import { getTodoList } from '@/api/todo/todo'
import moment from 'moment'

export default {
  name: 'TodoList',
  components: {
    SearchPopover: () => import('@/components/searchPopOver/index')
  },
  data() {
    return {
      query: {
        status: 'UnFinished'
      },
      loading: false,
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
          label: '标题',
          prop: 'title',
          minWidth: '300px',
          slot: true
        },
        {
          label: '类型',
          prop: 'type',
          formatter(record) {
            return todoTypeCN[record.type]
          }
        },
        {
          label: '时间',
          prop: 'createTime',
          formatter(record) {
            let m = moment(record.createTime)
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
        }
      ],
      tableData: [],
      searchConfig: {
        requireOptions: [
          {
            type: 'input',
            field: 'title',
            label: '',
            data: '',
            options: [],
            config: { placeholder: '标题', 'suffix-icon': 'el-icon-search' }
          }
        ],
        popoverOptions: [
          {
            type: 'select',
            field: 'type',
            label: '类型',
            data: '',
            options: Object.keys(todoTypeCN).map((key) => ({ value: key, label: todoTypeCN[key] })),
            config: {}
          },
          {
            type: 'dataPicker',
            data: '',
            label: '时间',
            field: 'beginTime,endTime',
            config: {
              type: 'datetimerange',
              'range-separator': '至',
              'value-format': 'yyyy-MM-dd HH:mm:ss',
              'default-time': ['00:00:00', '23:59:59']
            }
          },
          {
            type: 'select',
            field: 'isWarn',
            label: '是否预警',
            options: [
              { label: '是', value: 1 },
              { label: '否', value: 0 }
            ],
            data: '',
            config: {}
          }
        ]
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    ifShowWarn(row) {
      return moment().diff(moment(row.endDate)) > 0
    },
    getWarnText(row) {
      return moment().diff(moment(row.beginDate), 'days')
    },
    handleTabChange() {
      this.page.currentPage = 1
      this.loadData()
    },
    jumpToDetail(row) {
      if (row.type === 'Interview') {
        // 面试
        this.$router.push({
          path: '/todo/interviewDetail',
          query: { id: row.bizId }
        })
      } else if (row.type === 'Approve') {
        // 审批
        this.$router.push({
          path: '/approval/appr',
          query: {
            apprNo: row.bizId
          }
        })
      } else if (row.type === 'Recruitment') {
        // 招聘
        this.$router.push({
          path: '/personnel/recruit/specificPage',
          query: {
            id: row.bizId
          }
        })
      } else if (row.type === 'ResumeReview') {
        // 简历审核
        this.$router.push({
          path: '/todo/resumeReview',
          query: {
            id: row.bizId
          }
        })
      } else if (row.type === 'InterviewRegister') {
        // 面试登记表

        this.$router.push({
          path: '/personnel/candidate/registrationForm',
          query: {
            personId: row.bizId
          }
        })
        //
      } else if (row.type === 'Entry') {
        // 入职办理
        //
      } else if (row.type === 'EntryRegister') {
        // 入职登记表
        //
      } else if (row.type === 'LeaveList') {
        // 离职事项
        //
      } else if (row.type === 'Leave') {
        // 离职办理
        //
      }
    },
    handleReset() {
      this.query = { status: this.query.status }
      // this.loadData()
    },
    handleSubmit(params) {
      this.query = { ...this.query, ...params }
      this.loadData()
    },
    loadData() {
      this.loading = true
      getTodoList({
        pageNo: this.page.currentPage,
        pageSize: this.page.size,
        ...this.query
      })
        .then((res) => {
          this.page.total = res.totalNum
          this.tableData = res.data
        })
        .finally(() => {
          this.loading = false
        })
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
  align-items: center;
}
.refresh {
  color: #a0a8ae;
}
</style>

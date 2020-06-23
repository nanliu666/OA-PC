<template>
  <div>
    <page-header>
      <span slot="title">
        转正管理 (试用期员工共计<i>{{ numberofpersonnel }}</i>人)
      </span>
    </page-header>
    <basic-container>
      <common-table
        :loading="loading"
        style="width: 100%"
        :data="data"
        :page="page"
        :config="tableConfig"
        :columns="columns"
        @page-size-change="sizeChange"
        @current-page-change="currentPageChange"
      >
        <template slot="topMenu">
          <div class="flex-flow flex justify-content align-items ">
            <div>
              <search-popover
                ref="searchPopover"
                :require-options="searchConfig.requireOptions"
                :popover-options="searchConfig.popoverOptions"
                @submit="handleSubmit"
              />
            </div>
            <div class="edge">
              <el-button
                type="text"
                class="refresh"
                icon="icon-basics-refresh-outlined"
                size="medium"
                @click="getTableData"
              />
            </div>
          </div>
        </template>
        <template
          slot="name"
          slot-scope="{ row }"
        >
          <el-button
            type="text"
            size="medium"
            @click="jumpToDetail(row)"
          >
            {{ row.name }}
          </el-button>
        </template>

        <template
          slot="formalDate"
          slot-scope="{ row }"
        >
          <span>{{ row.formalDate }}</span>
          <span :class="{ isSelect: row.overdue }">{{ row.overdue == true ? '逾期' : '' }}</span>
        </template>
        <template
          slot="probations"
          slot-scope="{ row }"
        >
          {{ row.probation === 0 ? '无试用期' : `${row.probation}个月` }}
        </template>

        <template
          slot="status"
          slot-scope="{ row }"
        >
          {{ calStatus(row.status) }}
        </template>

        <template
          slot="approveStatus"
          slot-scope="{ row }"
        >
          {{ calApprNo(row.approveStatus) }}
        </template>

        <template
          slot="apprNo"
          slot-scope="{ row }"
        >
          <el-button
            size="medium"
            type="text"
            @click="jumpApproval(row.apprNo)"
          >
            {{ row.apprNo }}
          </el-button>
        </template>

        <template
          v-if="row.approveStatus === 'Cancel'"
          slot="handler"
          slot-scope="{ row }"
        >
          <el-button
            size="medium"
            type="text"
            @click="handleEditRole(row)"
          >
            调整试用期
          </el-button>
        </template>
      </common-table>
    </basic-container>
    <adjust-edit
      ref="adjustEdit"
      :visible.sync="createOrgDailog"
      @getTableData="getTableData"
    />
  </div>
</template>

<script>
import moment from 'moment'
import { getOrgTreeSimple } from '@/api/org/org'
import SearchPopover from '@/components/searchPopOver/index'
import { getStaffList } from '@/api/personnel/person'
import { getOrgJob } from '@/api/personnel/roster'
import AdjustEdit from './components/adjustEdit'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  name: 'Workerlist',
  components: {
    SearchPopover,
    AdjustEdit
  },
  data() {
    return {
      loading: false,
      searchConfig: {
        requireOptions: [
          {
            type: 'input',
            field: 'search',
            label: '',
            config: {
              placeholder: '姓名/工号'
            }
          }
        ],
        popoverOptions: [
          {
            type: 'treeSelect',
            field: 'orgs',
            label: '部门',
            data: '',
            config: {
              selectParams: {
                placeholder: '请输入内容',
                multiple: false
              },
              treeParams: {
                data: [],
                'check-strictly': true,
                'default-expand-all': false,
                'expand-on-click-node': false,
                clickParent: true,
                filterable: false,
                props: {
                  children: 'children',
                  label: 'orgName',
                  disabled: 'disabled',
                  value: 'orgId'
                }
              }
            }
          },
          {
            type: 'select',
            data: '',
            label: '职位',
            field: 'jobs',
            arrField: 'jobId',
            config: { optionLabel: 'jobName', optionValue: 'jobId' },
            options: [],
            loading: false,
            noMore: false
          },
          {
            type: 'dataPicker',
            data: '',
            label: '入职日期',
            field: 'beginEntryDate,endEntryDate',
            config: { type: 'daterange', 'range-separator': '至' }
          },
          {
            type: 'dataPicker',
            data: '',
            label: '转正日期',
            field: 'beginFormalDate,endFormalDate',
            config: { type: 'daterange', 'range-separator': '至' }
          },
          {
            type: 'select',
            field: 'probations',
            data: '',
            label: '试用期',
            options: [
              { label: '无试用期', value: 0 },
              { label: '一个月', value: 1 },
              { label: '两个月', value: 2 },
              { label: '三个月', value: 3 },
              { label: '四个月', value: 4 },
              { label: '五个月', value: 5 },
              { label: '六个月', value: 6 }
            ],
            config: {}
          }
        ]
      },
      createOrgDailog: false,
      numberofpersonnel: null,
      number: 0,
      row: {},
      data: [],
      tableConfig: {
        showHandler: true,
        showIndexColumn: false,
        enableMultiSelect: false,
        enablePagination: true
      },
      columns: [
        {
          label: '姓名',
          prop: 'name',
          slot: true
        },
        {
          label: '工号',
          prop: 'workNo'
        },
        {
          label: '员工状态',
          prop: 'status',
          slot: true
        },
        {
          label: '转正申请状态',
          prop: 'approveStatus',
          slot: true,
          width: '120'
        },
        {
          label: '审批编号',
          prop: 'apprNo',
          slot: true,
          minWidth: '120px'
        },
        {
          label: '部门',
          prop: 'orgName',
          minWidth: '120px'
        },
        {
          label: '职务',
          prop: 'jobName',
          minWidth: '120px'
        },
        {
          label: '入职时间',
          prop: 'entryDate',
          minWidth: '120px'
        },
        {
          label: '转正日期',
          prop: 'formalDate',
          slot: true,
          minWidth: '120px'
        },
        {
          label: '试用期',
          prop: 'probation',
          slot: true
        }
      ],
      page: { currentPage: 1, size: 10, total: 0 },
      pageConfig: {
        pageSizes: [10, 20, 30, 40, 50]
      }
    }
  },
  created() {
    this.getTableData()
    getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
      this.searchConfig.popoverOptions[0].config.treeParams.data.push(...res)
    })
    getOrgJob().then((res) => {
      this.searchConfig.popoverOptions[1].options = res
    })
  },
  methods: {
    getTableData(params = {}) {
      this.decorator(params)
      this.loading = true
      getStaffList(params).then((res) => {
        this.loading = false
        this.data = res.data.map((item) => ({ ...item, overdue: this.calBeyond(item.formalDate) }))
        this.page.total = res.totalNum
        this.numberofpersonnel = res.totalNum
      })
    },
    handleSubmit(params) {
      this.getTableData(params)
    },
    handleEditRole(row) {
      this.$refs.adjustEdit.init(row)
    },
    jumpToDetail(row) {
      this.$router.push('/personnel/detail/' + row.userId)
    },
    jumpApproval(apprNo) {
      this.$router.push({
        path: '/approval/appr/apprDetail',
        query: { formKey: 'UserFormalInfo', apprNo: apprNo }
      })
    },
    decorator(params) {
      params.pageNo = this.page.currentPage
      params.pageSize = this.page.size
      if (params.orgs) {
        params.orgs = [params.orgs]
      }

      if (params.jobs) {
        params.jobs = [params.jobs]
      }

      if (params.probations) {
        params.probations = [params.probations]
      }

      return params
    },

    currentPageChange(param) {
      this.page.currentPage = param
      this.getTableData()
    },
    sizeChange(pageSize) {
      this.page.size = pageSize
      this.getTableData()
    },
    calStatus(status) {
      return { Try: '试用期', Formal: '正式', Leaved: '已离职', WaitLeave: '待离职' }[status]
    },
    calApprNo(apprNo) {
      return { Approve: '审批中', Pass: '正式', Reject: '已拒绝', Cancel: '已撤回' }[apprNo]
    },
    calBeyond(formalDate) {
      let nowData = moment()
        .locale('zh-cn')
        .format('YYYY-MM-DD')
      let isOverdue = moment(nowData).isBefore(formalDate)
      if (!isOverdue) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .edge {
  position: absolute;
  right: 59px;
  .el-button--text {
    color: #a0a8ae;
  }
}

.isSelect {
  color: #f56c6c;
  margin-left: 6px;
  padding: 4px;
  background-color: #fff;
  border: 1px solid #f56c6c;
  border-color: #f56c6c;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
}

.refresh {
  color: #a0a8ae;
}
</style>

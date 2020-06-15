<template>
  <div>
    <common-table
      :loading="loading"
      :data="data"
      :page="page"
      :columns="columns"
      :page-config="pageConfig"
      :config="tableConfig"
      @current-page-change="currentPageChange"
      @page-size-change="sizeChange"
    >
      <template slot="topMenu">
        <div class="flex-flow flex justify-content align-items ">
          <div>
            <search-popover
              ref="searchPopover"
              :require-options="searchConfig.requireOptions"
              @submit="handleSubmit"
            />
          </div>
          <div class="resetEdge">
            <el-button
              icon="el-icon-refresh-right"
              size="medium"
              class="topBtn"
              type="text"
              @click="getTableData"
            />
          </div>
        </div>
      </template>
      <template
        slot="id"
        slot-scope="{ row }"
      >
        <el-button
          type="text"
          size="medium"
          @click="jumpToDetail(row)"
        >
          {{ row.id }}
        </el-button>
      </template>

      <template
        slot="status"
        slot-scope="{ row }"
      >
        {{ calcStataus(row.status) }}
      </template>
    </common-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getApprove } from '@/api/personnel/recruitment'
export default {
  name: 'DetailsList',
  components: {
    SearchPopover: () => import('@/components/searchPopOver/index')
  },
  data() {
    return {
      loading: false,
      searchConfig: {
        requireOptions: [
          {
            type: 'input',
            field: 'jobName',
            label: '',
            data: '',
            config: {
              placeholder: '职位名称'
            }
          }
        ]
      },
      data: [],
      columns: [
        {
          label: '审批编号',
          prop: 'id',
          slot: true
        },
        {
          label: '需求编号',
          prop: 'formId'
        },
        {
          label: '用人部门',
          prop: 'orgName'
        },
        {
          label: '职位',
          prop: 'jobName'
        },
        {
          label: '岗位',
          prop: 'positionName'
        },
        {
          label: '审批状态',
          prop: 'status',
          slot: true
        },
        {
          label: '申请时间',
          prop: 'applyTime'
        },
        {
          label: '完成时间',
          prop: 'completeTime'
        }
      ],
      tableConfig: {
        showIndexColumn: false,
        enableMultiSelect: false,
        enablePagination: true
      },
      params: {
        progress: 'Approved',
        userId: null
      },
      page: { currentPage: 1, size: 10, total: 0 },
      pageConfig: {
        pageSizes: [10, 20, 30, 40, 50]
      },
      createOrgDailog: false,
      WorkYear: [],
      getLevel: []
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    getTableData(params = {}) {
      this.decorator(params)
      this.loading = true
      getApprove(params).then((res) => {
        this.loading = false
        this.data = res.data
        this.page.total = res.totalPage
      })
    },
    decorator(params) {
      params.pageNo = this.page.currentPage
      params.pageSize = this.page.size
      params.userId = this.userId
      return params
    },

    handleSubmit(params) {
      this.getTableData(params)
    },
    jumpToDetail(row) {
      // 跳转审批详情
      this.$router.push({
        path: '/approval/appr/apprDetail',
        query: { formId: row.formId, formKey: row.formKey, apprNo: row.apprNo }
      })
    },

    currentPageChange(param) {
      this.page.currentPage = param
      this.getTableData()
    },
    sizeChange(pageSize) {
      this.page.size = pageSize
      this.getTableData()
    },
    calcStataus(status) {
      return { Approve: '审批中', Pass: '已通过', Reject: '已拒绝', Cancel: '已撤回' }[status]
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .resetEdge {
  position: absolute;
  right: 59px;
  .el-button--text {
    color: #a0a8ae;
  }
}
</style>

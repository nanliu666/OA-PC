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
              type="text"
              class="refresh"
              style="font-size: 16px"
              icon="icon-basics-refresh-outlined"
              size="medium"
              @click="getTableData"
            />

            <el-popover
              placement="bottom"
              width="40"
              trigger="click"
              style="margin:0 12px"
            >
              <div class="checkColumn">
                <el-checkbox-group
                  v-model="checkColumn"
                  @change="columnChange"
                >
                  <el-checkbox
                    v-for="item in originColumn"
                    :key="item.prop"
                    :label="item.prop"
                    :disabled="item.prop === 'apprNo' || item.prop === 'jobName'"
                    class="originColumn"
                  >
                    {{ item.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
              <el-button
                slot="reference"
                icon="icon-basics-setup-outlined"
                size="medium"
                class="topBtn"
                type="text"
              />
            </el-popover>
          </div>
        </div>
      </template>
      <template
        slot="apprNo"
        slot-scope="{ row }"
      >
        <el-button
          type="text"
          size="medium"
          @click="jumpToDetail(row)"
        >
          {{ row.apprNo }}
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
const column = [
  {
    label: '审批编号',
    prop: 'apprNo',
    slot: true,
    minWidth: '120px'
  },
  {
    label: '需求编号',
    prop: 'formId',
    minWidth: '120px'
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
    prop: 'positionName',
    minWidth: '120px'
  },
  {
    label: '审批状态',
    prop: 'status',
    slot: true
  },
  {
    label: '申请时间',
    prop: 'applyTime',
    minWidth: '120px'
  },
  {
    label: '完成时间',
    prop: 'completeTime',
    minWidth: '120px'
  }
]

export default {
  name: 'DetailsList',
  components: {
    SearchPopover: () => import('@/components/searchPopOver/index')
  },
  data() {
    return {
      checkColumn: [
        'apprNo',
        'formId',
        'orgName',
        'orgName',
        'jobName',
        'positionName',
        'status',
        'applyTime',
        'completeTime'
      ],
      loading: false,
      searchConfig: {
        requireOptions: [
          {
            type: 'input',
            field: 'jobName',
            label: '',
            data: '',
            config: {
              'suffix-icon': 'el-icon-search',
              placeholder: '职位名称'
            }
          }
        ]
      },
      data: [],
      columns: [
        {
          label: '审批编号',
          prop: 'apprNo',
          slot: true,
          minWidth: '120px'
        },
        {
          label: '需求编号',
          prop: 'formId',
          minWidth: '120px'
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
          prop: 'positionName',
          minWidth: '120px'
        },
        {
          label: '审批状态',
          prop: 'status',
          slot: true
        },
        {
          label: '申请时间',
          prop: 'applyTime',
          minWidth: '120px'
        },
        {
          label: '完成时间',
          prop: 'completeTime',
          minWidth: '120px'
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
      getLevel: [],
      originColumn: column
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },

  activated() {
    this.getTableData()
  },

  mounted() {
    this.getTableData()
  },
  methods: {
    getTableData(params = {}) {
      params.pageNo = this.page.currentPage
      params.pageSize = this.page.size
      params.userId = this.userId
      this.loading = true
      getApprove(params).then((res) => {
        this.loading = false
        this.data = res.data
        this.page.total = res.totalPage
      })
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
    },
    columnChange() {
      this.columns = column.filter((item) => {
        return this.checkColumn.indexOf(item.prop) > -1
      })
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

.refresh {
  color: #a0a8ae;
}
</style>

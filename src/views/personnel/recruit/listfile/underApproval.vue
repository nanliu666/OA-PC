<template>
  <div>
    <common-table
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
          @click="jumpToDetail(row.id)"
        >
          {{ row.id }}
        </el-button>
      </template>
    </common-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getApprove } from '@/api/personnel/recruitment'
import { validatenull } from '@/util/validate'
export default {
  name: 'DetailsList',
  components: {
    SearchPopover: () => import('@/components/searchPopOver/index')
  },
  data() {
    return {
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
          label: '需求编号',
          prop: 'id',
          slot: true
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
          prop: 'status'
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
      setElement: [
        {
          choice: 'WorkYear',
          target: 2
        },
        {
          choice: 'EmerType',
          target: 3
        }
      ],
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
    getTableData(params) {
      if (typeof params === 'undefined') params = this.params
      this.decorator(params)
      getApprove(params).then((res) => {
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
      let isEmpty = validatenull(params)
      if (isEmpty) {
        this.$message({
          showClose: true,
          message: '请注意 搜索条件不能为空',
          type: 'warning'
        })
      } else {
        this.decorator(params)
        getApprove(params).then(() => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      }
    },
    jumpToDetail(id) {
      // 跳转审批详情
      this.$router.push({
        path: '/personnel/recruit/specificPage',
        query: { id: id }
      })
    },

    currentPageChange(param) {
      this.page.currentPage = param
      this.getTableData()
    },
    sizeChange(pageSize) {
      this.page.size = pageSize
      this.getTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
.resetEdge {
  position: absolute;
  right: 62px;
  margin-top: 3px;
}
</style>

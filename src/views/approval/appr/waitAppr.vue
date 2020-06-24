<template>
  <div>
    <page-header title="待我审批" />
    <basic-container>
      <commonTable
        :data="tableList"
        :columns="tableColumns"
        :loading="loading"
        :config="tableConfig"
        :page="page"
        :page-config="pageConfig"
        @current-page-change="currentPageChange"
        @page-size-change="pageSizeChange"
      >
        <template slot="topMenu">
          <div class="search-box">
            <SearchPopover
              :require-options="requireOptions"
              @submit="handleSearch"
            />
            <div>
              <!-- <el-button
                size="medium"
                icon="el-icon-upload2"
              >
                导出
              </el-button> -->
              <i
                class="icon-basics-refresh-outlined  refresh"
                @click="getTableList"
              />
              <!-- <el-button
                size="medium"
                icon="el-icon-s-tools"
              /> -->
            </div>
          </div>
        </template>
        <!-- 编号列 -->
        <template
          slot="apprNo"
          slot-scope="{ row }"
        >
          <el-button
            type="text"
            @click="jumpApprDetail(row)"
          >
            {{ row.apprNo }}
          </el-button>
        </template>
        <!-- 状态列 -->
        <template
          slot="status"
          slot-scope="{ row }"
        >
          <el-tag v-if="row.status === 'Approve'">
            审批中
          </el-tag>
          <el-tag
            v-else-if="row.status === 'Pass'"
            type="success"
          >
            已通过
          </el-tag>
          <el-tag
            v-else-if="row.status === 'Reject'"
            type="danger"
          >
            已拒绝
          </el-tag>
          <el-tag
            v-else-if="row.status === 'Cancel'"
            type="warning"
          >
            已撤回
          </el-tag>
        </template>
      </commonTable>
    </basic-container>
  </div>
</template>

<script>
// 各种类型的审批
import { FormKeysCN } from '@/const/approve'
import { mapGetters } from 'vuex'
import SearchPopover from '@/components/searchPopOver/index'
import { createdWaitApprList } from '@/api/approval/approval'
export default {
  name: 'ApprByMe',
  components: {
    SearchPopover
  },
  data() {
    return {
      // 搜索框配置
      requireOptions: [
        {
          type: 'input',
          field: 'search',
          label: '',
          data: '',
          options: [],
          config: {
            placeholder: '审批编号，审批标题',
            'suffix-icon': 'el-icon-search'
          }
        }
      ],

      // 请求参数
      queryInfo: {
        pageNo: 1,
        pageSize: 10,
        search: '',
        formKey: '',
        orgId: '',
        beginApplyTime: '',
        endApplyTime: '',
        userId: ''
      },
      // 表格数据
      tableList: [],
      // 加载圈
      loading: false,
      // 表格列配置
      tableColumns: [
        {
          label: '审批编号',
          prop: 'apprNo',
          slot: true,
          width: 150
        },
        {
          label: '标题',
          prop: 'title'
        },
        {
          label: '审批类型',
          width: 120,
          formatter: (row) => {
            return FormKeysCN[row.formKey]
          }
        },
        {
          label: '申请部门',
          prop: 'orgName',
          width: 150
        },
        {
          label: '申请时间',
          prop: 'applyTime',
          sortable: true,
          width: 150
        },
        {
          label: '完成时间',
          prop: 'completeTime',
          sortable: true,
          width: 150
        },
        {
          label: '当前状态',
          prop: 'status',
          slot: true,
          width: 150
        },
        {
          label: '当前审批人',
          prop: 'approveName',
          width: 150
        }
      ],
      // 表格配置
      tableConfig: {
        showIndexColumn: false,
        enablePagination: true
      },
      // 分页
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      pageConfig: {
        pageSizes: [10, 20, 30, 40, 50]
      }
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.getTableList()
  },
  activated() {
    this.getTableList()
  },
  methods: {
    // 点击筛选
    handleSearch(params) {
      this.queryInfo = params
      this.getTableList()
    },
    // 获取表单数据
    async getTableList() {
      this.queryInfo.userId = this.userId
      this.loading = true
      let { totalNum, data } = await createdWaitApprList(this.queryInfo)
      this.tableList = data
      this.page.total = totalNum
      this.loading = false
      // console.log(this.tableList)
    },
    // 监听页码发生改变
    currentPageChange(param) {
      // 改变请求参数的页码
      this.queryInfo.pageNo = param
      this.getTableList()
    },
    // 监听页面条数的改变
    pageSizeChange(param) {
      this.queryInfo.pageSize = param
      this.getTableList()
    },
    // 跳去审批详情
    jumpApprDetail({ apprNo, formId, formKey }) {
      this.$router.push({
        path: '/approval/appr/apprDetail',
        query: { apprNo, formId, formKey }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 搜索栏
.search-box {
  display: flex;
  justify-content: space-between;
}
.refresh {
  color: #a0a8ae;
  font-size: 16px;
  line-height: 40px;
  cursor: pointer;
}
</style>

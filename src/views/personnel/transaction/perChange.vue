<template>
  <div class="PerChange">
    <page-header title="人事异动" />
    <basic-container block>
      <!-- table表格 -->
      <commonTable
        :data="tableData"
        :columns="tableColumns"
        :loading="loading"
        :config="tableConfig"
        :page="page"
        :page-config="pageConfig"
        @current-page-change="currentPageChange"
        @page-size-change="pageSizeChange"
      >
        <template slot="topMenu">
          <!-- 搜素框 -->
          <div class="search-box">
            <SearchPopover
              :require-options="requireOptions"
              :popover-options="popoverOptions"
              @submit="handleSubmit"
            />
            <div>
              <!-- <el-button icon="el-icon-upload2" size="medium">导出</el-button> -->
              <i
                class="icon-basics-refresh-outlined  refresh"
                @click="getTableList()"
              />
            </div>
          </div>
        </template>
        <!-- 选择导出 -->
        <template
          slot="multiSelectMenu"
          slot-scope="{}"
        >
          <!-- <span @click="handleSelectionClick(selection)">
          <i class="el-icon-upload2"></i>批量导出
          </span>-->
        </template>

        <!-- 姓名列 -->
        <template
          slot="name"
          slot-scope="{ row }"
        >
          <el-button
            type="text"
            size="medium"
            @click="jumpInfo(row.userId)"
          >
            {{ row.name }}
          </el-button>
        </template>
        <!-- 审批编码 -->
        <template
          slot="apprNo"
          slot-scope="{ row }"
        >
          <el-button
            type="text"
            size="medium"
            @click="goApprDetail(row.apprNo)"
          >
            {{ row.apprNo }}
          </el-button>
        </template>
        <!-- 当前审批状态 -->
        <template
          slot="approveStatus"
          slot-scope="{ row }"
        >
          <el-tag v-if="row.approveStatus === 'Approve'">
            审批中
          </el-tag>
          <el-tag
            v-else-if="row.approveStatus === 'Pass'"
            type="success"
          >
            已通过
          </el-tag>
          <el-tag
            v-else-if="row.approveStatus === 'Reject'"
            type="danger"
          >
            已拒绝
          </el-tag>
          <el-tag
            v-else-if="row.approveStatus === 'Cancel'"
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
import SearchPopover from '@/components/searchPopOver/index'
import { getChangeList } from '@/api/personnel/transction.js'
import pageHeader from '@/components/page-header/pageHeader.vue'
export default {
  name: 'PerTransaction',
  components: {
    SearchPopover,
    pageHeader
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
            placeholder: '请输入姓名/工号',
            'suffix-icon': 'el-icon-search'
          }
        }
      ],
      popoverOptions: [
        //   异动类型
        {
          type: 'select',
          field: 'types',
          label: '异动类型',
          data: '',
          options: [
            {
              value: 'Position',
              label: '调岗'
            },
            {
              value: 'Up',
              label: '晋升'
            },
            {
              value: 'Down',
              label: '降级'
            }
          ],
          config: {
            multiple: true
          }
        },
        // 异动原因
        {
          type: 'select',
          field: 'reasons',
          label: '异动原因',
          data: '',
          options: [],
          config: {
            group: true,
            multiple: true
          }
        },
        // 生效时间
        {
          type: 'dataPicker',
          field: 'beginEffectDate,endEffectDate',
          label: '生效时间',
          data: '',
          options: [],
          config: {
            type: 'daterange',
            'range-separator': '至'
          }
        }
      ],
      // tablecolumns
      tableColumns: [
        {
          label: '姓名',
          align: 'center',
          prop: 'name',
          width: '80px',
          slot: true
        },
        {
          label: '审批编码',
          align: 'center',
          prop: 'apprNo',
          width: '130px',
          slot: true
        },
        {
          label: '工号',
          align: 'center',
          prop: 'workNo',
          width: '80px'
        },
        {
          label: '原公司/现公司',
          width: '200px',
          align: 'center',
          formatter(row) {
            return `${row.companyName ? row.companyName : ' - '}/${
              row.newCompanyName ? row.newCompanyName : ' - '
            }`
          }
        },
        {
          label: '原部门职位/现部门职位',
          align: 'center',
          width: '250px',
          formatter(row) {
            return `${row.orgName ? row.orgName : '-'}-${row.jobName ? row.jobName : '-'}/${
              row.newOrgName ? row.newOrgName : '-'
            }-${row.newJobName ? row.newJobName : '-'}`
          }
        },
        {
          label: '原岗位/现岗位',
          align: 'center',
          width: '150px',
          formatter(row) {
            return `${row.positionName ? row.positionName : ' - '}/${
              row.newPositionName ? row.newPositionName : ' - '
            }`
          }
        },
        {
          label: '生效日期',
          align: 'center',
          prop: 'effectDate',
          width: '100px'
        },
        {
          label: '员工状态',
          align: 'center',
          formatter(row) {
            if (row.status === 'Try') return '试用期'
            if (row.status === 'Formal') return '正式'
            if (row.status === 'Leaved') return '已离职'
            if (row.status === 'WaitLeave') return '待离职'
          }
        },
        {
          label: '手机号码',
          align: 'center',
          prop: 'phonenum',
          width: '150px'
        },
        {
          label: '异动类型',
          align: 'center',
          formatter(row) {
            if (row.type === 'Position') return '调岗'
            if (row.type === 'Up') return '晋升'
            if (row.type === 'Down') return '降级'
          }
        },
        {
          label: '审批状态',
          align: 'center',
          prop: 'approveStatus',
          slot: true
        },
        {
          label: '备注',
          align: 'center',
          prop: 'remark',
          width: '200px'
        }
      ],
      //   表格数据
      tableData: [],
      //   加载
      loading: false,
      //   table设置
      tableConfig: {
        showIndexColumn: false,
        enablePagination: true
      },
      //   分页器配置
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      pageConfig: {
        pageSizes: [10, 20, 30, 40, 50]
      },
      //请求参数
      paramsInfo: {
        pageNo: '1',
        pageSize: '10',
        search: '',
        types: [],
        reasons: [],
        beginEffectDate: '',
        endEffectDate: ''
      }
    }
  },
  created() {
    this.init()
  },
  activated() {
    this.init()
  },
  methods: {
    init() {
      this.getTableList()
      this.getReasonList()
    },
    // 获取table表格数据
    getTableList() {
      this.loading = true
      getChangeList(this.paramsInfo)
        .then(({ data, totalNum }) => {
          this.tableData = data
          this.page.total = totalNum
          this.loading = false
        })
        .catch(() => {})
    },
    // 监听页码发生改变
    currentPageChange(param) {
      // 改变请求参数的页码
      this.paramsInfo.pageNo = param
      this.getTableList()
    },
    // 监听页面条数的改变
    pageSizeChange(param) {
      this.paramsInfo.pageSize = param
      this.getTableList()
    },
    // 监听筛选事件
    handleSubmit(params) {
      this.paramsInfo = params
      this.getTableList()
    },

    // 批量导出
    handleSelectionClick() {},
    // 跳转到员工信息页
    jumpInfo(userId) {
      this.$router.push('/personnel/detail/' + userId)
    },
    // 获取异动原因
    getReasonList() {
      this.$store.dispatch('CommonDict', 'ChangeReason').then((res) => {
        this.handelReason(res)
      })
    },
    // 处理异动原因select框数据
    handelReason(data) {
      let targetArr = [
        {
          label: '调岗',
          options: []
        },
        {
          label: '晋升',
          options: []
        },
        {
          label: '降级',
          options: []
        }
      ]
      data.forEach((item) => {
        if (item.dictKey.indexOf('Adjust') != '-1') {
          targetArr[0].options.push({
            value: item.dictValue,
            label: item.dictValue
          })
        } else if (item.dictKey.indexOf('Promotion') != '-1') {
          targetArr[1].options.push({
            value: item.dictValue,
            label: item.dictValue
          })
        } else if (item.dictKey.indexOf('Downgrade') != '-1') {
          targetArr[2].options.push({
            value: item.dictValue,
            label: item.dictValue
          })
        }
      })
      this.popoverOptions[1].options = targetArr
    },
    // 跳去审批详情
    goApprDetail(apprNo) {
      this.$router.push({
        path: '/apprProcess/apprDetail',
        query: {
          apprNo,
          formKey: 'UserChangeInfo'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
.PerChange {
  height: 100%;
  .basic-container--block {
    min-height: calc(100% - 92px);
    height: 0;
  }
}
</style>

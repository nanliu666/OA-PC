<template>
  <div>
    <page-header title="离职管理" />
    <basic-container>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <!-- 待离职 -->
        <el-tab-pane
          label="待离职"
          name="first"
        >
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
              <!-- 搜素框 -->
              <div class="search-box">
                <SearchPopover
                  :require-options="requireOptions"
                  :popover-options="popoverOptions"
                  @submit="handleSubmit"
                />
                <div>
                  <!-- <el-button icon="el-icon-upload2" size="medium">导出</el-button> -->
                  <el-button
                    icon="el-icon-refresh"
                    size="medium"
                    @click="getDataList()"
                  />
                </div>
              </div>
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
            <!-- 操作列 -->
            <template
              slot="handler"
              slot-scope="{ row }"
            >
              <el-button
                size="medium"
                type="text"
                @click="handelConfirmLeave(row)"
              >
                确认离职
              </el-button>
              <el-button
                size="medium"
                type="text"
                @click="showChangeDialog(row)"
              >
                调整离职信息
              </el-button>
              <el-button
                size="medium"
                type="text"
                @click="handelGiveLeave(row.userId)"
              >
                放弃离职
              </el-button>
            </template>
          </commonTable>
        </el-tab-pane>
        <!-- 已离职 -->
        <el-tab-pane
          label="已离职"
          name="second"
        />
      </el-tabs>
    </basic-container>
    <!-- 调整离职信息弹框 -->
    <el-dialog
      title="调整离职信息"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
    >
      <el-row
        type="flex"
        justify="center"
      >
        <el-col :span="24">
          <el-form
            label-position="top"
            label-width="80px"
            :model="changeParams"
            :rules="changeRules"
          >
            <el-row
              type="flex"
              justify="center"
            >
              <el-col>
                <el-form-item label="已选择">
                  <span>{{ changeParams.name }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row
              type="flex"
              justify="center"
            >
              <el-col>
                <el-form-item
                  label="离职日期"
                  prop="lastDate"
                >
                  <el-date-picker
                    v-model="changeParams.lastDate"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="medium"
          @click="dialogVisible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          :disabled="isDisabled"
          size="medium"
          @click="handelChangeLeave"
        >保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { flatTree } from '@/util/util.js'
import { getOrganizationTree } from '@/api/organize/grade.js'
import SearchPopover from '@/components/searchPopOver/index'
import { getLeaveList, getLeaveInfo, giveupLeave, changeLeaveInfo } from '@/api/leave/leave'
import { getJobInfo } from '@/api/personalInfo.js'
export default {
  components: {
    SearchPopover
  },
  data() {
    return {
      // 控制显示待离职/已离职
      activeName: 'first',
      // params参数
      paramsInfo: {
        pageNo: 1,
        pageSize: 10,
        status: 'WaitLeave',
        search: '',
        orgs: [],
        jobs: [],
        beginLeaveDate: '',
        endLeaveDate: '',
        leaveReasons: []
      },
      // 表格List
      tableList: [],
      loading: false,
      // 表格列配置
      tableColumns: [
        {
          label: '序号',
          type: 'index'
        },
        {
          label: '工号',
          prop: 'workNo',
          width: '80px'
        },
        {
          label: '姓名',
          prop: 'name',
          width: '80px',
          slot: true
        },
        {
          label: '部门',
          prop: 'orgName',
          width: '80px'
        },
        {
          label: '职位',
          prop: 'jobName',
          width: '80px'
        },
        {
          label: '岗位',
          prop: 'positionName',
          width: '80px'
        },
        {
          label: '员工状态',
          width: '80px',
          formatter(row) {
            if (row.status === 'WaitLeave') {
              return '待离职'
            }
          }
        },
        {
          label: '手机号码',
          prop: 'phonenum',
          width: '80px'
        },
        {
          label: '工作性质',
          width: '80px',
          formatter(row) {
            if (row.workProperty === 'FullTime') {
              return '全职'
            } else if (row.workProperty === 'Trainee') {
              return '实习生'
            } else if (row.workProperty === 'PartTime') {
              return '兼职'
            } else if (row.workProperty === 'Labor') {
              return '劳务派遣'
            } else if (row.workProperty === 'Retirement') {
              return '退休返聘'
            } else if (row.workProperty === 'LaborOutsourcing') {
              return '劳务外包'
            }
          }
        },
        {
          label: '入职日期',
          prop: 'entryDate',
          width: '120px'
        },
        {
          label: '离职日期',
          prop: 'lastDate',
          width: '120px'
        },
        {
          label: '离职原因',
          width: '80px',
          formatter(row) {
            if (row.leaveReason === 'A01') {
              return '家庭原因'
            } else if (row.leaveReason === 'A02') {
              return '身体原因'
            } else if (row.leaveReason === 'A03') {
              return '薪资原因'
            } else if (row.leaveReason === 'A04') {
              return '交通不便'
            } else if (row.leaveReason === 'A05') {
              return '工作压力'
            } else if (row.leaveReason === 'A06') {
              return '管理问题'
            } else if (row.leaveReason === 'A07') {
              return '无晋升机会'
            } else if (row.leaveReason === 'A08') {
              return '职业规划'
            } else if (row.leaveReason === 'A09') {
              return '合同到期放弃续签'
            } else if (row.leaveReason === 'A10') {
              return '其他个人原因'
            } else if (row.leaveReason === 'B01') {
              return '试用期内辞退'
            } else if (row.leaveReason === 'B02') {
              return '违反公司条例'
            } else if (row.leaveReason === 'B03') {
              return '组织调整/裁员'
            } else if (row.leaveReason === 'B04') {
              return '绩效不达标辞退'
            } else if (row.leaveReason === 'B05') {
              return '合同到期不续签'
            } else if (row.leaveReason === 'B06') {
              return '其他原因被动离职'
            }
          }
        },
        {
          label: '离职申请时间',
          prop: 'applyDate',
          width: '120px'
        },
        {
          label: '离职原因说明',
          prop: 'leaveRemark'
        }
      ],
      // 表格配置
      tableConfig: {
        showIndexColumn: false,
        enableMultiSelect: true,
        enablePagination: true,
        uniqueKey: 'userId',
        showHandler: true,
        handlerColumn: { minWidth: 300 }
      },
      // 搜索框配置
      requireOptions: [
        {
          type: 'input',
          field: 'search',
          label: '',
          data: '',
          options: [],
          config: { placeholder: '姓名/工号', 'suffix-icon': 'el-icon-search' }
        }
      ],
      popoverOptions: [
        //   部门
        {
          type: 'select',
          field: 'orgs',
          label: '部门',
          data: '',
          options: [],
          config: { multiple: true }
        },
        // 职位
        {
          type: 'select',
          field: 'jobs',
          label: '职位',
          data: '',
          options: [],
          config: { multiple: true }
        },
        // 离职日期
        {
          type: 'dataPicker',
          field: 'beginEffectDate,endEffectDate',
          label: '离职日期',
          data: '',
          options: [],
          config: { type: 'daterange', 'range-separator': '至' }
        },
        // 离职原因
        {
          type: 'select',
          field: 'leaveReasons',
          label: '离职原因',
          data: '',
          options: [],
          config: { multiple: true }
        }
      ],
      // 分页器配置
      page: { currentPage: 1, size: 10, total: 0 },
      pageConfig: {
        pageSizes: [10, 20, 30, 40, 50]
      },
      // 离职原因字典组
      LeaveReasonList: [],
      // 控制调整离职信息弹框
      dialogVisible: false,
      // 调整离职信息提交参数
      changeParams: {
        id: '',
        lastDate: '',
        reason: '',
        remark: '',
        name: ''
      },
      // 调整信息确认框校验规则
      // rules 校验规则
      changeRules: {
        lastDate: [{ required: true, message: '请选择最后工作日', trigger: 'blur' }]
      }
    }
  },
  computed: {
    // 调整离职信息保全按钮是否禁用
    isDisabled() {
      let changeParams = JSON.parse(JSON.stringify(this.changeParams))
      if (changeParams.lastDate === this.changeParams.lastDate) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    this.getLeaveReason()
    this.getDataList()
    this.getOrgNameList()
    this.getJobList()
  },
  methods: {
    //   监听切换tag
    // handleClick(tab, event) {},
    // 获取待离职list数据
    async getDataList() {
      this.loading = false
      let { data, totalNum } = await getLeaveList(this.paramsInfo)
      await this.$store.dispatch('CommonDict', 'WorkProperty')

      this.tableList = data
      this.page.total = totalNum
      this.loading = false
    },
    // 监听页码发生改变
    currentPageChange(param) {
      // 改变请求参数的页码
      this.paramsInfo.pageNo = param
      this.getDataList()
    },
    // 监听页面条数的改变
    pageSizeChange(param) {
      this.paramsInfo.pageSize = param
      this.getDataList()
    },
    // 获取离职原因选择组
    getLeaveReason() {
      //
      this.$store.dispatch('CommonDict', 'LeaveReason').then((res) => {
        // 离职原因下拉选择框

        let selectLeaveReason = []
        res.forEach((item) => {
          selectLeaveReason.push({
            label: item.dictValue,
            value: item.dictKey
          })
        })
        this.popoverOptions[3].options = selectLeaveReason
      })
    },
    // 跳转到员工信息页
    jumpInfo(userId) {
      this.$router.push('/personnel/detail/' + userId)
    },
    // 点击确认离职
    handelConfirmLeave() {
      this.$router.push({
        path: '/personnel/leave/confirmLeave',
        // query: { userId: params.userId }
        query: { userId: '1264805583983218689' }
      })
    },
    // 放弃离职信息
    async handelGiveLeave(userId) {
      let { id } = await getLeaveInfo(userId)
      let result = await this.$confirm(
        '放弃离职后员工将恢复到正常在职状态，您确认要放弃离职吗？',
        '确认放弃离职？',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((error) => error)
      // cancel点击取消
      if (result !== 'confirm') {
        return
      }
      // confirm 点击确定
      await giveupLeave(id).catch((error) => error)
      this.$message.success('放弃离职成功')
    },
    // 调整离职信息
    async showChangeDialog(params) {
      let { userId, name } = params
      let { id, lastDate, remark, reason } = await getLeaveInfo(userId)
      this.changeParams = { id, lastDate, remark, reason, name }
      this.dialogVisible = true
    },
    // 调整离职信息
    async handelChangeLeave() {
      await changeLeaveInfo(this.changeParams)
      this.$message.success('保存成功', 2000)
      this.dialogVisible = false
    },
    // 获取部门筛选选项
    getOrgNameList() {
      getOrganizationTree({ parentOrgId: '0' })
        // 将组织树状结构转为一维数组，取orgType: "Department"
        .then((res) => {
          let options = []
          flatTree(res).forEach((item) => {
            if (item.orgType === 'Department') {
              options.push({
                label: item.orgName,
                value: item.orgId
              })
            }
          })
          // 赋值给搜索框配置的popoverOptions部门
          this.popoverOptions[0].options = options
        })
        .catch()
    },
    // 获取职位筛选选项
    getJobList() {
      getJobInfo({}).then((res) => {
        let options = []
        res.forEach((item) => {
          options.push({
            label: item.jobName,
            value: item.jobId
          })
          return
        })
        this.popoverOptions[1].options = options
      })
    },
    // 刷选离职员工
    handleSubmit(params) {
      this.getDataList({ ...params, status: 'WaitLeave' })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
}
</style>

<template>
  <div class="LeaveList">
    <page-header title="离职管理" />
    <basic-container block>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <!-- 待离职 -->
        <el-tab-pane
          label="待离职"
          name="WaitLeave"
        />
        <!-- 已离职 -->
        <el-tab-pane
          label="已离职"
          name="Leaved"
        />
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
          <!-- 搜素框 -->
          |
          <template slot="topMenu">
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
          <!-- 操作列 -->
          <div
            slot="handler"
            slot-scope="{ row }"
            class="handel-column"
          >
            <el-button
              v-if="isWaitLeave && row.approveStatus === 'Pass' && !row.leaveDate"
              size="medium"
              type="text"
              @click="handelConfirmLeave(row)"
            >
              确认离职
            </el-button>
            <el-button
              v-if="row.leaveDate"
              size="medium"
              type="text"
              @click="handelGetLeaveCert(row.userId)"
            >
              开具离职证明
            </el-button>
            <!-- v-if="isWaitLeave && !row.leaveDate" -->
            <el-button
              v-if="isWaitLeave && !row.leaveDate"
              size="medium"
              type="text"
              @click="handelChange(row)"
            >
              调整离职信息
            </el-button>

            <el-dropdown
              v-if="isWaitLeave && !row.leaveDate"
              @command="handleCommand($event, row)"
            >
              <i
                class="el-icon-arrow-down iconfont icon-basics-more-outlined"
                style="cursor: pointer;"
              />

              <el-dropdown-menu slot="dropdown">
                <!-- v-if="!row.leaveDate" -->
                <el-dropdown-item command="giveLeave">
                  放弃离职
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown v-else>
              <i class="seat" />
            </el-dropdown>
          </div>
          <!-- 离职日期 -->
          <template
            slot="leaveDate"
            slot-scope="{ row }"
          >
            <div>
              <!-- leaveDate实际离职日期  lastDate预计离职日期 -->
              <span>{{ row.leaveDate || row.lastDate }}</span>
              <span v-if="row.leaveDate">
                <el-tag
                  type="info"
                  size="small"
                  class="isConfirm"
                >已确认</el-tag>
              </span>
            </div>
          </template>
        </commonTable>
      </el-tabs>
    </basic-container>
    <!-- 调整离职信息弹框 -->
    <leaveDialog
      ref="leaveDialogRef"
      :refresh="getDataList"
      :leave-reason="leaveReason"
    />
  </div>
</template>

<script>
// 树结构转一维数组
import { flatTree } from '@/util/util.js'
import { getOrganizationTree } from '@/api/organize/grade.js'
import SearchPopover from '@/components/searchPopOver/index'
import { getLeaveList, giveupLeave } from '@/api/leave/leave'
import { getJobInfo } from '@/api/personalInfo.js'

import leaveDialog from './components/leaveDialog'
export default {
  components: {
    SearchPopover,
    leaveDialog
  },
  data() {
    return {
      // 控制显示待离职/已离职
      activeName: 'WaitLeave',
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
          label: '部门',
          align: 'center',
          prop: 'orgName',
          width: '100px'
        },
        {
          label: '职位',
          align: 'center',
          prop: 'jobName',
          width: '100px'
        },
        {
          label: '岗位',
          align: 'center',
          prop: 'positionName',
          width: '120px'
        },
        {
          label: '员工状态',
          align: 'center',
          width: '80px',
          formatter(row) {
            if (row.status === 'WaitLeave') {
              return '待离职'
            } else if (row.status === 'Leaved') {
              return '已离职'
            }
          }
        },
        {
          label: '手机号码',
          prop: 'phonenum',
          align: 'center',
          width: '110px'
        },
        {
          label: '工作性质',
          align: 'center',
          width: '80px',
          formatter: (row) => {
            let dictValue = ''
            this.workPropertyList.forEach((item) => {
              if (item.dictKey === row.workProperty) {
                return (dictValue = item.dictValue)
              }
            })
            return dictValue
          }
        },
        {
          label: '入职日期',
          align: 'center',
          prop: 'entryDate',
          width: '120px'
        },
        {
          label: '离职日期',
          prop: 'leaveDate',
          slot: true,
          width: '150px'
        },
        {
          label: '离职原因',
          align: 'center',
          width: '120px',
          formatter: (row) => {
            let dictValue = ''
            this.leaveReason.forEach((item) => {
              if (item.dictKey === row.leaveReason) {
                return (dictValue = item.dictValue)
              }
            })
            return dictValue
          }
        },
        {
          label: '审批状态',
          align: 'center',
          prop: 'approveStatus',
          slot: true
        },
        {
          label: '离职申请时间',
          align: 'center',
          prop: 'applyDate',
          width: '120px'
        },
        {
          label: '离职原因说明',
          align: 'center',
          prop: 'leaveRemark',
          width: '120px'
        }
      ],
      // 表格配置
      tableConfig: {
        showIndexColumn: false,
        enablePagination: true,
        showHandler: true,
        handlerColumn: {
          minWidth: 250
        }
      },
      // 搜索框配置
      requireOptions: [
        {
          type: 'input',
          field: 'search',
          label: '',
          data: '',
          options: [],
          config: {
            placeholder: '姓名/工号',
            'suffix-icon': 'el-icon-search'
          }
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
          config: {
            multiple: true
          }
        },
        // 职位
        {
          type: 'select',
          field: 'jobs',
          label: '职位',
          data: '',
          options: [],
          config: {
            multiple: true
          }
        },
        // 离职日期
        {
          type: 'dataPicker',
          field: 'beginLeaveDate,endLeaveDate',
          label: '离职日期',
          data: '',
          options: [],
          config: {
            type: 'daterange',
            'range-separator': '至'
          }
        },
        // 离职原因
        {
          type: 'select',
          field: 'leaveReasons',
          label: '离职原因',
          data: '',
          options: [],
          config: {
            multiple: true
          }
        }
      ],
      // 分页器配置
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      pageConfig: {
        pageSizes: [10, 20, 30, 40, 50]
      },

      // 工作性质字典组
      workPropertyList: [],
      // 离职原因
      leaveReason: []
    }
  },
  computed: {
    isWaitLeave() {
      if (this.activeName === 'WaitLeave') return true
      return false
    }
  },

  async created() {
    await this.getCommonDict()
    this.getDataList()
    this.getOrgNameList()
    this.getJobList()
  },
  async activated() {
    await this.getCommonDict()
    this.getDataList()
    this.getOrgNameList()
    this.getJobList()
  },
  methods: {
    //监听切换tag
    handleClick() {
      // WaitLeave 为待离职  Leaved 为已离职
      if (this.activeName == 'WaitLeave') {
        this.paramsInfo.status = 'WaitLeave'
        // 修改表格操作列的宽度
        this.tableConfig.handlerColumn.minWidth = 250
        this.getDataList()
      } else {
        this.paramsInfo.status = 'Leaved'
        this.tableConfig.handlerColumn.minWidth = 150
        this.getDataList()
      }
    },
    // 获取待离职list数据
    async getDataList() {
      this.loading = true
      let { data, totalNum } = await getLeaveList(this.paramsInfo)
      // await this.$store.dispatch('CommonDict', 'WorkProperty')
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

    // 获取部门筛选选项
    getOrgNameList() {
      getOrganizationTree({
        parentOrgId: '0'
      })
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
    // 获取相关字典组
    async getCommonDict() {
      // 离职原因
      let resReason = await this.$store.dispatch('CommonDict', 'LeaveReason')

      let selectLeaveReason = []
      resReason.forEach((item) => {
        selectLeaveReason.push({
          label: item.dictValue,
          value: item.dictKey
        })
      })
      this.popoverOptions[3].options = selectLeaveReason
      this.leaveReason = resReason
      // 工作性质
      let resworkProperty = await this.$store.dispatch('CommonDict', 'workProperty')
      this.workPropertyList = resworkProperty
    },
    // 刷选离职员工
    handleSubmit(params) {
      this.paramsInfo = {
        ...params,
        status: this.paramsInfo.status
      }
      this.getDataList()
    },

    // 跳转到员工信息页
    jumpInfo(userId) {
      this.$router.push('/personnel/detail/' + userId)
    },
    // 点击放弃离职
    handleCommand(command, { userId }) {
      // 点击离职
      if (command === 'giveLeave') {
        this.handelGiveLeave(userId)
      }
    },
    // 放弃离职api
    async handelGiveLeave(userId) {
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
      await giveupLeave({
        userId
      })
      // // 提示放弃离职 刷新页面
      this.$message.success('放弃离职成功')
      this.getDataList()
    },

    // 点击确认离职
    handelConfirmLeave(params) {
      this.$router.push({
        path: '/personnel/leave/confirmLeave',
        query: {
          userId: params.userId
        }
      })
    },

    // 开具离职证明
    handelGetLeaveCert(userId) {
      this.$router.push({
        path: '/personnel/leave/proveLeave',
        query: {
          userId
        }
      })
    },
    // 跳去审批详情
    goApprDetail(apprNo) {
      this.$router.push({
        path: '/approval/appr/apprDetail',
        query: {
          apprNo,
          formKey: 'UserLeaveInfo'
        }
      })
    },
    // 点击调整按钮
    handelChange(params) {
      this.$refs.leaveDialogRef.showChangeDialog(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
}

.confirm-form-wrap {
  .el-row {
    /deep/.el-form-item__label {
      padding-bottom: 0;
    }
  }
}

// 已确认按钮
.isConfirm {
  margin-left: 10px;
}

.refresh {
  color: #a0a8ae;
  font-size: 16px;
  line-height: 40px;
  cursor: pointer;
}

// 操作列
/deep/ .handel-column {
  display: flex;
  justify-content: flex-end;
  > .el-button--text {
    text-align: center;
    padding: 0 8px;
    margin-left: 0px;
    position: relative;
    &::after {
      content: '';
      width: 1px;
      height: 10px;
      background-color: #e3e7e9;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }
}
.LeaveList {
  height: 100%;
  .basic-container--block {
    min-height: calc(100% - 92px);
    height: 0;
  }
}
.seat {
  display: inline-block;
  width: 16px;
}
</style>

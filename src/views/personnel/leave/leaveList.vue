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
                <el-button
                  icon="icon-basics-refresh-outlined"
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
          <template
            slot="handler"
            slot-scope="{ row }"
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
            <el-button
              v-if="isWaitLeave"
              size="medium"
              type="text"
              @click="showChangeDialog(row)"
            >
              调整离职信息
            </el-button>
            <el-dropdown
              v-if="isWaitLeave && row.approveStatus !== 'Pass'"
              @command="handleCommand($event, row.userId)"
            >
              <el-button
                type="text"
                style="margin-left: 10px"
              >
                <i class="el-icon-arrow-down el-icon-more" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="giveLeave">
                  放弃离职
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <!-- 离职日期 -->
          <template
            slot="leaveDate"
            slot-scope="{ row }"
          >
            <div>
              <span>{{ row.leaveDate }}</span>
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
    <el-dialog
      title="调整离职信息"
      :visible.sync="changeLeaveVisible"
      width="600px"
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
            class="confirm-form-wrap"
          >
            <el-row
              type="flex"
              justify="center"
              class="row-item"
            >
              <el-col :span="14">
                <el-form-item
                  label="已选择"
                  style="width:80%"
                >
                  <span class="choose-leave-name">{{ changeParams.name }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row
              type="flex"
              justify="center"
              class="row-item"
            >
              <el-col :span="14">
                <el-form-item
                  label="离职日期"
                  prop="lastDate"
                >
                  <el-date-picker
                    v-model="changeParams.lastDate"
                    type="date"
                    placeholder="选择日期"
                    style="width:100%"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row
              type="flex"
              justify="center"
              class="row-item"
            >
              <el-col :span="14">
                <el-form-item label="离职原因">
                  <el-select
                    v-model="changeParams.reason"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in leaveReason"
                      :key="item.id"
                      :label="item.dictValue"
                      :value="item.dictKey"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row
              type="flex"
              justify="center"
              class="row-item"
            >
              <el-col :span="14">
                <el-form-item label="离职原因说明">
                  <el-input
                    v-model="changeParams.remark"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    style="width:100%"
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
          @click="changeLeaveVisible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          :disabled="isDisabled"
          size="medium"
          :loading="btnLoading"
          @click="handelChangeLeave"
        >保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 树结构转一维数组
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
          align: 'center',
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
        // 选择列先去除
        // enableMultiSelect: true,
        enablePagination: true,
        uniqueKey: 'userId',
        showHandler: true,
        handlerColumn: {
          minWidth: 220
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

      // 控制调整离职信息弹框
      changeLeaveVisible: false,
      // 调整用户离职信息提交参数
      changeParams: {
        id: '',
        lastDate: '',
        reason: '',
        remark: '',
        name: ''
      },
      // 用户信息最开始数据
      oldLeaveInfo: {
        id: '',
        lastDate: '',
        reason: '',
        remark: '',
        name: ''
      },
      // 调整信息确认框校验规则
      changeRules: {
        lastDate: [
          {
            required: true,
            message: '请选择最后工作日',
            trigger: 'change'
          }
        ]
      },
      // 工作性质字典组
      workPropertyList: [],
      // 离职原因
      leaveReason: [],
      btnLoading: false
    }
  },
  computed: {
    isWaitLeave() {
      if (this.activeName === 'WaitLeave') return true
      return false
    },
    // 控制保存按钮是否点亮
    isDisabled() {
      return (
        this.changeParams.lastDate === this.oldLeaveInfo.lastDate &&
        this.changeParams.reason === this.oldLeaveInfo.reason &&
        this.changeParams.remark === this.oldLeaveInfo.remark
      )
    }
  },

  async created() {
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
        this.tableConfig.handlerColumn.minWidth = 300
        this.getDataList()
      } else {
        this.paramsInfo.status = 'Leaved'
        this.tableConfig.handlerColumn.minWidth = 100
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
    handleCommand(command, userId) {
      // 点击离职
      if (command === 'giveLeave') {
        this.handelGiveLeave(userId)
      }
    },
    // 放弃离职api
    async handelGiveLeave(userId) {
      // 获取离职ID
      let { id } = await getLeaveInfo({
        userId
      })
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
        id
      })
      // // 提示放弃离职 刷新页面
      this.$message.success('放弃离职成功')
      this.getDataList()
    },

    // 显示调整离职模态框
    async showChangeDialog(params) {
      let { userId, name } = params
      // 获取员工的离职信息

      let res = await getLeaveInfo({
        userId
      })
      let { id, lastDate, remark, reason } = res

      this.changeParams = {
        id,
        lastDate,
        remark,
        reason,
        name
      }
      this.oldLeaveInfo = {
        ...this.changeParams
      }
      this.changeLeaveVisible = true
    },
    // 调整离职信息
    async handelChangeLeave() {
      this.btnLoading = true
      await changeLeaveInfo(this.changeParams)
      this.$message.success('保存成功', 2000)
      this.getDataList()
      this.btnLoading = false
      this.changeLeaveVisible = false
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

.el-dialog {
  .row-item {
    .choose-leave-name {
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 14px;
      background: #e3e7e9;
    }

    height: 90px;
  }
}
</style>

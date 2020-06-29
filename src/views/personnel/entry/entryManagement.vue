<template>
  <div>
    <page-header title="入职管理" />
    <basic-container>
      <el-tabs
        v-model="status"
        :before-leave="handleBeforeClick"
        @tab-click="handleTabClick"
      >
        <el-tab-pane
          label="待入职"
          name="7"
        />
        <el-tab-pane
          label="最近入职"
          name="latelyEntry"
        >
          <nav
            v-show="navShow"
            class="nav"
          >
            <span>
              <i class="el-icon-warning" /> 提示：以下仅显示最近2个月入职员工，全部员工请在
              <el-button
                type="text"
                @click="toRoster"
              >员工花名册</el-button>查看。
            </span>
            <span
              class="el-icon-close"
              style="color:#207EFA;font-size: 20px"
              @click="closeNav"
            />
          </nav>
        </el-tab-pane>
        <el-tab-pane
          label="放弃入职"
          name="8"
        />
      </el-tabs>
      <common-table
        ref="commonTable"
        style="width: 100%;height:100%"
        :data="data"
        :page="page"
        :loading="loading"
        :config="tableConfig"
        :columns="columns"
        @current-page-change="currentChange"
        @page-size-change="sizeChange"
      >
        <template slot="topMenu">
          <div style="display: flex;justify-content: space-between;">
            <search-popover
              ref="searchPopover"
              :require-options="searchConfig.requireOptions"
              :popover-options="searchConfig.popoverOptions"
              @submit="handleSubmit"
            />
            <div>
              <!-- <el-button
                icon="el-icon-upload2"
                size="medium"
                class="topBtn"
                type="text"
                @click="handleExport"
              >
                导出
              </el-button>-->
              <el-button
                icon="el-icon-refresh-right"
                size="medium"
                class="topBtn"
                type="text"
                @click="handleRefresh"
              />
            </div>
          </div>
        </template>
        <template
          slot="name"
          slot-scope="{ row }"
        >
          <span
            style="cursor: pointer"
            @click="toDetail(row)"
          >
            <el-button type="text">{{ row.name }}</el-button>
          </span>
        </template>
        <template
          slot="workProperty"
          slot-scope="{ row }"
        >
          {{ workProperty[row.workProperty] }}
        </template>
        <template
          slot="entryDate"
          slot-scope="{ row }"
        >
          {{ row.entryDate.split(' ')[0] }}
        </template>
        <template
          slot="handler"
          slot-scope="{ row }"
        >
          <div class="handlerRow">
            <template v-if="status === '7'">
              <div class="entryClass">
                <el-button
                  type="text"
                  @click="confirmEntry(row)"
                >
                  确认入职
                </el-button>
                <el-button
                  v-if="row.register === 0"
                  type="text"
                  @click="handleSend(row)"
                >
                  发送入职登记表
                </el-button>
                <el-button
                  v-if="row.register === 1"
                  type="text"
                  @click="handleViewRegister(row)"
                >
                  查看入职登记表
                </el-button>
                <el-dropdown @command="handleCommand($event, row)">
                  <el-button
                    type="text"
                    style="margin-left: 10px"
                  >
                    <i class="el-icon-arrow-down iconfont icon-basics-more-outlined" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="getOutEntry">
                      放弃入职
                    </el-dropdown-item>
                    <!-- <el-dropdown-item command="edit">编辑</el-dropdown-item> -->
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>

            <template v-if="status === '8'">
              <el-button
                type="text"
                @click="addWillEntry(row)"
              >
                添加到待入职
              </el-button>
              <!-- <el-button type="text">
              发送入职登记表
              </el-button>-->
              <!-- <el-button type="text">
            查看入职登记表
              </el-button>-->
            </template>
            <template v-if="status === 'latelyEntry'">
              <el-button
                type="text"
                @click="toEntryMatters(row)"
              >
                完善入职事项
              </el-button>
            </template>
          </div>
        </template>
      </common-table>
    </basic-container>
    <give-out-entry-dialog
      ref="giveOutEntryDialog"
      :visible.sync="giveOutEntryDialog"
      @refresh="loadData(1)"
    />
  </div>
</template>
<script>
const column = [
  {
    label: '姓名',
    prop: 'name',
    slot: true
  },
  {
    label: '职位',
    prop: 'jobName',
    width: 100
  },
  {
    label: '部门',
    prop: 'orgName',
    width: 120
  },
  {
    label: '岗位',
    prop: 'positionName',
    width: 120
  },
  {
    label: '工作性质',
    prop: 'workProperty',
    slot: true
  },
  {
    label: '手机号',
    prop: 'phonenum',
    width: 120
  }
]

const willEntryColumn = [
  {
    label: '邮箱',
    prop: 'email',
    width: 180
  },
  {
    label: '预计入职日期',
    prop: 'entryDate',
    slot: true,
    width: 120
  }
]

const didEntryColumn = [
  {
    label: '邮箱',
    prop: 'userEmail',
    width: 180
  },
  {
    label: '入职日期',
    prop: 'entryDate',
    slot: true,
    width: 100
  }
]

const giveUpEntryColumn = [
  {
    label: '邮箱',
    prop: 'email',
    width: 180
  },
  {
    label: '原定入职日期',
    prop: 'entryDate',
    slot: true,
    width: 120
  }
]

import moment from 'moment'
import PageHeader from '@/components/page-header/pageHeader'
import SearchPopover from '@/components/searchPopOver/index'
import GiveOutEntryDialog from './components/giveOutEntryDialog'
import { getOrgJob } from '@/api/personnel/roster'
import { getOrgTreeSimple } from '@/api/org/org'
import { getUserList } from '@/api/personnel/roster'
import {
  getCandidateAcceptList,
  addOutCandidateAccept,
  postEntryRegisterSend
} from '@/api/personnel/entry'
export default {
  name: 'EntryManagement',
  components: { PageHeader, SearchPopover, GiveOutEntryDialog },
  data() {
    return {
      status: '7',
      checkColumn: ['name', 'jobName', 'orgName', 'phonenum', 'email', 'entryDate'],
      columns: column.concat(willEntryColumn),
      loading: false,
      data: [],
      tableConfig: {
        showHandler: true,
        // enableMultiSelect: true,
        enablePagination: true,
        uniqueKey: 'personId',
        highlightSelect: true,
        showIndexColumn: false,
        handlerColumn: {
          width: 240
        }
      },
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      searchParams: {},
      searchConfig: {
        requireOptions: [
          {
            type: 'input',
            field: 'search',
            label: '',
            data: '',
            options: [],
            config: { placeholder: '姓名/手机号码', 'suffix-icon': 'el-icon-search' }
          }
        ],
        popoverOptions: [
          {
            type: 'treeSelect',
            field: 'orgId',
            label: '用人部门',
            data: '',
            config: {
              selectParams: {
                placeholder: '请选择用人部门',
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
            field: 'jobId',
            label: '应聘职位',
            data: '',
            options: [],
            config: { optionLabel: 'jobName', optionValue: 'jobId' }
          },
          {
            type: 'dataPicker',
            data: '',
            label: '预计入职日期',
            field: 'beginEntryDate,endEntryDate',
            config: { type: 'daterange', 'range-separator': '至' }
          },
          {
            type: 'select',
            data: '',
            label: '工作性质',
            field: 'workProperty',
            config: { optionLabel: 'dictValue', optionValue: 'dictKey' },
            options: []
          }
        ]
      },
      navShow: true,
      workProperty: {},
      giveOutEntryDialog: false
    }
  },
  created() {
    this.loadSearchOption()
  },
  activated() {
    this.loadData()
  },
  methods: {
    confirmEntry(row) {
      this.$router.push('/personnel/entry/confirmEntry/' + row.personId + '?applyId=' + row.applyId)
    },
    addWillEntry(row) {
      this.$confirm('您确认要将该员工添加到待入职吗？', '添加到待入职', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        let params = {
          personId: row.personId,
          userId: this.$store.state.user.userInfo.user_id
        }
        addOutCandidateAccept(params)
          .then(() => {
            this.$message.success('添加成功')
            this.loading = false
            this.loadData(1)
          })
          .catch(() => {
            this.$message.error('添加失败')
            this.loading = false
          })
      })
    },
    handleCommand(command, data) {
      if (command === 'getOutEntry') {
        this.$refs.giveOutEntryDialog.out(data)
      }
    },
    toRoster() {
      this.$router.push('/personnel/roster')
    },
    closeNav() {
      this.navShow = false
    },
    handleBeforeClick() {
      if (this.loading) return false
    },
    handleTabClick() {
      this.columns = column.concat(
        this.status === '7'
          ? willEntryColumn
          : this.status === '8'
          ? giveUpEntryColumn
          : didEntryColumn
      )
      this.$refs['searchPopover'].resetForm()
      this.searchParams = {}
      this.$refs.commonTable.clearSelection()
      this.loadData(1)
    },
    toDetail(row) {
      if (this.status !== 'latelyEntry') {
        this.$router.push(`/personnel/entry/entryPersonDetail?applyId=${row.applyId}`)
      } else {
        this.$router.push('/personnel/detail/' + row.userId)
      }
    },
    toEntryMatters(row) {
      this.$router.push('/personnel/entry/entryMatters/' + row.userId)
    },
    loadSearchOption() {
      getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
        this.searchConfig.popoverOptions[0].config.treeParams.data.push(...res)
      })
      getOrgJob().then((res) => {
        this.searchConfig.popoverOptions[1].options = res
      })
      this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
        this.searchConfig.popoverOptions[3].options = res
        res.forEach((item) => {
          this.workProperty[item.dictKey] = item.dictValue
        })
      })
    },
    handleSubmit(params) {
      this.searchParams = params
      this.loadData(1)
    },
    loadData(pageNo) {
      let params = { ...this.searchParams }
      if (pageNo) this.page.currentPage = pageNo
      params.pageNo = this.page.currentPage
      params.pageSize = this.page.size
      let getDataFun
      if (this.status === 'latelyEntry') {
        getDataFun = getUserList
        params.endEntryDate = moment(new Date()).format('YYYY-MM-DD')
        params.beginEntryDate = moment(new Date())
          .subtract(2, 'months')
          .format('YYYY-MM-DD')
        params.statuses = ['Formal', 'Try', 'WaitLeave']
        if (params.jobId) params.jobs = [params.jobId]
        if (params.orgId) params.orgs = [params.orgId]
        if (params.workProperty) params.workProperties = [params.workProperty]
        delete params.jobId
        delete params.orgId
        delete params.orgId
      } else {
        getDataFun = getCandidateAcceptList
        params.status = this.status
      }
      this.loading = true
      getDataFun(params)
        .then((res) => {
          this.page.total = res.totalNum
          this.data = res.data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage
      this.loadData()
    },
    sizeChange(pageSize) {
      this.page.size = pageSize
      this.loadData()
    },
    handleRefresh() {
      this.loadData(1)
    },
    handleExport() {},
    handleSend(row) {
      let params = {
        recruitmentId: row.recruitmentId,
        personId: row.personId
      }
      postEntryRegisterSend(params).then(() => {
        this.$message.success('发送成功')
        this.loadData()
      })
    },
    handleViewRegister(row) {
      let params = {
        recruitmentId: row.recruitmentId,
        personId: row.personId,
        entry: 1,
        tagName: '入职登记表详情'
      }
      this.$router.push({
        path: '/personnel/candidate/registrationForm',
        query: params
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  line-height: 26px;
  padding: 5px 20px;
  margin-top: 8px;
  margin-bottom: 16px;
  background: #edf8ff;
  border: 1px solid #73b9ff;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

/deep/ .handlerRow {
  display: flex;
  justify-content: flex-start;
  .el-button--text {
    flex: 1;
    text-align: left;
  }
  .entryClass {
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
}

.icon-basics-more-outlined {
  color: #a1a7ae;
}

/deep/ .el-tabs__nav-wrap::after {
  height: 1px;
}

/deep/ .el-tabs__active-bar {
  height: 3px;
}
</style>

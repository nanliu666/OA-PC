<template>
  <div class="fill">
    <page-header title="员工花名册">
      <el-dropdown
        slot="rightMenu"
        @command="handleCommand"
      >
        <el-button
          type="primary"
          size="medium"
        >
          添加员工
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="add">
            单个添加员工
          </el-dropdown-item>
          <!-- <el-dropdown-item>Excel导入员工</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </page-header>
    <div class="state">
      <div class="on">
        <div
          class="onItem"
          @click="tabClick('onJob')"
        >
          <div class="status">
            <div
              :id="tabStatus === 'onJob' ? 'current' : ''"
              class="statusWork"
            >
              在职
            </div>
            <div
              :id="tabStatus === 'onJob' ? 'current' : ''"
              class="statusNum"
            >
              {{ personStatistics.Formal + personStatistics.Try + personStatistics.WaitLeave }}人
            </div>
          </div>
          <div
            v-show="tabStatus === 'onJob'"
            class="bottomBox"
          />
        </div>
        <div
          class="onItem"
          @click="tabClick('Formal')"
        >
          <div class="status">
            <div
              :id="tabStatus === 'Formal' ? 'current' : ''"
              class="statusWork"
            >
              正式
            </div>
            <div
              :id="tabStatus === 'Formal' ? 'current' : ''"
              class="statusNum"
            >
              {{ personStatistics.Formal }}人
            </div>
          </div>
          <div
            v-show="tabStatus === 'Formal'"
            class="bottomBox"
          />
        </div>
        <div
          class="onItem"
          @click="tabClick('Try')"
        >
          <div class="status">
            <div
              :id="tabStatus === 'Try' ? 'current' : ''"
              class="statusWork"
            >
              试用期
            </div>
            <div
              :id="tabStatus === 'Try' ? 'current' : ''"
              class="statusNum"
            >
              {{ personStatistics.Try }}人
            </div>
          </div>
          <div
            v-show="tabStatus === 'Try'"
            class="bottomBox"
          />
        </div>
        <div
          class="onItem"
          @click="tabClick('WaitLeave')"
        >
          <div class="status">
            <div
              :id="tabStatus === 'WaitLeave' ? 'current' : ''"
              class="statusWork"
            >
              待离职
            </div>
            <div
              :id="tabStatus === 'WaitLeave' ? 'current' : ''"
              class="statusNum"
            >
              {{ personStatistics.WaitLeave }}人
            </div>
          </div>
          <div
            v-show="tabStatus === 'WaitLeave'"
            class="bottomBox"
          />
        </div>
      </div>
      <div class="left">
        <div
          :id="tabStatus === 'Leaved' ? 'current' : ''"
          class="onItem"
          @click="tabClick('Leaved')"
        >
          <div class="status">
            <div
              :id="tabStatus === 'Leaved' ? 'current' : ''"
              class="statusWork"
            >
              已离职
            </div>
            <div
              :id="tabStatus === 'Leaved' ? 'current' : ''"
              class="statusNum"
            >
              {{ personStatistics.Leaved }}人
            </div>
          </div>

          <div
            v-show="tabStatus === 'Leaved'"
            class="bottomBox"
          />
        </div>
      </div>
    </div>
    <basic-container block>
      <common-table
        v-model="obj"
        :data="data"
        :loading="loading"
        :columns="option.column"
        :page="page"
        :config="tableConfig"
        @page-size-change="sizeChange"
        @current-page-change="currentChange"
      >
        <template slot="topMenu">
          <search-component
            ref="searchComponent"
            :show-status="tabStatus === 'onJob'"
            @seacrh="handleSearch"
            @export="handleExport"
          />
        </template>
        <template
          slot="name"
          slot-scope="{ row }"
        >
          <el-button
            style="cursor: pointer"
            type="text"
            @click="toUserDetail(row)"
          >
            {{ row.name }}
          </el-button>
        </template>
        <template
          slot="status"
          slot-scope="{ row }"
        >
          {{ statusWord[row.status] }}
        </template>
        <template
          slot="menu"
          slot-scope="{ row }"
        >
          <el-dropdown @command="handleCommand($event, row)">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon-more" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- v-show 判断个人信息中员工状态 -->
              <el-dropdown-item
                v-show="row.status === 'Try' || row.status === 'onJob'"
                command="toFormal"
              >
                转正
              </el-dropdown-item>
              <el-dropdown-item
                v-show="row.status === 'Try' || row.status === 'Formal' || row.status === 'onJob'"
                command="changeJob"
              >
                调岗
              </el-dropdown-item>
              <el-dropdown-item
                v-show="row.status === 'Try' || row.status === 'Formal' || row.status === 'onJob'"
                command="toLeave"
              >
                办理离职
              </el-dropdown-item>
              <el-dropdown-item
                v-show="row.status === 'Formal' || row.status === 'onJob'"
                command="toBetter"
              >
                晋升
              </el-dropdown-item>
              <el-dropdown-item
                v-show="row.status === 'WaitLeave' || row.status === 'onJob'"
                command="checkLeaveInfo"
              >
                查看离职信息
              </el-dropdown-item>
              <el-dropdown-item
                v-show="row.status === 'WaitLeave' || row.status === 'onJob'"
                command="toLeft"
              >
                确认离职
              </el-dropdown-item>
              <el-dropdown-item
                v-show="row.status === 'WaitLeave' || row.status === 'onJob'"
                command="getUpLeft"
              >
                放弃离职
              </el-dropdown-item>
              <el-dropdown-item
                v-show="row.status === 'Leaved'"
                command="leftProve"
              >
                离职证明
              </el-dropdown-item>
              <el-dropdown-item
                v-show="row.status === 'Leaved'"
                command="practiceProve"
              >
                实习证明
              </el-dropdown-item>
              <el-dropdown-item
                v-show="row.status === 'Leaved'"
                command="onJobProve"
              >
                在职证明
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </common-table>
    </basic-container>
  </div>
</template>

<script>
import SearchComponent from '@/components/searchComponent/searchComponent'
import { tableOptions } from '@/util/constant'
import { getUserList, getUserStatusStat } from '@/api/personnel/roster'

export default {
  name: 'EmployeeRoster',
  components: {
    SearchComponent
  },
  data() {
    return {
      // 在职 onJob 正式 Formal 试用期 Try 离职 WaitLeave 已离职 Leaved
      tabStatus: 'onJob',
      statusWord: {
        onJob: '在职',
        Formal: '正式',
        Try: '试用期',
        WaitLeave: '待离职',
        Leaved: '已离职'
      },
      personStatistics: {
        Formal: 0,
        Try: 0,
        WaitLeave: 0,
        Leaved: 0
      },
      obj: {},
      page: {
        pageSize: 10,
        pagerCount: 5,
        total: 200,
        currentPage: 1,
        background: false,
        layout: 'prev, pager, next, sizes, jumper,total'
      },
      tableConfig: {
        showHandler: false,
        rowKey: (row) => {
          return row.personId + row.recruitmentId
        },
        // enableMultiSelect: true,
        enablePagination: true,
        uniqueKey: 'personId',
        highlightSelect: true,
        showIndexColumn: false
      },
      loading: false,
      searchParams: {},
      data: [],
      option: {
        ...tableOptions,
        align: 'center',
        menuAlign: 'center',
        selection: false,
        tip: false,
        menu: false,
        size: 'medium',
        column: [
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
            label: '部门',
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
            label: '员工状态',
            prop: 'status',
            slot: true
          },
          {
            label: '入职日期',
            prop: 'entryDate',
            type: 'date',
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd'
          },
          {
            label: '手机号码',
            prop: 'phonenum'
          }
        ]
      }
    }
  },
  created() {
    this.getUserStatusStat()
  },
  activated() {
    this.getTableData(1)
  },
  methods: {
    toUserDetail(row) {
      this.$router.push('/personnel/detail/' + row.userId)
    },
    getUserStatusStat() {
      getUserStatusStat().then((res) => {
        res.forEach((item) => {
          this.personStatistics[item.status] = item.statusNum
        })
      })
    },
    tabClick(status) {
      if (this.loading) return
      this.tabStatus = status
      this.$refs.searchComponent.resetForm()
      this.searchParams = {}
      this.getTableData(1)
    },
    handleCommand(command, row) {
      if (command === 'add') {
        this.$router.push('/personnel/addRoster')
      }
      // eslint-disable-next-line no-console
      console.log(command, row)
    },
    getTableData(pageNo) {
      if (this.loading) return
      if (pageNo) this.page.currentPage = pageNo
      if (!this.searchParams.statuses && this.tabStatus === 'onJob') {
        this.searchParams.statuses = ['Formal', 'Try', 'WaitLeave']
      } else if (this.tabStatus !== 'onJob') {
        this.searchParams.statuses = [this.tabStatus]
      }
      const params = {
        pageNo: pageNo || this.page.currentPage,
        pageSize: this.page.pageSize,
        ...this.searchParams
      }
      this.loading = true
      getUserList(params)
        .then((res) => {
          this.data = res.data
          this.page.total = res.totalNum
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleSearch(params) {
      this.searchParams = params
      this.getTableData(1)
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
      this.getTableData(1)
    },
    currentChange(currentPage) {
      this.getTableData(currentPage)
    },
    handleExport() {}
  }
}
</script>

<style lang="scss" scoped>
.basic-container--block {
  height: calc(100% - 92px - 116px);
  min-height: calc(100% - 92px - 116px);
}
.roster-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 0 24px;
  .header {
    font-weight: bold;
    font-size: 18px;
    padding: 14px 0 16px;
  }
}
.state {
  display: flex;
  // padding: 0 6px;
  margin-bottom: 10px;
  .on {
    flex: 4;
    background: #ffffff;
    border-radius: 4px;
    margin-right: 20px;
    display: flex;
    .onItem {
      flex: 1;
      text-align: center;
      height: 46px;
      margin: 30px 0;
      border-right: 1px solid #e3e7e9;
      cursor: pointer;
      .status {
        .statusWork {
          font-size: 12px;
          color: #718199;
          line-height: 18px;
        }
        .statusNum {
          font-size: 16px;
          color: #202940;
          line-height: 24px;
        }
      }
      .bottomBox {
        height: 2px;
        width: 68px;
        background: #207efa;
        margin: 0 auto;
        margin-top: 32px;
      }
    }
    :last-of-type {
      border-right: 0;
    }
    #current {
      color: #207efa;
    }
  }
  .left {
    flex: 1;
    background: #ffffff;
    border-radius: 4px;
    .onItem {
      flex: 1;
      text-align: center;
      height: 46px;
      margin: 30px 0;
      cursor: pointer;
      .status {
        .statusWork {
          font-size: 12px;
          color: #718199;
          line-height: 18px;
        }
        .statusNum {
          font-size: 16px;
          color: #202940;
          line-height: 24px;
        }
      }
      .bottomBox {
        height: 2px;
        width: 68px;
        background: #207efa;
        margin: 0 auto;
        margin-top: 32px;
      }
    }
    #current {
      color: #207efa !important;
    }
  }
}
/deep/ .top-menu {
  height: inherit;
}
</style>

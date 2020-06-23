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
          :class="tabStatus === 'onJob' ? 'current' : ''"
          @click="tabClick('onJob')"
        >
          在职
          {{ personStatistics.Formal + personStatistics.Try + personStatistics.WaitLeave }}
          人
          <div
            v-show="tabStatus === 'onJob'"
            class="bottomBox"
          />
        </div>
        <div
          :class="tabStatus === 'Formal' ? 'current' : ''"
          @click="tabClick('Formal')"
        >
          正式 {{ personStatistics.Formal }} 人
          <div
            v-show="tabStatus === 'Formal'"
            class="bottomBox"
          />
        </div>

        <div
          :class="tabStatus === 'Try' ? 'current' : ''"
          @click="tabClick('Try')"
        >
          试用期 {{ personStatistics.Try }} 人
          <div
            v-show="tabStatus === 'Try'"
            class="bottomBox"
          />
        </div>

        <div
          :class="tabStatus === 'WaitLeave' ? 'current' : ''"
          @click="tabClick('WaitLeave')"
        >
          待离职 {{ personStatistics.WaitLeave }} 人
          <div
            v-show="tabStatus === 'WaitLeave'"
            class="bottomBox"
          />
        </div>
      </div>
      <div class="left">
        <div
          :class="tabStatus === 'Leaved' ? 'current' : ''"
          @click="tabClick('Leaved')"
        >
          已离职 {{ personStatistics.Leaved }} 人
          <div
            v-show="tabStatus === 'Leaved'"
            class="bottomBox"
          />
        </div>
      </div>
    </div>
    <basic-container block>
      <search-component
        ref="searchComponent"
        :show-status="tabStatus === 'onJob'"
        @seacrh="handleSearch"
        @export="handleExport"
      />
      <avue-crud
        v-model="obj"
        :data="data"
        :option="option"
        :page.sync="page"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
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
      </avue-crud>
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
        currentPage: 1
      },
      searchParams: {},
      data: [],
      option: {
        ...tableOptions,
        align: 'center',
        menuAlign: 'center',
        selection: false,
        tip: false,
        index: true,
        indexLabel: '序号',
        menu: false,
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
    this.getTableData(1)
    this.getUserStatusStat()
  },
  activated() {
    this.getTableData()
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
      getUserList(params).then((res) => {
        this.data = res.data
        this.page.total = res.totalNum
        if (pageNo) this.page.currentPage = pageNo
      })
    },
    handleSearch(params) {
      this.searchParams = params
      this.getTableData(1)
    },
    sizeChange() {
      this.getTableData(1)
    },
    currentChange() {
      this.getTableData()
    },
    handleExport() {}
  }
}
</script>

<style lang="scss" scoped>
.basic-container--block {
  height: calc(100% - 82px - 116px);
  min-height: calc(100% - 82px - 116px);
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
    > div {
      flex: 1;
      text-align: center;
      height: 46px;
      margin: 30px 0;
      line-height: 46px;
      border-right: 1px solid #e3e7e9;
      cursor: pointer;
      .bottomBox {
        height: 2px;
        width: 68px;
        background: #207efa;
        margin: 0 auto;
        margin-top: 28px;
      }
    }
    :last-of-type {
      border-right: 0;
    }
    .current {
      color: #207efa;
    }
  }
  .left {
    flex: 1;
    background: #ffffff;
    border-radius: 4px;
    > div {
      flex: 1;
      text-align: center;
      height: 46px;
      margin: 30px 0;
      line-height: 46px;
      cursor: pointer;
      .bottomBox {
        height: 2px;
        width: 68px;
        background: #207efa;
        margin: 0 auto;
        margin-top: 28px;
      }
    }
    .current {
      color: #207efa;
    }
  }
}
</style>

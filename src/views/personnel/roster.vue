<template>
  <basic-container>
    <div class="roster-header">
      <h4>员工花名册</h4>
      <el-dropdown @command="handleCommand">
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
          <el-dropdown-item>Excel导入员工</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="state">
      <div class="on">
        <div
          :class="status === 'onJob' ? 'current' : ''"
          @click="status = 'onJob'"
        >
          在职 {{ personStatistics.onJob }} 人
        </div>
        <div
          :class="status === 'Formal' ? 'current' : ''"
          @click="status = 'Formal'"
        >
          正式 {{ personStatistics.Formal }} 人
        </div>
        <div
          :class="status === 'Try' ? 'current' : ''"
          @click="status = 'Try'"
        >
          试用期 {{ personStatistics.Try }} 人
        </div>
        <div
          :class="status === 'WaitLeave' ? 'current' : ''"
          @click="status = 'WaitLeave'"
        >
          待离职 {{ personStatistics.WaitLeave }} 人
        </div>
      </div>
      <div class="left">
        <div
          :class="status === 'Leaved' ? 'current' : ''"
          @click="status = 'Leaved'"
        >
          已离职 {{ personStatistics.Leaved }} 人
        </div>
      </div>
    </div>
    <search-component
      :show-status="status === 'onJob'"
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
</template>

<script>
import SearchComponent from '@/components/searchComponent/searchComponent'
import { tableOptions } from '@/util/constant'

export default {
  name: 'EmployeeRoster',
  components: {
    SearchComponent
  },
  data() {
    return {
      // 在职 onJob 正式 Formal 试用期 Try 离职 WaitLeave 已离职 Leaved
      status: 'onJob',
      personStatistics: {
        onJob: 83,
        Formal: 63,
        Try: 20,
        WaitLeave: 0,
        Leaved: 25
      },
      obj: {},
      page: {
        pageSize: 10,
        pagerCount: 5,
        total: 200,
        currentPage: 1
      },
      searchParams: {},
      data: [
        {
          name: '张三',
          userId: 'GZ002035',
          org: '产品部',
          job: '产品经理',
          position: '设计岗',
          status: 'Try',
          date: '1994-02-23',
          phonenum: '15915988588'
        }
      ],
      option: {
        ...tableOptions,
        align: 'center',
        menuAlign: 'center',
        selection: true,
        tip: false,
        height: 'auto',
        index: true,
        indexLabel: '序号',
        column: [
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '工号',
            prop: 'userId'
          },
          {
            label: '部门',
            prop: 'org'
          },
          {
            label: '职位',
            prop: 'job'
          },
          {
            label: '岗位',
            prop: 'position'
          },
          {
            label: '员工状态',
            prop: 'status'
          },
          {
            label: '入职日期',
            prop: 'date',
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
  methods: {
    handleCommand(command, row) {
      if (command === 'add') {
        this.$router.push('/personnel/addRoster')
      }
      // eslint-disable-next-line no-console
      console.log(command, row)
    },
    getTableData(pageNo) {
      const params = {
        ...this.page,
        ...this.searchParams
      }
      if (pageNo) {
        params.pageNo = pageNo
        this.page.currentPage = pageNo
      } else {
        params.pageNo = this.page.currentPage
      }
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
.roster-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.state {
  display: flex;
  margin-bottom: 10px;
  .on {
    flex: 4;
    border: 1px solid rgba(73, 111, 233, 1);
    border-radius: 4px;
    margin-right: 20px;
    display: flex;
    > div {
      flex: 1;
      text-align: center;
      height: 40px;
      margin: 30px 0;
      line-height: 40px;
      border-right: 1px solid #333;
      cursor: pointer;
    }
    :last-of-type {
      border-right: 0;
    }
    .current {
      color: rgba(73, 111, 233, 1);
    }
  }
  .left {
    flex: 1;
    border: 1px solid rgba(73, 111, 233, 1);
    border-radius: 4px;
    > div {
      flex: 1;
      text-align: center;
      height: 40px;
      margin: 30px 0;
      line-height: 40px;
      cursor: pointer;
    }
    .current {
      color: rgba(73, 111, 233, 1);
    }
  }
}
</style>

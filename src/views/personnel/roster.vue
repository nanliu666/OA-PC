<template>
  <basic-container>
    <div class="roster-header">
      <h4>员工花名册</h4>
      <el-dropdown>
        <el-button
          type="primary"
          size="medium"
        >
          添加员工
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>单个添加员工</el-dropdown-item>
          <el-dropdown-item>Excel导入员工</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div />
    <search-component
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
        slot-scope="{}"
      >
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon-more" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>转正</el-dropdown-item>
            <el-dropdown-item>调岗</el-dropdown-item>
            <el-dropdown-item>办理离职</el-dropdown-item>
            <el-dropdown-item>晋升</el-dropdown-item>
            <el-dropdown-item>查看离职信息</el-dropdown-item>
            <el-dropdown-item>确认离职</el-dropdown-item>
            <el-dropdown-item>放弃离职</el-dropdown-item>
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
      // 在职 onJob 正式 formal 试用期 try 离职 leave 已离职 left
      state: 'onJob',
      obj: {},
      page: {
        pageSize: 10,
        pagerCount: 5,
        total: 200,
        currentPage: 1
      },
      params: {},
      data: [
        {
          name: '张三',
          userId: 'GZ002035',
          org: '产品部',
          job: '产品经理',
          position: '设计岗',
          state: '正式',
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
            prop: 'state'
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
    getTableData(pageNo) {
      const params = {
        ...this.page,
        ...this.params
      }
      if (pageNo) {
        params.pageNo = pageNo
        this.page.currentPage = pageNo
      } else {
        params.pageNo = this.page.currentPage
      }
    },
    handleSearch(params) {
      this.params = params
    },
    sizeChange() {}
  }
}
</script>

<style lang="scss" scoped>
.roster-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<template>
  <basic-container>
    <search-component />
    <avue-crud
      v-model="obj"
      :data="data"
      :option="option"
      :page.sync="page"
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
import SearchComponent from '@/components/searchComponent/screenComponent'
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
        pageSize: 20,
        pagerCount: 5,
        total: 200,
        currentPage: 1
      },
      data: [
        {
          name: '张三',
          sex: '男',
          date: '1994-02-23 00:00:00'
        },
        {
          name: '李四',
          sex: '女',
          date: '1994-02-23 00:00:00'
        },
        {
          name: '王五',
          sex: '女',
          date: '1994-02-23 00:00:00'
        },
        {
          name: '赵六',
          sex: '男',
          date: '1994-02-23 00:00:00'
        }
      ],
      option: {
        ...tableOptions,
        align: 'center',
        menuAlign: 'center',
        selection: true,
        tip: false,
        height: 'auto',
        column: [
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '性别',
            prop: 'sex'
          },
          {
            label: '日期',
            prop: 'date',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss'
          }
        ]
      }
    }
  }
}
</script>

<style></style>

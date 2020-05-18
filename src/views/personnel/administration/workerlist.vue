<template>
  <div>
    <div class="roster-header">
      <h4>
        转正管理 (试用期员工共计<i>{{ numberofpersonnel }}</i>人)
      </h4>
    </div>
    <basic-container>
      <common-table
        style="width: 100%"
        :data="data"
        :page="page"
        :loading="loading"
        :config="tableConfig"
        :columns="columns"
        @pageSizeChange="sizeChange"
        @currentPageChange="currentChange"
      >
        <template slot="topMenu">
          <div class="flex-flow flex justify-content align-items ">
            <div>
              <search-popover
                ref="searchPopover"
                :require-options="searchConfig.requireOptions"
                :popover-options="searchConfig.popoverOptions"
                @submit="handleSubmit"
              />
            </div>
            <div class="edge">
              <el-button
                type="primary"
                size="medium"
                @click="handleExport"
              >
                <i class="el-icon-upload2" /> 导出
              </el-button>
              <el-button
                type="primary"
                size="medium"
                @click="getData"
              >
                <i class="el-icon-refresh" />
              </el-button>
            </div>
          </div>
        </template>
        <template
          slot="multiSelectMenu"
          slot-scope="{ selection }"
        >
          <span class="all">
            <span @click="handlerDeleteAll(selection)"><i class="el-icon-delete" /> 批量删除</span>
            <span><i class="el-icon-folder" /> 批量导出</span>
          </span>
        </template>
        <template
          v-if="scope.row.isDefault === 0"
          slot="handler"
          slot-scope="scope"
        >
          <el-button
            type="text"
            size="medium"
            @click.stop="handleEdit(scope.row, scope.index)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="medium"
            @click.stop="handleDelete(scope.row, scope.index)"
          >
            删除
          </el-button>
        </template>
      </common-table>
    </basic-container>
  </div>
</template>

<script>
import SearchPopover from '@/components/searchPopOver/index'
import { getStaffList, getUserStatusStat } from '@/api/personnel/roster'

export default {
  name: 'EmployeeRoster',
  components: {
    SearchPopover
  },
  data() {
    return {
      searchConfig: {
        requireOptions: [
          {
            type: 'input',
            field: 'parentOrgId',
            label: '',
            data: [],
            config: {
              selectParams: {
                placeholder: '姓名/工号',
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
          }
        ],
        popoverOptions: [
          {
            type: 'select',
            field: 'orgSelect',
            label: '部门',
            data: '',
            options: [
              { value: 'Enterprise', label: '企业' },
              { value: 'Company', label: '公司' },
              { value: 'Department', label: '部门' },
              { value: 'Group', label: '小组' }
            ],
            config: { optionLabel: '请选择', optionValue: '' }
          },
          {
            type: 'select',
            field: 'orgCompany',
            data: '',
            label: '职位',
            options: [
              { value: 'Enterprise', label: 'java开发' },
              { value: 'Company', label: 'web前端' },
              { value: 'Department', label: '开发负责人' },
              { value: 'Group', label: '地域总监' }
            ],
            config: { optionLabel: '请选择', optionValue: '' }
          },
          {
            type: 'timePicker',
            field: 'userEntry',
            data: '',
            label: '入职日期',
            options: [],
            config: { optionLabel: 'name', optionValue: 'userEntry' },
            loading: false,
            pageNo: 2
            // loadMoreFun(item) {
            //   if (item.loading) return
            //   item.loading = true
            //   getUserWorkList({ pageNo: item.pageNo, pageSize: 100 }).then((res) => {
            //     if (res.data.length > 0) {
            //       item.options.push(...res.data)
            //       item.pageNo += 1
            //       item.loading = false
            //     }
            //   })
            // }
          },
          {
            type: 'timePicker',
            field: 'userId',
            data: '',
            label: '转正日期',
            options: [],
            config: { optionLabel: 'name', optionValue: 'userId' },
            loading: false,
            pageNo: 2
            // loadMoreFun(item) {
            //   if (item.loading) return
            //   item.loading = true
            //   getUserWorkList({ pageNo: item.pageNo, pageSize: 100 }).then((res) => {
            //     if (res.data.length > 0) {
            //       item.options.push(...res.data)
            //       item.pageNo += 1
            //       item.loading = false
            //     }
            //   })
            // }
          },
          {
            type: 'select',
            field: 'onTrial',
            data: '',
            label: '试用期',
            options: [
              { value: '一个月', label: 'onemonth' },
              { value: '两个月', label: 'towmonth' },
              { value: '三个月', label: 'threemonths' }
            ],
            config: { optionLabel: '请选择', optionValue: '' }
          },
          {
            type: 'select',
            field: 'orgType',
            data: '',
            label: '申请状态',
            options: [
              { value: '已通过', label: 'onemonth' },
              { value: '已拒绝', label: 'towmonth' },
              { value: '申请中', label: 'threemonths' }
            ],
            config: { optionLabel: '请选择', optionValue: '' }
          }
        ]
      },
      numberofpersonnel: 'xxx',
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
      form: {
        name: ''
      },
      loading: false,
      isEdit: false,
      title: '新建职位类别',
      categoryDialog: false,
      dialogVisible: false,
      isBatch: false,
      show: true,
      number: 0,
      row: {},
      data: [],
      tableConfig: {
        showHandler: true,
        enableMultiSelect: true
      },
      columns: [
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '工号',
          prop: 'workNo'
        },
        {
          label: '转正状态申请',
          prop: 'status'
        },
        {
          label: '审批编号',
          prop: 'workNum'
        },
        {
          label: '部门',
          prop: 'orgName'
        },
        {
          label: '职务',
          prop: 'jobName'
        },
        {
          label: '入职时间',
          prop: 'companyDate'
        },
        {
          label: '转正日期',
          prop: 'formalDate'
        },
        {
          label: '试用期',
          prop: 'probation'
        }
      ],
      page: {
        pageSize: 10,
        pagerCount: 1,
        total: 10
      },
      params: {
        pageNo: 1,
        pageSize: 10,
        name: ''
      }
    }
  },
  created() {
    this.getTableData(1)
    this.getUserStatusStat()
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
      const params = {
        pageNo: pageNo || this.page.currentPage,
        pageSize: this.page.pageSize,
        ...this.searchParams
      }

      getStaffList(params).then((res) => {
        if (typeof res === 'undefined') this.Message({ message: '暂无可查看数据', type: 'error' })
        this.data = res.data
        this.numberofpersonnel = res.data.length
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
    handleExport() {},
    handleSubmit() {}
  }
}
</script>

<style lang="scss" scoped>
.roster-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  h4 {
    font-size: 18px;
  }
}
.state {
  display: flex;
  padding: 0 6px;
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

.edge {
  position: absolute;
  right: 59px;
}
</style>

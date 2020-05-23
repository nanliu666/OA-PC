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
        :config="tableConfig"
        :columns="columns"
        @pageSizeChange="getTableData"
        @currentPageChange="getTableData"
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
                @click="getTableData"
              >
                <i class="el-icon-refresh" />
              </el-button>
            </div>
          </div>
        </template>
        <template slot="multiSelectMenu">
          <span class="all">
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
        <template
          slot="name"
          slot-scope="{ row }"
        >
          <el-button
            type="text"
            size="medium"
            @click="jumpToDetail(row.personId)"
          >
            {{ row.name }}
          </el-button>
        </template>
        <template
          slot="name"
          slot-scope="{ row }"
        >
          <el-button
            type="text"
            size="medium"
            @click="jumpToDetail(row.personId)"
          >
            {{ row.name }}
          </el-button>
        </template>

        <template
          slot="approvalNo"
          slot-scope="{ row }"
        >
          <el-button
            type="text"
            size="medium"
            @click="jumpApproval(row.approvalNo)"
          >
            {{ row.approvalNo }}
          </el-button>
        </template>

        <template
          slot="formalDate"
          slot-scope="{ row }"
        >
          <span>{{ row.formalDate }}</span>
          <span :class="row.isSelect">{{ row.isOverdue }}</span>
        </template>

        <template
          slot="handler"
          slot-scope="{ row }"
        >
          <el-button
            size="medium"
            type="text"
            @click="handleEditRole(row)"
          >
            调整试用期
          </el-button>
        </template>
      </common-table>
    </basic-container>
    <adjust-edit
      ref="adjustEdit"
      :visible.sync="createOrgDailog"
    />
  </div>
</template>

<script>
import moment from 'moment'
import { getOrgTreeSimple } from '@/api/org/org'
import SearchPopover from '@/components/searchPopOver/index'
import { getStaffList, getOrgJob } from '@/api/personnel/roster'
import AdjustEdit from './components/adjustEdit'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  name: 'EmployeeRoster',
  components: {
    SearchPopover,
    AdjustEdit
  },
  data() {
    return {
      searchConfig: {
        requireOptions: [
          {
            type: 'input',
            field: 'search',
            label: '',
            data: [],
            month: [],
            config: {
              placeholder: '姓名/工号'
            }
          }
        ],
        popoverOptions: [
          {
            type: 'treeSelect',
            field: 'parentOrgId',
            label: '部门',
            data: '',
            config: {
              selectParams: {
                placeholder: '请输入内容',
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
            data: '',
            label: '职位',
            field: 'jobs',
            arrField: 'jobId',
            config: { multiple: true, optionLabel: 'jobName', optionValue: 'jobId' },
            options: [],
            loading: false,
            noMore: false,
            firstLoad(flag, item) {
              if (flag && item.options.length === 0) {
                item.loadMoreFun(item)
              }
            },
            loadMoreFun(item) {
              if (item.loading || item.noMore) return
              item.loading = true
              getOrgJob().then((res) => {
                if (res.length > 0) {
                  item.options.push(...res)
                  item.noMore = true
                }
              })
            }
          },
          {
            type: 'dataPicker',
            data: '',
            label: '入职日期',
            field: 'beginEntryDate,endEntryDate',
            config: { type: 'daterange', 'range-separator': '至' }
          },
          {
            type: 'dataPicker',
            data: '',
            label: '转正日期',
            field: 'beginFormalDate,endFormalDate',
            config: { type: 'daterange', 'range-separator': '至' }
          },
          {
            type: 'select',
            field: 'probation',
            data: '',
            label: '试用期',
            options: [
              { label: '无试用期', value: 0 },
              { label: '一个月', value: 1 },
              { label: '两个月', value: 2 },
              { label: '三个月', value: 3 },
              { label: '四个月', value: 4 },
              { label: '五个月', value: 5 },
              { label: '六个月', value: 6 }
            ],
            config: {}
          },
          {
            type: 'select',
            field: 'orgType',
            data: '',
            label: '申请状态',
            options: [
              { label: '未申请', value: 0 },
              { label: '已驳回', value: 1 },
              { label: '申请中', value: 2 }
            ],
            config: {}
          }
        ]
      },
      createOrgDailog: false,
      numberofpersonnel: 'xxx',
      personStatistics: {
        Formal: 0,
        Try: 0,
        WaitLeave: 0,
        Leaved: 0
      },
      number: 0,
      row: {},
      data: [],
      tableConfig: {
        showHandler: true
      },
      columns: [
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
          label: '转正状态申请',
          prop: 'status'
        },
        {
          label: '审批编号',
          prop: 'approvalNo',
          slot: true
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
          prop: 'entryDate'
        },
        {
          label: '转正日期',
          prop: 'formalDate',
          slot: true
        },
        {
          label: '试用期',
          prop: 'probation'
        }
      ],
      params: {
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getTableData()
    getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
      this.$refs['searchPopover'].treeDataUpdateFun(res, 'parentOrgId')
    })
  },
  methods: {
    getTableData(params) {
      if (typeof params === 'undefined') params = this.params
      let nowData = moment()
        .locale('zh-cn')
        .format('YYYY-MM-DD')
      getStaffList(params).then((res) => {
        let { data } = res
        data.forEach((item, index) => {
          let isOverdue = moment(nowData).isBefore(item.formalDate)
          if (isOverdue) {
            data[index].isOverdue = ''
            data[index].isSelect = ''
          } else {
            data[index].isOverdue = '逾期'
            data[index].isSelect = 'isSelect'
          }
        })
        this.data = res.data
        this.numberofpersonnel = res.totalNum
      })
    },
    handleSubmit(params) {
      let request = {
        search: params.search || '',
        pageNo: 1,
        pageSize: 10,
        orgs: [params.parentOrgId] || ' ',
        jobs: [...params.jobs] || ' ',
        probations: [params.probation] || ' '
      }
      request.beginEntryDate = params.beginEntryDate
      request.endEntryDate = params.endEntryDate
      request.beginFormalDate = params.beginFormalDate
      request.endFormalDate = params.endFormalDate
      return this.getTableData(request)
    },
    handleEditRole(row) {
      // let { status } = row
      // if (status == '申请中' || status == '已退回') {
      //   return this.$message({
      //     showClose: true,
      //     message: '很抱歉，当前员工的转正申请流程尚未完成，请在完成后再发起',
      //     type: 'warning'
      //   })
      // }
      this.$refs.adjustEdit.init(row)
    },
    jumpToDetail(personId) {
      this.$router.push('/personnel/detail/' + personId)
    },
    jumpApproval(Approvalcode) {
      return this.$message({
        showClose: true,
        message: `很抱歉，审批编号为${Approvalcode},审批详情页面正在开发，请期待`,
        type: 'warning'
      })
    }
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

.beBverdue {
  position: absolute;
  right: 59px;
}

.isSelect {
  color: #f56c6c;
  margin-left: 4px;
  padding: 4px;
  background-color: #fff;
  border: 1px solid #f56c6c;
  border-color: #f56c6c;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
}
</style>

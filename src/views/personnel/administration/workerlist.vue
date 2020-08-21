<template>
  <div class="Workerlist">
    <page-header :title="`转正管理 (试用期员工共计${_.get(page, 'total', 0)}人)`" />
    <basic-container block>
      <common-table
        :columns="tableColumns | columnsFilter(columnsVisible)"
        :config="tableConfig"
        :data="tableData"
        :loading="tableLoading"
        :page="page"
        @current-page-change="handleCurrentPageChange"
        @page-size-change="handlePageSizeChange"
      >
        <template #topMenu>
          <div class="operations">
            <SearchPopover
              ref="searchPopover"
              :require-options="searchConfig.requireOptions"
              :popover-options="searchConfig.popoverOptions"
              @submit="handleSearch"
            />
            <div class="operations__btns">
              <el-tooltip
                class="operations__btns--tooltip"
                content="刷新"
                effect="dark"
                placement="top"
              >
                <el-button
                  class="operations__btns--item"
                  size="mini"
                  type="text"
                  @click="refresh"
                >
                  <i class="iconfont iconicon_refresh" />
                </el-button>
              </el-tooltip>
              <el-popover
                placement="bottom"
                width="40"
                trigger="click"
              >
                <el-tooltip
                  slot="reference"
                  class="operations__btns--tooltip"
                  content="显隐"
                  effect="dark"
                  placement="top"
                >
                  <el-button
                    class="operations__btns--item"
                    size="mini"
                    type="text"
                  >
                    <i class="iconfont iconicon_setting" />
                  </el-button>
                </el-tooltip>

                <!-- 设置表格列可见性 -->
                <div class="operations__column--visible">
                  <el-checkbox-group v-model="columnsVisible">
                    <el-checkbox
                      v-for="item of tableColumns"
                      :key="item.prop"
                      :disabled="item.prop === 'name'"
                      :label="item.prop"
                      class="operations__column--item"
                    >
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-popover>
            </div>
          </div>
        </template>

        <!-- 处理id跳转 -->
        <template #name="{row}">
          <span
            class="table__link"
            @click="() => handleLinkNameClick(row)"
          >{{ row.name }}</span>
        </template>

        <template #apprNo="{row}">
          <span
            class="table__link"
            @click="() => handleLinkWorkNoClick(row)"
          >{{
            row.apprNo
          }}</span>
        </template>

        <template
          v-for="dictName of ['approveStatus', 'probation']"
          #[_.lowerFirst(dictName)]="{row}"
        >
          {{ translator({ dictKey: dictName, value: _.get(row, _.lowerFirst(dictName)) }) }}
        </template>

        <template #status="{row}">
          {{ translator({ dictKey: 'EmployeeStatus', value: row.status }) }}
        </template>

        <template
          slot="formalDate"
          slot-scope="{ row }"
        >
          <span>{{ row.formalDate }}</span>
          <span
            v-show="isOverdue(row.formalDate)"
            class="isSelect"
          >逾期</span>
        </template>
        <!-- <template
          slot="probations"
          slot-scope="{ row }"
        >
          {{ row.probation === 0 ? '无试用期' : `${row.probation}个月` }}
        </template> -->

        <template
          slot="handler"
          slot-scope="{ row }"
        >
          <el-button
            v-show="!_.includes(['Pass', 'Approve'], row.approveStatus)"
            size="medium"
            type="text"
            @click="() => $refs.adjustEdit.init(row)"
          >
            调整试用期
          </el-button>
        </template>
      </common-table>
    </basic-container>
    <adjust-edit
      ref="adjustEdit"
      :visible.sync="adjustEditVisible"
      @submit="handleAdjustEditSubmit"
    />
  </div>
</template>

<script>
import 'moment/locale/zh-cn'
import { getOrgJob } from '@/api/personnel/roster'
import { getOrgTreeSimple } from '@/api/org/org'
import { getStaffList } from '@/api/personnel/person'
import { putProbation } from '@/api/personnel/person'
import moment from 'moment'
moment.locale('zh-cn')

const TABLE_COLUMNS = [
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
    label: '员工状态',
    prop: 'status',
    slot: true
  },
  {
    label: '转正申请状态',
    prop: 'approveStatus',
    slot: true,
    width: '120'
  },
  {
    label: '审批编号',
    prop: 'apprNo',
    slot: true,
    minWidth: '120px'
  },
  {
    label: '部门',
    prop: 'orgName',
    minWidth: '120px'
  },
  {
    label: '职务',
    prop: 'jobName',
    minWidth: '120px'
  },
  {
    label: '入职时间',
    prop: 'entryDate',
    minWidth: '120px'
  },
  {
    label: '转正日期',
    prop: 'formalDate',
    slot: true,
    minWidth: '120px'
  },
  {
    label: '试用期',
    prop: 'probation',
    slot: true
  }
]
const TABLE_CONFIG = {
  showHandler: true,
  showIndexColumn: false,
  enablePagination: true
}

const SEARCH_CONFIG = {
  requireOptions: [
    {
      type: 'input',
      field: 'search',
      label: '',
      config: {
        'suffix-icon': 'el-icon-search',
        placeholder: '姓名/工号'
      }
    }
  ],
  popoverOptions: [
    {
      type: 'treeSelect',
      field: 'orgs',
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
      config: { optionLabel: 'jobName', optionValue: 'jobId' },
      options: [],
      loading: false,
      noMore: false
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
      field: 'probations',
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
    }
  ]
}

const EMPLOYEE_STATUS_DICTS = [
  { dictKey: 'Try', dictValue: '试用期' },
  { dictKey: 'Formal', dictValue: '正式' },
  { dictKey: 'Leaved', dictValue: '已离职' },
  { dictKey: 'WaitLeave', dictValue: '待离职' }
]

const APPROVE_STATUS_DICTS = [
  {
    dictKey: '',
    dictValue: '未申请'
  },
  {
    dictKey: 'Approve',
    dictValue: '审批中'
  },
  {
    dictKey: 'Pass',
    dictValue: '已通过'
  },
  {
    dictKey: 'Reject',
    dictValue: '已拒绝'
  },
  {
    dictKey: 'Cancel',
    dictValue: '已撤回'
  }
]
const PROBATION_DICTS = [
  { dictValue: '无试用期', dictKey: '0' },
  { dictValue: '一个月', dictKey: '1' },
  { dictValue: '两个月', dictKey: '2' },
  { dictValue: '三个月', dictKey: '3' },
  { dictValue: '四个月', dictKey: '4' },
  { dictValue: '五个月', dictKey: '5' },
  { dictValue: '六个月', dictKey: '6' }
]

export default {
  name: 'Workerlist',
  filters: {
    // 过滤不可见的列
    columnsFilter: (columns, visibleColProps) =>
      _.filter(columns, ({ prop }) => _.includes(visibleColProps, prop))
  },
  components: {
    SearchPopover: () => import('@/components/searchPopOver'),
    AdjustEdit: () => import('@/views/personnel/administration/components/adjustEdit')
  },
  data() {
    return {
      tableLoading: false,
      searchConfig: SEARCH_CONFIG,
      adjustEditVisible: false,
      tableData: [],
      tableConfig: TABLE_CONFIG,
      tableColumns: TABLE_COLUMNS,
      columnsVisible: _.map(TABLE_COLUMNS, ({ prop }) => prop),
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      dictionary: {
        approveStatus: APPROVE_STATUS_DICTS,
        probation: PROBATION_DICTS,
        EmployeeStatus: EMPLOYEE_STATUS_DICTS
      }
    }
  },

  activated() {
    this.loadTableData()
  },

  created() {
    getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
      this.searchConfig.popoverOptions[0].config.treeParams.data = res
    })
    getOrgJob().then((res) => {
      this.searchConfig.popoverOptions[1].options = res
    })
  },
  methods: {
    handleSearch(searchParams) {
      // 对数据进行处理
      let params = _.pickBy(searchParams)
      _.each(params, (val, key) => {
        if (['orgs', 'jobs', 'probations'].includes(key)) {
          params[key] = [val]
        }
      })
      this.loadTableData(params)
    },

    refresh() {
      this.loadTableData()
    },

    handleAdjustEditSubmit(data) {
      putProbation(data)
        .then(() => {
          this.$message({ type: 'success', message: '提交成功' })
          this.$refs.adjustEdit.close()
        })
        .finally(() => {
          this.$refs.adjustEdit.submitting = false
          this.refresh()
        })
    },
    handleLinkNameClick(row) {
      this.$router.push('/personnel/detail/' + row.userId)
    },
    handleLinkWorkNoClick({ apprNo }) {
      this.$router.push({
        path: '/apprProcess/apprDetail',
        query: { formKey: 'UserFormalInfo', apprNo: apprNo }
      })
    },

    handleCurrentPageChange(page) {
      this.page.currentPage = page
      this.loadTableData()
    },
    handlePageSizeChange(pageSize) {
      this.page.size = pageSize
      this.loadTableData()
    },

    async loadTableData(params) {
      if (this.tableLoading) {
        return
      }
      try {
        this.tableLoading = true
        const page = {
          pageNo: this.page.currentPage,
          pageSize: this.page.size
        }
        const { data, totalNum } = await getStaffList(_.assign(null, page, params))
        this.tableData = data
        this.page.total = totalNum
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.tableLoading = false
      }
    },

    // 翻译字典
    translator({ value, dictKey, $config: config }) {
      if (!(dictKey = dictKey || _.get(config, 'dictKey'))) {
        return value
      }

      const dicts = this.dictionary[dictKey]
      // 如果字典为 undefined 时候加载字典
      if (!dicts) this.loadDictionary(dictKey)
      let result = value
      _.each(dicts, (item) => {
        if (item.dictKey === _.trim(value)) {
          result = item.dictValue
          return false
        }
      })
      return result
    },
    async loadDictionary(dictKey) {
      const dict = await this.$store.dispatch('CommonDict', dictKey)
      this.$set(this.dictionary, dictKey, dict)
      return dict
    },

    isOverdue: (date) => moment(date).isBefore(new Date())
  }
}
</script>

<style lang="scss" scoped>
/deep/ .edge {
  position: absolute;
  right: 59px;
  .el-button--text {
    color: #a0a8ae;
  }
}

.isSelect {
  color: #f56c6c;
  margin-left: 6px;
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
/deep/.refresh i {
  color: #a0a8ae;
  font-size: 16px;
  cursor: pointer;
  margin: 0 12px;
}
.Workerlist {
  height: 100%;
  .basic-container--block {
    min-height: calc(100% - 92px);
    height: 0;
  }
}
</style>

<style lang="sass" scoped>
$color_active: #368AFA
$color_danger: #ff6464
$color_icon: #A0A8AE
$color_hover: #207EFA

.Workerlist
  .table__link
    color: $color_active
    &:hover
      cursor: pointer
      color: $color_hover
  .operations
    align-items: center
    display: flex
    justify-content: space-between
    &__column--item
      height: 25px
    &__column--visible
      height: 200px
      overflow: scroll
    &__btns
      align-items: center
      display: flex
      height: 24px
      justify-content: flex-start
    &__btns--item
      margin: 0
      margin-right: 4px
      padding: 0
      height: 24px
      width: 24px
      line-height: 24px
      &:last-child
        margin: 0
      // margin-bottom: 8px
      // margin-right: 8px
    .iconfont
      color: $color_icon
      font-weight: bold
      font-size: 16px
  .font__color--danger
    color: $color_danger
    font-weight: bold
</style>

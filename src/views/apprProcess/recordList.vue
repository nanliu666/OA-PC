<template>
  <div class="Recordlist">
    <page-header title="审批记录" />
    <basic-container block>
      <common-table
        ref="table"
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
            <seach-popover
              :popover-options="searchConfigLocal.popoverOptions"
              :require-options="searchConfigLocal.requireOptions"
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

        <template
          v-for="dictName of ['status']"
          #[_.lowerFirst(dictName)]="{row}"
        >
          {{ translator({ dictKey: dictName, value: _.get(row, _.lowerFirst(dictName)) }) }}
        </template>

        <template #apprNo="{row}">
          <span
            class="table__link"
            @click="() => handleLinkApprNoClick(row)"
          >{{
            row.apprNo
          }}</span>
        </template>

        <template #approveUser="{row}">
          <span class="table__tags">
            <el-tag
              v-for="(tag, index) of row.approveUser"
              :key="index"
              size="small"
            >
              {{ tag.userName }}
            </el-tag>
          </span>
        </template>

        <template #handler="{row}">
          <el-button
            type="text"
            @click="() => handleViewBtnClick(row)"
          >
            查看
          </el-button>
        </template>
      </common-table>
    </basic-container>
  </div>
</template>

<script>
import { getRecordList, getProcessType } from '@/api/apprProcess/apprProcess'
import { getOrgTreeSimple } from '../../api/org/org'

const TABLE_COLUMNS = [
  // {
  //   prop: 'expand',
  //   type: 'expand',
  //   slot: true
  // },
  {
    label: '审批编号',
    prop: 'apprNo',
    slot: true,
    minWidth: 150
  },
  {
    label: '标题',
    prop: 'title',
    minWidth: 120
  },
  {
    label: '申请类型',
    prop: 'formKey',
    minWidth: 120
  },
  {
    label: '申请部门',
    prop: 'orgName',
    minWidth: 120
  },
  {
    label: '申请时间',
    prop: 'applyTime',
    minWidth: 120
  },
  {
    label: '完成时间',
    minWidth: 100,
    prop: 'completeTime'
  },
  {
    label: '当前状态',
    prop: 'status',
    slot: true
  },
  {
    label: '当前审批人',
    minWidth: 100,
    prop: 'approveUser',
    slot: true
  }
]

const TABLE_CONFIG = {
  rowKey: 'apprNo',
  showHandler: true,
  showIndexColumn: false,
  enablePagination: true,
  handlerColumn: {
    minWidth: 50
  }
}

const SEARCH_CONFIG = {
  requireOptions: [
    {
      type: 'input',
      field: 'search',
      label: '',
      data: '',
      config: {
        'suffix-icon': 'el-icon-search',
        placeholder: '审批编号、审批标题'
      }
    }
  ],
  popoverOptions: [
    {
      type: 'select',
      data: '',
      field: 'processId',
      label: '审批类型',
      arrField: 'positionId',
      config: { optionLabel: 'processName', optionValue: 'processId' },
      options: []
    },
    {
      type: 'select',
      data: '',
      field: 'status',
      label: '审批状态',
      arrField: 'positionId',
      config: { optionLabel: 'dictValue', optionValue: 'dictKey' },
      options: []
    },
    {
      type: 'treeSelect',
      field: 'orgId',
      label: '申请部门',
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
      type: 'dataPicker',
      data: '',
      label: '申请日期',
      field: 'beginApplyTime,endApplyTime',
      config: { type: 'daterange', 'range-separator': '至' }
    },
    {
      type: 'dataPicker',
      data: '',
      label: '完成日期',
      field: 'beginCompleteTime,endCompleteTime',
      config: { type: 'daterange', 'range-separator': '至' }
    }
  ]
}

// 当前状态字典
const STATUS_DICTS = [
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

export default {
  name: 'Recordlist',
  components: {
    SeachPopover: () => import(/* webpackChunkName: "views" */ '@/components/searchPopOver')
  },
  filters: {
    // 过滤不可见的列
    columnsFilter: (columns, visibleColProps) =>
      _.filter(columns, ({ prop }) => _.includes(visibleColProps, prop))
  },
  data() {
    return {
      columnsVisible: _.map(TABLE_COLUMNS, ({ prop }) => prop),
      menuEditVisible: false,
      parentId: '0',
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      searchConfigLocal: SEARCH_CONFIG,
      searchParams: null,
      tableColumns: TABLE_COLUMNS,
      tableConfig: TABLE_CONFIG,
      tableData: [],
      tableLoading: false,

      dictionary: {
        status: STATUS_DICTS
      }
    }
  },

  activated() {
    this.refresh()
  },
  mounted() {
    // searchConfig 加载数据
    let fieldProcessId = _.find(this.searchConfigLocal.popoverOptions, { field: 'processId' })
    let fieldStatus = _.find(this.searchConfigLocal.popoverOptions, { field: 'status' })
    let fieldOrgId = _.find(this.searchConfigLocal.popoverOptions, { field: 'orgId' })
    if (fieldProcessId) {
      getProcessType().then(
        (res) =>
          (fieldProcessId.options = _.concat(
            [
              {
                processId: '',
                processName: '全部'
              }
            ],
            res
          ))
      )
    }
    if (fieldStatus) {
      fieldStatus.options = _.concat(
        [
          {
            dictKey: '',
            dictValue: '全部'
          }
        ],
        STATUS_DICTS
      )
    }
    if (fieldOrgId) {
      getOrgTreeSimple({ parentOrgId: 0 }).then(
        (res) =>
          (fieldOrgId.config.treeParams.data = _.concat(
            [
              {
                orgName: '全部',
                orgId: ''
              }
            ],
            res
          ))
      )
    }
  },

  methods: {
    // 处理跳转
    handleLinkApprNoClick(row) {
      this.$router.push({
        path: '/apprProcess/apprDetail',
        query: { formId: row.formId, formKey: row.formKey, apprNo: row.apprNo }
      })
    },

    handleCurrentPageChange(page) {
      this.page.currentPage = page
      this.loadTableData()
    },
    handlePageSizeChange(pageSize) {
      this.page.pageSize = pageSize
      this.loadTableData()
    },
    handleSearch(searchParams) {
      this.searchParams = _.pickBy(searchParams)
      this.loadTableData()
    },
    handleViewBtnClick(row) {
      this.$router.push({
        path: '/approval/appr/apprDetail',
        query: { formId: row.formId, formKey: row.formKey, apprNo: row.apprNo }
      })
    },

    refresh() {
      this.loadTableData()
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
    async loadTableData() {
      if (this.tableLoading) {
        return
      }
      try {
        const params = this.searchParams
        this.tableLoading = true
        const page = {
          pageNo: this.page.currentPage,
          pageSize: this.page.pageSize
        }
        const { data, totalNum } = await getRecordList(_.assign(null, page, params))
        this.tableData = data
        this.page.total = totalNum
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.tableLoading = false
      }
    }
  }
}
</script>

<style lang="sass">
$color_active: #368AFA
$color_danger: #ff6464
$color_icon: #A0A8AE
$color_hover: #207EFA

.Recordlist
  height: 100%
  .basic-container--block
    height: 0
    min-height: calc( 100% - 92px )
  .table__link
    color: $color_active
    &:hover
      cursor: pointer
      color: $color_hover
  .table__tags
    >*
      margin-left: 1rem
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
  .expand
    &__label
      display: flex
      text-align: center
      font-size: 12px
      color: #a0a8ae
      margin: 0
      &:not(:last-child)
        border-right: 1px solid #ccc
</style>

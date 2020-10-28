<template>
  <div class="Recordlist">
    <page-header title="审批记录" />
    <basic-container block>
      <common-table
        id="demo"
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
              <el-button
                icon="el-icon-download"
                size="medium"
                style="margin-right: 10px"
                @click="exportAll()"
              >
                导出
              </el-button>
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
          slot="multiSelectMenu"
          slot-scope="{ selection }"
        >
          <span
            style="cursor: pointer;"
            @click="exportAll(selection)"
          >
            <i class="el-icon-download" />
            导出
          </span>
        </template>
        <template #status="{row}">
          <span
            class="status-span"
            :style="{
              color: statusToText(row.status).color,
              backgroundColor: statusToText(row.status).backgroundColor
            }"
            v-text="statusToText(row.status).text"
          />
        </template>

        <template #apprNo="{row}">
          <span
            class="table__link"
            @click="() => jumpToDetail(row)"
          >{{ row.apprNo }}</span>
        </template>

        <template #handler="{row}">
          <el-button
            type="text"
            @click="() => jumpToDetail(row)"
          >
            查看
          </el-button>
        </template>
      </common-table>
    </basic-container>
  </div>
</template>

<script>
import { STATUS_TO_TEXT, STATUS_DICTS } from '@/const/approve'
import { getRecordList, getProcessType, exportData } from '@/api/apprProcess/apprProcess'
import { getOrgTreeSimple } from '../../api/org/org'
import { mapGetters } from 'vuex'
const TABLE_COLUMNS = [
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
    prop: 'processName',
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
    formatter(record) {
      return record.approveUser.map((item) => item.userName).join('+')
    }
  }
]

const TABLE_CONFIG = {
  rowKey: 'apprNo',
  showHandler: true,
  showIndexColumn: false,
  enablePagination: true,
  enableMultiSelect: true,
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
      field: 'processKey',
      label: '审批类型',
      arrField: 'positionId',
      config: { optionLabel: 'processName', optionValue: 'processKey' },
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
      config: {
        type: 'datetimerange',
        'range-separator': '至',
        'value-format': 'yyyy-MM-dd HH:mm:ss'
      }
    },
    {
      type: 'dataPicker',
      data: '',
      label: '完成日期',
      field: 'beginCompleteTime,endCompleteTime',
      config: {
        type: 'datetimerange',
        'range-separator': '至',
        'value-format': 'yyyy-MM-dd HH:mm:ss'
      }
    }
  ]
}

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
  computed: {
    ...mapGetters(['userId'])
  },
  activated() {
    this.refresh()
  },
  mounted() {
    // searchConfig 加载数据
    let fieldProcessId = _.find(this.searchConfigLocal.popoverOptions, { field: 'processKey' })
    let fieldStatus = _.find(this.searchConfigLocal.popoverOptions, { field: 'status' })
    let fieldOrgId = _.find(this.searchConfigLocal.popoverOptions, { field: 'orgId' })
    if (fieldProcessId) {
      getProcessType().then(
        (res) =>
          (fieldProcessId.options = _.concat(
            [
              {
                processKey: '',
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
    async exportAll(selection) {
      if (!this.validateTable()) return
      let apprNo = ''
      if (selection) {
        let apprNoList = []
        selection.forEach((item) => {
          apprNoList.push(item.apprNo)
        })
        apprNo = apprNoList.join(',')
      }
      let type = await this.$confirm('请选择导出格式！', '提示', {
        confirmButtonText: '导出PDF',
        cancelButtonText: '导出Excel',
        distinguishCancelAndClose: true,
        center: true,
        type: 'warning'
      })
        .then(() => {
          return 'PDF'
        })
        .catch((action) => {
          return action === 'cancel' ? 'Excel' : ''
        })
      if (!type) return
      this.exportDataFun(apprNo, type)
    },
    exportDataFun(apprNo, type) {
      let params = {
        userId: this.userId,
        processKey: '',
        orgId: '',
        bizId: '',
        beginApplyTime: '',
        endApplyTime: '',
        status: '',
        beginCompleteTime: '',
        endCompleteTime: '',
        apprNo,
        type
      }
      if (this.searchParams) {
        params = _.assign(params, this.searchParams)
      }
      // TODO: 后续需要判断processKey、orgId、bizId等不能全为空，即为不能全量导出
      if (!this.validateExportParams(params)) return
      exportData(params).then(() => {})
    },
    // TODO: 返回二进制，转出Blob再创建a标签再下载
    downloadFile() {
      /** 创建下载链接 */
      const downloadHref = ''
      /** 创建a标签并为其添加属性 */
      let downloadLink = document.createElement('a')
      downloadLink.href = downloadHref
      downloadLink.download = '资产与3D视图模板.xlsx'
      /** 触发点击事件执行下载 */
      downloadLink.click()
      /** 下载完成进行释放 */
      window.URL.revokeObjectURL(downloadHref)
    },
    /**
     * 当列表无数据的时候，不许导出
     */
    validateTable() {
      if (_.isEmpty(this.tableData)) {
        this.$message.error('导出数据为空')
        return false
      } else {
        return true
      }
    },
    /**
     * 验证导出参数格式是否合格,暂时默认不需要做处理，先写了个空壳
     */
    validateExportParams(params) {
      return params
    },
    statusToText(status) {
      return STATUS_TO_TEXT[status]
    },
    // 处理跳转
    jumpToDetail(row) {
      this.$router.push({
        path: '/apprProcess/apprDetail',
        query: { formId: row.formId, formKey: row.formKey, apprNo: row.apprNo, preview: true }
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
    handleSearch(searchParams) {
      this.searchParams = _.pickBy(searchParams)
      this.page.currentPage = 1
      this.loadTableData()
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
          pageSize: this.page.size
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
.export-button
  cursor: pointer
.Recordlist
  height: 100%
  .basic-container--block
    height: 0
    min-height: calc( 100% - 92px )
  .status-span
    padding: 4px;
    border-radius: 2px
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

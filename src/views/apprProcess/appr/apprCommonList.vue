<template>
  <div class="Menu fill">
    <page-header :title="typeConfig[type].title" />
    <basic-container block>
      <common-table
        ref="table"
        :columns="columnsFilter(columnsVisible)"
        :config="tableConfig"
        :data="tableData"
        :loading="tableLoading"
        :page-config="tablePageConfig"
        :page="page"
        @current-page-change="handleCurrentPageChange"
        @page-size-change="handlePageSizeChange"
      >
        <template #topMenu>
          <div class="operations">
            <SearchPopover
              ref="searchPopover"
              :popover-options="searchPopoverConfig.popoverOptions"
              :require-options="searchPopoverConfig.requireOptions"
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
                  @click="refreshTableData"
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
                    @click="refreshTableData"
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
        <!-- 编号列 -->
        <template
          slot="apprNo"
          slot-scope="{ row }"
        >
          <el-button
            type="text"
            @click="jumpApprDetail(row)"
          >
            {{ row.apprNo }}
          </el-button>
        </template>
        <!-- 状态列 -->
        <template
          v-if="row.status"
          slot="status"
          slot-scope="{ row }"
        >
          <span
            class="status-span"
            :style="{
              color: statusToText(row.status).color,
              backgroundColor: statusToText(row.status).backgroundColor
            }"
            v-text="statusToText(row.status).text"
          />
        </template>
        <!-- 当前审批人 -->
        <template
          v-if="row.status"
          slot="approveUser"
          slot-scope="{ row }"
        >
          <span v-text="getApproveUser(row.approveUser)" />
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
      </common-table>
    </basic-container>
  </div>
</template>

<script>
import {
  getProcessTypeList,
  getHasApproveList,
  getMyApproveList,
  getCopyApproveList,
  getWaitApproveList,
  exportData
} from '@/api/apprProcess/apprProcess'
import { getOrgTreeSimple } from '@/api/org/org'
import { mapGetters } from 'vuex'
import SearchPopover from '@/components/searchPopOver/index'
import { STATUS_TO_TEXT } from '@/const/approve'
const TYPE_CONFIG = {
  apprByMe: {
    title: '我发起的',
    loadFun: getMyApproveList
  },
  copyApprToMe: {
    title: '抄送我的',
    loadFun: getCopyApproveList
  },
  hasAppr: {
    title: '我已审批',
    loadFun: getHasApproveList
  },
  waitAppr: {
    title: '待我审批',
    loadFun: getWaitApproveList
  }
}
// 表格属性
let TABLE_COLUMNS = [
  {
    label: '审批编号',
    width: 150,
    slot: true,
    prop: 'apprNo'
  },
  {
    label: '标题',
    minWidth: 100,
    prop: 'title'
  },
  {
    label: '审批类型',
    prop: 'processName',
    minWidth: 100
  },
  {
    label: '申请部门',
    prop: 'orgName',
    minWidth: 100
  },
  {
    label: '申请时间',
    prop: 'applyTime',
    minWidth: 100
  },
  {
    label: '完成时间',
    prop: 'completeTime',
    minWidth: 100
  },
  {
    label: '当前状态',
    slot: true,
    prop: 'status',
    minWidth: 100
  }
]
const APPROVE_PERSON = [
  {
    label: '当前审批人',
    slot: true,
    prop: 'approveUser',
    minWidth: 100
  }
]
const TABLE_CONFIG = {
  enablePagination: true,
  enableMultiSelect: true,
  showIndexColumn: false,
  showHandler: true,
  rowKey: 'apprNo',
  treeProps: { hasChildren: 'hasChildren', children: 'children' }
}
const TABLE_PAGE_CONFIG = {}

// 搜索配置
const SEARCH_POPOVER_REQUIRE_OPTIONS = [
  {
    config: { placeholder: '审批编号、审批标题', 'suffix-icon': 'el-icon-search' },
    data: '',
    field: 'search',
    label: '',
    type: 'input'
  }
]
let SEARCH_POPOVER_POPOVER_OPTIONS = [
  {
    data: '',
    field: 'processId',
    label: '审批类型',
    type: 'select',
    options: [],
    config: { optionLabel: 'processName', optionValue: 'processKey' }
  },
  {
    type: 'treeSelect',
    field: 'orgId',
    label: '用人部门',
    data: '',
    config: {
      selectParams: {
        placeholder: '请选择用人部门',
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
    data: '',
    label: '申请时间',
    type: 'dataPicker',
    field: 'beginApplyTime,endApplyTime',
    config: { type: 'daterange', 'range-separator': '至' }
  }
]
let SEARCH_POPOVER_CONFIG = {
  popoverOptions: SEARCH_POPOVER_POPOVER_OPTIONS,
  requireOptions: SEARCH_POPOVER_REQUIRE_OPTIONS
}

export default {
  name: 'ApprCommonList',
  components: {
    SearchPopover
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      typeConfig: TYPE_CONFIG,
      tableColumns: [],
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      // 请求参数
      queryInfo: {
        pageNo: 1,
        pageSize: 10,
        search: '',
        formKey: '',
        orgId: '',
        beginApplyTime: '',
        endApplyTime: '',
        userId: ''
      },
      searchPopoverConfig: SEARCH_POPOVER_CONFIG,
      query: {},
      tableConfig: TABLE_CONFIG,
      tableData: [],
      tableLoading: false,
      tablePageConfig: TABLE_PAGE_CONFIG
    }
  },
  computed: {
    ...mapGetters(['userId']),
    // 默认选中所有列
    columnsVisible() {
      return _.map(this.tableColumns, ({ prop }) => prop)
    }
  },
  activated() {
    this.refreshTableData()
  },
  created() {
    this.tableColumns =
      this.type === 'waitAppr' ? TABLE_COLUMNS : [...TABLE_COLUMNS, ...APPROVE_PERSON]
    this.initData()
    this.refreshTableData()
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
        distinguishCancelAndClose: true,
        cancelButtonText: '导出Excel',
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
    // 过滤不可见的列
    columnsFilter(visibleColProps) {
      return _.filter(this.tableColumns, ({ prop }) => _.includes(visibleColProps, prop))
    },
    /**
     * 初始化数据
     */
    initData() {
      this.getOrgTree()
      this.getApprType()
    },
    /**
     * 获取用人部门
     */
    getOrgTree() {
      getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
        this.searchPopoverConfig.popoverOptions[1].config.treeParams.data = res
        this.$refs['searchPopover'].treeDataUpdateFun(res, 'orgId')
      })
    },
    /**
     * 获取审批类型
     */
    getApprType() {
      getProcessTypeList().then((res) => {
        this.searchPopoverConfig.popoverOptions[0].options = res
      })
    },
    /**
     * 获取用户姓名列表
     */
    getApproveUser(data) {
      let nameList = []
      data.map((item) => {
        nameList.push(item.userName)
      })
      return nameList.join('+')
    },
    /**
     * 英文状态对应中文字段
     */
    statusToText(status) {
      return STATUS_TO_TEXT[status]
    },
    /**
     * 处理页码改变
     */
    handleCurrentPageChange(param) {
      this.queryInfo.pageNo = param
      this.loadTableData()
    },
    /**
     * 处理页码大小更改
     */
    handlePageSizeChange(param) {
      this.queryInfo.pageSize = param
      this.loadTableData()
    },
    /**
     * 搜索
     */
    handleSearch(searchParams) {
      for (let i in searchParams) {
        this.queryInfo[i] = searchParams[i]
      }
      this.loadTableData()
    },
    // 跳去审批详情
    jumpApprDetail({ apprNo, formKey }) {
      this.$router.push({
        path: '/apprProcess/apprDetail',
        query: { apprNo, formKey }
      })
    },
    // 刷新列表数据
    refreshTableData() {
      //  因为只加载了最外层的数据，children仍然是旧的，清空数据
      this.tableData = []
      this.loadTableData()
    },

    // 加载表格数据
    // TODO: 分页还未实现
    async loadTableData() {
      if (this.tableLoading) return
      this.tableLoading = true
      try {
        this.queryInfo.userId = this.userId
        let loadFun = this.typeConfig[this.type].loadFun
        let { totalNum, data } = await loadFun(this.queryInfo)
        this.tableData = data
        this.page.total = totalNum
      } catch (error) {
        window.console.log(error)
      } finally {
        this.tableLoading = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
$color_icon: #A0A8AE
.status-span
    padding: 4px;
    border-radius: 2px;
.basic-container--block
  height: calc(100% - 92px)
  min-height: calc(100% - 92px)
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

.Menu
  // 添加一个分隔号 "｜"
  .table__handler
    display: flex
    justify-content: flex-end
    > .el-button--text
      text-align: center
      padding: 0 8px
      margin-left: 0px
      position: relative
      &:not(:last-child)::after
        background-color: #e3e7e9
        content: ''
        height: 10px
        position: absolute
        right: 0
        top: 50%
        transform: translateY(-50%)
        width: 1px
</style>

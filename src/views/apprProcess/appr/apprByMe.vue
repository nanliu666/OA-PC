<template>
  <div class="Menu fill">
    <page-header title="我发起的" />
    <basic-container block>
      <common-table
        ref="table"
        :columns="columnsVisible | columnsFilter"
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
                    @click="loadTableData"
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
          <div
            class="ellipsis"
            style="color: #207EFA; cursor:pointer"
            @click="jumpApprDetail(row)"
          >
            {{ row.apprNo }}
          </div>
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
          slot="approveUser"
          slot-scope="{ row }"
        >
          <span v-text="getApproveUser(row.approveUser)" />
        </template>
      </common-table>
    </basic-container>
  </div>
</template>

<script>
import { getCategoryList, getMyApproveList } from '@/api/apprProcess/apprProcess'
// import moment from 'moment'
import { getOrgTreeSimple } from '@/api/org/org'
import { mapGetters } from 'vuex'
import SearchPopover from '@/components/searchPopOver/index'

// 表格属性
const TABLE_COLUMNS = [
  {
    label: '审批编号',
    minWidth: 100,
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
  },
  {
    label: '当前审批人',
    slot: true,
    prop: 'approveUser',
    minWidth: 100
  }
]
const TABLE_CONFIG = {
  enablePagination: true,
  showIndexColumn: false,
  rowKey: 'menuId',
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
    config: { optionLabel: 'name', optionValue: 'id' }
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
// 状态配置
const STATUS_TO_TEXT = {
  Approve: {
    text: '审批中',
    color: '#4d84f4',
    backgroundColor: '#ecf3ff'
  },
  Pass: {
    text: '已通过',
    color: '#52c300',
    backgroundColor: '#eaf9e7'
  },
  Reject: {
    text: '已拒绝',
    color: '#e2393e',
    backgroundColor: '#f7e7e7'
  },
  Corvidae: {
    text: '待完善',
    color: '#c124ff',
    backgroundColor: '#f6deff'
  },
  Cancel: {
    text: '已撤回',
    color: '#999999',
    backgroundColor: '#d9d9d9'
  }
}

export default {
  name: 'ApprByMe',
  components: {
    SearchPopover
  },
  filters: {
    // 过滤不可见的列
    columnsFilter: (visibleColProps) =>
      _.filter(TABLE_COLUMNS, ({ prop }) => _.includes(visibleColProps, prop))
  },
  data() {
    return {
      // 默认选中所有列
      columnsVisible: _.map(TABLE_COLUMNS, ({ prop }) => prop),
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
      tableColumns: TABLE_COLUMNS,
      tableConfig: TABLE_CONFIG,
      tableData: [],
      tableLoading: false,
      tablePageConfig: TABLE_PAGE_CONFIG
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.initData()
    this.refreshTableData()
  },
  activated() {
    this.refreshTableData()
  },
  methods: {
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
        this.searchPopoverConfig.popoverOptions[1].config.treeParams.data.push(...res)
        this.$refs['searchPopover'].treeDataUpdateFun(res, 'orgId')
      })
    },
    /**
     * 获取审批类型
     */
    getApprType() {
      getCategoryList().then((res) => {
        this.searchPopoverConfig.popoverOptions[0].options = res
      })
    },
    /**
     * 获取用户姓名列表
     */
    getApproveUser(data) {
      if (!Array.isArray(data)) return
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
        // window.console.log(moment(searchParams[i]).unix())
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
    async loadTableData() {
      if (this.tableLoading) return
      this.tableLoading = true
      try {
        this.queryInfo.userId = this.userId
        // window.console.log('列表参数==', this.queryInfo)
        let { totalNum, data } = await getMyApproveList(this.queryInfo)
        // window.console.log('列表数据data==', data)
        this.tableData = data
        this.page.total = totalNum
      } catch (error) {
        // window.console.log(error)
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

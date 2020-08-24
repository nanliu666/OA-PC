<template>
  <div class="Menu fill">
    <page-header title="公告管理">
      <template slot="rightMenu">
        <el-button
          size="medium"
          @click="toPublished"
        >
          已发布的
        </el-button>
        <el-button
          size="medium"
          @click="toDrafts"
        >
          草稿箱
        </el-button>
        <el-button
          type="primary"
          size="medium"
          @click="toPubulishNotice"
        >
          发布公告
        </el-button>
      </template>
    </page-header>
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
        <!-- <template
          slot="multiSelectMenu"
          slot-scope="{ selection }"
        >
          <el-button
            type="text"
            @click="handleSelectionClick(selection)"
          >
            删除
          </el-button>
        </template> -->
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
                  @click="loadTableData"
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
          slot="title"
          slot-scope="{ row }"
        >
          <div
            type="text"
            class="ellipsis"
            style="color: #207EFA; cursor:pointer"
            @click="jumpDetail(row)"
          >
            {{ row.title }}
          </div>
        </template>
        <template
          slot="handler"
          slot-scope="scope"
        >
          <el-button
            type="text"
            size="medium"
            @click.stop="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </common-table>
    </basic-container>
  </div>
</template>

<script>
import { getNoticeList, delNoticeList } from '@/api/noticeCenter/noticeCenter'
import SearchPopover from '@/components/searchPopOver/index'
import { getWorklist } from '@/api/personnel/selectedPerson'

// 表格属性
const TABLE_COLUMNS = [
  {
    label: '公告标题',
    minWidth: 150,
    slot: true,
    prop: 'title'
  },
  {
    label: '发表人',
    prop: 'publishUserName',
    maxWidth: 100
  },
  {
    label: '发布时间',
    prop: 'publishTime',
    minWidth: 100
  },
  {
    label: '阅读量',
    prop: 'readNum',
    minWidth: 100
  }
]
const TABLE_CONFIG = {
  enablePagination: true,
  showHandler: true,
  // enableMultiSelect: true,
  // showIndexColumn: true,
  rowKey: 'id',
  treeProps: { hasChildren: 'hasChildren', children: 'children' }
}
const TABLE_PAGE_CONFIG = {}

// 搜索配置
const SEARCH_POPOVER_REQUIRE_OPTIONS = [
  {
    config: { placeholder: '公告标题', 'suffix-icon': 'el-icon-search' },
    data: '',
    field: 'search',
    label: '',
    type: 'input'
  }
]
let SEARCH_POPOVER_POPOVER_OPTIONS = [
  {
    data: '',
    field: 'publishUserId',
    label: '发布人',
    type: 'lazySelect',
    optionList: [],
    placeholder: '请选择发布人',
    optionProps: {
      formatter: (item) => `${item.name}(${item.workNo})`,
      key: 'userId',
      value: 'userId'
    },
    load: (params) => {
      return getWorklist(params)
    },
    config: { optionLabel: 'name', optionValue: 'id' }
  },
  {
    data: '',
    label: '发布日期',
    type: 'dataPicker',
    field: 'beginPublishTime,endPublishTime',
    config: { type: 'daterange', 'range-separator': '至' }
  }
]
let SEARCH_POPOVER_CONFIG = {
  popoverOptions: SEARCH_POPOVER_POPOVER_OPTIONS,
  requireOptions: SEARCH_POPOVER_REQUIRE_OPTIONS
}
export default {
  name: 'NoticeManage',
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
        title: '',
        publishUserId: '',
        beginPublishTime: '',
        endPublishTime: '',
        status: 'Published'
      },
      searchPopoverConfig: SEARCH_POPOVER_CONFIG,
      tableColumns: TABLE_COLUMNS,
      tableConfig: TABLE_CONFIG,
      tableData: [],
      tableLoading: false,
      tablePageConfig: TABLE_PAGE_CONFIG
    }
  },
  activated() {
    this.refreshTableData()
  },
  methods: {
    // handleSelectionClick(selection) {
    //   console.log('selection:', selection)
    // },
    toPubulishNotice() {
      this.$store.commit('SET_NOTICE', '')
      this.$router.push({
        path: '/noticeCenter/noticeEdit'
      })
    },
    toPublished() {
      this.$router.push({
        path: '/noticeCenter/noticePubulishList'
      })
    },
    toDrafts() {
      this.$router.push({
        path: '/noticeCenter/noticeDrafts'
      })
    },
    handleDelete(data) {
      let that = this
      this.$confirm('是否删除公告', '删除提示', {
        confirmButtonText: '删除',
        cancelButtonText: '不删除',
        type: 'warning'
      })
        .then(() => {
          that.delFun(data)
        })
        .catch(() => {
          that.$message({
            type: 'info',
            message: '已取消！'
          })
        })
    },
    delFun(data) {
      delNoticeList({ id: data.id }).then(() => {
        this.$message.success('删除成功')
        // 删除完成后更新视图
        // this.$refs.table.clearSelection()
        this.loadTableData()
      })
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
    // 跳去详情
    jumpDetail({ id }) {
      this.$router.push({
        path: '/noticeCenter/noticeDetail',
        query: { id }
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
        let { totalNum, data } = await getNoticeList(this.queryInfo)
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

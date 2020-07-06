<template>
  <div class="Menu fill">
    <page-header title="菜单管理">
      <el-button
        slot="rightMenu"
        size="medium"
        type="primary"
        @click="handleMenuAddBtnClick"
      >
        添加菜单
      </el-button>
    </page-header>

    <basic-container block>
      <common-table
        ref="table"
        :columns="columnVisible | columnsFilter"
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
            <seach-popover
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
                    @click="getTableList"
                  >
                    <i class="iconfont iconicon_setting" />
                  </el-button>
                </el-tooltip>

                <!-- 设置表格列可见性 -->
                <div class="operations__column--visible">
                  <el-checkbox-group v-model="columnVisible">
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

        <template #multiSelectMenu="{ selection }">
          <el-button
            style="margin-bottom:0;"
            type="text"
            @click="() => handleRemoveItems(selection)"
          >
            批量删除
          </el-button>
        </template>

        <template #icon="{row}">
          <i :class="_.get(row, 'icon', '')" />
        </template>

        <template #handler="{row}">
          <div class="table__handler">
            <el-button
              size="medium"
              type="text"
              @click.stop="() => handleMenuEditBtnClick(row)"
            >
              编辑
            </el-button>
            <el-button
              size="medium"
              type="text"
              @click.stop="() => handleRemoveItems([row])"
            >
              删除子项
            </el-button>
            <el-button
              size="medium"
              type="text"
              @click.stop="() => handleMenuItemAddBtnClick(row)"
            >
              新增子项
            </el-button>
          </div>
        </template>
      </common-table>
    </basic-container>

    <!-- 添加/编辑 菜单弹窗 -->
    <menu-edit
      ref="menuEdit"
      :visible.sync="menuEditVisible"
      v-on="{
        submitAdd: (query) => handleMenuEditSubmit({ query, type: 'add' }),
        submitAddItem: (query) => handleMenuEditSubmit({ query, type: 'addItem' }),
        submitEdit: (query) => handleMenuEditSubmit({ query, type: 'edit' })
      }"
    />
  </div>
</template>

<script>
import { deleteMenuInfo, getMenuInfo, postMenuInfo, putMenuInfo } from '@/api/system/menu'

// 表格属性
const TABLE_COLUMS = [
  {
    label: '菜单名称',
    minWidth: 150,
    prop: 'name'
  },
  {
    label: '请求地址',
    minWidth: 150,
    prop: 'path'
  },
  // {
  //   label: '上级菜单',
  //   prop: 'parentId',
  //   width: 150
  // },
  {
    label: '菜单图标',
    prop: 'icon',
    slot: true,
    width: 150
  },
  {
    label: '菜单编号',
    prop: 'code',
    width: 150
  },
  {
    // 格式化菜单类型
    formatter: (row, column, text = '') => {
      switch (text) {
        case 'Dir':
          text = '目录'
          break
        case 'Menu':
          text = '菜单'
          break
        case 'Button':
          text = '按钮'
          break
        default:
      }
      return text
    },
    label: '菜单类型',
    prop: 'menuType',
    width: 150
  },
  {
    label: '菜单别名',
    prop: 'alias',
    width: 150
  },
  {
    formatter: (row, column, text = '') => {
      switch (text) {
        case 0:
          text = '隐藏'
          break
        case 1:
          text = '显示'
          break
        default:
      }
      return text
    },
    label: '是否展示',
    prop: 'isShow',
    width: 150
  },
  {
    label: '菜单排序',
    prop: 'sort',
    width: 80
  },
  {
    label: '菜单备注',
    prop: 'remark',
    width: 150
  }
  // {
  //   formatter: (row, column, text = '') => {
  //     switch (text) {
  //       case 'VALID':
  //         text = '有效'
  //         break
  //       case 'INVALID':
  //         text = '失效'
  //         break
  //       default:
  //     }
  //     return text
  //   },
  //   label: '状态',
  //   prop: 'status',
  //   width: 150
  // }
]
const TABLE_CONFIG = {
  handlerColumn: {
    width: 200
  },
  enableMultiSelect: true,
  enablePagination: true,
  showHandler: true,
  showIndexColumn: false,

  // 树形结构懒加载
  lazy: true,
  load: async (row, treeNode, resolve) => {
    try {
      let items = await getMenuInfo(row.menuId)
      resolve(_.map(items, (i) => ({ ...i, hasChildren: true })))
    } catch (err) {
      resolve([])
    }
  },
  rowKey: 'menuId',
  treeProps: { hasChildren: 'hasChildren', children: 'children' }
}
const TABLE_PAGE_CONFIG = {}

// 搜索配置
const SEARCH_POPOVER_REQUIRE_OPTIONS = [
  {
    config: { placeholder: '请输入菜单名称', 'suffix-icon': 'el-icon-search' },
    data: '',
    field: 'name',
    label: '',
    type: 'input'
  }
]
const SEARCH_POPOVER_POPOVER_OPTIONS = [
  {
    config: { placeholder: '请输入菜单编号' },
    data: '',
    field: 'code',
    label: '菜单编号',
    type: 'input'
  },
  {
    config: { placeholder: '请输入菜单别名' },
    data: '',
    field: 'alias',
    label: '菜单别名',
    type: 'input'
  }
]
const SEARCH_POPOVER_CONFIG = {
  popoverOptions: SEARCH_POPOVER_POPOVER_OPTIONS,
  requireOptions: SEARCH_POPOVER_REQUIRE_OPTIONS
}

export default {
  components: {
    MenuEdit: () => import(/* webpackChunkName: "views" */ './components/menuEdit'),
    SeachPopover: () => import(/* webpackChunkName: "views" */ '@/components/searchPopOver')
  },
  filters: {
    // 过滤不可见的列
    columnsFilter: (visibleColProps) =>
      _.filter(TABLE_COLUMS, ({ prop }) => _.includes(visibleColProps, prop))
  },
  data() {
    return {
      // 默认选中所有列
      columnVisible: _.map(TABLE_COLUMS, ({ prop }) => prop),
      menuEditVisible: false,
      parentId: '0',
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      searchPopoverConfig: SEARCH_POPOVER_CONFIG,
      query: {},
      tableColumns: TABLE_COLUMS,
      tableConfig: TABLE_CONFIG,
      tableData: [],
      tableLoading: false,
      tablePageConfig: TABLE_PAGE_CONFIG
    }
  },
  created() {
    this.refreshTableData()
  },
  methods: {
    // 获取表格数据
    getTableList() {},
    //  处理页码改变
    handleCurrentPageChange() {},
    handlePageSizeChange() {},

    handleSearch(searchParams) {
      this.loadTableData(_.pickBy(searchParams))
    },

    handleRemoveItems(selection) {
      this.$confirm('确定将选择数据删除?', {
        type: 'warning'
      })
        .then(() => deleteMenuInfo(_.map(selection, ({ menuId }) => menuId).join(',')))
        .then(() => {
          // 删除完成后更新视图
          this.$refs.table.clearSelection()
          this.refreshTableData()
        })
    },
    // 点击添加菜单按钮
    handleMenuAddBtnClick() {
      this.$refs.menuEdit.init()
    },
    // 添加子菜单
    handleMenuItemAddBtnClick({ menuId }) {
      this.$refs.menuEdit.init({ parentId: menuId })
    },

    // 点击菜单编辑按钮
    handleMenuEditBtnClick(row) {
      this.$refs.menuEdit.init(row)
    },

    // 表单弹窗提交
    handleMenuEditSubmit({ query, type }) {
      const menuEdit = this.$refs.menuEdit
      let api = null
      switch (type) {
        case 'add': // 与case "addItem": 处理相同
        case 'addItem':
          api = postMenuInfo
          break
        case 'edit':
          api = putMenuInfo
          break
        default:
          return
      }
      menuEdit.loading = true
      api(_.set(query, 'status', true))
        .then(() => {
          this.$message.success('操作成功!')
          this.refreshTableData()
          this.$refs.menuEdit.close()
        })
        .catch((err) => {
          window.console.log(err)
        })
        .finally(() => (menuEdit.loading = false))
    },

    // 刷新列表数据
    refreshTableData() {
      //  因为只加载了最外层的数据，children仍然是旧的，清空数据
      this.tableData = []
      this.loadTableData({ parentId: '0' })
    },

    // 加载表格数据
    // TODO: 分页还未实现
    async loadTableData(param = {}, page) {
      if (this.tableLoading) {
        return
      }
      this.tableLoading = true
      try {
        const query = _.assign(null, _.omit(param, 'parentId'), page)
        const tableData = await getMenuInfo(param.parentId || '0', query)
        this.tableData = _.map(tableData, (t) => ({
          children: [],
          hasChildren: true,
          ...t
        }))
        // 更新分页器数据
        this.page.total = _.size(tableData)
      } catch (error) {
        window.console.log(error)
      } finally {
        this.tableLoading = false
      }
    }
  }
}
</script>

<style lang="sass" scope>
$color_icon: #A0A8AE

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

// 添加一个分隔号 "｜"
.table__handler
  display: flex
  justify-content: flex-end
  > .el-button--text
    text-align: center
    padding: 0 8px
    margin-left: 0px
    position: relative
    &::after
      content: ''
      width: 1px
      height: 10px
      background-color: #e3e7e9
      position: absolute
      top: 50%
      right: 0
      transform: translateY(-50%)
</style>

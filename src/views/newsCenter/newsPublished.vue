<template>
  <div class="NewsPublished">
    <page-header
      title="已发布的"
      show-back
      :back="() => handleBack()"
    />

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
              :popover-options="searchConfig.popoverOptions"
              :require-options="searchConfig.requireOptions"
              @submit="(params) => handleSearch(params)"
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
                  @click="() => refresh()"
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

        <!-- <template #multiSelectMenu="{ selection }">
          <el-button
            style="margin-bottom:0;"
            type="text"
            @click="() => handleRemoveItems(selection)"
          >
            批量删除
          </el-button>
        </template> -->
        <!-- 编号列 -->
        <template #title="{ row }">
          <span
            class="table__link"
            @click="() => handleItemLinkClick(row)"
          >
            {{ row.title }}
          </span>
        </template>
        <template #handler="{row}">
          <div class="table__handler">
            <!-- 已发布的新闻页面,不支持置顶,置顶功能在新闻管理页面(参考低保真) -->
            <!-- <el-tooltip
              :content="`${row.isTop ? '已' : ''}置顶`"
              effect="dark"
              placement="top"
            >
              <el-button
                type="text"
                size="medium"
                @click="() => handleTopItemBtnClick(row)"
              >
                <i
                  class="icon-topping-outlined"
                  :class="{ 'font__color--active': row.isTop }"
                />
              </el-button>
            </el-tooltip> -->
            <el-tooltip
              content="编辑"
              effect="dark"
              placement="top"
            >
              <el-button
                type="text"
                size="medium"
                @click="() => handleEditItemBtnClick(row)"
              >
                <i class="icon-basics-edit-outlined" />
              </el-button>
            </el-tooltip>
            <el-tooltip
              content="删除"
              effect="dark"
              placement="top"
            >
              <el-button
                type="text"
                size="medium"
                @click="() => handleRemoveItemBtnClick(row)"
              >
                <i class="icon-basics-delete-outlined" />
              </el-button>
            </el-tooltip>
          </div>
        </template>
      </common-table>
    </basic-container>
  </div>
</template>

<script>
import {
  getV1News,
  delV1News,
  postNewsPublish,
  postNewsTop,
  getPublishUser
} from '@/api/newsCenter/newCenter'
// 2020-09-18: 使用新闻发布人查询接口代替在职员工接口
// import { getWorklist } from '@/api/personnel/selectedPerson'
import { mapGetters } from 'vuex'
import SearchPopover from '@/components/searchPopOver/index'

const ENUMS_STATUS = {
  Published: 'Published',
  Draft: 'Draft'
}

// 表格属性
const TABLE_COLUMNS = [
  {
    label: '编号',
    type: 'index',
    width: 100
  },
  {
    label: '新闻标题',
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
    label: '创建时间',
    prop: 'createTime',
    minWidth: 100
  },
  {
    label: '阅读量',
    prop: 'readNum',
    minWidth: 100
  }
]

const TABLE_PAGE_CONFIG = {}
const TABLE_CONFIG = {
  enablePagination: true,
  showHandler: true,
  handlerColumn: {
    width: 150
  },
  enableMultiSelect: false,
  rowKey: 'id',
  treeProps: { hasChildren: 'hasChildren', children: 'children' }
}

const SEARCH_CONFIG = {
  popoverOptions: [
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
        return getPublishUser(params)
      },
      config: { optionLabel: 'name', optionValue: 'id' }
    },
    {
      data: '',
      label: '发布日期',
      type: 'dataPicker',
      // TODO: 列表现在使用的是创建时间,但是查询使用的还是发布时间(api文档没有对此更新)
      field: 'beginPublishTime,endPublishTime',
      config: { type: 'daterange', 'range-separator': '至' }
    }
  ],
  requireOptions: [
    {
      config: { placeholder: '新闻标题', 'suffix-icon': 'el-icon-search' },
      data: '',
      field: 'title',
      label: '',
      type: 'input'
    }
  ]
}

export default {
  name: 'NewsPublished',
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
      sidebarLoading: false,
      searchConfig: SEARCH_CONFIG,
      searchParams: {},
      tableData: [],
      tableLoading: false,
      tablePageConfig: TABLE_PAGE_CONFIG
    }
  },

  computed: {
    tableColumns: () => TABLE_COLUMNS,
    tableConfig: () => TABLE_CONFIG,

    ...mapGetters(['userId', 'tag'])
  },

  created() {
    this.refresh().then(() => {
      // 在数据加载可以完成之后设置searchParams.categoryId的默认值
      // this.$set(this.searchParams, 'categoryId', null)
    })
  },

  methods: {
    // toggle isTop handler
    handleTopItemBtnClick({ id, isTop, title }) {
      const ACTION_NAME = `${isTop ? '取消' : ''}置顶`
      this.$confirm(`确认${ACTION_NAME}标题为《${title}》的新闻吗？`, {
        title: `是否${ACTION_NAME}新闻`,
        type: 'info'
      }).then(async () => {
        try {
          this.tableLoading = true
          await postNewsTop({ id, isTop: isTop ^ 1 })
          this.$message.success(ACTION_NAME + '成功')
        } catch (error) {
          this.$message.error(error.message)
        } finally {
          this.tableLoading = false
          this.refresh()
        }
      })
    },
    handlePublishBtnClick() {
      this.$router.push({
        path: '/newsCenter/newsEdit'
      })
    },
    handlePublishedBtnClick() {
      this.$router.push({
        path: '/newsCenter/newsPubulishList'
      })
    },
    handleDraftBtnClick() {
      this.$router.push({
        path: '/newsCenter/newsDrafts'
      })
    },

    handleEditItemBtnClick({ id }) {
      this.$router.push({
        path: '/newsCenter/newsEdit',
        query: { id }
      })
    },

    handlePublishItemBtnClick({ id, title }) {
      const userId = this.userId
      this.$confirm(`确认发布标题为《${title}》的新闻草稿吗？`, {
        title: '是否发布新闻',
        type: 'info'
      }).then(async () => {
        try {
          this.tableLoading = true
          await postNewsPublish({ id, userId })
          this.$message.success('发布成功')
        } catch (error) {
          this.$message.error(error.message)
        } finally {
          this.tableLoading = false
          this.refresh()
        }
      })
    },
    handleRemoveItemBtnClick({ id, title }) {
      this.$confirm(`确认删除标题为《${title}》的新闻草稿吗？`, {
        title: '是否删除新闻',
        type: 'warning'
      }).then(async () => {
        try {
          this.tableLoading = true
          await delV1News({ id })
          this.$message.success('删除成功')
        } catch (error) {
          this.$message.error(error.message)
        } finally {
          this.tableLoading = false
          this.refresh()
        }
      })
    },
    // handleRemoveItems(selection) {
    //   // TODO: 暂时不支持批量删除
    // },
    handleCurrentPageChange(param) {
      this.page.currentPage = param
      this.loadTableData()
    },
    handlePageSizeChange(param) {
      this.page.pageSize = param
      this.loadTableData()
    },
    handleSearch(searchParams) {
      // 查询的时候重置页码为1
      this.page.currentPage = 1
      this.searchParams = _.pickBy(searchParams)
      this.loadTableData()
    },
    // 跳转新闻详情
    handleItemLinkClick({ id }) {
      this.$router.push({
        path: '/newsCenter/newsDetail',
        query: {
          id,
          userId: this.userId
        }
      })
    },
    // 刷新列表数据
    refresh() {
      return Promise.all([this.loadTableData()])
    },

    // 加载表格数据
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
        // 始终查询 状态为 published 的新闻
        const searchParams = _.assign({ status: ENUMS_STATUS.Published }, this.searchParams)
        const { data, totalNum } = await getV1News(_.assign(null, searchParams, page, params))
        this.tableData = data
        this.page.total = totalNum
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.tableLoading = false
      }
    },

    handleBack() {
      this.$store.commit('DEL_TAG', this.tag)
      this.$router.back()
    }
  }
}
</script>

<style lang="sass">
$color_active: #368AFA
$color_danger: #ff6464
$color_icon: #757C85
$color_hover: #207EFA

.NewsPublished
  height: 100%
  .table__link
    color: $color_active
    &:hover
      cursor: pointer
      color: $color_hover
  .status-span
      padding: 4px;
      border-radius: 2px;
  .basic-container--block
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
  .basic-container--block
    height: 0
    min-height: calc(100% - 92px)
    &--aside,&--main
      height: 100%
    &--aside
      width: 250px
    &--main
      width: calc(100% - 250px)
  .table__handler
    i
      color: $color_icon
    i.font__color--active
      color: $color_active
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

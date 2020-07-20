<template>
  <div class="RequirementsISubmitTable">
    <common-table
      :columns="columns | columnsFilter(columnsVisible)"
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
            :require-options="searchConfigLocal.requireOptions"
            :popover-options="searchConfigLocal.popoverOptions"
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
      <template #id="{row}">
        <span
          class="table__link"
          @click="() => handleLinkIdClick(row)"
        >{{ row.id }}</span>
      </template>
      <template #apprNo="{row}">
        <span
          class="table__link"
          @click="() => handleLinkApprNoClick(row)"
        >{{ row.apprNo }}</span>
      </template>

      <template
        v-for="dictName of ['EmerType', 'handled', 'status', 'progress', 'WorkProperty']"
        #[_.lowerFirst(dictName)]="{row}"
      >
        {{ translator({ dictKey: dictName, value: _.get(row, _.lowerFirst(dictName)) }) }}
      </template>

      <template #handler="{row}">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-button
              type="text"
              icon="icon-basics-more-outlined"
            />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-show="_.eq(row.progress, 'Approved')">
              <el-button
                size="medium"
                type="text"
                @click="() => $refs.requirementStop.init(row)"
              >
                停止招聘
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item v-show="_.eq(row.progress, 'Approved')">
              <el-button
                size="medium"
                type="text"
                @click="() => $refs.needNumEdit.init(row)"
              >
                更改需求人数
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button
                size="medium"
                type="text"
                @click="() => handleCopyBtnClick(row)"
              >
                复制
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </common-table>

    <NeedNumEdit
      ref="needNumEdit"
      :visible.sync="needNumEditVisible"
      @submit="handleNeedNumEditSubmit"
    />
    <RequirementStop
      ref="requirementStop"
      :visible.sync="requirementStopVisible"
      @submit="handleRequirementStopSubmit"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getChange, getPost, requirementStop } from '@/api/personnel/recruitment'
import { renameKey } from '@/util/util'
import { getOrgTreeSimple } from '@/api/org/org'

// 静态字典组
const PROGRESS_DICTS = [
  {
    dictKey: 'Approved',
    dictValue: '招聘中'
  },
  {
    dictKey: 'Finished',
    dictValue: '已结束'
  }
]

const HANDLED_DICTS = [
  {
    dictKey: 'Handled',
    dictValue: '已分配'
  },
  {
    dictKey: 'UnHandle',
    dictValue: '待分配'
  }
]

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
  name: 'RequirementsISubmitTable',
  components: {
    NeedNumEdit: () => import('@/views/personnel/recruit/components/modals/NeedNumEdit'),
    RequirementStop: () => import('@/views/personnel/recruit/components/modals/RequirementStop'),
    SearchPopover: () => import('@/components/searchPopOver')
  },
  filters: {
    // 过滤不可见的列
    columnsFilter: (columns, visibleColProps) =>
      _.filter(columns, ({ prop }) => _.includes(visibleColProps, prop))
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => ({})
    },
    load: {
      type: Function,
      default: () => []
    },
    searchConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      columnsVisible: _.map(this.columns, ({ prop }) => prop),
      needNumEditVisible: false,
      requirementStopVisible: false,
      parentId: '0',
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      tableColumns: this.columns,
      tableConfig: this.config,
      tableData: [],
      tableLoading: false,
      tablePageConfig: this.pageConfig,
      dictionary: {
        handled: HANDLED_DICTS,
        progress: PROGRESS_DICTS,
        status: STATUS_DICTS
      },
      searchConfigLocal: _.cloneDeep(this.searchConfig)
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.refresh()
  },

  mounted() {
    // 加载 popover
    _.each(['EducationalLevel', 'EmerType', 'WorkProperty', 'WorkYear'], async (dictKey) => {
      let item = _.find(this.searchConfigLocal.popoverOptions, { field: _.lowerFirst(dictKey) })
      _.set(item, 'options', await this.loadDictionary(dictKey))
    })
    let fieldOrgId = _.find(this.searchConfigLocal.popoverOptions, { field: 'orgId' })
    let fieldPositionId = _.find(this.searchConfigLocal.popoverOptions, { field: 'positionId' })
    if (fieldOrgId) {
      getOrgTreeSimple({ parentOrgId: 0 }).then((res) => (fieldOrgId.config.treeParams.data = res))
    }
    if (fieldPositionId) {
      getPost().then((res) => (fieldPositionId.options = res))
    }
  },

  methods: {
    handleNeedNumEditSubmit(data) {
      getChange(renameKey(data, 'id', 'recruitmentId'))
        .then(() => {
          this.$message({ type: 'success', message: '提交成功' })
          this.$refs.needNumEdit.close()
        })
        .finally(() => {
          this.$refs.needNumEdit.submitting = false
          this.refresh()
        })
    },
    handleRequirementStopSubmit(data) {
      requirementStop(renameKey(data, 'id', 'recruitmentId'))
        .then(() => {
          this.$message.success('操作成功')
          this.$refs.requirementStop.close()
        })
        .finally(() => {
          this.$refs.requirementStop.submitting = false
          this.refresh()
        })
    },
    handleCopyBtnClick() {
      this.$router.push({
        path: '/personnel/recruit/recruitmentNeeds',
        query: { id: this.id }
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
      this.loadTableData(_.pickBy(searchParams))
    },

    // 处理跳转
    handleLinkApprNoClick(row) {
      this.$router.push({
        path: '/approval/appr/apprDetail',
        query: { formId: row.formId, formKey: row.formKey, apprNo: row.apprNo }
      })
    },
    handleLinkIdClick({ id }) {
      // 从全部任务跳转的为招聘主管, 不使用userId
      this.$router.push({
        path: '/personnel/recruit/details',
        query: { id: id, status: 'iSubmit' /* , userId: this.userId */ }
      })
    },

    refresh() {
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
          pageSize: this.page.pageSize
        }
        const { data, totalNum } = await this.load(_.assign({ userId: this.userId }, page, params))
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
    }
  }
}
</script>

<style lang="sass">
$color_active: #368AFA
$color_icon: #A0A8AE
$color_hover: #207EFA

.RequirementsISubmitTable
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
</style>

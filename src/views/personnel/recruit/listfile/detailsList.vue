<template>
  <div>
    <common-table
      :loading="tableLoading"
      :data="tableData"
      :page="page"
      :columns="columnsVisible | columnsFilter"
      :page-config="pageConfig"
      :config="tableConfig"
      @current-page-change="currentPageChange"
      @page-size-change="sizeChange"
    >
      <template slot="topMenu">
        <div class="flex-flow flex justify-content align-items ">
          <div>
            <search-popover
              ref="searchPopover"
              :require-options="searchPopoverConfig.requireOptions"
              :popover-options="searchPopoverConfig.popoverOptions"
              @submit="handleSearch"
            />
          </div>
          <div class="resetEdge">
            <el-button
              type="text"
              class="refresh"
              icon="icon-basics-refresh-outlined"
              size="medium"
              @click="getTableData"
            />

            <el-popover
              placement="bottom"
              width="40"
              trigger="click"
              class="refresh"
            >
              <div class="checkColumn">
                <el-checkbox-group v-model="columnsVisible">
                  <el-checkbox
                    v-for="item in tableColumns"
                    :key="item.prop"
                    :label="item.prop"
                    :disabled="item.prop === 'id' || item.prop === 'jobName'"
                    class="originColumn"
                  >
                    {{ item.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
              <el-button
                slot="reference"
                icon="icon-basics-setup-outlined"
                size="medium"
                type="text"
              />
            </el-popover>
          </div>
        </div>
      </template>
      <template
        slot="id"
        slot-scope="{ row }"
      >
        <el-button
          type="text"
          size="medium"
          @click="jumpToDetail(row)"
        >
          {{ row.id }}
        </el-button>
      </template>

      <template
        v-for="dictName of ['progress', 'WorkProperty']"
        #[_.lowerFirst(dictName)]="{row}"
      >
        {{ translator({ dictKey: dictName, value: _.get(row, _.lowerFirst(dictName)) }) }}
      </template>

      <el-tag
        slot="status"
        slot-scope="{ row }"
        :type="row.status === 'Handled' ? 'primary' : 'danger'"
      >
        {{ translator({ dictKey: 'status', value: row.status }) }}
      </el-tag>

      <template #emerType="{row}">
        <cla-label :emertype="row.emerType" />
      </template>

      <template #percentage="{row}">
        {{ toPercentage(row) }}
      </template>

      <template
        slot="handler"
        slot-scope="{ row }"
      >
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-button
              type="text"
              icon="icon-basics-more-outlined"
            />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="params.progress === 'Approved'">
              <el-button
                size="medium"
                type="text"
                @click="() => handleNeedNumEditBtnClick(row)"
              >
                更改需求人数
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item v-else>
              <el-button
                size="medium"
                type="text"
                @click="JumpNewlybuild(row.id)"
              >
                复制
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </common-table>

    <need-num-edit
      ref="needNumEdit"
      :visible.sync="needNumEditVisible"
      @submit="handleNeedNumEditSubmit"
    />
  </div>
</template>

<script>
import { claAccuracy } from '@/views/personnel/recruit/components/percentage'
import { getMyRecruitment, getPost, getChange } from '@/api/personnel/recruitment'
import { getOrgTreeSimple } from '@/api/org/org'
import { mapGetters } from 'vuex'
import { renameKey } from '@/util/util'

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
const STATUS_DICTS = [
  {
    dictKey: 'Handled',
    dictValue: '已分配'
  },
  {
    dictKey: 'UnHandle',
    dictValue: '待分配'
  }
]

// 搜索配置
const SEARCH_POPOVER_REQUIRE_OPTIONS = [
  {
    type: 'input',
    field: 'jobName',
    label: '',
    data: '',
    config: {
      'suffix-icon': 'el-icon-search',
      placeholder: '职位名称'
    }
  }
]
const SEARCH_POPOVER_POPOVER_OPTIONS = [
  {
    type: 'treeSelect',
    field: 'orgId',
    label: '用人部门',
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
    label: '岗位',
    field: 'positionId',
    arrField: 'positionId',
    config: { optionLabel: 'name', optionValue: 'id' },
    options: []
  },
  {
    type: 'select',
    data: '',
    label: '工作年限',
    field: 'workYear',
    config: { optionLabel: 'dictValue', optionValue: 'dictKey' },
    options: []
  },
  {
    type: 'select',
    data: '',
    label: '学历要求',
    field: 'educationalLevel',
    options: [],
    config: { optionLabel: 'dictValue', optionValue: 'dictKey' }
  },
  {
    type: 'select',
    field: 'emerType',
    data: '',
    label: '紧急程度',
    options: [],
    config: { optionLabel: 'dictValue', optionValue: 'dictKey' }
  },
  {
    type: 'dataPicker',
    data: '',
    label: '到岗日期',
    field: 'beginJoinDate,endJoinDate',
    config: { type: 'daterange', 'range-separator': '至' }
  }
]
const SEARCH_POPOVER_CONFIG = {
  popoverOptions: SEARCH_POPOVER_POPOVER_OPTIONS,
  requireOptions: SEARCH_POPOVER_REQUIRE_OPTIONS
}

const TABLE_COLUMNS = [
  {
    label: '需求编号',
    prop: 'id',
    slot: true,
    minWidth: 150
  },
  {
    label: '职位',
    prop: 'jobName',
    minWidth: '120px'
  },
  {
    label: '岗位',
    prop: 'positionName',
    minWidth: '120px'
  },
  {
    label: '用人部门',
    prop: 'orgName',
    minWidth: '120px'
  },
  {
    label: '工作性质',
    prop: 'workProperty',
    slot: true
  },
  {
    label: '紧急程度',
    minWidth: 100,
    prop: 'emerType',
    slot: true
  },
  {
    label: '需求人数',
    prop: 'needNum'
  },
  {
    label: '已入职',
    prop: 'entryNum',
    width: '100'
  },
  {
    label: '需求进度',
    prop: 'progress',
    slot: true,
    width: 100
  },
  {
    label: '招聘进度',
    prop: 'percentage',
    slot: true,
    width: 100
  },
  // {
  //   label: '招聘进度',
  //   prop: 'accuracy',
  //   minWidth: '120px',
  //   slot: true
  // },
  {
    label: '任务分配状态',
    prop: 'status',
    slot: true,
    width: 150
  },
  {
    label: '候选人数',
    prop: 'candidateNum'
  }
]
const TABLE_CONFIG = {
  showHandler: true,
  showIndexColumn: false,
  enablePagination: true,
  handlerColumn: {
    width: 50
  }
}

export default {
  name: 'DetailsList',
  components: {
    ClaLabel: () => import('@/views/personnel/recruit/components/claLabel'),
    NeedNumEdit: () => import('@/views/personnel/recruit/components/modals/NeedNumEdit'),
    SearchPopover: () => import('@/components/searchPopOver/index')
  },
  filters: {
    // 过滤不可见的列
    columnsFilter: (visibleColProps) =>
      _.filter(TABLE_COLUMNS, ({ prop }) => _.includes(visibleColProps, prop))
  },
  data() {
    return {
      columnsVisible: _.map(TABLE_COLUMNS, ({ prop }) => prop),
      recruit: false,
      change: true,
      activeName: 'inrecruitment',
      needNumEditVisible: false,
      searchPopoverConfig: SEARCH_POPOVER_CONFIG,
      tableData: [],
      tableColumns: TABLE_COLUMNS,
      tableConfig: TABLE_CONFIG,
      tableLoading: false,
      params: {
        progress: _.head(PROGRESS_DICTS).dictKey,
        userId: null
      },
      page: { currentPage: 1, size: 10, total: 0 },
      pageConfig: {
        pageSizes: [10, 20, 30, 40, 50]
      },
      createOrgDailog: false,
      dictionary: {
        status: STATUS_DICTS,
        progress: PROGRESS_DICTS
      },
      searchParams: {}
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    this.getTableData()
    getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
      this.searchPopoverConfig.popoverOptions[0].config.treeParams.data = res
      this.$refs['searchPopover'].treeDataUpdateFun(res, 'orgId')
    })
    getPost().then((res) => {
      this.searchPopoverConfig.popoverOptions[1].options = res
    })
    // 加载字典数据 并初始化搜索组件的 options
    _.each(['EducationalLevel', 'EmerType', 'WorkProperty', 'WorkYear'], async (dictKey) => {
      let item = _.find(this.searchPopoverConfig.popoverOptions, { field: _.lowerFirst(dictKey) })
      _.set(item, 'options', await this.loadDictionary(dictKey))
    })
  },
  methods: {
    getEducationalLevel(type) {
      let typeWord
      this.getLevel.forEach((item) => {
        if (item.dictKey === type) {
          typeWord = item.dictValue
        }
      })
      return typeWord
    },
    init(progress) {
      this.params.progress = progress
      this.getTableData()
    },
    getTableData(params = {}) {
      params.pageNo = this.page.currentPage
      params.pageSize = this.page.size
      params.userId = this.userId
      params.progress = this.params.progress
      this.tableLoading = true
      getMyRecruitment(params).then((res) => {
        this.tableLoading = false
        this.tableData = res.data.map((item) => ({ ...item, percentage: null }))
        this.page.total = res.totalNum
      })
    },

    handleNeedNumEditSubmit(data) {
      getChange(renameKey(data, 'id', 'recruitmentId'))
        .then(() => {
          this.$message({ type: 'success', message: '提交成功' })
          this.$refs.needNumEdit.close()
        })
        .finally(() => (this.$refs.needNumEdit.submitting = false))
    },
    handleSearch(params) {
      this.searchParams = params
      this.getTableData(params)
    },
    jumpToDetail(row) {
      this.$router.push({
        path: '/personnel/recruit/details',
        query: { id: row.id, status: 'mNeeds' }
      })
    },
    JumpNewlybuild(id) {
      this.$router.push({
        path: '/personnel/recruit/recruitmentNeeds',
        query: { id: id }
      })
    },
    currentPageChange(param) {
      this.page.currentPage = param
      this.getTableData(this.searchParams)
    },
    sizeChange(pageSize) {
      this.page.size = pageSize
      this.getTableData()
    },

    handleNeedNumEditBtnClick(row) {
      return this.$refs.needNumEdit.init(row)
    },
    toPercentage(row) {
      const num = claAccuracy(row.needNum, row.entryNum)
      return `${_.isNumber(num) ? num + '%' : '-'}`
    },

    // 查询字典字段
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

    // 添加字典
    async loadDictionary(dictKey) {
      const dict = await this.$store.dispatch('CommonDict', dictKey)
      this.$set(this.dictionary, dictKey, dict)
      return dict
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .resetEdge {
  position: absolute;
  right: 59px;
}

/deep/.refresh i {
  color: #a0a8ae;
  font-size: 16px;
  cursor: pointer;
  margin: 0 12px;
}

.checkColumn {
  height: 200px;
  overflow: scroll;
}
</style>

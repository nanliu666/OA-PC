<template>
  <div>
    <common-table
      :loading="loading"
      :data="data"
      :page="page"
      :columns="columns"
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
              :require-options="searchConfig.requireOptions"
              :popover-options="searchConfig.popoverOptions"
              @submit="handleSubmit"
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
                <el-checkbox-group
                  v-model="checkColumn"
                  @change="columnChange"
                >
                  <el-checkbox
                    v-for="item in originColumn"
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
        slot="emerType"
        slot-scope="{ row }"
      >
        {{ EmerType[row.emerType] }}
      </template>

      <template
        slot="workProperty"
        slot-scope="{ row }"
      >
        {{ workProperty[row.workProperty] }}
      </template>

      <template
        slot="accuracy"
        slot-scope="{ row }"
      >
        {{ percentage(row) + '%' }}
      </template>

      <template
        slot="handler"
        slot-scope="{ row }"
      >
        <el-button
          v-if="params.progress === 'Approved'"
          size="medium"
          type="text"
          @click="JumpChange(row)"
        >
          更改需求人数
        </el-button>
        <el-button
          v-else
          size="medium"
          type="text"
          @click="JumpNewlybuild(row.id)"
        >
          复制
        </el-button>
      </template>
    </common-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMyRecruitment, getPost } from '@/api/personnel/recruitment'
import { getOrgTreeSimple } from '@/api/org/org'
import { claAccuracy } from '@/views/personnel/recruit/components/percentage'

const column = [
  {
    label: '需求编号',
    prop: 'id',
    slot: true,
    minWidth: '120px'
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
    label: '招聘进度',
    prop: 'accuracy',
    minWidth: '120px',
    slot: true
  },
  {
    label: '候选人数',
    prop: 'candidateNum'
  }
]
export default {
  name: 'DetailsList',
  components: {
    SearchPopover: () => import('@/components/searchPopOver/index')
  },
  data() {
    return {
      checkColumn: [
        'id',
        'jobName',
        'orgName',
        'positionName',
        'emerType',
        'status',
        'needNum',
        'entryNum',
        'accuracy',
        'workProperty',
        'candidateNum'
      ],
      recruit: false,
      change: true,
      loading: false,
      activeName: 'inrecruitment',
      searchConfig: {
        requireOptions: [
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
        ],
        popoverOptions: [
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
      },
      data: [],
      columns: column,
      tableConfig: {
        showHandler: true,
        showIndexColumn: false,
        enableMultiSelect: false,
        enablePagination: true
      },
      params: {
        progress: 'Approved',
        userId: null
      },
      page: { currentPage: 1, size: 10, total: 0 },
      pageConfig: {
        pageSizes: [10, 20, 30, 40, 50]
      },
      createOrgDailog: false,
      setElement: [
        {
          choice: 'WorkYear',
          target: 2
        },
        {
          choice: 'EmerType',
          target: 4
        }
      ],
      workProperty: {},
      EmerType: {},
      searchParams: {},
      originColumn: column
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    this.getTableData()
    getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
      this.searchConfig.popoverOptions[0].config.treeParams.data.push(...res)
      this.$refs['searchPopover'].treeDataUpdateFun(res, 'orgId')
    })
    getPost().then((res) => {
      this.searchConfig.popoverOptions[1].options = res
    })
    this.$store.dispatch('CommonDict', 'EmerType').then((res) => {
      (this.WorkYear = res),
        res.forEach((item) => {
          this.EmerType[item.dictKey] = item.dictValue
        })
    })
    this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
      this.searchConfig.popoverOptions[3].options = res
      res.forEach((item) => {
        this.workProperty[item.dictKey] = item.dictValue
      })
    })
    this.getDictionarygroup()
  },
  methods: {
    columnChange() {
      this.columns = column.filter((item) => {
        return this.checkColumn.indexOf(item.prop) > -1
      })
    },
    getEducationalLevel(type) {
      let typeWord
      this.getLevel.forEach((item) => {
        if (item.dictKey === type) {
          typeWord = item.dictValue
        }
      })
      return typeWord
    },
    getWorkYear(type) {
      let typeWord
      this.WorkYear.forEach((item) => {
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
      this.loading = true
      getMyRecruitment(params).then((res) => {
        this.loading = false
        this.data = res.data.map((item) => ({ ...item, percentage: null }))
        this.page.total = res.totalNum
      })
    },
    handleSubmit(params) {
      this.searchParams = params
      this.getTableData(params)
    },
    jumpToDetail(row) {
      this.$router.push({
        path: '/personnel/recruit/specificPage',
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

    getDictionarygroup() {
      this.setElement.forEach((item) => {
        this.$store.dispatch('CommonDict', item.choice).then((res) => {
          this.searchConfig.popoverOptions[item.target].options = res
        })
      })
      this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
        this.searchConfig.popoverOptions[3].options = res
      })
    },
    JumpChange(row) {
      this.$router.push({
        path: '/personnel/recruit/components/chang',
        query: { id: row.id }
      })
    },
    percentage(row) {
      return (row.percentage = claAccuracy(row.needNum, row.entryNum))
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

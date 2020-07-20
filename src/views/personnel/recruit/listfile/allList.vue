<template>
  <div>
    <common-table
      ref="table"
      :columns="visibleColProps | columnsFilter"
      :config="tableConfig"
      :data="data"
      :loading="tableLoading"
      :page-config="pageConfig"
      :page="page"
      @current-page-change="handleCurrentPageChange"
      @expand-change="recruitmentSituation"
      @page-size-change="handlePageSizeChange"
    >
      <template slot="topMenu">
        <div class="flex-flow flex justify-content align-items ">
          <div>
            <search-popover
              ref="searchPopover"
              :popover-options="searchConfig.popoverOptions"
              :require-options="searchConfig.requireOptions"
              @submit="handleSubmit"
            />
          </div>
          <div class="resetEdge">
            <el-button
              class="refresh"
              icon="icon-basics-refresh-outlined"
              size="medium"
              type="text"
              @click="getTableData"
            />

            <el-popover
              placement="bottom"
              width="40"
              trigger="click"
              class="refresh"
            >
              <div class="operation__column--visible">
                <el-checkbox-group v-model="visibleColProps">
                  <el-checkbox
                    v-for="item of _.drop(columns)"
                    :key="item.prop"
                    :disabled="item.prop === 'id' || item.prop === 'jobName'"
                    :label="item.prop"
                    class="operation__column--item"
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
        v-if="params.progress === 'Approved'"
        #handler="{row}"
      >
        <div class="table__handler">
          <el-button
            size="medium"
            type="text"
            @click.stop="handleEdit(row)"
          >
            {{ row.status == 'UnHandle' ? '分配需求' : '重新分配' }}
          </el-button>

          <el-button
            size="medium"
            type="text"
            @click.stop="() => handleNeedNumBtnClick(row)"
          >
            更改需求人数
          </el-button>
        </div>
      </template>
      <template
        slot="accuracy"
        slot-scope="{ row }"
      >
        {{ percentage(row) + '%' }}
      </template>

      <template
        slot="status"
        slot-scope="{ row }"
      >
        <el-tag
          v-if="row.status === 'Handled'"
          size="medium"
          type="primary"
          plain
        >
          {{ isStatus(row.status) }}
        </el-tag>
        <el-tag
          v-else
          size="medium"
          type="danger"
          plain
        >
          {{ isStatus(row.status) }}
        </el-tag>
      </template>

      <div
        slot="emerType"
        slot-scope="{ row }"
      >
        <cla-label :emertype="row.emerType" />
      </div>
      <template #expand="{row}">
        <div v-loading="row.loading">
          <el-row
            :gutter="20"
            type="flex"
          >
            <el-col
              :span="5"
              class="internalDetails"
            >
              招聘人员
            </el-col>
            <el-col
              :span="5"
              class="internalDetails"
            >
              任务数
            </el-col>
            <el-col
              :span="5"
              class="internalDetails"
            >
              入职数
            </el-col>
            <el-col
              :span="5"
              class="internalDetails"
            >
              候选人数
            </el-col>
            <el-col
              :span="4"
              class="internalDetails noborder "
            >
              招聘进度
            </el-col>
          </el-row>
          <el-row
            v-for="item in row.detail"
            :key="item.userId"
            :gutter="20"
            type="flex"
          >
            <el-col
              :span="5"
              class="taskInformation"
            >
              {{ item.name }}
            </el-col>
            <el-col
              :span="5"
              class="taskInformation"
            >
              {{ item.taskNum }}
            </el-col>
            <el-col
              :span="5"
              class="taskInformation  isBlue "
            >
              {{ item.entryNum }}
            </el-col>
            <el-col
              :span="5"
              class="taskInformation"
            >
              {{ item.candidateNum }}
            </el-col>
            <el-col
              :span="4"
              :class="{ isRed: item.percentage === 0 }"
              class="taskInformation  noborder"
            >
              {{ percentage(item) + '%' }}
            </el-col>
          </el-row>
        </div>
      </template>
    </common-table>

    <Distribution
      ref="distribution"
      :visible.sync="distributionVisible"
      @submit="handleDistributionSubmit"
    />
    <Redistribution
      ref="redistribution"
      :visible.sync="redistributionVisible"
      @submit="handleRedistributionSubmit"
    />

    <NeedNumEdit
      ref="needNumEdit"
      :visible.sync="needNumEditVisible"
      @submit="handleNeedNumEditSubmit"
    />
  </div>
</template>

<script>
import { claAccuracy } from '@/views/personnel/recruit/components/percentage'
import {
  getAllRecruitment,
  getChange,
  // getEntryDetails,
  getPost,
  putDistribution,
  queryDistribution,
  taskDistribution
} from '@/api/personnel/recruitment'
import { getOrgTreeSimple } from '@/api/org/org'
import { mapGetters } from 'vuex'
import ClaLabel from '@/views/personnel/recruit/components/claLabel'
import SearchPopover from '@/components/searchPopOver/index'
import { renameKey } from '@/util/util'

// 全部招聘需求列表
const TABLE_COLUMS = [
  {
    prop: 'expand',
    type: 'expand',
    slot: true
  },
  {
    label: '需求编号',
    prop: 'id',
    slot: true,
    minWidth: 120
  },
  {
    label: '职位',
    prop: 'jobName',
    minWidth: 120
  },
  {
    label: '岗位',
    prop: 'positionName',
    minWidth: '120px'
  },
  {
    label: '紧急程度',
    prop: 'emerType',
    slot: true,
    minWidth: 100
  },
  {
    label: '需求状态',
    prop: 'status',
    slot: true
  },
  {
    label: '需求人数',
    prop: 'needNum'
  },

  {
    label: '已入职',
    prop: 'entryNum'
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
const TABLE_CONFIG = {
  showHandler: true,
  showIndexColumn: false,
  enablePagination: true,
  handlerColumn: {
    width: 250
  }
}

export default {
  name: 'AllList',
  components: {
    ClaLabel,
    Redistribution: () => import('../components/modals/Redistribution'),
    Distribution: () => import('../components/modals/Distribution'),

    SearchPopover,
    NeedNumEdit: () => import('@/views/personnel/recruit/components/modals/NeedNumEdit')
  },
  filters: {
    // 过滤不可见的列
    columnsFilter: (visibleColProps) =>
      _.filter(TABLE_COLUMS, ({ prop }) => _.includes(visibleColProps, prop))
  },
  data() {
    return {
      // 选中所有的col
      visibleColProps: _.map(TABLE_COLUMS, ({ prop }) => prop),
      activeName: 'inrecruitment',
      tableLoading: false,
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
          },
          {
            type: 'select',
            field: 'status',
            label: '需求状态',
            data: '',
            options: [
              { value: 'UnHandle', label: '待分配' },
              { value: 'Handled', label: '已分配' }
            ],
            config: { optionLabel: '', optionValue: '' }
          }
        ]
      },
      data: [],
      columns: TABLE_COLUMS,
      tableConfig: TABLE_CONFIG,
      params: {
        progress: 'Approved',
        userId: null
      },
      page: { currentPage: 1, size: 10, total: 0 },
      pageConfig: {
        pageSizes: [10, 20, 30, 40, 50]
      },
      assignmentVisible: false,
      redistributionVisible: false,
      distributionVisible: false,
      needNumEditVisible: false,
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
      WorkYear: [],
      getLevel: [],
      management: [],
      searchParams: {}
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
      this.searchConfig.popoverOptions[0].config.treeParams.data.push(...res)
    })
  },
  mounted() {
    this.getTableData()

    getPost().then((res) => {
      this.searchConfig.popoverOptions[1].options = res
    })
    this.$store.dispatch('CommonDict', 'WorkYear').then((res) => {
      this.WorkYear = res
    })
    this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
      this.getLevel = res
    })
    this.getDictionarygroup()
  },
  activated() {
    this.getTableData()
  },
  methods: {
    refresNew() {
      this.getTableData({})
    },
    getWorkProperty(type) {
      let typeWord
      this.WorkProperty.forEach((item) => {
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
      // 有关页面发送API请求化时 请求参数格式化
      params.pageNo = this.page.currentPage
      params.pageSize = this.page.size
      params.progress = this.params.progress
      this.tableLoading = true
      getAllRecruitment(params).then((res) => {
        this.tableLoading = false
        this.data = res.data.map((item) => ({
          ...item,
          detail: [],
          loading: false,
          percentage: null
        }))
        this.page.total = res.totalNum
      })
    },

    handleSubmit(params) {
      this.searchParams = params
      this.getTableData(params)
    },
    jumpToDetail(row) {
      let { id } = row
      this.$router.push({
        path: '/personnel/recruit/details',
        query: { id: id, status: 'aRequirements' }
      })
    },
    handleCurrentPageChange(param) {
      this.page.currentPage = param
      this.getTableData(this.searchParams)
    },
    handlePageSizeChange(pageSize) {
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
    handleEdit(row) {
      if (row.status === 'Handled') {
        this.$refs.redistribution.init(row)
      } else {
        // this.$refs.Again.init(row)
        this.$refs.distribution.init(row)
      }
    },
    handleNeedNumBtnClick(row) {
      return this.$refs.needNumEdit.init(row)
      // this.$router.push({
      //   path: '/personnel/recruit/components/chang',
      //   query: { id }
      // })
    },
    isStatus(status) {
      let typeStatus
      let calcStatus = [
        {
          label: '待分配',
          value: 'UnHandle'
        },
        {
          label: '已分配',
          value: 'Handled'
        },
        {
          label: '审批中',
          value: 'Approve'
        }
      ]
      calcStatus.forEach((item) => {
        if (item.value === status) {
          typeStatus = item.label
        }
      })
      return typeStatus
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
    recruitmentSituation(row) {
      if (!row.detail || row.detail.length === 0) {
        row.loading = true
        queryDistribution({ recruitmentId: row.id }).then((res) => {
          row.detail = res.map((item) => ({ ...item, percentage: null }))
          row.loading = false
        })
        // getEntryDetails({ recruitmentId: row.id }).then((res) => console.debug('recruitment', res))
      }
    },
    percentage(row) {
      // 点击查看详情时判断使用哪个参数
      if (row && row.taskNum) {
        return (row.percentage = claAccuracy(row.taskNum, row.entryNum))
      } else {
        return (row.percentage = claAccuracy(row.needNum, row.entryNum))
      }
    },

    handleNeedNumEditSubmit(data) {
      getChange(renameKey(data, 'id', 'recruitmentId'))
        .then(() => {
          this.$message({ type: 'success', message: '提交成功' })
          this.$refs.needNumEdit.close()
        })
        .finally(() => (this.$refs.needNumEdit.submitting = false))
    },
    handleRedistributionSubmit(data) {
      putDistribution(data)
        .then(() => this.$message.success('操作成功'))
        .finally(() => {
          this.$refs.redistribution.close()
          this.refresNew()
        })
    },

    handleDistributionSubmit(data) {
      taskDistribution(data)
        .then(() => this.$message.success('操作成功'))
        .finally(() => {
          this.$refs.distribution.close()
          this.refresNew()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.isBlue {
  color: #207efa !important;
}

.bigText {
  font-weight: 500;
  font-size: 18px;
}

/deep/ .resetEdge {
  position: absolute;
  right: 59px;
}

/deep/ .el-table__expanded-cell[class*='cell'] {
  padding: 8px 50px !important;
}
.noborder {
  border: none !important;
}

.internalDetails {
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #a0a8ae;
  padding-left: 23px !important;
  border-right: 1px solid #ccc;
  margin: 0;
}

.taskInformation {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #202940;
  line-height: 20px;
  padding-left: 23px !important;
  border-right: 1px solid #ccc;
  margin: 0;
}

.isRed {
  color: #ff6464;
}
/deep/.refresh i {
  color: #a0a8ae;
  font-size: 16px;
  cursor: pointer;
  margin: 0 12px;
}

.operation__columns--visible {
  height: 200px;
  overflow: scroll;
}
</style>

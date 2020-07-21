<template>
  <div class="RequirementsAllPane">
    <el-tabs v-model="tab">
      <el-tab-pane
        label="招聘中"
        name="Approved"
      >
        <RequirementsAllTable
          ref="approved"
          :load="paddingLoad"
          :columns="paddingTableColumns"
          :config="paddingTableConfig"
          :search-config="paddingSearchConfig"
        />
      </el-tab-pane>
      <el-tab-pane
        label="已结束"
        name="Finished"
      >
        <RequirementsAllTable
          ref="finished"
          :load="finishedLoad"
          :columns="finishedTableColumns"
          :config="finishedTableConfig"
          :search-config="finishedSearchConfig"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { renameKey } from '@/util/util'
import { getAllRecruitment } from '@/api/personnel/recruitment'

const TAB_ACITVE_DEFAULT = 'Approved'

const PADDING_TABLE_COLUMNS = [
  {
    prop: 'expand',
    type: 'expand',
    slot: true
  },
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
    formatter: ({ needNum, entryNum }) => `${((100 * entryNum) / needNum).toFixed(1)}%`,
    label: '招聘进度',
    prop: 'percentage',
    width: 100
  },
  {
    label: '任务分配状态',
    prop: 'handled',
    slot: true,
    width: 150
  },
  {
    label: '候选人数',
    prop: 'candidateNum'
  }
]
const FINISHED_TABLE_COLUMNS = PADDING_TABLE_COLUMNS

const PADDING_TABLE_CONFIG = {
  rowKey: (row) => row.id,
  showHandler: true,
  showIndexColumn: false,
  enablePagination: true,
  handlerColumn: {
    minWidth: 50
  }
}
const FINISHED_TABLE_CONFIG = PADDING_TABLE_CONFIG

const PADDING_SEARCH_CONFIG = {
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
}
const FINISHED_SEARCH_CONFIG = PADDING_SEARCH_CONFIG

export default {
  components: {
    RequirementsAllTable: () => import('./RequirementsAllTable')
  },
  data() {
    return {
      tab: TAB_ACITVE_DEFAULT
    }
  },

  computed: {
    // 招聘中
    paddingTableColumns: () => PADDING_TABLE_COLUMNS,
    paddingLoad: () => async (params) => {
      const { data, totalNum, totalPage } = await getAllRecruitment(
        _.assign({ progress: 'Approved' }, params)
      )
      return {
        data: _.map(data, (item) => renameKey(item, 'status', 'handled')),
        totalNum,
        totalPage
      }
    },
    paddingTableConfig: () => PADDING_TABLE_CONFIG,
    paddingSearchConfig: () => PADDING_SEARCH_CONFIG,

    // 已结束
    finishedTableColumns: () => FINISHED_TABLE_COLUMNS,
    finishedLoad: () => async (params) => {
      const { data, totalNum, totalPage } = await getAllRecruitment(
        _.assign({ progress: 'Finished' }, params)
      )
      return {
        data: _.map(data, (item) => renameKey(item, 'status', 'handled')),
        totalNum,
        totalPage
      }
    },
    finishedTableConfig: () => FINISHED_TABLE_CONFIG,
    finishedSearchConfig: () => FINISHED_SEARCH_CONFIG
  },

  watch: {
    tab() {
      this.refresh()
    }
  },

  methods: {
    // 刷新当前显示的tab(表格)
    refresh() {
      this.refreshByTab(this.tab)
    },

    refreshByTab(tab) {
      switch (tab) {
        case 'UnderApproval':
          this.$nextTick(() => this.$refs.underApproval.refresh())
          break
        case 'Approved':
          this.$nextTick(() => this.$refs.approved.refresh())
          break
        case 'Finished':
          this.$nextTick(() => this.$refs.finished.refresh())
          break
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>

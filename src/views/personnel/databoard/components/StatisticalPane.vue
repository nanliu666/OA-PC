<template>
  <div class="StatisticalPane">
    <CardGroup
      :columns="cardGroupColumns"
      :data="cardGroupData"
      :formatter="(text) => `${text} 人`"
      shadow="never"
    />

    <div class="container__charts">
      <el-row :gutter="10">
        <el-col
          v-for="({ title, load, config }, index) of chartConfigs"
          :key="index"
          :sm="24"
          :lg="12"
        >
          <LazySkeleton>
            <ChartSkeleton slot="skeleton" />
            <ChartBar
              :config="config"
              :load="load"
              :title="title"
            />
          </LazySkeleton>
        </el-col>
        <el-col :sm="24">
          <LazySkeleton>
            <ChartSkeleton slot="skeleton" />
            <ChartBar
              title="离职原因分析"
              :config="{
                name: '离职原因',
                label: 'reason',
                value: 'leaveNum'
              }"
              :colors="['#FF6661']"
              grid-width="80%"
              :load="getStatLeaveReason"
              xaxis-dictkey="LeaveReason"
            />
          </LazySkeleton>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  getOrgChangeNum,
  getOrgEntryAndLeave,
  getOrgEntryNum,
  getOrgEntryRate,
  getOrgFormalNum,
  getOrgLeaveNum,
  getOrgLeaveRate,
  getOrgWorkNum,
  getStatChangeNum,
  getStatEntryNum,
  getStatFormalNum,
  getStatLeaveNum,
  getStatLeaveReason,
  getStatWorkNum
} from '@/api/personnel/databoard'
import CardGroup from './CardGroup'
import ChartBar from './ChartBar'
import ChartSkeleton from './ChartSkeleton'
import LazySkeleton from '@/components/lazy-skeleton/LazySkeleton'

const TREE_SELECT_CONFIG = {
  selectParams: {
    placeholder: '请选择部门',
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

const CARD_GROUP_COLUMNS = [
  [
    {
      label: '在职人数',
      prop: 'workNum'
    },
    {
      label: '入职人数',
      prop: 'entryNum'
    },
    {
      label: '离职人数',
      prop: 'leaveNum'
    },
    {
      label: '转正人数',
      prop: 'formalNum'
    },
    {
      label: '人事异动人数',
      prop: 'changeNum'
    }
  ]
]

const CHART_CONFIGS = [
  {
    title: '各部门在职人数',
    load: getOrgWorkNum,
    config: { label: 'orgName', value: 'workNum' }
  },
  {
    title: '各部门入职人数',
    load: getOrgWorkNum,
    config: { label: 'orgName', value: 'workNum' }
  },
  {
    title: '各部门离职人数',
    config: { label: 'orgName', value: 'leaveNum' },
    load: getOrgLeaveNum
  },
  {
    title: '各部门转正人数',
    config: { label: 'orgName', value: 'formalNum' },
    load: getOrgFormalNum
  },
  {
    title: '各部门异动人数',
    config: { label: 'orgName', value: 'changeNum' },
    load: getOrgChangeNum
  },
  {
    title: '各部门员工进出比率',
    config: [
      { name: '入职人数', label: 'orgName', value: 'entryNum' },
      { name: '离职人数', label: 'orgName', value: 'leaveNum' }
    ],
    load: getOrgEntryAndLeave
  },
  {
    title: '各部门员工新进率',
    config: [
      { name: '在职人数', label: 'orgName', value: 'workNum' },
      { name: '入职人数', label: 'orgName', value: 'entryNum' },
      {
        name: '月员工新进率',
        label: 'orgName',
        value: 'entryRate',
        type: 'line',
        yAxisIndex: 1
      }
    ],
    load: getOrgEntryRate
  },
  {
    title: '各月员工离职率',
    config: [
      { name: '在职人数', label: 'orgName', value: 'workNum' },
      { name: '离职人数', label: 'orgName', value: 'leaveNum' },
      {
        name: '月员工离职率',
        label: 'orgName',
        value: 'leaveRate',
        type: 'line',
        yAxisIndex: 1
      }
    ],
    load: getOrgLeaveRate
  }
]

export default {
  name: 'StatisticalPane',
  components: {
    CardGroup,
    ChartBar,
    ChartSkeleton,
    LazySkeleton
  },
  data() {
    return {
      cardGroupColumns: _.cloneDeep(CARD_GROUP_COLUMNS),
      cardGroupData: {},
      searchParams: {},
      treeSelectConfig: _.cloneDeep(TREE_SELECT_CONFIG)
    }
  },
  computed: {
    chartConfigs: () => CHART_CONFIGS,
    getOrgChangeNum: () => getOrgChangeNum,
    getOrgEntryAndLeave: () => getOrgEntryAndLeave,
    getOrgEntryNum: () => getOrgEntryNum,
    getOrgEntryRate: () => getOrgEntryRate,
    getOrgFormalNum: () => getOrgFormalNum,
    getOrgLeaveNum: () => getOrgLeaveNum,
    getOrgLeaveRate: () => getOrgLeaveRate,
    getOrgWorkNum: () => getOrgWorkNum,
    getStatChangeNum: () => getStatChangeNum,
    getStatEntryNum: () => getStatEntryNum,
    getStatFormalNum: () => getStatFormalNum,
    getStatLeaveNum: () => getStatLeaveNum,
    getStatLeaveReason: () => getStatLeaveReason,
    getStatWorkNum: () => getStatWorkNum
  },
  methods: {
    handleSearch(searchParams) {
      this.searchParams = _.pickBy(searchParams)
      this.loadPaneData()
    },

    refresh() {
      this.loadPaneData()
    },

    // 加载页面数据
    async loadPaneData() {
      this.loadCardGroupData()
    },

    // 加载数据接口
    async loadCardGroupData() {
      const datas = await Promise.all([
        getStatWorkNum(this.searchParams),
        getStatEntryNum(this.searchParams),
        getStatLeaveNum(this.searchParams),
        getStatFormalNum(this.searchParams),
        getStatChangeNum(this.searchParams)
      ])
      this.cardGroupData = _.assign(...datas)
    }
  }
}
</script>

<style lang="sass">
.StatisticalPane
  i.bold
    font-weight: bold
  .icon-basics-date-outlined
    margin-left: 3rem
    margin-right: 1rem
  .container__charts
    margin-top: 2rem
</style>

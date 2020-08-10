<!-- 员工概况数据 -->
<template>
  <div class="StaffPane">
    <el-row :gutter="10">
      <el-col
        v-for="({ title, load, config }, index) of chartPieConfigs.slice(0, 2)"
        :key="`section-0-${index}`"
        :sm="24"
        :lg="12"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartPie
            :config="config"
            :load="load"
            :title="title"
          />
        </LazySkeleton>
      </el-col>
      <el-col
        :key="`section-1-0`"
        :sm="24"
        :lg="12"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartSpirit
            :load="chartSexDistribution.load"
            :title="chartSexDistribution.title"
          />
        </LazySkeleton>
      </el-col>
      <el-col
        :key="`section-1-1`"
        :sm="24"
        :lg="12"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartBar
            :config="chartBarConfigs.config"
            :load="chartBarConfigs.load"
            :title="chartBarConfigs.title"
            :xaxis-dictkey="chartBarConfigs.xaxisDictkey"
          />
        </LazySkeleton>
      </el-col>

      <el-col
        :key="`section-2-0`"
        :sm="24"
        :lg="12"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartFunnel
            :config="{
              label: 'educationalLevel',
              value: 'workNum',
              dictKey: 'EducationalLevel'
            }"
            :load="getUserEducationalLevel"
            title="学历分布"
          />
        </LazySkeleton>
      </el-col>
      <el-col
        :key="`section-2-1`"
        :sm="24"
        :lg="12"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartBar
            :config="[
              { label: 'ageName', value: '1', name: '男' },
              { label: 'ageName', value: '0', name: '女' }
            ]"
            :load="getUserAge"
            title="年龄分布"
            transform
          />
        </LazySkeleton>
      </el-col>

      <el-col
        v-for="({ title, load, config, excludes, subtext }, index) of chartPieConfigs.slice(2, 4)"
        :key="`section-3-${index}`"
        :sm="24"
        :lg="12"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartPie
            :config="config"
            :excludes="excludes"
            :load="load"
            :title="title"
            :subtext="subtext"
          />
        </LazySkeleton>
      </el-col>

      <el-col
        :key="`section-4-0`"
        :sm="24"
        :lg="12"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartBar
            :config="[
              { label: 'marriage', value: '1', name: '男' },
              { label: 'marriage', value: '0', name: '女' }
            ]"
            :load="getUserMarriage"
            title="婚育状况"
            :xaxis-dictkey="[
              {
                dictKey: '0',
                dictValue: '未婚'
              },
              { dictKey: '1', dictValue: '已婚未育' },
              { dictKey: '2', dictValue: '已婚已育' }
            ]"
          />
        </LazySkeleton>
      </el-col>

      <el-col
        :key="`section-4-1`"
        :sm="24"
        :lg="12"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartBar
            :config="[
              { label: 'yearName', value: '1', name: '男', stack: true },
              { label: 'yearName', value: '0', name: '女', stack: true }
            ]"
            :load="getUserYear"
            title="年代分布"
          />
        </LazySkeleton>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartBar from './ChartBar'
import ChartSpirit from './ChartSpirit'
import ChartPie from './ChartPie'
import ChartFunnel from './ChartFunnel'
import ChartSkeleton from './ChartSkeleton'
import LazySkeleton from '@/components/lazy-skeleton/LazySkeleton'
import {
  getUserWorkProperty,
  getUserPosition,
  getUserAge,
  getUserSex,
  getUserYear,
  getOrgEntryNum,
  getUserEducationalLevel,
  getUserMarriage,
  getUserCompanyAge,
  getUserWorkAge
} from '@/api/personnel/databoard'

const CHART_PIE_CONFIGS = [
  // section-0
  {
    title: '工作性质分布',
    load: getUserWorkProperty,
    config: { label: 'workProperty', value: 'workNum', dictKey: 'WorkProperty' }
  },
  {
    title: '岗位类型分布',
    load: getUserPosition,
    config: { label: 'positionName', value: 'workNum' }
  },
  // section-3
  {
    title: '司龄分布',
    load: getUserCompanyAge,
    config: { label: 'ageName', value: 'workNum' },
    excludes: ['Other'],
    subtext: (datas) => `未填写司龄${_.get(_.find(datas, { ageName: 'Other' }), 'workNum', 0)}人`
  },
  {
    title: '工龄分布',
    load: getUserWorkAge,
    config: { label: 'ageName', value: 'workNum' },
    excludes: ['Other'],
    subtext: (datas) => `未填写工龄${_.get(_.find(datas, { ageName: 'Other' }), 'workNum', 0)}人`
  }
]
const CHART_SEX_DISTRIBUTION = {
  title: '性别分布',
  load: getUserSex
}
const CHART_BAR_CONFIGS = {
  title: '各部门入职人数',
  load: getOrgEntryNum,
  config: { value: 'entryNum', label: 'orgName' }
}

/**
 * @description 用于将区分性别的两组数据进行合并成为一组数据
 * @param {Array<{[propName: string]:string,sex:number,workNum: number}>} arr
 * @param {String} groupProp 用于区别组别的属性名
 * @param {String} valueProp 值的属性名
 * @return {Array<{[propName:string]:string,0:number,1,number}>} 处理后的数组
 */
function mergeSexByGroupName(arr, groupProp, valueProp = 'workNum') {
  return _(arr)
    .groupBy(groupProp)
    .transform(
      (result, value, key) =>
        (result[key] = {
          [groupProp]: key,
          0: _.find(value, { sex: 0 })[valueProp],
          1: _.find(value, { sex: 1 })[valueProp]
        })
    )
    .map()
    .value()
}

export default {
  name: 'StaffPane',
  components: {
    ChartBar,
    ChartSpirit,
    ChartPie,
    ChartFunnel,
    ChartSkeleton,
    LazySkeleton
  },
  computed: {
    chartBarConfigs: () => CHART_BAR_CONFIGS,
    chartSexDistribution: () => CHART_SEX_DISTRIBUTION,
    chartPieConfigs: () => CHART_PIE_CONFIGS,
    getOrgEntryNum: () => getOrgEntryNum,
    getUserPosition: () => getUserPosition,
    getUserAge: () => async (params) => mergeSexByGroupName(await getUserAge(params), 'ageName'),
    getUserCompanyAge: () => getUserCompanyAge,
    getUserMarriage: () => async (params) =>
      mergeSexByGroupName(await getUserMarriage(params), 'marriage'),
    getUserSex: () => getUserSex,
    getUserYear: () => async (params) => mergeSexByGroupName(await getUserYear(params), 'yearName'),
    getUserWorkProperty: () => getUserWorkProperty,
    getUserWorkAge: () => getUserWorkAge,
    getUserEducationalLevel: () => getUserEducationalLevel
  },
  methods: {
    // DEBUG:
    async refresh() {}
  }
}
</script>

<style lang="sass">
.StaffPane
</style>

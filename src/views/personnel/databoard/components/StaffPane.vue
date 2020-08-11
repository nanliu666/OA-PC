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
        v-for="({ title, load, config }, index) of chartBarConfigs.slice(0, 1)"
        :key="`section-1-${index + 1}`"
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
        v-for="({ config, load, title }, index) of chartBarConfigs.slice(1, 2)"
        :key="`section-2-${index + 1}`"
        :sm="24"
        :lg="12"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartBar
            :config="config"
            :load="load"
            :title="title"
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
        v-for="({ config, load, title, xaxisDictkey }, index) of chartBarConfigs.slice(2, 4)"
        :key="`section-4-${index}`"
        :sm="24"
        :lg="12"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartBar
            :config="config"
            :load="load"
            :title="title"
            :xaxis-dictkey="xaxisDictkey"
          />
        </LazySkeleton>
      </el-col>

      <!-- <el-col
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
      </el-col> -->

      <el-col
        v-for="({ title, load, config }, index) of chartGeoMapConfigs"
        :key="`section-5-${index}`"
        :sm="24"
        :lg="12"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartGeoMap
            :ref="`map${index}`"
            :config="config"
            :load="load"
            :title="title"
            @item-click="(e) => handleMapItemClick(e, `map${index}`)"
          />
        </LazySkeleton>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartBar from './ChartBar'
import ChartFunnel from './ChartFunnel'
import ChartGeoMap from './ChartGeoMap/ChartGeoMap'
import ChartPie from './ChartPie'
import ChartSkeleton from './ChartSkeleton'
import ChartSpirit from './ChartSpirit'
import LazySkeleton from '@/components/lazy-skeleton/LazySkeleton'
import {
  getNativeProvince,
  getNativeCity,
  getOrgEntryNum,
  getTalentJob,
  getUserAge,
  getUserCompanyAge,
  getUserEducationalLevel,
  getUserMarriage,
  getUserPosition,
  getUserSex,
  getUserWorkAge,
  getUserWorkProperty,
  getUserYear,
  getWorkProvince,
  getWorkCity
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
const CHART_BAR_CONFIGS = [
  {
    title: '各部门入职人数',
    load: getOrgEntryNum,
    config: { value: 'entryNum', label: 'orgName' }
  },
  {
    title: '年龄分布',
    load: async (params) => mergeSexByGroupName(await getUserAge(params), 'ageName'),
    config: [
      { label: 'ageName', value: '1', name: '男' },
      { label: 'ageName', value: '0', name: '女' }
    ]
  },
  {
    title: '婚育状况',
    load: async (params) => mergeSexByGroupName(await getUserMarriage(params), 'marriage'),
    config: [
      { label: 'marriage', value: '1', name: '男' },
      { label: 'marriage', value: '0', name: '女' }
    ],
    xaxisDictkey: [
      {
        dictKey: '0',
        dictValue: '未婚'
      },
      { dictKey: '1', dictValue: '已婚未育' },
      { dictKey: '2', dictValue: '已婚已育' }
    ]
  },
  {
    title: '年代分布',
    load: async (params) => mergeSexByGroupName(await getUserYear(params), 'yearName'),
    config: [
      { label: 'yearName', value: '1', name: '男', stack: true },
      { label: 'yearName', value: '0', name: '女', stack: true }
    ]
  }
]

// 人才库职位分布图
const CHART_COMPLEX_BAR_CONFIGS = {
  title: '人才库职位分布图',
  load: getTalentJob
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
    ChartGeoMap,
    ChartFunnel,
    ChartSkeleton,
    LazySkeleton
  },
  computed: {
    getNativeProvince() {
      return async () => await getNativeProvince(this._searchParams)
    },
    getNativeCity() {
      return async (provinceCode) =>
        await getNativeCity(_.assign({ provinceCode }, this._searchParams))
    },
    getWorkProvince() {
      return async () => await getWorkProvince(this._searchParams)
    },
    getWorkCity() {
      return async (provinceCode) =>
        await getWorkCity(_.assign({ provinceCode }, this._searchParams))
    },
    chartBarConfigs() {
      return _.map(CHART_BAR_CONFIGS, (cfg) => ({
        ...cfg,
        load: async (params) => await cfg.load({ ...this._searchParams, ...params })
      }))
    },
    chartSexDistribution: () => CHART_SEX_DISTRIBUTION,
    chartPieConfigs: () => CHART_PIE_CONFIGS,
    // 地图相关配置
    chartGeoMapConfigs() {
      return [
        {
          title: '在职员工籍贯分布情况',
          config: [
            { label: 'provinceName', value: 'workNum' },
            { label: 'cityName', value: 'workNum' }
          ],
          load: [this.getNativeProvince, this.getNativeCity]
        },
        {
          title: '在职员工工作地分布图',
          config: [
            { label: 'provinceName', value: 'workNum' },
            { label: 'cityName', value: 'workNum' }
          ],
          load: [this.getWorkProvince, this.getWorkCity]
        }
      ]
    },
    chartComplexPieConfigs: () => CHART_COMPLEX_BAR_CONFIGS,
    getOrgEntryNum: () => getOrgEntryNum,
    getUserPosition: () => getUserPosition,
    getUserCompanyAge: () => getUserCompanyAge,
    getUserSex: () => getUserSex,

    getUserWorkProperty: () => getUserWorkProperty,
    getUserWorkAge: () => getUserWorkAge,
    getUserEducationalLevel: () => getUserEducationalLevel,
    // 招聘概况只对日期进行查询
    _searchParams() {
      return _.pick(this.searchParams, 'orgId')
    }
  },
  methods: {
    handleMapItemClick(e, refName) {
      const map = _.head(this.$refs[refName])
      const { name } = e
      if (map.isProvince) {
        map.loadMap(name)
        map.loadData()
      }
    },
    // DEBUG:
    async refresh() {}
  }
}
</script>

<style lang="sass">
.StaffPane
</style>

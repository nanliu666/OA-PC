<!-- 招聘概况页面 -->
<template>
  <div class="DataboardRecruitmentPane">
    <el-row :gutter="10">
      <el-col
        :key="`section-0-0`"
        :sm="24"
        :lg="12"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartProgressRing
            title="整体招聘进度"
            :config="{ label: 'label', value: 'value' }"
            :load="getRecruitmentProgress"
          />
        </LazySkeleton>
      </el-col>
      <el-col
        :key="`section-0-1`"
        :sm="24"
        :lg="12"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartProgress
            title="各部门招聘进度"
            :config="{ label: 'orgName', value: 'value' }"
            :load="getRecruitmentOrgProgress"
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
          <ChartFunnel
            :config="{
              dictKey: [
                {
                  dictKey: '1',
                  dictValue: '待沟通'
                },
                {
                  dictKey: '2',
                  dictValue: '初选通过'
                },
                {
                  dictKey: '4',
                  dictValue: '面试通过'
                },
                {
                  dictKey: '5',
                  dictValue: '待发Offer'
                },
                {
                  dictKey: '6',
                  dictValue: '已发Offer'
                },
                {
                  dictKey: '8',
                  dictValue: '已入职'
                }
              ],
              label: 'status',
              value: 'num'
            }"
            :load="getRecruitmentStat"
            based
            sort="descending"
            title="招聘过程数据漏斗"
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
          <ChartPie
            :config="{ dictKey: 'RecruitmentChannel', label: 'channel', value: 'num' }"
            :load="getRecruitmentChannel"
            title="招聘渠道"
          />
        </LazySkeleton>
      </el-col>
      <el-col
        :key="`section-2-0`"
        :sm="24"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartBar
            :config="{
              type: 'line',
              dictKey: 'RecruitmentChannel',
              label: 'statMonth',
              value: 'entryNum'
            }"
            :load="getUserEntryNum"
            title="年度入职人数趋势分析"
          />
        </LazySkeleton>
      </el-col>
      <el-col
        :key="`section-3-0`"
        :sm="24"
        :lg="12"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartFunnel
            :config="{
              label: 'educationalLevel',
              value: 'num',
              dictKey: 'EducationalLevel'
            }"
            :load="getTalentEducationalLevel"
            title="人才库学历占比"
          />
        </LazySkeleton>
      </el-col>
      <el-col
        :key="`section-3-1`"
        :sm="24"
        :lg="12"
      >
        <LazySkeleton>
          <ChartSkeleton slot="skeleton" />
          <ChartComplexPie
            :config="chartComplexPieConfigs.config"
            :load="chartComplexPieConfigs.load"
            :title="chartComplexPieConfigs.title"
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
          <ChartSpirit
            :config="{ label: 'sex', value: 'num' }"
            :load="getTalentSex"
            title="人才库性别分布"
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
              { label: 'ageName', value: '1', name: '男' },
              { label: 'ageName', value: '0', name: '女' }
            ]"
            :load="getTalentAge"
            title="人才库年龄分布"
            transform
          />
        </LazySkeleton>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getRecruitmentChannel,
  getRecruitmentOrgProgress,
  getRecruitmentProgress,
  getRecruitmentStat,
  getTalentEducationalLevel,
  getTalentJob,
  getTalentSex,
  getTalentAge,
  getUserEntryNum
} from '@/api/personnel/databoard'
import ChartBar from './ChartBar'
import ChartComplexPie from './ChartComplexPie'
import ChartFunnel from './ChartFunnel'
import ChartPie from './ChartPie'
import ChartProgress from './ChartProgress'
import ChartProgressRing from './ChartProgressRing'
import ChartSkeleton from './ChartSkeleton'
import ChartSpirit from './ChartSpirit'
import LazySkeleton from '@/components/lazy-skeleton/LazySkeleton'

/**
 * @description 用于将区分性别的两组数据进行合并成为一组数据
 * @param {Array<{[propName: string]:string,sex:number,workNum: number}>} arr
 * @param {String} groupProp 用于区别组别的属性名
 * @param {String} valueProp 值的属性名
 * @return {Array<{[propName:string]:string,0:number,1,number}>} 处理后的数组
 */
function mergeSexByGroupName(arr, groupProp, valueProp = 'num') {
  return _(arr)
    .groupBy(groupProp)
    .transform(
      (result, value, key) =>
        (result[key] = {
          [groupProp]: key,
          0: _.get(_.find(value, { sex: 0 }), valueProp, 0),
          1: _.get(_.find(value, { sex: 1 }), valueProp, 0)
        })
    )
    .map()
    .value()
}

export default {
  components: {
    ChartBar,
    ChartComplexPie,
    ChartFunnel,
    ChartPie,
    ChartProgress,
    ChartProgressRing,
    ChartSkeleton,
    ChartSpirit,
    LazySkeleton
  },

  inject: ['searchParams'],
  computed: {
    // 各部门招聘进度
    getRecruitmentOrgProgress() {
      return async () =>
        _.map(
          await getRecruitmentOrgProgress(this._searchParams),
          ({ approvedNum, finishedNum, orgName }) => ({
            orgName,
            value: finishedNum / approvedNum || 0
          })
        )
    },
    // 招聘过程数据漏斗
    getRecruitmentStat() {
      return async () => await getRecruitmentStat(this._searchParams)
    },

    // 年度入职人数查询接口
    getUserEntryNum() {
      return async () => await getUserEntryNum(this._searchParams)
    },
    getTalentEducationalLevel() {
      return async () => await getTalentEducationalLevel(this._searchParams)
    },
    getTalentSex() {
      return async () => await getTalentSex(this._searchParams)
    },
    getTalentAge() {
      return async (params) =>
        mergeSexByGroupName(await getTalentAge({ ...this._searchParams, ...params }), 'ageName')
    },
    getRecruitmentChannel() {
      return this.searchParamsDecorator(getRecruitmentChannel)
    },
    // 整体招聘进度
    getRecruitmentProgress() {
      return this.searchParamsDecorator(async (params) => {
        const { finishedNum, approvedNum } = await getRecruitmentProgress(params)
        return finishedNum / approvedNum || 0
      })
    },
    getTalentJob() {
      return this.searchParamsDecorator(getTalentJob)
    },
    chartComplexPieConfigs() {
      return {
        title: '人才库职位分布图',
        load: this.getTalentJob
      }
    },
    _searchParams() {
      return _.pick(this.searchParams(), 'qryMonth')
    }
  },
  methods: {
    refresh() {},

    // 将请求接口添加上该页面的查询参数函数包装
    searchParamsDecorator(loadFn) {
      return async (params) => await loadFn({ ...this._searchParams, ...params })
    }
  }
}
</script>

<style lang="sass">
.DataboardRecruitmentPane
</style>

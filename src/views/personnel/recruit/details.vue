<template>
  <div class="Details">
    <page-header
      title="需求详情"
      show-back
    />
    <basic-container
      v-loading="loading"
      block
    >
      <!--  所有的招聘需求的详情，使用字段的状态进行判断 -->
      <DetailsMainInfo :data="data">
        <template #operations>
          <el-button
            v-if="!userId"
            size="medium"
            type="primary"
            @click="handleCopyBtnClick"
          >
            复制
          </el-button>
          <el-button
            v-if="!userId"
            size="medium"
            type="primary"
            :disabled="isStoped"
            @click="() => $refs.needNumEdit.init(data)"
          >
            更改需求人数
          </el-button>
          <el-button
            v-if="!userId"
            v-show="_.eq(data.status, 'UnHandle')"
            size="medium"
            type="primary"
            :disabled="isStoped"
            @click="() => $refs.distribution.init(data)"
          >
            分配需求
          </el-button>
          <el-button
            v-if="!userId"
            v-show="_.eq(data.status, 'Handled')"
            size="medium"
            type="primary"
            :disabled="isStoped"
            @click="() => $refs.redistribution.init(data)"
          >
            重新分配
          </el-button>

          <el-button
            v-if="!userId"
            v-show="!isStoped"
            plain
            size="medium"
            type="danger"
            @click="() => $refs.requirementStop.init(data)"
          >
            停止招聘
          </el-button>
        </template>
      </DetailsMainInfo>

      <el-tabs v-model="tab">
        <el-tab-pane
          label="分配信息"
          name="tabDistributionInformation"
        >
          <DetailsDistributionInformation :data="data" />
        </el-tab-pane>
        <el-tab-pane
          label="招聘需求详情"
          name="tabRecruitmentRequirementDetails"
        >
          <DetailsRecruitmentRequirement :data="data" />
        </el-tab-pane>
      </el-tabs>
    </basic-container>

    <Distribution
      ref="distribution"
      :visible.sync="distributionVisible"
      @submit="handleDistributionSubmit"
    />
    <NeedNumEdit
      ref="needNumEdit"
      :visible.sync="needNumEditVisible"
      @submit="handleNeedNumEditSubmit"
    />
    <Redistribution
      ref="redistribution"
      :visible.sync="redistributionVisible"
      @submit="handleRedistributionSubmit"
    />
    <RequirementStop
      ref="requirementStop"
      :visible.sync="requirementStopVisible"
      @submit="handleRequirementStopSubmit"
    />
  </div>
</template>

<script>
import {
  getChange,
  getRecruitmentDetail,
  putDistribution,
  requirementStop,
  taskDistribution
} from '@/api/personnel/recruitment'
import { renameKey } from '@/util/util'

const TAB_ACITVE_DEFAULT = 'tabDistributionInformation'

export default {
  name: 'Details',
  components: {
    Distribution: () => import('@/views/personnel/recruit/components/modals/Distribution'),

    DetailsRecruitmentRequirement: () => import('./components/DetailsRecruitmentRequirement'),
    DetailsDistributionInformation: () => import('./components/DetailsDistributionInformation'),
    DetailsMainInfo: () => import('./components/DetailsMainInfo'),
    NeedNumEdit: () => import('@/views/personnel/recruit/components/modals/NeedNumEdit'),
    Redistribution: () => import('@/views/personnel/recruit/components/modals/Redistribution'),
    RequirementStop: () => import('@/views/personnel/recruit/components/modals/RequirementStop')
  },
  provide() {
    return {
      $view: this
    }
  },
  data() {
    return {
      data: {},
      dictionary: {},
      loading: false,
      tab: TAB_ACITVE_DEFAULT,
      distributionVisible: false,
      needNumEditVisible: false,
      redistributionVisible: false,
      requirementStopVisible: false
    }
  },
  computed: {
    id() {
      return this.$route.query.id || null
    },
    userId() {
      return this.$route.query.userId || null
    },

    /**
     * @returns {boolean} 当前招聘是否已经停止
     */
    isStoped() {
      return _.eq(this.data.progress, 'Finished')
    }
  },

  mounted() {
    this.refresh()
  },

  methods: {
    handleCopyBtnClick() {
      this.$router.push({
        path: '/personnel/recruit/recruitmentNeeds',
        query: { id: this.id }
      })
    },

    handleDistributionSubmit(data) {
      taskDistribution(data)
        .then(() => this.$message.success('操作成功'))
        .finally(() => {
          this.$refs.distribution.close()
          this.refresh()
        })
    },
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
    handleRedistributionSubmit(data) {
      putDistribution(data)
        .then(() => {
          this.$message.success('操作成功')
          this.$refs.redistribution.close()
        })
        .finally(() => {
          this.$refs.redistribution.submitting = false
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

    refresh() {
      this.$emit('refresh')
      this.loadData()
    },

    async loadData() {
      try {
        this.loading = true
        this.data = await getRecruitmentDetail(this.id)
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
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

<style lang="sass" scoped>
.Details
  height: 100%
  .basic-container--block
    min-height: calc(100% - 92px)
    height: 0
</style>

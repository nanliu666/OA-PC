<template>
  <div class="DistributionInformation">
    <div class="contents">
      <Overview
        :data="data"
        :props="overviewProps"
      />

      <div class="contents__item">
        <span class="contents__item--label">分配详情</span>
        <div class="contents__item--details">
          <common-table
            :columns="detailsTableColumns"
            :data="detailsTableData"
            :loading="detailsTableLoading"
          >
            <template #progress="{row}">
              <el-progress
                class="progress"
                :percentage="row | progress"
              />
            </template>
          </common-table>
        </div>
      </div>
      <div class="contents__item">
        <span class="contents__item--label">已入职员工</span>
        <div class="contents__item--details">
          <common-table
            :columns="entryTableColumns"
            :data="entryTableData"
            :loading="entryTableLoading"
          >
            <template #sex="{row}">
              {{ translator({ dictKey: 'sex', value: row.sex }) }}
            </template>
          </common-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { claAccuracy } from '@/views/personnel/recruit/components/percentage'
import { queryDistribution, getEntryDetails } from '@/api/personnel/recruitment'

const DETAILS_TABLE_COLUMNS = [
  {
    label: '招聘人员',
    prop: 'name'
  },
  {
    label: '任务数',
    prop: 'taskNum'
  },
  {
    label: '入职数',
    prop: 'entryNum'
  },
  {
    label: '候选人数',
    prop: 'candidateNum'
  },
  {
    label: '招聘进度',
    prop: 'progress',
    slot: true
  }
]
const ENTRY_TABLE_COLUMNS = [
  {
    label: '姓名',
    prop: 'name',
    slot: true
  },
  {
    label: '性别',
    prop: 'sex',
    slot: true
  },
  {
    label: '手机号码',
    prop: 'phonenum'
  },
  {
    label: '个人邮箱',
    prop: 'email',
    minWidth: '160px'
  },

  {
    label: '毕业学校',
    prop: 'university'
  },
  {
    label: '工作年限',
    prop: 'workAge'
  },
  {
    label: '学历要求',
    prop: 'educationalLevel',
    slot: true
  }
]

const OVERVIEW_PROPS = [
  // 显示在<overview/>中的属性 格式: ["prop", "label", {config}]
  ['jobName', '职位名称'],
  ['joinDate', '到岗日期'],
  [
    'emerType',
    '紧急程度',
    {
      className: ({ emerType }) => {
        let className = ''
        switch (emerType) {
          case 'Super': // 与 urgent 相同处理
          case 'urgent':
            className = 'color--danger'
            break
          case 'common':
            className = 'color--info'
            break
          case 'suit':
            className = 'color--success'
            break
          default:
        }
        return className
      },
      dictKey: 'emerType'
    }
  ],
  ['needNum', '需求总数'],
  ['entryNum', '已入职'],
  [
    '$_process',
    '招聘进度',
    {
      // 设置 CSS class 属性
      className: 'color--active text--bold',
      // 处理 value
      handler: ({ needNum, entryNum }) => _.toString(claAccuracy(needNum, entryNum)) + '%'
    }
  ],
  ['candidateNum', '候选人数']
]

export default {
  name: 'DistributionInformation',
  components: {
    Overview: () =>
      import(/* webpackChunkName: "views" */ '@/views/personnel/recruit/components/Overview')
  },
  filters: {
    progress: ({ entryNum, taskNum }) => claAccuracy(taskNum, entryNum)
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  inject: ['$view'],
  data() {
    return {
      detailsTableColumns: DETAILS_TABLE_COLUMNS,
      detailsTableData: null,
      detailsTableLoading: false,
      entryTableColumns: ENTRY_TABLE_COLUMNS,
      entryTableData: null,
      entryTableLoading: false,

      dictionary: {}
    }
  },
  computed: {
    overviewProps: () => OVERVIEW_PROPS
  },
  mounted() {
    this.refresh()
    this.$view.$on('refresh', () => this.refresh())
  },

  methods: {
    refresh() {
      this.loadDetailsTableData()
      this.loadEntryTableData()
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

    // 添加字典
    async loadDictionary(dictKey) {
      const dict = await this.$store.dispatch('CommonDict', dictKey)
      this.$set(this.dictionary, dictKey, dict)
      return dict
    },

    async loadDetailsTableData() {
      try {
        this.detailsTableLoading = true
        this.detailsTableData = await queryDistribution({ recruitmentId: this.$view.id })
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.detailsTableLoading = false
      }
    },
    async loadEntryTableData() {
      try {
        this.entryTableLoading = true
        this.entryTableData = await getEntryDetails(
          _.pickBy({ recruitmentId: this.$view.id, userId: this.$view.userId })
        )
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.entryTableLoading = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
$color_label: #212a3f

.DistributionInformation
  .contents
    &__item
      margin-top: 2rem
      .top-menu
        height: 0 // @Overwrite
      &--label
        color: $color_label
        font-family: PingFangSC-Regular
        font-size: 14px
        font-weight: bold
        line-height: 30px
        margin-bottom: 0px
        margin-top: 10px
</style>

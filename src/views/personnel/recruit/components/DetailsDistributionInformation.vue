<template>
  <div class="DistributionInformation">
    <div class="contents">
      <Overview
        :data="data"
        :props="overviewProps"
      />

      <!--  如果: 从我的任务进入该页面，显示关联的候选人 -->
      <div
        v-if="$view.userId"
        class="contents__item"
      >
        <span class="contents__item--label">关联候选人</span>
        <div class="contents__item--details">
          <!-- TODO:字典 -->
          <common-table
            :columns="candidateTableColumns"
            :data="candidateTableData"
            :loading="candidateTableLoading"
          >
            <template
              v-for="dictName of ['sex', 'EducationalLevel']"
              #[_.lowerFirst(dictName)]="{row}"
            >
              {{ translator({ dictKey: dictName, value: _.get(row, _.lowerFirst(dictName)) }) }}
            </template>
            <template #status="{row}">
              {{ translator({ dictKey: 'CandidateStatus', value: _.get(row, 'status') }) }}
            </template>

            <template #tags="{row}">
              <div class="contents__item--tags">
                <el-tag
                  v-for="(tag, index) of row.tags"
                  :key="index"
                  :color="tag.color"
                  size="small"
                >
                  {{ tag.name }}
                </el-tag>
              </div>
            </template>
          </common-table>
        </div>
      </div>
      <!-- 否则: 从全部招聘需求进入详情页面没有userId，显示任务分配情况 -->
      <div
        v-else
        class="contents__item"
      >
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
                :percentage="_.min([getProgress(row), 100])"
                :format="() => `${getProgress(row)}%`"
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
            <template
              v-for="dictName of ['sex', 'EducationalLevel']"
              #[_.lowerFirst(dictName)]="{row}"
            >
              {{ translator({ dictKey: dictName, value: _.get(row, _.lowerFirst(dictName)) }) }}
            </template>
          </common-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryDistribution, getEntryDetails, getRelationDemand } from '@/api/personnel/recruitment'

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
const CANDIDATE_TABLE_COLUMNS = [
  {
    prop: 'personId', // [string]	是	人员ID
    label: '人员ID',
    slot: false
  },
  {
    prop: 'name', // [string]	是	真实姓名
    label: '真实姓名',
    slot: false
  },
  {
    prop: 'status', // [string]	是	候选人状态，1-待沟通，2-初选通过，3-面试中，4-面试通过，5-待发Offer，6-已发Offer，0-已淘汰
    label: '候选人状态',
    slot: true
  },
  {
    prop: 'sex', // [int]	是	1：男；0：女
    label: '性别',
    slot: true
  },
  {
    prop: 'phonenum', // [string]	是	手机号
    label: '手机号',
    slot: false
  },
  {
    prop: 'email', // [string]	是	个人邮箱
    label: '个人邮箱',
    slot: false
  },
  {
    prop: 'workAge', // [int]	是	工作年限
    label: '工作年限',
    slot: false
  },
  {
    prop: 'university', // [string]	是	毕业学校
    label: '毕业学校',
    slot: false
  },
  {
    prop: 'educationalLevel', // [string]	是	学历要求，字典组：EducationalLevel
    label: '学历要求',
    slot: true
  },
  {
    prop: 'tags', // [array]
    label: '标签', // [string]		标签ID
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
    label: '邮箱',
    prop: 'email',
    minWidth: '160px'
  },

  {
    label: '毕业学校',
    prop: 'university'
  },
  {
    formatter: ({ workAge }) => (_.isNumber(workAge) ? `${workAge}年` : '-'),
    label: '工作年限',
    prop: 'workAge'
  },
  {
    label: '要求',
    prop: 'educationalLevel',
    slot: true
  }
]

const USERS_OVERVIEW_PROPS = [
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
  ['taskNum', '任务数'],
  ['entryNum', '已入职'],
  [
    '$_process',
    '招聘进度',
    {
      // 设置 CSS class 属性
      className: 'color--active text--bold',
      // 处理 value
      handler: ({ needNum, entryNum }) => `${((100 * entryNum) / needNum).toFixed(1)}%`
    }
  ],
  ['candidateNum', '候选人数']
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
      handler: ({ needNum, entryNum }) => `${((100 * entryNum) / needNum).toFixed(1)}%`
    }
  ]
]

export default {
  name: 'DistributionInformation',
  components: {
    Overview: () => import('@/views/personnel/recruit/components/Overview')
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
      candidateTableColumns: CANDIDATE_TABLE_COLUMNS,
      candidateTableData: null,
      candidateTableLoading: false,
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
    overviewProps() {
      return this.$view.userId ? USERS_OVERVIEW_PROPS : OVERVIEW_PROPS
    }
  },
  mounted() {
    this.refresh()
    this.$view.$on('refresh', () => this.refresh())
  },

  methods: {
    refresh() {
      if (this.$view.userId) {
        // 加载关联候选人列表
        this.loadCandidateTableData()
      } else {
        // 添加分配详情列表数据
        this.loadDetailsTableData()
      }
      // 添加已入职员工数据
      this.loadEntryTableData()
    },

    getProgress: ({ taskNum, entryNum }) => {
      if (+taskNum === 0) {
        return 100
      }
      return (100 * entryNum) / taskNum
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

    // 查询关联的候选人
    async loadCandidateTableData() {
      try {
        this.candidateTableLoading = true
        this.candidateTableData = await getRelationDemand({ recruitmentId: this.$view.id })
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.candidateTableLoading = false
      }
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
      &--tags
        >*
          margin-left: 1rem
</style>

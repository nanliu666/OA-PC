<template>
  <div class="DetailsRecruitmentRequirement">
    <common-form
      :model="data"
      :columns="formColumns"
      :config="formConfig"
    >
      <template
        v-for="({ prop, $config }, index) of _.filter(
          formColumns,
          (col) => !_.startsWith(col, '_')
        )"
        #[prop]
      >
        <span :key="index">{{ translator({ value: data[prop], $config }) }}</span>
      </template>

      <template #_salaryRange>
        <span>{{ sarayRange }}</span>
      </template>
    </common-form>
  </div>
</template>

<script>
const FORM_COLUMNS = [
  {
    itemType: 'slot',
    label: '停止招聘人',
    prop: 'stopName',
    span: 12
  },
  {
    itemType: 'slot',
    label: '停止时间',
    prop: 'stopTime',
    span: 12
  },
  {
    itemType: 'slot',
    label: '停止原因',
    prop: 'stopReason',
    span: 24
  },
  {
    itemType: 'slot',
    label: '申请人',
    prop: 'userName',
    span: 12
  },
  {
    itemType: 'slot',
    label: '申请时间',
    prop: 'createTime',
    span: 12
  },
  {
    itemType: 'slot',
    label: '申请公司',
    prop: 'companyName',
    span: 12
  },
  {
    itemType: 'slot',
    label: '用人部门',
    prop: 'orgName',
    span: 12
  },
  {
    itemType: 'slot',
    label: '职位',
    prop: 'jobName',
    span: 12
  },
  {
    itemType: 'slot',
    label: '岗位',
    prop: 'positionName',
    span: 12
  },
  {
    itemType: 'slot',
    label: '工作性质',
    prop: 'workProperty',
    span: 12,
    $config: {
      dictKey: 'WorkProperty'
    }
  },
  {
    itemType: 'slot',
    label: '需求人数',
    prop: 'needNum',
    span: 12
  },
  {
    itemType: 'slot',
    label: '到岗日期',
    prop: 'joinDate',
    span: 12
  },
  {
    itemType: 'slot',
    label: '紧急程度',
    prop: 'emerType',
    span: 12,
    $config: {
      dictKey: 'EmerType'
    }
  },
  {
    itemType: 'slot',
    label: '薪酬范围',
    prop: '_salaryRange',
    span: 12
  },
  {
    itemType: 'slot',
    label: '工作经验要求',
    prop: 'workYear',
    span: 12,
    $config: {
      dictKey: 'workYear'
    }
  },
  {
    itemType: 'slot',
    label: '学历要求',
    prop: 'educationalLevel',
    span: 12,
    $config: {
      dictKey: 'EducationalLevel'
    }
  },
  {
    itemType: 'slot',
    label: '职位要求',
    prop: 'requirement',
    span: 12
  },
  {
    itemType: 'slot',
    label: '工作职责',
    prop: 'duty',
    span: 12
  },
  {
    itemType: 'slot',
    label: '招聘原因',
    prop: 'reason',
    span: 12,
    $config: {
      dictKey: 'RecruitmentReason'
    }
  },
  {
    itemType: 'slot',
    label: '申请理由',
    prop: 'remark',
    span: 12
  }
]
const FORM_CONFIG = {
  labelPosition: 'right'
}

export default {
  name: 'DetailsRecruitmentRequirement',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  inject: ['$view'],
  data() {
    return {
      dictionary: {}
    }
  },
  computed: {
    formColumns() {
      if (!this.$view.isStoped) {
        return _.slice(FORM_COLUMNS, 3)
      } else {
        return FORM_COLUMNS
      }
    },
    formConfig: () => FORM_CONFIG,
    sarayRange() {
      const { minSalary, maxSarary } = this.data
      if (_.isNil(minSalary) || _.isNil(maxSarary)) {
        return '-'
      } else {
        return `￥${minSalary} ~ ￥ ${maxSarary}`
      }
    }
  },

  methods: {
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
    async loadDictionary(dictKey) {
      const dict = await this.$store.dispatch('CommonDict', dictKey)
      this.$set(this.dictionary, dictKey, dict)
      return dict
    }
  }
}
</script>

<style lang="sass" scoped>
$color_label: #212a3f

.DetailsRecruitmentRequirement
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

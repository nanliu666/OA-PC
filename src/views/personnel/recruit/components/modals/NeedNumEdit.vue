<template>
  <el-dialog
    :before-close="close"
    :visible="visible"
    append-to-body
    class="NeedNumEdit"
    title="更改需求人数"
    width="700px"
  >
    <div class="dialog__content">
      <Overview
        :data="formData"
        :props="overviewProps"
        style="margin:0"
      />
      <common-form
        ref="form"
        :columns="formColumns"
        :model="formData"
        class="form"
      />
    </div>

    <template #footer>
      <el-button
        size="medium"
        @click="close"
      >
        取 消
      </el-button>
      <el-button
        :loading="submitting"
        size="medium"
        type="primary"
        @click="handleSubmit"
      >
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
const FORM_COLUMNS = [
  {
    itemType: 'inputNumber',
    label: '将剩余需求总数改为',
    min: 0,
    offset: 0,
    placeholder: '请输入需求总数',
    prop: 'changeNum',
    // required: true,
    rules: [
      {
        required: true,
        message: '请输入需求总数'
      }
    ],
    span: 24
  },
  {
    itemType: 'select',
    label: '更改原因',
    options: [],
    prop: 'reason',
    props: {
      label: 'dictValue',
      value: 'dictKey'
    },
    required: true,
    span: 24
  }
]

const OVERVIEW_PROPS = [
  // 显示在<introduct/>中的属性 格式: ["prop", "label", {config}]
  ['jobName', '职位名称'],
  ['needNum', '需求总数'],
  ['entryNum', '已入职'],
  [
    '$_minus',
    '剩余需求总数',
    {
      handler: ({ needNum, entryNum }) =>
        _.isNumber(needNum - entryNum) ? needNum - entryNum : '-'
    }
  ]
  // [
  //   'emerType',
  //   '紧急程度',
  //   {
  //     dictKey: 'emerType'
  //   }
  // ]
]

export default {
  name: 'NeedNumEdit',
  components: {
    Overview: () => import('@/views/personnel/recruit/components/Overview')
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dictionary: {},
      formData: {},
      formColumns: FORM_COLUMNS,
      submitting: false
    }
  },
  computed: {
    overviewProps: () => OVERVIEW_PROPS
  },

  async created() {
    _.set(
      _.find(this.formColumns, { prop: 'reason' }),
      'options',
      await this.loadDictionary('RecruitmentReason')
    )
  },
  methods: {
    close() {
      this.submitting = false
      this.$emit('update:visible', false)
    },
    clearValidate() {
      this.$nextTick(() => this.$refs.form.clearValidate())
    },

    handleSubmit() {
      this.$refs.form.validate().then(() => {
        this.submitting = true
        // 只收集表单数据
        this.$emit(
          'submit',
          _.pick(
            this.formData,
            _.concat(
              _.map(FORM_COLUMNS, ({ prop }) => prop),
              ['id', 'userId']
            )
          )
        )
      })
    },

    init(data) {
      this.formData = _.cloneDeep(data)
      this.$emit('update:visible', true)
      this.clearValidate()
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
    async loadDictionary(dictKey) {
      const dict = await this.$store.dispatch('CommonDict', dictKey)
      this.$set(this.dictionary, dictKey, dict)
      return dict
    }
  }
}
</script>

<style lang="sass">
$padding: 1rem

.NeedNumEdit
  .dialog__content
    padding:
      left: $padding
      right: $padding
    .form
      margin-top: 5 * $padding
</style>

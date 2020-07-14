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
        :value="form | overviewProps"
        style="margin:0"
      />
      <common-form
        ref="form"
        :columns="formColumns"
        :model="form"
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
    options: [
      {
        label: '临时增加新任务',
        value: '临时增加新任务'
      },
      {
        label: '部门人手已足够',
        value: '部门人手已足够'
      },
      {
        label: '其它',
        value: '其它'
      }
    ],
    prop: 'reason',
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
    Overview: () =>
      import(/* webpackChunkName: "views" */ '@/views/personnel/recruit/components/Overview')
  },
  filters: {
    overviewProps: (data) => {
      if (_.isNull(data)) return []
      return _.map(OVERVIEW_PROPS, ([prop, label, config]) => {
        let res = { label, value: data[prop] }
        if (config) {
          res.$config = config
          if (config.handler) {
            res.value = config.handler(data)
          }
        }
        return res
      })
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {},
      formColumns: FORM_COLUMNS,
      submitting: false
    }
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
      this.$refs.form.validate().then((res) => {
        this.submitting = true
        // 只收集表单数据
        this.$emit(
          'submit',
          _.pick(
            res,
            _.concat(
              _.map(FORM_COLUMNS, ({ prop }) => prop),
              ['id', 'userId']
            )
          )
        )
      })
    },

    init(data) {
      this.form = _.cloneDeep(data)
      this.$emit('update:visible', true)
      this.clearValidate()
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

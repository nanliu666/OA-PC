<template>
  <el-dialog
    :before-close="close"
    :visible="visible"
    append-to-body
    class="Distribution"
    title="分配招聘需求"
    width="38%"
  >
    <div class="main">
      <Overview
        :data="form"
        :props="overviewProps"
        style="margin:0"
      />
      <el-row class="info">
        <el-col
          class="info__item"
          :span="8"
        >
          <label>已分配: <span class="info__item--active">{{ hasAssigned }}</span></label>
        </el-col>
        <el-col
          class="info__item"
          :span="8"
        >
          <label>待分配: <span class="info__item--active">{{ toAssigned }}</span></label>
        </el-col>
        <el-col
          class="info__item"
          :span="8"
        >
          <label>剩余需求总数: <span class="info__item--active">{{ needNum }}</span></label>
        </el-col>
      </el-row>

      <el-row
        :gutter="20"
        class="form__header"
      >
        <el-col :span="12">
          <span class="form__header--label">指定招聘人员</span>
        </el-col>
        <el-col :span="12">
          <span class="form__header--label">招聘任务</span>
        </el-col>
      </el-row>

      <DistributionFormItem
        :limit="needNum"
        :value="_.get(form, 'users', [])"
        @change="(val) => handleRedistributionFormItemChange(val)"
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
import { mapGetters } from 'vuex'

const OVERVIEW_PROPS = [
  // 显示在<introduct/>中的属性 格式: ["prop", "label", {config}]
  ['jobName', '职位名称'],
  [
    'emerType',
    '紧急程度',
    {
      dictKey: 'emerType'
    }
  ],
  ['joinDate', '到岗日期']
  // [
  //   'emerType',
  //   '紧急程度',
  //   {
  //     dictKey: 'emerType'
  //   }
  // ]
]

export default {
  name: 'Distribution',
  components: {
    Overview: () =>
      import(/* webpackChunkName: "views" */ '@/views/personnel/recruit/components/Overview'),
    DistributionFormItem: () => import(/* webpackChunkName: "views" */ './DistributionFormItem')
  },
  provide() {
    return {
      $dialog: this
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
      submitting: false
    }
  },
  computed: {
    ...mapGetters(['userId']),
    // 已分配
    hasAssigned() {
      return _.sumBy(_.get(this.form, 'users'), 'taskNum') || 0
    },
    // 待分配
    toAssigned() {
      if (this.needNum === Infinity) {
        return this.hasAssigned
      } else {
        return this.needNum - this.hasAssigned
      }
    },
    needNum() {
      return _.get(this.form, 'needNum', Infinity)
    },

    overviewProps: () => OVERVIEW_PROPS
  },
  methods: {
    close() {
      this.submitting = false
      this.$emit('update:visible', false)
    },
    init(data) {
      this.form = _.cloneDeep(data)
      this.$emit('update:visible', true)
      this.clearValidate()
    },
    clearValidate() {},

    handleRedistributionFormItemChange(val) {
      this.$set(this.form, 'users', val)
    },

    handleSubmit() {
      this.validate()
        .then((res) => {
          this.submitting = true
          const data = {
            recruitmentId: res.id,
            assignUser: this.userId,
            users: _.map(res.users, ({ userId, taskNum /** , $config */ }) => ({
              userId,
              taskNum
              // operatorType: $config ? 'Add' : 'Update'
            }))
          }
          this.$emit('submit', data)
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
        .finally(() => (this.submitting = false))
    },

    async validate() {
      if (this.toAssigned !== 0) {
        throw new Error('仍有待分配任务')
      }
      if (_.get(this.form, 'users', []).some((user) => _.isNull(user.userId))) {
        throw new Error('招聘人员不能为空')
      }
      return this.form
    }
  }
}
</script>

<style lang="sass">
$color_active: #368AFA
$dialog_padding: 3rem

.Distribution
  .main
    .Overview
      background: white
    .info
      &__item
        text-align: center
        &--active
          color: $color_active
    .form__header
      margin-top: 2rem
      &--label
        font-weight: bold
  .main
    padding:
      left: $dialog_padding
      right: $dialog_padding
    .info
      &__item
        &--active
          color: $color_active
    .form__header
      margin-top: 2rem
      &--label
        font-weight: bold
  .DistributionFormItem
    margin-top: 1rem
</style>

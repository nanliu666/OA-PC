<template>
  <el-dialog
    :before-close="close"
    :visible="visible"
    append-to-body
    class="Redistribution"
    title="重新分配招聘需求"
  >
    <div class="main">
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
        <el-col :span="6">
          <span class="form__header--label">指定招聘人员</span>
        </el-col>
        <el-col :span="4">
          <span class="form__header--label">招聘任务</span>
        </el-col>
        <el-col :span="4">
          <span class="form__header--label">已入职</span>
        </el-col>
        <el-col :span="4">
          <span class="form__header--label">候选人</span>
        </el-col>
        <el-col :span="6">
          <span class="form__header--label">剩余任务</span>
        </el-col>
      </el-row>

      <RedistributionFormItem
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
import { queryDistribution } from '@/api/personnel/recruitment'
// 表单配置
const FORM_COLUMNS = []

export default {
  name: 'Redistribution',
  components: {
    RedistributionFormItem: () => import('./RedistributionFormItem')
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
      formColumns: FORM_COLUMNS,
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
    }
  },

  methods: {
    init(data = {}) {
      this.form = _.cloneDeep(data)
      this.$emit('update:visible', true)
      this.clearValidate()

      queryDistribution({ recruitmentId: data.id }).then((users) => {
        // 设置taskNum初值
        _.each(users, (user) => (user._taskNum = user.taskNum))
        this.$set(this.form, 'users', users)
      })
    },
    close() {
      this.submitting = false
      this.form = {}
      this.$emit('update:visible', false)
    },
    clearValidate() {
      // this.$nextTick(() => this.$refs.form.clearValidate())
    },

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
            users: _.map(res.users, ({ userId, taskNum, $config }) => ({
              userId,
              taskNum,
              operatorType: $config ? 'Add' : 'Update'
            }))
          }
          this.$emit('submit', data)
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },

    async validate() {
      if (this.toAssigned > 0) {
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
$color_active: #368afa;
$dialog_padding: 3rem

.Redistribution
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
  .RedistributionFormItem
    margin-top: 1rem
</style>

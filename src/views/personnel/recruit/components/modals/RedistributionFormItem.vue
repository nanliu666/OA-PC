<template>
  <div class="RedistributionFormItem">
    <template v-for="(form, index) of localValue">
      <el-row
        :key="index"
        :gutter="20"
      >
        <el-col :span="6">
          <span
            v-if="_.get(form.$config, 'userId.writable')"
            class="form__input"
          >
            <lazy-select
              v-model="form.userId"
              class="form__input--select"
              :disabled="_.get(form.$config, 'userId.disabled')"
              :load="loadUsers"
              :option-props="{ key: 'userId', label: 'name', value: 'userId' }"
              placeholder="请选择人员"
              searchable
              @change="(val) => validateUserId(val, form)"
            />
            <el-button
              type="text"
              icon="icon-basics-delete-outlined"
              class="form__input--delete"
              @click="() => handleFormItemDeleteBtnClick(form)"
            />
          </span>
          <span
            v-else
            class="form__text"
            v-text="form.name"
          />
        </el-col>
        <el-col :span="4">
          <span
            v-if="_.get(form.$config, 'taskNum.writable')"
            class="form__input"
          >
            <el-input
              v-if="_.get(form.$config, '_taskNum.writable')"
              v-model="form._taskNum"
              :disabled="_.get(form.$config, '_taskNum.disabled')"
            />
          </span>
          <span
            v-else
            class="form__text"
            v-text="form._taskNum"
          />
        </el-col>
        <el-col :span="4">
          <span
            v-if="_.get(form.$config, 'entryNum.writable')"
            class="form__input"
          >
            <el-input
              v-model="form.entryNum"
              :disabled="_.get(form.$config, 'entryNum.writable')"
            />
          </span>

          <span
            v-else
            class="form__text"
            v-text="form.entryNum"
          />
        </el-col>
        <el-col :span="4">
          <span
            v-if="_.get(form.$config, 'candidateNum.writable')"
            class="form__input"
          >
            <el-input
              v-model="form.candidateNum"
              :disabled="_.get(form.$config, 'candidateNum.writable')"
            />
          </span>

          <span
            v-else
            class="form__text"
            v-text="form.candidateNum"
          />
        </el-col>
        <el-col :span="6">
          <span class="form__input">
            <el-input-number
              :max="getMax(localValue.filter((i) => i !== form))"
              :min="0"
              :precision="0"
              :value="_.get(form, 'taskNum')"
              class="form__input--number"
              controls-position="right"
              @change="(val) => handleTaskNumInput(val, form)"
            />
          </span>
        </el-col>
        <!--  -->
      </el-row>
    </template>

    <div class="operation">
      <el-button
        type="text"
        icon="icon-tips-plus-outlined"
        @click="handleAddBtnClick"
      >
        添加人员
      </el-button>
    </div>
  </div>
</template>

<script>
import { getFormal } from '@/api/personnel/recruitment'

export default {
  name: 'RedistributionFormItem',
  components: {
    LazySelect: () => import(/* webpackChunkName: "views" */ '@/components/lazy-select/lazySelect')
  },
  inject: ['$dialog'],
  props: {
    value: {
      type: Array,
      default: _.stubArray
    },

    // 上限
    limit: {
      type: Number,
      default: Infinity
    }
  },
  data() {
    return {
      localValue: []
    }
  },
  computed: {},
  watch: {
    localValue: {
      deep: true,
      // 同步 localValue 与 $props.value
      handler() {
        this.$emit('change', _.cloneDeep(this.localValue))
      }
    },

    value: {
      deep: true,
      immediate: true,
      handler(val) {
        if (_.isEqual(val, this.localValue)) {
          return
        }
        this.localValue = val
      }
    }
  },
  methods: {
    loadUsers(param) {
      const { orgId } = this.$dialog.form
      return getFormal(_.assign({ orgId }, param))
    },

    handleFormItemDeleteBtnClick(target) {
      this.localValue = _.difference(this.localValue, [target])
    },
    // 点击添加人员按钮
    handleAddBtnClick() {
      if (_.get(_.last(this.localValue), 'userId') || !this.localValue.length) {
        this.createFormItem()
      } else {
        this.$message.error('请先选择员工')
      }
    },

    // 新建一个表单项
    /**
     * @param {object} initialValue 添加一个项目使用的初值
     * @param {boolean} isCreated 是否是新建的项
     */
    createFormItem(
      initialValue = {
        userId: null,
        taskNum: 0,
        _taskNum: 0,
        entryNum: 0,
        olditem: 0,
        candidateNum: 0
      },
      isCreated = true
    ) {
      const item = {
        $config: {
          userId: {
            writable: isCreated
          },
          _taskNum: {
            writable: true
          }
        },
        ...initialValue
      }
      this.localValue.push(item)
    },

    validateTaskNum(taskNum) {
      let isValid = true
      switch (true) {
        case taskNum < 0:
          isValid = false
          this.$message.warning('任务数不能小于0')
          break
        default:
      }
      return isValid
    },
    validateUserId(val, form) {
      if (_.find(_.initial(this.localValue), { userId: val })) {
        this.$message.error('该人员已被指定')
        form.userId = null
        return false
      } else {
        return true
      }
    },
    // 校验任务数量是否合理
    handleTaskNumInput(val, form) {
      if (this.validateTaskNum(val)) {
        this.$set(form, 'taskNum', val)
      }
    },

    getMax(others) {
      return this.limit - _.sumBy(others, 'taskNum')
    }
  }
}
</script>

<style lang="sass" scoped>
$color_danger: #FF8B8A

.RedistributionFormItem
  .form__input
    &--select,&--number
      width: 150px
    &--delete
      color: $color_danger
      &:hover
        color: #FF6B6B
      &::before
        content: ""
        margin-left: .3rem
  .form__text
    line-height: 2.5rem
    &::after
      content: ""
      margin-right: 1rem
  .operation
    margin-top: 1rem
</style>

// 表单计数公共逻辑
import { getOrgUserList } from '@/api/system/user'

export default {
  components: {
    LazySelect: () => import(/* webpackChunkName: "views" */ '@/components/lazy-select/lazySelect')
  },
  inject: ['$dialog'],
  props: {
    value: {
      type: Array,
      default: () => []
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
      return getOrgUserList(_.assign({ orgId }, param))
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

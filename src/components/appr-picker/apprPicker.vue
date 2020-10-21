<template>
  <div class="appr-user">
    <el-form
      ref="form"
      :rules="rules"
      :model="{}"
      size="medium"
      label-position="top"
    >
      <el-form-item
        v-if="conditonHasInitiator"
        label="所在部门"
      >
        <el-select
          v-model="fullOrgId"
          placeholder="请选择部门"
        >
          <el-option
            v-for="org of userOrgList"
            :key="org.fullOrgId"
            :label="org.orgName"
            :value="org.fullOrgId"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="审批流程"
        prop="approver"
      >
        <!-- 当流程数据存在时挂载  -->
        <!--如果第一级条件存在发起人时，需要校验是否选择了当前部门-->
        <appr-picker-item
          v-if="processData"
          v-show="!processErrored && processFullfilled"
          ref="apprPickerItem"
          path="0"
          :form-data="formData"
          :type="processData.type"
          :child-node="processData.childNode"
          :parallel-nodes="processData.parallelNodes"
          :condition-nodes="processData.conditionNodes"
          :full-org-id="fullOrgId"
          :is-first="true"
          @hook:mounted="checkFullfilled"
        />
        <div v-if="!processFullfilled">
          必填信息填写后，流程将自动显示
        </div>
        <div v-if="processErrored">
          流程出错：当前条件没有设置审批人，请联系管理员
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
import apprPickerItem from './apprPickerItem'
import { submitApprApply, getUserOrgList } from '@/api/apprProcess/apprProcess'

import { mapGetters } from 'vuex'

export default {
  name: 'ApprPicker',
  components: {
    apprPickerItem
  },
  props: {
    processData: {
      type: Object,
      default: null
    },
    formData: {
      type: Object,
      default: null
    }
  },
  data() {
    var checkAppr = (rule, value, callback) => {
      let res = this.checkValidate()
      if (!res.valid) {
        callback(new Error(res.message))
      }
      callback()
    }
    return {
      conditonHasInitiator: false,
      conditionFieldsFullfilled: false,
      conditionFullfiled: false,
      conditionFields: [],
      userOrgList: [],
      fullOrgId: null,
      noMatchOrg: null,
      rules: {
        fullOrgId: [{ required: true, trigger: 'change', message: '请选择所在部门' }],
        approver: [{ required: true, validator: checkAppr, trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userId']),
    // 流程出错
    processErrored() {
      return (this.fullOrgId && this.noMatchOrg) || this.conditonHasInitiator
        ? this.fullOrgId && this.conditionFieldsFullfilled && !this.conditionFullfiled
        : this.conditionFieldsFullfilled && !this.conditionFullfiled
    },
    // 流程条件是否完善
    processFullfilled() {
      return this.conditonHasInitiator
        ? !!this.fullOrgId && this.conditionFieldsFullfilled
        : this.conditionFieldsFullfilled
    }
  },

  watch: {
    fullOrgId() {
      setTimeout(() => {
        this.checkFullfilled()
        this.noMatchOrg = this.$refs.apprPickerItem && this.$refs.apprPickerItem.noMatchOrg
      })
    },
    formData: {
      handler() {
        this.checkFullfilled()
      },
      deep: true
    },
    processData: {
      handler(val) {
        // 动态检查条件对应的字段是否全部填写
        this.getConditionFields(this.processData)
        // 监听流程数据判断有没有发起人条件，有的话并获取用户所在的组织
        this.conditonHasInitiator = _.get(val, 'conditionNodes', []).some(
          (node) => _.get(node, 'properties.initiator.length') > 0
        )
        if (this.conditonHasInitiator) {
          this.getUserOrgList()
        }
      }
    }
  },
  provide: function () {
    const that = this
    return {
      // 根据path判断是否是最后一个节点
      isLastNode: function (path) {
        const pathList = []
        const loop = ($el) => {
          if (!$el.data.noData) {
            pathList.push($el.path)
          }
          let children = $el.$children.filter((item) => item.$options.name === 'ApprPickerItem')
          children.forEach((child) => loop(child))
        }
        loop(that.$refs.apprPickerItem)
        return path === _.max(pathList)
      }
    }
  },
  methods: {
    checkFullfilled() {
      // 校验条件对应的表单项是否全部填写
      this.conditionFieldsFullfilled = this.conditionFields.every(
        // _.isEmpty函数无法验证Number类型
        ({ prop: field }) => !_.isEmpty(this.formData[field]) || _.isNumber(this.formData[field])
      )
      this.$nextTick(() => {
        // 校验条件分支节点是否全部满足
        this.conditionFullfiled = this.checkConditionFullfilled()
      })
    },
    getUserOrgList() {
      getUserOrgList({ userId: this.userId }).then((res) => {
        this.userOrgList = res
      })
    },
    validate() {
      return this.$refs.form.validate(...arguments)
    },
    /**
     * 审批提交
     * @param {Object} data
     * @param {Object} data.processMap - 变量
     * @param {Object} data.processName - 流程名称
     * @param {Object} data.processId - 流程ID
     * @param {Object} data.formId - 表单ID (旧业务需要)
     * @param {Object} data.formKey -  表单Key（旧业务需要）
     * @param {Object} data.formData - 表单数据
     */
    submit(data) {
      if (!this.checkValidate().valid) {
        return false
      }
      const processMap = this.createProcessMap()
      const nodeData = this.createNodeLine()
      return submitApprApply({
        ...data,
        title: `${this.userInfo.nick_name}发起的${data.processName}`,
        userId: this.userId,
        processMap: Object.assign(
          {},
          processMap,
          this.createConditionProcessMap(),
          data.processMap
        ),
        nodeData: JSON.stringify(nodeData)
      })
    },
    checkValidate() {
      let message = null,
        valid = true
      if (this.conditonHasInitiator && !this.fullOrgId) {
        message = '请先选择所在部门'
        valid = false
      } else if (this.processErrored) {
        message = '流程出错，请联系管理员'
        valid = false
      } else if (!this.conditionFieldsFullfilled) {
        message = '请先填写表单必填项'
        valid = false
      } else if (!this.checkApprovers()) {
        message = '请选择审批人'
        valid = false
      }
      return { message, valid }
    },
    // 递归检查审批人是否已选
    checkApprovers() {
      let valid = true
      const loop = ($el) => {
        let data = $el.data
        if (!data || (data.type === 'approver' && data.userList.length === 0)) {
          valid = false
        }

        let children = $el.$children.filter((item) => item.$options.name === 'ApprPickerItem')
        if (children.length > 0) {
          children.forEach((child) => loop(child))
        }
      }
      if (!this.conditionFieldsFullfilled) {
        return false
      }
      loop(this.$refs.apprPickerItem)
      return valid
    },
    // 校验条件分支节点是否全部满足
    checkConditionFullfilled() {
      let fullfilled = true
      const loop = ($el) => {
        if (_.isEmpty($el.data)) {
          fullfilled = false
        }
        let children = $el.$children.filter((item) => item.$options.name === 'ApprPickerItem')
        if (children.length > 0) {
          children.forEach((child) => loop(child))
        }
      }
      if (this.$refs.apprPickerItem) {
        loop(this.$refs.apprPickerItem)
      } else {
        fullfilled = false
      }
      return fullfilled
    },
    // 递归生成变量数据对象
    createProcessMap() {
      let map = {}
      const loop = ($el) => {
        let data = $el.data
        if (!data) {
          return
        }
        if (data.variable) {
          if (
            // 是否是会签或者或签，分为自选多个人和指定多个人
            (data.properties.assigneeType == 'optional' && data.properties.optionalMultiUser) ||
            (data.properties.assigneeType == 'user' && data.userList.length > 1)
          ) {
            // 会签或者或签审批人变量需要传数组类型
            map[data.variable] = [
              ...new Set(data.userList.map((item) => 'taskUser_' + this.getUserId(item)))
            ]
          } else {
            map[data.variable] = 'taskUser_' + this.getUserId(data.userList[0])
          }
        }
        let children = $el.$children.filter((item) => item.$options.name === 'ApprPickerItem')
        if (children.length > 0) {
          children.forEach((child) => loop(child))
        }
      }
      loop(this.$refs.apprPickerItem)
      return map
    },
    getUserId(user) {
      let id = user.id || user.userId
      if (id.split('_').length > 1) {
        return id.split('_')[1]
      } else {
        return id
      }
    },
    // 生成条件变量
    createConditionProcessMap() {
      const { formData } = this
      let processMap = this.conditionFields.reduce((acc, { prop, type }) => {
        if (type === 'checkbox') {
          acc[prop] = _.sortBy(formData[prop]).join()
        } else if (type === 'daterange') {
          const [date1, date2] = formData[prop]
          // diff date1以免出现负数，区间计算当天（+1天）
          acc[prop] = moment.duration(moment(date2).diff(date1)).days() + 1
        } else {
          acc[prop] = formData[prop]
        }
        return acc
      }, {})
      if (this.conditonHasInitiator) {
        processMap['initiator_org'] =
          this.$refs.apprPickerItem.conditionOrgId || this.fullOrgId.split('.').slice(-1)[0]
      }
      return processMap
    },
    // 获取条件对应的表单字段
    getConditionFields() {
      let fields = []
      const loop = (node) => {
        let conditions = _.get(node, 'properties.conditions', null)
        if (Array.isArray(conditions)) {
          conditions.forEach((condition) => {
            fields.push({
              prop: condition.vModel,
              type: condition.type
            })
          })
        }
        node.childNode && loop(node.childNode)
        Array.isArray(node.conditionNodes) && node.conditionNodes.forEach(loop)
        Array.isArray(node.parallelNodes) && node.parallelNodes.forEach(loop)
      }

      this.processData && loop(this.processData)
      // 动态生成所有节点需要的字段数组
      return (this.conditionFields = _.uniqWith(fields, _.isEqual))
    },
    // 根据表单输入和审批人选择，生成线性节点数组
    createNodeLine() {
      let start = JSON.parse(JSON.stringify(this.processData))
      delete start.childNode
      delete start.conditionNodes
      delete start.parallelNodes
      start.userList = [
        {
          name: this.userInfo.nick_name,
          userId: this.userId,
          workNo: this.userInfo.work_no,
          type: 'user'
        }
      ]
      const line = [start]
      const loop = ($el, list) => {
        if ($el.parallelNodes) {
          let parallel = []
          list.push(parallel)
          $el.$children
            .filter((item) => item.$options.name === 'ApprPickerItem')
            .sort((a, b) => (a.path > b.path ? 1 : -1))
            .forEach((item) => {
              if (item.type === 'parallel') {
                // 处理并行审批分支
                let parallelLine = []
                parallel.push(parallelLine)
                loop(item, parallelLine)
              } else {
                loop(item, list)
              }
            })
        } else {
          let data = JSON.parse(JSON.stringify($el.data))
          if (!data.noData) {
            delete data.conditionNodes
            delete data.childNode
            delete data.parallelNodes
            data.properties.approvers = []
            list.push(data)
          }
          $el.$children
            .filter((item) => item.$options.name === 'ApprPickerItem')
            .sort((a, b) => (a.path > b.path ? 1 : -1))
            .forEach((item) => loop(item, list))
        }
      }
      loop(this.$refs.apprPickerItem, line)
      return line
    }
  }
}
</script>

<style lang="scss" scoped>
.appr-user {
  &__title {
    line-height: 20px;
    padding-bottom: 8px;
    color: #606266;
  }
}
</style>

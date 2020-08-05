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
        label="审批流程"
        prop="approver"
      >
        <appr-picker-item
          v-if="processData && conditionFieldsFullfilled"
          ref="apprPickerItem"
          :form-data="formData"
          :child-node="processData.childNode"
          :condition-nodes="processData.conditionNodes"
          :is-first="true"
        />
        <div v-if="!conditionFieldsFullfilled">
          必填信息填写后，流程将自动显示
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import apprPickerItem from './apprPickerItem'
import { submitApprApply } from '@/api/apprProcess/apprProcess'

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
      if (!this.conditionFieldsFullfilled) {
        callback(new Error('请先填写表单必填项'))
        return
      }
      if (!this.checkApprovers()) {
        callback(new Error('请选择审批人'))
      } else {
        callback()
      }
    }
    return {
      pickerVisible: false,
      conditionFieldsFullfilled: false,
      conditionFields: [],
      rules: {
        approver: [{ required: true, validator: checkAppr }]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userId'])
  },

  watch: {
    formData: {
      handler(val) {
        // 动态检查条件对应的自身是否全部填写
        this.conditionFieldsFullfilled = this.getConditionFields(this.processData).every(
          (field) => !_.isNil(val[field])
        )
      },
      deep: true
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    submit(data) {
      if (!this.checkApprovers()) {
        return false
      }
      const processMap = this.createProcessMap(this.$refs.apprPickerItem)
      const nodeData = this.createNodeLine()

      return submitApprApply({
        ...data,
        formData: JSON.stringify(data.formData),
        title: `${this.userInfo.nick_name}发起的${data.processName}审批`,
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
    // 递归生成变量数据对象
    createProcessMap($root) {
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
            map[data.variable] = [
              ...new Set(data.userList.map((item) => 'taskUser_' + item.id.split('_')[1]))
            ]
          } else {
            map[data.variable] = 'taskUser_' + data.userList[0].id.split('_')[1]
          }
        }
        let children = $el.$children.filter((item) => item.$options.name === 'ApprPickerItem')
        if (children.length > 0) {
          children.forEach((child) => loop(child))
        }
      }
      loop($root)
      return map
    },
    // 生成条件变量
    createConditionProcessMap() {
      return this.conditionFields.reduce((acc, curr) => {
        acc[curr] = this.formData[curr] + ''
        return acc
      }, {})
    },
    getConditionFields() {
      const fields = new Set()
      const loop = (node) => {
        let conditions = _.get(node, 'properties.conditions', null)
        if (Array.isArray(conditions)) {
          conditions.forEach((condition) => {
            fields.add(condition.vModel)
          })
        }
        node.childNode && loop(node.childNode)
        Array.isArray(node.conditionNodes) && node.conditionNodes.forEach(loop)
      }
      loop(this.processData)
      // 动态生成所有节点需要的字段数组
      this.conditionFields = [...fields]
      return [...fields]
    },
    // 生成线性节点数组
    createNodeLine() {
      let start = JSON.parse(JSON.stringify(this.processData))
      delete start.childNode
      delete start.conditionNodes
      start.userList = [
        {
          name: this.userInfo.nick_name,
          userId: this.userId,
          workNo: this.userInfo.account,
          type: 'user'
        }
      ]
      const line = [start]
      const loop = ($el) => {
        let data = JSON.parse(JSON.stringify($el.data))
        delete data.conditionNodes
        delete data.childNode
        line.push(data)
        // 注意sort是为了将节点按上下顺序排序
        let children = $el.$children
          .filter((item) => item.$options.name === 'ApprPickerItem')
          .sort((a, b) => a.$el.offsetTop - b.$el.offsetTop)
        children.forEach((child) => loop(child))
      }
      loop(this.$refs.apprPickerItem)
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

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
          :form-data="formData"
          :child-node="processData.childNode"
          :condition-nodes="processData.conditionNodes"
          :is-first="true"
        />
        <div v-else>
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
      if (!this.checkApprovers(this.processData)) {
        callback(new Error('请选择审批人'))
      } else {
        callback()
      }
    }
    return {
      pickerVisible: false,
      conditionFieldsFullfilled: false,
      rules: {
        approver: [{ required: true, validator: checkAppr }]
      }
    }
  },
  watch: {
    formData: {
      handler(val) {
        this.conditionFieldsFullfilled = this.getConditionFields(this.processData).every(
          (field) => !_.isNil(val[field])
        )
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userId'])
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    submit(data) {
      if (!this.checkApprovers(this.processData)) {
        return false
      }
      const processMap = this.createProcessMap(this.processData)
      return submitApprApply({
        ...data,
        formData: JSON.stringify(data.formData),
        title: `${this.userInfo.nick_name}发起的${data.processName}审批`,
        userId: this.userId,
        processMap: Object.assign({}, processMap, data.processMap)
      })
    },
    // 递归检查审批人是否已选
    checkApprovers(data) {
      if (data.type === 'approver' && data.properties.approvers.length === 0) {
        return false
      }
      if (data.childNode) {
        return this.checkApprovers(data.childNode)
      }
      return true
    },
    // 递归生成变量数据对象
    createProcessMap(data, map = {}) {
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
      if (data.childNode) {
        return this.createProcessMap(data.childNode, map)
      } else {
        return map
      }
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
      return [...fields]
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

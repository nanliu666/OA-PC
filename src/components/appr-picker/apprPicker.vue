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
          :process-data="processData.childNode"
          :is-first="true"
        />
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
      default: () => ({})
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
      rules: {
        approver: [{ required: true, validator: checkAppr }]
      }
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
        map[data.variable] = [
          ...new Set(data.userList.map((item) => 'taskUser_' + item.id.split('_')[1]))
        ].join(',')
      }
      if (data.childNode) {
        return this.createProcessMap(data.childNode, map)
      } else {
        return map
      }
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

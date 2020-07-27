<template>
  <div class="appr-user">
    <div class="appr-user__title">
      审批流程
    </div>
    <appr-user-item
      :process-data="processData.childNode"
      :is-first="true"
    />
  </div>
</template>

<script>
import apprUserItem from './apprUserItem'

export default {
  name: 'ApprUser',
  components: {
    apprUserItem
  },
  props: {
    processData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      pickerVisible: false
    }
  },
  methods: {
    submit() {
      if (!this.checkApprovers(this.processData)) {
        return false
      }
      return this.createProcessMap(this.processData)
    },
    checkApprovers(data) {
      if (data.type === 'approver' && data.properties.approvers.length === 0) {
        return false
      }
      if (data.childNode) {
        return this.checkApprovers(data.childNode)
      }
      return true
    },
    createProcessMap(data, map = {}) {
      let users = []
      if (data.variable) {
        if (data.type === 'approver') {
          users = data.properties.approvers
        } else if (data.type === 'copy') {
          users = data.properties.members
        }
        map[data.variable] = [...new Set(users.map((item) => item.id.split('_')[1]))]
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

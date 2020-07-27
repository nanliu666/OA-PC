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

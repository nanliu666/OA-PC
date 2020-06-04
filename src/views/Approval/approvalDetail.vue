<template>
  <div style="height:100%;width: 100% ">
    <div class="header">
      <div><i class="icon el-icon-arrow-left" /> 审批流程</div>
    </div>
    <div class="view-case approval">
      <div class="flex flex-justify-start flex-items title">
        <i class="el-icon-caret-bottom" />审批流程
        <el-link
          type="primary"
          class="hellp"
        >
          审批流程帮助
        </el-link>
      </div>
      <approvalcompoent :approval-list="approvalList" />
    </div>
  </div>
</template>

<script>
import approvalcompoent from '@/views/approval/components/approvalcompoent'
import { getAppProcess } from '@/api/approval/approval'
export default {
  name: 'ApprovalDetail',
  components: { approvalcompoent },
  data() {
    return {
      input: '',
      approvalList: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      let params = {
        formKey: this.$route.query.formKey
      }
      getAppProcess(params).then((res) => {
        this.approvalList = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.approval {
  padding-left: 200px !important;
}
.icon {
  font-weight: bold;
}
.title {
  font-size: 16px;
  margin-left: -10px;
  .hellp {
    font-size: 16px;
    margin-left: 16px;
  }
}
</style>

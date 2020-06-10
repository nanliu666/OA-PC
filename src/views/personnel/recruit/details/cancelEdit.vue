<template>
  <el-dialog
    title="离开页面提醒"
    :visible="visible"
    width="600px"
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <p class="riskSpan">
      <i class="el-icon-warning-outline" />
      您有未保存的数据，直接离开将丢失数据，您是否要保存并离开？
    </p>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        style="float: left;"
        @click="doNotSave"
      >不保存</el-button>
      <el-button
        size="medium"
        @click="handleClose"
      >取消</el-button>
      <el-button
        type="primary"
        size="medium"
        @click="goBack"
      >保存并离开</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'CancelEdit',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    doNotSave() {
      this.$emit('isDoNotSave')
      this.handleClose()
      this.goBack()
    },
    init() {
      this.$emit('update:visible', true)
    },
    handleClose() {
      this.$emit('update:visible', false)
      this.goBack()
    },
    goBack() {
      this.$router.go(-1)
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
    }
  }
}
</script>

<style lang="scss" scoped>
.newOrgDailog {
  .el-select {
    width: 100%;
  }
}
.addressLoading {
  text-align: center;
}
/deep/ .el-form-item__error {
  padding-top: 0;
}
/deep/ .newOrgDailog {
  .el-form--label-top {
    .el-form-item__label {
      padding: 0 0 0 0;
    }
  }
}
/deep/ .el-dialog__header {
  border-bottom: 1px solid #ccc;
}

.riskSpan {
  padding-bottom: 10px;
}

/deep/ .el-dialog__body {
  padding: 30px 35px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
</style>

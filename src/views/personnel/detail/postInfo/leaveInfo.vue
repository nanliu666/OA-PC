<template>
  <div
    id="staff-status"
    class="info-wrapper"
  >
    <div class="info-title-bar">
      <span class="info-title">离职信息</span>
    </div>
    <div class="info-content no-back-color">
      <el-form
        :model="staffInfo"
        label-width="150px"
        class="info-form"
        size="small"
      >
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="离职日期:">
              <span class="info-item-value">{{ staffInfo.leaveDate }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="离职申请日期:">
              <span class="info-item-value">{{ staffInfo.applyDate }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="离职原因:">
              <span class="info-item-value">{{ LeaveReason[staffInfo.reason] }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="离职原因说明:">
              <span class="info-item-value">{{ staffInfo.remark }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      staffInfo: {},
      LeaveReason: {}
    }
  },

  watch: {
    info: {
      handler(val) {
        this.staffInfo = val
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.$store.dispatch('CommonDict', 'LeaveReason').then((res) => {
      res.forEach((item) => {
        this.LeaveReason[item.dictKey] = item.dictValue
      })
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>

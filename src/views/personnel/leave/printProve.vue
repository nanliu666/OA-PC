<template>
  <div>
    <page-header
      title="离职证明"
      show-back
      :back="goBack"
    />
    <div class="btn-wrap">
      <div class="btn-box">
        <el-button
          type="primary"
          size="medium"
        >
          打印
        </el-button>
        <el-button size="medium">
          下载
        </el-button>
      </div>
    </div>
    <basic-container>
      <div
        style="font-family: PingFangSC-Medium; font-size: 32px; color: #202940;letter-spacing: 6px;text-align: 
        right;line-height: 40px;"
      >
        <div>
          <h3 style="text-align:center;">
            离 职 证 明
          </h3>
          <div
            style="font-family: PingFangSC-Regular;font-size: 14px;color: #202940;line-height: 26px; text-align:center"
          >
            <p>
              <span>{{ userInfo.name }}(身份证号码:{{ userInfo.idNo }})</span>
            </p>
          </div>
        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        userId: '用户ID',
        workNo: '工号',
        name: '张三丰',
        idType: '证件类型，字典组：IDType',
        idNo: '445678913635816589723',
        companyId: '入职公司ID',
        companyName: '入职公司名称',
        orgId: '部门ID',
        orgName: '部门名称',
        jobId: '职位Id',
        jobName: '职位名称',
        entryDate: '入职日期，YYYY-MM-DD',
        leaveDate: '离职日期，YYYY-MM-DD',
        relieveDate: '解除合同日期，YYYY-MM-DD'
      }
    }
  },
  methods: {
    //goBack
    goBack() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>

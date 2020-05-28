<template>
  <div>
    <page-header
      title="离职证明"
      show-back
    />
    <div class="btn-wrap">
      <div class="btn-box">
        <el-button
          type="primary"
          size="medium"
        >
          打印预览
        </el-button>
        <el-button size="medium">
          下载
        </el-button>
      </div>
    </div>
    <basic-container>
      <div style="padding:0 24px 24px 24px;border:1px solid #ccc">
        <h3 style="text-align:center;">
          离 职 证 明
        </h3>
      </div>
    </basic-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offerInfo: {
        name: '宋智孝',
        orgName: '3132165749872167',
        jobName: '465',
        entryDate: '4564',
        probationSalary: '5454',
        formalSalary: '54654'
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.btn-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>

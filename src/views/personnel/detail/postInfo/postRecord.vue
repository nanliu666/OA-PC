<template>
  <div
    id="post-record"
    class="info-wrapper"
  >
    <div class="info-title-bar">
      <span class="info-title">任职记录</span>
    </div>
    <div
      v-for="(item, index) in recordInfo"
      :key="index"
      class="info-content no-back-color"
    >
      <el-form
        :model="item"
        label-width="150px"
        class="info-form"
        size="small"
      >
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="任职开始日期:">
              <span class="info-item-value">{{ item.beginDate }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="任职结束日期:">
              <span class="info-item-value">{{ item.endDate }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="部门:">
              <span class="info-item-value">{{ item.orgName }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="职位:">
              <span class="info-item-value">{{ item.jobName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="岗位:">
              <span class="info-item-value">{{ item.positionName }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="合同公司:">
              <span class="info-item-value">{{ item.companyName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="工作地址:">
              <span class="info-item-value">{{ item.address }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="备注:">
              <span class="info-item-value">{{ item.remark }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getOfficeInfo } from '../../../../api/personalInfo'

export default {
  data() {
    return {
      recordInfo: {}
    }
  },
  created() {
    this.getRecordInfo()
  },

  methods: {
    getRecordInfo() {
      let params = {
        userId: this.$route.query.userId
      }
      getOfficeInfo(params).then((res) => {
        this.recordInfo = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('../staffInfo.scss');
</style>

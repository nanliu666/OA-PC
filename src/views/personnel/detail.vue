<template>
  <basic-container>
    <el-page-header
      content="添加员工"
      @back="goBack"
    />
    <el-row
      type="flex"
      justify="left"
    >
      <el-col :span="2">
        <div class="detail-box">
          <div class="demo-basic--circle ">
            <div class="block">
              <el-avatar
                :size="80"
                :src="circleUrl"
              />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="grid-content bg-purple">
          刘德华
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          (GZ878)
        </div>
      </el-col>
      <el-col
        :span="2"
      >
        <div class="grid-content bg-purple">
          <el-button
            type="primary"
            size="small"
            plain
          >
            正式
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          手机号码：13978955852
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          部门：设计小组
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple" />
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple" />
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple" />
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple" />
      </el-col>
    </el-row>
  </basic-container>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-box {
  display: flex;
  margin-top: 20px;
  .detail-box-left {
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

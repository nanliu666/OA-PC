<template>
  <basic-container>
    <el-page-header content="员工信息详情" @back="goBack" />
    <el-row class="el-name" :gutter="20">
      <el-col :span="2">
        <div class="detail-box">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="80" :src="circleUrl"></el-avatar>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="22">
        <el-col :span="18">
          <div class="grid-content bg-purple">
            刘德华(GZ878)
            <el-button type="primary" size="small" plain>正式</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type size="medium" plain>晋升</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type size="medium" plain>调岗</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type size="medium" plain>办理离职</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">手机号码：13978955852</div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            部门：设计小组
            <el-button type size="small" plain>主</el-button>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            职位：产品经理
            <el-button type size="small" plain>主</el-button>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">上级领导：陈晓晓</div>
        </el-col>
      </el-col>
    </el-row>
    <!--  -->
    <el-tabs v-model="activeName" stretch="true" @tab-click="handleClick">
      <el-tab-pane label="在职信息" name="first">在职信息</el-tab-pane>
      <el-tab-pane label="个人信息" name="second">个人信息</el-tab-pane>
      <el-tab-pane label="材料附件" name="third">
        <upload-Data />
      </el-tab-pane>
      <el-tab-pane label="操作记录" name="fourth">
        <action-record />
      </el-tab-pane>
    </el-tabs>
  </basic-container>
</template>
<script>
import actionRecord from './components/actionRecord'
import uploadData from './components/uploadData'
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  components: {
    actionRecord,
    uploadData
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-name {
  margin-top: 25px;
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

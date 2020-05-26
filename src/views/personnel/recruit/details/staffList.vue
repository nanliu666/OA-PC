<template>
  <div>
    <el-page-header
      content="详情"
      class="pageHeader"
      show-back
    />
    <div class="roster-header">
      <el-row
        style="width:100%; height:50px"
        type="flex"
        justify="center"
        :gutter="24"
      >
        <el-col :span="23">
          <span> {{ name }}分配的招聘需求（{{ department }}-{{ position }}）</span>
        </el-col>
        <el-col :span="1">
          <el-button
            type="primary"
            size="medium"
            plain
          >
            负责
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="roster-header">
      <el-row
        style="width:100%; height:50px"
        type="flex"
        justify="center"
        :gutter="24"
      >
        <el-col :span="6">
          需求编号：RYZB0002
        </el-col>
        <el-col :span="6">
          提交人：张琦
        </el-col>
        <el-col :span="6">
          提交时间：2019-12-12 12:12:09
        </el-col>
        <el-col :span="6">
          状态：已结束
        </el-col>
      </el-row>
    </div>
    <basic-container>
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="招聘进度"
          name="inrecruitment"
        >
          <staff-list />
        </el-tab-pane>

        <el-tab-pane
          label="招聘需求详情"
          name="recruitmentdemand"
        >
          <staff-details />
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>
<script>
import StaffList from './paging/List'
import StaffDetails from './paging/details'
export default {
  name: 'RecruitList',
  components: {
    StaffList,
    StaffDetails
  },
  data() {
    return {
      name: 'xxx',
      department: '部门',
      position: '职位',
      activeName: 'inrecruitment'
    }
  },
  methods: {
    opnDetails() {
      this.$router.push('./recruitmentNeeds')
    }
  }
}
</script>

<style lang="scss" scoped>
.roster-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  h4 {
    font-size: 18px;
  }
}
.state {
  display: flex;
  padding: 0 6px;
  margin-bottom: 10px;
  .on {
    flex: 4;
    background: #ffffff;
    border-radius: 4px;
    margin-right: 20px;
    display: flex;
    > div {
      flex: 1;
      text-align: center;
      height: 46px;
      margin: 30px 0;
      line-height: 46px;
      border-right: 1px solid #e3e7e9;
      cursor: pointer;
      .bottomBox {
        height: 2px;
        width: 68px;
        background: #207efa;
        margin: 0 auto;
        margin-top: 28px;
      }
    }
    :last-of-type {
      border-right: 0;
    }
    .current {
      color: #207efa;
    }
  }
  .left {
    flex: 1;
    background: #ffffff;
    border-radius: 4px;
    > div {
      flex: 1;
      text-align: center;
      height: 46px;
      margin: 30px 0;
      line-height: 46px;
      cursor: pointer;
      .bottomBox {
        height: 2px;
        width: 68px;
        background: #207efa;
        margin: 0 auto;
        margin-top: 28px;
      }
    }
    .current {
      color: #207efa;
    }
  }
}
.resetEdge {
  position: absolute;
  right: 20px;
}
</style>

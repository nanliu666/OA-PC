<template>
  <div>
    <page-header
      title="需求详情"
      class="pageHeader"
      show-back
    />
    <basic-container style="margin-button: 5px">
      <el-row :gutter="24">
        <el-col class="fullName">
          {{ name }}提交的招聘需求
        </el-col>
      </el-row>
      <el-row
        :gutter="24"
        type="flex"
        style="margin-top:20px"
      >
        <el-col :span="4">
          <span class="nodetitle">需求编号:</span>
          <span class="content">{{ number }}</span>
        </el-col>

        <el-col :span="4">
          <span class="nodetitle">提交人:</span>
          <span class="content">{{ name }}</span>
        </el-col>

        <el-col :span="4">
          <span class="nodetitle">提交时间:</span>
          <span class="content">{{ time }}</span>
        </el-col>

        <el-col :span="4">
          <span class="nodetitle">状态:</span>
          <span
            class="content"
            style="color: #207EFA"
          >{{ status }}</span>
        </el-col>

        <el-col :span="8">
          <el-button
            style="float: right; margin-top: 5px;"
            size="medium"
            type="primary"
            @click="jumpToDetail"
          >
            复制
          </el-button>
        </el-col>
      </el-row>
    </basic-container>

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
import StaffList from './staffList'
import StaffDetails from './details'
export default {
  name: 'RecruitList',
  components: {
    StaffList,
    StaffDetails
  },
  data() {
    return {
      id: '暂无数据',
      name: 'xxx',
      activeName: 'inrecruitment',
      number: '暂无数据',
      time: '暂无数据',
      status: '暂无状态'
    }
  },
  methods: {
    jumpToDetail() {
      let demand = this.$route.params.id
      this.$router.push(`personnel/recruit/components/recruitmentTasks/recruitmentNeeds/${demand}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.pageHeader {
  height: 48px;
  line-height: 48px;
  font-size: 18px;
}

.state {
  display: flex;
  padding: 0 6px;
  margin-bottom: 10px;
  background-color: #f7f8fa;
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
.fullName {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #202940;
  line-height: 24px;
  font-weight: 600;
}

.nodetitle {
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #718199;
  line-height: 18px;
  display: block;
}
content {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #202940;
}
</style>

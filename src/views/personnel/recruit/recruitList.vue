<template>
  <div>
    <el-page-header
      content="详情"
      show-back
    />

    <div class="roster-header">
      <el-row
        style="width:100%;"
        type="flex"
        justify="center"
        :gutter="24"
      >
        <el-col :span="3">
          <!-- <el-button
            type="text"
            class="bigText"
          >
            我提交的招聘需求
          </el-button> -->
        </el-col>
        <el-col :span="19">
          <!-- <el-button
            type="text"
            class="bigText"
          >
            全部招聘需求
          </el-button> -->
        </el-col>
        <el-col :span="2">
          <el-button
            type="text"
            class="bigText"
            @click="opnDetails"
          >
            新建招聘需求
          </el-button>
        </el-col>
      </el-row>
    </div>
    <basic-container>
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="招聘中"
          name="inrecruitment"
        >
          <finished />
        </el-tab-pane>
        <el-tab-pane
          label="已结束"
          name="Finished                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             "
        >
          <detailsList />
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>
<script>
import DetailsList from './components/recruitmentTasks/detailsList'
import Finished from './components/recruitmentTasks/finished'

export default {
  name: 'RecruitList',
  components: {
    DetailsList,
    Finished
  },
  data() {
    return {
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

// .bigText {
//   font-weight: 500;
//   font-size: 18px;
// }

.resetEdge {
  position: absolute;
  right: 20px;
}
</style>

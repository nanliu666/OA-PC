<template>
  <div>
    <page-header
      title="详情"
      class="pageHeader"
      show-back
    />
    <basic-container>
      <el-button
        type="text"
        class="bigText"
        @click="opnDetails"
      >
        新建招聘需求
      </el-button>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="招聘中"
          name="Approved"
        >
          <detailsList ref="Approved" />
        </el-tab-pane>
        <el-tab-pane
          label="已结束"
          name="Finished                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             "
        >
          <detailsList ref="Finished" />
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>
<script>
import DetailsList from './components/detailsList'
export default {
  name: 'RecruitList',
  components: {
    DetailsList
  },
  data() {
    return {
      activeName: 'Approved'
    }
  },
  methods: {
    opnDetails() {
      this.$router.push('./recruitmentNeeds')
    },
    handleClick(tab) {
      //  console.log('查看数据............',this.$refs.Approved.init())

      // // if(typeof tab.paneName !='undefined') {
      //     if(tab.paneName==='Approved'){
      //       this.$refs.Approved.init(tab.paneName)

      // console.log('查看数据............', this.$refs.Approved)
      //     }else if(tab.paneName==='Finished'){
      this.$refs.Finished.init(tab.paneName)
      // }
      // }
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

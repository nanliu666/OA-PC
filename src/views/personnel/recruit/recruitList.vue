<template>
  <div>
    <page-header
      title="招聘需求"
      class="pageHeader"
      show-back
    />
    <basic-container>
      <el-row :gutter="24">
        <el-col
          :offset="20"
          :span="3"
        >
          <el-button
            size="medium"
            type="primary"
            class="bigText"
            @click="opnDetails"
          >
            新建招聘需求
          </el-button>
        </el-col>
      </el-row>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="招聘中"
          name="Approved"
        >
          <detailsList ref="demand" />
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
      this.$router.push('/personnel/recruit/recruitmentNeeds')
    },
    handleClick(tab) {
      let paneName = tab.paneName.trim()
      if (paneName == 'Finished') {
        this.$refs.demand.init(tab.paneName)
      }
      if (paneName == 'Approved') {
        this.$refs.demand.init(tab.paneName)
      }
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

.bigText {
  position: relative;
  left: 0px !important;
}

.resetEdge {
  position: absolute;
  right: 20px;
}
</style>

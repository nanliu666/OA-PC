<template>
  <div>
    <page-header class="pageHeader">
      <div slot="title">
        <span
          :class="{ active: Select }"
          @click="changeTemp"
        >我提交的招聘需求</span>
        <span style=" margin: 0 20px">|</span>
        <span
          :class="{ active: doNotsave }"
          @click="changeTemp('all')"
        >全部招聘需求</span>
      </div>
      <el-button
        slot="rightMenu"
        class="newlyDemand"
        size="medium"
        type="primary"
        @click="opnDetails"
      >
        新建招聘需求
      </el-button>
    </page-header>
    <basic-container>
      <div v-show="Select">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            label="招聘中"
            name="Approved"
          />
          <el-tab-pane
            label="已结束"
            name="Finished                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             "
          />
        </el-tabs>
        <detailsList ref="demand" />
      </div>

      <div v-show="doNotsave">
        <el-tabs
          v-model="allActiveName"
          @tab-click="allHandleClick"
        >
          <el-tab-pane
            label="招聘中"
            name="allApproved"
          />
          <el-tab-pane
            label="已结束"
            name="allFinished                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             "
          />
        </el-tabs>
        <All-list ref="all" />
      </div>
    </basic-container>
  </div>
</template>
<script>
import DetailsList from './detailsList'
import AllList from './allList'
export default {
  name: 'RecruitList',
  components: {
    DetailsList,
    AllList
  },
  data() {
    return {
      doNotsave: false,
      Select: true,
      choice: 'my',
      activeName: 'Approved',
      allActiveName: 'allApproved'
    }
  },
  methods: {
    opnDetails() {
      this.$router.push('/personnel/recruit/recruitmentNeeds')
    },
    handleClick(tab) {
      let paneName = tab.paneName.trim()
      if (paneName === 'Finished' || paneName === 'Approved') {
        this.$refs.demand.init(paneName)
      }
    },
    allHandleClick(tab) {
      // 特殊情况 API接送固定值  Approved Finished 特殊判定
      let allPaneName = tab.paneName.trim()
      if (allPaneName === 'allApproved') {
        this.$refs.all.init('Approved')
      } else {
        this.$refs.all.init('Finished')
      }
    },
    changeTemp(value) {
      if (value === 'all') {
        this.Select = false
        this.doNotsave = true
      } else {
        this.Select = true
        this.doNotsave = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-radio-button__inner {
  border-radius: 4px !important;
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

.active {
  color: rgba(54, 138, 250, 1);
}
.newlyDemand {
  float: right;
}
</style>

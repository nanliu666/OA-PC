<template>
  <div>
    <page-header class="pageHeader">
      <div slot="title">
        <span
          style="cursor:pointer"
          :class="{ active: Select }"
          @click="changeTemp"
        >我提交的招聘需求</span>
        <span style=" margin: 0 20px">|</span>
        <span
          style="cursor:pointer"
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
            label="审批"
            name="UnderApproval"
          />
          <el-tab-pane
            label="招聘中"
            name="Approved"
          />
          <el-tab-pane
            label="已结束"
            name="Finished                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             "
          />
        </el-tabs>
        <under-approval v-if="activeName === 'UnderApproval'" />
        <detailsList
          v-else
          ref="demand"
        />
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
export default {
  name: 'RecruitList',
  components: {
    DetailsList: () => import('./listfile/detailsList'),
    AllList: () => import('./listfile/allList'),
    underApproval: () => import('./listfile/underApproval')
  },
  data() {
    return {
      doNotsave: false,
      Select: true,
      activeName: 'UnderApproval',
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
        if (typeof this.$refs.demand !== 'undefined') {
          this.$refs.demand.init(paneName)
        }
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
.active {
  color: rgba(54, 138, 250, 1);
}
.newlyDemand {
  float: right;
}
</style>

<template>
  <div>
    <page-header class="pageHeader">
      <div slot="title">
        <span>我的招聘需求</span>
      </div>
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
            name="Finished"
          />
        </el-tabs>
        <myneeds-list ref="demand" />
      </div>
    </basic-container>
  </div>
</template>
<script>
import MyneedsList from './listfile/myneedslist'
export default {
  name: 'Myrecruitment',
  components: {
    MyneedsList
  },
  data() {
    return {
      Select: true,
      choice: 'my',
      activeName: 'Approved',
      allActiveName: 'allApproved'
    }
  },
  methods: {
    opnDetails() {
      this.$router.push({
        path: '/personnel/recruit/recruitmentNeeds'
      })
    },
    handleClick(tab) {
      let paneName = tab.paneName.trim()
      if (paneName === 'Finished' || paneName === 'Approved') {
        this.$refs.demand.init(paneName)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-radio-button__inner {
  border-radius: 4px !important;
}
</style>

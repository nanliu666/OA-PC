<template>
  <div class="RecruitList">
    <page-header class="pageHeader">
      <div slot="title">
        <span
          :class="{ 'pageHeader__link--active': tab === 'iSubmit' }"
          class="pageHeader__link"
          @click="() => switchTab('iSubmit')"
        >我提交的招聘需求</span>
        <span style=" margin: 0 20px">|</span>
        <span
          :class="{ 'pageHeader__link--active': tab === 'all' }"
          class="pageHeader__link"
          @click="() => switchTab('all')"
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
      <div v-show="tab === 'iSubmit'">
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
            name="Finished"
          />
        </el-tabs>
        <under-approval v-if="activeName === 'UnderApproval'" />
        <detailsList
          v-else
          ref="demand"
        />
      </div>

      <div v-show="tab === 'all'">
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
            name="allFinished"
          />
        </el-tabs>
        <all-list ref="all" />
      </div>
    </basic-container>
  </div>
</template>

<script>
const TAB_ACITVE_DEFAULT = 'iSubmit'

export default {
  name: 'RecruitList',
  components: {
    DetailsList: () => import('./listfile/detailsList'),
    AllList: () => import('./listfile/allList'),
    UnderApproval: () => import('./listfile/underApproval')
  },
  data() {
    return {
      activeName: 'UnderApproval',
      allActiveName: 'allApproved'
    }
  },
  computed: {
    // 当前pageHeader显示的视图
    tab() {
      if (!this.$route.query.tab) {
        this.switchTab(TAB_ACITVE_DEFAULT)
      }
      return this.$route.query.tab
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
    /**
     * 切换当前tab
     * @param {string} tab 要切换的tab
     * @returns {void}
     */
    switchTab(tab) {
      if (this.$route.name !== '招聘需求管理') return
      this.$router.replace({
        query: _.assign(null, this.$route.query, {
          tab
        })
      })
    }
  }
}
</script>
<style lang="sass" scoped>
$color_active: #368AFA
$color_link_active: $color_active

.RecruitList
  .el-radio-button__inner
    border-radius: 4px !important

  .pageHeader
    &__link
      cursor: pointer
      &--active
        color: $color_link_active

  .newlyDemand
    float: right
</style>

<style lang="sass" scoped>
// 该页面下的表格handler样式
.RecruitList
  // 添加一个分隔号 "｜"
  .table__handler
    display: flex
    justify-content: flex-end
    > .el-button--text
      text-align: center
      padding: 0 8px
      margin-left: 0px
      position: relative
      &:not(:last-child)::after
        background-color: #e3e7e9
        content: ''
        height: 10px
        position: absolute
        right: 0
        top: 50%
        transform: translateY(-50%)
        width: 1px
</style>

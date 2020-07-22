<template>
  <div class="Requirements">
    <page-header>
      <div slot="title">
        <RequirementsHeaderTabs v-model="tabPane" />
      </div>
      <el-button
        slot="rightMenu"
        size="medium"
        type="primary"
        @click="handleCreateBtnClick"
      >
        新建招聘需求
      </el-button>
    </page-header>

    <basic-container block>
      <RequirementsAllPane
        v-show="_.eq(tabPane, 'all')"
        ref="requirementsAllPane"
      />
      <RequirementsISubmitPane
        v-show="_.eq(tabPane, 'iSubmit')"
        ref="requirementsISubmitPane"
      />
    </basic-container>
  </div>
</template>

<script>
const TAB_ACITVE_DEFAULT = 'iSubmit'

export default {
  name: 'Requirements',
  components: {
    RequirementsAllPane: () => import('@/views/personnel/recruit/components/RequirementsAllPane'),
    RequirementsISubmitPane: () =>
      import('@/views/personnel/recruit/components/RequirementsISubmitPane'),
    RequirementsHeaderTabs: () =>
      import('@/views/personnel/recruit/components/RequirementsHeaderTabs')
  },

  data() {
    return {
      tabPane: TAB_ACITVE_DEFAULT
    }
  },

  watch: {
    tabPane() {
      this.refresh()
    }
  },

  activated() {
    this.refresh()
  },

  methods: {
    handleCreateBtnClick() {
      this.$router.push('/personnel/recruit/recruitmentNeeds')
    },

    refresh() {
      this.refreshByPane(this.tabPane)
    },

    refreshByPane(pane) {
      if (_.isEmpty(this.$refs)) {
        return
      }
      // 用于控制pane的数据更新事件
      switch (pane) {
        case 'iSubmit':
          this.$nextTick(() => this.$refs.requirementsISubmitPane.refresh())
          break
        case 'all':
          this.$nextTick(() => this.$refs.requirementsAllPane.refresh())
          break
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.Requirements
  height: 100%
  .basic-container--block
    min-height: calc(100% - 92px)
    height: 0
</style>

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
      <RequirementsAllPane v-show="_.eq(tabPane, 'all')" />
      <RequirementsISubmitPane v-show="_.eq(tabPane, 'iSubmit')" />
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

  methods: {
    handleCreateBtnClick() {
      this.$router.push('/personnel/recruit/recruitmentNeeds')
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

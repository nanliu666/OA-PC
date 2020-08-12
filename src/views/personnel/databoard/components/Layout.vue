<template>
  <div class="Databoard">
    <page-header>
      <div slot="title">
        <PageHeaderTabs
          :value="tab"
          :options="_.map(tabPanes, ({ label, name }) => ({ label, value: name }))"
          @change="(val) => $emit('update:tab', val)"
        />
      </div>
      <template #rightMenu>
        <slot name="search" />
      </template>
    </page-header>
    <basic-container block>
      <slot name="main" />
    </basic-container>
  </div>
</template>

<script>
import PageHeader from '@/components/page-header/pageHeader'
import PageHeaderTabs from '@/components/page-header/pageHeaderTabs'

const TAB_PANES = [
  {
    label: '统计概况',
    name: 'statistical'
  },
  {
    label: '员工概况',
    name: 'staff'
  },
  {
    label: '招聘概况',
    name: 'recruitment'
  }
]

export default {
  name: 'Databoard',
  components: {
    PageHeader,
    PageHeaderTabs
  },
  props: {
    tab: {
      type: String,
      default: null
    }
  },
  computed: {
    tabPanes: () => TAB_PANES
  }
}
</script>

<style lang="sass" scoped>
$font_color: #202940

.Databoard
  height: 100%
  .PageHeaderTabs
    font-weight: normal
    font-size: 18px
    color: $font_color
  .basic-container--block
    min-height: calc( 100% - 92px )
    height: 0
    /deep/.el-tabs__content
      overflow: visible // <ElCard/>组件会遮住阴影样式
    /deep/.el-card
      background: transparent
  .tabs__link--active
    font-weight: bold
</style>

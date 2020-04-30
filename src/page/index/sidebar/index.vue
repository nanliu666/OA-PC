<template>
  <div class="avue-sidebar">
    <!-- <logo /> -->
    <el-scrollbar style="height:100%">
      <div
        v-if="validatenull(menu)"
        class="avue-sidebar--tip"
      >
        {{ $t('menuTip') }}
      </div>
      <el-menu
        unique-opened
        :default-active="nowTagValue"
        mode="vertical"
        :show-timeout="200"
        :collapse="keyCollapse"
      >
        <sidebar-item
          :menu="menu"
          :screen="screen"
          first
          :props="website.menu.props"
          :collapse="keyCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import logo from '../logo'
import sidebarItem from './sidebarItem'

export default {
  name: 'Sidebar',
  components: { sidebarItem },
  inject: ['index'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['website', 'menu', 'tag', 'keyCollapse', 'screen']),
    nowTagValue: function() {
      return this.$router.$avueRouter.getValue(this.$route)
    }
  },
  created() {
    // this.index.openMenu(this.menuId)
  },

  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>

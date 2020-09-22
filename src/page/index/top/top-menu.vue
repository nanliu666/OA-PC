<template>
  <div class="top-menu">
    <el-menu
      v-loading="menuLoading"
      :default-active="activeIndex"
      mode="horizontal"
    >
      <el-menu-item
        key="0"
        index="0"
        @click.native="openHome(itemHome)"
      >
        <template slot="title">
          <span>{{ generateTitle(itemHome) }}</span>
        </template>
      </el-menu-item>
      <template v-for="item in menuAll">
        <el-menu-item
          :key="item.menuId"
          :index="item.menuId"
          @click.native="openMenu(item)"
        >
          <template slot="title">
            <span>{{ generateTitle(item) }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TopMenu',
  data() {
    return {
      itemHome: {
        menuName: '工作台',
        menuId: null
      }
    }
  },
  inject: ['index'],
  computed: {
    ...mapGetters(['tagCurrent', 'menuAll', 'menuLoading', 'menu']),
    activeIndex() {
      return (this.menuAll.find((menu) => menu.menuId === this.menu.menuId) || { menuId: '0' })
        .menuId
    }
  },
  methods: {
    openHome(itemHome) {
      this.$router.push({
        path: this.$router.$avueRouter.getPath({ name: itemHome.name, src: '' }, {})
      })
    },
    openMenu(item) {
      this.index.openMenu(item)
    },
    generateTitle(item) {
      return this.$router.$avueRouter.generateTitle(item.menuName, (item.meta || {}).i18n)
    }
  }
}
</script>
<style lang="scss" scoped>
.avue-top .el-menu--horizontal > .el-menu-item {
  :hover {
    color: rgba(32, 126, 250, 0.8);
  }
}
</style>

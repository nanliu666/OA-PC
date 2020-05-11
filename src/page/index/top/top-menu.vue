<template>
  <div class="top-menu">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      text-color="#333"
    >
      <el-menu-item
        key="0"
        index="0"
        @click.native="openHome(itemHome)"
      >
        <template slot="title">
          <i :class="itemHome.source" />
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
            <i
              :class="item.icon"
              style="padding-right: 5px;"
            />
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
        name: '工作台',
        source: 'el-icon-menu'
      },
      activeIndex: '0'
    }
  },
  inject: ['index'],
  computed: {
    ...mapGetters(['tagCurrent', 'menuAll'])
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

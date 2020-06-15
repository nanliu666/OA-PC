<template>
  <div
    v-if="item.isShow === 1"
    class="menu-wrapper"
  >
    <el-menu-item
      v-if="
        hasOneShowingChild(item.children, item) &&
          (onlyOneChild.children.length == 0 || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
      :key="item.menuId"
      :index="item.menuId"
      :class="{ 'is-active': vaildActive(onlyOneChild) }"
      @click="open(onlyOneChild)"
    >
      <i :class="onlyOneChild[iconKey]" />
      <span
        slot="title"
        :alt="onlyOneChild[pathKey]"
      >{{ generateTitle(onlyOneChild) }}</span>
    </el-menu-item>
    <el-submenu
      v-else
      :key="item[labelKey]"
      :index="item.menuId"
    >
      <template slot="title">
        <i :class="item[iconKey]" />
        <span
          slot="title"
          :class="{ 'el-menu--display': collapse && first }"
        >{{
          generateTitle(item)
        }}</span>
      </template>
      <template v-for="(child, cindex) in item[childrenKey]">
        <!-- <el-menu-item
            v-if="validatenull(child[childrenKey]) && child.isShow !== 0"
            :key="child[labelKey]"
            :index="item.menuId"
            :class="{ 'is-active': vaildActive(child) }"
            @click="open(child)"
          >
            <i :class="child[iconKey]" />
            <span slot="title">{{ generateTitle(child) }}</span>
          </el-menu-item> -->
        <sidebar-item
          :key="cindex"
          :item="child"
          :props="props"
          :screen="screen"
          :collapse="collapse"
        />
      </template>
    </el-submenu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { validatenull } from '@/util/validate'
import config from './config.js'

export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    screen: {
      type: Number,
      default: -1
    },
    first: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => {
        return {}
      }
    },
    collapse: {
      type: Boolean
    }
  },
  data() {
    this.onlyOneChild = null
    return {
      config: config
    }
  },
  computed: {
    ...mapGetters(['roles']),
    labelKey() {
      return this.props.label || this.config.propsDefault.label
    },
    pathKey() {
      return this.props.path || this.config.propsDefault.path
    },
    iconKey() {
      return this.props.icon || this.config.propsDefault.icon
    },
    childrenKey() {
      return this.props.children || this.config.propsDefault.children
    },
    nowTagValue() {
      return this.$router.$avueRouter.getValue(this.$route)
    }
  },
  created() {},
  mounted() {},
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.isShow === 0) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = {
          ...parent,
          noShowingChildren: true
        }
        return true
      }
      return false
    },
    generateTitle(item) {
      return this.$router.$avueRouter.generateTitle(item[this.labelKey], (item.meta || {}).i18n)
    },
    vaildActive(item) {
      return this.nowTagValue === item[this.pathKey]
    },
    validatenull(val) {
      return validatenull(val)
    },
    open(item) {
      if (this.screen <= 1) this.$store.commit('SET_COLLAPSE')
      this.$router.$avueRouter.meta = item.meta
      const path = this.$router.$avueRouter.getPath(
        {
          name: item[this.labelKey],
          src: item[this.pathKey]
        },
        item.meta
      )
      if (this.$route.path !== path) {
        this.$router.push({
          path,
          query: item.query
        })
      }
    }
  }
}
</script>

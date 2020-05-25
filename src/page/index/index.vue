<template>
  <div
    class="avue-contail"
    :class="{ 'avue--collapse': isCollapse }"
  >
    <div class="avue-header">
      <logo />
      <!-- 顶部导航栏 -->
      <top ref="top" />
    </div>
    <div class="avue-layout">
      <div class="avue-left">
        <!-- 左侧导航栏 -->
        <sidebar />
      </div>
      <div class="avue-main">
        <!-- 顶部标签卡 -->
        <tags />
        <transition name="fade-scale">
          <search
            v-show="isSearch"
            class="avue-view"
          />
        </transition>
        <!-- 主体视图层 -->
        <div
          v-show="!isSearch"
          id="avue-view"
          style="height: calc(100% - 30px);overflow-y:auto;overflow-x:hidden;"
        >
          <keep-alive v-if="$route.meta.$keepAlive">
            <router-view
              :key="$route.fullPath"
              class="avue-view"
            />
          </keep-alive>
          <router-view
            v-else
            :key="$route.fullPath"
            class="avue-view"
          />
        </div>
      </div>
    </div>
    <div
      class="avue-shade"
      @click="showCollapse"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tags from './tags'
import search from './search'
import top from './top/'
import sidebar from './sidebar/'
import admin from '@/util/admin'
import logo from './logo'
import { validatenull } from '@/util/validate'
import { calcDate } from '@/util/date.js'
import { getStore } from '@/util/store.js'

export default {
  name: 'Index',
  components: {
    top,
    tags,
    search,
    sidebar,
    logo
  },
  provide() {
    return {
      index: this
    }
  },
  props: [],
  data() {
    return {
      //搜索控制
      isSearch: false,
      //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: ''
    }
  },
  computed: mapGetters(['isMenu', 'isLock', 'isCollapse', 'website', 'menu']),
  created() {
    //实时检测刷新token
    this.refreshToken()
  },
  mounted() {
    this.init()
  },
  methods: {
    showCollapse() {
      this.$store.commit('SET_COLLAPSE')
    },
    // 初始化
    init() {
      this.$store.commit('SET_SCREEN', admin.getScreen())
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit('SET_SCREEN', admin.getScreen())
        }, 0)
      }
      this.$store.dispatch('FlowRoutes').then(() => {})
    },
    //打开菜单
    openMenu(item = {}) {
      if (item.children.length !== 0) {
        this.$router.$avueRouter.formatRoutes([item], true)
      }

      this.$store.dispatch('SetMenu', item.children)
      let path = this.getFirstPath(item.children, 0, true)
      this.$router.push({
        path
      })
    },
    getFirstPath(children, index = 0) {
      if (children[index].menuType !== 'Dir' && children[index].path) {
        return children[index].path
      }
      if (children[0].children.length > 0) {
        return this.getFirstPath(children[0].children)
      } else {
        return this.getFirstPath(children, index + 1)
      }
    },
    // 定时检测token
    refreshToken() {
      this.refreshTime = setInterval(() => {
        const token =
          getStore({
            name: 'token',
            debug: true
          }) || {}
        const date = calcDate(token.datetime, new Date().getTime())
        if (validatenull(date)) return
        if (date.seconds >= this.website.tokenTime && !this.refreshLock) {
          this.refreshLock = true
          this.$store
            .dispatch('refreshToken')
            .then(() => {
              this.refreshLock = false
            })
            .catch(() => {
              this.refreshLock = false
            })
        }
      }, 10000)
    }
  }
}
</script>

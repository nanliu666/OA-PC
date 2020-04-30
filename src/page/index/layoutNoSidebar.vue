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
      <div
        v-show="!isSearch"
        id="avue-view"
        style="height:100%;overflow-y:auto;overflow-x:hidden;"
      >
        <keep-alive>
          <router-view
            v-if="$route.meta.$keepAlive"
            class="avue-view"
          />
        </keep-alive>
        <router-view
          v-if="!$route.meta.$keepAlive"
          class="avue-view"
        />
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
import top from './top/'
import admin from '@/util/admin'
import logo from './logo'
import { validatenull } from '@/util/validate'
import { calcDate } from '@/util/date.js'
import { getStore } from '@/util/store.js'

export default {
  name: 'LayoutNoSidebar',
  components: {
    top,
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
      // this.$store.dispatch('FlowRoutes').then(() => {})
    },
    //打开菜单
    openMenu(item = {}) {
      // this.$store.dispatch('GetMenu', item.id).then((data) => {
      this.$store.dispatch('SetMenu', item.children)
      if (item.children.length !== 0) {
        this.$router.$avueRouter.formatRoutes([item], true)
      }
      this.$router.push({
        path: item.children[0].path
      })
      //当点击顶部菜单后默认打开第一个菜单
      /*if (!this.validatenull(item)) {
            let itemActive = {},
              childItemActive = 0;
            if (item.path) {
              itemActive = item;
            } else {
              if (this.menu[childItemActive].length === 0) {
                itemActive = this.menu[childItemActive];
              } else {
                itemActive = this.menu[childItemActive].children[childItemActive];
              }
            }
            this.$store.commit('SET_MENU_ID', item);
            this.$router.push({
              path: this.$router.$avueRouter.getPath({
                name: (itemActive.label || itemActive.name),
                src: itemActive.path
              }, itemActive.meta)
            });
          }*/
      // })
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

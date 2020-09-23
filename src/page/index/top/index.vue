<template>
  <div class="avue-top">
    <div class="top-bar__title">
      <div
        v-if="showMenu"
        class="top-bar__item top-bar__item--show"
      >
        <top-menu ref="topMenu" />
      </div>
    </div>
    <div class="top-bar__right">
      <el-tooltip
        v-if="showLock"
        effect="dark"
        :content="$t('navbar.lock')"
        placement="bottom"
      >
        <div class="top-bar__item">
          <top-lock />
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="showFullScren"
        effect="dark"
        :content="isFullScren ? $t('navbar.screenfullF') : $t('navbar.screenfull')"
        placement="bottom"
      >
        <div class="top-bar__item">
          <i
            :class="isFullScren ? 'icon-tuichuquanping' : 'icon-quanping'"
            @click="handleScreen"
          />
        </div>
      </el-tooltip>

      <el-dropdown>
        <span class="el-dropdown-link">
          <img
            v-if="userInfo.avatar_url"
            class="top-bar__img"
            :src="userInfo.avatar_url"
          >
          <i
            v-else
            class="icon-usercircle top-bar__usericon"
          />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="showUserCenter">
              个人中心
            </div>
          </el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="logout"
          >
            {{ $t('navbar.logOut') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { resetRouter } from '@/router/router'
import { mapGetters, mapState } from 'vuex'
import { fullscreenToggel, listenfullscreen } from '@/util/util'
import topLock from './top-lock'
import topMenu from './top-menu'
const userCenterMenu = {
  menuName: '个人中心',
  menuType: 'Dir',
  children: [
    {
      menuId: '312122',
      menuName: '个人信息',
      menuType: 'Menu',
      isOwn: 1,
      isShow: 1,
      code: 'userinfo',
      alias: 'userInfo',
      path: '/info/index',
      children: []
    },
    {
      menuId: '312123',
      menuName: '安全设置',
      isOwn: 1,
      isShow: 1,
      code: 'user_securitySetting',
      alias: 'securitySetting',
      path: '/info/securitySetting',
      children: []
    }
  ]
}
export default {
  name: 'Top',
  components: {
    topLock,
    topMenu
  },
  filters: {},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      showDebug: (state) => state.common.showDebug,
      showTheme: (state) => state.common.showTheme,
      showLock: (state) => state.common.showLock,
      showFullScren: (state) => state.common.showFullScren,
      showCollapse: (state) => state.common.showCollapse,
      showSearch: (state) => state.common.showSearch,
      showMenu: (state) => state.common.showMenu,
      showColor: (state) => state.common.showColor
    }),
    ...mapGetters([
      'userInfo',
      'isFullScren',
      'tagWel',
      'tagList',
      'isCollapse',
      'tag',
      'logsLen',
      'logsFlag'
    ])
  },
  created() {},
  mounted() {
    listenfullscreen(this.setScreen)
  },
  methods: {
    showUserCenter() {
      this.$store.dispatch('SetMenu', userCenterMenu)
      this.$router.push('/info/index')
    },
    handleScreen() {
      fullscreenToggel()
    },
    setCollapse() {
      this.$store.commit('SET_COLLAPSE')
    },
    setScreen() {
      this.$store.commit('SET_FULLSCREN')
    },
    logout() {
      this.$confirm(this.$t('logoutTip'), this.$t('tip'), {
        confirmButtonText: this.$t('submitText'),
        cancelButtonText: this.$t('cancelText'),
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          resetRouter()
          this.$router.push({ path: '/login' })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top-bar__usericon {
  margin: 0 10px;
  cursor: pointer;
}
</style>

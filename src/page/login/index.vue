<template>
  <div
    ref="login"
    class="login-container"
  >
    <top-color v-show="false" />
    <div class="login-weaper animated bounceInDown">
      <!-- <div class="login-left">
        <div class="login-time">
          {{ time }}
        </div>
        <img class="img" src="/img/logo.png" alt="" />
        <p class="title">{{ $t('login.info') }}</p>
      </div>-->
      <div class="login-border">
        <div class="login-main">
          <h4 class="login-title">
            <!-- {{ $t('login.title') }} -->
            {{ website.title }}
            <!-- <top-lang /> -->
          </h4>
          <p class="login-welcome">
            欢迎您登录百利宏OA
          </p>
          <userLogin v-if="activeName === 'user'" />
          <codeLogin v-else-if="activeName === 'code'" />
          <thirdLogin v-else-if="activeName === 'third'" />
          <!-- <div class="login-menu">
            <a href="#" @click.stop="activeName = 'user'">{{
              $t('login.userLogin')
            }}</a>
            <a href="#" @click.stop="activeName = 'code'">{{
              $t('login.phoneLogin')
            }}</a>
            <a href="#" @click.stop="activeName = 'third'">{{
              $t('login.thirdLogin')
            }}</a>
          </div>-->
        </div>
      </div>
    </div>
    <mg-footer class="footer-style" />
  </div>
</template>
<script>
import userLogin from './userlogin'
import codeLogin from './codelogin'
import thirdLogin from './thirdlogin'
import { mapGetters } from 'vuex'
import { dateFormat } from '@/util/date'
import { validatenull } from '@/util/validate'
// import topLang from '@/page/index/top/top-lang'
import topColor from '@/page/index/top/top-color'

export default {
  name: 'Login',
  components: {
    userLogin,
    codeLogin,
    thirdLogin,
    // topLang,
    topColor,
    MgFooter: () => import('@/components/footer/footer')
  },
  props: [],
  data() {
    return {
      time: '',
      activeName: 'user'
    }
  },
  computed: {
    ...mapGetters(['website'])
  },
  watch: {
    $route() {
      const params = this.$route.query
      this.socialForm.state = params.state
      this.socialForm.code = params.code
      if (!validatenull(this.socialForm.state)) {
        const loading = this.$loading({
          lock: true,
          text: `${this.socialForm.state === 'WX' ? '微信' : 'QQ'}登录中,请稍后。。。`,
          spinner: 'el-icon-loading'
        })
        setTimeout(() => {
          loading.close()
        }, 2000)
      }
    }
  },

  created() {
    this.getTime()
    setInterval(() => {
      this.getTime()
    }, 1000)
  },
  mounted() {},
  methods: {
    getTime() {
      this.time = dateFormat(new Date())
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/login.scss';
.footer-style {
  color: rgba(237, 248, 255, 0.6);
  bottom: 0;
}
</style>

<template>
  <el-form
    ref="loginForm"
    class="login-form"
    status-icon
    :rules="loginRules"
    :model="loginForm"
    label-width="0"
  >
    <!-- <el-form-item v-if="tenantMode" prop="tenantId">
      <el-input
        size="small"
        @keyup.enter.native="handleLogin"
        v-model="loginForm.tenantId"
        auto-complete="off"
        :placeholder="$t('login.tenantId')"
        :disabled="true"
      >
        <i slot="prefix" class="icon-quanxian" />
      </el-input>
    </el-form-item>-->
    <el-form-item prop="username">
      <el-input
        v-model="loginForm.username"
        size="small"
        auto-complete="off"
        :placeholder="$t('login.username')"
        @keyup.enter.native="handleLogin"
      >
        <!-- <i
          slot="prefix"
          class="icon-yonghu"
        />-->
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        size="small"
        :type="passwordType"
        auto-complete="off"
        :placeholder="$t('login.password')"
        @keyup.enter.native="handleLogin"
      >
        <i
          slot="suffix"
          class="el-icon-view el-input__icon"
          @click="showPassword"
        />
        <!-- <i
          slot="prefix"
          class="icon-mima"
        />-->
      </el-input>
    </el-form-item>
    <el-form-item
      v-if="website.captchaMode"
      prop="code"
    >
      <el-row :span="24">
        <el-col :span="16">
          <el-input
            v-model="loginForm.code"
            size="small"
            auto-complete="off"
            :placeholder="$t('login.code')"
            @keyup.enter.native="handleLogin"
          >
            <!-- <i slot="prefix" class="icon-yanzhengma" /> -->
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <img
              :src="loginForm.image"
              class="login-code-img"
              @click="refreshCode"
            >
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item class="login-submitBtn">
      <el-button
        type="primary"
        size="small"
        class="login-submit"
        @click.native.prevent="handleLogin"
      >
        {{ $t('login.submit') }}
      </el-button>
    </el-form-item>
    <el-form-item>
      <div
        class="forget-password"
        @click="forgetPW"
      >
        忘记密码？
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
// import { info } from '@/api/system/tenant'
import { getCaptcha, getTenantInfo } from '@/api/user'

export default {
  name: 'Userlogin',
  props: [],
  data() {
    return {
      tenantMode: this.website.tenantMode,
      loginForm: {
        //租户ID
        tenantId: '',
        //用户名
        username: '',
        //密码
        password: '',
        //账户类型
        type: 'account',
        //验证码的值
        code: '',
        //验证码的索引
        key: '',
        //预加载白色背景
        image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      },
      loginRules: {
        // tenantId: [
        //   { required: false, message: '请输入租户ID', trigger: 'blur' }
        // ],
        username: [{ required: true, message: '请输入工号', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      passwordType: 'password'
    }
  },
  computed: {
    ...mapGetters(['tagWel'])
  },
  created() {
    this.getTenant()
    this.refreshCode()
  },
  mounted() {},
  methods: {
    refreshCode() {
      getCaptcha().then((res) => {
        this.loginForm.key = res.key
        this.loginForm.image = res.image
      })
    },
    showPassword() {
      this.passwordType === '' ? (this.passwordType = 'password') : (this.passwordType = '')
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '登录中,请稍后。。。',
            spinner: 'el-icon-loading'
          })
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then((res) => {
              this.$router.push({ path: this.tagWel.value })
              this.$store.dispatch('GetUserPrivilege', res.user_id)
              loading.close()
            })
            .catch(() => {
              loading.close()
              this.refreshCode()
            })
        }
      })
    },
    getTenant() {
      // let domain =
      //   process.env.NODE_ENV === 'development'
      //     ? 'www.bestgrand.com.cn'
      //     : window.location.href.split('/#/')[0]
      let domain =
        process.env.NODE_ENV === 'development'
          ? 'http://122.112.190.144'
          : window.location.href.split('/#/')[0]
      getTenantInfo({ domain: `${domain}` }).then((res) => {
        this.loginForm.tenantId = res.tenantId || 'bestgrand'
        this.$store.commit('SET_TENANT_ID', res.tenantId)
      })
      // 临时指定域名，方便测试
      //domain = "https://bladex.vip";
      // info(domain).then((res) => {
      //   const data = res.data
      //   if (data.success && data.data.tenantId) {
      //     this.tenantMode = false
      //     this.loginForm.tenantId = data.data.tenantId
      //     this.$parent.$refs.login.style.backgroundImage = `url(${data.data.backgroundUrl})`
      //   }
      // })
    },
    forgetPW() {
      this.$router.push({ path: '/getBackPW' })
    }
  }
}
</script>

<style></style>

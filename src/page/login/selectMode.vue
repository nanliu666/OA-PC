<template>
  <div>
    <div class="logo">
      <logo />
    </div>
    <div class="out-container">
      <pageHeader
        :title="'选择密码找回方式'"
        :show-back="true"
      />
      <div class="select-mode-style">
        <div class="select-mode">
          <div class="page-des">
            你可以通过员工账号绑定的手机或者邮箱找回密码：
          </div>
          <el-radio
            v-model="mode"
            class="select-radio"
            label="phone"
          >
            通过手机找回
          </el-radio>
          <el-radio
            v-model="mode"
            label="email"
          >
            通过邮箱找回
          </el-radio>
          <div>
            <el-button
              class="bt"
              type="primary"
              size="medium"
              @click="forgetPW"
            >
              下一步
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    logo: () => import('@/page/index/logo')
  },
  data() {
    return {
      mode: 'phone'
    }
  },
  methods: {
    forgetPW() {
      this.$router.push({
        path: '/getBackPW',
        query: {
          mode: this.mode
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
div {
  box-sizing: border-box;
}
.logo {
  height: 56px;
  background: #fff;
}
.out-container {
  height: calc(100vh);
  background: #f2f5f7;
  padding: 0 32px 32px 32px !important;
  position: relative;
}
.select-mode-style {
  height: calc(100vh - 68px - 56px - 32px);
  background: #fff;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  position: relative;
  .select-mode {
    width: 400px;
    margin: 0 auto;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    .select-radio {
      margin-bottom: 24px;
    }
    /deep/ .el-radio__label {
      font-size: 16px;
    }
    .page-des {
      color: #202940;
      margin-bottom: 24px;
    }
    .bt {
      margin-top: 24px;
    }
  }
}
</style>

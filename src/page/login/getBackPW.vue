<template>
  <div class="out-container">
    <div class="brad-part">
      <span>
        <i class="el-icon-arrow-left" />
      </span>
      <span> 手机找回密码 </span>
    </div>
    <div class="getback-pw">
      <keep-alive>
        <div class="contens-wrapper">
          <div class="progress-bar">
            <el-steps :active="step">
              <el-step
                title="验证身份"
                :status="steps.firstStatus"
              />
              <el-step
                title="修改密码"
                :status="steps.secondStatus"
              />
              <el-step
                title="完成"
                :status="steps.finalStatus"
              />
            </el-steps>
          </div>

          <div
            v-if="step == 1"
            class="identity-test"
          >
            <div class="identity-title">
              请完成身份验证
            </div>

            <el-form
              ref="identity"
              :label-position="labelPosition"
              class="form-containner"
              status-icon
              :rules="identity.rules"
              :model="identity.form"
              label-width="0"
            >
              <el-form-item
                label="手机号码"
                prop="phone"
              >
                <el-input
                  v-model="identity.form.phone"
                  class="phone-input"
                  autofocus="true"
                  size="small"
                  auto-complete="off"
                  :placeholder="$t('login.phone')"
                />
              </el-form-item>

              <el-form-item
                label="验证码"
                prop="code"
              >
                <el-input
                  v-model="identity.form.code"
                  class="test-code-input"
                  size="small"
                  auto-complete="off"
                  :placeholder="$t('login.code')"
                />
                <el-button
                  v-show="!identity.msgKey"
                  class="get-test-code"
                  @click="handleSend"
                >
                  <span>获取验证码</span>
                </el-button>
                <el-button
                  v-show="identity.msgKey"
                  class="count-down-time"
                >
                  {{ identity.msgText }}
                </el-button>
              </el-form-item>
            </el-form>
          </div>

          <div
            v-if="step == 2"
            class="reset-password"
          >
            <div class="resetPW-title">
              请完成密码设置
            </div>

            <el-form
              ref="password"
              :label-position="labelPosition"
              class="form-containner"
              status-icon
              :rules="password.rules"
              :model="password.form"
              label-width="0"
            >
              <el-form-item
                label="新密码"
                prop="newPW"
              >
                <el-input
                  v-model="password.form.newPW"
                  class="newPW-input"
                  type="password"
                  autofocus
                  size="small"
                  auto-complete="off"
                />
              </el-form-item>

              <el-form-item
                label="确认密码"
                prop="surePW"
              >
                <el-input
                  v-model="password.form.surePW"
                  class="surePW-input"
                  type="password"
                  size="small"
                  auto-complete="off"
                />
              </el-form-item>
            </el-form>
          </div>

          <div
            v-if="step == 3"
            class="test-success"
          >
            <div class="success-icon">
              <i class="el-icon-success" />
            </div>
            <div class="success-text">
              <span>您的密码已修改完成</span>
            </div>
            <div class="back-login" />
          </div>

          <div
            v-if="step != 3"
            class="next-button"
          >
            <el-button @click="next">
              下一步
            </el-button>
          </div>
          <div
            v-if="step == 3"
            class="goback-containner"
          >
            <el-button
              class="goback-login"
              @click="gobackLogin"
            >
              <span>返回登录页面</span>
            </el-button>
          </div>
        </div>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { isMobile, validatePW } from '@/util/validate'
import { getCode, checkPhoneCode, checkPassword } from '../../api/personalInfo.js'
import { mapGetters } from 'vuex'
let code = null

export default {
  components: {},
  data() {
    let _this = this
    const validatePhone = (rule, value, callback) => {
      if (!_this.identity.form.phone) {
        callback(new Error('请输入手机号码'))
      } else if (_this.identity.form.phone && !isMobile(value)) {
        callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    }

    const validateCode = (rule, value, callback) => {
      if (!_this.identity.form.code) {
        callback(new Error('请输入六位验证码'))
      } else if (_this.identity.form.code != code) {
        callback(new Error('验证码不正确'))
      } else {
        callback()
      }
    }

    const validateNewPW = (rule, value, callback) => {
      if (!_this.password.form.newPW) {
        callback(new Error('请按照个密码格式要求输入密码'))
      } else if (_this.password.form.newPW && !validatePW(value)) {
        callback(new Error('输入密码格式不正确'))
      } else {
        callback()
      }
    }

    const validateRepeatPW = (rule, value, callback) => {
      if (_this.password.form.surePW != _this.password.form.newPW) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      step: 1,
      steps: {
        firstStatus: 'finish',
        secondStatus: 'wait',
        finalStatus: 'wait'
      },
      labelPosition: 'top',
      identity: {
        msgText: '',
        msgTime: '',
        msgKey: false,
        form: {
          phone: '',
          code: ''
        },
        rules: {
          phone: [
            {
              required: true,
              trigger: 'blur',
              validator: validatePhone
            }
          ],
          code: [
            {
              required: true,
              trigger: 'blur',
              validator: validateCode
            }
          ]
        }
      },

      password: {
        form: {
          newPW: '',
          surePW: ''
        },
        rules: {
          newPW: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNewPW
            }
          ],
          surePW: [
            {
              required: true,
              trigger: 'blur',
              validator: validateRepeatPW
            }
          ]
        }
      }
    }
  },
  computed: {
    config() {
      return {
        MSGINIT: this.$t('login.msgText'),
        MSGSCUCCESS: this.$t('login.msgSuccess'),
        MSGTIME: 60
      }
    },
    ...mapGetters(['userInfo'])
  },
  created() {
    this.identity.msgText = this.config.MSGINIT
    this.identity.msgTime = this.config.MSGTIME
  },
  methods: {
    gobackLogin() {
      this.$router.push({ path: '/login' })
    },
    next() {
      if (this.step == 1) {
        this.$refs['identity'].validate((isPass) => {
          if (isPass && this.identity.form.code == code) {
            //验证手机验证码
            let params = {
              phonenum: this.identity.form.phone,
              smsCode: this.identity.form.code
            }
            checkPhoneCode(params).then(() => {
              this.step++
              this.steps.firstStatus = 'success'
              this.steps.secondStatus = 'finish'
            })
          }
        })
      } else if (this.step == 2) {
        this.$refs['password'].validate((isPass) => {
          if (isPass && this.password.form.surePW == this.password.form.newPW) {
            let params = {
              userId: this.userInfo.user_id,
              newPassword: this.password.form.newPW
            }
            checkPassword(params).then(() => {
              this.step++
              this.steps.secondStatus = 'success'
              this.steps.finalStatus = 'success'
            })
          }
        })
      }
    },

    handleSend() {
      if (this.identity.msgKey) return
      this.$refs['identity'].validateField('phone', (errorMsg) => {
        if (!errorMsg) {
          //1.发送获取验证码的网络请求

          let params = {
            phone: this.identity.form.phone
          }
          getCode(params).then((res) => {
            code = res.value
            //2.倒计时
            this.msgText = this.identity.msgTime + this.config.MSGSCUCCESS
            this.identity.msgKey = true
            const time = setInterval(() => {
              this.identity.msgTime--
              this.identity.msgText = this.identity.msgTime + this.config.MSGSCUCCESS
              if (this.identity.msgTime === 0) {
                this.identity.msgTime = this.config.MSGTIME
                this.identity.msgText = this.config.MSGINIT
                this.identity.msgKey = false
                clearInterval(time)
              }
            }, 1000)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.out-container {
  height: calc(100vh);
  background: #f2f5f7;
  padding: 68px 32px 0 32px !important;
  position: relative;
}
.brad-part {
  position: absolute;
  height: 68px;
  top: 0;
  left: 32px;
  font-family: 'PingFangSC-Semibold';
  font-size: 18px;
  color: #545b66;
  line-height: 68px;
}

.getback-pw {
  height: calc(100vh - 68px);
  background: #fff;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  position: relative;
}

.contens-wrapper {
  width: 40%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  padding-top: 78px;
}
.progress-bar {
  /deep/ .el-step__icon {
    width: 32px !important;
    height: 32px !important;
  }
}
.identity-test,
.reset-password {
  width: 78%;
  position: relative;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  padding-top: 78px;
}

.identity-test .identity-title,
.reset-password .resetPW-title {
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #202940;
  line-height: 14px;
}
.identity-test .test-code-input {
  width: calc(100% - 117px);
  margin-right: 5px;
}
.form-containner {
  /deep/ .el-input__inner {
    height: 34px !important;
    line-height: 34px !important;
  }
}

.get-test-code,
.count-down-time {
  height: 34px !important;
  line-height: 34px !important;
}
.get-test-code,
.count-down-time {
  width: 112px;
  padding: 0 !important;
  font-size: 14px;
}
.get-test-code {
  color: #207efa;
  border: 1px solid #207efa;
}
.count-down-time {
  width: 100px;
  color: #fff;
  background: #cecece;
}

.form-containner .el-form-item {
  margin-bottom: 15px;
}
.form-containner .el-form-item__label {
  height: 45px;
  line-height: 45px;
  padding: 0 !important;
}
.next-button {
  width: 78%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  top: 24px;
}
.next-button .el-button {
  width: 94px;
  height: 42px;
  background: #207efa;
  border-radius: 4px;
  border-radius: 4px;
  color: #fff;
}
.success-icon {
  height: 72px;
  text-align: center;
  margin-top: 68px;
}
.success-icon .el-icon-success {
  color: #53c962;
  font-size: 80px;
}
.success-text {
  height: 32px;
  font-family: 'PingFangSC-Medium';
  font-size: 24px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 32px;
  text-align: center;
  margin-top: 40px;
}
.goback-login {
  background: #207efa;
  border-radius: 4px;
  border-radius: 4px;
  width: 136px;
  height: 42px;
  margin: 0 auto;
  color: #ffffff;
}
.goback-containner {
  text-align: center;
  margin-top: 40px;
}
.count-down-time {
}
</style>

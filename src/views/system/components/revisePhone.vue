<template>
  <div class="out-container">
    <div class="brad-part">
      <span @click="goback()">
        <i class="el-icon-arrow-left" />
      </span>
      <span> {{ `修改${$parent.isEmail ? '新邮箱' : '新手机号码'}` }} </span>
    </div>
    <el-card class="getback-pw">
      <keep-alive>
        <div class="contens-wrapper">
          <div class="progress-bar">
            <el-steps :active="step">
              <el-step
                title="填写登录密码"
                :status="steps.firstStatus"
              />
              <el-step
                :title="`绑定${$parent.isEmail ? '新邮箱' : '新手机号码'}`"
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
            class="reset-password"
          >
            <div class="identity-title">
              请完成以下登录密码的填写
            </div>

            <el-form
              ref="password"
              label-position="top"
              class="form-containner"
              status-icon
              :rules="password.rules"
              :model="password.form"
              :label-width="labelWidth"
            >
              <el-form-item
                label="登录密码"
                prop="psw"
              >
                <el-input
                  v-model="password.form.psw"
                  autofocus="true"
                  size="small"
                  auto-complete="off"
                  type="password"
                />
              </el-form-item>
            </el-form>
          </div>
          <div
            v-if="step == 2"
            class="identity-test"
          >
            <div class="identity-title">
              {{ `请完成${$parent.isEmail ? '新邮箱' : '新手机号码'}绑定` }}
            </div>

            <el-form
              ref="identity"
              :label-position="'top'"
              class="form-containner"
              status-icon
              :rules="identity.rules"
              :model="identity.form"
              :label-width="labelWidth"
            >
              <el-form-item />
              <el-form-item
                v-if="$parent.isEmail"
                label="新邮箱号码"
                prop="email"
              >
                <el-input
                  v-model="identity.form.email"
                  class="phone-input"
                  autofocus="true"
                  size="small"
                  :placeholder="$t('login.email')"
                />
              </el-form-item>
              <el-form-item
                v-if="!$parent.isEmail"
                label="新手机号码"
                prop="phone"
              >
                <el-input
                  v-model="identity.form.phone"
                  class="phone-input"
                  size="small"
                  :placeholder="$t('login.phone')"
                />
              </el-form-item>
              <el-form-item
                label="图片验证码"
                prop="captchaCode"
              >
                <div style="display: flex;align-items: center">
                  <el-input
                    v-model="identity.form.captchaCode"
                    class="test-code-input"
                    size="small"
                    :placeholder="$t('login.captchaCode')"
                  />
                  <img
                    :src="identity.image"
                    class="login-code-img"
                    @click="refreshCode"
                  >
                </div>
              </el-form-item>

              <el-form-item
                :label="`${$parent.isEmail ? '邮箱' : '手机'}验证码`"
                prop="code"
              >
                <div style="display: flex;align-items: center">
                  <el-input
                    v-model="identity.form.code"
                    class="test-code-input"
                    size="small"
                    auto-complete="off"
                    :placeholder="`请输入${$parent.isEmail ? '邮箱' : '手机'}验证码`"
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
                </div>
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
              <span>{{ `你的${$parent.isEmail ? '新邮箱' : '新手机号码'}已绑定完成` }}</span>
            </div>
            <div class="back-login" />
          </div>

          <div
            v-if="step != 3"
            class="next-button"
          >
            <el-button
              type="primary"
              :disabled="buttonDisabled"
              @click="next"
            >
              下一步
            </el-button>
          </div>
          <div
            v-if="step == 3"
            class="goback-containner"
          >
            <el-button
              class="goback-login"
              @click="goback()"
            >
              <span>返回安全设置</span>
            </el-button>
          </div>
        </div>
      </keep-alive>
    </el-card>
  </div>
</template>

<script>
import { isMobile, isEmailReg } from '@/util/validate'
import { getCode, checkPswOrPhone, checkPswOrEmail } from '../../../api/personalInfo'
import { checkUserInfo } from '@/api/personnel/roster'
import { mapGetters } from 'vuex'
import md5 from 'js-md5'
import { getCaptcha } from '@/api/user'
export default {
  components: {},
  data() {
    let _this = this
    var checkPhonenum = (rule, value, callback) => {
      checkUserInfo({ phonenum: value })
        .then(() => {
          callback()
        })
        .catch(() => {
          callback(new Error('该手机号已存在'))
        })
    }
    var checkEmail = (rule, value, callback) => {
      checkUserInfo({ email: value })
        .then(() => {
          callback()
        })
        .catch(() => {
          callback(new Error('该邮箱已存在'))
        })
    }
    const validatePhone = (rule, value, callback) => {
      if (!_this.identity.form.phone) {
        callback(new Error('请输入手机号码'))
      } else if (_this.identity.form.phone && !isMobile(value)) {
        callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!_this.identity.form.email) {
        callback(new Error('请输入邮箱'))
      } else if (_this.identity.form.email && !isEmailReg(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    const validateCaptchaCode = (rule, value, callback) => {
      if (!_this.identity.form.captchaCode) {
        callback(new Error('请输入图片验证码'))
      } else {
        validateButton()
        callback()
      }
    }
    const validateButton = () => {
      let emailOrPhone = _this.$parent.isEmail ? _this.isValidateEmail : _this.isValidatePhone
      let condition = [emailOrPhone, _this.isValidateCode, _this.isValidateCaptchaCode]
      _this.stepTwoDisabled = !_.every(condition, Boolean)
    }
    const validateCode = (rule, value, callback) => {
      if (!_this.identity.form.code || _this.identity.form.code.length !== 6) {
        callback(new Error('请输入六位验证码'))
      } else {
        validateButton()
        callback()
      }
    }
    const checkPsw = (rule, value, callback) => {
      if (!_this.password.form.psw) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      labelWidth: '150',
      step: 1,
      steps: {
        firstStatus: 'finish',
        secondStatus: 'wait',
        finalStatus: 'wait'
      },
      identity: {
        msgText: '',
        msgTime: '',
        image: '',
        msgKey: false,
        form: {
          captchaCode: '',
          captchaKey: '',
          phone: '',
          email: '',
          code: ''
        },
        rules: {
          phone: [
            {
              required: true,
              trigger: 'blur',
              validator: validatePhone
            },
            { validator: checkPhonenum, trigger: 'blur' }
          ],
          code: [
            {
              required: true,
              trigger: 'blur',
              validator: validateCode
            }
          ],
          captchaCode: [
            {
              required: true,
              trigger: ['blur', 'change'],
              validator: validateCaptchaCode
            }
          ],
          email: [
            {
              required: true,
              trigger: 'blur',
              validator: validateEmail
            },
            { validator: checkEmail, trigger: 'blur' }
          ]
        }
      },

      password: {
        form: {
          psw: ''
        },
        rules: {
          psw: [
            {
              required: true,
              trigger: ['blur', 'change'],
              validator: checkPsw
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
    ...mapGetters(['userInfo']),
    stepOneDisabled() {
      const form = this.password.form
      return this.isEmptyForm(form)
    },
    stepTwoDisabled: {
      get: function() {
        const form = this.handleDisabled()
        return this.isEmptyForm(form)
      },
      set: function() {
        const form = this.handleDisabled()
        return this.isEmptyForm(form)
      }
    },
    buttonDisabled() {
      return this.step === 1 ? this.stepOneDisabled : this.stepTwoDisabled
    }
  },
  created() {
    this.refreshCode()
    this.identity.msgText = this.config.MSGINIT
    this.identity.msgTime = this.config.MSGTIME
  },
  methods: {
    handleDisabled() {
      let omitKey = this.$parent.isEmail ? 'phone' : 'email'
      return _.omit(this.identity.form, [omitKey])
    },
    isEmptyForm(form) {
      for (const field in form) {
        if (_.isEmpty(form[field])) {
          return true
        }
      }
      return false
    },
    refreshCode() {
      getCaptcha().then((res) => {
        this.identity.form.captchaKey = res.key
        this.identity.image = res.image
      })
    },
    goback() {
      this.$parent.editType = 'entry'
      this.$parent.getUserAllInfo()
    },
    next() {
      if (this.step == 1) {
        this.$refs['password'].validate((isPass) => {
          if (isPass) {
            let params = {
              userId: this.userInfo.user_id,
              password: md5(this.password.form.psw)
            }
            let checkFun = this.$parent.isEmail ? checkPswOrEmail : checkPswOrPhone
            checkFun(params).then(() => {
              this.step++
              this.steps.firstStatus = 'success'
              this.steps.secondStatus = 'finish'
            })
          }
        })
      } else if (this.step == 2) {
        this.$refs['identity'].validate((isPass) => {
          if (isPass) {
            //验证手机
            let params = {
              userId: this.userInfo.user_id,
              password: md5(this.password.form.psw),
              smsCode: this.identity.form.code,
              captchaCode: this.identity.form.captchaCode,
              captchaKey: this.identity.form.captchaKey
            }
            let paramsKey = this.$parent.isEmail
              ? { email: this.identity.form.email }
              : { phonenum: this.identity.form.phone }
            _.assign(params, paramsKey)
            let checkFun = this.$parent.isEmail ? checkPswOrEmail : checkPswOrPhone
            checkFun(params).then(() => {
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
      let checkProp = this.$parent.isEmail ? 'email' : 'phone'
      this.$refs['identity'].validateField(checkProp, (errorMsg) => {
        if (!errorMsg) {
          //1.发送获取验证码的网络请求

          let params = {
            phonenum: this.identity.form.phone,
            email: this.identity.form.email
          }
          getCode(params).then(() => {
            //2.倒计时
            this.msgText = this.identity.msgTime + this.config.MSGSCUCCESS
            const time = setInterval(() => {
              this.identity.msgKey = true
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
  padding: 68px 0 0 0 !important;
  position: relative;
}
.login-code-img {
  width: 100px;
  height: 34px;
  margin-right: 4px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 38px;
  text-indent: 5px;
  text-align: center;
  cursor: pointer !important;
}
.brad-part {
  position: absolute;
  height: 68px;
  top: 0;
  font-family: 'PingFangSC-Semibold';
  font-size: 18px;
  color: #545b66;
  line-height: 68px;
  .el-icon-arrow-left {
    padding: 8px;
    cursor: pointer;
  }
}

.getback-pw {
  height: calc(100vh - 40px - 56px - 68px - 32px);
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
// .next-button .el-button {
//   width: 94px;
//   height: 42px;
//   background: #207efa;
//   border-radius: 4px;
//   border-radius: 4px;
//   color: #fff;
// }
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
.psw-label {
  font-size: 14px;
  color: #606266;
  line-height: 80px;
  margin-right: 5px;
}
.psw-label:before {
  content: '*';
  color: #f56c6c;
  margin-right: 4px;
}
.psw-rule-tip {
  font-size: 12px;
  color: #a0a8ae;
}
</style>

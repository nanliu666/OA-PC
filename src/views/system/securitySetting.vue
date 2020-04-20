<template>
  <div class="security">
    <div class="back">
      <span class="el-icon-arrow-left" /> 修改密码
    </div>
    <div class="securitySetting">
      <div class="form_">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :rules="rules"
          label-position="top"
          size="medium"
        >
          <el-form-item
            label="旧密码"
            prop="oldPassword"
          >
            <span
              slot="label"
              class="label_"
            >
              <span>旧密码</span>
            </span>
            <el-input
              v-model="form.oldPassword"
              placeholder="请输入旧密码"
              show-password
              @input="inputPassword($event,format[0])"
            />
          </el-form-item>
          <el-form-item prop="newPassword">
            <span
              slot="label"
              class="label_"
            >
              <span>新密码</span><span class="tip">(密码包含字母，符号或数字中至少两项且长度超过6位的密码)</span>
            </span>
            <el-input
              v-model="form.newPassword"
              placeholder="请输入新密码"
              show-password
              @input="inputPassword($event,format[1])"
            />
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <span
              slot="label"
              class="label_"
            >
              <span>确认密码</span>
            </span>
            <el-input
              v-model="form.confirmPassword"
              placeholder="请输入确认密码"
              show-password
              @input="inputPassword($event,format[2])"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="bt"
              type="primary"
              @click="onsubmit"
            >
              确认修改
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { postUserPwd } from "../../api/system/user"

  export default {
        name: "SecuritySetting",
      data() {
        const validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'))
          } else if (value !== this.form.newPassword) {
            callback(new Error('两次输入密码不一致!'))
          } else {
            callback()
          }
        }
        const validatePass= function (rule,value,callback) {
          if (value === '') {
            callback(new Error('请输入密码'))
          } else if (value.length<6) {
            callback(new Error('密码设置长度不能小于6!'))
          } else {
            callback()
          }
        }
        return {
          active: 0,
          format:['oldPassword','newPassword','confirmPassword'],
          form: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
          },
          rules:{
            oldPassword: [ { required: true, message: '请输入旧密码', trigger: 'blur' }],
            newPassword: [ { required: true, validator: validatePass, trigger: 'blur' }],
            confirmPassword: [{required: true,validator: validatePass2, trigger: 'blur' }]
          }
        }
      },
      methods: {
          /**
           * @desc 正则验证（不能输入中文）
           *
           * */
        inputPassword(value, index) {
          value = value.replace(/[\u4e00-\u9fa5]/g, '')
          this.form[index]=value
          // this.form.basicAttrs[index].attrValue = value;
        },
        onsubmit(){
          this.$refs.form.validate((val)=>{
            if(!val) return
            let params = {
              tenantId:this.$store.getters.tenantId,
              userId: this.$store.getters.userId,
              ...this.form
            }
            postUserPwd(params).then(() => {
                this.$message.success('修改密码成功')
            }).catch(() => {
                this.$message.error('修改密码失败，请联系管理员')
            })
          })
        },
      }
    }
</script>

<style lang="scss" scoped>
  page{
    height: 100%;
  }
  .avue-view{
    margin: 0 32px 32px 32px;
  }
  .security{
    height: 100%;
  }
  .back{
    margin: 10px 0 16px 0;
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #202940;
    line-height: 28px;
    span{
      font-weight: 800;
    }
  }
  .securitySetting{
    background: #FFFFFF;
    box-shadow: 0 5px 8px 0 rgba(0,0,0,0.05);
    border-radius: 4px;
    border-radius: 4px;
    height:calc(100% - 64px);
    width: calc(100% - 64px);
    .form_{
      padding-top: 40px;
      width: 400px;
      margin: 0 auto;
      font-size: 14px;
      .label_{
        /*display: inline-block;*/
        /*margin-top:24px;*/
        /*margin-bottom:8px;*/
      }
      .tip{
        font-size: 12px;
        line-height: 14px;
        color: #A0A8AE;
      }
      .bt{
        /*margin-top: 40px;*/
      }
    }
  }
  /deep/ .el-form-item {
    margin-bottom: 24px;
  }
 /deep/ .el-form-item--medium .el-form-item__label {
    line-height: 14px;
  }
</style>

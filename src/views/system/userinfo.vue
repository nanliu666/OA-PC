<template>
  <div class="setting-info">
    <div class="personal-info">
      <span><i class="el-icon-arrow-left" /></span>
      <span>个人信息</span>
    </div>
    <!-- 个人大概信息 -->
    <div class="info-survey">
      <el-container>
        <el-aside width="90px">
          <div class="info-image">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="perosonnalInfo.avatarUrl"
                :src="perosonnalInfo.avatarUrl"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              />
            </el-upload>
          </div>
        </el-aside>
        <el-main>
          <p class="info-name">
            <span class="staff-name">{{ perosonnalInfo.name }}</span>
            <span class="workNo">({{ perosonnalInfo.workNo }})</span>
            <el-button size="mini">
              <span>{{ getStatus() }}</span>
            </el-button>
          </p>
          <el-row>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <span>部门：</span>
                <span>{{ perosonnalInfo.orgName }}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple-light">
                <span>职位：</span>
                <span>{{ perosonnalInfo.jobName }}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <span>邮箱：</span>
                <span>{{ perosonnalInfo.userEmail }}</span>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>

    <div class="info-detail">
      <!-- 个人详细信息（包括基本信息和紧急联系人信息） -->
      <div class="personal-basic-info no-back-style">
        <div class="info-edit-button">
          <span class="basic-info">基本信息</span>
          <span
            v-show="readonly"
            style="padding:5px;"
            @click="handleEdit"
          >
            <i class="el-icon-edit" />
            <span
              style="font-size: 14px;color: #757C85;"
              class="edit-button-text"
            > 编辑</span>
          </span>
        </div>
        <div
          class="basic-info-content"
          :class="[readonly ? 'no-back-style' : 'back-style']"
        >
          <el-form
            ref="userInfo"
            :model="perosonnalInfo"
            :rules="basicInfo.rules"
            label-width="150px"
            class="info-form"
            size="mini"
          >
            <el-row :justify="'center'">
              <el-col
                :span="8"
                :push="2"
              >
                <el-form-item
                  v-show="readonly"
                  label="姓名:"
                >
                  <span>{{ perosonnalInfo.name }}</span>
                </el-form-item>
                <el-form-item
                  v-show="!readonly"
                  label="姓名:"
                  prop="name"
                >
                  <el-input
                    v-model="perosonnalInfo.name"
                    placeholder="请输入2-10位汉字、英文、空格和点号"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                :push="4"
              >
                <el-form-item
                  v-show="readonly"
                  label="性别:"
                >
                  <span>{{ getUserSex() }}</span>
                </el-form-item>
                <el-form-item
                  v-show="!readonly"
                  label="性别:"
                  prop="sex"
                >
                  <el-radio
                    v-model="perosonnalInfo.sex"
                    :label="1"
                  >
                    男
                  </el-radio>
                  <el-radio
                    v-model="perosonnalInfo.sex"
                    :label="2"
                  >
                    女
                  </el-radio>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col
                :span="8"
                :push="2"
              >
                <el-form-item
                  v-show="readonly"
                  label="手机号码:"
                >
                  <span>{{ perosonnalInfo.phonenum }}</span>
                </el-form-item>
                <el-form-item
                  v-show="!readonly"
                  label="手机号码:"
                  prop="phone"
                >
                  <el-input
                    v-model="perosonnalInfo.phonenum"
                    :readonly="!readonly"
                    :class="{ disabled: !readonly }"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                :push="4"
              >
                <el-form-item
                  v-show="readonly"
                  label="公司邮箱:"
                >
                  <span>{{ perosonnalInfo.email }}</span>
                </el-form-item>
                <el-form-item
                  v-show="!readonly"
                  label="公司邮箱:"
                  prop="email"
                >
                  <el-input v-model="perosonnalInfo.email" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :span="8"
                :push="2"
              >
                <el-form-item
                  v-show="readonly"
                  label="银行卡号:"
                >
                  <span>{{ perosonnalInfo.bankNo }}</span>
                </el-form-item>
                <el-form-item
                  v-show="!readonly"
                  label="银行卡号:"
                  prop="bankNo"
                >
                  <el-input v-model="perosonnalInfo.bankNo" />
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                :push="4"
              >
                <el-form-item
                  v-show="readonly"
                  label="开户行:"
                >
                  <span>{{ perosonnalInfo.bankName }}</span>
                </el-form-item>
                <el-form-item
                  v-show="!readonly"
                  label="开户行:"
                  prop="bankName"
                >
                  <el-input v-model="perosonnalInfo.bankName" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col
                :span="8"
                :push="2"
              >
                <el-form-item
                  v-show="readonly"
                  label="婚姻状况:"
                >
                  <span>{{ getMarrige() }}</span>
                </el-form-item>
                <el-form-item
                  v-show="!readonly"
                  label="婚姻状况:"
                  prop="marriage"
                >
                  <el-select v-model="perosonnalInfo.marriage">
                    <el-option
                      v-for="item in merrigeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col
                :span="8"
                :push="4"
              >
                <el-form-item
                  v-show="readonly"
                  label="目前住址:"
                >
                  <span>
                    {{ perosonnalInfo.userAddress }}
                  </span>
                </el-form-item>
                <el-form-item
                  v-show="!readonly"
                  label="目前住址:"
                  prop="updateUser"
                >
                  <el-cascader
                    ref="regionCascader"
                    v-model="adress.curAdress"
                    :options="regionCascader.option"
                    :separator="'/'"
                  />
                  <el-input
                    v-model="adress.detailAdress"
                    class="detail-position"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item
              v-show="!readonly"
              class="info-button-group"
              :justify="'center'"
            >
              <el-button
                type="primary"
                @click="saveBasicInfo"
              >
                保存
              </el-button>
              <el-button @click="cancelBasicEdit">
                取消
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 紧急联系人列表 -->
      <emergency-members />
    </div>
  </div>
</template>

<script>
import emergencyMembers from './userCenter/emergencyMembers.vue'
import { validateName, isEmailReg, validataBankCard } from '@/util/validate'
import { getStaffBasicInfo, editStaffBasicInfo } from '../../api/personalInfo'
import { mapGetters } from 'vuex'
import { regionData } from 'element-china-area-data'
let noEditInfo = {}
export default {
  components: {
    emergencyMembers
  },
  data() {
    return {
      adress: {
        curAdress: '',
        detailAdress: ''
      },
      tabs: {
        activeTab: 'first'
      },
      readonly: true,
      regionCascader: {
        option: regionData,
        props: {
          value: 'value',
          label: 'label'
        }
      },
      formatMainRegion: '',
      basicInfo: {
        rules: {
          name: [
            {
              required: true,
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (!value || (value && !validateName(value))) {
                  callback(new Error('请输入2-10位汉字、英文、空格和点号'))
                } else {
                  callback()
                }
              }
            }
          ],
          email: [
            {
              required: false,
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('请输入邮箱'))
                } else if (value && !isEmailReg(value)) {
                  callback(new Error('邮箱格式有误'))
                } else {
                  callback()
                }
              }
            }
          ],
          bankNo: [
            {
              required: false,
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('请输入银行卡号'))
                } else if (value && !validataBankCard(value)) {
                  callback(new Error('银行卡号格式有误'))
                } else {
                  callback()
                }
              }
            }
          ]
        }
      },
      perosonnalInfo: {},
      contactOrder: null,
      merrigeOptions: [
        {
          value: 0,
          label: '未婚'
        },
        {
          value: 1,
          label: '已婚'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.getUserAllInfo()
  },

  methods: {
    getUserSex() {
      if (this.perosonnalInfo.sex == 1) {
        return '男'
      } else if (this.perosonnalInfo.sex == 0) {
        return '女'
      } else {
        return ''
      }
    },
    getStatus() {
      if (this.perosonnalInfo.status == 'Try') {
        return '试用期'
      } else if (this.perosonnalInfo.status == 'Formal') {
        return '正式'
      } else if (this.perosonnalInfo.status == 'Leaved') {
        return '已离职'
      } else if (this.perosonnalInfo.status == 'WaitLeave') {
        return '待离职'
      } else {
        return ''
      }
    },
    getMarrige() {
      return this.perosonnalInfo.marriage == 1 ? '已婚' : '未婚'
    },
    getUserAllInfo() {
      let params = {
        userId: this.userInfo.user_id //从vuex中获取
      }
      getStaffBasicInfo(params).then((res) => {
        this.perosonnalInfo = res
        noEditInfo = this.deepCopy(res)
      })
    },
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    handleEdit() {
      this.readonly = false
    },
    saveBasicInfo() {
      this.$refs['userInfo'].validate((isPass) => {
        if (isPass) {
          let thsAreaCode = this.$refs['regionCascader'].getCheckedNodes()[0].pathLabels
          this.perosonnalInfo.userAddress =
            thsAreaCode[0] + thsAreaCode[1] + thsAreaCode[2] + this.adress.detailAdress
          editStaffBasicInfo(this.perosonnalInfo).then(() => {
            noEditInfo = this.deepCopy(this.perosonnalInfo)
            this.readonly = true
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getUserAllInfo()
          })
        }
      })
    },
    cancelBasicEdit() {
      this.readonly = true
      this.perosonnalInfo = this.deepCopy(noEditInfo)
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0 !important;
}
li {
  list-style: none;
}
.back-style {
  background: #f7f8fa !important;
}
.no-back-style {
  background: #fff;
}
.padding-top-style {
  padding-top: 20px;
}
.setting-info {
  min-height: 100%;
  font-family: 'PingFangSC-Semibold';
  padding: 10px 32px 32px 32px !important;
}
.personal-info {
  font-size: 18px;
  color: #202940;
  line-height: 28px;
}
.info-survey {
  position: relative;
  height: 112px;
  margin-top: 20px;
  background: #ffffff;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.08), 0 2px 2px 0 rgba(0, 0, 0, 0.04),
    0 4px 8px 4px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  padding-left: 24px;
  font-size: 14px;
  color: #757c85;
  .el-container {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
  }
}
.info-image {
  width: 64px;
  height: 64px;
  border: 1px solid #ccc;
  border-radius: 32px;
  .avatar-uploader {
    text-align: center;
    line-height: 64px;
  }
}
.info-text {
  padding-left: 20px;
}
.info-name {
  font-size: 24px;
  color: #333333;
  line-height: 30px;
  padding-bottom: 6px;
  .staff-name {
    font-size: 24px;
    color: #333333;
  }
  .workNo {
    line-height: 24px;
    padding: 0 15px;
    color: #202940;
    font-size: 14px;
  }
  .el-button {
    padding: 7px 5px !important;
  }
}
.info-other {
  font-size: 14px;
  color: #757c85;
}
.info-other .line-middle {
  display: inline-block;
  height: 12px;
  width: 2px;
  background: #ccc;
  margin: 0 4px 0 8px;
  vertical-align: middle;
}
.info-detail {
  margin-top: 20px;
  background: #ffffff;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.08), 0 2px 2px 0 rgba(0, 0, 0, 0.04),
    0 4px 8px 4px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  border-radius: 4px;
}
.info-detail {
  /deep/ .el-tabs__header {
    padding-left: 24px !important;
    .el-tabs__nav-wrap {
      height: 50px;
      line-height: 50px;
      .el-tabs__nav .el-tabs__item {
        font-size: 16px !important;
        color: #545b66 !important;
        line-height: 36px !important;
      }
    }
  }
  .el-tabs__content {
    height: 100%;
    background: #fff;
  }
}

.info-detail .personal-basic-info {
  padding: 20px 30px 30px 30px;
}
.info-detail .personal-basic-info.no-back-color {
  background: #fff;
}
.info-detail .personal-basic-info.back-color {
  background: #cecece;
}
.personal-basic-info .basic-info {
  float: left;
}

.info-detail .info-edit-button {
  text-align: right;
  cursor: pointer;
  height: 30px;
  .el-icon-edit {
    font-size: 18px;
    color: #207efa;
  }
  .edit-button-text {
    font-size: 14px !important;
    color: #757c85 !important;
  }
}

.info-detail .basic-info-content {
  padding: 15px 0 0 20px;
  border-bottom: 1px solid #cecece;
  /deep/ .el-cascader {
    width: 100%;
  }
  /deep/ input {
    height: 34px !important;
    color: #202940;
    font-size: 14px;
  }
  .readonly-style /deep/ input {
    border: none;
  }
  .edit-style /deep/ input {
    border: 1px solid #dcdfe6;
  }
  .detail-position {
    margin-top: 8px;
    /deep/ input {
      height: 46px !important;
    }
  }
}
.info-detail .el-tabs__content .info-form .el-form-item__label {
  color: #718199;
}

.info-button-group {
  width: 100%;
  text-align: center;
  padding: 20px 0;
  margin: 0 !important;
  /deep/ .el-form-item__content {
    margin-left: 0 !important;
  }
  .el-button {
    width: 80px;
    height: 42px;
  }
}
.disabled {
  /deep/.el-input__inner {
    background: #cecece;
  }
  /deep/.el-input__inner:focus {
    border-color: #cecece;
  }
}
.hidden {
  display: none;
}
</style>

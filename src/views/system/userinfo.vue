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
                v-if="imageUrl"
                :src="imageUrl"
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
            {{ userInfo.name }}
          </p>
          <el-row>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <span>部门：</span>
                <span>{{ userInfo.postName }}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple-light">
                <span>职位：</span>
                <span>{{ userInfo.roleName }}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <span>邮箱：</span>
                <span>{{ userInfo.email }}</span>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>

    <div class="info-detail">
      <el-tabs v-model="tabs.activeTab">
        <!-- 个人详细信息（包括基本信息和紧急联系人信息） -->
        <el-tab-pane
          label="个人信息"
          name="first"
        >
          <div
            class="personal-basic-info"
            :class="[readonly ? 'no-back-color' : 'back-color']"
          >
            <div class="info-edit-button">
              <span class="basic-info">基本信息</span>
              <span
                v-show="readonly"
                class="basic-info-title-line"
              />
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
            <div class="basic-info-content">
              <el-form
                ref="userInfo"
                :model="userInfo"
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
                      <span>{{ userInfo.name }}</span>
                    </el-form-item>
                    <el-form-item
                      v-show="!readonly"
                      label="姓名:"
                      prop="name"
                    >
                      <el-input
                        v-model="userInfo.name"
                        placeholder="请输入2-10位汉字、英文、空格和点号"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col
                    :span="8"
                    :push="4"
                  >
                    <el-form-item
                      label="性别:"
                      prop="sex"
                    >
                      <el-radio
                        v-model="userInfo.sex"
                        label="1"
                      >
                        男
                      </el-radio>
                      <el-radio
                        v-model="userInfo.sex"
                        label="2"
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
                      <span>{{ userInfo.phone }}</span>
                    </el-form-item>
                    <el-form-item
                      v-show="!readonly"
                      label="手机号码:"
                      prop="phone"
                    >
                      <el-input v-model="userInfo.phone" />
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
                      <span>{{ userInfo.email }}</span>
                    </el-form-item>
                    <el-form-item
                      v-show="!readonly"
                      label="公司邮箱:"
                      prop="email"
                    >
                      <el-input v-model="userInfo.email" />
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
                      <span>{{ userInfo.createTime }}</span>
                    </el-form-item>
                    <el-form-item
                      v-show="!readonly"
                      label="银行卡号:"
                      prop="createTime"
                    >
                      <el-input v-model="userInfo.createTime" />
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
                      <span>{{ userInfo.createUser }}</span>
                    </el-form-item>
                    <el-form-item
                      v-show="!readonly"
                      label="开户行:"
                      prop="createUser"
                    >
                      <el-input v-model="userInfo.createUser" />
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
                      <span>{{ userInfo.createDept }}</span>
                    </el-form-item>
                    <el-form-item
                      v-show="!readonly"
                      label="婚姻状况:"
                      prop="createDept"
                    >
                      <el-select v-model="userInfo.createDept">
                        <el-option
                          label="未婚"
                          value="未婚"
                        />
                        <el-option
                          label="已婚"
                          value="已婚"
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
                        {{ (userInfo.updateUser + userInfo.updateTime).replace(/,/g, '') }}
                      </span>
                    </el-form-item>
                    <el-form-item
                      v-show="!readonly"
                      label="目前住址:"
                      prop="updateUser"
                    >
                      <el-cascader
                        v-model="userInfo.updateUser"
                        :options="regionCascader"
                        :separator="'/'"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row v-show="!readonly">
                  <el-col
                    :span="8"
                    :push="2"
                  />
                  <el-col
                    :span="8"
                    :push="4"
                    class="detail-position"
                  >
                    <el-form-item prop="updateTime">
                      <el-input v-model="userInfo.updateTime" />
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
          <emergency-members :emergency-list="emergency" />
        </el-tab-pane>

        <!-- 公司信息 -->
        <el-tab-pane
          label="公司信息"
          name="second"
        >
          公司信息
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import emergencyMembers from './userCenter/emergencyMembers.vue'
import { validateName, isEmail, validataBankCard } from '@/util/validate'
import { getUserInfo, update } from '@/api/system/user'

let noEditInfo = {
  id: 'user.id',
  name: 'user.name',
  phone: 'user.phone',
  email: 'user.email',
  sexName: 'user.sexName',
  sex: '1',
  roleName: 'user.roleName',
  postName: 'user.postName', //下面都是暂用的字段，后续根据接口实际输出
  createUser: '1123598821738675201', //暂时先代表开户行
  createDept: '否', //暂时代替结婚否
  createTime: '61012555555', //暂时代替卡号
  updateUser: '陕西省西安市', //暂时代替地址
  updateTime: '高新区天谷八路', //暂时代替详细地址
  status: 1,
  imageUrl: ''
}
export default {
  components: {
    emergencyMembers
  },
  data() {
    return {
      imageUrl: '',
      tabs: {
        activeTab: 'first'
      },
      readonly: true,
      regionCascader: [
        {
          value: '陕西省',
          label: '陕西省',
          children: [
            {
              value: '西安市',
              label: '西安市',
              children: [
                {
                  value: '雁塔区',
                  label: '雁塔区'
                },
                {
                  value: '高新区',
                  label: '高新区'
                },
                {
                  value: '长安区',
                  label: '长安区'
                },
                {
                  value: '未央区',
                  label: '未央区'
                }
              ]
            },
            {
              value: '咸阳市',
              label: '咸阳市',
              children: [
                {
                  value: '雁塔区',
                  label: '雁塔区'
                },
                {
                  value: '高新区',
                  label: '高新区'
                },
                {
                  value: '长安区',
                  label: '长安区'
                },
                {
                  value: '未央区',
                  label: '未央区'
                }
              ]
            }
          ]
        },
        {
          value: '广州省',
          label: '广州省',
          children: [
            {
              value: '广东市',
              label: '广东市'
            },
            {
              value: '深圳市',
              label: '深圳市'
            }
          ]
        }
      ],
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
                } else if (value && !isEmail(value)) {
                  callback(new Error('邮箱格式有误'))
                } else {
                  callback()
                }
              }
            }
          ],
          createTime: [
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
      userInfo: {
        id: 'user.id',
        name: 'user.name',
        phone: 'user.phone',
        email: 'user.email',
        sexName: 'user.sexName',
        sex: '1',
        roleName: 'user.roleName',
        postName: 'user.postName', //下面都是暂用的字段，后续根据接口实际输出
        createUser: '1123598821738675201', //暂时先代表开户行
        createDept: '否', //暂时代替结婚否
        createTime: '61012555555', //暂时代替卡号
        updateUser: '陕西省西安市', //暂时代替地址
        updateTime: '高新区天谷八路', //暂时代替详细地址
        status: 1,
        imageUrl: ''
      },
      contactOrder: null,
      emergencyIsEdit: false,
      emergency: {}
    }
  },
  created() {
    this.getUserAllInfo()
  },
  methods: {
    getUserAllInfo() {
      getUserInfo().then((res) => {
        console.log(res)
        const user = res.data.data
        //基本信息
        this.userInfo = {
          id: user.id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          sexName: user.sexName,
          sex: user.sex,
          roleName: user.roleName,
          postName: user.postName, //下面都是暂用的字段，后续根据接口实际输出
          createUser: '1123598821738675201', //暂时先代表开户行
          createDept: '否', //暂时代替结婚否
          createTime: '61012555555', //暂时代替卡号
          updateUser: '陕西省西安市', //暂时代替地址
          updateTime: '高新区天谷八路', //暂时代替详细地址
          status: 1,
          imageUrl: ''
        }
        noEditInfo = this.deepCopy(this.userInfo)
        //紧急联系人
        this.emergency = [
          {
            phone: '18393709876',
            relation: '母亲',
            name: 'aa'
          },
          {
            phone: '1234566',
            relation: '父亲',
            name: 'bb'
          }
        ]
      })
    },
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    handleEdit() {
      this.readonly = false
    },
    saveBasicInfo() {
      this.readonly = true

      update(this.form).then((res) => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '修改信息成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    cancelBasicEdit() {
      this.readonly = true
      this.userInfo = this.deepCopy(noEditInfo)
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式或者!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss">
@import '../../../src/styles/user/userInfo.scss';
</style>

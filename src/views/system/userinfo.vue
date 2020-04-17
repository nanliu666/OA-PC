<template>
  <div class="setting-info">
    <div class="personal-info">
      <span><i class="el-icon-arrow-left" /></span>
      <span>个人信息</span>
    </div>
    <div class="info-survey">
      <div class="info-image">
        <img
          src=""
          alt=""
        >
      </div>
      <div class="info-text">
        <p class="info-name">
          {{ userInfo.name }}
        </p>
        <p class="info-other">
          <span>{{ userInfo.post }}</span>
          <span class="line-middle" />
          <span> {{ userInfo.company }}</span>
        </p>
      </div>
    </div>
    <div class="info-detail">
      <el-tabs
        v-model="tabs.activeTab"
        ss
      >
        <el-tab-pane
          label="个人信息"
          name="first"
        >
          <div class="info-edit-button">
            <span
              style="padding:5px;"
              :class="[readonly ? 'show' : 'hidden']"
              @click="handleEdit"
            >
              <i
                class="el-icon-edit"
                style="color:#207EFA; font-size: 18px;"
              />
              <span style="font-size: 14px;color: #757C85"> 编辑</span>
            </span>
          </div>
          <div class="info-content">
            <el-form
              ref="userInfo"
              :model="userInfo"
              label-width="120px"
              class="info-form"
              size="mini"
            >
              <el-row :justify="'center'">
                <el-col
                  :span="8"
                  :push="2"
                >
                  <el-form-item label="姓名:">
                    <el-input
                      v-model="userInfo.name"
                      :readonly="true"
                      class="readonly-style"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :span="8"
                  :push="2"
                >
                  <el-form-item label="婚姻状况:">
                    <el-input
                      v-model="userInfo.isMerry"
                      :readonly="readonly"
                      :class="[readonly ? 'show readonly-style' : 'hidden']"
                    />
                    <el-select
                      v-model="userInfo.isMerry"
                      placeholder="请选择活动区域"
                      :class="[readonly ? 'hidden' : 'show']"
                    >
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
              </el-row>
              <el-row>
                <el-col
                  :span="8"
                  :push="2"
                >
                  <el-form-item label="工号:">
                    <el-input
                      v-model="userInfo.jobNumber"
                      :readonly="true"
                      class="readonly-style"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :span="8"
                  :push="2"
                >
                  <el-form-item label="紧急联系人:">
                    <el-input
                      v-model="userInfo.linkman"
                      :readonly="readonly"
                      :class="[readonly ? 'readonly-style' : 'edit-style']"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col
                  :span="8"
                  :push="2"
                >
                  <el-form-item label="手机号码:">
                    <el-input
                      v-model="userInfo.phone"
                      :readonly="true"
                      class="readonly-style"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :span="8"
                  :push="2"
                >
                  <el-form-item label="紧急联系人方式:">
                    <el-input
                      v-model="userInfo.linkmanNumber"
                      :readonly="readonly"
                      :class="[readonly ? 'readonly-style' : 'edit-style']"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col
                  :span="8"
                  :push="2"
                >
                  <el-form-item label="公司邮箱:">
                    <el-input
                      v-model="userInfo.emailBox"
                      :readonly="true"
                      class="readonly-style"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :span="8"
                  :push="2"
                >
                  <el-form-item label="电子邮件:">
                    <el-input
                      v-model="userInfo.email"
                      :readonly="readonly"
                      :class="[readonly ? 'readonly-style' : 'edit-style']"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col
                  :span="8"
                  :push="2"
                >
                  <el-form-item label="开户行:">
                    <el-input
                      v-model="userInfo.targetBank"
                      :readonly="readonly"
                      :class="[readonly ? 'readonly-style' : 'edit-style']"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :span="8"
                  :push="2"
                >
                  <el-form-item label="目前住址:">
                    <span :class="[readonly ? 'show readonly-style' : 'hidden']">
                      {{ (userInfo.mainRegion + userInfo.detailRegion).replace(/,/g, '') }}
                    </span>
                    <el-cascader
                      v-model="userInfo.mainRegion"
                      :options="regionCascader"
                      :class="[readonly ? 'hidden' : 'show']"
                      :separator="'/'"
                    >
                      <template slot-scope="{ node, data }">
                        <span>{{ data.label }}</span>
                        <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                      </template>
                    </el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col
                  :span="8"
                  :push="2"
                >
                  <el-form-item label="银行卡号:">
                    <el-input
                      v-model="userInfo.cardNumber"
                      :readonly="readonly"
                      :class="[readonly ? 'readonly-style' : 'edit-style']"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :span="8"
                  :push="2"
                  class="detail-position"
                >
                  <el-form-item :class="[readonly ? 'hidden' : 'show']">
                    <el-input
                      v-model="userInfo.detailRegion"
                      :readonly="readonly"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item
                :class="[readonly ? 'hidden' : 'show  info-button-group']"
                :justify="'center'"
              >
                <el-button
                  type="primary"
                  @click="saveInfo"
                >
                  保存
                </el-button>
                <el-button @click="cancelEdit">
                  取消
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
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
export default {
  data() {
    return {
      tabs: {
        activeTab: 'first'
      },
      readonly: true,
      regionCascader: [
        {
          value: '指南',
          label: '指南',
          children: [
            {
              value: '设计原则',
              label: '设计原则',
              children: [
                {
                  value: '一致',
                  label: '一致'
                },
                {
                  value: '反馈',
                  label: '反馈'
                },
                {
                  value: '效率',
                  label: '效率'
                },
                {
                  value: '可控',
                  label: '可控'
                }
              ]
            },
            {
              value: '导航',
              label: '导航',
              children: [
                {
                  value: '侧向导航',
                  label: '侧向导航'
                },
                {
                  value: '顶部导航',
                  label: '顶部导航'
                }
              ]
            }
          ]
        }
      ],
      formatMainRegion: '',
      userInfo: {
        name: '张三',
        post: '人事专员',
        company: '百利宏控股有限公司',
        isMerry: '未婚',
        jobNumber: 'xa55789',
        linkman: 'qq',
        linkmanNumber: '18905672345',
        phone: '1908723456',
        email: '123456@163.com',
        emailBox: '123456@qq.com',
        targetBank: '天谷八路',
        mainRegion: ['指南', '设计原则', '一致'],
        detailRegion: '天谷十路aaaa',
        cardNumber: '610123456789'
      }
    }
  },
  methods: {
    handleEdit() {
      this.readonly = false
    },
    saveInfo() {
      this.readonly = true
      console.log(this.userInfo)
      console.log(this.formatMainRegion)
    },
    cancelEdit() {
      this.readonly = true
    }
  }
}
</script>

<style>
@import '../../../src/styles/user/userInfo.scss';
</style>

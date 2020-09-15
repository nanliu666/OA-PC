<template>
  <div class="security-setting">
    <div class="setiing-content">
      <div
        v-if="editType == 'entry'"
        class="enty-content"
      >
        <div class="setting-title">
          <p>安全设置</p>
        </div>

        <el-card
          shadow="never"
          class="main-content"
        >
          <div class="setting-tip">
            <p>
              安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。
            </p>
          </div>
          <div class="content">
            <div class="content-item">
              <span class="item-label">密保手机：</span>
              <span class="item-value">{{ perosonnalInfo.phonenum }}</span>
              <span
                class="edit-item"
                @click="editPhone()"
              >修改</span>
            </div>
            <div class="content-item">
              <span class="item-label">密保邮箱：</span>
              <span class="item-value">{{ perosonnalInfo.email }}</span>
              <span
                class="edit-item"
                @click="editEmail()"
              >修改</span>
            </div>
            <div class="content-item">
              <span class="item-label">登录密码：</span>
              <span class="item-value">******</span>
              <span
                class="edit-item"
                @click="editPsw()"
              >修改</span>
            </div>
          </div>
        </el-card>
      </div>
      <revisepsw v-if="editType == 'psw'" />
      <revisePhone v-if="editType == 'phone'" />
    </div>
  </div>
</template>

<script>
import revisePhone from './components/revisePhone.vue'
import revisepsw from './components/revisepsw.vue'
import { mapGetters } from 'vuex'
import { getStaffBasicInfo } from '../../api/personalInfo'
export default {
  components: {
    revisePhone,
    revisepsw
  },
  data() {
    return {
      isEmail: false,
      editType: 'entry',
      perosonnalInfo: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.getUserAllInfo()
  },
  methods: {
    getUserAllInfo() {
      let params = {
        userId: this.userInfo.user_id //从vuex中获取
      }
      getStaffBasicInfo(params).then((res) => {
        this.perosonnalInfo = res
      })
    },
    editPhone() {
      this.isEmail = false
      this.editType = 'phone'
    },
    editEmail() {
      this.isEmail = true
      this.editType = 'phone'
    },
    editPsw() {
      this.editType = 'psw'
    }
  }
}
</script>

<style scoped lang="scss">
.security-setting {
  font-family: 'PingFangSC-Semibold';
  height: auto;
  font-size: 14px;
}
.setting-title {
  font-size: 18px;
  color: #545b66;
}
.main-content {
  padding: 10px 30px;
  height: calc(100vh - 60px - 40px - 56px - 32px);
  background: #fff;
  .setting-tip {
    background: #f7f8fa;
    line-height: 50px;
    padding-left: 50px;
    color: #a0a8ae;
  }
}
.content-item {
  line-height: 50px;
  padding-left: 30px;
  .item-label {
    color: #718199;
  }
  .item-value {
    color: #202940;
    margin-right: 15px;
    min-width: 150px;
    display: inline-block;
  }
  .edit-item {
    cursor: pointer;
    padding: 8px;
    color: #207efa;
  }
}
</style>

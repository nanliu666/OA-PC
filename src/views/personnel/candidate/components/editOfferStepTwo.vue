<template>
  <el-row
    type="flex"
    justify="center"
  >
    <el-col
      :xl="8"
      :lg="10"
      :md="12"
      :sm="14"
      :xs="18"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        label-position="top"
        style="margin-top:24px;"
        size="medium"
      >
        <el-form-item
          label="offer模板"
          prop="template"
        >
          <el-radio-group v-model="form.template">
            <el-radio label="Normal">
              正式员工
            </el-radio>
            <el-radio label="Intern">
              实习员工
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="offer标题"
          prop="title"
        >
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item
          label="发件邮箱"
          prop="email"
        >
          <el-input
            v-model="personInfo.email"
            maxlength="11"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="邮件附件"
          prop="attachment"
        >
          <common-upload
            v-model="form.attachment"
            :multiple="false"
          >
            <el-button
              v-if="form.attachment.length === 0"
              size="medium"
            >
              上传附件
            </el-button>
            <el-button
              v-else
              size="medium"
              type="text"
            >
              {{ form.attachment[0].localName }}
            </el-button>
          </common-upload>
        </el-form-item>
        <el-form-item
          label="邮件抄送"
          prop="ccEmail"
        >
          <el-input v-model="form.ccEmail" />
          <span class="tips">
            多个邮箱以；分号分隔
          </span>
        </el-form-item>
        <el-form-item
          label="offer有效期"
          prop="validDay"
        >
          <el-select v-model="form.validDay">
            <el-option
              v-for="item in validDayOptions"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="使用OA通知到相关同事"
          prop="noticeUserList"
        >
          <div class="notice-user-list">
            <template v-for="(user, index) in form.noticeUserList">
              <i
                v-if="index !== 0"
                :key="index"
                class="el-icon-plus plus"
              />
              <div
                :key="user.userId"
                :class="['user', { last: index === form.noticeUserList.length - 1 }]"
              >
                <div class="head">
                  <i class="icon-usercircle" />
                </div>
                <div class="name">
                  {{ user.name }}
                </div>
              </div>
            </template>
            <div
              class="add"
              @click="editNoticeUserList"
            >
              <i class="el-icon-plus" />
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label="邀请填写入职登记"
          prop="isFill"
        >
          <el-radio-group v-model="form.isFill">
            <el-radio :label="1">
              填写
            </el-radio>
            <el-radio :label="0">
              不填写
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-col>
    <worker-picker
      ref="workerPicker"
      :visible.sync="visible"
      @submit="handelSetNoticeUserList"
    />
  </el-row>
</template>
<script>
export default {
  name: 'EditOfferStepTwo',
  components: {
    commonUpload: () => import('@/components/common-upload/commonUpload'),
    workerPicker: () => import('./workerPicker')
  },
  props: {
    personInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        template: 'Normal',
        title: null,
        attachment: [],
        validDay: null,
        ccEmail: null,
        isFill: 1,
        noticeUserList: []
      },
      rules: {
        title: [{ required: true, message: '请输入offer标题', trigger: 'input' }],
        validDay: [{ required: true, message: '请输入入职日期', trigger: 'blur' }],
        isFill: [{ required: true, message: '请选择是否邀请填写入职登记' }]
      },
      validDayOptions: [],
      visible: false
    }
  },
  created() {
    this.getValidDayOptions()
  },
  methods: {
    init(data) {
      this.form = { ...data }
    },
    editNoticeUserList() {
      this.$refs['workerPicker'].init(this.form.noticeUserList)
    },
    handelSetNoticeUserList(userList) {
      this.form.noticeUserList = userList
    },
    getValidDayOptions() {
      this.$store.dispatch('CommonDict', 'OfferValidDay').then((res) => {
        this.validDayOptions = res
      })
    },
    inputNumber(value, key) {
      value = value.replace(/[^\d]/g, '')
      this.form[key] = value
    },
    clear() {
      this.$refs.form.clearValidate()
      this.form = this.$options.data().form
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            reject()
            return
          }
          resolve(this.genData(this.form))
        })
      })
    },
    genData(form) {
      let firstAttach = form.attachment[0] || {}
      return {
        template: form.template,
        title: form.title,
        ccEmail: form.ccEmail,
        validDay: form.validDay,
        attachmentUrl: firstAttach.fileUrl,
        attachmentName: firstAttach.localName,
        isFill: form.isFill,
        noticeUser: form.noticeUserList
          .map((user) => `${user.userId}#${user.name}#${user.workNo}`)
          .join(',')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.notice-user-list {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  .user {
    flex-direction: column;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    &.last {
      margin-right: 12px;
    }
    .head {
      // width: 34px;
      // height: 34px;
      // border-radius: 50%;
      // background: rgba(245, 246, 246, 0.5);
      // border: 1px solid rgba(117, 124, 133, 0.5);
      i {
        font-size: 34px;
        color: #cfd3d6;
      }
    }
    .name {
      line-height: 16px;
    }
  }
  .plus {
    margin: 0 6px;
    margin-top: 12px;
  }
  .add {
    cursor: pointer;
    width: 32px;
    height: 32px;
    background: rgba(245, 246, 246, 0.5);
    border: 1px dashed rgba(117, 124, 133, 0.5);
    border-radius: 50%;
    text-align: center;
    line-height: 34px;
    i {
      color: #757c85;
    }
  }
}
.tips {
  font-size: 12px;
  color: #a0a8ae;
}
</style>

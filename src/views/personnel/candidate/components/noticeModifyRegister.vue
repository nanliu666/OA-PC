<template>
  <el-dialog
    title="通知TA修改"
    :visible.sync="visible"
    width="30%"
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <el-form
      ref="ruleForm"
      v-loading="loading"
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="top"
    >
      <el-form-item
        label="修改说明"
        prop="note"
      >
        <el-input
          v-model="form.note"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      ref="123"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        @click="handleClose"
      >取消</el-button>
      <el-button
        type="primary"
        size="medium"
        @click="submit"
      >确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { notifyInterviewRegister } from '@/api/personnel/candidate'
import { notifyCandidateRegister } from '@/api/personnel/entry'

export default {
  name: 'NoticeModifyRegister',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      type: 'interview',
      form: { note: '' },
      rules: {
        note: [{ required: true, message: '请输入修改说明', trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    noticeInterview(params) {
      this.$emit('update:visible', true)
      this.type = 'interview'
      this.form = Object.assign(this.form, params)
    },
    noticeEntry(params) {
      this.$emit('update:visible', true)
      this.type = 'entry'
      this.form = Object.assign(this.form, params)
    },
    submit() {
      this.$refs.ruleForm.validate((valid, obj) => {
        if (valid) {
          const params = { ...this.form }
          params.userId = this.$store.state.user.userInfo.user_id
          this.loading = true
          let notifyFun =
            this.type === 'interview' ? notifyInterviewRegister : notifyCandidateRegister
          notifyFun(params)
            .then(() => {
              this.$message({
                type: 'success',
                message: '通知成功!'
              })
              this.loading = false
              this.form = this.$options.data().form
              this.$emit('refresh')
              this.$emit('update:visible', false)
            })
            .catch(() => {
              this.loading = false
              this.$message({
                type: 'info',
                message: '通知失败'
              })
            })
        } else {
          this.$message.error(obj[Object.keys(obj)[0]][0].message)
          return false
        }
      })
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

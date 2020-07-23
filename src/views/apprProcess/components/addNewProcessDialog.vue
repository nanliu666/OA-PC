<template>
  <el-dialog
    title="新建分组"
    :visible="dialogVisible"
    width="500px"
    append-to-body
    :before-close="close"
  >
    <el-form
      class="login-form"
      status-icon
      :rules="rules"
      :model="form"
      label-width="0"
    >
      <el-form-item prop="groupName">
        <el-input
          v-model="form.groupName"
          placeholder="请输入分组名称"
        />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        @click="close"
      >
        取 消
      </el-button>
      <el-button
        v-loading="loading"
        size="medium"
        type="primary"
        :disabled="submitDisable"
        @click="handleSubmit"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { validatenull } from '@/util/validate'
export default {
  name: 'AddNewProcessDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogType: {
      type: String,
      default: ''
    },
    subGroupName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      form: {
        groupName: this.subGroupName
      },
      rules: {
        groupName: [
          { required: true, message: '请输入分组名称', trigger: 'blur' },
          { min: 3, max: 20, message: '分组名称长度不能超过20', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    submitDisable() {
      let disable = true
      if (!validatenull(this.form.groupName)) {
        disable = false
      }
      if (this.form.groupName.length > 20) {
        disable = false
      }
      return disable
    }
  },
  created() {},
  methods: {
    close() {
      this.clear()
      this.$emit('update:dialogVisible', false)
    },
    clear() {},
    handleSubmit() {
      // this.$emit('addUser', '1')
      let messageText =
        this.dialogType === 'add' ? `“${this.form.groupName}”分组创建成功` : '重命名成功'
      this.$message.success(messageText)
      //   this.close()
    }
  }
}
</script>

<style lang="scss" scoped></style>

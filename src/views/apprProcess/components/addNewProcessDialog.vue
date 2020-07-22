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
      label-width="0"
    >
      <el-form-item prop="groupName">
        <el-input
          v-model="groupName"
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
    }
  },
  data() {
    return {
      loading: false,
      groupName: '',
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
      let flag = true
      window.console.log(validatenull(this.groupName))
      if (!validatenull(this.groupName)) {
        flag = false
      }
      if (this.groupName.length > 20) {
        flag = false
      }
      return flag
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
      this.$emit('addUser', '1')
      //   this.close()
    }
  }
}
</script>

<style lang="scss" scoped></style>

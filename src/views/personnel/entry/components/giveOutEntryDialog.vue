<template>
  <el-dialog
    title="放弃入职"
    :visible.sync="visible"
    width="30%"
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <el-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="top"
    >
      <el-form-item label="已选择">
        <template v-for="item in personArr">
          <el-tag :key="item.personId">
            {{ item.name }}
          </el-tag>
        </template>
      </el-form-item>
      <el-form-item
        label="放弃入职原因"
        prop="reason"
      >
        <el-select
          v-model="form.reason"
          placeholder="请选择放弃入职原因"
        >
          <el-option
            v-for="item in reasonArr"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="备注"
        prop="remark"
      >
        <el-input
          v-model="form.remark"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item prop="isTalent">
        <el-checkbox
          v-model="form.isTalent"
          :true-label="1"
          :false-label="0"
        >
          是否添加到人才库
        </el-checkbox>
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
        :loading="loading"
        @click="submit"
      >确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getOutCandidateAccept } from '@/api/personnel/entry'

export default {
  name: 'GiveOutEntryDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: { reason: '', isTalent: 0, remark: '' },
      personArr: [],
      reasonArr: [
        '个人原因',
        '接受其他offer',
        '工作不感兴趣',
        '原单位留任',
        '薪资不满意',
        '工作地址不满意',
        '其他'
      ],
      rules: {
        reason: [{ required: true, message: '放弃入职原因', trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    out(arr) {
      this.$emit('update:visible', true)
      this.personArr = [JSON.parse(JSON.stringify(arr))]
    },
    submit() {
      this.$refs.ruleForm.validate((valid, obj) => {
        if (valid) {
          const params = {
            personId: this.personArr[0].personId,
            userId: this.$store.state.user.userInfo.user_id,
            recruitmentId: this.personArr[0].recruitmentId,
            ...this.form
          }
          this.loading = true
          getOutCandidateAccept(params)
            .then(() => {
              this.$message({
                type: 'success',
                message: '放弃入职成功!'
              })
              this.loading = false
              Object.assign(this.$data.form, this.$options.data().form)
              this.$emit('refresh')
              this.$emit('update:visible', false)
            })
            .catch(() => {
              this.loading = false
              this.$message({
                type: 'info',
                message: '确认入职失败'
              })
            })
        } else {
          this.$message.error(obj[Object.keys(obj)[0]][0].message)
          return false
        }
      })
    },
    handleClose() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-select {
  width: 100%;
}
</style>

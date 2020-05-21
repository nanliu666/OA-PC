<template>
  <el-dialog
    title="淘汰候选人"
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
      <el-form-item label="已选择">
        <template v-for="item in personArr">
          <el-tag :key="item.personId">
            {{ item.name }}
          </el-tag>
        </template>
      </el-form-item>
      <el-form-item
        label="淘汰原因"
        prop="reason"
      >
        <el-select
          v-model="form.reason"
          placeholder="请选择淘汰原因"
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
import { weedOutCandidate } from '@/api/personnel/candidate'

export default {
  name: 'WeedOutDialog',
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
        '不符合岗位条件',
        '专业技能欠缺',
        '沟通表达能力差',
        '候选人放弃',
        '薪资要求过高',
        '稳定性较差',
        '相关经验过少',
        '其他'
      ],
      rules: {
        reason: [{ required: true, message: '请选择淘汰原因', trigger: 'blur' }]
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
            ...this.form
          }
          this.loading = true
          weedOutCandidate(params)
            .then(() => {
              this.$message({
                type: 'success',
                message: '淘汰成功!'
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
                message: '已取消淘汰'
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

<style lang="scss" scoped>
/deep/ .el-select {
  width: 100%;
}
</style>

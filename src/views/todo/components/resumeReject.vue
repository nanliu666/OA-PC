<template>
  <el-dialog
    title="淘汰候选人"
    :visible="visible"
    width="600px"
    append-to-body
    :before-close="close"
  >
    <el-form
      ref="form"
      :model="form"
      label-position="top"
      :rules="rules"
      size="medium"
    >
      <el-form-item
        label="分组名称"
        prop="reason"
      >
        <el-select v-model="form.reason">
          <el-option
            v-for="reason in reasons"
            :key="reason"
            :label="reason"
            :value="reason"
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
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        @click="close"
      >取 消</el-button>
      <el-button
        :loading="loading"
        size="medium"
        type="primary"
        @click="handleSubmit"
      >
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { modifyResumeReject } from '@/api/todo/todo'
import { mapGetters } from 'vuex'

export default {
  name: '',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        reason: '',
        remark: ''
      },
      rules: {
        reason: [
          {
            required: true,
            message: '请选择淘汰原因'
          }
        ]
      },
      reasons: [
        '不符合岗位条件',
        '专业技能欠缺',
        '沟通表达能力差',
        '候选人放弃',
        '薪资要求过高',
        '稳定性较差',
        '相关经验过少',
        '其他'
      ],
      loading: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {},
  methods: {
    close() {
      this.clear()
      this.$emit('update:visible', false)
    },
    clear() {
      this.form = this.$options.data().form
      this.$refs['form'].clearValidate()
    },
    init() {
      this.$emit('update:visible', true)
    },
    handleSubmit() {
      this.loading = true
      modifyResumeReject({
        userId: this.userId,
        id: this.id,
        reason: this.form.reason,
        remark: this.form.remark
      })
        .then(() => {
          this.$message.success('操作成功')
          this.$emit('submit')
          this.close()
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss">
.el-select {
  width: 100%;
}
</style>

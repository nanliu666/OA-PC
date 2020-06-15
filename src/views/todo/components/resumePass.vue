<template>
  <el-dialog
    title="通过审核"
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
        v-loading="loading"
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
import { modifyResumePass } from '@/api/todo/todo'
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
        remark: ''
      },
      rules: {},
      loading: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
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
      modifyResumePass({
        userId: this.userId,
        id: this.id,
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
<style lang="scss"></style>

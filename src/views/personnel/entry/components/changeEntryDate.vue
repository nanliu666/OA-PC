<template>
  <el-dialog
    title="更改入职日期"
    :visible.sync="visible"
    width="30%"
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <el-form
      ref="ruleForm"
      :model="form"
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
      <el-form-item label="预计入职日期">
        <el-date-picker
          v-model="form.entryDate"
          type="date"
          placeholder="请选择入职日期"
          value-format="yyyy-MM-dd"
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
        :loading="loading"
        :disabled="isDisabled"
        @click="submit"
      >确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { changeEntryDate } from '@/api/personnel/entry'

export default {
  name: 'ChangeEntryDateDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: { entryDate: '' },
      personArr: [],
      // 原本的入职日期
      oldEntryDate: '',
      loading: false
    }
  },
  computed: {
    isDisabled() {
      return this.oldEntryDate === this.form.entryDate ? true : false
    }
  },
  methods: {
    out(arr) {
      this.personArr = [JSON.parse(JSON.stringify(arr))]
      this.form.entryDate = this.personArr[0].entryDate
      this.oldEntryDate = this.personArr[0].entryDate
      this.$emit('update:visible', true)
    },
    submit() {
      this.$refs.ruleForm.validate((valid, obj) => {
        if (valid) {
          const params = {
            offerId: this.personArr[0].offerId,
            ...this.form
          }
          this.loading = true
          changeEntryDate(params)
            .then(() => {
              this.$message({
                type: 'success',
                message: '更改离职日期成功!'
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
                message: '更改离职日期失败'
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
.el-date-editor {
  width: 100%;
}
</style>

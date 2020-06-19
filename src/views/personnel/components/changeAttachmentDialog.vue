<template>
  <el-dialog
    :title="type === 'changeName' ? '修改名称' : '移动分类'"
    :visible.sync="visible"
    width="40%"
    append-to-body
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <el-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="newOrgDailog"
    >
      <el-form-item
        label="文件名称"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        v-if="type !== 'changeName'"
        label="移动至"
        prop="categoryId"
      >
        <el-select v-model="form.categoryId">
          <el-option-group
            v-for="group in listData"
            :key="group.name"
            :label="attachmentType[group.name]"
          >
            <el-option
              v-for="item in group.list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-option-group>
        </el-select>
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
        :loading="loading"
        @click="submit"
      >确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { modifyAttachmentInfo } from '@/api/personnel/attach'

export default {
  name: 'ChangeAttachmentDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    listData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      type: 'changeName',
      form: { id: '', categoryId: '', name: '' },
      rules: {
        categoryId: [{ required: true, message: '请选择附件分类', trigger: 'blur' }],
        name: [{ required: true, message: '请输入文件名称', trigger: 'blur' }]
      },
      attachmentType: {},
      loading: false
    }
  },
  created() {
    this.$store.dispatch('CommonDict', 'AttachmentType').then((res) => {
      res.forEach((item) => {
        this.attachmentType[item.dictKey] = item.dictValue
      })
    })
  },
  methods: {
    changeName(item) {
      this.type = 'changeName'
      this.form.id = item.id
      this.form.name = item.name
      this.form.categoryId = item.categoryId + ''
      this.$emit('update:visible', true)
    },
    changeCategory(item) {
      this.type = 'changeCategory'
      this.form.id = item.id
      this.form.name = item.name
      this.form.categoryId = item.categoryId + ''
      this.$emit('update:visible', true)
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    submit() {
      this.loading = true
      modifyAttachmentInfo(this.form)
        .then(() => {
          this.$message.success('修改成功')
          this.loading = false
          this.$emit('update:visible', false)
          this.$emit('refresh')
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-select {
  width: 100%;
}
</style>

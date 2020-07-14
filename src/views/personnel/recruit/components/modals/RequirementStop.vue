<template>
  <el-dialog
    :before-close="close"
    :visible="visible"
    append-to-body
    class="RequirementStop"
    title="确定停止招聘?"
    width="500px"
  >
    <div class="message">
      该职位还有
      <span class="message__number">
        {{ candidateNum }}
      </span>
      位候选人正在招聘流程，确定要停止招聘？停止后不影响这些候选人的招聘状态。
    </div>
    <common-form
      ref="form"
      class="form"
      :model="form"
      :columns="formColumns"
    />
    <template #footer>
      <el-button
        size="medium"
        @click="close"
      >
        取 消
      </el-button>
      <el-button
        :loading="submitting"
        size="medium"
        type="primary"
        @click="handleSubmit"
      >
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { requirementStop } from '@/api/personnel/recruitment'
// 表单配置
const FORM_COLUMNS = [
  {
    itemType: 'input',
    label: '停止招聘原因',
    maxlength: 20,
    offset: 0,
    prop: 'reason',
    showWordLimit: true,
    span: 24
  }
]

export default {
  name: 'RequirementStop',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {},
      candidateNum: '-',
      formColumns: FORM_COLUMNS,
      submitting: false
    }
  },

  methods: {
    close() {
      this.submitting = false
      this.$emit('update:visible', false)
    },
    init(data = {}) {
      this.$emit('update:visible', true)
      this.form = _.pick(data, ['recruitmentId', 'userId'])
      this.candidateNum = data.candidateNum
    },
    handleSubmit() {
      this.$refs.form.validate().then((data) => {
        this.submitting = true
        requirementStop(data)
          .then(() => {
            this.$message.success('操作成功')
          })
          .finally(() => {
            this.submitting = false
            this.close()
          })
      })
    }
  }
}
</script>

<style lang="sass" scope>
$color_active: #368afa;
$form_padding: 1rem

.RequirementStop
  .form,.message
    padding:
      left: $form_padding
      right: $form_padding
  .message
    margin-bottom: 2 * $form_padding
    &__number
      color: $color_active
      font-weight: bold
</style>

<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialog"
      width="550px"
      append-to-body
      :before-close="close"
    >
      <div>
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :rules="rules"
        >
          <el-form-item
            label="帮助说明"
            prop="note"
          >
            <el-input
              v-model="form.note"
              :autosize="{ minRows: 10, maxRows: 14 }"
              type="textarea"
              placeholder="请输入帮助说明"
            />
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="medium"
          @click="dialog = false"
        >取 消</el-button>
        <el-button
          size="medium"
          type="primary"
          @click="onsubmit"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'NoteDialog',
  props: {
    dialogVisible: {
      type: Boolean
    },
    note: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialog: true,
      form: {
        note: '',
        name: ''
      },
      rules: {
        note: [
          {
            required: true,
            message: '请填写帮助说明',
            trigger: 'change'
          }
        ]
      }
    }
  },
  watch: {
    note: {
      handler(val) {
        this.form.note = val
      },
      immediate: true
    },
    dialog: {
      handler: function() {
        this.$emit('update:dialogVisible', false)
      }
    }
  },
  methods: {
    onsubmit() {
      this.$refs.form.validate((val) => {
        if (!val) return
        this.$emit('update:note', this.form.note)
        this.dialog = false
      })
    },
    close() {
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__header {
  padding: 16px 0;
  margin: 0 24px;
  border-bottom: 1px solid rgba(208, 211, 214, 0.44);
  font-size: 18px;
  color: #202940;
  line-height: 24px;
}

/deep/ .el-dialog__body {
  padding: 24px;
}

/deep/ .el-dialog__footer {
  padding: 0px 24px 24px;
}

/deep/ .el-form-item__label {
  line-height: 20px;
  font-size: 14px;
  color: #0f0000;
}

/deep/ .el-form-item {
  margin-bottom: 24px;
}

.dialog-footer {
  text-align: right;
}
</style>

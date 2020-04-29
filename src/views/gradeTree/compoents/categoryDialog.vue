<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialog"
      width="550px"
      :modal-append-to-body="false"
      :before-close="handleClose"
    >
      <div>
        <avue-form
          ref="form"
          v-model="form"
          :option="option"
        />
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <div
          v-if="!isEdit"
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="medium"
            @click="onContinue"
          >
            保存并继续添加
          </el-button>
          <el-button
            type="primary"
            size="medium"
            @click="onClickSave"
          >
            保存
          </el-button>
        </div>
        <div
          v-else
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="medium"
            @click="onContinue"
          >
            取消
          </el-button>
          <el-button
            type="primary"
            size="medium"
            @click="modity"
          >
            保存
          </el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postCategoryDefine, putCategoryDefine } from '@/api/organize/position'

export default {
  name: 'CategoryDialog',
  props: {
    isEdit: {
      type: Boolean
    },
    data: {
      type: Object
    },
    title: {
      type: String
    },
    dialogVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      form: {
        name: '',
        remark: ''
      },
      option: {
        menuBtn: false,
        labelPosition: 'top',
        size: 'medium',
        column: [
          {
            label: '职位类别名称',
            prop: 'name',
            type: 'input',
            row: true,
            span: 24,
            placeholder: '请输入职位类别名称',
            rules: [
              {
                required: true,
                message: '请输入职位类别名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '描述',
            prop: 'remark',
            type: 'textarea',
            row: true,
            span: 24,
            placeholder: '请输入描述'
          }
        ]
      },
      dialog: false
    }
  },
  watch: {
    data: {
      handler: function(val) {
        this.form.name = val.name
        this.form.remark = val.remark
      },
      deep: true
    },
    dialog: {
      handler: function() {
        this.$emit('update:dialogVisible', this.dialog)
        if (!this.dialog) {
          if (!this.dialog) {
            this.$refs.form.resetFields()
          }
        }
      }
    },
    dialogVisible: {
      handler: function(val) {
        this.dialog = val
      },
      deep: true //对象内部的属性监听，也叫深度监听
    }
  },
  methods: {
    onContinue() {
      this.dialog = false
    },
    modity() {
      let data = {
        ...this.data,
        ...this.form
      }
      putCategoryDefine(data).then(() => {
        this.$message.success('修改成功')
        this.$emit('onSubmit', data)
        this.dialog = false
      })
    },
    onClickSave() {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          this.$emit('onsubmit')
          let params = {
            name: '',
            remark: '',
            ...this.form
          }
          postCategoryDefine(params).then(() => {
            this.$message.success('新增成功')
            this.$emit('onSubmit', params)
            this.dialog = false
          })
        }
      })
    },
    handleClose() {
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
  text-align: center;
}
</style>

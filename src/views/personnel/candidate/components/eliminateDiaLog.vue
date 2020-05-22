<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialog"
      width="550px"
      append-to-body
      :before-close="handleClose"
    >
      <div>
        <div>
          <el-form
            ref="form"
            label-position="top"
            :model="form"
            label-width="80px"
          >
            <el-form-item label="已选择">
              大神
            </el-form-item>
            <el-form-item
              label="淘汰原因"
              prop="cause"
            >
              <el-select
                v-model="form.cause"
                style="width: 100%"
                placeholder="placeholder"
              >
                <el-option
                  v-for="item in optionsList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="form.remark"
                type="textarea"
                placeholder="placeholder"
              />
            </el-form-item>
          </el-form>
          <div>
            <el-checkbox v-model="form.check">
              是否添加到人才库
            </el-checkbox>
          </div>
        </div>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="medium"
            @click="dialog = false"
          >
            取 消
          </el-button>
          <el-button
            size="medium"
            type="primary"
            @click="dialog = false"
          >
            确 定
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
let optionsList = []
export default {
  name: 'EliminateDiaLog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    row: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      optionsList,
      dialog: true,
      form: {
        cause: '',
        remark: '',
        check: ''
      }
    }
  },
  watch: {
    dialog: {
      handler: function() {
        this.$emit('update:dialogVisible', this.dialog)
      },
      deep: true
    },
    row: {
      handler(data) {
        data
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
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
  text-align: right;
}

/deep/ .el-form-item {
  margin-bottom: 12px;
}

.info,
.address {
  margin-bottom: 12px;
  font-size: 14px;
  color: #202940;
}

.casvader {
  width: 100%;
}
</style>

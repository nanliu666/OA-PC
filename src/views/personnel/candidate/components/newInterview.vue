<template>
  <div>
    <el-dialog
      title="新建面试信息"
      :visible.sync="dialog"
      width="550px"
      append-to-body
      :before-close="handleClose"
    >
      <div>
        <div>
          <div class="info">
            联系人信息
          </div>
          <el-form
            ref="form"
            :model="form"
            label-width="0px"
          >
            <el-form-item>
              <el-input
                v-model="form.name"
                placeholder="请输入联系人姓名"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="form.phonenum"
                placeholder="请输入联系人手机号码"
              />
            </el-form-item>
          </el-form>
        </div>
        <div v-if="type === '0'">
          <div class="address">
            面试地址
          </div>
          <el-form
            ref="addressForm"
            :model="form"
            label-width="0"
          >
            <el-form-item>
              <el-cascader
                v-model="form.address"
                clearable
                size="large"
                :options="options"
                class="casvader"
                @change="handleChange"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="form.addree2"
                type="textarea"
                placeholder="请输入详细地址，例如街道名称、门牌号码、楼层和房间号等详细地址"
              />
            </el-form-item>
          </el-form>
        </div>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="medium"
            @click="handleClose"
          >
            取 消
          </el-button>
          <el-button
            type="primary"
            size="medium"
            @click="handleClose"
          >
            确 定
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'

export default {
  name: 'NewInterview',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      options: regionData,
      dialog: true,
      form: {}
    }
  },
  watch: {
    dialog: {
      handler: function() {
        this.$emit('update:dialogVisible', this.dialog)
      },
      deep: true
    },
    type: {
      handler(data) {
        data
        // console.log(data)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleChange(data) {
      data
      // console.log(data)
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

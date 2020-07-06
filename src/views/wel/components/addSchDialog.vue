<template>
  <el-dialog
    title="添加提醒事项"
    :visible.sync="isShowDialog"
    width="600px"
    :modal-append-to-body="false"
    @close="resetForm"
  >
    <el-row
      type="flex"
      justify="center"
    >
      <el-col :span="24">
        <el-form
          ref="form"
          label-position="top"
          label-width="80px"
          :model="Params"
          :rules="Rules"
          class="confirm-form-wrap"
        >
          <el-row
            type="flex"
            justify="center"
            class="row-item"
          >
            <el-col :span="24">
              <el-form-item
                label="提醒内容"
                prop="title"
              >
                <el-input
                  v-model.trim="Params.title"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入提醒内容"
                  style="width:100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="center"
            class="row-item"
          >
            <el-col :span="24">
              <el-form-item
                label="提醒日期"
                prop="remindDate"
              >
                <el-date-picker
                  v-model="Params.remindDate"
                  type="date"
                  placeholder="选择日期"
                  style="width:100%"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        @click="isShowDialog = false"
      >取 消</el-button>
      <el-button
        type="primary"
        size="medium"
        :loading="btnLoading"
        @click="handelAddSch"
      >确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { addScheduleinfo } from '@/api/taskcenter/taskcenter'
export default {
  name: 'AddSchDialog',
  props: {
    refresh: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      Params: {},
      Rules: {
        title: [
          { required: true, message: '请输入提醒内容', trigger: 'blur' },
          { max: 20, message: '最多输入20个字符', trigger: 'blur' }
        ],
        remindDate: [{ required: true, message: '请输入提醒日期', trigger: 'blur' }]
      },
      // 控制信息弹框
      isShowDialog: false,
      // LOADING
      btnLoading: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  methods: {
    // 显示模态框
    showDialog() {
      this.isShowDialog = true
    },
    // 确定添加
    handelAddSch() {
      this.$refs.form.validate((result) => {
        if (!result) return
        this.btnLoading = true
        let query = { ...this.Params, userId: this.userId }
        addScheduleinfo(query)
          .then(() => {
            this.refresh && this.refresh()
            this.$message({
              showClose: true,
              type: 'success',
              message: '添加提醒事项成功'
            })
          })
          .finally(() => {
            this.btnLoading = false
            this.isShowDialog = false
          })
      })
    },
    //关闭弹框后重置表单
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog {
  .row-item {
    height: 122px;
  }
}
</style>

<template>
  <el-dialog
    title="调整离职信息"
    :visible.sync="changeLeaveVisible"
    width="600px"
    :modal-append-to-body="false"
  >
    <el-row
      type="flex"
      justify="center"
    >
      <el-col :span="24">
        <el-form
          label-position="top"
          label-width="80px"
          :model="changeParams"
          :rules="changeRules"
          class="confirm-form-wrap"
        >
          <el-row
            type="flex"
            justify="center"
            class="row-item"
          >
            <el-col :span="24">
              <el-form-item
                label="已选择"
                style="width:80%"
              >
                <span class="choose-leave-name">{{ changeParams.name }}</span>
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
                label="离职日期"
                prop="lastDate"
              >
                <el-date-picker
                  v-model="changeParams.lastDate"
                  type="date"
                  placeholder="选择日期"
                  style="width:100%"
                  value-format="yyyy-MM-dd"
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
              <el-form-item label="离职原因">
                <el-select
                  v-model="changeParams.reason"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in leaveReason"
                    :key="item.id"
                    :label="item.dictValue"
                    :value="item.dictKey"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="center"
            class="row-item"
          >
            <el-col :span="24">
              <el-form-item label="离职原因说明">
                <el-input
                  v-model="changeParams.remark"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  style="width:100%"
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
        @click="changeLeaveVisible = false"
      >取 消</el-button>
      <el-button
        type="primary"
        :disabled="isDisabled"
        size="medium"
        :loading="btnLoading"
        @click="handelChangeLeave"
      >保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getLeaveInfo, changeLeaveInfo } from '@/api/leave/leave'
export default {
  name: 'LeaveDialog',
  props: {
    refresh: {
      type: Function,
      default: null
    },
    leaveReason: {
      type: Array,
      default: () => {
        []
      }
    }
  },
  data() {
    return {
      // 控制调整离职信息弹框
      changeLeaveVisible: false,
      // 调整用户离职信息提交参数
      changeParams: {
        id: '',
        lastDate: '',
        reason: '',
        remark: '',
        name: ''
      },
      // 用户信息最开始数据
      oldLeaveInfo: {
        id: '',
        lastDate: '',
        reason: '',
        remark: '',
        name: ''
      },
      // 调整信息确认框校验规则
      changeRules: {
        lastDate: [
          {
            required: true,
            message: '请选择最后工作日',
            trigger: 'change'
          }
        ]
      },
      btnLoading: false
    }
  },
  computed: {
    // 控制保存按钮是否点亮
    isDisabled() {
      return (
        this.changeParams.lastDate === this.oldLeaveInfo.lastDate &&
        this.changeParams.reason === this.oldLeaveInfo.reason &&
        this.changeParams.remark === this.oldLeaveInfo.remark
      )
    }
  },
  methods: {
    // 显示调整离职模态框
    async showChangeDialog(params) {
      let { userId, name } = params
      // 获取员工的离职信息

      let res = await getLeaveInfo({
        userId
      })
      let { id, lastDate, remark, reason } = res

      this.changeParams = {
        id,
        lastDate,
        remark,
        reason,
        name
      }
      this.oldLeaveInfo = {
        ...this.changeParams
      }
      this.changeLeaveVisible = true
    },
    // 调整离职信息
    async handelChangeLeave() {
      this.btnLoading = true
      let { id, lastDate, remark, reason } = this.changeParams
      await changeLeaveInfo({ id, lastDate, remark, reason })
      this.$message.success('保存成功', 2000)
      this.refresh && this.refresh()
      this.btnLoading = false
      this.changeLeaveVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog {
  .row-item {
    .choose-leave-name {
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 14px;
      background: #e3e7e9;
    }

    height: 90px;
  }
}
/deep/.el-dialog__body {
  padding: 10px 24px 24px;
}
</style>

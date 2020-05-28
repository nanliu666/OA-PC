<template>
  <div>
    <page-header
      title="离职申请"
      show-back
    />
    <basic-container>
      <el-row
        type="flex"
        justify="center"
      >
        <el-col
          :xl="16"
          :lg="16"
          :md="18"
          :sm="20"
          :xs="22"
        >
          <el-form
            ref="form"
            :model="queryInfo"
            label-width="80px"
            label-position="top"
            :rules="rules"
            inline
          >
            <!-- 标题 -->
            <el-row
              type="flex"
              justify="center"
            >
              <el-col :span="14">
                <h4 class="title">
                  离职信息
                </h4>
              </el-col>
            </el-row>
            <!-- 最后工作日期 -->
            <el-row
              type="flex"
              justify="center"
            >
              <el-col :span="14">
                <el-form-item
                  label="最后工作日"
                  prop="lastDate"
                  style="width:100%"
                >
                  <el-date-picker
                    v-model="queryInfo.lastDate"
                    type="date"
                    placeholder="选择日期"
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 离职原因 -->
            <el-row
              type="flex"
              justify="center"
            >
              <el-col :span="14">
                <el-form-item
                  label="离职原因"
                  prop="reason"
                  style="width:100%"
                >
                  <el-select
                    v-model="queryInfo.reason"
                    placeholder="请选择离职原因"
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in LeaveReason"
                      :key="item.id"
                      :label="item.dictValue"
                      :value="item.dictKey"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 离职原因说明 -->
            <el-row
              type="flex"
              justify="center"
            >
              <el-col :span="14">
                <el-form-item
                  label="离职原因说明"
                  style="width:100%"
                >
                  <el-input
                    v-model="queryInfo.remark"
                    type="textarea"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 审批下个版本做 -->
            <!-- 按钮区 -->
            <el-row
              type="flex"
              justify="center"
            >
              <el-col
                :span="14"
                class="btn-box"
              >
                <el-button
                  size="medium"
                  @click="handelCancel"
                >
                  取消
                </el-button>
                <el-button
                  type="primary"
                  size="medium"
                  @click="handelSubmit"
                >
                  提交
                </el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import { applyLeaveInfo } from '@/api/leave/leave'
export default {
  data() {
    return {
      // 申请离职params
      queryInfo: {
        // userId: "1263040438093533185",
        userId: this.$route.query.userId,
        lastDate: '',
        reason: '',
        remark: ''
      },
      // rules 校验规则
      rules: {
        lastDate: [
          {
            required: true,
            message: '请选择最后工作日',
            trigger: 'blur'
          }
        ],
        reason: [
          {
            required: true,
            message: '请选择离职原因',
            trigger: 'change'
          }
        ]
      },
      // 离职原因字典组
      LeaveReason: []
    }
  },
  created() {
    this.getCommonDict()
  },
  methods: {
    // 获取离职原因字典组
    getCommonDict() {
      this.$store.dispatch('CommonDict', 'LeaveReason').then((res) => {
        this.LeaveReason = res
      })
    },
    // 取消申请
    handelCancel() {
      this.$router.go(-1)
    },
    // 提交申请
    handelSubmit() {
      this.$refs.form.validate((res) => {
        // 校验不通过
        if (!res) {
          return this.$message.error('请填写必选项')
        }
        // 检验通过
        applyLeaveInfo(this.queryInfo)
          .then(() => {
            this.$message.success('提交成功', 2000, () => {
              this.$router.go(-1)
            })
          })
          .catch(() => {})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #202940;
  line-height: 14px;
}

.btn-box {
  display: flex;
  justify-content: center;
}
</style>

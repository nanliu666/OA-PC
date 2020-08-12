<template>
  <div>
    <page-header
      title="离职申请"
      show-back
      :back="goBack"
    />
    <basic-container>
      <el-row
        type="flex"
        justify="center"
        class="container"
      >
        <el-col
          :xl="12"
          :lg="12"
          :md="14"
          :sm="20"
          :xs="22"
        >
          <el-form
            ref="form"
            :model="queryInfo"
            label-width="80px"
            label-position="top"
            :rules="rules"
            class="form-wrap"
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
                <el-form-item label="离职原因说明">
                  <el-input
                    v-model="queryInfo.remark"
                    :rows="3"
                    type="textarea"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 审批 -->
            <el-row
              type="flex"
              justify="center"
            >
              <el-col :span="14">
                <el-form-item
                  label="审批流程"
                  prop="apprProgress"
                >
                  <appr-progress
                    ref="apprProgress"
                    form-key="UserLeaveInfo"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 按钮区 -->
            <el-row
              type="flex"
              justify="center"
            >
              <el-col
                :span="14"
                class="btn-box"
              >
                <el-form-item>
                  <el-button
                    type="primary"
                    size="medium"
                    :loading="btnLoading"
                    @click="handelSubmit"
                  >
                    提交
                  </el-button>
                  <el-button
                    size="medium"
                    @click="handelCancel"
                  >
                    取消
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
// checkApplyNum
import { applyLeaveInfo } from '@/api/leave/leave'
import { mapGetters } from 'vuex'
export default {
  components: {
    apprProgress: () => import('@/components/appr-progress/apprProgress')
  },
  data() {
    var checkAppr = (rule, value, callback) => {
      if (!this.$refs['apprProgress'].validate()) {
        callback(new Error('请选择审批人'))
      } else {
        callback()
      }
    }
    return {
      // 申请离职params
      queryInfo: {
        // userId: "1263040438093533185",
        userId: '',
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
        ],
        apprProgress: [{ validator: checkAppr, required: true, trigger: 'change' }]
      },
      // 离职原因字典组
      LeaveReason: [],
      btnLoading: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
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
        this.queryInfo.userId = this.userId
        this.btnLoading = true
        applyLeaveInfo(this.queryInfo)
          .then((res) => {
            if (res && res.id) {
              this.$refs['apprProgress'].submit(res.id).then(() => {
                this.$message.success('提交成功', 2000, this.$router.go(-1))
              })
            }
            // this.$message.success('提交成功', 2000, this.$router.go(-1))
          })
          .catch(() => {})
          .finally(() => {
            this.btnLoading = false
          })
      })
    },
    // goBack
    goBack() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrap {
  /deep/.el-form-item__label {
    padding: 0;
  }

  /deep/ .el-form-item {
    margin: 0 0 10px 0;
  }
}

.container {
  /deep/.el-col {
    margin-bottom: 0;
  }
}

.title {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #202940;
  line-height: 14px;
  margin: 40px 0 10px 0;
}

.btn-box {
  display: flex;
  justify-content: center;
}
</style>

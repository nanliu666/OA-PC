<template>
  <div class="fill">
    <page-header
      title="离职申请"
      show-back
      :back="goBack"
    />
    <basic-container block>
      <el-row
        type="flex"
        justify="center"
        class="container"
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
            label-position="top"
            :rules="rules"
            class="form-wrap"
          >
            <!-- 标题 -->

            <h4 class="title">
              离职信息
            </h4>

            <!-- 最后工作日期 -->

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

            <!-- 离职原因 -->

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

            <!-- 离职原因说明 -->

            <el-form-item label="离职原因说明">
              <el-input
                v-model="queryInfo.remark"
                :rows="3"
                type="textarea"
              />
            </el-form-item>

            <appr-picker
              ref="apprPicker"
              :process-data="processData"
            />
            <!-- 按钮区 -->

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
import { Base64 } from 'js-base64'
import { getProcessDetail, getProcessIDByFormKey } from '@/api/apprProcess/apprProcess'
import apprPicker from '@/components/appr-picker/apprPicker'
import { FormKeysCN } from '@/const/approve'

const formFields = [
  {
    label: '最后工作日',
    prop: 'lastDate',
    span: 12
  },
  {
    label: '离职原因',
    prop: 'reason',
    span: 12
  },
  {
    label: '离职原因说明',
    prop: 'remark',
    span: 12
  }
]
export default {
  components: {
    apprPicker
  },
  data() {
    return {
      // 申请离职params
      queryInfo: {
        // userId: "1263040438093533185",
        userId: '',
        lastDate: '',
        reason: '',
        remark: ''
      },
      formKey: 'UserLeaveInfo',
      processData: null,
      processId: null,
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
      LeaveReason: [],
      btnLoading: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.getCommonDict()
    this.getProcessDetail()
  },

  methods: {
    // 通过formKey获取processId
    getProcessId() {
      return getProcessIDByFormKey({ formKey: this.formKey })
    },
    getProcessDetail() {
      this.getProcessId().then((res) => {
        this.processId = res.processId
        getProcessDetail({ processId: res.processId }).then((res) => {
          this.json = res.baseJson
          const obj = JSON.parse(Base64.decode(res.baseJson))
          if (typeof obj === 'object') {
            this.processData = obj.processData
          }
        })
      })
    },
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
              this.$refs['apprPicker']
                .submit({
                  formId: res.id,
                  formData: formFields,
                  formKey: this.formKey,
                  processName: FormKeysCN[this.formKey],
                  processId: this.processId
                })
                .then(() => {
                  this.$message.success('提交成功', 2000, this.$router.go(-1))
                })
            }
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
.title {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #202940;
  line-height: 14px;
  margin: 40px 0 10px 0;
}
</style>

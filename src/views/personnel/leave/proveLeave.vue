<template>
  <div>
    <page-header
      title="开具离职证明"
      show-back
      :back="goBack"
    />
    <basic-container v-loading="loading">
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
          <!-- 表单区 -->
          <el-form
            ref="proveFormRef"
            :model="proveData"
            :rules="proveRules"
            label-width="100px"
            label-position="top"
          >
            <el-row>
              <el-col :span="10">
                <el-form-item label="姓名">
                  <el-input
                    v-model="proveData.name"
                    disabled
                    style="width : 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="证件号码">
                  <el-input
                    v-model="proveData.idNo"
                    disabled
                    style="width : 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="入职公司">
                  <el-input
                    v-model="proveData.companyName"
                    disabled
                    style="width : 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="部门">
                  <el-input
                    v-model="proveData.orgName"
                    disabled
                    style="width : 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="职位">
                  <el-input
                    v-model="proveData.jobName"
                    disabled
                    style="width : 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="入职日期">
                  <el-date-picker
                    v-model="proveData.entryDate"
                    disabled
                    style="width : 100%"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="离职日期">
                  <el-date-picker
                    v-model="proveData.leaveDate"
                    disabled
                    style="width : 100%"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="解除合同日期">
                  <el-date-picker
                    v-model="proveData.relieveDate"
                    disabled
                    style="width : 100%"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="开具证明日期"
                  prop="nowDate"
                >
                  <el-date-picker
                    v-model="proveData.nowDate"
                    type="date"
                    style="width : 100%"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="24"
                class="btn-wrap"
              >
                <div class="btn-box">
                  <el-button
                    size="medium"
                    @click="handelCancel"
                  >
                    取消
                  </el-button>
                  <el-button
                    size="medium"
                    type="primary"
                    @click="goToPrint"
                  >
                    预览
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import { getLeaveCert } from '@/api/leave/leave'
export default {
  data() {
    return {
      userId: this.$route.query.userId,
      // 表单数据
      proveData: {
        name: '',
        idNo: '',
        companyName: '',
        orgName: '',
        jobName: '',
        entryDate: '',
        leaveDate: '',
        relieveDate: '',
        nowDate: ''
      },
      // 校验规则
      proveRules: {
        nowDate: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ]
      },
      loading: false
    }
  },
  created() {
    this.getproveData()
  },
  methods: {
    async getproveData() {
      this.loading = true
      let res = await getLeaveCert({
        userId: this.userId
      })
      this.proveData = {
        ...res,
        nowDate: new Date()
      }
      this.loading = false
    },
    // 点击取消
    handelCancel() {
      this.$router.go(-1)
    },
    // 点击打印预览

    //goBack
    goBack() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
    },
    // 去预览
    goToPrint() {
      this.$router.push({
        path: '/personnel/leave/printProve',
        query: {
          userId: this.userId,
          printDate: this.proveData.nowDate.getTime()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-wrap {
  display: flex;
  justify-content: center;
}
</style>

<template>
  <div>
    <page-header
      title="人事异动申请"
      :show-back="true"
      :back="goBack"
    />
    <basic-container v-loading="loading">
      <el-row
        type="flex"
        justify="center"
        style="padding-top:40px}"
      >
        <el-col
          :xl="16"
          :lg="16"
          :md="18"
          :sm="20"
          :xs="22"
        >
          <div class="header-wrap">
            <el-row>
              <el-col
                :span="24"
                class="el-col-flex"
              >
                <div class="name-box">
                  <span>{{ applyParams.name }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row
              type="flex"
              justify="center"
            >
              <el-col :span="8">
                <el-row
                  type="flex"
                  justify="center"
                >
                  <el-col class="el-col-flex">
                    <div>
                      <span>工号：</span>
                      <span>{{ applyParams.workNo }}</span>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row
                  type="flex"
                  justify="center"
                >
                  <el-col class="el-col-flex">
                    <div>
                      <span>部门:</span>
                      <span>{{ applyParams.orgName }}</span>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row
                  type="flex"
                  justify="center"
                >
                  <el-col class="el-col-flex">
                    <div>
                      <span>职位:</span>
                      <span>{{ applyParams.jobName }}</span>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <el-form
            ref="applyForm"
            :model="applyParams"
            label-width="80px"
            :rules="applyRules"
            label-position="top"
          >
            <!-- 标题 -->
            <el-row>
              <el-col :span="10">
                <h4>异动信息</h4>
              </el-col>
            </el-row>
            <!-- 异动类型 -->
            <el-row>
              <!-- 异动类型 -->
              <el-col :span="10">
                <el-form-item
                  label="异动类型"
                  prop="type"
                >
                  <el-radio-group v-model="applyParams.type">
                    <el-radio
                      label="Position"
                      name="type"
                    >
                      调岗
                    </el-radio>
                    <el-radio
                      label="Up"
                      name="type"
                    >
                      晋升
                    </el-radio>
                    <el-radio
                      label="Down"
                      name="type"
                    >
                      降级
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 异动原因 -->
            <el-row>
              <el-col :span="10">
                <el-form-item
                  label="异动原因"
                  prop="reason"
                >
                  <el-select
                    v-model="applyParams.reason"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in changeReason"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 公司变更 -->
            <el-row>
              <el-col :span="10">
                <el-form-item label="原公司">
                  <el-select
                    v-model="applyParams.companyId"
                    disabled
                    style="width:100%"
                  >
                    <el-option
                      :label="applyParams.companyName"
                      :value="applyParams.companyId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item
                  label="变更为"
                  prop="newCompanyId"
                >
                  <el-select
                    v-model="applyParams.newCompanyId"
                    placeholder="请选择"
                    style="width:100%"
                    @change="companyNameChange"
                  >
                    <el-option
                      v-for="(item, index) in newCompanyList"
                      :key="index"
                      :label="item.orgName"
                      :value="item.orgId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 部门变更 -->
            <el-row>
              <el-col :span="10">
                <el-form-item label="原部门">
                  <el-select
                    v-model="applyParams.orgId"
                    disabled
                    style="width:100%"
                  >
                    <el-option
                      :label="applyParams.orgName"
                      :value="applyParams.orgId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item
                  label="变更为"
                  style="width:100%"
                  prop="newOrgId"
                >
                  <el-select
                    v-model="applyParams.newOrgId"
                    placeholder="请选择"
                    style="width:100%"
                    @change="orgNameChange"
                  >
                    <el-option
                      v-for="(item, index) in newOrgList"
                      :key="index"
                      :label="item.orgName"
                      :value="item.orgId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 职位变更 -->
            <el-row>
              <el-col :span="10">
                <el-form-item label="原职位">
                  <el-select
                    v-model="applyParams.jobId"
                    disabled
                    style="width:100%"
                  >
                    <el-option
                      :label="applyParams.jobName"
                      :value="applyParams.jobId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item
                  label="变更为"
                  prop="newJobId"
                >
                  <el-select
                    v-model="applyParams.newJobId"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item, index) in newJobList"
                      :key="index"
                      :label="item.jobName"
                      :value="item.jobId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 岗位变更 -->
            <el-row>
              <el-col :span="10">
                <el-form-item label="原岗位">
                  <el-select
                    v-model="applyParams.positionId"
                    disabled
                    style="width:100%"
                  >
                    <el-option
                      :label="applyParams.positionName"
                      :value="applyParams.positionId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="变更为">
                  <el-select
                    v-model="applyParams.newPositionId"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item, index) in newPositionList"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 生效日期 -->
            <el-row class="btn-box">
              <el-col :span="10">
                <el-form-item
                  label="生效日期"
                  prop="effectDate"
                >
                  <el-date-picker
                    v-model="applyParams.effectDate"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期"
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 备注 -->
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input
                    v-model="applyParams.remark"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 审批-->
            <el-row>
              <el-col :span="24">
                <appr-picker
                  ref="apprPicker"
                  :process-data="processData"
                />
              </el-col>
            </el-row>
            <!-- 按钮 -->
            <el-row class="btn-box">
              <el-col :span="10">
                <el-button
                  size="medium"
                  @click="goBack"
                >
                  取消
                </el-button>
                <el-button
                  type="primary"
                  size="medium"
                  :loading="btnLoading"
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
import { changeApply } from '@/api/personnel/transction.js'
import { getOrganizationCompany } from '@/api/personnel/roster'
import { getJobInfo, getPositionInfo, getStaffBasicInfo } from '@/api/personalInfo.js'
import { getOrganizationTree } from '@/api/organize/grade.js'
import { Base64 } from 'js-base64'
import { getProcessDetail, getProcessIDByFormKey } from '@/api/apprProcess/apprProcess'
import apprPicker from '@/components/appr-picker/apprPicker'
import { FormKeysCN } from '@/const/approve'
import { flatTree } from '@/util/util'
// import getAppProcess from "@/api/approval/approval"
const formFields = [
  { label: '用户名称', prop: 'name', span: 12 },
  { label: '异动类型', prop: 'type', span: 12 },
  { label: '异动原因', prop: 'reason', span: 12 },
  { label: '生效日期', prop: 'effectDate', span: 12 },
  { label: '原公司名称', prop: 'companyName', span: 12 },
  { label: '新公司名称', prop: 'newCompanyName', span: 12 },
  { label: '原部门名称', prop: 'orgName', span: 12 },
  { label: '新部门名称', prop: 'newOrgName', span: 12 },
  { label: '原职位名称', prop: 'jobName', span: 12 },
  { label: '新职位名称', prop: 'newJobName', span: 12 },
  { label: '原岗位名称', prop: 'positionName', span: 12 },
  { label: '新岗位名称', prop: 'newPositionName', span: 12 },
  { label: '备注', prop: 'remark', span: 12 }
]
export default {
  name: 'ChangeApply',
  components: {
    apprPicker
  },
  data() {
    return {
      formKey: 'UserChangeInfo',
      processData: null,
      processId: null,
      // 请求数据params and 员工信息
      applyParams: {
        userId: '',
        type: 'Position',
        reason: '',
        companyName: '',
        orgName: '',
        jobName: '',
        positionName: '',
        companyId: '',
        orgId: '',
        jobId: '',
        positionId: '',
        effectDate: '',
        remark: '',
        // 新公司信息
        newCompanyId: '',
        newOrgId: '',
        newJobId: '',
        newPositionId: '',
        newCompanyName: '',
        newOrgName: '',
        newJobName: '',
        newPositionName: ''
      },
      loading: false,
      // 校验规则
      applyRules: {
        type: [{ required: true, message: '请选择异动类型', trigger: 'blur' }],
        reason: [{ required: true, message: '请选择异动原因', trigger: 'change' }],
        effectDate: [{ required: true, message: '请选择生效日期', trigger: 'blur' }],
        newCompanyId: [
          {
            required: true,
            message: '请选择公司',
            trigger: 'change'
          }
        ],
        newOrgId: [
          {
            required: true,
            message: '请选择部门',
            trigger: 'change'
          }
        ],
        newJobId: [
          {
            required: true,
            message: '请选择职位',
            trigger: 'change'
          }
        ]
      },
      // 字典组异动原因
      changeReason: [],
      // 变更公司
      newCompanyList: [],
      // 变更部门
      newOrgList: [],
      // 变革职位
      newJobList: [],
      // 变更岗位
      newPositionList: [],
      btnLoading: false
    }
  },
  watch: {
    // 根据异动类型自动带出异动原因
    'applyParams.type': {
      deep: true,
      handler: function(newV) {
        this.applyParams.reason = ''
        if (newV === 'Position') {
          this.getReasonList(0)
        } else if (newV === 'Up') {
          this.getReasonList(1)
        } else if (newV === 'Down') {
          this.getReasonList(2)
        }
      }
    }
    // 'applyParams.newCompanyId': {
    //   deep: true,
    //   handler: function(newV, oldV) {
    //     if (!oldV) {
    //       return
    //     }
    //     this.getOrgName(newV)
    //   }
    // },
    // 'applyParams.newOrgId': {
    //   deep: true,
    //   handler: function(newV) {
    //     this.getJob(newV)
    //   }
    // }
  },
  async mounted() {
    this.loading = true
    await this.getReasonList()
    await this.getPersonalInfo()
    await this.getCompany()
    await this.getOrgName(this.applyParams.companyId)
    await this.getJob(this.applyParams.orgId)
    await this.getPosition()
    this.loading = false
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
    // 获取员工信息
    async getPersonalInfo() {
      let params = {
        userId: this.$route.query.userId
      }
      let {
        companyName,
        orgName,
        jobName,
        positionName,
        companyId,
        orgId,
        jobId,
        positionId,
        userId,
        workNo,
        name,
        companyId: newCompanyId,
        orgId: newOrgId,
        jobId: newJobId,
        positionId: newPositionId,
        companyName: newCompanyName,
        orgName: newOrgName,
        jobName: newJobName,
        positionName: newPositionName
      } = await getStaffBasicInfo(params)
      this.applyParams = {
        ...this.applyParams,
        companyName,
        orgName,
        jobName,
        positionName,
        companyId,
        orgId,
        jobId,
        positionId,
        userId,
        workNo,
        name,
        newCompanyId,
        newOrgId,
        newJobId,
        newPositionId,
        newCompanyName,
        newOrgName,
        newJobName,
        newPositionName
      }
    },
    // 获取公司选择数组
    getCompany() {
      getOrganizationCompany({ parentOrgId: '0' }).then((res) => {
        this.newCompanyList = res
      })
    },

    // 获取部门选择数组
    async getOrgName(params) {
      let res = await getOrganizationTree({ parentOrgId: params })
      this.newOrgList = flatTree(res)
      this.$refs.applyForm.clearValidate('newOrgId')
      this.$refs.applyForm.clearValidate('newJobId')
    },
    // 获取职位选择数组
    async getJob(params) {
      if (!params) {
        return
      }
      this.newJobList = await getJobInfo({ orgId: params })
      this.$refs.applyForm.clearValidate('newJobId')
    },
    // 获取岗位选择数组
    getPosition() {
      getPositionInfo()
        .then((res) => {
          this.newPositionList = res
        })
        .catch()
    },
    // 清空选项
    companyNameChange(e) {
      this.applyParams.newOrgId = ''
      this.applyParams.newJobId = ''
      this.newJobList = []
      this.getOrgName(e)
    },
    // 清空选项
    orgNameChange(e) {
      this.getJob(e)
      this.applyParams.newJobId = ''
    },
    // 获取异动原因
    getReasonList(index) {
      this.$store.dispatch('CommonDict', 'ChangeReason').then((res) => {
        this.handelReason(res, index)
        this.$refs.applyForm.clearValidate('reason')
      })
    },
    // // 处理异动原因select框数据
    handelReason(data, index = 0) {
      let targetArr = [
        { label: '调岗', type: 'Position', options: [] },
        { label: '晋升', type: 'Up', options: [] },
        { label: '降级', type: 'Down', options: [] }
      ]
      data.forEach((item) => {
        if (item.dictKey.indexOf('Adjust') != '-1') {
          targetArr[0].options.push({
            value: item.dictValue,
            label: item.dictValue
          })
        } else if (item.dictKey.indexOf('Promotion') != '-1') {
          targetArr[1].options.push({
            value: item.dictValue,
            label: item.dictValue
          })
        } else if (item.dictKey.indexOf('Downgrade') != '-1') {
          targetArr[2].options.push({
            value: item.dictValue,
            label: item.dictValue
          })
        }
      })
      this.changeReason = targetArr[index].options
    },
    // 点击提交
    handelSubmit() {
      Promise.all([this.$refs['applyForm'].validate(), this.$refs['apprPicker'].validate()]).then(
        () => {
          let {
            companyId,
            orgId,
            jobId,
            positionId,
            //   companyName,
            //   orgName,
            //   jobName,
            //   positionName,
            // 新公司信息
            newCompanyId,
            newOrgId,
            newJobId,
            newPositionId
            //   newCompanyName,
            //   newOrgName,
            //   newJobName,
            //   newPositionName
          } = this.applyParams
          // 公司/部门/职位/岗位”至少有存在一个变更
          if (
            companyId !== newCompanyId ||
            orgId !== newOrgId ||
            jobId !== newJobId ||
            positionId !== newPositionId
          ) {
            this.btnLoading = true
            this.newCompanyList.forEach((item) => {
              if (item.orgId == newCompanyId) {
                this.applyParams.newCompanyName = item.orgName
              }
            })
            flatTree(this.newOrgList).forEach((item) => {
              if (item.orgId == newOrgId) {
                this.applyParams.newOrgName = item.orgName
              }
            })
            this.newJobList.forEach((item) => {
              if (item.jobId == newJobId) {
                this.applyParams.newJobName = item.jobName
              }
            })
            this.newPositionList.forEach((item) => {
              if (item.id == newPositionId) {
                this.applyParams.newPositionName = item.name
              }
            })

            changeApply(this.applyParams)
              .then((res) => {
                if (res && res.id) {
                  formFields.forEach((item) => {
                    if (item.prop === 'type') {
                      item.content = {
                        Position: '调岗',
                        Up: '晋升',
                        Down: '降级'
                      }[this.applyParams.type]
                    }
                    item.value = this.applyParams[item.prop]
                  })
                  this.$refs['apprPicker']
                    .submit({
                      formId: res.id,
                      formKey: this.formKey,
                      formData: formFields,
                      processName: FormKeysCN[this.formKey],
                      processId: this.processId
                    })
                    .then(() => {
                      this.$message.success('提交成功', 3000)
                      this.goBack()
                    })
                    .finally(() => {
                      this.btnLoading = false
                    })
                }
              })
              .catch()
          } else {
            return this.$message.info('请输入人事异动的变更内容', 3000)
          }
        }
      )
    },
    // 根据新部门ID找新部门

    // goback
    goBack() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrap {
  margin-top: 20px;
  .name-box {
    margin: 36px 0 20px 0;
    span {
      font-family: PingFangSC-Medium;
      font-size: 24px;
      color: #333333;
      line-height: 30px;
      font-size: 30px;
    }
  }
}
.el-col-flex {
  display: flex;
  justify-content: center;

  span {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #323436;
    padding: 0 5px;
  }
}
</style>

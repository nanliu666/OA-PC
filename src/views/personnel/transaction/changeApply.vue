<template>
  <div>
    <page-header
      title="人事异动申请"
      :show-back="true"
      :back="goBack"
    />
    <basic-container>
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
                    v-model="applyParams.companyName"
                    disabled
                    style="width:100%"
                  >
                    <el-option
                      :label="applyParams.companyName"
                      :value="applyParams.companyName"
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
                    v-model="applyParams.newCompanyName"
                    placeholder="请选择"
                    style="width:100%"
                    @change="companyNameChange"
                  >
                    <el-option
                      v-for="item in newCompanyList"
                      :key="item.orgId"
                      :label="item.orgName"
                      :value="item.orgName"
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
                    v-model="applyParams.orgName"
                    disabled
                    style="width:100%"
                  >
                    <el-option
                      :label="applyParams.orgName"
                      :value="applyParams.orgName"
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
                >
                  <el-tree-select
                    ref="orgTree"
                    v-model="applyParams.newOrgName"
                    :styles="subOrgOptions.styles"
                    :select-params="subOrgOptions.config.selectParams"
                    :tree-params="subOrgOptions.config.treeParams"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 职位变更 -->
            <el-row>
              <el-col :span="10">
                <el-form-item label="原职位">
                  <el-select
                    v-model="applyParams.jobName"
                    disabled
                    style="width:100%"
                  >
                    <el-option
                      :label="applyParams.jobName"
                      :value="applyParams.jobName"
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
                    v-model="applyParams.newJobName"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in newJobList"
                      :key="item.jobId"
                      :label="item.jobName"
                      :value="item.jobName"
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
                    v-model="applyParams.positionName"
                    disabled
                    style="width:100%"
                  >
                    <el-option
                      :label="applyParams.positionName"
                      :value="applyParams.positionName"
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
                    v-model="applyParams.newPositionName"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in newPositionList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
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
                <el-form-item
                  label="审批流程"
                  prop="apprProgress"
                  style="width:100%"
                >
                  <appr-progress
                    ref="apprProgress"
                    form-key="UserChangeInfo"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 按钮 -->
            <el-row class="btn-box">
              <el-col :span="10">
                <el-button
                  size="medium"
                  @click="handelCancel"
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
import ElTreeSelect from '@/components/elTreeSelect/elTreeSelect'
import apprProgress from '@/components/appr-progress/apprProgress'
// import getAppProcess from "@/api/approval/approval"
export default {
  name: 'ChangeApply',
  components: {
    ElTreeSelect,
    apprProgress
  },
  data() {
    // 审批校验
    var checkAppr = (rule, value, callback) => {
      if (!this.$refs['apprProgress'].validate()) {
        callback(new Error('请选择审批人'))
      } else {
        callback()
      }
    }
    return {
      // 请求数据params and 员工信息
      applyParams: {
        userId: '',
        type: 'Position',
        reason: '',
        companyName: '',
        orgName: '',
        jobName: '',
        positionName: '',
        effectDate: '',
        remark: '',
        // 新公司信息
        newCompanyName: '',
        newOrgName: '',
        newJobName: '',
        newPositionName: ''
      },

      // 校验规则
      applyRules: {
        type: [{ required: true, message: '请选择异动类型', trigger: 'blur' }],
        reason: [{ required: true, message: '请选择异动原因', trigger: 'change' }],
        effectDate: [{ required: true, message: '请选择生效日期', trigger: 'blur' }],
        apprProgress: [{ validator: checkAppr, required: true }]
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
      // 树状选择框的配置
      subOrgOptions: {
        props: {
          label: 'orgName',
          value: 'orgId'
        },
        styles: {
          width: '100%'
        },
        placeholder: '请选择部门',
        dicData: [],
        config: {
          selectParams: {
            placeholder: '请输入内容',
            multiple: false
          },
          treeParams: {
            data: [],
            'check-strictly': true,
            'default-expand-all': true,
            'expand-on-click-node': true,
            clickParent: false,
            filterable: false,
            props: {
              children: 'children',
              label: 'orgName',
              disabled: 'disabled',
              value: 'orgName'
            }
          }
        }
      },
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
  },
  mounted() {
    this.getReasonList()
    this.getPersonalInfo()
    this.getCompany()
    this.getOrgName()
    this.getJob()
    this.getPosition()
  },

  methods: {
    // 获取员工信息
    getPersonalInfo() {
      let params = {
        userId: this.$route.query.userId
      }
      getStaffBasicInfo(params)
        .then((res) => {
          let {
            companyName,
            orgName,
            jobName,
            positionName,
            userId,
            workNo,
            name,
            companyName: newCompanyName,
            orgName: newOrgName,
            jobName: newJobName,
            positionName: newPositionName
          } = res
          this.applyParams = {
            ...this.applyParams,
            companyName,
            orgName,
            jobName,
            positionName,
            userId,
            workNo,
            name,
            newCompanyName,
            newOrgName,
            newJobName,
            newPositionName
          }
        })
        .catch()
    },
    // 获取公司选择数组
    getCompany() {
      getOrganizationCompany({ parentOrgId: '0' }).then((res) => {
        this.newCompanyList = res
      })
    },

    // 获取部门选择数组
    getOrgName() {
      getOrganizationTree({ parentOrgId: '0' })
        .then((res) => {
          // this.subOrgOptions.config.treeParams.data.push(res)
          this.$refs['orgTree'].treeDataUpdateFun(res)
          this.newOrgList = res
        })
        .catch()
    },
    // 获取职位选择数组
    getJob() {
      getJobInfo({})
        .then((res) => {
          this.newJobList = res
        })
        .catch()
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
    companyNameChange() {
      this.applyParams.newOrgName = ''
      this.applyParams.newJobName = ''
    },
    // 清空选项

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
    // 点击取消
    handelCancel() {
      this.$router.go(-1)
    },
    // 点击提交
    handelSubmit() {
      this.$refs.applyForm.validate((valid) => {
        if (!valid) {
          return
        }
        let {
          companyName,
          orgName,
          jobName,
          positionName,
          // 新公司信息
          newCompanyName,
          newOrgName,
          newJobName,
          newPositionName
        } = this.applyParams
        // 公司/部门/职位/岗位”至少有存在一个变更
        if (
          companyName !== newCompanyName ||
          orgName !== newOrgName ||
          jobName !== newJobName ||
          positionName !== newPositionName
        ) {
          this.btnLoading = true
          changeApply(this.applyParams)
            .then((res) => {
              if (res && res.id) {
                this.$refs['apprProgress'].submit(res.id).then(() => {
                  this.$message.success('提交成功', 3000)
                  this.$router.go(-1)
                })
              }
            })
            .catch()
            .finally(() => {
              this.btnLoading = false
            })
        } else {
          return this.$message.info('请输入人事异动的变更内容', 3000)
        }
      })
    },
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

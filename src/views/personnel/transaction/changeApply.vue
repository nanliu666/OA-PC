<template>
  <el-card>
    <div slot="header">
      <div class="header-wrap">
        <el-breadcrumb separator="|">
          <el-breadcrumb-item>返回</el-breadcrumb-item>
          <el-breadcrumb-item>人事异动申请</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="name-box">
          <span>{{ applyParams.name }}</span>
        </div>
        <div class="info-row">
          <div class="workNo-box">
            <span>工号：</span>
            <span>{{ applyParams.workNo }}</span>
          </div>
          <div class="orgName-box">
            <span>部门:</span>
            <span>{{ applyParams.orgName }}</span>
          </div>
          <div class="jobName-box">
            <span>职位:</span>
            <span>{{ applyParams.jobName }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 标题 -->
    <el-row>
      <el-col :span="24">
        <h4>异动信息</h4>
      </el-col>
    </el-row>
    <!-- 异动类型 -->
    <el-form
      ref="applyForm"
      :model="applyParams"
      label-width="80px"
      :rules="applyRules"
      label-position="top"
    >
      <el-row>
        <!-- 异动类型 -->
        <el-col :span="24">
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
        <el-col :span="24">
          <el-form-item
            label="异动原因"
            prop="reason"
          >
            <el-select
              v-model="applyParams.reason"
              placeholder="请选择"
            >
              <!-- <el-option-group v-for="group in changeReason" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-option-group>-->

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
        <el-col :span="12">
          <el-form-item label="原公司">
            <el-select
              v-model="applyParams.companyName"
              disabled
              style="width:50%"
            >
              <el-option
                :label="applyParams.companyName"
                :value="applyParams.companyName"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="变更为">
            <el-select
              v-model="applyParams.newCompanyName"
              placeholder="请选择"
              style="width:50%"
            >
              <el-option
                label="百利宏控股有限公司1"
                value="百利宏控股有限公司1"
              />
              <el-option
                label="百利宏控股有限公司2"
                value="百利宏控股有限公司2"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 部门变更 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="原部门">
            <el-select
              v-model="applyParams.orgName"
              disabled
              style="width:50%"
            >
              <el-option
                :label="applyParams.orgName"
                :value="applyParams.orgName"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="变更为">
            <el-select
              v-model="applyParams.newOrgName"
              placeholder="请选择"
              style="width:50%"
            >
              <el-option
                label="新研发小组1"
                value="新研发小组1"
              />
              <el-option
                label="新研发小组2"
                value="新研发小组2"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 职位变更 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="原职位">
            <el-select
              v-model="applyParams.jobName"
              disabled
              style="width:50%"
            >
              <el-option
                :label="applyParams.jobName"
                :value="applyParams.jobName"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="变更为">
            <el-select
              v-model="applyParams.newJobName"
              placeholder="请选择"
              style="width:50%"
            >
              <el-option
                label="新研发总监1"
                value="新研发总监1"
              />
              <el-option
                label="新研发总监2"
                value="新研发总监2"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 岗位变更 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="原岗位">
            <el-select
              v-model="applyParams.positionName"
              disabled
              style="width:50%"
            >
              <el-option
                :label="applyParams.positionName"
                :value="applyParams.positionName"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="变更为">
            <el-select
              v-model="applyParams.newPositionName"
              placeholder="请选择"
              style="width:50%"
            >
              <el-option
                label="新研发总监1"
                value="新研发总监1"
              />
              <el-option
                label="新研发总监2"
                value="新研发总监2"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 生效日期 -->
      <el-row class="btn-box">
        <el-col :span="12">
          <el-form-item
            label="生效日期"
            prop="effectDate"
          >
            <el-date-picker
              v-model="applyParams.effectDate"
              type="date"
              placeholder="选择日期"
              style="width:50%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 备注 -->
      <el-row>
        <el-col :span="18">
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
    </el-form>
    <!-- 按钮 -->
    <el-row class="btn-box">
      <el-col :span="12">
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
  </el-card>
</template>

<script>
import { changeApply } from '@/api/personnel/transction.js'
import { getStaffBasicInfo } from '@/api/personalInfo.js'
import { getOrganizationCompany } from '@/api/personnel/roster'
export default {
  name: 'ChangeApply',
  data() {
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
        newCompanyName: '',
        newOrgName: '',
        newJobName: '',
        newPositionName: '',
        effectDate: '',
        remark: ''
      },
      // 校验规则
      applyRules: {
        type: [{ required: true, message: '请选择异动类型', trigger: 'blur' }],
        reason: [{ required: true, message: '请输入异动原因', trigger: 'change' }],
        effectDate: [{ required: true, message: '请生效日期', trigger: 'blur' }]
      },
      // 字典组异动原因
      changeReason: [],
      // 变更公司
      companyList: []
    }
  },
  watch: {
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
  created() {
    this.getPersonalInfo()
    this.getReasonList()
    this.getCompany()
  },
  methods: {
    // 获取员工信息
    getPersonalInfo() {
      let params = {
        userId: this.$route.params.userId
      }
      getStaffBasicInfo(params)
        .then((res) => {
          let { companyName, orgName, jobName, positionName, userId, workNo, name } = res
          this.applyParams = {
            ...this.applyParams,
            companyName,
            orgName,
            jobName,
            positionName,
            userId,
            workNo,
            name
          }
        })
        .catch()
    },
    // 获取公司
    getCompany() {
      getOrganizationCompany({ parentOrgId: '0' }).then((res) => {
        this.companyList = res
      })
    },
    //
    handelSubmit() {
      this.$refs.applyForm.validate((valid) => {
        if (!valid) {
          return
        }
        changeApply(this.applyParam)
          .then(() => {})
          .catch()
      })
    },
    // 获取异动原因
    getReasonList(index) {
      this.$store.dispatch('CommonDict', 'ChangeReason').then((res) => {
        this.handelReason(res, index)
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
      // this.$router.go(-1)
      // let res = this.selectReason(this.changeReason)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrap {
  margin-top: 20px;
  .name-box {
    display: flex;
    justify-content: center;
    margin-top: 36px;
    span {
      font-size: 30px;
    }
  }
  .info-row {
    display: flex;
    justify-content: center;
    margin: 26px 0;
    div {
      margin: 0 30px;
    }
  }
}
.el-card {
  height: 100%;
  overflow: auto;
  padding-top: 50px;
}

.btn-box {
  margin-bottom: 50px;
}
</style>

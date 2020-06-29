<template>
  <div style="height: 100%">
    <pageHeader
      title="录用申请"
      :back="back"
      :show-back="showBack"
    />
    <basicContainer class="apply">
      <div class="step">
        <el-steps :active="active">
          <el-step title="基本信息" />
          <el-step title="薪资福利信息" />
          <el-step title="审批流程" />
          <el-step title="完成" />
        </el-steps>
      </div>
      <div
        v-show="active === 0"
        class="contain"
      >
        <div class="content">
          <div class="title">
            候选人信息
          </div>
          <commonForm
            ref="personInfo"
            :model="infoForm"
            :columns="personInfo"
          />
        </div>
        <div class="content">
          <div class="title">
            录用信息
          </div>
          <commonForm
            ref="employment"
            :model="infoForm"
            :columns="employment"
          />
        </div>
        <div class="footer">
          <div class="next flex flex-justify-between flex-items">
            <el-button
              size="medium"
              @click="close"
            >
              取消
            </el-button>
            <el-button
              type="primary"
              size="medium"
              @click="handleNext"
            >
              下一步
            </el-button>
          </div>
        </div>
      </div>
      <div
        v-show="active === 1"
        class="contain"
      >
        <div class="content">
          <div class="title">
            薪资
          </div>
          <commonForm
            ref="salary"
            :model="infoForm"
            :columns="salary"
          />
        </div>
        <div class="content">
          <div class="title">
            劳动合同
          </div>
          <commonForm
            ref="labour"
            :model="infoForm"
            :columns="labour"
          />
        </div>
        <div class="content">
          <div class="title">
            五险一金
          </div>
          <commonForm
            ref="fiveRisks"
            :model="infoForm"
            :columns="fiveRisks"
          />
        </div>
        <div class="content">
          <div class="title">
            办公安排
          </div>
          <commonForm
            ref="office"
            :model="infoForm"
            :columns="office"
          />
        </div>
        <div class="content">
          <div class="title">
            其他
          </div>
          <commonForm
            ref="other"
            :model="infoForm"
            :columns="other"
          />
        </div>
        <div class="footer">
          <div class="next flex flex-justify-between flex-items">
            <div>
              <el-button
                type="primary"
                size="medium"
                @click="handlePreStep"
              >
                上一步
              </el-button>
            </div>
            <div>
              <el-button
                size="medium"
                @click="close"
              >
                取消
              </el-button>
              <el-button
                type="primary"
                size="medium"
                @click="handleTownext"
              >
                下一步
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-show="active === 2">
        <div class="contain">
          <div class="title content">
            审批流程
          </div>
          <div class="flow">
            <div class=" flex-flow flex flex-justify-start flex-items">
              <apprProgress
                ref="apprProgress"
                form-key="PersonOfferApply"
              />
            </div>

            <div class="line" />
          </div>
        </div>

        <div class="footer">
          <div class="next flex flex-justify-between flex-items">
            <div>
              <el-button
                type="primary"
                size="medium"
                @click="handlePreStep"
              >
                上一步
              </el-button>
            </div>
            <div>
              <el-button
                size="medium"
                @click="close"
              >
                取消
              </el-button>
              <el-button
                type="primary"
                size="medium"
                :loading="loading"
                @click="onsubmit"
              >
                提交
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-show="active === 3">
        <div class="success">
          <div
            class="flex flex-justify flex-flow-column flex-items"
            style="margin-top: 100px;"
          >
            <div
              class="el-icon-success"
              style="font-size: 80px;font-weight: 800;color: #67C23A;"
            />
            <div style="font-size: 25px;margin-top: 20px">
              提交成功
            </div>
            <div style="text-align: center;font-size: 17px">
              录用申请已提交，您可以在
              <el-link
                type="primary"
                style="font-size: 17px;position: relative;top:-3px"
                @click="jump"
              >
                招聘管理-候选人管理-面试通过
              </el-link>
              或
              <el-link
                type="primary"
                style="font-size: 17px;position: relative;top:-3px"
                @click="jumpMyApproval"
              >
                审批-我发起的
              </el-link>
              列表中查看该申请的进度。
            </div>
            <div style="margin-top:50px">
              <el-button
                type="primary"
                size="medium"
                @click="jumpDetail"
              >
                查看详情
              </el-button>
              <el-button
                type="primary"
                size="medium"
                @click="handleBack"
              >
                <span style="width: 56px;display: inline-block">返回</span>
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </basicContainer>
  </div>
</template>

<script>
import {
  personInfo,
  employment,
  salary,
  labour,
  fiveRisks,
  office,
  other
} from './components/userInfo'
import {
  getWorkAddress,
  getCompany,
  getJob,
  getposition,
  postOfferApply,
  getRecruitmentDetail,
  getOfferApply,
  getPersonInfo
} from '@/api/personnel/selectedPerson'
import { getOrgTreeSimple } from '@/api/org/org'
import { CodeToText } from 'element-china-area-data'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  name: 'Apply',
  components: {
    apprProgress: () => import('@/components/appr-progress/apprProgress')
  },
  data() {
    let validate = (rule, value, callback) => {
      let beginDate = moment(this.infoForm.contractBeginDate).valueOf()
      let endDate = moment(this.infoForm.contractEndDate).valueOf()
      if (beginDate > endDate) {
        // this.infoForm.endDate = ''
        callback(new Error('合同结束日期要大于合同起始日期'))
      } else {
        callback()
      }
    }
    return {
      rule: { required: true, validator: validate, trigger: 'change' },
      showBack: true,
      apprNo: '',
      applyId: '',
      recruitmentId: '',
      personId: '',
      loading: false,
      active: 0,
      personInfo,
      employment,
      salary,
      labour,
      fiveRisks,
      office,
      other,
      employmentform: {},
      infoForm: {
        pathLabels: [],
        userId: this.$store.getters.userId,
        isHouse: '',
        houseStandard: '',
        remark: '',
        officeSpace: '',
        telphone: '',
        isComputer: '',
        other: '',
        isShbx: '',
        baseMoney: '',
        probationSalary: '',
        formalSalary: '',
        entryDate: '',
        probation: '',
        contractType: '',
        contractBeginDate: '',
        contractEndDate: '',
        contractPeriod: '',
        companyId: '',
        orgId: '',
        jobId: '',
        positionId: '',
        workProperty: '',
        workAddressId: '',
        city: [],
        risks: [],
        name: '',
        sex: 0,
        phonenum: '',
        email: ''
      }
    }
  },
  watch: {
    'infoForm.contractBeginDate': {
      handler(val) {
        if (val && this.infoForm.contractPeriod) {
          this.infoForm.contractEndDate = moment(val)
            .add(this.infoForm.contractPeriod, 'Y')
            .format('YYYY-MM-DD')
        }
      },
      immediate: true,
      deep: true
    },
    'infoForm.contractPeriod': {
      handler(val) {
        if (val && this.infoForm.contractBeginDate) {
          this.infoForm.contractEndDate = moment(this.infoForm.contractBeginDate)
            .add(this.infoForm.contractPeriod, 'Y')
            .format('YYYY-MM-DD')
        }
      },
      immediate: true,
      deep: true
    }
  },
  async mounted() {
    this.personId = this.$route.query.personId
    this.recruitmentId = this.$route.query.recruitmentId
    this.infoForm = {
      ...this.infoForm,
      ...this.$route.query
    }
    this.getPersonInfo()
    this.getCompany()
    this.getWorkAddress()
    this.getJob()
    this.getposition()
    this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
      this.options(this.employment, 'workProperty', res)
    })
    this.$store.dispatch('CommonDict', 'ContractType').then((res) => {
      res
      this.options(this.labour, 'contractType', res)
    })
    this.getRecruitment()
    this.getOrgTree()
    if (this.$route.query.applyId) {
      this.getOfferApply()
    }
    this.labour.find((it) => it.prop === 'contractEndDate').rules.push(this.rule)
  },
  methods: {
    /***
     *
     * @author guanfenda
     * @desc 获取永恒信息
     *
     * */
    getPersonInfo() {
      let params = {
        personId: this.$route.query.personId
      }
      getPersonInfo(params).then((res) => {
        let { name, sex, phonenum, email } = { ...res }
        this.infoForm = {
          ...this.infoForm,
          name,
          sex,
          phonenum,
          email
        }
      })
    },
    /**
     *  @author guanfenda
     *  @desc 获取详情
     * */
    getOfferApply() {
      let params = {
        id: this.$route.query.applyId
      }
      getOfferApply(params).then((res) => {
        this.infoForm = {
          ...this.infoForm,
          ...res
        }
        this.infoForm.city = []
        res.provinceCode && this.infoForm.city.push(res.provinceCode)
        res.cityCode && this.infoForm.city.push(res.cityCode)
        let risks = ['isYangl', 'isYil', 'isGs', 'isShiy', 'isShengy', 'isGjj']
        this.infoForm.risks = []
        risks.map((it) => {
          if (this.infoForm[it] === 1) {
            this.infoForm.risks.push(it)
          }
        })
      })
    },
    getOrgTree() {
      getOrgTreeSimple({ parentOrgId: '0' }).then((res) => {
        this.employment.find((item) => item.prop === 'orgId').props.treeParams.data = res
      })
    },
    /**
     * author guanfenda
     * @desc 处理posion赋值
     *
     * */
    options(data, prop, position) {
      data.map((it) => {
        if (it.prop === prop) {
          it.options = position
        }
      })
    },
    jumpMyApproval() {
      this.$router.push({
        path: '/approval/appr/waitAppr'
      })
    },
    jump() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.push({
        path: '/personnel/candidate/candidateManagement'
      })
    },
    getRecruitment() {
      getRecruitmentDetail({ recruitmentId: this.recruitmentId }).then((res) => {
        this.infoForm.companyId = res.companyId
        this.infoForm.orgId = res.orgId
        this.infoForm.jobId = res.jobId
      })
    },
    handleBack() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.push({
        path: '/personnel/candidate/candidateManagement'
      })
    },
    dataFilter(res, form, props, label, value) {
      let index = ''
      let dict = []
      res &&
        res.map((it) => {
          dict.push({ label: it[label], value: it[value] })
        })
      form.basicAttrs.map((it, i) => {
        if (it.props === props) index = i
      })
      form.basicAttrs[index].value = dict
    },
    getposition() {
      getposition().then((res) => {
        this.options(this.employment, 'positionId', res)
      })
    },
    getJob() {
      let params = {
        jobName: '',
        orgId: ''
      }
      getJob(params).then((res) => {
        this.options(this.employment, 'jobId', res)
      })
    },
    getCompany() {
      let params = {
        parentOrgId: '0'
      }
      getCompany(params).then((res) => {
        this.options(this.employment, 'companyId', res)
        this.options(this.labour, 'companyId', res)
      })
    },
    getWorkAddress() {
      let params = {
        pageNo: 1,
        pageSize: 10000
      }
      getWorkAddress(params).then((res) => {
        this.options(this.employment, 'workAddressId', res.data)
      })
    },
    close() {
      this.$confirm('您有未保存的数据，直接离开将丢失数据，您确定要取消申请吗?', '确定取消申请？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
          this.$router.push({
            path: '/personnel/candidate/candidateManagement'
          })
          this.$message({
            type: 'success',
            message: '取消申请!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    handlePreStep() {
      this.active -= 1
    },
    handleNext() {
      return Promise.all(
        ['personInfo', 'employment'].map((it) => {
          return new Promise((resolve) => {
            this.$refs[it]
              .validate()
              .then(() => {
                resolve()
              })
              .catch(() => {
                this.$refs[it].scrollIntoView()
              })
          })
        })
      ).then(() => {
        this.active = 1
      })
    },
    handleTownext() {
      return Promise.all(
        ['salary', 'labour'].map((it) => {
          return new Promise((resolve) => {
            this.$refs[it]
              .validate()
              .then(() => {
                resolve()
              })
              .catch(() => {
                this.$refs[it].scrollIntoView()
              })
          })
        })
      ).then(() => {
        this.active = 2
      })
    },
    /**
     * @author guanfenda
     *
     * */
    onsubmit() {
      if (!this.$refs['apprProgress'].validate()) {
        this.$message.warning('请选择审批人')
        return
      }
      let workProvinceCode = this.infoForm.city[0],
        workProvinceName = CodeToText[this.infoForm.city[0]],
        workCityCode = this.infoForm.city[1],
        workCityName = CodeToText[this.infoForm.city[1]],
        risks = this.infoForm.risks,
        isYangl = risks.includes('isYangl') ? 1 : 0,
        isYil = risks.includes('isYil') ? 1 : 0,
        isGs = risks.includes('isGs') ? 1 : 0,
        isShengy = risks.includes('isShengy') ? 1 : 0,
        isShiy = risks.includes('isYangl') ? 1 : 0,
        isGjj = risks.includes('isGjj') ? 1 : 0
      let params = {
        ...this.infoForm,
        ...this.infoForm.risks,
        workProvinceCode,
        workProvinceName,
        workCityCode,
        workCityName,
        isYangl,
        isYil,
        isGs,
        isShengy,
        isShiy,
        isGjj
      }
      this.loading = true
      postOfferApply(params).then((res) => {
        this.applyId = res.id
        this.$refs['apprProgress'].submit(res.id).then((res) => {
          this.apprNo = res.apprNo
          this.loading = false
          this.$message({ type: 'success', message: '提交成功' })
          this.active = 3
        })
      })
    },
    jumpDetail() {
      let params = {
        apprNo: this.apprNo,
        formId: this.applyId,
        formKey: 'PersonOfferApply',
        page: 'apply'
      }
      this.$router.push({
        path: '/approval/appr/apprDetail',
        query: params
      })
    },
    back() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.push({
        path: '/personnel/candidate/candidateManagement'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.apply {
  .step {
    padding: 0 200px;
  }
}

.content {
  margin-top: 10px;
  padding: 0 200px;

  .title {
    font-size: 16px;
  }
}

.title {
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 15px;
}

.contain {
  margin-top: 50px;
  min-height: 300px;
}

.footer {
  /*height: 100px;*/
  /*line-height: 100px;*/
  margin-top: 20px;
  /*margin-bottom: 50px;*/

  .next {
    padding: 0 200px;
  }
}

.success {
  height: 600px;
  width: 600px;
  margin: 0 auto;
}

.back {
  cursor: pointer;
}

.flow {
  /*margin-bottom: 100px;*/
  /*margin-top: 30px;*/
  padding: 0 200px;

  .line {
    border-left: 1px solid #1e9fff;
    min-height: 120px;
    position: relative;
    display: flex;
    display: -webkit-flex;
    flex-flow: row wrap !important;
  }

  .line:last-child {
    border-left: 1px solid transparent;
  }

  .spot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #1e9fff;
    margin-left: -5px;
  }

  .person {
    margin: 0 20px;
  }
}
</style>

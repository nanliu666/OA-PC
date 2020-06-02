<template>
  <div style="height: 100%">
    <div class="header">
      <div
        class="back"
        @click="back"
      >
        <i
          class="el-icon-arrow-left"
          style="font-weight: 800"
        /> 录用申请
      </div>
    </div>
    <div
      v-loading="loading"
      class="apply"
    >
      <div class="step">
        <el-steps
          :active="active"
          finish-status="success"
        >
          <el-step title="基本信息" />
          <el-step title="薪资福利信息" />
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
          <inputArray
            ref="personInfo"
            :info-form.sync="personInfo"
            :form.sync="infoForm"
          />
        </div>
        <div class="content">
          <div class="title">
            录用信息
          </div>
          <inputArray
            ref="employment"
            :info-form.sync="employment"
            :form.sync="infoForm"
          />
        </div>
        <div class="flex flex-flow flex-items flex-justify">
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
      <div
        v-show="active === 1"
        class="contain"
      >
        <div class="content">
          <div class="title">
            薪资
          </div>
          <inputArray
            ref="salary"
            :info-form.sync="salary"
            :form.sync="infoForm"
          />
        </div>
        <div class="content">
          <div class="title">
            劳动合同
          </div>
          <inputArray
            ref="labour"
            :info-form.sync="labour"
            :form.sync="infoForm"
          />
        </div>
        <div class="content">
          <div class="title">
            五险一金
          </div>
          <inputArray
            ref="fiveRisks"
            :info-form.sync="fiveRisks"
            :form.sync="infoForm"
          />
        </div>
        <div class="content">
          <div class="title">
            办公安排
          </div>
          <inputArray
            ref="office"
            :info-form.sync="office"
            :form.sync="infoForm"
          />
        </div>
        <div class="content">
          <div class="title">
            其他
          </div>
          <inputArray
            ref="other"
            :info-form.sync="other"
            :form.sync="infoForm"
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
                提交
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-show="active === 2">
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
    </div>
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
import inputArray from './components/inputArray'
import {
  getWorkAddress,
  getCompany,
  getJob,
  getposition,
  getTree,
  postOfferApply,
  getOfferApply,
  getRecruitmentDetail
} from '@/api/personnel/selectedPerson'

export default {
  name: 'Apply',
  components: {
    inputArray
  },
  data() {
    return {
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
        userName: '',
        sex: 0,
        phonenum: '',
        email: ''
      }
    }
  },
  async mounted() {
    let sex = parseInt(this.$route.query.sex)
    this.personId = this.$route.query.personId
    this.recruitmentId = this.$route.query.recruitmentId
    this.infoForm = {
      ...this.infoForm,
      ...this.$route.query,
      sex
    }
    // personId
    this.getCompany()
    this.getWorkAddress()
    this.getJob()
    this.getposition()
    this.getTree()
    this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
      this.dataFilter(res, this.employment, 'workProperty', 'dictValue', 'dictKey')
    })
    this.$store.dispatch('CommonDict', 'ContractType').then((res) => {
      this.dataFilter(res, this.labour, 'contractType', 'dictValue', 'dictKey')
    })
    await this.getData()
    this.getRecruitment()
    // ContractType
  },
  methods: {
    jump() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.push({
        path: '/personnel/candidate/candidateManagement'
      })
    },
    getData() {
      return new Promise((resolve, reject) => {
        getOfferApply({ personId: this.personId })
          .then((res) => {
            if (res.companyId) {
              this.infoForm = {
                ...this.infoForm,
                ...res
              }
              if (res.provinceCode && res.cityCode) {
                this.infoForm.city = [res.provinceCode, res.cityCode]
              }
              res.isYangl === 1 && this.infoForm.risks.push('isYangl')
              res.isYil === 1 && this.infoForm.risks.push('isYil')
              res.isGs === 1 && this.infoForm.risks.push('isGs')
              res.isShiy === 1 && this.infoForm.risks.push('isShiy')
              res.isGjj === 1 && this.infoForm.risks.push('isGjj')
              res.isShengy === 1 && this.infoForm.risks.push('isShengy')
            }

            resolve()
          })
          .catch(() => {
            reject()
          })
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
      this.active = 1
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
    getTree() {
      let params = {
        parentOrgId: '0'
      }
      getTree(params).then((res) => {
        let index = ''
        this.employment.basicAttrs.map((it, i) => {
          if (it.props === 'orgId') index = i
        })
        this.employment.basicAttrs[index].value = res
      })
    },
    getposition() {
      getposition().then((res) => {
        this.dataFilter(res, this.employment, 'positionId', 'name', 'id')
      })
    },
    getJob() {
      let params = {
        jobName: '',
        orgId: ''
      }
      getJob(params).then((res) => {
        this.dataFilter(res, this.employment, 'jobId', 'jobName', 'jobId')
      })
    },
    getCompany() {
      let params = {
        parentOrgId: '0'
      }
      getCompany(params).then((res) => {
        this.dataFilter(res, this.employment, 'companyId', 'orgName', 'orgId')
        this.dataFilter(res, this.labour, 'companyId', 'orgName', 'orgId')
      })
    },
    getWorkAddress() {
      let params = {
        pageNo: 1,
        pageSize: 10000
      }
      getWorkAddress(params).then((res) => {
        this.dataFilter(res.data, this.employment, 'workAddressId', 'address', 'id')
      })
    },
    close() {
      this.$confirm('您有未保存的数据，直接离开将丢失数据，您确定要取消申请吗?', '确定取消申请？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
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
      this.active = 0
    },
    handleNext() {
      // this.active =1
      return Promise.all(
        ['personInfo', 'employment'].map((it) => {
          return new Promise((resolve) => {
            let form = this.$refs[it].submitForm()
            resolve(form)
          })
        })
      ).then((res) => {
        if (res.includes(false)) return
        this.active = 1
      })
    },
    handleTownext() {
      return Promise.all(
        ['salary', 'labour', 'fiveRisks', 'office', 'other'].map((it) => {
          return new Promise((resolve) => {
            let form = this.$refs[it].submitForm()
            resolve(form)
          })
        })
      ).then((res) => {
        if (res.includes(false)) return

        let workProvinceCode = this.infoForm.city[0],
          workProvinceName = this.infoForm.pathLabels[0] || this.infoForm.workProvinceName,
          workCityCode = this.infoForm.city[1],
          workCityName = this.infoForm.pathLabels[1] || this.infoForm.workCityName,
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
        postOfferApply(params).then(() => {
          this.loading = false
          this.$message.success('提交成功')
        })
        this.active = 2
      })
    },
    jumpDetail() {
      let params = {
        ...this.$route.query
      }
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.push({
        path: '/personnel/candidate/applyDetail',
        // sex: row.sex,
        // email: row.email,
        // phonenum:row.phonenum,
        // recruitmentId: row.recruitmentId
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
.header {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #202940;
  line-height: 28px;
  font-weight: bold;
  margin-top: 14px;
}

.apply {
  background: #ffffff;
  border-radius: 4px;
  padding: 24px;
  margin-top: 15px;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 50px;

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

.contain {
  margin-top: 50px;
}

.footer {
  height: 100px;
  line-height: 100px;
  margin-top: 20px;
  margin-bottom: 50px;

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
</style>

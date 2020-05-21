<template>
  <div style="height: 100%">
    <div class="header">
      <div>
        <i
          class="el-icon-arrow-left"
          style="font-weight: 800"
        /> 登记表详情
      </div>
    </div>
    <div class="apply">
      <div class="step">
        <el-steps
          :active="active"
          finish-status="success"
        >
          <el-step title="基本信息" />
          <el-step title="薪资福利信息" />
          <el-step title="审批流程" />
          <el-step title="完成" />
        </el-steps>
      </div>
      <div
        v-if="active === 0"
        class="contain"
      >
        <div class="content">
          <div class="title">
            候选人信息
          </div>
          <inputArray
            ref="personInfo"
            :info-form.sync="personInfo"
            :form.sync="Infoform"
          />
        </div>
        <div class="content">
          <div class="title">
            录用信息
          </div>
          <inputArray
            ref="employment"
            :info-form.sync="employment"
            :form.sync="Infoform"
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
        v-if="active === 1"
        class="contain"
      >
        <div class="content">
          <div class="title">
            薪资
          </div>
          <inputArray
            :info-form.sync="salary"
            :form.sync="Infoform"
          />
        </div>
        <div class="content">
          <div class="title">
            劳动合同
          </div>
          <inputArray
            :info-form.sync="labour"
            :form.sync="Infoform"
          />
        </div>
        <div class="content">
          <div class="title">
            五险一金
          </div>
          <inputArray
            :info-form.sync="fiveRisks"
            :form.sync="Infoform"
          />
        </div>
        <div class="content">
          <div class="title">
            办公安排
          </div>
          <inputArray
            :info-form.sync="office"
            :form.sync="Infoform"
          />
        </div>
        <div class="content">
          <div class="title">
            其他
          </div>
          <inputArray
            :info-form.sync="other"
            :form.sync="Infoform"
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
                @click="handleNext"
              >
                下一步
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
import { getWorkAddress, getCompany, getJob, getposition } from '@/api/personnel/selectedPerson'

export default {
  name: 'Apply',
  components: {
    inputArray
  },
  data() {
    return {
      active: 0,
      personInfo,
      employment,
      salary,
      labour,
      fiveRisks,
      office,
      other,
      employmentform: {},
      Infoform: {
        risks: [],
        name: '张琪',
        six: 0,
        telephone: '15089906928',
        email: '12746782@qq.com'
      }
    }
  },
  mounted() {
    this.getCompany()
    this.getWorkAddress()
    this.getJob()
    this.getposition()
    this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
      let index = ''
      let dict = []
      res &&
        res.map((it) => {
          dict.push({ label: it.dictValue, value: it.id })
        })
      this.employment.basicAttrs.map((it, i) => {
        if (it.props === 'workProperty') index = i
      })
      this.employment.basicAttrs[index].value = dict
    })
  },
  methods: {
    getposition() {
      getposition().then((res) => {
        let index = ''
        let dict = []
        res &&
          res.map((it) => {
            dict.push({ label: it.name, value: it.id })
          })
        this.employment.basicAttrs.map((it, i) => {
          if (it.props === 'positionId') index = i
        })
        this.employment.basicAttrs[index].value = dict
      })
    },
    getJob() {
      let params = {
        jobName: '',
        orgId: ''
      }
      getJob(params).then((res) => {
        let index = ''
        let dict = []
        res &&
          res.map((it) => {
            dict.push({ label: it.jobName, value: it.jobId })
          })
        this.employment.basicAttrs.map((it, i) => {
          if (it.props === 'jobId') index = i
        })
        this.employment.basicAttrs[index].value = dict
      })
    },
    getCompany() {
      let params = {
        parentOrgId: '0'
      }
      getCompany(params).then((res) => {
        let index = ''
        let dict = []
        res &&
          res.map((it) => {
            dict.push({ label: it.orgName, value: it.orgId })
          })

        this.employment.basicAttrs.map((it, i) => {
          if (it.props === 'companyId') index = i
        })
        this.employment.basicAttrs[index].value = dict
      })
    },
    getWorkAddress() {
      let params = {
        pageNo: 1,
        pageSize: 10000
      }
      getWorkAddress(params).then((res) => {
        let address = []
        res.data &&
          res.data.map((it) => {
            address.push({ label: it.address, value: it.id })
          })
        let index = ''
        this.employment.basicAttrs.map((it, i) => {
          if (it.props === 'workAddressId') index = i
        })
        this.employment.basicAttrs[index].value = address
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
</style>

<template>
  <div style="height: 100%">
    <div class="header">
      <div @click="handleBack">
        <i
          class="el-icon-arrow-left"
          style="font-weight: 800"
        /> 续签合同
      </div>
    </div>
    <div class="person">
      <div class="name">
        {{ personInfo.name }}（{{ personInfo.workNo }})
      </div>
      <div class="flex flex-flow flex-justify-start nav">
        <div><span>手机号码：</span>{{ personInfo.phonenum }}</div>
        <div><span>部门：</span>{{ personInfo.orgName }}</div>
        <div><span>职位：</span> {{ personInfo.jobName }}</div>
      </div>
    </div>
    <div class="contain">
      <div class="title">
        合同信息
      </div>
      <div class="content">
        <inputArray
          ref="signedData"
          :info-form.sync="signedData"
          :form.sync="infoForm"
        />
        <div>
          <el-form
            ref="formApply"
            :model="apply"
            :rules="rules"
            label-width="130px"
            label-position="top"
            size="medium"
          >
            <el-form-item
              label="审批流程"
              prop="apprProgress"
            >
              <apprProgress
                ref="apprProgress"
                form-key="UserContractInfo"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="footer flex flex-items flex-justify">
          <el-button
            size="medium"
            @click="handleBack"
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
</template>

<script>
import inputArray from '@/views/personnel/candidate/components/inputArray'
import { signedData } from './components/contractData'
import { getCompany } from '@/api/personnel/selectedPerson'
import { getContractLatest, postContractApply } from '@/api/personnel/contart'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default {
  name: 'Renewal',
  components: {
    inputArray,
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
    let validate = (rule, value, callback) => {
      let beginDate = moment(this.infoForm.beginDate).valueOf()
      let endDate = moment(this.infoForm.endDate).valueOf()
      if (beginDate > endDate) {
        // this.infoForm.endDate = ''
        callback(new Error('合同开始日期要小于合同结束日期'))
      } else {
        callback()
      }
    }
    let validateStartTime = (rule, value, callback) => {
      let oldEndDate = moment(this.initData.endDate).valueOf()
      let newVBeginDate = moment(this.infoForm.beginDate).valueOf()
      if (oldEndDate > newVBeginDate) {
        // this.infoForm.endDate = ''
        callback(new Error('合同的开始日期不能早于上一份合同的结束日期'))
      } else {
        callback()
      }
    }
    return {
      initData: {},
      rule: { required: true, validator: validate, trigger: 'change' },
      startTime: { required: true, validator: validateStartTime, trigger: 'blur' },
      apply: {
        apprProgress: '',
        note: ''
      },
      loading: false,
      personInfo: {
        telephone: '150899544444',
        orgName: '行政部',
        jodName: '人力资源'
      },
      rules: {
        note: [
          {
            required: true,
            message: '请填写帮助说明',
            trigger: 'change'
          }
        ],
        apprProgress: [{ required: true, validator: checkAppr }]
      },
      signedData,
      infoForm: {
        contractId: '',
        userId: '',
        id: '',
        code: '',
        name: '',
        type: '',
        beginDate: '',
        endDate: '',
        signDate: '',
        period: '',
        remark: ''
      }
    }
  },
  watch: {
    'infoForm.beginDate': {
      handler(val) {
        // beginDate: '',
        //   endDate: '',
        if (val && this.infoForm.period) {
          this.infoForm.endDate = moment(val)
            .add(this.infoForm.period, 'Y')
            .format('YYYY-MM-DD')
        } else if (val && !this.infoForm.period) {
          let beginDate = moment(this.infoForm.beginDate).valueOf()
          let endDate = moment(this.infoForm.endDate).valueOf()
          if (beginDate > endDate) {
            this.infoForm.endDate = ''
          }
        }
      },
      immediate: true,
      deep: true
    },
    'infoForm.period': {
      handler(val) {
        if (val && this.infoForm.beginDate) {
          this.infoForm.endDate = moment(this.infoForm.beginDate)
            .add(this.infoForm.period, 'Y')
            .format('YYYY-MM-DD')
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.infoForm.userId = this.$route.query.userId
    this.infoForm.contractId = this.$route.query.contractId
    this.$store.dispatch('CommonDict', 'ContractType').then((res) => {
      this.dataFilter(res, this.signedData, 'type', 'dictValue', 'dictKey')
    })
    this.personInfo = {
      ...this.$route.query
    }
    this.getCompany()
    this.signedData.basicAttrs.find((it) => it.props === 'endDate').rules.push(this.rule)
    this.signedData.basicAttrs.find((it) => it.props === 'beginDate').rules.push(this.startTime)
    this.getContractLatest()
  },
  methods: {
    /**
     * @author guanfenda
     * @desc 用户已签订最新合同信息查询接口
     * */
    getContractLatest() {
      let params = {
        userId: this.$route.query.userId
      }
      getContractLatest(params).then((res) => {
        this.initData = res
        this.infoForm = {
          ...res
        }
      })
    },
    handleBack() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.push({
        path: '/personnel/contract/contract'
      })
    },
    onsubmit() {
      return Promise.all(
        ['signedData'].map((it) => {
          return new Promise((resolve) => {
            let form = this.$refs[it].submitForm()
            resolve(form)
          })
        })
      ).then((res) => {
        this.$refs['formApply'].validate((valid) => {
          if (res.includes(false)) return
          if (!valid) return
          let params = {
            ...this.infoForm
          }
          this.loading = true
          postContractApply(params)
            .then((res) => {
              // this.$message.success('提交成功')
              if (res && res.id) {
                this.$refs['apprProgress'].submit(res.id).then(() => {
                  this.$message({ type: 'success', message: '提交成功' })
                  setTimeout(() => {
                    this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
                    this.$router.push({
                      path: '/personnel/contract/contract'
                    })
                  }, 2000)
                })
              }
            })
            .finally(() => {
              this.loading = false
            })
        })
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
    getCompany() {
      let params = {
        parentOrgId: '0'
      }
      getCompany(params).then((res) => {
        this.dataFilter(res, this.signedData, 'name', 'orgName', 'orgName')
      })
    },
    back() {}
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
  padding-top: 14px;
}
.person {
  background: #ffffff;
  border-radius: 4px;
  height: 102px;
  padding: 24px 24px 24px 24px;
  box-sizing: border-box;
  margin-top: 16px;

  .name {
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #333333;
    line-height: 30px;
  }

  .nav {
    font-size: 14px;
    color: #757c85;
    line-height: 20px;
    margin-top: 5px;
    div {
      margin-right: 20px;
    }
  }

  .person_position {
    font-size: 14px;
    color: #757c85;
    line-height: 20px;

    div:nth-child(2) {
      margin: 0 16px 0 12px;
    }

    div:nth-child(3) {
      background: rgba(113, 129, 153, 0.1);
      border-radius: 4px;
      padding: 3px 10px;
    }
  }

  .icon {
    span:nth-child(1) {
      margin-right: 24px;
      font-size: 14px;
      color: #757c85;
    }

    span:nth-child(2) {
      font-size: 14px;
      color: #757c85;
    }

    i {
      color: #757c85;
      font-weight: 800;
      margin-right: 4px;
    }
  }
}
.contain {
  background: #fff;
  margin-top: 20px;
  padding: 20px 100px;
  min-height: 100px;
  .title {
    font-size: 16px;
  }
  .content {
    margin-top: 10px;
    /*padding: 0 200px;*/

    .title {
      font-size: 16px;
    }
  }
}
.footer {
  margin-top: 20px;
}
</style>

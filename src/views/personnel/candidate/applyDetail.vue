<template>
  <div style="height: 100%;">
    <div class="header">
      <div @click="back">
        <i
          class="el-icon-arrow-left"
          style="font-weight: 800"
        /> 申请录用
      </div>
    </div>
    <div class="person">
      <div class="name">
        {{ personInfo.id }}提交的录用申请
      </div>
      <div class="flex flex-flow flex-justify-between nav">
        <div><span>审批编号：</span>{{ personInfo.id }}</div>
        <div><span>申请人：</span>{{ personInfo.userName }}</div>
        <div><span>申请时间：</span> {{ personInfo.status }}</div>
        <div><span>状态：</span> {{ personInfo.status }}</div>
      </div>
    </div>
    <div class="contain">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="申请详情"
          name="first"
        >
          <div class="basicInfo">
            <div class="title_top">
              基本信息
            </div>
            <div class="title">
              候选人信息
            </div>
            <div class="basic">
              <div class="flexs">
                <div
                  v-for="(info, index) in basicInfo"
                  :key="index"
                  class="attribute flex flex-flow flex-items"
                >
                  <div style="text-align: right">
                    {{ info.text }}：
                  </div>
                  <div>{{ basic[info.attribute] }}</div>
                </div>
              </div>
            </div>
            <div class="title">
              录用信息
            </div>
            <div class="basic">
              <div class="flexs">
                <div
                  v-for="(info, index) in applyInfo"
                  :key="index"
                  class="attribute flex flex-flow flex-items"
                >
                  <div style="text-align: right">
                    {{ info.text }}：
                  </div>
                  <div>{{ basic[info.attribute] }}</div>
                </div>
              </div>
            </div>
            <div />
          </div>
          <div
            class="basicInfo"
            style="margin-bottom: 50px"
          >
            <div class="title_top">
              薪资福利信息
            </div>
            <div class="title">
              薪资
            </div>
            <div class="basic">
              <div class="flexs">
                <div
                  v-for="(info, index) in salary"
                  :key="index"
                  class="attribute flex flex-flow flex-items"
                >
                  <div style="text-align: right">
                    {{ info.text }}：
                  </div>
                  <div>{{ basic[info.attribute] }}</div>
                </div>
              </div>
            </div>
            <div class="title">
              劳动合同
            </div>
            <div class="basic">
              <div class="flexs">
                <div
                  v-for="(info, index) in labour"
                  :key="index"
                  class="attribute flex flex-flow flex-items"
                >
                  <div style="text-align: right">
                    {{ info.text }}：
                  </div>
                  <div>{{ basic[info.attribute] }}</div>
                </div>
              </div>
            </div>
            <div class="title">
              五险一金
            </div>
            <div class="basic">
              <div class="flexs">
                <div
                  v-for="(info, index) in fiveRisks"
                  :key="index"
                  class="attribute flex flex-flow "
                  :class="[info.attribute !== 'risks' ? 'flex-items' : '']"
                >
                  <div style="text-align: right">
                    {{ info.text }}：
                  </div>
                  <div>{{ basic[info.attribute] }}</div>
                  <!--                  <div v-else>-->
                  <!--                    <span v-for="it in basic[info.attribute]">{{it}}</span>-->
                  <!--                  </div>-->
                </div>
              </div>
            </div>
            <div class="title">
              办公安排
            </div>
            <div class="basic">
              <div class="flexs">
                <div
                  v-for="(info, index) in office"
                  :key="index"
                  class="attribute flex flex-flow flex-items"
                >
                  <div style="text-align: right">
                    {{ info.text }}：
                  </div>
                  <div>{{ basic[info.attribute] }}</div>
                </div>
              </div>
            </div>
            <div class="title">
              其他
            </div>
            <div class="basic">
              <div class="flexs">
                <div
                  v-for="(info, index) in other"
                  :key="index"
                  class="attribute flex flex-flow flex-items"
                >
                  <div style="text-align: right">
                    {{ info.text }}：
                  </div>
                  <div>{{ basic[info.attribute] }}</div>
                </div>
              </div>
            </div>

            <div />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getOfferApply, getWorkAddress } from '@/api/personnel/selectedPerson'

export default {
  name: 'ApplyDetail',
  data() {
    return {
      personId: '',
      recruitmentId: '',
      activeName: 'first',
      personInfo: {
        userName: '',
        department: '',
        position: '',
        status: ''
      },
      basic: {
        id: '',
        personI: '',
        entryDate: '',
        probation: '',
        companyId: '',
        companyName: '',
        orgId: '',
        orgName: '',
        jobId: '',
        jobName: '',
        positionIdR: '',
        positionName: '',
        workProperty: '',
        workAddressId: '',
        provinceCode: '',
        provinceName: '',
        cityCode: '',
        cityName: '',
        countyCode: '',
        countyName: '',
        address: '',
        workProvinceCode: '',
        workProviceName: '',
        workCityCode: '',
        workCityName: '',
        probationSalary: '',
        formalSalary: '',
        contractType: '',
        contractBeginDate: '',
        contractEndDate: '',
        contractPeriod: '',
        isShbx: '',
        baseMoney: '',
        isYangl: '',
        isYil: '',
        isGs: '',
        isShiy: '',
        isShengy: '',
        isGjj: '',
        officeSpace: '',
        telphone: '',
        isComputer: '',
        other: '',
        isHouse: '',
        houseStandard: '',
        remark: '',
        userId: '',
        userName: '',
        name: '',
        sex: '',
        phonenum: '',
        email: '',
        risks: ''
      },
      basicInfo: [
        {
          attribute: 'userName',
          text: '姓名'
        },
        {
          attribute: 'sex',
          text: '性别'
        },
        {
          attribute: 'phonenum',
          text: '手机号码'
        },
        {
          attribute: 'phonenum',
          text: '邮箱'
        }
      ],
      applyInfo: [
        {
          attribute: 'entryDate',
          text: '预计入职日期'
        },
        {
          attribute: 'probationSalary',
          text: '试用期'
        },
        {
          attribute: 'companyName',
          text: '入职公司'
        },
        {
          attribute: 'orgName',
          text: '部门'
        },
        {
          attribute: 'jobName',
          text: '职位'
        },
        {
          attribute: 'positionName',
          text: '岗位'
        },
        {
          attribute: 'workProperty',
          text: '工作性质'
        },
        {
          attribute: 'workAddressId',
          text: '工作地址'
        },
        {
          attribute: 'city',
          text: '工作城市'
        }
      ],
      salary: [
        {
          attribute: 'probationSalary',
          text: '试用期月薪'
        },
        {
          attribute: 'formalSalary',
          text: '转正月薪'
        }
      ],
      labour: [
        {
          attribute: 'companyName',
          text: '合同公司'
        },
        {
          attribute: 'contractType',
          text: '合同类型'
        },
        {
          attribute: 'contractPeriod',
          text: '合同期限'
        },
        {
          attribute: 'contractBeginDate',
          text: '合同开始日期'
        },
        {
          attribute: 'contractEndDate',
          text: '合同结束日期'
        }
      ],
      fiveRisks: [
        {
          attribute: 'isShbx',
          text: '是否缴纳社会保险'
        },
        {
          attribute: 'baseMoney',
          text: '社会保险基数'
        },
        {
          attribute: 'risks',
          text: '其他'
        }
      ],
      office: [
        {
          attribute: 'officeSpace',
          text: '办公位安排'
        },
        {
          attribute: 'telphone',
          text: '电话配备'
        },
        {
          attribute: 'isComputer',
          text: '是否电脑配备'
        },
        {
          attribute: 'other',
          text: '其他'
        }
      ],
      other: [
        {
          attribute: 'isHouse',
          text: '是否安排住房'
        },
        {
          attribute: 'houseStandard',
          text: '住房标准'
        },
        {
          attribute: 'remark',
          text: '备注'
        }
      ]
    }
  },
  async mounted() {
    this.basic = {
      ...this.basic,
      ...this.$route.query
    }
    this.personId = this.$route.query.personId
    this.recruitmentId = this.$route.query.recruitmentId
    await this.getData()
    this.getWorkAddress()
    this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
      res.map((it) => {
        if (it.dictKey === this.basic.workProperty) {
          this.basic.workProperty = it.dictValue
        }
      })
    })
    this.$store.dispatch('CommonDict', 'ContractType').then((res) => {
      res.map((it) => {
        if (it.dictKey === this.basic.contractType) {
          this.basic.contractType = it.dictValue
        }
      })
    })
    // this.personInfo.userName =  this.basic.userName
    // this.personInfo.id = this.basic.id
  },
  methods: {
    getWorkAddress() {
      let params = {
        pageNo: 1,
        pageSize: 10000
      }

      getWorkAddress(params).then((res) => {
        res.data.map((it) => {
          if (it.id === this.basic.workAddressId) {
            this.basic.workAddressId = it.address
          }
        })
      })
    },
    getData() {
      return new Promise((resolve, reject) => {
        getOfferApply({ personId: this.personId })
          .then((res) => {
            if (res.companyId) {
              this.basic = {
                ...this.basic,
                ...res
              }
              let istrue = ['isShbx', 'isHouse', 'isComputer', 'sex']
              let risk = ''
              let orther = [
                { label: '养老保险', value: 'isYangl' },
                { label: '医疗保险', value: 'isYil' },
                { label: '失业保险', value: 'isGs' },
                { label: '工伤保险', value: 'isShiy' },
                { label: '生育保险', value: 'isShengy' },
                { label: '住房公积金', value: 'isGjj' }
              ]
              orther.map((it) => {
                if (this.basic[it.value] == 1) {
                  risk += it.label + '；'
                }
              })
              this.basic.risks = risk
              for (let [key, val] of Object.entries(this.basic)) {
                if (istrue.includes(key)) {
                  this.basic[key] = val == 1 ? '是' : '否'
                }
              }
              this.basic.contractPeriod = this.basic.contractPeriod + '年'
              this.basic.city = this.basic.workProvinceName + this.basic.workCityName
            }

            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    handleClick() {
      // console.log(tab, event)
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
.contain {
  background: #ffffff;

  margin-top: 15px;
  margin-bottom: 50px;
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

.basicInfo {
  margin-top: 16px;
  background: #ffffff;
  border-radius: 4px;
  padding: 0px 24px 15px 24px;

  .attribute {
    div {
      /*width: 200px;*/
      padding: 15px 0;
      ont-size: 14px;
    }

    div:first-child {
      color: #718199;
    }

    div:nth-child(2) {
      color: #202940;
      /*width: 230px;*/
    }
  }

  .flexs {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    font-size: 14px;
    /*margin-left: 100px;*/
  }

  .title_top {
    height: 25px;
    line-height: 25px;
    font-weight: 800;
    font-size: 20px;
    color: #202940;
    /*padding-top: 20px;*/
    border-left: 5px solid #1e9fff;
    padding-left: 8px;
  }

  .attribute:nth-child(odd) {
    width: 50%;

    div:first-child {
      min-width: 50%;
      text-align: right;
    }
  }

  .attribute:nth-child(even) {
    width: 50%;

    div:first-child {
      min-width: 25%;
      text-align: right;
    }
  }

  .title {
    height: 52px;
    font-size: 16px;
    color: #202940;
    line-height: 52px;
    border-bottom: 1px solid #e3e7e9;
    margin-bottom: 20px;
  }
}
/deep/.el-tabs__nav {
  margin-left: 20px;
  font-size: 16px;
}
</style>

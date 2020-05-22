<template>
  <div style="height: 100%">
    <div class="header">
      <div>
        <i
          class="el-icon-arrow-left"
          style="font-weight: 800"
        /> 申请录用
      </div>
    </div>
    <div class="person">
      <div class="name">
        {{ personInfo.name }}提交的录用申请
      </div>
      <div class="flex flex-flow flex-justify-between nav">
        <div><span>审批编号：</span>{{ personInfo.department }}</div>
        <div><span>申请人：</span>{{ personInfo.position }}</div>
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
                  class="attribute flex flex-flow"
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
                  class="attribute flex flex-flow"
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
                  class="attribute flex flex-flow"
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
                  class="attribute flex flex-flow"
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
                  class="attribute flex flex-flow"
                >
                  <div style="text-align: right">
                    {{ info.text }}：
                  </div>
                  <div>{{ basic[info.attribute] }}</div>
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
                  class="attribute flex flex-flow"
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
                  v-for="(info, index) in office"
                  :key="index"
                  class="attribute flex flex-flow"
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
export default {
  name: 'ApplyDetail',
  data() {
    return {
      activeName: 'first',
      personInfo: {
        name: '张琪',
        department: 'ucd部门',
        position: 'ue设计师',
        status: '面试中'
      },
      basic: {
        id: '申请ID',
        personI: '人员ID',
        entryDate: '预计入职日期',
        probation: '试用期，单位：月',
        companyId: '入职公司ID',
        companyName: '入职公司名称',
        orgId: '主部门ID',
        orgName: '部门名称',
        jobId: '主职位ID\t',
        jobName: '职位名称',
        positionIdR: '岗位ID',
        positionName: '岗位名称',
        workProperty: '工作性质，字典组：WorkProperty',
        workAddressId: '工作地址ID',
        provinceCode: '省份编码',
        provinceName: '省份名称',
        cityCode: '地市编码',
        cityName: '地市名称',
        countyCode: '区县编码',
        countyName: '区县名称',
        address: '详细地址',
        workProvinceCode: '工作省份编码',
        workProviceName: '工作省份名称',
        workCityCode: '工作地市编码',
        workCityName: '工作地市名称',
        probationSalary: '试用期月薪，单位：元',
        formalSalary: '转正月薪，单位：元',
        contractType: '合同类型，字典组：ContractType',
        contractBeginDate: '合同开始日期',
        contractEndDate: '合同结束日期',
        contractPeriod: '合同期限，单位：年',
        isShbx: '是否缴纳社会保险，1-是，0-否',
        baseMoney: '社会保险基数，单位：元',
        isYangl: '是否缴纳养老保险，1-是，0-否',
        isYil: '是否缴纳医疗保险，1-是，0-否',
        isGs: '是否缴纳工伤保险，1-是，0-否',
        isShiy: '是否缴纳失业保险，1-是，0-否',
        isShengy: '是否缴纳生育保险，1-是，0-否',
        isGjj: '是否缴纳住房公积金，1-是，0-否',
        officeSpace: '办公位安排',
        telphone: '电话配备',
        isComputer: '是否电脑配备，1-是，0-否',
        other: '其他',
        isHouse: '是否安排住房，1-是，0-否',
        houseStandard: '住房标准',
        remark: '备注',
        userId: '提交人ID',
        userName: '提交人姓名',
        name: '姓名',
        sex: '性别',
        phonenum: '手机号码',
        email: '123@com'
      },
      basicInfo: [
        {
          attribute: 'name',
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
          attribute: 'cityCode',
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
          attribute: 'isYil',
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
  methods: {
    handleClick() {
      // console.log(tab, event)
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
}
.person {
  background: #ffffff;
  border-radius: 4px;
  height: 102px;
  padding: 0 24px 24px 24px;
  box-sizing: border-box;

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

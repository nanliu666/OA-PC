<template>
  <div style="height: 100%">
    <div class="header">
      <div
        class="back"
        @click="handleBack"
      >
        <i
          class="el-icon-arrow-left"
          style="font-weight: 800"
        /> 登记表详情
      </div>
    </div>
    <div class="person">
      <div class="name">
        {{ personInfo.name }}
      </div>
      <div class="flex flex-flow flex-justify-between">
        <div class="person_position flex flex-items flex-flow">
          <div>{{ personInfo.department }}</div>
          <div>{{ personInfo.position }}</div>
          <div v-if="personInfo.status">
            {{ personInfo.status }}
          </div>
        </div>
        <div class="flex flex-items flex-flow">
          <div v-if="!$route.query.entry">
            <template
              v-if="
                candidateInfo.interviewRegister === 0 &&
                  candidateInfo.interviewFill === 0 &&
                  candidateInfo.interview === 1
              "
            >
              <el-button
                type="primary"
                size="medium"
                style="margin-right: 15px;"
                @click="handleSend"
              >
                重新发送面试登记表
              </el-button>
            </template>
            <!-- <template v-else-if="candidateInfo.status === '0'">
              <el-button
                size="medium"
                style="margin-right: 15px;"
              >
                下载
              </el-button>
              <el-button
                size="medium"
                style="margin-right: 15px;"
              >
                打印
              </el-button>
            </template>-->
            <template
              v-else-if="
                candidateInfo.interviewRegister === 0 &&
                  candidateInfo.interviewFill === 1 &&
                  candidateInfo.interview === 1
              "
            >
              <el-button
                type="primary"
                size="medium"
                style="margin-right: 15px;"
                @click="handlerConfirm"
              >
                确认面试登记表
              </el-button>
              <el-button
                size="medium"
                style="margin-right: 15px;"
                @click="handlerNotice"
              >
                通知TA修改
              </el-button>
              <el-dropdown
                trigger="click"
                @command="handleCommand"
              >
                <el-button
                  type="primary"
                  size="medium"
                >
                  更多
                  <i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-if="!isEdit"
                    command="modity"
                  >
                    帮TA修改
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="isEdit"
                    command="modity"
                  >
                    取消修改
                  </el-dropdown-item>
                  <!-- <el-dropdown-item>下载</el-dropdown-item>
                  <el-dropdown-item>打印</el-dropdown-item>-->
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <template
              v-else-if="
                candidateInfo.interviewRegister === 1 &&
                  candidateInfo.interviewFill === 1 &&
                  candidateInfo.interview === 1
              "
            >
              <el-button
                type="primary"
                size="medium"
                disabled
                style="margin-right: 15px;"
              >
                已确认
              </el-button>
              <!-- <el-button
                size="medium"
                style="margin-right: 15px;"
              >
                下载
              </el-button>
              <el-button
                size="medium"
                style="margin-right: 15px;"
              >
                打印
              </el-button>-->
            </template>
            <!-- <el-button
              v-if="!isEdit"
              type="primary"
              size="medium"
              style="margin-right: 15px;"
              @click="handlerEdit"
            >
              帮他修改
            </el-button>
            <el-button
              v-if="isEdit"
              type="primary"
              size="medium"
              style="margin-right: 15px;"
              @click="handlerEdit"
            >
              取消修改
            </el-button>-->
          </div>
          <div v-else>
            <template
              v-if="
                candidateInfo.entryRegister === 0 &&
                  candidateInfo.entryFill === 0 &&
                  candidateInfo.register === 1
              "
            >
              <el-button
                type="primary"
                size="medium"
                style="margin-right: 15px;"
                @click="handleSend"
              >
                重新发送入职登记表
              </el-button>
            </template>
            <!-- <template v-else-if="candidateInfo.status === '0'">
              <el-button
                size="medium"
                style="margin-right: 15px;"
              >
                下载
              </el-button>
              <el-button
                size="medium"
                style="margin-right: 15px;"
              >
                打印
              </el-button>
            </template>-->
            <template
              v-else-if="
                candidateInfo.entryRegister === 0 &&
                  candidateInfo.entryFill === 1 &&
                  candidateInfo.register === 1
              "
            >
              <el-button
                type="primary"
                size="medium"
                style="margin-right: 15px;"
                @click="handlerConfirm"
              >
                确认入职登记表
              </el-button>
              <el-button
                size="medium"
                style="margin-right: 15px;"
                @click="handlerNotice"
              >
                通知TA修改
              </el-button>
              <el-dropdown
                trigger="click"
                @command="handleCommand"
              >
                <el-button
                  type="primary"
                  size="medium"
                >
                  更多
                  <i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-if="!isEdit"
                    command="modity"
                  >
                    帮TA修改
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="isEdit"
                    command="modity"
                  >
                    取消修改
                  </el-dropdown-item>
                  <!-- <el-dropdown-item>下载</el-dropdown-item>
                  <el-dropdown-item>打印</el-dropdown-item>-->
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <template
              v-else-if="
                candidateInfo.entryRegister === 1 &&
                  candidateInfo.entryFill === 1 &&
                  candidateInfo.register === 1
              "
            >
              <el-button
                type="primary"
                size="medium"
                disabled
                style="margin-right: 15px;"
              >
                已确认
              </el-button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isEdit">
      <div class="basicInfo">
        <div class="title">
          基本信息
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
              <div>{{ filterData(basic[info.attribute], info.attribute) }}</div>
            </div>
          </div>
        </div>
        <div />
      </div>
      <div class="family">
        <div class="title">
          家庭信息
        </div>
        <div>
          <el-table
            ref="table"
            :data="familyData"
            stripe
            style="width: 100%"
          >
            <el-table-column
              v-for="(item, index) in familyAttr"
              :key="index"
              show-overflow-tooltip
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            >
              <template slot-scope="scope">
                <template v-if="item.prop === 'relationship'">
                  <div class="row">
                    {{ formatter(scope.row[item.prop], UserRelationship) }}
                  </div>
                </template>
                <template v-else>
                  {{ scope.row[item.prop] }}
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="contacts">
        <div class="title">
          紧急联系人
        </div>
        <div>
          <el-table
            ref="table"
            :data="emer"
            stripe
            style="width: 100%"
          >
            <el-table-column
              v-for="(item, index) in emerAttr"
              :key="index"
              show-overflow-tooltip
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            >
              <template slot-scope="scope">
                <template v-if="item.prop === 'relationship'">
                  <div class="row">
                    {{ formatter(scope.row[item.prop], UserRelationship) }}
                  </div>
                </template>
                <template v-else>
                  {{ scope.row[item.prop] }}
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="experience">
        <div class="title">
          教育经历
        </div>
        <div>
          <el-table
            ref="table"
            :data="EducationalData"
            stripe
            style="width: 100%"
          >
            <el-table-column
              v-for="(item, index) in attr"
              :key="index"
              show-overflow-tooltip
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            >
              <template slot-scope="scope">
                <template v-if="item.prop === 'educationalLevel'">
                  <div class="row">
                    {{ formatter(scope.row[item.prop], EducationalLevel) }}
                  </div>
                </template>
                <template v-else-if="item.prop === 'educationalType'">
                  <div class="row">
                    {{ formatter(scope.row[item.prop], EducationalType) }}
                  </div>
                </template>
                <template v-else>
                  {{ scope.row[item.prop] }}
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="work">
        <div class="title">
          工作经历
        </div>
        <div>
          <el-table
            ref="table"
            :data="workData"
            stripe
            style="width: 100%"
          >
            <el-table-column
              v-for="(item, index) in workAttr"
              :key="index"
              show-overflow-tooltip
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            >
              <template slot-scope="scope">
                <template v-if="item.prop === 'salary'">
                  <div class="row">
                    {{ scope.row[item.prop] }}元
                  </div>
                </template>
                <template v-else-if="item.prop === 'isSecret'">
                  <div class="row">
                    {{ scope.row[item.prop] === 1 ? '有' : '无' }}
                  </div>
                </template>
                <template v-else-if="item.prop === 'beginSecretDate'">
                  {{ scope.row.isSecret === 1 ? scope.row[item.prop] : ' ' }}
                </template>
                <template v-else-if="item.prop === 'content'">
                  {{ scope.row.isSecret === 1 ? scope.row[item.prop] : ' ' }}
                </template>
                <template v-else-if="item.prop === 'endSecretDate'">
                  {{ scope.row.isSecret === 1 ? scope.row[item.prop] : ' ' }}
                </template>
                <template v-else>
                  {{ scope.row[item.prop] }}
                </template>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="tip">
            与其它公司间有无守密义务或竞业禁止义务：{{ isSecret === 1 ? '有' : '无' }}
          </div> -->
        </div>
      </div>
      <div class="train">
        <div class="title">
          培训经历
        </div>
        <div>
          <el-table
            ref="table"
            :data="trainData"
            stripe
            style="width: 100%"
          >
            <el-table-column
              v-for="(item, index) in trainAttr"
              :key="index"
              show-overflow-tooltip
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            />
          </el-table>
        </div>
      </div>
      <div class="qualification">
        <div class="title">
          资格证书
        </div>
        <div>
          <el-table
            ref="table"
            :data="qualificationData"
            stripe
            style="width: 100%"
          >
            <el-table-column
              v-for="(item, index) in qualificationAttr"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            />
          </el-table>
        </div>
      </div>
    </div>
    <div v-else>
      <edit
        :modity="modity"
        :data="data"
        @close="handleClose"
        @refresh="getData"
      />
    </div>
    <notice-modify-register
      ref="noticeModifyRegister"
      :visible.sync="noticeModifyRegister"
      @refresh="getData"
    />
  </div>
</template>

<script>
import { getpersonInfo as getRegisterInfo } from '@/api/personnel/selectedPerson'
import { getCandidateAcceptDetail } from '@/api/personnel/entry'
import {
  getPersonInfo,
  getCandidateInfo,
  postRegisterSend,
  confirmInterviewRegister
} from '@/api/personnel/candidate'
import NoticeModifyRegister from './components/noticeModifyRegister'
import { getRecruitmentApply } from '@/api/approval/approval'
import edit from './registrationFormEdit'
export default {
  name: 'RegistrationForm',
  components: { edit, NoticeModifyRegister },
  data() {
    return {
      modity: true,
      isEdit: false,
      personInfo: {
        name: '',
        department: '',
        position: '',
        status: ''
      },
      data: {},
      potions: {
        form: this.basic
      },
      candidateInfo: {},
      basic: {
        name: '',
        sex: '',
        phonenum: '',
        email: '',
        idType: '',
        idNo: '',
        birthDate: '',
        educationalLevel: '',
        firstWorkDate: '',
        marriage: '',
        health: '',
        nation: '',
        politicalStatus: '',
        native: '',
        householdType: '',
        idAddress: '',
        userAddress: ''
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
          attribute: 'email',
          text: '邮箱'
        },
        {
          attribute: 'idType',
          text: '证件类型'
        },
        {
          attribute: 'idNo',
          text: '证件号码'
        },
        {
          attribute: 'birthDate',
          text: '出生日期'
        },
        {
          attribute: 'educationalLevel',
          text: '最高学历'
        },
        {
          attribute: 'firstWorkDate',
          text: '首次参加工作时间'
        },
        {
          attribute: 'marriage',
          text: '婚姻状况'
        },
        {
          attribute: 'health',
          text: '健康状况'
        },
        {
          attribute: 'nation',
          text: '民族'
        },
        {
          attribute: 'politicalStatus',
          text: '政治面貌'
        },
        {
          attribute: 'native',
          text: '籍贯'
        },
        {
          attribute: 'householdType',
          text: '户口类型'
        },
        {
          attribute: 'idAddress',
          text: '身份证地址'
        },
        {
          attribute: 'userAddress',
          text: '现住址'
        }
      ],
      familyData: [],
      familyAttr: [
        {
          prop: 'relationship',
          label: '关系'
        },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'companyName',
          label: '工作单位'
        },
        {
          prop: 'jobName',
          label: '职位'
        },
        {
          prop: 'phone',
          label: '联系电话'
        }
      ],
      emer: [],
      emerAttr: [
        {
          prop: 'name',
          label: '紧急联系人姓名'
        },
        {
          prop: 'relationship',
          label: '紧急联系人关系'
        },
        {
          prop: 'phone',
          label: '紧急联系人电话'
        }
      ],
      EducationalData: [],
      attr: [
        {
          prop: 'educationTime',
          label: '受教育时间'
        },
        {
          prop: 'schoolName',
          label: '学校名称'
        },
        {
          prop: 'majorName',
          label: '专业'
        },
        {
          prop: 'educationalLevel',
          label: '学历'
        },
        {
          prop: 'educationalType',
          label: '教育类型'
        }
      ],
      workData: [],
      workAttr: [
        {
          prop: 'workTime',
          label: '在职时间'
        },
        {
          prop: 'companyName',
          label: '单位名称'
        },
        {
          prop: 'jobName',
          label: '职位名称'
        },
        {
          prop: 'salary',
          label: '薪资'
        },
        {
          prop: 'witnessName',
          label: '证明人名称'
        },
        {
          prop: 'witnessPhone',
          label: '证明人电话'
        },
        {
          prop: 'isSecret',
          label: '守密竞业禁止义务'
        },
        {
          prop: 'beginSecretDate',
          label: '遵守义务开始日期'
        },
        {
          prop: 'endSecretDate',
          label: '遵守义务截止日期'
        },
        {
          prop: 'content',
          label: '具体内容'
        }
      ],
      trainData: [],
      trainAttr: [
        {
          prop: 'time',
          label: '培训日期'
        },
        {
          prop: 'name',
          label: '培训课程'
        },
        {
          prop: 'companyName',
          label: '培训机构'
        }
      ],
      qualificationData: [],
      qualificationAttr: [
        {
          prop: 'name',
          label: '证书名称'
        },
        {
          prop: 'code',
          label: '证书编号'
        },
        {
          prop: 'companyName',
          label: '发证机构'
        },
        {
          prop: 'issueDate',
          label: '发证日期'
        }
      ],
      idType: [],
      EducationalLevel: [],
      nation: [],
      PoliticalStatus: [],
      HouseholdType: [],
      UserRelationship: [],
      EducationalType: [],
      noticeModifyRegister: false
    }
  },
  created() {
    if (this.$route.query.entry) {
      Object.assign(this.basic, { bankName: '', bankNo: '', isFirstSs: '', isFirstEpf: '' })
      this.basicInfo.push(
        ...[
          { attribute: 'bankName', text: '开户银行名称' },
          { attribute: 'bankNo', text: '开户银行账号' },
          { attribute: 'isFirstSs', text: '本地首次缴纳社保' },
          { attribute: 'isFirstEpf', text: '本地首次缴纳公积金' }
        ]
      )
    }
  },
  mounted() {
    this.getData()
    this.$store.dispatch('CommonDict', 'idType').then((res) => {
      this.idType = res
    })
    this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
      this.EducationalLevel = res
    })
    this.$store.dispatch('CommonDict', 'Nation').then((res) => {
      this.nation = res
    })
    this.$store.dispatch('CommonDict', 'PoliticalStatus').then((res) => {
      this.PoliticalStatus = res
    })
    this.$store.dispatch('CommonDict', 'HouseholdType').then((res) => {
      this.HouseholdType = res
    })
    this.$store.dispatch('CommonDict', 'UserRelationship').then((res) => {
      this.UserRelationship = res
    })
    this.$store.dispatch('CommonDict', 'EducationalType').then((res) => {
      this.EducationalType = res
    })
  },
  methods: {
    value(typelist, data) {
      let value = ''
      typelist.map((item) => {
        if (item.dictKey === data) {
          value = item.dictValue
        }
      })
      return value
    },
    formatter(data, type) {
      let val = this.value(type, data)
      return val
    },
    /***
     * author guanfenda
     *
     * @desc 格式basec数据
     *
     * */
    filterData(data, key) {
      let params = ''
      switch (key) {
        case 'sex':
          params = data === 1 ? '男' : data === 0 ? '女' : ''
          break
        case 'idType':
          params = this.value(this.idType, data)
          break
        case 'educationalLevel':
          params = this.value(this.EducationalLevel, data)
          break
        case 'nation':
          params = this.value(this.nation, data)
          break
        case 'marriage':
          params = data === 2 ? '已婚已育' : data === 1 ? '已婚' : data === 0 ? '未婚' : ''
          break
        case 'politicalStatus':
          params = this.value(this.PoliticalStatus, data)
          break
        case 'householdType':
          params = this.value(this.HouseholdType, data)
          break
        case 'isFirstSs':
          params = data === 1 ? '是' : data === 0 ? '否' : ''
          break
        case 'isFirstEpf':
          params = data === 1 ? '是' : data === 0 ? '否' : ''
          break
        default:
          params = data
          break
      }
      return params
    },
    getData() {
      let params = {
        personId: this.$route.query.personId,
        recruitmentId: this.$route.query.recruitmentId
      }
      getRegisterInfo(params).then((res) => {
        this.data = res
        for (let key in this.basic) {
          this.basic[key] = res[key]
        }
        this.basic.native = res.nativeProvinceName + res.nativeCityName
        this.emer = res.emer
        this.familyData = res.family
        this.EducationalData = res.education
        this.EducationalData.map((it) => {
          it.educationTime = it.beginDate + ' ~ ' + it.endDate
        })
        this.workData = res.work
        this.workData.map((it) => {
          it.workTime = it.beginWorkDate + ' ~ ' + it.endWorkDate
        })
        this.trainData = res.train
        this.trainData.map((it) => {
          it.time = it.beginDate + ' ~ ' + it.endDate
        })
        this.qualificationData = res.certificate
        this.candidateInfo.interviewRegister = res.interviewRegister
        this.candidateInfo.entryRegister = res.entryRegister
        this.candidateInfo.interviewFill = res.interviewFill
        this.candidateInfo.entryFill = res.entryFill
      })
      if (this.$route.query.isUser || this.$route.query.isInterview) {
        this.$route.query.isUser
          ? (this.candidateInfo.register = 1)
          : (this.candidateInfo.interview = 1)
        getPersonInfo(params).then((res) => {
          this.personInfo.name = res.name
        })
        getRecruitmentApply(params).then((res) => {
          this.candidateInfo.recruitmentId = this.$route.query.recruitmentId
          this.personInfo.department = res.orgName
          this.personInfo.position = res.jobName
        })
      } else {
        let getPersonInfo = this.$route.query.entry ? getCandidateAcceptDetail : getCandidateInfo
        getPersonInfo(params)
          .then((res) => {
            this.candidateInfo = Object.assign(this.candidateInfo, res)
            this.personInfo.department = res.orgName
            this.personInfo.name = res.name
            this.personInfo.position = res.jobName
            this.personInfo.status = {
              '0': '已淘汰',
              '1': '待沟通',
              '2': '初选通过',
              '3': '面试中',
              '4': '面试通过',
              '5': '待发Offer',
              '6': '已发Offer',
              '7': '待入职',
              '8': '放弃入职'
            }[res.status]
          })
          .catch(() => {
            this.$message.error('查无此人')
            this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
            this.$router.go(-1)
          })
      }
    },
    handleCommand(command) {
      if (command === 'modity') {
        this.handlerEdit()
      }
    },
    handleClose() {
      this.isEdit = !this.isEdit
    },
    handlerEdit() {
      this.isEdit = !this.isEdit
    },
    handleBack() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
    },
    handleSend() {
      let params = {
        recruitmentId: this.candidateInfo.recruitmentId,
        personId: this.$route.query.personId,
        type: this.$route.query.entry ? 'Entry' : 'Interview'
      }
      postRegisterSend(params).then(() => {
        this.$message.success('发送成功')
        this.getData()
      })
    },
    handlerNotice() {
      let params = {
        personId: this.$route.query.personId,
        recruitmentId: this.candidateInfo.recruitmentId
      }
      this.$route.query.entry
        ? this.$refs.noticeModifyRegister.noticeEntry(params)
        : this.$refs.noticeModifyRegister.noticeInterview(params)
    },
    handlerConfirm() {
      this.$confirm(
        `确认后将按面试登记表信息更新候选人信息，您确定要确认${
          this.$route.query.entry ? '入职' : '面试'
        }登记表吗？`,
        `确认${this.$route.query.entry ? '入职' : '面试'}登记表？`,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        let params = {
          recruitmentId: this.candidateInfo.recruitmentId,
          personId: this.$route.query.personId,
          type: this.$route.query.entry ? 'Entry' : 'Interview'
        }
        confirmInterviewRegister(params).then(() => {
          this.$message.success('确认成功')
          this.isEdit = false
          this.getData()
        })
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
  padding-top: 14px;
}
.person {
  background: #ffffff;
  border-radius: 4px;
  height: 102px;
  padding: 24px;
  margin-top: 15px;
  box-sizing: border-box;
  .name {
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #333333;
    line-height: 30px;
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
  padding: 0 24px 15px 24px;
  .attribute {
    div {
      /*width: 200px;*/
      padding: 15px 0;
      font-size: 14px;
    }
    div:first-child {
      color: #718199;
    }
    div:nth-child(2) {
      color: #202940;
      /*width: 230px;*/
    }
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

.flexs {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  font-size: 14px;
  /*margin-left: 100px;*/
}
.family,
.qualification,
.train,
.work,
.experience,
.contacts {
  margin-top: 16px;
  background: #ffffff;
  border-radius: 4px;
  padding: 0 24px 24px 24px;
  margin-bottom: 20px;
  .title {
    height: 52px;
    font-size: 16px;
    color: #202940;
    line-height: 52px;
    border-bottom: 1px solid #e3e7e9;
    margin-bottom: 20px;
  }
}
.work {
  padding: 0 24px 0px 24px;
}
.family {
  /*margin-bottom: 60px;*/
}
.tip {
  color: #a0a8ae;
  font-size: 14px;
  line-height: 46px;
}
.back {
  cursor: pointer;
}
</style>

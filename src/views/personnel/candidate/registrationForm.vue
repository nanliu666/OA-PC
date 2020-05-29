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
          <div>
            {{ personInfo.department }}
          </div>
          <div>{{ personInfo.position }}</div>
          <div>
            {{ personInfo.status }}
          </div>
        </div>
        <div class="flex flex-items flex-flow">
          <div>
            <el-button
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
            </el-button>
          </div>
          <div class="icon">
            <span> <i class="el-icon-download" />下载</span>
            <span><i class="el-icon-printer" />打印</span>
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
              <div>{{ basic[info.attribute] }}</div>
            </div>
          </div>
        </div>
        <div />
      </div>
      <div class="contacts">
        <div class="title">
          紧急联系人
        </div>
        <div>
          <el-table
            ref="table"
            :data="contactsData"
            stripe
            style="width: 100%"
          >
            <el-table-column
              v-for="(item, index) in contactsAttr"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            />
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
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            />
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
            :data="EducationalData"
            stripe
            style="width: 100%"
          >
            <el-table-column
              v-for="(item, index) in workAttr"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            />
          </el-table>
          <div class="tip">
            与其它公司间有无守密义务或竞业禁止义务：无
          </div>
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
        @close="handleClose"
      />
    </div>
  </div>
</template>

<script>
import edit from './registrationFormEdit'
export default {
  name: 'RegistrationForm',
  components: { edit },
  data() {
    return {
      modity: true,
      isEdit: false,
      personInfo: {
        name: '张琪',
        department: 'ucd部门',
        position: 'ue设计师',
        status: '面试中'
      },
      basic: {
        name: '张琪',
        six: '男',
        age: 23,
        marriage: '已婚',
        birth: '1998',
        height: '188cm',
        weight: '70kg',
        education: '本科',
        adress: '广东省阳江市阳西县溪头镇丰头村委会东红村22号',
        contacts: '张良',
        type: '城镇',
        PresentAddress: '广州市黄埔区新西发士大夫',
        relatives: '有',
        telephtone: '15089906928'
      },
      basicInfo: [
        {
          attribute: 'name',
          text: '姓名'
        },
        {
          attribute: 'six',
          text: '性别'
        },
        {
          attribute: 'age',
          text: '年龄'
        },
        {
          attribute: 'marriage',
          text: '婚姻状况'
        },
        {
          attribute: 'birth',
          text: '出生日期'
        },
        {
          attribute: 'height',
          text: '身高'
        },
        {
          attribute: 'weight',
          text: '体重'
        },
        {
          attribute: 'education',
          text: '最高学历'
        },
        {
          attribute: 'adress',
          text: '身份证地址'
        },
        {
          attribute: 'type',
          text: '户口类型'
        },
        {
          attribute: 'contacts',
          text: '紧急联系人'
        },
        {
          attribute: 'PresentAddress',
          text: '现住址'
        },
        {
          attribute: 'relatives',
          text: '是否有亲属再本公司工作'
        },
        {
          attribute: 'telephtone',
          text: '紧急电话'
        }
      ],
      contactsData: [
        {
          name: '张良',
          relationship: '父亲',
          telephone: '15915988899'
        },
        {
          name: '张良',
          relationship: '父亲',
          telephone: '15915988899'
        },
        {
          name: '张良',
          relationship: '父亲',
          telephone: '15915988899'
        }
      ],
      contactsAttr: [
        {
          prop: 'name',
          label: '紧急联系人姓名'
        },
        {
          prop: 'relationship',
          label: '紧急联系人关系'
        },
        {
          prop: 'telephone',
          label: '紧急联系人电话'
        }
      ],
      EducationalData: [
        {
          educationTime: '2012-09-15至2016-06-15',
          schoolName: '广州大学',
          major: '计算机信息工程',
          education: '本科',
          typesOfducation: '统招'
        },
        {
          educationTime: '2012-09-15至2016-06-15',
          schoolName: '广州大学',
          major: '计算机信息工程',
          education: '本科',
          typesOfducation: '统招'
        },
        {
          educationTime: '2012-09-15至2016-06-15',
          schoolName: '广州大学',
          major: '计算机信息工程',
          education: '本科',
          typesOfducation: '统招'
        }
      ],
      workData: [
        {
          educationTime: '2012-09-15至2016-06-15',
          schoolName: '腾讯科技(深圳)有限公司',
          major: '工业设计工程',
          education: '30k/月',
          typesOfducation: '统招',
          fixedTelephone: '5567515'
        },
        {
          educationTime: '2012-09-15至2016-06-15',
          schoolName: '腾讯科技(深圳)有限公司',
          major: '工业设计工程',
          education: '30k/月',
          typesOfducation: '统招',
          fixedTelephone: '5567515'
        },
        {
          educationTime: '2012-09-15至2016-06-15',
          schoolName: '腾讯科技(深圳)有限公司',
          major: '工业设计工程',
          education: '30k/月',
          typesOfducation: '统招',
          fixedTelephone: '5567515'
        }
      ],
      workAttr: [
        {
          prop: 'educationTime',
          label: '在职时间'
        },
        {
          prop: 'schoolName',
          label: '单位名称'
        },
        {
          prop: 'major',
          label: '职位名称'
        },
        {
          prop: 'education',
          label: '薪资'
        },
        {
          prop: 'typesOfducation',
          label: '单位联系人'
        },
        {
          prop: 'fixedTelephone',
          label: '固定电话'
        }
      ],
      trainData: [
        {
          time: '2017-09 至 2019-06',
          curriculum: '中国体验设计大会',
          organ: '上海易宝软件有限公司'
        },
        {
          time: '2017-09 至 2019-06',
          curriculum: '中国体验设计大会',
          organ: '上海易宝软件有限公司'
        },
        {
          time: '2017-09 至 2019-06',
          curriculum: '中国体验设计大会',
          organ: '上海易宝软件有限公司'
        }
      ],
      trainAttr: [
        {
          prop: 'time',
          label: '受教育'
        },
        {
          prop: 'curriculum',
          label: '培训课程'
        },
        {
          prop: 'organ',
          label: '培训机构'
        }
      ],
      qualificationData: [
        {
          name: '计算机8级',
          code: 'JSJ02231',
          organ: '广州市教育局',
          time: '2019-12-01'
        },
        {
          name: '计算机8级',
          code: 'JSJ02231',
          organ: '广州市教育局',
          time: '2019-12-01'
        },
        {
          name: '计算机8级',
          code: 'JSJ02231',
          organ: '广州市教育局',
          time: '2019-12-01'
        }
      ],
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
          prop: 'organ',
          label: '发证机构'
        },
        {
          prop: 'time',
          label: '发证日期'
        }
      ],
      familyData: [
        {
          relationship: '弟弟',
          name: '王嘉尔',
          age: '23',
          workUnit: '腾讯科技(深圳)有限公司',
          post: '工业设计工程',
          fixedTelephone: '13989088767'
        },
        {
          relationship: '弟弟',
          name: '王嘉尔',
          age: '23',
          workUnit: '腾讯科技(深圳)有限公司',
          post: '工业设计工程',
          fixedTelephone: '13989088767'
        },
        {
          relationship: '弟弟',
          name: '王嘉尔',
          age: '23',
          workUnit: '腾讯科技(深圳)有限公司',
          post: '工业设计工程',
          fixedTelephone: '13989088767'
        }
      ],
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
          prop: 'workUnit',
          label: '工作单位'
        },
        {
          prop: 'post',
          label: '职务'
        },
        {
          prop: 'fixedTelephone',
          label: '固定电话'
        }
      ],
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
          prop: 'major',
          label: '专业'
        },
        {
          prop: 'education',
          label: '学历'
        },
        {
          prop: 'typesOfducation',
          label: '教育类型'
        }
      ]
    }
  },
  methods: {
    handleClose() {
      this.isEdit = !this.isEdit
    },
    handlerEdit() {
      this.isEdit = !this.isEdit
    },
    handleBack() {
      this.$router.go(-1)
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
  margin-bottom: 60px;
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

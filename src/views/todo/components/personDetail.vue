<template>
  <div>
    <div class="title">
      候选人信息
    </div>
    <div
      v-loading="loading"
      class="info--wr"
    >
      <div
        v-for="item in columns"
        :key="item.prop"
        class="item"
      >
        <div class="label">
          {{ item.label }}
        </div>
        <div class="value">
          <el-link
            v-if="item.prop === 'resume' && personData.resumeUrl"
            type="primary"
            target="_blank"
            :href="personData.resumeUrl"
          >
            {{ personData.name }}的简历
          </el-link>
          <el-link
            v-if="item.prop === 'attach' && personData.attachmentUrl"
            type="primary"
            target="_blank"
            :href="personData.attachmentUrl"
          >
            {{ personData.attachmentName }}
          </el-link>
          <span v-else>{{
            item.formatter ? item.formatter(personData) : personData[item.prop]
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPersonInfo } from '@/api/personnel/person'
import { createUniqueID } from '@/util/util'
export default {
  name: 'PersonDetail',
  props: {
    personId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      personData: {},
      columns: [
        {
          label: '应聘职位',
          prop: 'jobName'
        },
        {
          label: '应聘部门',
          prop: 'orgName'
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '性别',
          prop: 'sex',
          formatter: (personData) => {
            return ['女', '男'][parseInt(personData.sex)]
          }
        },
        {
          label: '年龄',
          prop: 'age',
          formatter: (personData) => {
            return personData.age ? `${personData.age}岁` : ''
          }
        },
        {
          label: '手机号码',
          prop: 'phonenum'
        },
        {
          label: '邮箱',
          prop: 'email'
        },
        {
          label: '目前所在地',
          prop: 'address',
          formatter: (personData) => {
            return `${personData.proviceName || ''}${personData.cityName || ''}`
          }
        },
        {
          label: '最高学历',
          prop: 'educationalLevel',
          formatter: (personData) => {
            return this.educationalDict[personData.educationalLevel]
          }
        },
        {
          label: '毕业学校',
          prop: 'university'
        },
        {
          label: '毕业专业',
          prop: 'major'
        },
        {
          label: '工作年限',
          prop: 'workAge'
        },
        {
          label: '最近工作单位',
          prop: 'lastCompany'
        },
        {
          label: '应聘渠道',
          prop: 'recruitment',
          formatter: (personData) => {
            return this.recruitmentDict[personData.recruitment]
          }
        },
        {
          label: '期望薪资',
          prop: 'monthSalary'
        },
        {
          label: '',
          prop: createUniqueID()
        },
        {
          label: '简历',
          prop: 'resume'
        },
        {
          label: '附件',
          prop: 'attach'
        },
        {
          label: '备注',
          prop: 'remark'
        }
      ],
      educationalDict: {},
      recruitmentDict: {}
    }
  },
  watch: {
    personId: {
      handler(val) {
        val && this.getPersonInfo(val)
        // this.getPersonInfo('1263731939027013634')
      },
      immediate: true
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    getDict() {
      this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
        res.forEach((item) => {
          this.educationalDict[item.dictKey] = item.dictValue
        })
      })
      this.$store.dispatch('CommonDict', 'RecruitmentChannel').then((res) => {
        res.forEach((item) => {
          this.recruitmentDict[item.dictKey] = item.dictValue
        })
      })
    },
    getPersonInfo(personId) {
      this.loading = true
      getPersonInfo(personId)
        .then((res) => {
          this.personData = res
          this.$emit('update', res)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
  color: #202940;
  margin-top: 24px;
}
.info--wr {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  padding-bottom: 24px;
  .item {
    width: 50%;
    display: flex;
    align-items: center;
    padding: 8px 0;
    .label {
      width: 50%;
      text-align: right;
      padding-right: 10px;
    }
    .value {
      width: 50%;
      text-align: left;
      padding-left: 10px;
    }
  }
}
.label {
  color: #718199;
}
</style>

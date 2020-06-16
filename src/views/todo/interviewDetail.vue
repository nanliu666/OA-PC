<template>
  <div class="fill">
    <page-header
      title="面试详情"
      show-back
    />
    <basic-container block>
      <!-- 头部 -->
      <div
        v-loading="loading"
        class="header"
      >
        <div class="name-row">
          <div class="name-box">
            {{ personData.name }} （ {{ personData.jobName }} ） 的面试
          </div>
          <div class="btn-box">
            <el-button
              v-if="InterviewInfo.status == 'UnEvaluate'"
              type="primary"
              size="medium"
              @click="goToInterEdit"
            >
              面试评价
            </el-button>
          </div>
        </div>
        <div class="info-row">
          <div>
            发起人: <span>{{ InterviewInfo.pushName }}</span>
          </div>
          <div>
            发起时间: <span>{{ InterviewInfo.pushTime }}</span>
          </div>
          <div>
            状态: <span class="status-box">{{ InterviewInfo.status | filterStatus }}</span>
          </div>
        </div>
      </div>
      <!-- 面试评价 -->
      <div
        v-if="InterviewInfo.status !== 'UnEvaluate'"
        v-loading="loading"
        class="evaluate-wrap"
      >
        <div class="title">
          面试评价
        </div>
        <div class="evaluate-detali">
          <div
            v-for="item in evaluateList"
            :key="item.name"
            class="evaluate-detali-item"
          >
            <div class="label">
              {{ item.label }}
            </div>
            <div class="detail">
              {{ item.detail | filterStatus }}
            </div>
          </div>
        </div>
      </div>
      <!-- 面试信息 -->
      <div class="evaluate-wrap">
        <div class="title">
          面试信息
        </div>
        <div class="evaluate-detali">
          <div
            v-for="item in interviewList"
            :key="item.name"
            class="evaluate-detali-item"
          >
            <div class="label">
              {{ item.label }}
            </div>
            <div class="detail">
              {{ item.detail | filterType }}
            </div>
          </div>
        </div>
      </div>
      <!-- 候选人信息 -->
      <div class="person-detail">
        <person-detail
          :person-id="InterviewInfo.personId"
          @update="updatePersonData"
        />
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getInterviewInfo } from '@/api/todo/todo'
import { interviewStatusCN, interviewTypeCN } from '@/const/todo'
export default {
  filters: {
    filterStatus(value) {
      return interviewStatusCN[value] || value
    },
    filterType(value) {
      return interviewTypeCN[value] || value
    }
  },
  components: {
    PersonDetail: () => import('./components/personDetail')
  },
  data() {
    return {
      // 面试详情信息
      InterviewInfo: {
        // id: '',
        // pushUser: '',
        // pushName: '',
        // pushTime: '',
        // status: '',
        // interviewUser: '',
        // interviewName: '',
        // interviewTime: '',
        // interviewType: '',
        // name: '',
        // phonenum: '',
        // address: '',
        // remark: '',
        // interview: '',
        // recruitmentId: '',
        // personId: '',
        // evaluateTime: '',
        // workBackground: '',
        // workExperience: '',
        // knowledge: '',
        // train: '',
        // specialty: '',
        // evaluation: '',
        // score: '',
        // jobName: ''
      },
      //面试评价信息
      evaluateList: [
        {
          label: '工作背景:',
          name: 'workBackground',
          detail: ''
        },
        {
          label: '工作经验:',
          name: 'workExperience',
          detail: ''
        },
        {
          label: '岗位知识:',
          name: 'knowledge',
          detail: ''
        },
        {
          label: '教育培训:',
          name: 'train',
          detail: ''
        },
        {
          label: '专业特长:',
          name: 'specialty',
          detail: ''
        },
        {
          label: '面试评价:',
          name: 'evaluation',
          detail: ''
        },
        {
          label: '综合打分:',
          name: 'score',
          detail: ''
        },
        {
          label: '录用建议:',
          name: 'status',
          detail: ''
        },
        {
          label: '评价时间:',
          name: 'evaluateTime',
          detail: ''
        }
      ],
      // 面试信息
      interviewList: [
        {
          label: '面试人:',
          name: 'interviewName',
          detail: ''
        },
        {
          label: '面试时间:',
          name: 'interviewTime',
          detail: ''
        },
        {
          label: '面试方式:',
          name: 'interviewType',
          detail: ''
        },
        {
          label: '面试地址:',
          name: 'address',
          detail: ''
        }
      ],
      loading: false,
      personData: {}
    }
  },
  created() {
    this.getDataInfo()
  },
  methods: {
    //获取面试详情信息
    async getDataInfo() {
      this.loading = true
      let { id } = this.$route.query
      this.InterviewInfo = await getInterviewInfo({ id }).finally(() => {
        this.loading = false
      })
      this.evaluateList.forEach((item) => {
        return (item.detail = this.InterviewInfo[item.name])
      })
      this.interviewList.forEach((item) => {
        return (item.detail = this.InterviewInfo[item.name])
      })
    },
    // go录用评价
    goToInterEdit() {
      let { id, name } = this.InterviewInfo
      this.$router.push({
        path: '/todo/interviewEdit',
        query: { id, name }
      })
    },
    updatePersonData(personData) {
      this.personData = personData
    }
  }
}
</script>

<style lang="scss" scoped>
// 头部
.header {
  border-bottom: 1px solid #e3e7e9;
  .name-row {
    display: flex;
    justify-content: space-between;
    .name-box {
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #202940;
      line-height: 23px;
      font-weight: bold;
    }
  }
  .info-row {
    margin: 16px 0 30px 0;
    display: flex;
    justify-content: start;
    line-height: 14px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #202940;
    div {
      margin-right: 48px;
      span {
        margin-left: 20px;
      }
    }
  }
}
// 面试评价
.evaluate-wrap {
  padding-bottom: 8px;
  border-bottom: 1px solid #e3e7e9;

  .title {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #202940;
    letter-spacing: 0;
    font-weight: bold;
    margin-top: 30px;
  }
  .evaluate-detali {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    .evaluate-detali-item {
      display: flex;
      justify-content: center;
      width: 50%;
      div {
        width: 50%;
        margin: 8px 0;
      }

      .label {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #718199;
        text-align: right;
      }
      .detail {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #202940;
        padding-left: 10px;
      }
    }
  }
}
.person-detail {
  border-bottom: 1px solid #e3e7e9;
}
.basic-container--block {
  height: calc(100% - 82px);
  min-height: calc(100% - 82px);
}
</style>

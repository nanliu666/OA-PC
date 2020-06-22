<template>
  <div class="fill">
    <page-header
      title="面试评价"
      show-back
    />
    <basic-container
      v-loading="loading"
      block
    >
      <div class="headers">
        <div class="title">
          {{ info.name }}
        </div>
        <div class="nav flex flex-flow flex-justify-start">
          <span>用人部门：{{ info.orgName }}</span>
          <span>应聘职位：{{ info.jobName }}</span>
        </div>
      </div>
      <div class="content ">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            v-for="item in InterviewInfo"
            :key="item.id"
            :label="item.label"
          >
            <div class="basicInfo">
              <div class="title">
                面试信息
              </div>
              <div
                v-if="item.status === 'Pass'"
                class="iconfont"
              >
                <svg
                  class="imgs icon"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-adopt-outlined" />
                </svg>
              </div>
              <div
                v-else
                class="iconfont"
              >
                <svg
                  class="imgs icon"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-eliminate-outlined" />
                </svg>
              </div>

              <div class="basic">
                <div class="flexs">
                  <div
                    v-for="(info, index) in interviewList"
                    :key="index"
                    class="attribute flex flex-flow flex-items"
                  >
                    <div style="text-align: right">
                      {{ info.label }}：
                    </div>
                    <div>{{ item[info.name] }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="basicInfo">
              <div class="title">
                面试评价
              </div>
              <div class="basic">
                <div class="flexs">
                  <div
                    v-for="(info, index) in evaluateList"
                    :key="index"
                    class="attribute flex flex-flow flex-items"
                  >
                    <div style="text-align: right">
                      {{ info.label }}：
                    </div>
                    <div>{{ formmat(item[info.name], info.name) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getInterviewList } from '@/api/todo/todo'
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
  components: {},
  data() {
    return {
      activeName: 0,
      // 面试详情信息
      InterviewInfo: {},
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
      personData: {},
      info: {
        name: '',
        orgName: '',
        jobName: ''
      }
    }
  },
  created() {
    this.getDataInfo()
    // orgName:data.orgName,
    //   jobName:data.jobName,
    //   name:data.name
    this.info = {
      ...this.$route.query
    }
  },
  methods: {
    formmat(data, status) {
      let val = ''
      if (status === 'status') {
        val = data === 'Pass' ? '通过' : '淘汰'
      } else {
        val = data
      }
      return val
    },
    handleClick() {},
    //获取面试详情信息
    async getDataInfo() {
      // let { personId } = this.$route.query.personId
      let params = {
        personId: this.$route.query.personId
      }
      this.loading = true
      this.InterviewInfo = await getInterviewList(params).finally(() => {
        this.loading = false
      })
      this.InterviewInfo.map((it, i) => {
        let index = i + 1
        it.label = index + '轮面试'
      })
      // this.evaluateList.forEach((item) => {
      //   return (item.detail = this.InterviewInfo[item.name])
      // })
      // this.interviewList.forEach((item) => {
      //   return (item.detail = this.InterviewInfo[item.name])
      // })
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
.headers {
  margin-bottom: 20px;
  .title {
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
    span:not(:first-child) {
      margin-left: 15px;
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

.basicInfo {
  margin-top: 16px;
  background: #ffffff;
  border-radius: 4px;
  padding: 0px 24px 15px 24px;
  position: relative;
  .iconfont {
    .icon {
      position: absolute;
      top: 0;
      right: 100px;
      font-size: 100px;
    }
  }

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
    /*border-bottom: 1px solid #e3e7e9;*/
    margin-bottom: 0px;
  }
}
/deep/.el-tabs__nav {
  margin-left: 20px;
  font-size: 16px;
}
</style>

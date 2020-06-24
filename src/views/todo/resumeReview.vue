<template>
  <div class="fill">
    <page-header
      title="简历审核"
      show-back
    />
    <basic-container block>
      <div class="inner-header">
        <div class="title">
          {{ personData.name }}（{{ personData.jobName }}）的简历审核
        </div>
        <div
          v-if="resumeData.status === 'UnCheck'"
          class="button-wr"
        >
          <el-button
            type="primary"
            size="medium"
            class="pass"
            @click="handlePass"
          >
            通过
          </el-button>
          <el-button
            size="medium"
            type="danger"
            @click="handleReject"
          >
            淘汰
          </el-button>
        </div>
      </div>
      <div class="short-info">
        <span class="item">
          <span class="label">发起人:</span>
          <span>{{ resumeData.pushName }}</span>
        </span>
        <span class="item">
          <span class="label">发起时间:</span>
          <span>{{ resumeData.pushTime }}</span>
        </span>
        <span class="item">
          <span class="label">状态:</span>
          <span class="status">{{ statusDict[resumeData.status] }}</span>
        </span>
      </div>
      <div
        v-if="resumeData.checkTime"
        class="info"
      >
        <div class="title">
          审核信息
        </div>
        <div class="items">
          <span class="item">
            <span class="label">审核人</span>
            <span class="value">{{ resumeData.checkName }}</span>
          </span>
          <span class="item">
            <span class="label">备注</span>
            <span class="value">{{ resumeData.checkRemark }}</span>
          </span>
          <span class="item">
            <span class="label">审核时间</span>
            <span class="value status">{{ resumeData.checkTime }}</span>
          </span>
        </div>
      </div>
      <div class="info">
        <div class="title">
          推送信息
        </div>
        <div class="items">
          <span class="item">
            <span class="label">推送人</span>
            <span class="value">{{ resumeData.pushName }}</span>
          </span>
          <span class="item">
            <span class="label">备注</span>
            <span class="value">{{ resumeData.pushRemark }}</span>
          </span>
          <span class="item">
            <span class="label">推送时间</span>
            <span class="value status">{{ resumeData.pushTime }}</span>
          </span>
        </div>
      </div>
      <person-detail
        :person-id="resumeData.personId"
        @update="updatePersonData"
      />
      <resume-pass
        :id="id"
        ref="resumePass"
        :visible.sync="passVisible"
        @submit="getResumeData"
      />
      <resume-reject
        :id="id"
        ref="resumeReject"
        :visible.sync="rejectVisible"
        @submit="getResumeData"
      />
    </basic-container>
  </div>
</template>
<script>
// UnCheck-待审核，Pass-通过，Reject-淘汰，Cancel-已撤销
const statusDict = {
  UnCheck: '待审核',
  Pass: '通过',
  Reject: '淘汰',
  Cancel: '已撤销'
}
import { getResumeCheck } from '@/api/todo/todo'
export default {
  name: 'ResumeReview',
  components: {
    PersonDetail: () => import('./components/personDetail'),
    resumePass: () => import('./components/resumePass'),
    resumeReject: () => import('./components/resumeReject')
  },
  data() {
    return {
      id: null,
      resumeData: {},
      statusDict,
      passVisible: false,
      rejectVisible: false,
      personData: {}
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getResumeData()
  },
  activated() {
    this.id = this.$route.query.id
    this.getResumeData()
  },
  methods: {
    getResumeData() {
      getResumeCheck(this.id).then((res) => {
        this.resumeData = res
      })
    },
    handlePass() {
      this.$refs.resumePass.init()
    },
    handleReject() {
      this.$refs.resumeReject.init()
    },
    updatePersonData(personData) {
      this.personData = personData
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-container--block {
  height: calc(100% - 92px);
  min-height: calc(100% - 92px);
}
.inner-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 11px;
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .button-wr {
    .pass {
      margin-right: 12px;
    }
  }
}
.label {
  color: #718199;
}
.short-info {
  .item {
    margin-right: 48px;
    .label {
      margin-right: 20px;
    }
    .status {
      font-size: 16px;
    }
  }
}
.info {
  border-bottom: 1px solid #e3e7e9;
  padding-bottom: 16px;
  .title {
    font-weight: bold;
    color: #202940;
    margin-top: 24px;
  }
  .items {
    font-size: 14px;
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
}
</style>

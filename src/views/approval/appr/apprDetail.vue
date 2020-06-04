<template>
  <div>
    <page-header
      :title="title"
      show-back
    />
    <!-- 用户提交的申请 -->
    <basic-container>
      <!-- 申请信息 -->
      <div class="apply-info-wrap">
        <div class="title">
          黄浩提交的录用申请
        </div>
        <div class="info">
          <div class="num-box">
            <div>审批编号：</div>
            <div>{{ ApplyInfo.apprNo }}</div>
          </div>
          <div class="apply-user-box">
            <div>申请人：</div>
            <div>{{ ApplyInfo.userName }}</div>
          </div>
          <div class="apply-time">
            <div>申请时间：</div>
            <div>{{ ApplyInfo.applyTime }}</div>
          </div>
          <div class="apply-status">
            <div>状态</div>
            <div>{{ ApplyInfo.status | filterstatus }}</div>
          </div>
        </div>
      </div>
    </basic-container>
    <!-- 申请详情标题 -->
    <basic-container class="apply-detail-title">
      <div
        class="title-box"
        @click="show = !show"
      >
        <div class="title">
          审批详情
        </div>
        <div class="btn-box">
          <i
            class="el-icon-arrow-up"
            style="margin-right:12px"
          /> 收起
        </div>
      </div>
    </basic-container>
    <!-- 申请详情 -->
    <transition name="show">
      <basic-container
        v-show="show"
        class="apply-detail"
      >
        <!-- 基础信息 -->
        <div class="Basics-box" />
      </basic-container>
    </transition>
  </div>
</template>

<script>
import { getApplyDetail } from '@/api/approval/approval'
export default {
  filters: {
    // 过滤审批状态
    filterstatus: (status) => {
      if (status === 'Approve') {
        return '审批中'
      } else if (status === 'Pass') {
        return '已通过'
      } else if (status === 'Reject') {
        return '已拒绝'
      } else if (status === 'Cancel') {
        return '已撤回'
      }
    }
  },
  data() {
    return {
      // apprNo formId formKey  用户提交的申请
      apprInfo: this.$route.query,
      ApplyInfo: {
        apprNo: '',
        userName: '',
        applyTime: '',
        status: ''
      },
      // 申请详情
      // 控制申请详情是否显示
      show: true
    }
  },
  computed: {
    // 标题
    title() {
      let title = ''
      if (this.apprInfo.formKey === 'Recruitment') {
        return (title = '招聘需求申请')
      } else if (this.apprInfo.formKey === 'PersonOfferApply') {
        return '录用申请'
      } else if (this.apprInfo.formKey === 'UserFormalInfo') {
        return (title = '转正申请')
      } else if (this.apprInfo.formKey === 'UserContractInfo') {
        return (title = '续签合同申请')
      } else if (this.apprInfo.formKey === 'UserLeaveInfo') {
        return (title = '离职申请')
      } else if (this.apprInfo.formKey === 'UserChangeInfo') {
        return (title = '人事异动申请')
      }
    }
  },
  created() {
    this.getApplyInfo()
  },
  methods: {
    // 获取用户申请详情
    async getApplyInfo() {
      let res = await getApplyDetail(this.apprInfo)
      this.ApplyInfo = res
      // console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
// 用户提交的申请
.apply-info-wrap {
  .title {
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #333333;
    font-weight: bold;
  }
  .info {
    display: flex;
    justify-content: space-between;
    & > div {
      margin-top: 16px;
      height: 43px;
    }
    & > div :first-child {
      margin-bottom: 7px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #545b66;
    }
    & > div :last-child {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #a1a7ae;
    }
    .num-box {
      flex: 1;
      border-left: 1px solid #e3e7e9;
    }
    .apply-user-box {
      text-align: center;
      flex: 1;
      border-left: 1px solid #e3e7e9;
    }
    .apply-time {
      text-align: center;
      flex: 1.5;
      border-left: 1px solid #e3e7e9;
    }
    .apply-status {
      text-align: end;
      flex: 0.5;
      :nth-child(2) {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #368afa;
        font-weight: bold;
      }
    }
  }
}
// 申请详情标题
.apply-detail-title {
  margin-top: 24px;
  margin-bottom: 2px;
  .title-box {
    display: flex;
    justify-content: space-between;

    // border-bottom: #c6cbce solid 1px;
    .title {
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #333333;
      font-weight: bold;
    }
    .btn-box {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #757c85;
      text-align: right;
      cursor: pointer;
    }
  }
}

.show-enter-active,
.show-leave-active {
  transition: opacity 0.5s;
}
.show-enter, .show-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

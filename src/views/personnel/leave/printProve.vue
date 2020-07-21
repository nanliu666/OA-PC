<template>
  <div v-loading="loading">
    <page-header
      title="离职证明"
      show-back
      :back="goBack"
    />
    <div class="btn-wrap">
      <div class="btn-box">
        <el-button
          type="primary"
          size="medium"
          @click="handelClick('#print-prove')"
        >
          打印
        </el-button>
        <!-- <el-button size="medium" @click="handelClick">
					下载
				</el-button> -->
      </div>
    </div>
    <div>
      <div
        id="print-prove"
        class="main"
      >
        <div>
          <h3 style="text-align:center">
            离 职 证 明
          </h3>
          <div class="detail-wrap">
            <p class="detail">
              <span class="item"> {{ userInfo.name }}</span>
              <span
                v-if="userInfo.idNo"
                class="item"
              >{{
                userInfo.idNo ? `（身份证号： ${userInfo.idNo} ）` : ''
              }}</span>
              于 <span class="item">{{ userInfo.entryDate }}</span> 入职我公司，在我公司
              <span class="item">{{ userInfo.orgName }}</span> 任
              <span class="item"> {{ userInfo.jobName }}</span>。现协商解除劳动合同关系，并于
              <span class="item">{{ userInfo.relieveDate }}</span> 日协商解除，不再履行。自
              {{ userInfo.leaveDate }}
              日起，双方不再存在任何劳动关系，也不存在任何赔偿，补偿，劳动报酬，保险，福利等方面的权利请求和争议。
            </p>
            <p class="prove-box">
              特此证明
            </p>
            <p class="companyName-box">
              公司名称 <span class="item">{{ userInfo.companyName }}</span>
            </p>
            <p class="data-box">
              <span class="item">{{ userInfo.printDate }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLeaveCert } from '@/api/leave/leave'
export default {
  data() {
    return {
      userInfo: {
        // userId: '用户ID',
        // workNo: '工号',
        // name: '张三丰',
        // idType: '证件类型，字典组：IDType',
        // idNo: '445678913635816589723',
        // companyId: '入职公司ID',
        // companyName: '入职公司名称',
        // orgId: '部门ID',
        // orgName: '部门名称',
        // jobId: '职位Id',
        // jobName: '职位名称',
        // entryDate: '入职日期，YYYY-MM-DD',
        // leaveDate: '离职日期，YYYY-MM-DD',
        // relieveDate: '解除合同日期，YYYY-MM-DD',
        // nowDate: new Date('yyyy,mth,dd')
        userId: '',
        workNo: '',
        name: '',
        idType: '',
        idNo: '',
        companyId: '',
        companyName: '',
        orgId: '',
        orgName: '',
        jobId: '',
        jobName: '',
        entryDate: '',
        leaveDate: '',
        relieveDate: '',
        printDate: ''
      },
      loading: false
    }
  },
  created() {
    this.lodingData()
  },
  methods: {
    //goBack
    goBack() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
    },
    handelClick(ele) {
      document.body.innerHTML = document.querySelector(ele).outerHTML
      setTimeout(() => {
        //打印
        window.print()
        //刷新页面
        window.location.reload()
      }, 20)
      // this.$message.info('该功能正在开发中')
    },
    async lodingData() {
      this.loading = true
      let res = await getLeaveCert({
        userId: this.$route.query.userId
      })
      this.userInfo = res
      let data = +this.$route.query.printDate
      let printDate = new Date(data)
      let year = printDate.getFullYear()
      let mon = printDate.getMonth() + 1
      let day = printDate.getDate()
      this.userInfo.printDate = `${year}年-${mon}月-${day}日`
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped media="print">
.btn-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.main {
  background: #ffffff;
  height: 50vh;
  padding: 50px 50px;
  font-size: 32px;
  color: #202940;
  letter-spacing: 6px;
  // text-align: right;
  line-height: 40px;
  width: 800px;
  margin: 0 auto;
  .detail-wrap {
    p {
      font-size: 14px;
      color: #202940;
      line-height: 26px;
    }
    .detail {
      font-size: 16px;
      color: #202940;
      text-align: left;
    }
    .prove-box {
      margin-left: 50px;
      font-weight: bold;

      font-size: 16px;
      color: #202940;
    }
    .companyName-box {
      text-align: right;

      font-size: 14px;
      color: #202940;
    }
    .data-box {
      text-align: right;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #202940;
      line-height: 26px;
    }
    .item {
      margin: 0;
      border-bottom: 1px solid #000;
    }
  }
}
@page {
  size: auto; /* auto is the initial value */
  margin: 0mm; /* this affects the margin in the printer settings */
}
</style>

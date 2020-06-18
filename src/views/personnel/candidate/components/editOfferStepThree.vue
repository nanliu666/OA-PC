<template>
  <el-row
    type="flex"
    justify="center"
    class="editOfferStepThree"
  >
    <el-col
      :xl="12"
      :lg="14"
      :md="16"
      :sm="18"
      :xs="20"
    >
      <div class="info">
        <div class="row">
          <div class="label">
            offer模板:
          </div>
          <span class="value">{{ templateDict[offerInfo.template] || '' }}</span>
        </div>
        <div class="row">
          <div class="label">
            发送邮件:
          </div>
          <span class="value">{{ offerInfo.email }}</span>
        </div>
        <div class="row">
          <div class="label">
            抄送邮箱:
          </div>
          <span class="value">{{ offerInfo.ccEmail }}</span>
        </div>
        <div class="row">
          <div class="label">
            邮箱标题:
          </div>
          <span class="value">{{ offerInfo.title }}</span>
        </div>
        <div class="row">
          <div class="label">
            邮箱附件:
          </div>
          <span class="value button">{{ offerInfo.attachmentName }}</span>
        </div>
      </div>
      <div class="content-wr">
        <div style="padding:0 24px 24px 24px;border:1px solid #ccc">
          <h3 style="text-align:center;">
            录 用 通 知 书
          </h3>
          尊敬的 <b>{{ personInfo.name }}</b>先生/女士：
          <br>
          <span>部门：</span>
          {{ offerInfo.orgName }}
          <br>
          <span>职位：</span>
          {{ offerInfo.jobName }}
          <p>
            一、报道事宜
            <br>
            入职日期：{{ offerInfo.entryDate }} (如有疑议，及时联系)
            <br>
            联 系 人： {{ offerInfo.userName }}
            <br>
            联系人电话：{{ offerInfo.phonenum }}
            <br>
            报道地址：{{ workAddress.provinceName + workAddress.cityName + workAddress.address }}
          </p>
          <p>
            二、薪酬福利
            <br>
            试用期薪资：{{ applyInfo.probationSalary }} 元/月 （税前） 转正薪资：{{
              applyInfo.formalSalary
            }}
            元/月 （税前）
            <br>年终奖、过节慰问金等根据公司相关规定发放
            <br>公司按照规定购买五险一金（养老、医疗、生育、工伤、失业和住房公积金（试用期结束后次月缴纳））
            <br>除了享受国家规定的各项假期外,入职满一年之后还享有带薪年假
          </p>
          <p>
            三、携带材料
            <br>请您携带下列材料，准时向本公司综合管理部报到。 <br>1、身份证原件；
            <br>2、学历、学位证书原件； <br>3、2张1寸免冠彩色近照，免冠彩色近照电子版；
            <br>4、上家公司离职证明原件（应届生可免）； <br>5、相关职业资格证书原件；
            <br>6、惠州市浦发银行储蓄卡的原件（薪资发放使用）
          </p>
          <p>
            四、注意事项
            <br>1、入职体检：您在入职前必须通过公司指定医院的入职体检。请在报到日前到公司领取《体检联系单》，到公司规定的医院体检；
            <br>2、您向公司提供的资料信息，表示您同意公司据此进行调查、核对，并且同意如果调查结果与您简历或面试时提供的信息不符，公司可以随时取消此聘用函，并不用承担任何赔偿责任。
          </p>
          <p>
            如果您有疑虑或困难，请与本部（0752-3266886）联系乐小姐。
            <br>在这里综合管理部代表公司对您的加入表示热烈的欢迎，相信您的到来，将为公司注入新鲜的血液，带来新的活力！公司也将成为您发挥和发展的平台，让我们一起建设百利宏更加美好明天。
          </p>
          <p>
            五、入职登记表
            <br>为了方便人事帮您提前办理手续，请提前填写入职登记表，减少入职时的等待时间
            www.abcd.com
          </p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
// Normal-正式员工，Intern-实习员工
const templateDict = {
  Normal: '正式员工',
  Intern: '实习员工'
}
export default {
  name: 'EditOfferStepThree',
  props: {
    offerInfo: {
      type: Object,
      default: () => ({})
    },
    personInfo: {
      type: Object,
      default: () => ({})
    },
    applyInfo: {
      type: Object,
      default: () => ({})
    },
    workAddressList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      templateDict
    }
  },
  computed: {
    workAddress() {
      return this.workAddressList.find((item) => item.id === this.offerInfo.workAddressId) || {}
    }
  },
  methods: {
    getContentHtml() {
      return window.document.querySelector('.editOfferStepThree .content-wr').innerHTML
    }
  }
}
</script>

<style lang="scss" scoped>
.editOfferStepThree {
  margin-top: 24px;
  .info {
    margin-top: 24px 0;
  }
  .row {
    margin-bottom: 16px;
    min-height: 20px;
    .label {
      float: left;
      color: #718199;
    }
    .value {
      display: block;
      margin-left: 100px;
      &.button {
        color: #207efa;
      }
    }
  }
}
</style>

<template>
  <div>
    <page-header
      title="发送offer"
      show-back
    />
    <basic-container block>
      <el-steps
        align-center
        :active="active"
        style="width: 80%;margin: auto;margin-top:26px;"
      >
        <el-step title="报到信息" />
        <el-step title="offer信息" />
        <el-step title="预览offer" />
      </el-steps>
      <edit-offer-step-one
        v-show="active === 1"
        ref="editOfferStepOne"
        :work-address-list.sync="workAddressList"
        :person-info="personInfo"
      />
      <edit-offer-step-two
        v-show="active === 2"
        ref="editOfferStepTwo"
        :person-info="personInfo"
      />
      <edit-offer-step-three
        v-show="active === 3"
        ref="editOfferStepThree"
        :work-address-list.sync="workAddressList"
        :person-info="personInfo"
        :offer-info="offerInfo"
      />
      <div class="footer">
        <template v-if="active === 1">
          <el-button
            size="medium"
            @click="goBack"
          >
            取消
          </el-button>
          <el-button
            size="medium"
            type="primary"
            @click="validateStepOne"
          >
            下一步
          </el-button>
        </template>
        <template v-if="active === 2">
          <el-button
            size="medium"
            @click="toPreviousStep"
          >
            上一步
          </el-button>
          <el-button
            v-loading="submitLoading"
            size="medium"
            type="primary"
            @click="submitClick"
          >
            提交
          </el-button>
        </template>
        <template v-if="active === 3">
          <el-button
            size="medium"
            @click="toPreviousStep"
          >
            上一步
          </el-button>
          <el-button
            v-loading="sending"
            size="medium"
            type="primary"
            @click="sendOffer"
          >
            发送offer
          </el-button>
        </template>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getPersonInfo } from '@/api/personnel/person'
import {
  modifyOffer,
  createOffer,
  getOfferInfo,
  sendOffer,
  getOfferApply
} from '@/api/personnel/candidate'
export default {
  name: 'SendOffer',
  components: {
    editOfferStepOne: () => import('./components/editOfferStepOne'),
    editOfferStepTwo: () => import('./components/editOfferStepTwo'),
    editOfferStepThree: () => import('./components/editOfferStepThree')
  },
  data() {
    return {
      active: 1,
      personId: null,
      personInfo: {},
      offerInfo: {
        personId: null,
        attachmentName: null,
        attachmentUrl: null,
        ccEmail: null,
        email: null,
        entryDate: null,
        formalSalary: null,
        id: null,
        isFill: 1,
        noticeUser: null,
        phonenum: null,
        probationSalary: null,
        template: 'Normal',
        title: null,
        userId: null,
        validDay: null,
        workAddressId: null
      },
      workAddressList: [],
      submitLoading: false,
      sending: false
    }
  },
  created() {
    this.personId = this.$route.query.personId
  },
  activated() {
    this.clear()
    this.personId = this.$route.query.personId
    this.getPersonInfo()
    this.getOfferInfo()
    this.active = 1
  },
  methods: {
    getPersonInfo() {
      getPersonInfo(this.personId).then((data) => {
        this.personInfo = data
      })
    },
    getOfferInfo() {
      getOfferInfo(this.personId).then((data) => {
        Object.assign(this.offerInfo, data, { personId: this.personId })
        if (Object.keys(data).length === 0) {
          return
        }

        this.$refs['editOfferStepOne'].init({
          userId: data.userId,
          entryDate: data.entryDate,
          phonenum: data.phonenum,
          workAddressId: data.workAddressId
        })
        this.$refs['editOfferStepTwo'].init({
          template: data.template,
          title: data.title,
          ccEmail: data.ccEmail,
          validDay: data.validDay,
          isFill: data.isFill,
          attachment: data.attachmentUrl
            ? [
                {
                  fileUrl: data.attachmentUrl,
                  localName: data.attachmentName
                }
              ]
            : [],
          noticeUserList: this.genNoticeUserList(data.noticeUser)
        })
      })
    },
    genNoticeUserList(noticeUser) {
      if (!noticeUser) {
        return []
      }
      let noticeUserList = []
      let pieces = noticeUser.split(','),
        list = []
      pieces.forEach((piece) => {
        list = piece.split('#')
        noticeUserList.push({
          userId: list[0],
          name: list[1],
          workNo: list[2]
        })
      })
      return noticeUserList
    },
    validateStepOne() {
      this.$refs['editOfferStepOne']
        .validate()
        .then((data) => {
          Object.assign(this.offerInfo, data, {
            email: this.personInfo.email,
            orgName: this.personInfo.orgName,
            orgId: this.personInfo.orgId
          })
          this.active += 1
        })
        .catch()
    },
    submitClick() {
      let that = this
      this.$refs['editOfferStepTwo']
        .validate()
        .then((data) => {
          return this.submitOffer(Object.assign(this.offerInfo, data))
        })
        .then(() => {
          this.$message.success('Offer提交成功')
          that.getOfferApplyInfo()
          that.active += 1
        })
        .catch()
    },
    toPreviousStep() {
      if (this.active > 1) {
        this.active -= 1
      }
    },
    clear() {
      this.personInfo = {}
      this.offerInfo = this.$options.data().offerInfo
      this.$refs['editOfferStepOne'] && this.$refs['editOfferStepOne'].clear()
      this.$refs['editOfferStepTwo'] && this.$refs['editOfferStepTwo'].clear()
    },
    goBack() {
      this.clear()
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
    },
    submitOffer(data) {
      return new Promise((resolve, reject) => {
        var submitFunc = createOffer
        if (data.id) {
          submitFunc = modifyOffer
        }
        this.submitLoading = true
        submitFunc(data)
          .then((res) => {
            if (res.id) {
              this.offerInfo.id = res.id
            }
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
          .finally(() => {
            this.submitLoading = false
          })
      })
    },
    getOfferApplyInfo() {
      getOfferApply(this.personId).then((ress) => {
        this.offerInfo.probationSalary = ress.probationSalary
        this.offerInfo.formalSalary = ress.formalSalary
      })
    },
    sendOffer() {
      this.sending = true
      sendOffer({
        email: this.offerInfo.email,
        ccEmail: this.offerInfo.ccEmail,
        title: this.offerInfo.title,
        attachmentUrl: this.offerInfo.attachmentUrl,
        attachmentName: this.offerInfo.attachmentName,
        noticeUser: this.offerInfo.noticeUser,
        isFill: this.offerInfo.isFill,
        personId: this.personInfo.personId,
        recruitmentId: this.personInfo.recruitmentId,
        content: this.$refs['editOfferStepThree'].getContentHtml()
      })
        .then(() => {
          this.$message.success('Offer发送成功')
          this.sending = false
          this.goBack()
        })
        .catch(() => {
          this.sending = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-date-editor.el-input {
  width: 100%;
}
/deep/.el-select {
  width: 100%;
}
.footer {
  display: flex;
  justify-content: center;
}
</style>

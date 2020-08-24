<template>
  <div class="recruitment detail-box">
    <div class="detail-item">
      <div>部门名称 :</div>
      <div>{{ applyData.orgName || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>职位名称 :</div>
      <div>{{ applyData.jobName || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>岗位名称 :</div>
      <div>{{ applyData.positionName || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>工作性质 :</div>
      <div>{{ CommonDictType(applyData.workProperty, 'WorkProperty') || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>紧急程度 :</div>
      <div>{{ CommonDictType(applyData.emerType, 'EmerType') || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>需求人数 :</div>
      <div>{{ applyData.needNum || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>已入职人数 :</div>
      <div>{{ applyData.entryNum || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>候选人数 :</div>
      <div>{{ applyData.candidateNum || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>到岗日期 :</div>
      <div>{{ applyData.joinDate || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>工作年限 :</div>
      <div>{{ CommonDictType(applyData.workYear, 'WorkYear') || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>学历要求 :</div>
      <div>{{ CommonDictType(applyData.educationalLevel, 'EducationalLevel') || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>最低薪酬 :</div>
      <div>{{ applyData.minSalary || '-' }} {{ applyData.minSalary ? '元' : '' }}</div>
    </div>
    <div class="detail-item">
      <div>最高薪酬 :</div>
      <div>{{ applyData.maxSalary || '-' }}{{ applyData.maxSalary ? '元' : '' }}</div>
    </div>
    <div class="detail-item">
      <div>职位要求 :</div>
      <div>{{ applyData.requirement || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>工作职责 :</div>
      <div>{{ applyData.duty || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>招聘原因 :</div>
      <div>{{ CommonDictType(applyData.reason, 'RecruitmentReason') || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>原因补充说明 :</div>
      <div>{{ applyData.reasonNote || '-' }}</div>
    </div>

    <div class="detail-item">
      <div>申请理由 :</div>
      <div>{{ applyData.remark || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>提交人姓名 :</div>
      <div>{{ applyData.userName || '-' }}</div>
    </div>
    <div class="detail-item">
      <div>公司名称 :</div>
      <div>{{ applyData.companyName || '-' }}</div>
    </div>
  </div>
</template>

<script>
import detailMixin from './detailMixin'
import { getRecruitmentApply } from '@/api/approval/approval'
const dictTypes = ['WorkProperty', 'EmerType', 'WorkYear', 'EducationalLevel', 'RecruitmentReason']

export default {
  mixins: [detailMixin],
  props: {
    formId: {
      type: String,
      default: null
    },
    formKey: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      applyData: {}
    }
  },
  mounted() {
    dictTypes.forEach((item) => {
      this.getCommonDict(item)
    })
    this.getApplyData()
  },
  methods: {
    getApplyData() {
      getRecruitmentApply({ recruitmentId: this.formId }).then((res) => {
        this.applyData = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-item {
  width: 50%;
}
</style>

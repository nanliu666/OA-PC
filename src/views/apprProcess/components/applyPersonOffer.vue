<template>
  <div class="employment-box">
    <div class="employment-box">
      <div class="employment-box-title">
        基本信息
      </div>
      <div class="employment-item">
        <div class="title">
          候选人信息
        </div>
        <div class="detail-box">
          <div class="detail-item">
            <div>姓名 :</div>
            <div>{{ personData.name }}</div>
          </div>
          <div class="detail-item">
            <div>性别 :</div>
            <div>{{ personData.sex === 1 ? '男' : '女' }}</div>
          </div>
          <div class="detail-item">
            <div>手机号码 :</div>
            <div>{{ personData.phonenum || '-' }}</div>
          </div>
          <div class="detail-item">
            <div>邮箱 :</div>
            <div>{{ personData.email || '-' }}</div>
          </div>
        </div>
      </div>
      <div class="employment-item">
        <div class="title">
          录用信息
        </div>
        <div class="detail-box">
          <div class="detail-item">
            <div>预计入职日期 :</div>
            <div>{{ applyData.entryDate || '-' }}</div>
          </div>
          <div class="detail-item">
            <div>试用期 :</div>
            <div>{{ applyData.probation ? `${applyData.probation}月` : '-' }}</div>
          </div>
          <div class="detail-item">
            <div>入职公司名称 :</div>
            <div>{{ applyData.companyName || '-' }}</div>
          </div>
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
            <div>详细地址 :</div>
            <div>{{ applyData.address || '-' }}</div>
          </div>
          <div class="detail-item">
            <div>工作城市 :</div>
            <div>
              {{ applyData.workProvinceName + applyData.workCityName || '-' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="employment-box">
      <div class="employment-box-title">
        薪资福利信息
      </div>
      <div class="employment-item">
        <div class="title">
          薪资
        </div>
        <div class="detail-box">
          <div class="detail-item">
            <div>试用期月薪 :</div>
            <div>{{ applyData.probationSalary ? `${applyData.probationSalary}元` : '-' }}</div>
          </div>
          <div class="detail-item">
            <div>转正月薪 :</div>
            <div>{{ applyData.formalSalary ? `${applyData.formalSalary}元` : '-' }}</div>
          </div>
        </div>
      </div>
      <div class="employment-item">
        <div class="title">
          劳动合同
        </div>
        <div class="detail-box">
          <div class="detail-item">
            <div>合同类型 :</div>
            <div>{{ CommonDictType(applyData.contractType, 'ContractType') || '-' }}</div>
          </div>
          <div class="detail-item">
            <div>合同开始日期 :</div>
            <div>{{ applyData.contractBeginDate || '-' }}</div>
          </div>
          <div class="detail-item">
            <div>合同结束日期 :</div>
            <div>{{ applyData.contractEndDate || '-' }}</div>
          </div>
          <div class="detail-item">
            <div>合同期限 :</div>
            <div>{{ applyData.contractPeriod ? `${applyData.contractPeriod}年` : '-' }}</div>
          </div>
        </div>
      </div>
      <div class="employment-item">
        <div class="title">
          五险一金
        </div>
        <div class="detail-box">
          <div class="detail-item">
            <div>是否缴纳社会保险 :</div>
            <div>{{ applyData.isShbx | isOrNo }}</div>
          </div>
          <div class="detail-item">
            <div>社会保险基数 :</div>
            <div>{{ applyData.baseMoney ? `${applyData.baseMoney}元` : '-' }}</div>
          </div>
          <div class="detail-item">
            <div>其他 :</div>
            <div>
              {{
                (applyData.isYangl ? '养老保险' + ' ' : '') +
                  (applyData.isYil ? '医疗保险' + ' ' : '') +
                  (applyData.isGs ? '工伤保险' + ' ' : '') +
                  (applyData.isShiy ? '失业保险' + ' ' : '') +
                  (applyData.isShengy ? '生育保险' + ' ' : '') +
                  (applyData.isGjj ? '住房公积金' + ' ' : '') || '-'
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="employment-item">
        <div class="title">
          办公安排
        </div>
        <div class="detail-box">
          <div class="detail-item">
            <div>办公位安排 :</div>
            <div>{{ applyData.officeSpace || '-' }}</div>
          </div>
          <div class="detail-item">
            <div>电话配备 :</div>
            <div>{{ applyData.telphone || '-' }}</div>
          </div>
          <div class="detail-item">
            <div>是否电脑配备 :</div>
            <div>{{ applyData.isComputer | isOrNo }}</div>
          </div>
          <div class="detail-item">
            <div>其他 :</div>
            <div>{{ applyData.other || '-' }}</div>
          </div>
        </div>
      </div>
      <div class="employment-item">
        <div class="title">
          其他
        </div>
        <div class="detail-box">
          <div class="detail-item">
            <div>是否安排住房 :</div>
            <div>{{ applyData.isHouse | isOrNo }}</div>
          </div>
          <div class="detail-item">
            <div>住房标准 :</div>
            <div>{{ applyData.houseStandard || '-' }}</div>
          </div>
          <div class="detail-item">
            <div>备注 :</div>
            <div>{{ applyData.remark || '-' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOfferApply } from '@/api/approval/approval'
import detailMixin from './detailMixin.js'
import { getPersonInfo } from '@/api/personnel/person'
export default {
  name: 'ApplyPersonOffer',
  filters: {
    // 根据0  1 显示 是否
    isOrNo(value) {
      if (!value) return '-'
      if (value == '1') return '是'
      return '否'
    }
  },
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
      applyData: {},
      personData: {}
    }
  },
  mounted() {
    const dicts = ['WorkProperty', 'ContractType']
    dicts.forEach((dict) => {
      this.getCommonDict(dict)
    })
    this.getApplyData()
  },
  methods: {
    getApplyData() {
      getOfferApply({ id: this.formId }).then((res) => {
        this.applyData = res
        getPersonInfo(res.personId).then((person) => {
          this.personData = person
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-item {
  width: 50%;
}
.employment-box {
  .employment-box {
    .employment-box-title {
      font-size: 16px;
      color: #333333;
      padding-left: 8px;
      border-left: 4px solid #207efa;
      margin-bottom: 16px;
    }
    .employment-item {
      .title {
        font-size: 14px;
        color: #757c85;
        margin-left: 52px;
        margin-bottom: 16px;
      }
      // .detail-box{
      // 	display: flex;
      // 	flex-wrap: wrap;
      // 	div{
      // 		width: 50%;
      // 	}
      // }
    }
  }
}
</style>

<template>
  <div
    id="pact-info"
    class="info-wrapper"
  >
    <div class="info-title-bar">
      <span class="info-title">合同信息</span>
    </div>
    <div
      v-if="compactInfo.length > 0"
      class="compact-survey-info"
    >
      <el-form
        label-width="150px"
        class="info-form"
        size="small"
      >
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="现合同公司:">
              <span class="info-item-value">{{ compactInfo[0].name }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="现合同类型:">
              <span class="info-item-value">{{ matchContractType(compactInfo[0].type) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="首次合同开始日期:">
              <span class="info-item-value">{{
                compactInfo[compactInfo.length - 1].beginDate
              }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="首次合同结束日期:">
              <span class="info-item-value">{{ compactInfo[compactInfo.length - 1].endDate }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="现合同开始日期:">
              <span class="info-item-value">{{ compactInfo[0].beginDate }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="现合同结束日期:">
              <span class="info-item-value">{{ compactInfo[0].endDate }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="现合同期限:">
              <span class="info-item-value">{{ getPeriod(compactInfo[0].period) }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="合同签订次数:">
              <span class="info-item-value">{{ compactInfo | signCompactNum }}次</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div
      v-show="compactInfo.length > 0 && !showOtherCompact"
      class="display-compact"
    >
      <span>共签订{{ compactInfo.length }}份合同，</span>
      <span
        class="disply-button"
        @click="displayCompact()"
      >
        点击展开
        <i class="el-icon-arrow-down" />
      </span>
    </div>
    <div
      v-show="showOtherCompact"
      class="display-compact"
    >
      <span>共签订{{ compactInfo.length }}份合同，</span>
      <span
        class="disply-button"
        @click="hiddenOtherCompact()"
      >
        点击收起
        <i class="el-icon-arrow-up" />
      </span>
    </div>
    <div
      v-for="(item, index) in compactInfo"
      v-show="showOtherCompact"
      :key="index"
      class="info-content no-back-color"
    >
      <el-form
        :model="item"
        label-width="150px"
        class="info-form"
        size="small"
      >
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="合同编号:">
              <span class="info-item-value">{{ item.code }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="合同公司:">
              <span class="info-item-value">{{ item.name }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="合同类型:">
              <span class="info-item-value">{{ matchContractType(item.type) }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="合同期限:">
              <span class="info-item-value">{{ getPeriod(item.period) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="合同开始日期:">
              <span class="info-item-value">{{ item.beginDate }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="合同结束日期:">
              <span class="info-item-value">{{ item.endDate }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="合同状态:">
              <span class="info-item-value">{{ getCompactStatus(item) }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="合同签订日期:">
              <span class="info-item-value">{{ item.signDate }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="20"
            :push="2"
          >
            <el-form-item label="备注:">
              <span class="info-item-value">{{ item.remark }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div
      v-show="compactInfo.length == 0"
      class="info-content no-back-color"
    >
      <el-form
        label-width="150px"
        class="info-form"
        size="small"
      >
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="合同公司:">
              <span class="info-item-value" />
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="合同类型:">
              <span class="info-item-value" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="首次合同开始日期:">
              <span class="info-item-value" />
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="首次合同结束日期:">
              <span class="info-item-value" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="现合同开始日期:">
              <span class="info-item-value" />
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="现合同结束日期:">
              <span class="info-item-value" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="现合同期限:">
              <span class="info-item-value" />
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="合同签订次数:">
              <span class="info-item-value" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getConpactInfo } from '../../../../api/personalInfo'
export default {
  filters: {
    signCompactNum(val) {
      let num = 0
      val.forEach((item) => {
        if (item.signDate) {
          num += 1
        }
      })
      return num
    }
  },
  data() {
    return {
      showOtherCompact: false,
      compactInfo: {},
      contractType: []
    }
  },
  created() {
    this.getDictionaryData()
    this.getCompactInfo()
  },

  methods: {
    getPeriod(period) {
      return period && period > 0 ? period + '年' : ''
    },
    matchContractType(type) {
      let dictValue = ''
      this.contractType.forEach((item) => {
        if (item.dictKey === type) {
          dictValue = item.dictValue
        }
      })
      return dictValue
    },
    getDictionaryData() {
      this.$store.dispatch('CommonDict', 'ContractType').then((res) => {
        this.contractType = res
      })
    },
    getCompactStatus(info) {
      let status = ''
      let curDateTime = new Date().getTime()
      let beiginTime = new Date(info.beginDate).getTime()
      let endTime = new Date(info.endDate).getTime()
      if (info.relieveDate) {
        status = '已解除'
      } else if (curDateTime < beiginTime) {
        status = '未执行'
      } else if (beiginTime < curDateTime && curDateTime < endTime) {
        status = '执行中'
      } else if (curDateTime > endTime) {
        status = '已到期'
      } else {
        status = '未签订'
      }
      return status
    },
    getCompactInfo() {
      let params = {
        userId: this.$route.params.userId
      }
      getConpactInfo(params).then((res) => {
        this.compactInfo = res
      })
    },
    displayCompact() {
      this.showOtherCompact = true
    },
    hiddenOtherCompact() {
      this.showOtherCompact = false
    }
  }
}
</script>

<style lang="scss" scoped>
.info-title-bar {
  padding-bottom: 10px;
}
.compact-survey-info {
  padding-top: 10px;
  border: 1px solid #ccc;
  position: relative;
}
.compact-survey-info::before {
  content: '概览';
  padding: 5px;
  position: absolute;
  background: #fff;
  top: -15px;
  left: 10px;
  color: #202940;
  font-size: 14px;
}
.display-compact {
  text-align: center;
  line-height: 30px;
  padding-right: 15%;
  .disply-button {
    color: #368afa;
    cursor: pointer;
    font-size: 14px;
  }
  .disply-button:hover {
    color: #1573f1;
  }
}
</style>

<template>
  <div
    id="pact-info"
    class="info-wrapper"
  >
    <div class="info-title-bar">
      <span class="info-title">合同信息</span>
    </div>
    <div
      v-for="(item, index) in compactInfo"
      v-show="index == 0 || showOtherCompact"
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
            <el-form-item label="现合同公司:">
              <span class="info-item-value">{{ item.name }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="现合同类型:">
              <span class="info-item-value">{{ item.type }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="首次合同开始日期:">
              <span class="info-item-value">{{ item.beginDate }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="首次合同结束日期:">
              <span class="info-item-value">{{ item.endDate }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="现合同开始日期:">
              <span class="info-item-value">{{ item.signDate }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="现合同结束日期:">
              <span class="info-item-value">{{ item.relieveDate }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="现合同期限:">
              <span class="info-item-value">{{ item.period }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="合同签订次数:">
              <span class="info-item-value">{{ item.remark }}</span>
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
      >点击展开<i
        class="el-icon-arrow-down"
      /></span>
    </div>
    <div
      v-show="showOtherCompact"
      class="display-compact"
    >
      <span
        class="disply-button"
        @click="hiddenOtherCompact()"
      >点击收起<i
        class="el-icon-arrow-up"
      /></span>
    </div>
  </div>
</template>

<script>
import { getConpactInfo } from '../../../../api/personalInfo'
export default {
  data() {
    return {
      showOtherCompact: false,
      compactInfo: {}
    }
  },
  created() {
    this.getCompactInfo()
  },

  methods: {
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
@import url('../staffInfo.scss');
</style>

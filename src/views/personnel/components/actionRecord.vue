<template>
  <div class="steps-bos">
    <basic-container>
      <el-timeline :reverse="false">
        <el-timeline-item
          v-for="(item, index) in stepsData"
          :key="index"
          :timestamp="item.createTime"
          color="#368AFA"
        >
          <template slot>
            <div class="action-name">
              {{ item.operatorName }} {{ item.content }}
            </div>
            <!-- <div
              class="action-content"
              v-html="item.remark"
            /> -->
          </template>
        </el-timeline-item>
      </el-timeline>
      <div v-if="stepsData.length == 0">
        <avue-empty />
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getUserActionLog } from '@/api/personnel/roster'
export default {
  name: 'ActionRecord',
  data() {
    return {
      stepsData: [],
      ajaxData: {
        pageNo: 1, //请求页码
        pageSize: 1000, //每页数据
        model: '', //模糊搜索
        userName: '', //用户名
        beginTime: '', //查询开始时间
        endTime: '', //查询结束时间
        status: '', //状态
        userId: this.$route.params.userId
      }
    }
  },

  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getUserActionLog(this.ajaxData).then((res) => {
        // this.stepsData = res.data.map((item) => ({
        //   createTime: this.formatDate(item.createTime),
        //   name: item.name,
        //   content: item.content
        // }))
        this.stepsData = res
      })
    },
    //时间戳转日期
    formatDate(timestamp) {
      var date = new Date(parseInt(timestamp)) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    }
  }
}
</script>
<style lang="scss" scoped>
.steps-bos {
  padding: 24px;
}
/deep/ .el-step__description.is-finish {
  font-family: PingFangSC-Regular;
  color: #202940;
  line-height: 16px;
}
/deep/ .el-timeline-item__tail {
  position: absolute;
  left: 7px;
  top: 21px;
  height: calc(100% - 20px);
  border-left: 1px solid #368afa;
}
/deep/ .el-timeline-item__wrapper {
  display: flex;
  line-height: 30px;
  > .el-timeline-item__content {
    flex: 1;
  }
}
/deep/ .el-timeline-item__timestamp.is-bottom {
  margin-left: 20px;
}
/deep/ .el-timeline-item__node--normal {
  left: 2px;
  top: 5px;
}
.action-name {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #202940;
}
.action-content {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #757c85;
}
.action-action {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #757c85;
}
</style>

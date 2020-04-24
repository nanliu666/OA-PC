<template>
  <div class="steps-bos">
    <basic-container>
      <el-steps direction="vertical" :active="1" space="80px">
        <el-step
          :title="item.createTime"
          :description="item.name"
          v-for="(item, index) in stepsData"
          :key="index"
        ></el-step>
      </el-steps>
    </basic-container>
  </div>
</template>
<script>
import { getActionLog } from '@/api/system/user'
export default {
  data() {
    return {
      stepsData: {},
      ajaxData: {
        pageNo: 1, //请求页码
        pageSize: 10, //每页数据
        model: '', //模糊搜索
        userName: '', //用户名
        beginTime: '', //查询开始时间
        endTime: '', //查询结束时间
        status: '' //状态
      }
    }
  },

  mounted() {
    ;[...document.querySelectorAll('.el-steps .el-step__icon div')].forEach((el, index, arr) => {
      el.innerHTML = arr.length - index
    }),
      this.initData()
  },
  methods: {
    initData() {
      getActionLog(this.ajaxData).then((res) => {
        this.stepsData = res.data
        this.stepsData.createTime = []
        res.data.forEach((item, index) => {
          this.stepsData[index].createTime = this.formatDate(item.createTime)
          this.stepsData[index].name = `${item.name} ${item.source}`
        })
      })
    },
    //时间戳转日期
    formatDate(timestamp) {
      var date = new Date(parseInt(timestamp) * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
  min-height: 300px;
}
// /deep/ .el-step__main {
//   display: flex;
//   width: 100%;
// }

// /deep/ .el-step__description {
//   line-height: 32px;
//   margin-left: 20px;
// }
</style>

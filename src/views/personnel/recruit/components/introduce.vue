<template>
  <el-row
    type="flex"
    :gutter="52"
    class="displayBar"
  >
    <el-col
      :span="8"
      class="frame"
    >
      <span class="demandSize"> 职位名称</span>
      <span class="content">{{ user.jobName }}</span>
    </el-col>

    <el-col
      :span="8"
      class="frame"
    >
      <span class="demandSize"> 到岗日期</span>
      <span class="content">{{ user.joinDate }}</span>
    </el-col>

    <el-col
      :span="8"
      class="frame"
    >
      <span class="demandSize"> 紧急程度</span>
      <span class="content">{{ calEmerType(user.emerType) }}</span>
    </el-col>

    <el-col
      :span="8"
      class="frame"
    >
      <span class="demandSize"> 需求总数</span>
      <span class="content">{{ user.needNum }}</span>
    </el-col>

    <el-col
      :span="8"
      class="frame"
    >
      <span class="demandSize"> 已入职</span>
      <span class="content">{{ user.entryNum }}</span>
    </el-col>

    <el-col
      :span="8"
      class="frame"
    >
      <span class="demandSize"> 招聘进度</span>
      <span class="content isBurl">{{ user.progress }}</span>
    </el-col>

    <el-col
      :span="8"
      class=" bronone frame"
    >
      <span class="demandSize"> 候选人数</span>
      <span class="content">{{ user.candidateNum }}</span>
    </el-col>
  </el-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Introduce',
  props: ['Status'],
  data() {
    return {
      user: {
        jobName: null,
        joinDate: null,
        userName: null,
        progress: null,
        entryNum: null,
        candidateNum: null
      },
      emerType: []
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  watch: {
    Status: function(newval) {
      this.user = newval
      this.getPercent(this.user.needNum, this.user.entryNum)
    }
  },
  mounted() {
    this.$store.dispatch('CommonDict', 'emerType').then((res) => {
      this.emerType = res
    })
  },
  methods: {
    calEmerType(type) {
      let typeWord
      this.emerType.forEach((item) => {
        if (item.dictKey === type) {
          typeWord = item.dictValue
        }
      })
      return typeWord
    },
    getPercent(curNum, totalNum) {
      curNum = parseFloat(curNum)
      totalNum = parseFloat(totalNum)
      if (isNaN(curNum) || isNaN(totalNum)) {
        return '-'
      }
      this.user.progress = Math.round((totalNum / curNum) * 10000) / 100 + '%'
    }
  }
}
</script>

<style lang="scss" scoped>
.displayBar {
  margin: 20px 0;
  border-radius: 4px;
  margin-right: 20px;
  display: flex;
  padding: 20px 0;
  background-color: #f7f8fa;
  margin-left: -3px !important;
  margin-right: -1px !important;
}
.content {
  margin-top: 5px;
  display: block;
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #202940;
}
.demandSize {
  width: 80px;
  display: block;
  font-size: 12px;
  color: #718199;
  line-height: 18px;
  text-align: center;
  margin-bottom: 10px;
  margin: auto;
}

.frame {
  border-right: solid 1px #ccc;
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.isBurl {
  color: #207efa;
}

.bronone {
  border: none !important;
}
</style>

<template>
  <div>
    <basic-container>
      <div v-loading="loading">
        <el-row
          :gutter="20"
          type="flex"
        >
          <el-col
            :span="5"
            class="internalDetails"
          >
            招聘人员
          </el-col>
          <el-col
            :span="5"
            class="internalDetails"
          >
            任务数
          </el-col>
          <el-col
            :span="5"
            class="internalDetails"
          >
            入职数
          </el-col>
          <el-col
            :span="5"
            class="internalDetails"
          >
            候选人数
          </el-col>
          <el-col
            :span="4"
            class="internalDetails noborder "
          >
            招聘进度
          </el-col>
        </el-row>
        <el-row v-if="management === 'noAvailable'">
          <el-col class="taskInformation">
            {{ '暂无数据' }}
          </el-col>
        </el-row>

        <el-row
          v-for="item in management"
          :key="item.userId"
          :gutter="20"
          type="flex"
        >
          <el-col
            :span="5"
            class="taskInformation"
          >
            {{ item.name }}
          </el-col>
          <el-col
            :span="5"
            class="taskInformation"
          >
            {{ item.taskNum }}
          </el-col>
          <el-col
            :span="5"
            class="taskInformation"
          >
            {{ item.entryNum }}
          </el-col>
          <el-col
            :span="5"
            class="taskInformation"
          >
            {{ item.candidateNum }}
          </el-col>
          <el-col
            :span="4"
            class="taskInformation isBlue  noborder"
          >
            {{ getPercent(item.taskNum, item.entryNum) }}
          </el-col>
        </el-row>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import { queryDistribution } from '@/api/personnel/recruitment'
export default {
  name: 'Distributeall',
  props: [],
  data() {
    return {
      loading: true,
      management: [],
      childData: [],
      user: {
        joinDate: null,
        userName: null,
        id: null
      },
      status: '招聘中',
      activeName: 'inrecruitment',
      row: {},
      data: []
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    if (typeof this.$route.query.id !== 'undefined') {
      this.recruitmentSituation()
    }
  },
  methods: {
    recruitmentSituation() {
      queryDistribution({ recruitmentId: this.$route.query.id }).then((res) => {
        this.loading = false
        // 判断当前数组是否为空
        if (res == null || res.length == 0) {
          this.management = 'noAvailable'
        } else {
          this.management = res
        }
      })
    },
    getPercent(curNum, totalNum) {
      curNum = parseFloat(curNum)
      totalNum = parseFloat(totalNum)
      if (isNaN(curNum) || isNaN(totalNum)) {
        return '-'
      }
      return Math.round((totalNum / curNum) * 10000) / 100 + '%'
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .top-menu {
  height: 0px;
  margin-bottom: 0px;
}

/deep/ .basic-container {
  margin: 10px 0;
}
.noborder {
  border: none !important;
}

.internalDetails {
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #a0a8ae;
  padding-left: 23px !important;
  border-right: 1px solid #ccc;
  margin: 0;
}

.taskInformation {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #202940;
  line-height: 20px;
  padding-left: 23px !important;
  border-right: 1px solid #ccc;
}

.isBlue {
  color: #207efa !important;
}
</style>

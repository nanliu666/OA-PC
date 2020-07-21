<template>
  <div>
    <basic-container>
      <common-table
        class="progress"
        :loading="loading"
        :data="data"
        :columns="columns"
        :config="tableConfig"
      >
        <template
          slot="nodeData"
          slot-scope="{ row }"
        >
          <el-progress
            class="static"
            :class="{ empty: row.nodeData === 0 }"
            :percentage="row.nodeData"
          />
        </template>
      </common-table>

      <el-button
        v-if="data.length === 0"
        type="primary"
        size="medium"
        class="operationButon"
        @click="DistributionContent()"
      >
        立即分配
      </el-button>
    </basic-container>

    <Distribution
      ref="distribution"
      :visible.sync="distributionVisible"
      @submit="handleDistributionSubmit"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { queryDistribution, taskDistribution } from '@/api/personnel/recruitment'

export default {
  name: 'Distributeall',
  components: {
    Distribution: () => import('../components/modals/Distribution')
  },
  props: {
    childData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loading: true,
      management: [],
      user: {
        joinDate: null,
        userName: null,
        id: null
      },
      status: '招聘中',
      activeName: 'inrecruitment',
      row: {},
      data: [],
      columns: [
        {
          label: '招聘人员',
          prop: 'name'
        },
        {
          label: '任务数',
          prop: 'taskNum'
        },
        {
          label: '入职数',
          prop: 'entryNum'
        },
        {
          label: '候选人数',
          prop: 'candidateNum'
        },
        {
          label: '招聘进度',
          prop: 'nodeData',
          slot: true
        }
      ],
      nodeData: null,
      distributionVisible: false,
      tableConfig: {
        showIndexColumn: false
      }
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    if (this.$route.query.id !== undefined || this.$route.query.id !== null) {
      this.recruitmentSituation()
    }
  },
  methods: {
    recruitmentSituation() {
      queryDistribution({ recruitmentId: this.$route.query.id })
        .then((res) => {
          this.loading = false
          this.data = res.map((item) => ({
            ...item,

            nodeData: `${((100 * item.taskNum) / item.entryNum).toFixed(1)}%`
          }))
        })
        .catch(() => {
          this.loading = false
        })
    },

    dataJump() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.push({ path: '/personnel/recruit/recruitList' })
    },
    DistributionContent() {
      this.$set(this.childData, 'jumpnot', true)
      this.$refs.distribution.init(this.childData)
    },

    handleDistributionSubmit(data) {
      taskDistribution(data)
        .then(() => this.$message.success('操作成功'))
        .finally(() => {
          this.$refs.distribution.close()
          this.refresNew()
        })
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
/deep/ .empty {
  .el-progress__text {
    color: red;
  }
}
/deep/ .static {
  .el-progress__text {
    float: left;
    margin-left: 0px !important;
    margin-right: 10px;
  }
  .el-progress-bar {
    margin-top: 5px;
  }
}
/deep/ .progress {
  .el-progress--line {
    display: flex;
    flex-direction: row-reverse;
  }
}

.operationButon {
  display: block;
  margin: 0 auto;
  position: relative;
  top: 10px;
}
</style>

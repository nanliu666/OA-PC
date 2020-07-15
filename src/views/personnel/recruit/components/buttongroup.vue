<template>
  <div class="Requirements">
    <div v-if="$route.query.status === 'mNeeds'">
      <template
        v-if="
          childData.needNum === childData.entryNum || childData.needNum - childData.entryNum == 0
        "
      >
        <el-button
          size="medium"
          type="primary"
          @click="JumpNewlybuild()"
        >
          复制
        </el-button>
      </template>
      <template v-else>
        <el-button
          size="medium"
          type="primary"
          @click="() => handleNeedNumBtnClick(childData)"
        >
          更改需求人数
        </el-button>
      </template>
    </div>

    <template v-else-if="$route.query.status === 'aRequirements'">
      <el-button
        size="medium"
        type="primary"
        @click="DistributionContent()"
      >
        {{ childData.status === 'UnHandle' ? '分配需求' : '重新分配' }}
      </el-button>
      <el-button
        size="medium"
        type="defualt"
        @click="() => handleNeedNumBtnClick(childData)"
      >
        更改需求人数
      </el-button>

      <el-button
        plain
        size="medium"
        type="danger"
        @click="() => handleRequirementStopBtnClick(childData)"
      >
        停止招聘
      </el-button>
    </template>

    <Distribution
      ref="distribution"
      :visible.sync="distributionVisible"
      @submit="handleDistributionSubmit"
    />
    <RequirementStop
      ref="requirementStop"
      :visible.sync="requirementStopVisible"
    />
    <Redistribution
      ref="redistribution"
      :visible.sync="redistributionVisible"
      @submit="handleRedistributionSubmit"
    />
    <NeedNumEdit
      ref="needNumEdit"
      :visible.sync="needNumEditVisible"
      @submit="handleNeedNumEditSubmit"
    />
  </div>
</template>
<script>
import { getChange, putDistribution, taskDistribution } from '@/api/personnel/recruitment'
import { renameKey } from '@/util/util'
export default {
  name: 'Buttongroup',
  components: {
    Distribution: () => import(/* webpackChunkName: "views" */ '../components/modals/Distribution'),
    Redistribution: () =>
      import(/* webpackChunkName: "views" */ '../components/modals/Redistribution'),
    RequirementStop: () =>
      import(
        /* webpackChunkName: "views" */ '@/views/personnel/recruit/components/modals/RequirementStop'
      ),
    NeedNumEdit: () =>
      import(
        /* webpackChunkName: "views" */ '@/views/personnel/recruit/components/modals/NeedNumEdit'
      )
  },
  props: {
    childData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      user: {
        joinDate: null,
        userName: null,
        id: null
      },
      status: null,
      distributionVisible: false,
      requirementStopVisible: false,
      redistributionVisible: false,
      needNumEditVisible: false
    }
  },
  methods: {
    // 需求状态，UnHandle-待分配，Handled-已分配
    DistributionContent() {
      this.$set(this.childData, 'jumpnot', true)
      if (this.childData && this.childData.status === 'UnHandle') {
        this.$refs.distribution.init(this.childData)
      } else {
        this.$refs.redistribution.init(this.childData)
      }
    },
    handleNeedNumBtnClick() {
      // TODO:
      this.$refs.needNumEdit.init(this.childData)
      // this.$router.push({
      //   path: '/personnel/recruit/components/chang',
      //   query: { id: this.$route.query.id }
      // })
    },
    handleNeedNumEditSubmit(data) {
      getChange(renameKey(data, 'id', 'recruitmentId'))
        .then(() => {
          this.$message({ type: 'success', message: '提交成功' })
          this.$refs.needNumEdit.close()
        })
        .finally(() => (this.$refs.needNumEdit.submitting = false))
    },
    handleDistributionSubmit(data) {
      taskDistribution(data)
        .then(() => this.$message.success('操作成功'))
        .finally(() => {
          this.$refs.distribution.close()
          this.refresNew()
        })
    },
    handleRedistributionSubmit(data) {
      putDistribution(data)
        .then(() => {
          this.$message.success('操作成功')
        })
        .finally(() => {
          this.$refs.redistribution.close()
        })
    },
    JumpNewlybuild() {
      this.$router.push({
        path: '/personnel/recruit/recruitmentNeeds',
        query: { id: this.$route.query.id }
      })
    },
    dataJump() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.push({ path: '/personnel/recruit/recruitList' })
    },
    handleRequirementStopBtnClick(childData) {
      this.$refs.requirementStop.init(renameKey(childData, 'id', 'recruitmentId'))
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

.nodetitle {
  margin-bottom: 8px;
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #718199;
  line-height: 18px;
  display: block;
}
.Requirements {
  width: 500px;
}
</style>

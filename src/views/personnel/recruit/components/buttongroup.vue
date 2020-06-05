<template>
  <div style="width: 620px;">
    <div v-if="$route.query.rotate === 'myHandled'">
      <span class="nodetitle">状态:</span>
      <span style="color: #207EFA">{{ recruitment }}</span>
      <el-button
        style="float: right;margin-top: -17px"
        size="medium"
        type="primary"
        @click="ChangeContent"
      >
        更改需求人数
      </el-button>
    </div>
    <div v-else-if="$route.query.rotate === 'myUnHandle'">
      <span class="nodetitle">状态:</span>
      <span style="color: #207EFA">{{ end }}</span>
      <el-button
        style="float: right;margin-top: -17px"
        size="medium"
        type="primary"
        @click="JumpNewlybuild"
      >
        复制
      </el-button>
    </div>
    <div v-else-if="$route.query.rotate === 'allUnHandle'">
      <span class="nodetitle">状态:</span>
      <span style="color: #207EFA">{{ recruitment }}</span>
      <el-button
        style="float: right;margin-top: -17px"
        size="medium"
        type="primary"
        @click="DistributionContent()"
      >
        分配
      </el-button>
    </div>
    <div v-else-if="$route.query.rotate === 'allHandled'">
      <span class="nodetitle">状态:</span>
      <span style="color: #207EFA">{{ end }}</span>
    </div>

    <div v-else-if="$route.query.myneeds === 'end'">
      <span class="nodetitle">状态:</span>
      <span style="color: #207EFA">{{ end }}</span>
    </div>

    <div v-else>
      <span class="nodetitle">状态:</span>
      <span style="color: #207EFA">{{ recruitment }}</span>
    </div>

    <Again
      ref="Again"
      :visible.sync="createAssigned"
    />
  </div>
</template>
<script>
import Again from '@/views/personnel/recruit/details/again'
export default {
  name: 'Unassigned',
  components: {
    Again
  },
  props: ['childData'],
  data() {
    return {
      user: {
        joinDate: null,
        userName: null,
        id: null
      },
      end: '已结束',
      recruitment: '招聘中',
      status: null,
      createAssigned: false
    }
  },
  watch: {
    childData: function(newval) {
      this.status = newval
    }
  },
  methods: {
    DistributionContent() {
      this.$refs.Again.init(this.status)
    },
    ChangeContent() {
      this.$router.push({
        path: '/personnel/recruit/components/chang',
        query: { id: this.$router.id }
      })
    }
  },
  JumpNewlybuild() {
    this.$router.push({
      path: '/personnel/recruit/recruitmentNeeds',
      query: { id: this.$router.id }
    })
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
</style>

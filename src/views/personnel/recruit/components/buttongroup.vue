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
          @click="ChangeContent"
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
        {{ childData.status === 'UnHandle' ? '分配' : '重新分配' }}
      </el-button>
    </template>

    <Again
      ref="Again"
      :visible.sync="createAgain"
      @dataJump="dataJump"
    />
    <Assigned
      ref="Assigned"
      :visible.sync="createAssigned"
      @getTableData="dataJump"
    />
  </div>
</template>
<script>
import Again from '@/views/personnel/recruit/details/again'
import Assigned from '@/views/personnel/recruit/details/Assigned'
export default {
  name: 'Buttongroup',
  components: {
    Again,
    Assigned
  },
  props: ['childData'],
  data() {
    return {
      user: {
        joinDate: null,
        userName: null,
        id: null
      },
      status: null,
      createAgain: false,
      createAssigned: false
    }
  },
  methods: {
    // 需求状态，UnHandle-待分配，Handled-已分配
    DistributionContent() {
      this.$set(this.childData, 'jumpnot', true)
      if (this.childData && this.childData.status === 'UnHandle') {
        this.$refs.Again.init(this.childData)
      } else {
        this.$refs.Assigned.init(this.childData)
      }
    },
    ChangeContent() {
      this.$router.push({
        path: '/personnel/recruit/components/chang',
        query: { id: this.$route.query.id }
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
  width: 150px;
}
</style>

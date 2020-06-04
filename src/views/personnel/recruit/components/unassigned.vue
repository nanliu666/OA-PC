<template>
  <div>
    <basic-container>
      <Introduce :status="status" />
      <h3 class="Header">
        分配详情
      </h3>
      <el-alert
        title="您还未分配该招聘需求"
        type="warning"
        center
        :closable="false"
      />
      <el-button
        type="primary"
        class="isButton"
        size="medium "
        @click="handleEdit"
      >
        立即分配
      </el-button>
    </basic-container>
    <Again
      ref="Again"
      :visible.sync="createAssigned"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Again from '@/views/personnel/recruit/details/again'
import Introduce from './introduce'
export default {
  name: 'Unassigned',
  components: {
    Again,
    Introduce
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
      row: {},
      data: [],
      createAssigned: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  watch: {
    childData: function(newval) {
      this.status = newval
    }
  },
  mounted() {
    this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
      this.EducationalLevel = res
    })
  },
  methods: {
    handleEdit() {
      this.$refs.Again.init(this.status)
    }
  }
}
</script>

<style lang="scss" scoped>
.Header {
  margin: 20px 0;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #212a3f;
}

/deep/ .top-menu {
  height: 0px;
  margin-bottom: 0px;
}

/deep/ .basic-container {
  margin: 10px 0;
}

.isButton {
  display: block;
  margin: 20px auto;
}
</style>

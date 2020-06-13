<template>
  <div class="claLabel">
    <template v-if="emertype === 'suit' || emertype === 'common'">
      <el-tag
        size="medium"
        type="info"
      >
        {{ calEmerType(emertype) }}
      </el-tag>
    </template>

    <template v-else-if="emertype === 'urgent' || emertype === 'Super'">
      <el-tag
        type="danger"
        size="medium"
      >
        {{ calEmerType(emertype) }}
      </el-tag>
    </template>
    <template v-else />
  </div>
</template>
<script>
export default {
  name: 'Clalabel',
  props: ['emertype'],
  data() {
    return {
      EmerType: []
    }
  },
  mounted() {
    this.$store.dispatch('CommonDict', 'EmerType').then((res) => {
      this.EmerType = res
    })
  },
  methods: {
    calEmerType(emerType) {
      let typeWord
      this.EmerType.map((item) => {
        if (item.dictKey === emerType) {
          typeWord = item.dictValue
        }
      })
      return typeWord
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

.claLabel {
  /deep/ .el-tag {
    width: 100%;
    text-align: center;
  }
}
</style>

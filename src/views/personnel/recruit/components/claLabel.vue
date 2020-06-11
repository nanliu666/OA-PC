<template>
  <div>
    <template v-if="emertype === 'Super'">
      <el-tag type="danger">
        {{ calEmerType(emertype) }}
      </el-tag>
    </template>

    <template v-else-if="emertype === 'suit'">
      <el-tag type="info">
        {{ calEmerType(emertype) }}
      </el-tag>
    </template>

    <template v-else-if="emertype === 'urgent'">
      <el-tag type="danger">
        {{ calEmerType(emertype) }}
      </el-tag>
    </template>

    <template v-else-if="emertype === 'common'">
      <el-tag type="info">
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
</style>

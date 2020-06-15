<template>
  <div class="claLabel">
    <template v-if="emertype === 'suit' || emertype === 'common'">
      <el-tag
        size="medium"
        type="info"
      >
        <span class="subelements">{{ calEmerType(emertype) }} </span>
      </el-tag>
    </template>

    <template v-else-if="emertype === 'urgent' || emertype === 'Super'">
      <el-tag
        type="danger"
        size="medium"
      >
        <span class="subelements"> {{ calEmerType(emertype) }} </span>
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
    overflow: hidden;
    position: relative;
    top: 9px;
  }

  .subelements {
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    display: inline-block;
    vertical-align: top;
  }
}
</style>

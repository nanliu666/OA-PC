<template>
  <div
    class="wrap"
    :style="{ width }"
  >
    <!-- 标题 -->
    <div
      class="header"
      @click="clickHeader"
    >
      <span class="title">{{ title }}</span>
      <i
        v-if="icon"
        class="icon-arrow-right-outlined"
      />
    </div>
    <!-- 内容 -->
    <el-tabs
      v-model="chooseName"
      @tab-click="Click"
    >
      <el-tab-pane
        v-for="(item, index) in labelArray"
        :key="index"
        :label="item.label"
        :name="item.name"
      >
        <slot :name="item.name" />
      </el-tab-pane>
    </el-tabs>
    <slot name="foot" />
  </div>
</template>

<script>
export default {
  name: 'TagCom',
  // components: { tagTitle },
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: Boolean,
      default: true
    },
    labelArray: {
      type: Array,
      default: () => {
        []
      }
    },

    value: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      chooseName: this.value
    }
  },
  created() {},
  methods: {
    clickHeader() {
      this.$emit('click')
    },
    Click(tab, event) {
      this.$emit('input', this.chooseName)
      this.$emit('tab-click', tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  /deep/ .el-tabs__header {
    margin-bottom: 0px;
  }
  /deep/.el-tabs__nav-wrap::after {
    height: 1px;
  }
  /deep/.el-tabs__active-bar {
    height: 3px;
  }
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  width: 150px;
  cursor: pointer;
  .icon-arrow-right-outlined {
    color: #a0a8ae;
    font-size: 12px;
  }
  .title {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #202940;
    line-height: 28px;
    margin-right: 8px;
  }
}
.button--wr {
  padding-bottom: 18px;
  padding-top: 6px;
}
</style>

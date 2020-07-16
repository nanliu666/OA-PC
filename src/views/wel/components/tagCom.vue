<template>
  <div
    class="wrap"
    :style="{ width }"
  >
    <!-- 标题 -->
    <div class="header">
      <span class="title">
        <span>{{ title }}</span>
        <i
          v-if="icon"
          class="icon-arrow-right-outlined"
          style="margin-right:12px;cursor: pointer; "
        />
      </span>
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
  justify-content: space-between;
}
.title {
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  padding: 14px 0 16px;
  line-height: 28px;
  color: #202940;
  .icon-arrow-right-outlined:before {
    color: #a0a8ae;
  }
}
.button--wr {
  padding-bottom: 18px;
  padding-top: 6px;
}
</style>

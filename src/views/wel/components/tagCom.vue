<template>
  <div
    class="wrap"
    :style="{ width }"
  >
    <tagTitle
      :title="title"
      :icon="icon"
      @click="handelClick"
    />
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
  </div>
</template>

<script>
import tagTitle from './tagTitle'
export default {
  name: 'TagCom',
  components: { tagTitle },
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
    },
    handelClick(e) {
      this.$emit('click-icon', e)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  /deep/ .el-tabs__header {
    margin-bottom: 0px;
  }
}
</style>

<template>
  <el-popover
    placement="bottom-start"
    trigger="click"
    :width="treeMinWidth"
  >
    <div :class="{ limitCheck: limitCheck || false }">
      <el-tree
        ref="categoryTree"
        :data="option.dicData || []"
        show-checkbox
        :check-strictly="true"
        :node-key="keyID"
        :props="{ label: label }"
        @check="handleCheckChange"
      />
    </div>
    <el-button
      ref="treeBtn"
      slot="reference"
      class="tree-button"
    >
      <el-tag
        v-for="c in treeList"
        :key="c[keyID]"
        size="small"
        closable
        @close="handleCloseCategory(c[keyID])"
      >
        {{ c[label] }}
      </el-tag>
      <div>
        {{ option.placeholder }}
      </div>
      <i
        class="el-icon-arrow-down el-icon--right"
        style="float:right"
      />
    </el-button>
  </el-popover>
</template>

<script>
export default {
  name: 'TreeSelect',
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      treeMinWidth: '300',
      treeList: []
    }
  },
  computed: {
    limitCheck() {
      return this.option.limitCheck || false
    },
    label() {
      return this.option.props ? this.option.props.label : 'label'
    },
    keyID() {
      return this.option.props ? this.option.props.value : 'id'
    }
  },
  watch: {
    filterText(val) {
      this.$refs.selectTree.filter(val)
    },
    treeList: {
      handler(val) {
        this.$emit('input', val)
        console.log(val)
      },
      deep: true
    }
  },
  mounted() {
    console.log(this.option)
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.$nextTick(() => {
        this.treeMinWidth = this.$refs.treeBtn.$el.offsetWidth - 25 + ''
      })
    },
    handleCloseCategory() {},
    handleCheckChange(data, checked) {
      this.treeList = checked.checkedNodes
    }
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.selectInput {
  padding: 0 5px;
  box-sizing: border-box;
}
/deep/ .el-tree-node.is-current > .el-tree-node__content {
  color: #606266;
}
.tree-button {
  width: 100%;
  height: 36px;
  line-height: 36px;
  text-align: left;
  padding: 0 10px !important;
  /deep/ .el-icon--right {
    line-height: 36px;
  }
}

.limitCheck {
  /deep/ .is-leaf + .el-checkbox .el-checkbox__inner {
    display: inline-block;
  }
  /deep/ .el-checkbox__input > .el-checkbox__inner {
    display: none;
  }
}
</style>

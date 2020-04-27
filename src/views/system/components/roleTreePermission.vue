<template>
  <div>
    <div class="limit-title">
      {{ title }}
    </div>
    <el-tree
      ref="tree"
      :data="treeList || []"
      :default-expanded-keys="[1]"
      :default-checked-keys="defaultValue"
      :highlight-current="true"
      show-checkbox
      :node-key="defaultProps.id"
      :props="{ label: defaultProps.label }"
      :expand-on-click-node="false"
      @check="handleCheck"
      @node-click="nodeClick"
    />
  </div>
</template>

<script>
export default {
  name: 'TreePermission',
  props: {
    title: {
      type: String,
      default: ''
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          id: 'id',
          label: 'label'
        }
      }
    },
    treeList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      defaultValue: []
    }
  },
  watch: {
    treeList: {
      handler(val) {
        if (val.length > 0) {
          this.defaultValue = []
          this.findValue(val, this.defaultValue)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleCheck(data, node) {
      const treeKeys = node.checkedKeys
      this.setOwn(this.treeList, treeKeys)
    },
    // 根据树形内选中的节点，改变数据内的isOwn字段
    setOwn(arr, treeKeys) {
      arr.forEach((item) => {
        item.isOwn = treeKeys.indexOf(item[this.defaultProps.id]) > -1
        if (item.children && item.children.length > 0) {
          this.setOwn(item.children, treeKeys)
        }
      })
    },
    nodeClick(node, data) {
      this.$emit('nodeClick', node, data)
    },
    findValue(arr, data) {
      arr.forEach((item) => {
        if (item.isOwn) {
          data.push(item[this.defaultProps.id])
        }
        if (item.children && item.children.length > 0) {
          this.findValue(item.children, data)
        }
      })
    }
  }
}
</script>

<style scoped>
.limit-title {
  font-size: 18px;
  margin-bottom: 20px;
}
</style>

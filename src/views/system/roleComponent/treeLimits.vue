<template>
  <div>
    <div class="limit-title">
      {{ title }}
    </div>
    <el-tree
      ref="tree"
      :data="data || []"
      :default-expanded-keys="value"
      :default-checked-keys="value"
      show-checkbox
      :check-strictly="true"
      :node-key="defaultProps.key"
      :props="{ label: defaultProps.label }"
      @check="handleCheckChange"
    />
  </div>
</template>

<script>
export default {
  name: 'TreeLimits',
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          key: 'key',
          label: 'label'
        }
      }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    handleCheckChange(data, checked) {
      this.$emit('input', checked.checkedKeys)
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

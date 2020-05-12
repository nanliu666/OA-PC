<template>
  <div>
    <div class="limit-title">
      {{ title }}
    </div>
    <div v-if="checkList.length > 0">
      <el-checkbox
        v-if="allCheck"
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
      >
        全选
      </el-checkbox>
      <div style="margin: 10px 0;" />
      <div
        v-for="(data, index) in checkList"
        :key="index"
        style="margin-bottom: 10px;"
      >
        <el-checkbox
          v-model="data[defaultProps.check]"
          :label="data[defaultProps.value]"
        >
          {{ data[defaultProps.label] }}
        </el-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CheckPermission',
  props: {
    title: {
      type: String,
      default: ''
    },
    checkList: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          value: 'value',
          label: 'label'
        }
      }
    },
    allCheck: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      item: {},
      checkAll: false,
      isIndeterminate: false
    }
  },
  watch: {
    checkList: {
      handler(val) {
        if (val.length > 0) {
          // 列表选中状态改变时，改变全选按钮状态
          // console.log(val)
          val.map((it) => {
            if (it.isOwn) {
              it.isOwn = true
            } else {
              it.isOwn = false
            }
          })
          const isOwns = val.filter((item) => !!item[this.defaultProps.check]).length
          this.isIndeterminate = 0 < isOwns && isOwns < val.length // 半选状态
          this.checkAll = isOwns === val.length // 全选状态
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 根据全选按钮状态，改变列表中的isOwn字段
    handleCheckAllChange(val) {
      this.checkList.forEach((item) => {
        if (!item[this.defaultProps.check]) {
          item.operatorType = val ? 'Add' : 'Del'
        }
        item[this.defaultProps.check] = val
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

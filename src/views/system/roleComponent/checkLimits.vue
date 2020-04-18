<template>
  <div>
    <div class="limit-title">
      {{ title }}
    </div>
    <el-checkbox
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>
    <div style="margin: 10px 0;" />
    <el-checkbox-group
      v-model="checkData"
      @change="handleCheckedCitiesChange"
    >
      <div
        v-for="(data, index) in checkList"
        :key="index"
        style="margin-bottom: 10px;"
      >
        <el-checkbox :label="data[defaultProps.value]">
          {{ data[defaultProps.label] }}
        </el-checkbox>
      </div>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  name: 'CheckLimits',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [Array, String],
      default: () => {
        return []
      }
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
    }
  },
  data() {
    return {
      checkAll: false,
      checkData: this.value,
      isIndeterminate: true
    }
  },
  watch: {
    checkData: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkData = val ? this.checkList.map((item) => item.orgId) || [] : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.checkList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkList.length
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

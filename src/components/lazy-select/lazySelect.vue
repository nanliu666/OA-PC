<template>
  <el-select
    v-loadmore="loadOptionData"
    :value="value"
    :placeholder="placeholder"
    @change="handleChange"
  >
    <el-option
      v-for="(item, index) in optionList"
      :key="optionProps.key ? item[optionProps.key] : index"
      :label="item[optionProps.label]"
      :value="item[optionProps.value]"
    />
    <div
      v-show="loading"
      class="loading"
    >
      <i class="el-icon-loading" />
    </div>
    <div
      v-show="noMore"
      style="text-align: center; font-size:14px;color: #606266;"
    >
      没有更多了
    </div>
  </el-select>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Boolean],
      default: ''
    },
    load: {
      type: Function,
      default: () => {}
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    optionProps: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value',
        key: null
      })
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      optionList: [],
      loading: false,
      noMore: false,
      pageNo: 1
    }
  },
  created() {
    this.loadOptionData()
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    },
    loadOptionData() {
      if (this.noMore) {
        return
      }
      this.loading = true
      this.load({ pageNo: this.pageNo, pageSize: this.pageSize })
        .then((res) => {
          this.optionList.push(...res.data)
          if (res.data.length < this.pageSize) {
            this.noMore = true
          }
          this.pageNo += 1
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  text-align: center;
}
</style>

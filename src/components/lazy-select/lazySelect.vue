<template>
  <el-select
    v-loadmore="loadOptionData"
    :value="value"
    :placeholder="placeholder"
    :filterable="searchable"
    :remote="searchable"
    :remote-method="remoteMethod"
    @change="handleChange"
    @visible-change="visibleChange"
  >
    <el-option
      v-for="item in _.compact([firstOption, ...optionList])"
      :key="optionProps.key ? item[optionProps.key] : item[optionProps.value]"
      :label="optionProps.formatter ? optionProps.formatter(item) : item[optionProps.label]"
      :value="item[optionProps.value]"
    />
    <div
      v-show="loading"
      class="loading"
    >
      <i class="el-icon-loading" />
    </div>
    <div
      v-if="loading"
      slot="empty"
    >
      <div class="loading">
        <i class="el-icon-loading" />
      </div>
    </div>
    <div
      v-show="noMore"
      style="text-align:center;font-size:14px;color:#606266;line-height:34px;"
    >
      没有更多了
    </div>
  </el-select>
</template>
<script>
import Emitter from '@/mixins/elFormEmitter'
export default {
  mixins: [Emitter],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Boolean],
      default: ''
    },
    /** 默认选项
     * 解决初始已选中的值没有被翻译的问题
     * 对应值的跟optionProps相匹配
     */
    firstOption: {
      type: Object,
      default: null
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
    },
    searchable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      optionList: [],
      loading: false,
      noMore: false,
      pageNo: 1,
      search: ''
    }
  },
  created() {
    this.loadOptionData()
  },
  methods: {
    visibleChange(visible) {
      if (visible === false && this.searchable && this.search !== '') {
        this.search = ''
        this.loadOptionData(true)
      }
    },
    handleChange(value) {
      this.$emit('change', value)
      this.dispatch('ElFormItem', 'el.form.change', value)
    },
    loadOptionData(refresh = false) {
      if ((this.noMore && !refresh) || this.loading) {
        return
      }
      const firstOption = this.firstOption
      if (refresh) {
        this.optionList = firstOption ? [firstOption] : []
        this.pageNo = 1
      }
      this.loading = true

      this.load({ pageNo: this.pageNo, pageSize: this.pageSize, search: this.search })
        .then((res) => {
          this.pageNo += 1
          if (firstOption) {
            this.optionList.push(
              ...res.data.filter(
                (item) => item[this.optionProps.value] !== firstOption[this.optionProps.value]
              )
            )
          } else {
            this.optionList.push(...res.data)
          }

          if (res.data.length < this.pageSize) {
            this.noMore = true
          } else {
            this.noMore = false
          }
          this.$emit('update:optionList', this.optionList)
        })
        .finally(() => {
          this.loading = false
        })
    },
    remoteMethod(search) {
      this.search = search
      this.loadOptionData(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  padding: 12px 0;
  text-align: center;
}
</style>

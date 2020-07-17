<template>
  <div class="IconSelect">
    <el-input
      :placeholder="placeholder"
      :value="value"
      class="input"
      clearable
      @focus="handleInputClick"
      @clear="() => (_value = '')"
    />
    <el-tag
      class="preview"
      type="info"
    >
      <i :class="value || 'iconfont'" />
    </el-tag>
    <icon-select-dialog
      ref="modal"
      :icon-list="iconList"
      :visible.sync="iconSelectDialogVisible"
      :value.sync="_value"
    />
  </div>
</template>

<script>
export default {
  name: 'IconSelect',
  components: {
    IconSelectDialog: () => import(/* webpackChunkName: "views" */ './icon-select-dialog')
  },
  props: {
    iconList: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择图标'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      iconSelectDialogVisible: false
    }
  },
  computed: {
    _value: {
      get() {
        return this.value
      },
      set(val) {
        // 修改之后关闭弹窗
        this.iconSelectDialogVisible = false
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleInputClick() {
      this.$refs['modal'].init()
    }
  }
}
</script>

<style lang="sass">
.IconSelect
  align-items: stretch
  display: flex
  width: 100%
  .input
    input
      border-top-right-radius: 0
      border-bottom-right-radius: 0
  .preview
    background-color: #F2F5F7
    border-bottom-left-radius: 0
    border-top-left-radius: 0
    border: 1px solid #DCDFE6
    border-left: 0
    color: #909399
    display: flex
    height: inherit
    justify-content: center
    padding: 0 20px
    position: relative
    vertical-align: middle
    white-space: nowrap
    width: 1px
</style>

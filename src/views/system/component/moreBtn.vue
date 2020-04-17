<template>
  <el-popover
    placement="bottom"
    :width="width"
    trigger="hover"
  >
    <slot name="more-custom" />
    <div class="more-btn">
      <div
        v-for="(item, index) in btnList"
        :key="index"
        class="btn-list"
      >
        <div
          :class="{ 'btn-active': currentKey === item.key }"
          class="btn-item"
          @click="onClickBtn(item.key)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div
      slot="reference"
      style="margin-left: 10px;display: inline-block"
    >
      <el-button
        icon="el-icon-more"
        type="text"
        size="medium"
      />
    </div>
  </el-popover>
</template>

<script>
export default {
  name: 'MoreBtn',
  props: {
    width: {
      type: String,
      default: '80'
    },
    btnList: {
      type: Array,
      default: () => []
    },
    row: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      currentKey: ''
    }
  },
  methods: {
    onClickBtn(key) {
      this.currentKey = key
      this.$emit('handleBtn', this.row, key)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-list {
  .btn-item {
    padding: 10px 0;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    color: #666666;
  }
  .btn-active {
    color: #333333;
  }
}
</style>

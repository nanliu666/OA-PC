<template>
  <el-color-picker
    v-model="themeVal"
    size="mini"
    style="padding-top:18px;"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script>
import color from '@/mixins/color'
export default {
  name: 'TopColor',
  mixins: [color()],
  data() {
    return {
      chalk: ''
    }
  }
}
</script>

<style>
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>

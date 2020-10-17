<template>
  <div class="location-picker">
    <el-cascader
      v-model="form.location"
      class="location-picker__cascader"
      :options="provinceAndCityData"
      placeholder="请选择地址"
    />
    <el-input
      v-model="form.details"
      class="location-picker__input"
      placeholder="(选填)请输入详细地址"
    />
  </div>
</template>

<script>
import provinceAndCityData from '@/const/provinceAndCityData'

export default {
  name: 'LocationPicker',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        ...this.value
      },
      provinceAndCityData
    }
  },
  watch: {
    form: {
      deep: true,
      handler(nextProp) {
        this.$emit('input', nextProp)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.location-picker
  &__cascader
    width: 100%
  &__input
    margin-top: .5rem
</style>

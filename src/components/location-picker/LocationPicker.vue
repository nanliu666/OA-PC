<template>
  <div class="location-picker">
    <el-cascader
      v-model="locations"
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
      }
    }
  },

  computed: {
    locations: {
      get() {
        const { provinceAndCityData } = this
        let result = []
        ;(function findCode(arr, locations, target) {
          _.each(arr, (item) => {
            if (item.value === target) {
              locations.push(item)
              result = locations
              return false
            } else if (!_.isEmpty(item.children)) {
              findCode(item.children, _.concat(locations, item), target)
            }
          })
          return
        })(provinceAndCityData, [], this.form.location)
        return result.map(({ value }) => value)
      },
      set(val) {
        this.form.location = _.last(val)
      }
    },
    provinceAndCityData: () => provinceAndCityData
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

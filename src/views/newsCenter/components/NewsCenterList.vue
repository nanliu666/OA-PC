<template>
  <div class="NewsCenterList wrapper">
    <ul class="container__lists">
      <li
        is="NewsCenterListItem"
        v-for="(item, index) of data"
        :key="index"
        :data="item"
      />
    </ul>
  </div>
</template>

<script>
import NewsCenterListItem from './NewsCenterListItem'

export default {
  name: 'NewsCenterList',
  components: {
    NewsCenterListItem
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },

  computed: {}
}
</script>

<style lang="sass">
.NewsCenterList
</style>

<template>
  <div class="CardGroup">
    <div
      v-for="(group, index) of columns"
      :key="index"
      :class="`groupbox shadow--${shadow}`"
      :style="{ 'flex-grow': group.length, background }"
    >
      <div
        v-for="(item, i) of group"
        :key="i"
        :class="_.eq(value, item.prop) ? 'groupbox__item--active' : 'groupbox__item'"
        @click="() => handleItemClick(item)"
      >
        <!--  -->
        <span class="content__label">{{ item.label }}</span>
        <span class="content__value">{{
          item.formatter
            ? item.formatter(_.get(data, item.prop, '-'))
            : formatter(_.get(data, item.prop, '-'))
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    background: {
      type: [String, Boolean],
      default: '#fff'
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: String,
      default: null
    },
    formatter: {
      type: Function,
      default: (text) => text
    },
    shadow: {
      type: String,
      default: 'never'
    }
  },
  data() {
    return {}
  },

  methods: {
    // DEBUG:
    handleItemClick(item) {
      this.$emit('input', item.prop)
      return item
    }
  }
}
</script>

<style lang="sass" scoped>
$color_active: #368afa
$color_border: #e3e7e9

.CardGroup
  display: flex
  justify-content: space-between
  .shadow
    box-shadow: 0 2px 12px 0 #0002
    transition: box-shadow .5s
    &--always,
    &--hover:hover
      @extend .shadow
    &--never
      box-shadow: unset
  .groupbox
    display: flex
    flex-grow: 1
    justify-content: space-around
    &:not(:last-child)
      margin-right: 1rem // gutter
    &__item
      cursor: pointer
      display: flex
      flex-direction: column
      flex-grow: 1
      height: 46px
      justify-content: center
      margin: 30px 0
      &:not(:last-child)
        border-right: 1px solid $color_border
      text-align: center
      &--active
        @extend .groupbox__item
        color: $color_active
        cursor: default
  .content
    display: block
    &__label
      @extend .content
      font-size: 12px
      line-height: 18px
    &__value
      @extend .content
      font-size: 16px
      line-height: 24px
</style>

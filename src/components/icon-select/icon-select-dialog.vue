<template>
  <el-dialog
    :before-close="close"
    :visible="visible"
    append-to-body
    class="IconSelectDialog"
    title="请输入菜单图标"
    top="30vh"
    width="30%"
  >
    <div class="content">
      <el-tabs
        v-model="tab"
        @tab-click="switchTab"
      >
        <el-tab-pane
          v-for="({ label, list }, index) of iconList"
          :key="index"
          :label="label"
          :name="label"
        >
          <ul class="icon__list">
            <li
              v-for="(icon, index) of list"
              :key="index"
              class="icon__list--item"
              @click="() => $emit('update:value', icon)"
            >
              <span :title="icon">
                <i :class="icon" />
              </span>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    iconList: Array,
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 默认选中一个
      tab: _.get(this.iconList, '[0].label')
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    init() {
      this.$emit('update:visible', true)
    },
    switchTab() {}
  }
}
</script>

<style lang="sass">
// colors
$forecolor: #616266aa
$color_border: #373B4D;
$color_active: #606266

.IconSelectDialog
  .content
    width: 500px
  ul
    display: block
    list-style-type: disc
    margin-block-end: 1em
    margin-block-start: 1em
    margin-inline-end: 0px
    margin-inline-start: 0px
    padding-inline-start: 40px
  .icon__list
    border-bottom-color: $color_border
    border-left-color: $color_border
    border-radius: 4px
    border-right-color: $color_border
    border-top-color: $color_border
    border: 1px solid #eaeefb
    list-style-image: initial
    list-style: none
    overflow: hidden
    padding: 0
    &--item
      border-bottom-color: $color_border
      border-bottom: 1px solid #eee
      border-right-color: $color_border
      border-right: 1px solid #eee
      color: #666
      color: $forecolor
      float: left
      font-size: 13px
      height: 80px
      line-height: 120px
      margin-bottom: -1px
      margin-right: -1px
      text-align: center
      transition: color .15s linear
      width: 16.66%
      span
        align-items: center
        color: $forecolor
        display: flex
        height: 100%
        justify-content: center
        width: 100%
        i
          font-size: 20px !important
          transition: font-size .2s ease-in-out;
        &:hover
          color: $color_active
          i
            font-size: 36px !important
</style>

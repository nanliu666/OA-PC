<template>
  <div class="empty-class">
    <el-image
      style="width: 80%"
      :src="emptyOption.src"
      fit="fill"
    />
    <div v-text="emptyOption.text" />
  </div>
</template>

<script>
import nodata from '@/assets/images/nodata.png'
export default {
  name: 'ComEmpty',
  props: {
    emptyOption: {
      type: Object,
      default: function() {
        return {
          visibile: true,
          src: nodata,
          text: '暂无数据~'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.empty-class {
  background-color: #fff;
  height: 100%;
  min-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 18px;
  color: #718199;
}
</style>

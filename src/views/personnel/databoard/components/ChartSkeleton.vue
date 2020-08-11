<!-- 柱状图组件(兼容折线图) -->
<template>
  <div class="CharSkeleton container">
    <div
      ref="container"
      v-loading="true"
      class="container__chart"
    />
  </div>
</template>

<style lang="sass" scoped>
@import "~@/views/personnel/databoard/components/styles/chartCommon"
</style>

<template>
  <div class="container">
    <keep-alive v-if="$route.meta.$keepAlive">
      <router-view />
    </keep-alive>
    <router-view v-if="!$route.meta.$keepAlive" />
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>

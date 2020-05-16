<template>
  <div class="container">
    <keep-alive
      v-if="$route.meta.$keepAlive"
      :key="$route.fullPath"
    >
      <router-view />
    </keep-alive>
    <router-view
      v-else
      :key="$route.fullPath"
    />
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>

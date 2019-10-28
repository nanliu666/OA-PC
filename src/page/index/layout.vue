<template>
  <div>
    <keep-alive>
      <router-view class="avue-view" v-if="$route.meta.$keepAlive || $route.meta.$keepAlive === undefined" />
    </keep-alive>
    <router-view class="avue-view" v-if="!$route.meta.$keepAlive  && $route.meta.$keepAlive !== undefined" />
  </div>
</template>

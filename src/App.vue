<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      yyy:55
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

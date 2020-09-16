<template>
  <div class="footer-container">
    {{ copy }}
  </div>
</template>

<script>
export default {
  name: 'MgFooter',
  data() {
    return {
      copy: '版权所有© 2020 上海易宝软件有限公司　 苏ICP备09013856号-1'
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  font-size: 12px;
}
</style>

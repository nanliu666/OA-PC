<template>
  <div class="footer-container">
    {{ JSON.parse(tenantContent).copyright || copy }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MgFooter',
  data() {
    return {
      copy: '版权所有© 2020 上海易宝软件有限公司　苏ICP备09013856号-1'
    }
  },
  computed: {
    ...mapGetters(['tenantContent'])
  },
  created() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.footer-container {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
</style>

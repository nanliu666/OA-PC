<template>
  <div
    class="avue-logo"
    @click="goWork"
  >
    <img :src="JSON.parse(tenantContent).logo || logo">
  </div>
</template>

<script>
import defaultLogoImg from '../../../public/img/logo.png'
import { mapGetters } from 'vuex'
export default {
  name: 'Logo',
  data() {
    return {
      logo: defaultLogoImg
    }
  },
  computed: {
    ...mapGetters(['website', 'keyCollapse', 'tenantContent'])
  },
  created() {},
  methods: {
    goWork() {
      this.$router.replace({ path: '/wel/index' })
    }
  }
}
</script>

<style lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.avue-logo {
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  width: 224px;
  height: 56px;
  font-size: 20px;
  overflow: hidden;
  box-sizing: border-box;
  color: #20222a;
  z-index: 1024;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px 0 15px 32px;
  img {
    display: block;
    width: 100%;
    height: 40px;
    width: 124px;
  }
}
</style>

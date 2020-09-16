<template>
  <div
    class="avue-logo"
    @click="goWork"
  >
    <img src="../../../public/img/logo.png">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Logo',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['website', 'keyCollapse'])
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
  // line-height: 56px;
  // background-color: #20222a;
  font-size: 20px;
  overflow: hidden;
  box-sizing: border-box;
  // box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  // color: rgba(255, 255, 255, 0.8);
  color: #20222a;
  z-index: 1024;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    display: block;
  }
}
</style>

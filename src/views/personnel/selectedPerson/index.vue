<template>
  <div class="selectedPerson">
    <el-button
      type="primary"
      @click="handlerArrange"
    >
      buttonCont
    </el-button>
    <arrange
      v-if="arrangeDialog"
      :dialog-visible.sync="arrangeDialog"
    />
  </div>
</template>

<script>
import arrange from './components/arrangeInterview'
export default {
  name: 'Index',
  components: {
    arrange
  },
  data() {
    return {
      arrangeDialog: false
    }
  },
  methods: {
    handlerArrange() {
      this.arrangeDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.selectedPerson {
}
</style>

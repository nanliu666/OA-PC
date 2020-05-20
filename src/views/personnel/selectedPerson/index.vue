<template>
  <div class="selectedPerson">
    <el-button
      type="primary"
      @click="handlerArrange"
    >
      buttonCont
    </el-button>
    <el-button
      type="primary"
      @click="handlerEliminate"
    >
      淘汰
    </el-button>
    <arrange
      v-if="arrangeDialog"
      :dialog-visible.sync="arrangeDialog"
    />
    <eliminate
      v-if="eliminateDialog"
      :dialog-visible.sync="eliminateDialog"
    />
  </div>
</template>

<script>
import arrange from './components/arrangeInterview'
import eliminate from './components/eliminateDiaLog'
export default {
  name: 'Index',
  components: {
    arrange,
    eliminate
  },
  data() {
    return {
      arrangeDialog: false,
      eliminateDialog: false
    }
  },
  methods: {
    handlerArrange() {
      this.arrangeDialog = true
    },
    handlerEliminate() {
      this.$confirm(
        '该候选人已安排面试，淘汰候选人后原面试安排将自动取消，您确认要淘汰该候选人吗?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.eliminateDialog = true
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.selectedPerson {
}
</style>

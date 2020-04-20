<template>
  <div>
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="500px"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <div
        class="add-wrap"
        style="padding: 0 40px"
      >
        <div />
        <div />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserEdit',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.visible
      },
      set: function(val) {
        console.log('set', val)
        this.$emit('update:visible', val)
      }
    }
  }
}
</script>

<style scoped>
.add-wrap {
}
</style>

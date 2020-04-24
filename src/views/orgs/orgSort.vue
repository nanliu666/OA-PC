<template>
  <basic-container :block="true">
    <el-page-header
      content="调整排序"
      @back="goBack"
    />
    <div class="treeBox">
      <el-tree
        :data="data"
        node-key="orgId"
        :props="{ label: 'orgName' }"
        default-expand-all
        draggable
      />
    </div>
    <div class="btnBox">
      <el-button
        size="medium"
        @click="close"
      >
        取消
      </el-button>
      <el-button
        type="primary"
        size="medium"
        @click="onSubmit"
      >
        保存
      </el-button>
    </div>
  </basic-container>
</template>

<script>
import { getOrgTree, sortOrgTree } from '@/api/org/org'

export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    getOrgTree({ parentOrgId: 0 }).then((res) => {
      this.data = res
    })
  },
  methods: {
    goBack() {
      this.$router.push('/orgs/orgManagement')
    },
    close() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.goBack()
    },
    loadSort(arr, i) {
      arr.forEach((item) => {
        item.sort = i
        if (item.children.length > 0) {
          this.loadSort(item.children, i + 1)
        }
      })
    },
    onSubmit() {
      this.loadSort(this.data, 1)
      sortOrgTree({ orgs: this.data }).then(() => {
        this.$message.success('保存成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.treeBox {
  width: calc (100% - 160) px;
  padding: 40px 80px 60px;
}
.btnBox {
  margin: 0 0 10px 100px;
  height: 40px;
  position: absolute;
  bottom: 0;
}
/deep/ .el-tree-node__content {
  height: 40px;
  cursor: move;
  border-bottom: 1px solid #f2f2f2;
}
/deep/ .basic-container {
  height: 100%;
  .el-card {
    height: 100%;
  }
}
</style>

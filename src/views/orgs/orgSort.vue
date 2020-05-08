<template>
  <div style="height: 100%">
    <el-page-header
      content="调整排序"
      class="pageHeader"
      @back="goBack"
    />
    <basic-container :block="true">
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
  </div>
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
    loadSort(arr) {
      arr.forEach((item, index) => {
        item.sort = index + 1
        if (item.children && item.children.length > 0) {
          this.loadSort(item.children)
        }
      })
    },
    onSubmit() {
      this.loadSort(this.data)
      // { orgs: this.data }
      sortOrgTree(this.data).then(() => {
        this.$message.success('保存成功')
        getOrgTree({ parentOrgId: 0 }).then((res) => {
          this.data = res
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pageHeader {
  height: 48px;
  padding: 0 24px;
  line-height: 48px;
  font-size: 18px;
}
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
  height: 42px;
  cursor: move;
  border-bottom: 1px solid #f2f2f2;
}
/deep/ .basic-container {
  height: calc(100% - 48px);
  .el-card {
    height: 100%;
  }
}
/deep/ .el-tree-node__expand-icon {
  color: #115fd4;
}
/deep/ .el-tree-node__label {
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #202940;
  line-height: 43px;
}
</style>

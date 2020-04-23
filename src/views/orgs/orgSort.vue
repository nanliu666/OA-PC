<template>
  <basic-container>
    <el-page-header
      content="调整排序"
      @back="goBack"
    />
    <div class="treeBox">
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
      />
    </div>
    <div class="btnBox">
      <el-button size="medium">
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
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2',
              children: [
                {
                  id: 11,
                  label: '三级 3-2-1'
                },
                {
                  id: 12,
                  label: '三级 3-2-2'
                },
                {
                  id: 13,
                  label: '三级 3-2-3'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.treeBox {
  width: calc (100% - 160) px;
  padding: 0 80px;
}
.btnBox {
  margin: 30px 0 0 100px;
}
/deep/ .el-tree-node__content {
  height: 40px;
  cursor: move;
  border-bottom: 1px solid #f2f2f2;
}
</style>

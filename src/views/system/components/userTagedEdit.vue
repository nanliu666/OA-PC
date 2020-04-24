<template>
  <el-dialog
    title="添加成员"
    :visible="visible"
    width="800px"
    append-to-body
    :before-close="close"
  >
    <div class="content-wr">
      <div class="left">
        <el-input
          v-model="filterText"
          placeholder="成员名称"
        />
        <el-tree
          ref="tree"
          :data="depTree"
          show-checkbox
          default-expand-all
          node-key="id"
          :props="props"
          :filter-node-method="filterNode"
          @check="handleCheckChange"
        />
      </div>
      <div class="right">
        <div>
          <span class="title">已添加成员</span>
          <span style="float:right;">
            <el-button
              type="text"
              @click="handleUnselectAll()"
            >清空</el-button>
          </span>
        </div>
        <el-tag
          v-for="item in selectList"
          :key="item.id"
          size="small"
          closable
          @close="handleUnselect(item)"
        >
          {{ item.title }}
        </el-tag>
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="close">取 消</el-button>
      <el-button
        v-loading="loading"
        type="primary"
        @click="handleSubmit"
      >
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDeptTree } from '@/api/system/dept'

export default {
  name: 'UserTagedEdit',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      filterText: '',
      props: {
        labelText: '标题',
        label: 'title',
        value: 'value',
        children: 'children'
      },
      selectList: [],
      depTree: []
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getDeptTree(this.website.tenantId)
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    handleCheckChange(data, checked) {
      this.selectList = checked.checkedNodes.filter((i) => !i.children)
    },
    handleUnselect(item) {
      this.selectList = this.selectList.filter((i) => i != item)
      this.$refs.tree.setCheckedKeys(this.selectList.map((i) => i.id))
    },
    handleUnselectAll() {
      this.selectList = []
      this.$refs.tree.setCheckedKeys([])
    },
    close() {
      this.$emit('update:visible', false)
    },
    edit(data) {
      this.form = { ...data }
      this.$emit('update:visible', true)
    },
    getDeptTree(tenantId) {
      getDeptTree(tenantId).then((res) => {
        this.depTree = res.data.data
      })
    },
    handleSubmit() {}
  }
}
</script>
<style lang="scss">
.content-wr {
  display: flex;
  .left {
    width: 60%;
    padding-right: 20px;
  }
  .right {
    border-left: 1px solid #f2f2f2;
    width: 40%;
    padding-left: 20px;
    .title {
      line-height: 40px;
    }
    .el-tag {
      margin-right: 12px;
      margin-bottom: 8px;
    }
  }
}
</style>

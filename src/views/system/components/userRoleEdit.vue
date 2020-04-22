<template>
  <el-dialog
    title="角色设置"
    :visible="visible"
    width="800px"
    append-to-body
    :before-close="close"
  >
    <div class="title-wr">
      <div class="title">
        已选择
      </div>
      <el-tag
        v-for="item in userList"
        :key="item.id"
        size="small"
      >
        {{ item.name }}
      </el-tag>
    </div>
    <div class="content-wr">
      <div class="left">
        <div class="title">
          角色列表
        </div>
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
          <span class="title">已添加角色</span>
          <span style="float:right;">
            <el-button type="text">预览权限</el-button>
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
  name: 'UserRoleEdit',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    userList: {
      type: Array,
      default: () => [{ name: '张三', id: 1 }]
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
      roleEdit: false
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
.el-dialog__body {
  padding-top: 10px;
}
.title-wr {
  padding-bottom: 10px;
  .title {
    line-height: 30px;
  }
}
.content-wr {
  display: flex;
  border: 1px solid #f2f2f2;

  .left {
    width: 60%;
    padding: 8px;
    padding-right: 20px;
    .title {
      line-height: 30px;
    }
  }
  .right {
    border-left: 1px solid #f2f2f2;
    width: 40%;
    padding: 8px;
    padding-left: 20px;
    .title {
      line-height: 30px;
    }
    .el-tag {
      margin-right: 12px;
      margin-bottom: 8px;
    }
  }
}
</style>

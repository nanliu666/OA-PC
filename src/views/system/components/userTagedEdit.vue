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
          :data="orgTree"
          show-checkbox
          default-expand-all
          node-key="id"
          :props="props"
          :filter-node-method="filterNode"
          :check-on-click-node="true"
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
          {{ item.name }}
        </el-tag>
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        @click="close"
      >取 消</el-button>
      <el-button
        :loading="submitting"
        size="medium"
        type="primary"
        @click="handleSubmit"
      >
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getOrgUserTree, createTagUser } from '@/api/system/user'

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
      submitting: false,
      filterText: '',
      props: {
        disabled: (data) => data.type !== 'user' && data.users.length === 0,
        label: (item) => item.orgName || item.name,
        children: 'children'
      },
      selectList: [],
      oldSelectList: [],
      orgTree: [],
      tagId: null
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getOrgUserTree()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name && data.name.indexOf(value) !== -1
    },
    handleCheckChange(data, checked) {
      this.selectList = checked.checkedNodes.filter((i) => !i.children)
    },
    handleUnselect(item) {
      this.selectList = this.selectList.filter((i) => i.id != item.id)
      this.$refs.tree.setCheckedKeys(this.selectList.map((i) => i.id))
    },
    handleUnselectAll() {
      this.selectList = []
      this.$refs.tree.setCheckedKeys([])
    },
    close() {
      this.clear()
      this.$emit('update:visible', false)
    },
    clear() {
      this.tagId = null
      this.selectList = []
      this.oldSelectList = []
      this.$refs.tree.setCheckedKeys([])
    },
    init(data) {
      this.tagId = data.tagId
      const list = data.userList.map((user) => ({ ...user, id: user.userId }))
      this.selectList = list.slice()
      this.oldSelectList = list.slice()

      this.$emit('update:visible', true)
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.selectList.map((i) => i.id))
      })
    },
    getOrgUserTree(tenantId) {
      getOrgUserTree(tenantId).then((res) => {
        this.resolveTree(res)
        this.orgTree = res
      })
    },
    /**
     * 比较新旧list，新增,减少的数据分别添加标识
     * @param {Object} newIdList
     * @param {Object} oldIdList
     */
    diff(newIdList, oldIdList) {
      // 要添加的
      const addIdList = this._.difference(newIdList, oldIdList)
      // 要删除的
      const removeIdList = this._.difference(oldIdList, newIdList)

      const result = addIdList
        .map((id) => ({
          userId: id,
          operatorType: 'Add'
        }))
        .concat(
          removeIdList.map((id) => ({
            userId: id,
            operatorType: 'Del'
          }))
        )

      return result
    },
    handleSubmit() {
      this.submitting = true
      createTagUser(
        this.tagId,
        this.diff(
          this.selectList.map((i) => i.userId),
          this.oldSelectList.map((i) => i.userId)
        )
      )
        .then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.close()
          this.$emit('after-submit')
        })
        .finally(() => {
          this.submitting = false
        })
    },
    resolveTree(tree) {
      if (tree.length > 0) {
        tree.forEach((node) => {
          let users
          if (node.users) {
            users = node.users.map((user) => ({
              ...user,
              id: user.userId,
              type: 'user'
            }))
            if (node.children) {
              node.children.push(...users)
              this.resolveTree(node.children)
            } else {
              node.children = users
            }
            if (node.orgId) {
              node.id = node.orgId
            }
          }
        })
      }
    }
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

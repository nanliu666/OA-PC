<template>
  <el-dialog
    title="请选择审批人"
    :visible="visible"
    width="800px"
    append-to-body
    :before-close="close"
  >
    <div class="content-wr">
      <div class="left">
        <el-input
          v-model="filterText"
          placeholder="搜索部门或成员姓名"
        />
        <div class="tree">
          <el-tree
            ref="tree"
            :data="orgTree"
            show-checkbox
            default-expand-all
            node-key="id"
            :props="props"
            check-strictly
            :filter-node-method="filterNode"
            :check-on-click-node="true"
            @check="handleCheckChange"
          />
        </div>
      </div>
      <div class="divider" />
      <div class="selected-container">
        已选择
        <div class="selected-list">
          <div
            v-for="item in selectList"
            :key="item.id"
            class="list-item"
          >
            <div class="head">
              <div class="avatar">
                <i class="el-icon-user" />
              </div>
              <div class="name">
                {{ item.name }}
              </div>
            </div>
            <i
              class="el-icon-close  close"
              @click="handleUnselect(item)"
            />
          </div>
        </div>
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
        v-loading="loading"
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
import { getOrgUserTree } from '@/api/system/user'

export default {
  name: 'UserPicker',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      node: {},
      loading: false,
      filterText: '',
      props: {
        disabled: (data) => (data.type !== 'user' && data.users.length === 0) || data.orgName,
        label: (item) => item.orgName || item.name,
        children: 'children'
      },
      selectList: [],
      orgTree: [],
      nodeId: null
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
      if (checked.checkedNodes.includes(data)) {
        this.$refs.tree.setCheckedNodes([data])
        this.selectList = [data]
      } else {
        this.$refs.tree.setCheckedNodes([])
        this.selectList = []
      }
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
      this.selectList = []
      this.$refs.tree.setCheckedKeys([])
    },
    init({ nodeId, selectList }) {
      this.nodeId = nodeId
      this.selectList = selectList.slice()

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
    handleSubmit() {
      this.$emit('submit', { nodeId: this.nodeId, selectList: this.selectList })
      this.close()
    },
    resolveTree(tree) {
      if (tree.length > 0) {
        tree.forEach((node) => {
          if (node.orgName) {
            node.name = node.orgName
          }
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
  border: 1px solid #efefef;
  padding: 0 24px;
  .left {
    width: 55%;
    box-sizing: border-box;
    padding: 24px 0;
  }
  .divider {
    width: 1px;
    background: #e3e7e9;
    margin: 0 24px;
  }
  .selected-container {
    flex: 1;
    padding: 24px 0;
    .selected-list {
      margin-top: 16px;
      max-height: 400px;
      overflow: auto;
      .list-item {
        display: flex;
        height: 32px;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px;
        margin-bottom: 16px;
        padding-right: 12px;
        .head {
          display: flex;
          line-height: 32px;
        }
        .avatar {
          height: 32px;
          width: 32px;
          text-align: center;
          background: #207efa;
          border-radius: 50%;
          margin-right: 8px;
          i {
            font-size: 16px;
            line-height: 32px;
            color: white;
          }
        }
        .close {
          cursor: pointer;
        }
      }
    }
  }
}
.tree {
  height: 400px;
  overflow-y: auto;
  padding-top: 10px;
}
</style>

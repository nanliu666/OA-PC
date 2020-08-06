<template>
  <el-dialog
    title="请选择审批人"
    :visible="visible"
    width="800px"
    append-to-body
    :before-close="close"
  >
    <div
      v-loading="loading"
      class="content-wr"
    >
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
            :default-checked-keys="checked"
            check-strictly
            :filter-node-method="filterNode"
            :check-on-click-node="true"
            @check="handleCheckChange"
          />
        </div>
      </div>
      <div class="right">
        <div>
          <span class="title">已选：</span>
          <span style="float:right;" />
        </div>

        <div
          v-for="item in selectList"
          :key="item.id"
          class="info flex flex-justify-between flex-items"
        >
          <div class="flex flex-justify-between flex-items">
            <!--            <el-image class="imgs" />-->
            <i
              v-if="item.children"
              class="iconfont icon-usercircle2 imgss"
            />
            <i
              v-else
              class="iconfont  icon-approval-checkin-bicolor imgs"
            />
            {{ item.name }}
          </div>
          <div class="icon">
            <i
              class="el-icon-error"
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
  name: 'UserTagedEdit',
  props: {
    org: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    users: {
      type: Array,
      default: function() {
        return []
      }
    },
    isDepartment: {
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
      oldSelectList: [],
      orgTree: [],
      tagId: null,
      checked: []
    }
  },
  watch: {
    org: {
      handler(val) {
        this.$nextTick(() => {
          if (val) {
            this.props.disabled = false
          }
        })
      },
      immediate: true,
      deep: true
    },
    users: {
      handler(val) {
        // if()

        val.map((it) => this.checked.push(it.id))
        this.selectList = val
      },
      immediate: true
    },
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
      // this.selectList = checked.checkedNodes.filter((i) => !i.children)
      this.selectList = checked.checkedNodes
    },
    handleUnselect(item) {
      this.selectList = this.selectList.filter((i) => i.id != item.id)
      this.$refs.tree.setCheckedKeys(this.selectList.map((i) => i.id))
      // this.selectList
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
      this.loading = true
      getOrgUserTree(tenantId)
        .then((res) => {
          this.resolveTree(res)
          this.orgTree = res
        })
        .finally(() => {
          this.loading = false
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
      this.$emit('addUser', this.selectList)
      this.close()
    },
    resolveTree(tree, priv) {
      // console.log(' :org="org"',tree)conso.log()
      if (tree.length > 0) {
        tree.forEach((node) => {
          if (node.orgName) {
            node.name = node.orgName
          }

          if (priv && node.orgId) {
            if (!priv.newOrgId) {
              node.newOrgId = priv.orgId + '_' + node.orgId
            } else {
              node.newOrgId = priv.newOrgId + '_' + node.orgId
            }
          }

          if (!this.isDepartment) {
            let users
            if (node.users) {
              users = node.users.map((user) => ({
                ...user,
                id: node.orgId + '_' + user.userId,
                type: 'user'
              }))
              if (node.children) {
                node.children.push(...users)
                this.resolveTree(node.children, node)
              } else {
                node.children = users
              }
              if (node.orgId) {
                node.id = node.orgId
              }
            }
          }
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.content-wr {
  display: flex;
  border: 1px solid #efefef;
  .left {
    width: 60%;
    padding-right: 20px;
    padding: 20px;
  }
  .right {
    border-left: 1px solid #f2f2f2;
    width: 40%;
    padding-left: 20px;
    height: 470px;
    overflow-y: auto;
    .title {
      line-height: 40px;
    }
    .el-tag {
      margin-right: 12px;
      margin-bottom: 8px;
    }
  }
}
.tree {
  height: 400px;
  overflow-y: auto;
  padding-top: 10px;
}
.info {
  width: 98%;
  margin: 10px 0;
  .icon:hover {
    color: #207efa;
  }
}
.imgs {
  height: 30px;
  width: 30px;
  display: inline-block;
  border-radius: 48px;
  margin-right: 10px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  background: #207efa;
  color: #fff;
}
.imgss {
  height: 30px;
  width: 30px;
  display: inline-block;
  border-radius: 48px;
  margin-right: 10px;
  line-height: 30px;
  text-align: center;
  font-size: 30px;
  background: #fff;
  color: #207efa;
}
</style>

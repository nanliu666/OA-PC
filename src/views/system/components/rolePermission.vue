<template>
  <el-dialog
    title="权限配置"
    :visible.sync="dialogVisible"
    width="800px"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    @opened="getRolePrivilege"
  >
    <div
      v-loading="loading"
      class="limit-wrap"
    >
      <el-scrollbar class="scroll-item">
        <div class="limit-item">
          <checkLimits
            v-model="org"
            title="组织"
            :check-list="orgPrivileges"
            :all-check="false"
            :default-props="{
              value: 'orgId',
              label: 'orgName',
              check: 'isOwn'
            }"
          />
        </div>
      </el-scrollbar>
      <el-scrollbar class="scroll-item scroll-tree">
        <div class="limit-item">
          <treeLimits
            v-model="tree"
            title="菜单权限"
            :default-props="menuProps"
            :tree-list="menuPrivileges"
            @nodeClick="nodeClick"
          />
        </div>
      </el-scrollbar>
      <el-scrollbar class="scroll-item">
        <div class="limit-item">
          <checkLimits
            v-model="page"
            title="页面控制权限"
            :check-list="buttonData[buttonMenuId] || []"
            :default-props="{
              value: 'menuId',
              label: 'menuName',
              check: 'isOwn'
            }"
          />
        </div>
      </el-scrollbar>
      <el-scrollbar
        class="scroll-item"
        style="border: none"
      >
        <div class="limit-item">
          <checkLimits
            v-model="rule"
            title="数据规则权限"
            :check-list="dataPrivileges"
            :default-props="{
              value: 'dataId',
              label: 'scopeName',
              check: 'isOwn'
            }"
          />
        </div>
      </el-scrollbar>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        @click="onClose"
      >
        取消
      </el-button>
      <el-button
        type="primary"
        size="medium"
        @click="onClickSave"
      >
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import checkLimits from './roleCheckPermission'
import treeLimits from './roleTreePermission'
import { getPrivilege, updatePrivilege } from '../../../api/system/role'

const pages = [
  {
    orgName: '新建',
    orgId: 'create',
    isOwn: true
  },
  {
    orgName: '修改',
    orgId: 'update',
    isOwn: false
  },
  {
    orgName: '查看',
    orgId: 'watch',
    isOwn: true
  },
  {
    orgName: '删除',
    orgId: 'del',
    isOwn: true
  }
]
export default {
  name: 'RolePermission',
  components: {
    checkLimits,
    treeLimits
  },
  props: {
    role: {
      type: Object,
      default: function() {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
    // roleId: {
    //   // 	角色ID，多个以英文逗号分隔
    //   type: [String, Number],
    //   default: ''
    // }
  },
  data() {
    return {
      roleId: '',
      loading: false,
      orgPrivileges: [],
      menuPrivileges: [],
      menuProps: {
        label: 'menuName',
        id: 'menuId'
      },
      pages,
      page: [],
      rule: [],
      org: [0, 1, 2],
      tree: [],
      dataPrivileges: [],
      buttonData: {},
      buttonMenuId: '',
      originData: []
    }
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.visible
      },
      set: function(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  watch: {
    role: {
      handler(newVal) {
        this.roleId = newVal.roleId
      },
      immediate: true
    }
  },
  methods: {
    // 查询用户权限
    getRolePrivilege() {
      const params = {
        roleId: this.roleId
      }
      this.loading = true
      getPrivilege(params)
        .then((res) => {
          this.originData = JSON.parse(JSON.stringify(res)) // 保存一份原数据，保存的时候用作对比
          this.orgPrivileges = res.orgPrivileges || []
          this.menuPrivileges = this.menuFilter(res.menuPrivileges)
          if (this.menuPrivileges[0]) {
            this.dataPrivileges = this.menuPrivileges[0].dataPrivileges || []
            this.buttonMenuId = this.menuPrivileges[0].buttonMenuId
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    // 判断当前菜单类型是Button的菜单过滤掉
    menuFilter(arr, parentId) {
      return (
        arr.filter((item) => {
          if (item.menuType === 'Button') {
            // 如果节点是按钮类型，保存到buttonData
            if (this.buttonData[parentId]) {
              this.buttonData[parentId].push(item)
            } else {
              this.$set(this.buttonData, parentId || 0, [item])
            }
            return false
          } else {
            if (item.children && item.children.length > 0) {
              item.children = this.menuFilter(item.children, item.menuId)
            }
            return true
          }
        }) || []
      )
    },
    ping(data, menus) {
      data.map((it) => {
        menus.push(it)
        if (it.children.length > 0) {
          this.ping(it.children, menus)
        }
      })
    },
    // 点击保存
    onClickSave() {
      this.getButtonPrivilege(this.menuPrivileges)
      this.diff(this.orgPrivileges, this.originData.orgPrivileges, 'isOwn') // 判断权限数据是否有修改
      this.diff(this.menuPrivileges, this.originData.menuPrivileges, 'isOwn')

      let menu = []
      let menuPrivileges = JSON.parse(JSON.stringify(this.menuPrivileges))
      this.ping(menuPrivileges, menu)

      menu.map((it) => {
        delete it.children
      })
      const params = {
        roleId: this.roleId,
        orgPrivileges: this.orgPrivileges,
        menuPrivileges: menu
      }
      updatePrivilege(params).then(() => {
        this.$message.success('保存成功')
        this.onClose()
      })
    },

    // 根据原数据，添加operatorType字段，Add-添加，Del-删除
    diff(newList, oldList, key, id = 'menuId') {
      newList.forEach((item) => {
        const data = oldList.find((oldData) => oldData[id] === item[id])
        if (!item[key] && data[key]) {
          item.operatorType = 'Del'
        } else if (item[key] && !data[key]) {
          item.operatorType = 'Add'
        }

        for (const listKey in item) {
          if (Array.isArray(item[listKey])) {
            this.diff(item[listKey], data[listKey], key)
          }
        }
        if (item.dataPrivileges && item.dataPrivileges.length > 0) {
          this.diff(item.dataPrivileges, data.dataPrivileges, key, 'dataId')
        }
      })
    },

    // 把抽取出来的buttonData，重新赋值回权限数据
    getButtonPrivilege(arr) {
      arr.forEach((item) => {
        if (this.buttonData[item.menuId]) {
          item.children = item.children.concat(this.buttonData[item.menuId])
        }
        if (item.children && item.children.length > 0) {
          this.getButtonPrivilege(item.children)
        }
      })
    },

    onClose() {
      this.buttonData = {}
      this.buttonMenuId = ''
      this.$emit('update:visible', false)
    },

    nodeClick(data) {
      this.buttonMenuId = data.menuId
      this.dataPrivileges = data.dataPrivileges || []
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}

.limit-wrap {
  display: flex;
  height: 400px;

  .scroll-item {
    border-right: 1px solid #f2f2f2;
    min-width: 180px;

    &.scroll-tree {
      min-width: 220px;
    }

    .limit-item {
      padding: 0 15px;
      /*flex: 1;*/
    }
  }
}
</style>

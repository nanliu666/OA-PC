<template>
  <div class="role-wrap fill">
    <page-header title="角色管理" />
    <basic-container block>
      <el-container style="min-height:100%">
        <roleAside
          v-bind="options"
          :current-id.sync="options.currentId"
          @reload="reload"
        />
        <el-main>
          <div
            v-loading="loading"
            class="main-wrap"
          >
            <commonTable
              :data="filterList"
              :config="tableConfig"
              :columns="columns"
              @selection-change="selectionChange"
            >
              <template
                slot="multiSelectMenu"
                slot-scope="{ selection }"
              >
                <span
                  class="del-all"
                  @click="handlerDeleteAll(selection)"
                ><i class="el-icon-delete" />批量删除</span>
              </template>
              <template slot="topMenu">
                <div class="flex flex-flow flex-justify-between flex-items">
                  <el-input
                    v-model="form.roleName"
                    size="medium"
                    placeholder="角色名称"
                    clearable
                    style="width:200px;margin-right:12px;"
                  />
                  <div>
                    <span
                      class="addUser"
                      :disabled="!options.currentId"
                      @click="onHandleEdit('add')"
                    >新建角色</span>
                    <span
                      class="icon  el-icon-refresh-right"
                      @click="loadRoleData"
                    />
                  </div>
                </div>
              </template>
              <template
                slot="handler"
                slot-scope="scope"
              >
                <el-button
                  type="text"
                  size="medium"
                  @click.stop="handleConfig(scope.row, scope.index)"
                >
                  权限配置
                </el-button>
                <el-button
                  type="text"
                  size="medium"
                  @click.stop="handleCheck(scope.row, scope.index)"
                >
                  查看用户
                </el-button>
                <el-dropdown
                  trigger="hover"
                  @command="handleCommand($event, scope.row)"
                >
                  <span class="el-dropdown-link">
                    <i class="el-icon-more" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="edit">
                      编辑
                    </el-dropdown-item>
                    <el-dropdown-item command="del">
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </commonTable>
          </div>
        </el-main>
        <roleEdit
          v-if="visible"
          :row="roleRow"
          :visible.sync="visible"
          :jobs="options.jobs"
          :category-id="options.currentId"
          :positions="options.positions"
          :job-props="options.jobProps"
          :position-props="options.positionProps"
          @reload="reload"
          @fiter="fiter"
        />
        <roleLimits
          v-if="configVisible"
          :role-id="editingRoleId"
          :visible.sync="configVisible"
        />
        <userList
          v-if="userVisible"
          :visible.sync="userVisible"
          :role-id="roleId"
          @upDate="onLoad"
        />
      </el-container>
    </basic-container>
  </div>
</template>

<script>
import roleEdit from './components/roleEdit'
import roleAside from './components/roleAside'
import roleLimits from './components/rolePermission'
import userList from './components/roleUserList'
import { getRoleList, getCate, getPositions, delRole } from '../../api/system/role'

export default {
  name: 'Role',
  components: {
    roleEdit,
    roleAside,
    roleLimits,
    userList
  },
  data() {
    return {
      loading: false,
      JodOrg: [],
      associated: [],
      notassociated: [],
      editingRoleId: '',
      visible: false,
      configVisible: false,
      userVisible: false,
      options: {
        currentId: '',
        props: {
          label: 'label',
          id: 'cateId'
        },
        treeList: [],
        positionProps: {
          label: 'positionName',
          id: 'positionId'
        },
        jobProps: {
          label: 'label',
          id: 'id'
        },
        positions: [],
        jobs: []
      },
      form: {
        roleName: ''
      },
      data: [],
      tableConfig: {
        showHandler: true,
        enableMultiSelect: true,
        rowKey: 'roleId',
        handlerColumn: {
          width: 200
        }
      },
      columns: [
        {
          label: '角色编码',
          prop: 'roleId'
        },
        {
          label: '角色名称',
          prop: 'roleName'
        },
        {
          label: '关联类型',
          prop: 'type',
          formatter: (row, column, cellValue) => {
            let str = ''
            switch (cellValue) {
              case 'Job':
                str = '职位'
                break
              case 'Position':
                str = '岗位'
                break
              case 'No':
                str = '无'
                break
              default:
                break
            }
            return str
          }
        },
        {
          label: '关联信息',
          prop: 'message',
          formatter: this.messageFormatter
        }
      ],
      selectArr: [],
      roleRow: {},
      roleId: ''
    }
  },
  computed: {
    filterList() {
      return this.data.filter((item) => {
        return item.roleName.indexOf(this.form.roleName) > -1
      })
    }
  },
  created() {
    // this.getJobsFunc()
    this.getPositionsFunc()
    this.onLoad()
  },
  activated() {
    this.getPositionsFunc()
    this.onLoad()
  },
  methods: {
    handlerDeleteAll(list) {
      this.$confirm('您确定要删除你所选中的角色吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let name = ''
        list.map((item) => {
          if (item.workNum > 0) {
            name += ' ' + item.roleName
          }
        })
        if (name) {
          name = name.length > 18 ? name.substr(0, 18) + '...' : name
          this.$confirm(`很抱歉，您选中的职位 ${name} 下存在员工，请先将员工调整后再删除`, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'info',
              message: '取消操作!'
            })
          })
          return
        }
        let params = {
          ids: list.map((i) => i.roleId).join(',')
        }
        delRole(params).then(() => {
          this.loadRoleData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    },
    sizeChange() {},
    currentChange() {},
    fiter() {
      // let data = []
      //    let data2= []
      // this.jobFilter(this.JodOrg, data, data2,roleId)
      // if(checked){
      //   this.options.jobs =  data2
      // }else{
      //   this.options.jobs =  data
      // }
    },
    // 加载页面全部数据（左侧分组树，右侧角色列表）
    async onLoad() {
      await this.getTreeCate()
      this.loadRoleData()
      this.getPositionsFunc()
    },

    // 加载右侧角色列表
    loadRoleData() {
      const params = {
        roleName: '',
        categoryId: this.options.currentId
      }
      this.loading = true
      getRoleList(params).then((res) => {
        this.data = res
        this.loading = false
      })
    },

    // 刷新数据
    reload(data = {}) {
      if (data[this.options.props.id]) {
        //有id时，加载全部数据
        this.options.currentId = data[this.options.props.id]
        this.loadRoleData()
      } else {
        // 没传id，只需加载右侧列表
        this.onLoad()
      }
    },

    // 获取分组树数据
    getTreeCate() {
      return new Promise((resolve) => {
        const params = {
          categoryName: ''
        }
        getCate(params).then((res) => {
          this.options.treeList = (res || []).map((item) => {
            let children = []
            if (item.categories && item.categories.length > 0) {
              children = item.categories.map((it) => {
                if (!this.options.currentId && it.roleNum > 0) {
                  this.options.currentId = it.categoryId // 没有设置默认的激活分类时，设置默认激活分类
                }
                return {
                  groupId: item.groupId,
                  cateId: it.categoryId,
                  label: it.categoryName,
                  roleNum: it.roleNum
                }
              })
            }

            return {
              cateId: item.groupId,
              label: item.groupName,
              children
            }
          })
          resolve()
        })
      })
    },

    // 表格显示值转换
    messageFormatter(row) {
      let str = ''
      if (row.type) {
        if (row.type === 'Job' && row.jobs.length > 0) {
          row.jobs.forEach((item) => {
            str += item.jobName + '，'
          })
          str = str.substr(0, str.length - 1)
        } else if (row.type === 'Position' && row.positions.length > 0) {
          row.positions.forEach((item) => {
            str += item.positionName + ','
          })
          str = str.substr(0, str.length - 1)
        }
      }
      return str
    },

    getPositionsFunc() {
      let params = {
        positionName: ''
      }
      getPositions(params).then((res) => {
        this.options.positions = res
      })
    },

    handleConfig(row) {
      this.configVisible = !this.configVisible

      this.editingRoleId = row.roleId
    },
    handleCheck(row) {
      this.roleId = row.roleId
      this.userVisible = !this.userVisible
    },
    handleCommand(command, row) {
      if (command === 'edit') {
        this.roleRow = JSON.parse(JSON.stringify(row))
        this.onHandleEdit()
      } else {
        this.handleDel([row])
      }
    },

    onHandleEdit(str) {
      if (str) {
        this.roleRow = {}
      }
      this.visible = !this.visible
    },

    // 点击删除角色，提示
    handleDel(rows = []) {
      if (rows.findIndex((row) => row.type !== 'No') > -1) {
        this.$alert('很抱歉，您选中的角色已关联职位/岗位信息，请先解绑才可以删除', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          dangerouslyUseHTMLString: true
        })
        return
      }
      this.$confirm('您确定要删除该角色吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          const ids = rows.map((row) => row.roleId)
          this.delFunc(ids)
        })
        .catch(() => {})
    },

    // 删除角色
    delFunc(ids) {
      ids = ids.join(',')
      const params = {
        ids
      }
      delRole(params).then(() => {
        this.$message.success('删除成功')
        this.loadRoleData()
      })
    },

    // 批量全选
    selectionChange(rows) {
      this.selectArr = rows
    },
    // 设置表格checkbox
    toggleSelection(rows = []) {
      this.$refs.table.toggleSelection(rows)
    },
    // 批量删除
    delAll() {
      this.handleDel(this.selectArr)
    }
    // // 关闭批量操作栏
    // onCloseSelect() {
    //   this.$refs.table.toggleSelection()
    //   this.selectArr = []
    // }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .basic-container--block {
  height: calc(100% - 92px);
  min-height: calc(100% - 92px);
  > .el-card {
    height: 100%;
    > .el-card__body {
      height: 100%;
    }
  }
}
.role-wrap {
  .aside-wrap {
    border-right: 1px solid #e3e7e9;
  }

  .main-wrap {
    padding: 0 20px 20px 20px;
    position: relative;

    .search-bar {
      padding: 10px 0 0 0;
      display: flex;
      justify-content: space-between;
    }

    .del-all {
      cursor: pointer;
    }
  }

  /deep/ .el-card__body {
    padding-bottom: 0 !important;
  }

  /deep/ .avue-crud__menu {
    min-height: 0;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    margin-left: 10px;
  }
}
/deep/.el-tree-node__content {
  line-height: 36px;
}
.addUser {
  font-size: 14px;
  display: inline-block;
  color: #757c85;
  line-height: 14px;
  cursor: pointer;
  padding-right: 12px;
  border-right: 0.5px solid #e9e9e9;
}
.icon {
  padding-left: 12px;
  font-size: 18px;
  color: #a0a8ae;
  cursor: pointer;
}
</style>

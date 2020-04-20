<template>
  <div>
    <div class="oa-title_bar">
      <div class="title-name">
        角色管理
      </div>
    </div>
    <basic-container>
      <el-container>
        <roleAside />
        <el-main class="main-wrap">
          <div class="main-wrap">
            <div class="search-bar">
              <el-form
                ref="form"
                :model="form"
                label-width="80px"
                size="medium"
                :inline="true"
              >
                <el-form-item>
                  <el-input v-model="form.roleName">
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                    />
                  </el-input>
                </el-form-item>
              </el-form>
              <div>
                <el-button
                  type="primary"
                  size="medium"
                  @click="visible = true"
                >
                  新建角色
                </el-button>
                <el-button
                  icon="el-icon-refresh"
                  size="medium"
                />
              </div>
            </div>
            <avue-crud
              :data="data"
              :option="option"
              :page.sync="page"
              @on-load="onLoad"
            >
              <template
                slot="menu"
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
            </avue-crud>
          </div>
        </el-main>
        <roleEdit :visible.sync="visible" />
        <roleLimits :visible.sync="configVisible" />
        <userList :visible.sync="userVisible" />
      </el-container>
    </basic-container>
  </div>
</template>

<script>
import roleEdit from './components/roleEdit'
import roleAside from './components/roleAside'
import roleLimits from './components/rolePermission'
import userList from './components/roleUserList'
import { tableOptions } from '../../util/constant'

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
      visible: false,
      configVisible: false,
      userVisible: false,
      btnList: [
        {
          name: '编辑',
          key: 'edit'
        },
        {
          name: '删除',
          key: 'del'
        }
      ],
      form: {
        roleName: ''
      },
      page: {
        pageSize: 20,
        pagerCount: 5,
        total: 100
      },
      data: [
        {
          roleCode: 'GZ789',
          roleName: '小明',
          type: '职位',
          message: '视觉设计',
          userNum: 10,
          num: 20
        },
        {
          roleCode: 'GZ789',
          roleName: '小王',
          type: '职位',
          message: '视觉设计',
          userNum: 10,
          num: 20
        }
      ],
      option: {
        ...tableOptions,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: '角色编码',
            prop: 'roleCode'
          },
          {
            label: '角色名称',
            prop: 'roleName'
          },
          {
            label: '关联类型',
            prop: 'type'
          },
          {
            label: '关联信息',
            prop: 'message'
          },
          {
            label: '用户人数',
            prop: 'userNum'
          },
          {
            label: '在职人数',
            prop: 'num'
          }
        ]
      }
    }
  },
  methods: {
    onLoad() {},
    handleConfig() {
      this.configVisible = !this.configVisible
    },
    handleCheck() {
      this.userVisible = !this.userVisible
    },
    handleCommand() {}
  }
}
</script>

<style lang="scss" scoped>
.oa-title_bar {
  padding: 14px 6px;

  .title-name {
    color: #202940;
    font-size: 18px;
  }
}

.aside-wrap {
  border-right: 1px solid #e3e7e9;
}

.main-wrap {
  padding: 0 20px;

  .search-bar {
    padding: 0;
    display: flex;
    justify-content: space-between;
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
</style>

<template>
  <div>
    <div class="oa-title_bar">
      <div class="title-name">
        角色管理
      </div>
    </div>
    <basic-container>
      <el-container>
        <el-aside class="aside-wrap">
          <div class="cate-wrap">
            角色分类
          </div>
        </el-aside>
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
                <moreBtn
                  :btn-list="btnList"
                  :row="scope.row"
                  @handleBtn="onClickBtn"
                />
              </template>
            </avue-crud>
          </div>
        </el-main>
        <roleEdit :visible.sync="visible" />
      </el-container>
    </basic-container>
  </div>
</template>

<script>
import moreBtn from './component/moreBtn'
import roleEdit from './component/roleEdit'
import { tableOptions } from '../../util/constant'

export default {
  name: 'Role',
  components: {
    moreBtn,
    roleEdit
  },
  data() {
    return {
      visible: false,
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
        pagerCount: 5
      },
      data: [
        {
          name: '张三',
          sex: '男'
        },
        {
          name: '李四',
          sex: '女'
        }
      ],
      option: {
        ...tableOptions,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '性别',
            prop: 'sex'
          }
        ]
      }
    }
  },
  methods: {
    onLoad() {
      this.page.total = 200
      //模拟分页
      if (this.page.currentPage === 1) {
        this.data = [
          {
            name: '张三',
            sex: '男'
          }
        ]
      } else if (this.page.currentPage == 2) {
        this.data = [
          {
            name: '李四',
            sex: '女'
          }
        ]
      }
    },
    handleConfig() {},
    handleCheck() {},
    onClickBtn(row, key) {
      console.log(row, key)
      if (key === 'edit') {
        this.visible = true
      } else {
        this.delFunc()
      }
    },
    delFunc() {}
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
    display: flex;
    justify-content: space-between;
  }
}
/deep/ .avue-crud__menu {
  min-height: 0;
}
</style>

<template>
  <div>
    <page-header title="职位管理">
      <template slot="rightMenu">
        <el-button
          type="primary"
          size="medium"
          @click="handlerAdd"
        >
          新建职位
        </el-button>
      </template>
    </page-header>
    <nav
      v-if="show"
      class="nav"
    >
      <span>使用指南：职位是指企业的某个员工需要完成的具体任务，是员工最基础的工作属性，如：司机、行政专员等</span>
      <span
        class="el-icon-close"
        style="color:#207EFA;font-size: 20px"
        @click="close"
      />
    </nav>
    <div class="position">
      <div style="height: 100%">
        <el-container style="height: 100%">
          <el-aside
            class="aside"
            style="width: 230px;"
          >
            <div class="aside_header">
              <span>职位类别</span>
              <el-tooltip
                content="职位类别设置"
                placement="right-end"
                effect="dark"
              >
                <i
                  class="el-icon-setting"
                  @click="jump"
                />
              </el-tooltip>
              <!--              <span-->
              <!--                class="el-icon-setting"-->
              <!--                @click="jump"-->
              <!--              />-->
            </div>
            <div>
              <ul>
                <li
                  v-for="(item, index) in asideList"
                  :key="index"
                  :class="[index === 0 ? 'selection' : '', index === active ? 'actives' : '']"
                  @click="handleAside(item, index)"
                >
                  <i
                    v-if="index === 0"
                    class="el-icon-folder-opened icon"
                  />{{ item.title }}
                </li>
              </ul>
            </div>
          </el-aside>
          <el-main>
            <div style="margin-top: 20px">
              <common-table
                style="width: 100%"
                :data="data"
                :page="page"
                :loading="loading"
                :config="tableConfig"
                :columns="columns"
                @page-size-change="sizeChange"
                @current-page-change="currentChange"
              >
                <template slot="topMenu">
                  <div class="flex-flow flex justify-content align-items ">
                    <div>
                      <el-input
                        v-model="form.name"
                        placeholder="职位名称"
                        clearable
                        style="width:200px;margin-right:12px;"
                        @input="search"
                      />
                    </div>
                    <div>
                      <i
                        class="icon  el-icon-refresh-right"
                        @click="getJobData({ pageNo: params.pageNo })"
                      />
                    </div>
                  </div>
                </template>
                <template
                  slot="multiSelectMenu"
                  slot-scope="{ selection }"
                >
                  <span class="all">
                    <span
                      @click="handlerDeleteAll(selection)"
                    ><i class="el-icon-delete" /> 批量删除</span>
                  </span>
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
                    新建子职位
                  </el-button>
                  <el-button
                    type="text"
                    size="medium"
                    @click.stop="handleCheck(scope.row, scope.index)"
                  >
                    编辑
                  </el-button>
                  <el-dropdown
                    style="margin-left: 15px"
                    trigger="hover"
                    @command="handleCommand($event, scope.row)"
                  >
                    <span class="el-dropdown-link">
                      <i class="el-icon-more" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="del">
                        删除
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </common-table>
            </div>
          </el-main>
        </el-container>
      </div>
      <position-dialog
        v-if="positionDialog"
        :dialog-visible.sync="positionDialog"
        :row.sync="row"
        :title="title"
        :is-edit="isEdit"
        :org-tree="orgTree"
        @onsubmit="positionOnsubmit"
      />
    </div>
  </div>
</template>

<script>
import { getCategoryList, gotV1Job, deleteV1Job, getJobTree } from '@/api/organize/position'
import { getToken } from '@/util/auth'
import positionDialog from '../compoents/positionDialog'

export default {
  name: 'Index',
  components: {
    positionDialog
  },
  data() {
    return {
      selectionList: [],
      row: {},
      number: '',
      orgTree: [],
      isBatch: false,
      isEdit: false,
      title: '新增职位',
      positionDialog: false,
      show: true,
      form: {
        name: ''
      },
      loading: false,
      active: 0,
      asideList: [],
      data: [],
      tableConfig: {
        showHandler: true,
        enableMultiSelect: true,
        enablePagination: true,
        showIndexColumn: false,
        rowKey: 'jobId',
        handlerColumn: {
          width: 200
        }
      },
      columns: [
        {
          label: '职位编码',
          prop: 'jobId'
        },
        {
          label: '职位名称',
          prop: 'jobName'
        },
        {
          label: '所属组织',
          prop: 'orgName'
        },
        {
          label: '上级职位',
          prop: 'parentName'
        }
      ],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 1
      },
      params: {
        pageNo: 1,
        pageSize: 5,
        jobName: '',
        categoryId: ''
      }
    }
  },

  mounted() {
    this.getCategory()
    this.getJobData()
    this.getTree()
  },
  activated() {
    this.getCategory()
    this.getJobData()
    this.getTree()
  },
  methods: {
    jump() {
      this.$router.push({ path: '/gradeTree/position/category' })
    },
    handlerDeleteAll(list) {
      let name = ''
      list.map((item) => {
        if (item.workNum > 0) {
          name += ' ' + item.jobName
        }
      })
      if (name) {
        name = name.length > 18 ? name.substr(0, 18) + '...' : name
        this.$confirm(`很抱歉，您选中的职位 ${name} 下存在员工，请先将员工调整后再删除`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$message({
              type: 'info',
              message: '取消操作!'
            })
          })
          .catch(() => {})
        return
      }
      this.$confirm('您确定要删除你所选中的职位吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          ids: list.map((i) => i.id).join(',')
        }
        deleteV1Job(params).then(() => {
          this.getJobData()
          this.getCategory()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    },
    closeBatch() {
      this.isBatch = false
    },
    handlerAdd() {
      this.isEdit = false
      this.title = '新增职位'
      this.positionDialog = true
      this.row = {}
    },
    positionOnsubmit() {
      this.getJobData()
      this.getCategory()
    },
    close() {
      this.show = false
    },
    getTree() {
      let params = {
        jobName: ''
      }
      getJobTree(params).then((res) => {
        this.orgTree = res
      })
    },
    getJobData() {
      this.loading = true
      this.params.jobName = this.form.name
      this.params = {
        ...this.params,
        ...this.page
      }
      gotV1Job(this.params).then((res) => {
        this.loading = false
        this.data = res.data
        this.page.currentPage = this.params.pageNo
        this.page.total = res.totalNum
      })
    },
    getCategory() {
      let params = {
        categoryName: ''
      }
      getCategoryList(params).then((res) => {
        this.asideList = res

        let all = {
          name: '',
          title: '全部',
          categoryId: null,
          jobNum: 0
        }
        this.asideList.map((it) => {
          all.jobNum += it.jobNum
          it.title = it.categoryName + '(' + it.jobNum + ')'
        })
        all.title = all.title + `(${all.jobNum})`

        this.asideList.unshift(all)
      })
    },
    search: _.debounce(function() {
      this.params.jobName = this.form.name
      this.getJobData()
    }, 500),
    sizeChange(val) {
      this.page.pageNo = 1
      this.page.pageSize = val
      this.getJobData()
    },
    currentChange(val) {
      this.page.pageNo = val
      this.getJobData()
    },
    handleExport() {
      this.$confirm('是否导出数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const searchForm = this.form
        window.open(
          `/api/blade-user/export-user?Blade-Auth=${getToken()}&account=${
            searchForm.account
          }&realName=${searchForm.realName}`
        )
      })
    },
    onLoad() {},
    handleConfig(row) {
      // this.configVisible = !this.configVisible
      this.row = JSON.parse(JSON.stringify(row))
      this.isEdit = false
      this.title = '新建子职位'
      this.positionDialog = true
    },
    handleAside(item, index) {
      this.active = index
      this.params.categoryId = item.categoryId
      this.page.pageNo = 1
      this.getJobData()
    },
    handleCheck(row) {
      this.row = JSON.parse(JSON.stringify(row))
      this.isEdit = true
      this.title = '编辑职位'
      this.positionDialog = true
    },
    handleCommand(event, row) {
      if (row.workNum) {
        this.$confirm('很抱歉，您选中的职位下存在员工，请先将员工调整后再删除', {
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
      this.$confirm('您确定要删除该职位吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let params = {
            ids: row.jobId
          }
          deleteV1Job(params).then(() => {
            this.getJobData()
            this.getCategory()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .then(() => {})
    },
    toggleSelection(val) {
      this.$refs.crud.toggleSelection(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.position {
  margin-top: 16px;
  background: #ffffff;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 24px !important;
  min-height: calc(100% - 204px);
  .form_ {
    padding-top: 40px;
    width: 400px;
    margin: 0 auto;
    font-size: 14px;
    .label_ {
      /*display: inline-block;*/
      /*margin-top:24px;*/
      /*margin-bottom:8px;*/
    }
    .tip {
      font-size: 12px;
      line-height: 14px;
      color: #a0a8ae;
    }
    .bt {
      /*margin-top: 40px;*/
    }
  }
}
.aside {
  width: 200px;
  border-right: 1px solid #efefef;
  height: 100%;
  box-sizing: border-box;
  margin-right: 20px;
  margin-top: 20px;
  ul {
    list-style: none;
    padding: 0 10px 0 0;
    margin-top: 10px;
    line-height: 34px;
    li {
      cursor: pointer;
    }
    li:not(.selection) {
      line-height: 34px;
      font-size: 14px;
      padding-left: 30px;
    }
    .selection {
      .icon {
        display: inline-block;
        margin: 0 6px 0 6px;
        font-size: 18px;
      }
    }
    .actives {
      border-right: 4px solid #1e9fff;
      background: #efefef;
    }
  }
}

.nav {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  line-height: 26px;
  padding: 5px 20px;
  margin-top: -6px;
  background: #edf8ff;
  border: 1px solid #73b9ff;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}
.aside_header {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin: 0 10px 0px 0px;
  padding-bottom: 10px;
  font-size: 18px;
  border-bottom: 1px solid #efefef;
  /*line-height: 40px;*/
}
.flex {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
}
.flex-flow {
  flex-flow: row nowrap;
}
.justify-content {
  justify-content: space-between;
}
.align-items {
  align-items: center;
}

.input-with-select {
  width: 250px;
}
.condition {
  margin: 20px 0 10px 0;
}

.all {
  /*border: 1px solid #efefef;*/
  cursor: pointer;
  padding: 10px;
  span:first-child {
    /*border-right: 1px solid #999;*/
    padding-right: 15px;
  }
  span {
    margin-right: 20px;
  }
}

/deep/ .el-card__body {
  padding-bottom: 0 !important;
}

/deep/ .avue-crud__menu {
  min-height: 0;
}
.handler {
  width: 200px;
}
.icon {
  font-size: 18px;
  color: #a0a8ae;
  cursor: pointer;
}
</style>

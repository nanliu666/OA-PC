<template>
  <div class="category">
    <div class="header">
      <div>职位类别</div>
      <div>
        <el-button
          type="primary"
          size="medium"
          @click="handlerAdd"
        >
          新建职位类别
        </el-button>
      </div>
    </div>
    <nav
      v-if="show"
      class="nav"
    >
      <span class="flex flex-flow justify-content">
        <span>使用指南：</span>
        <span class="flex flex-flow-column">
          <span>1、您可以将企业的职位信息进行简单的分类，方便后期进行统计和分析</span>
          <span>2、没有添加职位类别的职位，将默认放置在“未分类”下。</span>
        </span>
      </span>
      <span
        class="el-icon-circle-close"
        @click="close"
      />
    </nav>
    <div>
      <div style="margin-top: 20px">
        <common-table
          style="width: 100%"
          :data="data"
          :page="page"
          :loading="loading"
          :config="tableConfig"
          :columns="columns"
          @pageSizeChange="sizeChange"
          @currentPageChange="currentChange"
          @selection-change="selectionChange"
        >
          <template slot="topMenu">
            <div class="flex-flow flex justify-content align-items ">
              <div>
                <el-input
                  v-model="form.name"
                  placeholder="职位名称"
                  size="medium"
                  class="input-with-select"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="search"
                  />
                </el-input>
              </div>
              <div>
                <el-button
                  type="primary"
                  size="medium"
                  @click="handleExport"
                >
                  <i class="el-icon-upload2" /> 导出
                </el-button>
                <el-button
                  type="primary"
                  size="medium"
                  @click="getData"
                >
                  <i class="el-icon-refresh" />
                </el-button>
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
              <span><i class="el-icon-folder" /> 批量导出</span>
            </span>
          </template>
          <template
            v-if="scope.row.isDefault === 0"
            slot="handler"
            slot-scope="scope"
          >
            <el-button
              type="text"
              size="medium"
              @click.stop="handleEdit(scope.row, scope.index)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="medium"
              @click.stop="handleDelete(scope.row, scope.index)"
            >
              删除
            </el-button>
          </template>
        </common-table>
      </div>
    </div>
    <categoryDialog
      v-if="categoryDialog"
      :dialog-visible.sync="categoryDialog"
      :title="title"
      :is-edit="isEdit"
      :data="row"
      @onSubmit="onSubmit"
    />
  </div>
</template>

<script>
import { getToken } from '@/util/auth'
import categoryDialog from '../compoents/categoryDialog'
import { getCategoryDefine, deleteCategoryDefine, deleteV1Job } from '@/api/organize/position'

export default {
  name: 'Category',
  components: {
    categoryDialog
  },
  data() {
    return {
      selectionList: [],
      form: {
        name: ''
      },
      loading: false,
      isEdit: false,
      title: '新建职位类别',
      categoryDialog: false,
      dialogVisible: false,
      isBatch: false,
      show: true,
      number: 0,
      row: {},
      data: [],
      tableConfig: {
        showHandler: true,
        enableMultiSelect: true
      },
      columns: [
        {
          label: '职位类别编码',
          prop: 'id'
        },
        {
          label: '职位类别',
          prop: 'name'
        },
        {
          label: '职位数',
          prop: 'jobNum'
        },
        {
          label: '用户人数',
          prop: 'userNum'
        },
        {
          label: '在职人数',
          prop: 'workNum'
        },
        {
          label: '描述',
          prop: 'remark'
        }
      ],
      page: {
        pageSize: 10,
        pagerCount: 1,
        total: 10
      },
      params: {
        pageNo: 1,
        pageSize: 10,
        name: ''
      }
    }
  },
  watch: {},
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    handlerDeleteAll(list) {
      this.$confirm('您确定要删除你所选中的职位类别吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let name = ''
        this.selectionList.map((item) => {
          if (item.workNum > 0) {
            name += ' ' + item.name
          }
        })
        if (name) {
          name = name.length > 18 ? name.substr(0, 18) + '...' : name
          this.$confirm(`很抱歉，您选中的职位类别 ${name} 下存在员工，请先将员工调整后在删除`, {
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
          ids: list.map((i) => i.id).join(',')
        }
        deleteCategoryDefine(params).then(() => {
          this.getData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    },
    getData() {
      this.loading = true
      this.params.name = this.form.name
      getCategoryDefine(this.params).then((res) => {
        this.data = res.data
        this.page.total = res.totalNum
        this.loading = false
      })
    },
    onSubmit() {
      this.getData()
    },
    handleDelete(row) {
      this.$confirm('您确定要删除该职位类别吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.workNum > 0) {
          this.$confirm('很抱歉，您选中的类别下存在员工，请先将员工调整后在删除', {
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
          ids: row.id
        }
        deleteCategoryDefine(params).then(() => {
          // this.data.shift()
          this.getData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    },
    search() {
      this.getData()
    },
    getJobData() {},
    closeBatch() {
      this.isBatch = false
    },
    handlerAdd() {
      this.categoryDialog = true
      this.isEdit = false
      this.title = '新建职位类别'
      this.row = {}
    },
    close() {
      this.show = false
    },
    sizeChange(val) {
      this.params.pageSize = val
      this.params.pageNo = 1
      this.page.pagerCount = 1
      this.getData()
    },
    currentChange(val) {
      this.params.pageNo = val
      this.page.pagerCount = val
      this.getData()
    },
    handleEdit(row) {
      this.row = JSON.parse(JSON.stringify(row))
      this.isEdit = true
      this.title = '编辑职位类别'
      this.categoryDialog = true
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
    handleConfig() {
      // this.configVisible = !this.configVisible
      this.isEdit = false
      this.title = '新建子组织'
      this.positionDialog = true
    },
    handleAside(item, index) {
      this.active = index
      this.params.categoryId = item.categoryId
      this.getJobData()
    },
    handleCheck() {
      this.isEdit = true
      this.title = '编辑子组织'
      this.positionDialog = true
    },
    handleCommand(event, row) {
      this.$confirm('您确定要删除该职位类别吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (row.workNum) {
            this.$confirm('很抱歉，您选中的类别下存在员工，请先将员工调整后在删除', {
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
            jobId: row.jobId
          }
          deleteV1Job(params).then(() => {
            this.getData()
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
.category {
  background: #ffffff;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  border-radius: 4px;
  padding: 20px !important;
  height: calc(100% - 64px);
  width: calc(100% - 64px);
  margin-left: 30px;
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
    padding: 0 10px;
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
.header {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
.nav {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  line-height: 40px;
  border: 1px solid #efefef;
  padding: 5px 20px;
  margin-top: 20px;
  span {
    line-height: 20px;
  }
}
.aside_header {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin: 0 10px 0px 10px;
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
.flex-flow-column {
  flex-flow: column nowrap;
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
    border-right: 1px solid #999;
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
</style>

<template>
  <div style="height:100%;width: 100% ">
    <div class="header">
      <div>岗位管理</div>
      <div>
        <el-button
          type="primary"
          size="medium"
          @click="handlerAdd"
        >
          新建岗位
        </el-button>
      </div>
    </div>
    <nav
      v-if="show"
      class="nav"
    >
      <span
        class="flex flex-flow justify-content"
        style="padding: 10px 0"
      >
        <span>使用指南</span>
        <span class="flex flex-flow-column">
          <span>：企业内部人员在组织中所担任的角色以及这个角色赋予他的身份，通常代表企业内部的管理层级，如：普通员工、经理、科长、部长、总监等</span>
        </span>
      </span>
      <span
        class="el-icon-close"
        style="color:#207EFA;font-size: 20px"
        @click="close"
      />
    </nav>
    <div class="category">
      <div>
        <div style="margin-top: 20px">
          <common-table
            style="width: 100%"
            :data="data"
            :page="page"
            :config="tableConfig"
            :columns="columns"
            :loading="loading"
            @pageSizeChange="sizeChange"
            @currentPageChange="currentChange"
          >
            <template slot="topMenu">
              <div class="flex-flow flex justify-content align-items ">
                <div>
                  <el-input
                    v-model="form.name"
                    placeholder="岗位名称"
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
      <stationDialog
        v-if="stationDialog"
        :dialog-visible.sync="stationDialog"
        :title="title"
        :is-edit="isEdit"
        :row="row"
        @onSubmit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
// import { deleteV1Job } from '@/api/organize/position'
import { getToken } from '@/util/auth'
import stationDialog from '../compoents/stationDialog'
import { getV1Position, deleteV1Position } from '@/api/organize/position'

export default {
  name: 'Station',
  components: {
    stationDialog
  },
  data() {
    return {
      form: {
        name: ''
      },
      selectionList: [],
      loading: false,
      isEdit: false,
      title: '新建岗位类别',
      stationDialog: false,
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
          label: '岗位编码',
          prop: 'id'
        },
        {
          label: '岗位名称',
          prop: 'name'
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
        pageSize: 100,
        pagerCount: 1,
        total: 10
      },
      params: {
        pageNo: 1,
        pageSize: 100,
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
      this.$confirm('您确定要删除你选中的岗位吗?', {
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
          this.$confirm(`很抱歉，您选中的岗位 ${name} 下存在员工，请先将员工调整后再删除`, {
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
        deleteV1Position(params).then(() => {
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
      getV1Position(this.params).then((res) => {
        this.data = res
        this.loading = false
      })
    },
    onSubmit() {
      this.getData()
    },
    handleDelete(row) {
      this.$confirm('您确定要删除该岗位吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.workNum) {
          this.$confirm('很抱歉，您选中的岗位下存在员工，请先将员工调整后再删除', {
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
        deleteV1Position(params).then(() => {
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
      this.stationDialog = true
      this.isEdit = false
      this.title = '新建岗位类别'
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
      this.title = '编辑岗位类别'
      this.stationDialog = true
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
    toggleSelection(val) {
      this.$refs.crud.toggleSelection(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.avue-view {
  height: auto;
}
.category {
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
  font-size: 18px;
  color: #202940;
  line-height: 28px;
  font-weight: bold;
  margin-top: 14px;
}
.nav {
  /*height: 36px;*/
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  line-height: 16px;
  padding: 0px 20px;
  margin-top: 8px;
  background: #edf8ff;
  border: 1px solid #73b9ff;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  /*span {*/
  /*  line-height: 20px;*/
  /*}*/
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

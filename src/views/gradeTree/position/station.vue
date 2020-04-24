<template>
  <div class="category">
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
        <span style="width: 100px">使用指南：</span>
        <span class="flex flex-flow-column">
          <span>企业内部人员在组织中所担任的角色以及这个角色赋予他的身份，通常代表企业内部的管理层级，如：普通员工、经理、科长、部长、总监等</span>
        </span>
      </span>
      <span
        class="el-icon-circle-close"
        @click="close"
      />
    </nav>
    <div>
      <div class="flex-flow flex justify-content align-items condition">
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
      <div>
        <div
          v-if="isBatch"
          class="flex flex-flow justify-content align-items all"
        >
          <div>
            <span>已选中{{ number }}项</span>
            <span><i class="el-icon-delete" /> 批量删除</span>
            <span><i class="el-icon-folder" /> 批量导出</span>
          </div>
          <div
            class="el-icon-circle-close"
            @click="closeBatch"
          />
        </div>
        <avue-crud
          :data="data"
          :option="option"
          @on-load="onLoad"
          @selection-change="selectionChange"
        >
          <template
            slot="menu"
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
        </avue-crud>
      </div>
    </div>
    <stationDialog
      :dialog-visible.sync="stationDialog"
      :title="title"
      :is-edit="isEdit"
      :data="row"
      @onSubmit="onSubmit"
    />
  </div>
</template>

<script>
import { tableOptions } from '@/util/constant'
import { deleteV1Job } from '@/api/organize/position'
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
      isEdit: false,
      title: '新建职位类别',
      stationDialog: false,
      dialogVisible: false,
      isBatch: false,
      show: true,
      number: 0,
      row: {},
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
        selection: true,
        align: 'center',
        menuAlign: 'center',
        calcHeight: 80,
        tip: false,
        searchMenuSpan: 6,
        dialogType: 'drawer',
        dialogClickModal: false,
        column: [
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
        ]
      },
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
    getData() {
      this.params.name = this.form.name
      getV1Position(this.params).then((res) => {
        this.data = res
      })
    },
    onSubmit(val) {
      let isModity = ''

      this.data.map((it) => {
        if (it.id === val.id) {
          isModity = true
          it.name = val.name
          it.remark = val.remark
        }
      })
      if (!isModity) {
        let params = {
          id: '',
          name: '开发',
          remark: '开发前端',
          isDefault: 0,
          ...val
        }
        params.id = this.data.length + 1
        this.data.push(params)
      }
    },
    handleDelete(row) {
      this.$confirm('您确定要删除该岗位吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.workNum) {
          this.$confirm('很抱歉，您选中的岗位下存在员工，请先将员工调整后在删除', {
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
          id: row.id
        }
        deleteV1Position(params).then(() => {
          this.data.shift()
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
          `/api/blade-user/export-user?Blade-Auth=${getToken()}&account=${searchForm.account}&realName=${
            searchForm.realName
          }`
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
            this.data.shift()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .then(() => {})
    },
    selectionChange(list) {
      this.isBatch = true
      this.number = list.length
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

<template>
  <div class="position">
    <div class="header">
      <div>职位管理</div>
      <div>
        <el-button
          type="primary"
          size="medium"
          @click="handlerAdd"
        >
          新建职位
        </el-button>
      </div>
    </div>
    <nav
      v-if="show"
      class="nav"
    >
      <span>使用指南：职位是指企业的某个员工需要完成的具体任务，是员工最基础的工作属性，如：司机、行政专员等</span>
      <span
        class="el-icon-circle-close"
        @click="close"
      />
    </nav>
    <div style="height: 100%">
      <el-container style="height: 100%">
        <el-aside
          class="aside"
          style="width: 240px;"
        >
          <div class="aside_header">
            <span>职位类别</span>
            <span class="el-icon-setting" />
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
          <div class="flex-flow flex justify-content align-items condition">
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
                @click="getJobData"
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
              :page.sync="page"
              @on-load="onLoad"
              @size-change="sizeChange"
              @current-change="currentChange"
              @selection-change="selectionChange"
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
                  新建子组织
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
            </avue-crud>
          </div>
        </el-main>
      </el-container>
    </div>
    <position-dialog
      v-if="positionDialog"
      :dialog-visible.sync="positionDialog"
      :data="row"
      :title="title"
      :is-edit="isEdit"
      @onsubmit="positionOnsubmit"
    />
  </div>
</template>

<script>
import { tableOptions } from '@/util/constant'
import { getCategoryList, gotV1Job, deleteV1Job } from '@/api/organize/position'
import { getToken } from '@/util/auth'
import positionDialog from '../compoents/positionDialog'

export default {
  name: 'Index',
  components: {
    positionDialog
  },
  data() {
    return {
      row: {},
      number: '',
      isBatch: false,
      isEdit: false,
      title: '新增职位',
      positionDialog: false,
      show: true,
      form: {
        name: ''
      },
      active: 0,
      asideList: [],
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
            label: '职位编码',
            prop: 'jobId'
          },
          {
            label: '职位名称',
            prop: 'jobName'
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
            label: '所属组织',
            prop: 'orgName'
          },
          {
            label: '上级职位',
            prop: 'parentName'
          }
        ]
      },
      page: {
        pageSize: 10,
        pagerCount: 1,
        total: 100
      },
      params: {
        pageNo: 1,
        pageSize: 10,
        jobName: '',
        categoryId: ''
      }
    }
  },
  mounted() {
    this.getCategory()
    this.getJobData()
  },
  methods: {
    closeBatch() {
      this.isBatch = false
    },
    handlerAdd() {
      this.isEdit = false
      this.title = '新增职位'
      this.positionDialog = true
      this.row = {}
    },
    positionOnsubmit(val) {
      let params = {
        jobId: '123',
        jobName: '研发',
        userNum: '12',
        workNum: '150',
        remark: '描述',
        updateTime: '2020-02-12',
        createTime: '2020-02-11',
        orgId: '1',
        orgName: '怡宝',
        parentId: '1',
        parentName: '医保',
        categoryId: '3',
        ...val
      }
      this.data.push(params)
    },
    close() {
      this.show = false
    },
    getJobData() {
      gotV1Job(this.params).then((res) => {
        this.data = res.data
        this.page.total = res.totalNum
      })
    },
    getCategory() {
      let params = {
        pageNo: 1,
        pageSize: 1000,
        name: this.form.name
      }
      getCategoryList(params).then((res) => {
        this.asideList = res.data

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
    search() {
      this.params.jobName = this.form.name
      this.getJobData()
    },
    sizeChange(val) {
      this.params.pageSize = val
      this.getJobData()
    },
    currentChange(val) {
      this.params.pageNo = val
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
    handleCheck(row) {
      this.row = JSON.parse(JSON.stringify(row))
      this.isEdit = true
      this.title = '编辑子组织'
      this.positionDialog = true
    },
    handleCommand(event, row) {
      this.$confirm('您确定要删除该职位吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (row.workNum) {
            this.$confirm('很抱歉，您选中的职位下存在员工，请先将员工调整后在删除', {
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
.position {
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

<template>
  <div class="fill">
    <page-header title="组织机构管理">
      <el-dropdown
        slot="rightMenu"
        @command="handleCommand"
      >
        <el-button
          type="primary"
          size="medium"
        >
          新建组织
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="add">
            单个新建
          </el-dropdown-item>
          <!-- <el-dropdown-item>Excel导入</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </page-header>

    <basic-container block>
      <div class="transitionBox">
        <transition name="el-zoom-in-center">
          <div
            v-show="multipleSelection.length === 0"
            class="searchBox"
          >
            <div>
              <search-popover
                ref="searchPopover"
                :require-options="searchConfig.requireOptions"
                :popover-options="searchConfig.popoverOptions"
                @submit="handleSubmit"
              />
              <el-button
                icon="el-icon-sort"
                size="medium"
                @click="toSort"
              >
                调整排序
              </el-button>
              <!-- <el-button
                icon="el-icon-upload2"
                size="medium"
              >
                导出
              </el-button>-->
              <el-popover
                placement="bottom"
                width="40"
                trigger="click"
                style="margin-left:10px"
              >
                <el-checkbox-group
                  v-model="checkColumn"
                  style="display: flex;
    flex-direction: column;"
                  @change="columnChange"
                >
                  <el-checkbox
                    v-for="item in originColumn"
                    :key="item.prop"
                    :label="item.prop"
                    :disabled="item.prop === 'orgName'"
                    class="originColumn"
                  >
                    {{ item.label }}
                  </el-checkbox>
                </el-checkbox-group>
                <el-button
                  slot="reference"
                  icon="el-icon-setting"
                  size="medium"
                />
              </el-popover>
            </div>
          </div>
        </transition>
        <transition name="el-zoom-in-center">
          <div
            v-show="multipleSelection.length > 0"
            class="multipleBox"
          >
            <div class="multipleLeft">
              <div class="multipleLength">
                已选中 {{ multipleSelection.length }} 项
              </div>
              <el-button
                type="text"
                size="medium"
                icon="el-icon-delete"
                @click="multipleDeleteClick"
              >
                批量删除
              </el-button>
              <!--              <el-button-->
              <!--                size="medium"-->
              <!--                type="text"-->
              <!--                icon="el-icon-upload2"-->
              <!--              >-->
              <!--                批量导出-->
              <!--              </el-button>-->
            </div>
            <el-button
              size="medium"
              type="text"
              icon="el-icon-close"
              @click="clearMultipleSelection"
            />
          </div>
        </transition>
      </div>
      <avue-crud
        ref="avueCrud"
        :option="option"
        :data="data"
        :table-loading="tableLoading"
        @select="rowSelect"
        @select-all="selectAll"
      >
        <template
          slot="orgName"
          slot-scope="{ row }"
        >
          <span
            style="cursor: pointer"
            @click="toOrgDetail(row)"
          >
            <el-button type="text">{{ row.orgName }}</el-button>
          </span>
        </template>
        <template
          slot="orgType"
          slot-scope="{ row }"
        >
          {{ orgTypeObj[row.orgType] }}
        </template>
        <template
          slot="menu"
          slot-scope="{ row }"
        >
          <div class="menuClass">
            <el-button
              type="text"
              @click="handleCreateChild(row)"
            >
              新建子组织
            </el-button>
            <el-button
              type="text"
              @click="handleOrgEdit(row)"
            >
              编辑
            </el-button>
            <el-dropdown @command="handleCommand($event, row)">
              <el-button
                type="text"
                style="margin-left: 10px"
              >
                <i class="el-icon-arrow-down el-icon-more" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="deleteOrg">
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </avue-crud>
      <org-edit
        ref="orgEdit"
        :visible.sync="createOrgDailog"
        @refresh="getOrgTree"
      />
    </basic-container>
  </div>
</template>

<script>
import { getOrgTree, getUserWorkList, getOrgTreeSimple, deleteOrg } from '@/api/org/org'
import { tableOptions } from '@/util/constant'
import SearchPopover from '@/components/searchPopOver/index'
import OrgEdit from './components/orgEdit'

const column = [
  {
    label: '组织名称',
    prop: 'orgName',
    align: 'left',
    slot: true,
    minWidth: '200px'
  },
  {
    label: '组织类型',
    prop: 'orgType',
    slot: true
  },
  {
    label: '组织编码',
    prop: 'orgCode',
    align: 'right',
    minwWidth: '150px'
  },
  {
    label: '组织负责人',
    prop: 'userName'
  },
  {
    label: '职位数',
    prop: 'jobNum'
  },
  {
    label: '描述',
    prop: 'remark',
    overHidden: true
  }
]

export default {
  name: 'OrgManagement',
  components: { SearchPopover, OrgEdit },
  data() {
    return {
      checkColumn: [
        'orgName',
        'orgType',
        'orgCode',
        'userName',
        'jobNum',
        'userNum',
        'workNum',
        'remark'
      ],
      originColumn: column,
      searchConfig: {
        requireOptions: [
          {
            type: 'treeSelect',
            field: 'parentOrgId',
            label: '',
            data: '',
            config: {
              selectParams: {
                placeholder: '请输入内容',
                multiple: false
              },
              treeParams: {
                data: [],
                'check-strictly': true,
                'default-expand-all': false,
                'expand-on-click-node': false,
                clickParent: true,
                filterable: false,
                props: {
                  children: 'children',
                  label: 'orgName',
                  disabled: 'disabled',
                  value: 'orgId'
                }
              }
            }
          },
          {
            type: 'input',
            field: 'orgName',
            label: '',
            data: '',
            options: [],
            config: { placeholder: '组织名称', 'suffix-icon': 'el-icon-search' }
          }
        ],
        popoverOptions: [
          {
            type: 'select',
            field: 'orgType',
            label: '组织类型',
            data: '',
            options: [
              { value: 'Enterprise', label: '企业' },
              { value: 'Company', label: '公司' },
              { value: 'Department', label: '部门' },
              { value: 'Group', label: '小组' }
            ],
            config: { optionLabel: '', optionValue: '' }
          },
          {
            type: 'numInterval',
            field: 'minUserNum,maxUserNum',
            data: { min: '', max: '' },
            label: '组织人数'
          },
          {
            type: 'select',
            field: 'userId',
            data: '',
            label: '负责人',
            options: [],
            config: { optionLabel: 'name', optionValue: 'userId' },
            loading: false,
            noMore: false,
            pageNo: 2,
            loadMoreFun(item) {
              if (item.loading || item.noMore) return
              item.loading = true
              getUserWorkList({ pageNo: item.pageNo, pageSize: 100 }).then((res) => {
                if (res.data.length > 0) {
                  item.options.push(...res.data)
                  item.pageNo += 1
                  item.loading = false
                } else {
                  item.noMore = true
                  item.loading = false
                }
              })
            }
          }
        ]
      },
      data: [],
      tableLoading: false,
      multipleSelection: [],
      option: {
        ...tableOptions,
        headerAlign: 'center',
        align: 'center',
        border: false,
        menuWidth: 180,
        selectionWidth: 60,
        defaultExpandAll: true,
        selection: true,
        formHeight: 20,
        rowKey: 'orgId',
        column: column
      },
      newOrg: {},
      rules: {
        orgName: [{ required: true, message: '请输入组织名称', trigger: 'blur' }],
        parentOrgId: [{ required: true, message: '请选择上级组织', trigger: 'change' }],
        orgType: [{ required: true, message: '请选择组织类型', trigger: 'change' }]
      },
      createOrgDailog: false,
      orgTypeObj: { Enterprise: '企业', Company: '公司', Department: '部门', Group: '小组' },
      searchParams: { parentOrgId: 0 }
    }
  },
  watch: {
    multipleSelection: {
      handler(newVal) {
        newVal.forEach((item) => {
          this.$refs.avueCrud.toggleRowSelection(item, true)
        })
      },
      deep: true
    }
  },
  created() {
    getUserWorkList({ pageNo: 1, pageSize: 100 }).then((res) => {
      this.searchConfig.popoverOptions[2].options.push(...res.data)
    })
    getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
      this.searchConfig.requireOptions[0].config.treeParams.data = res
      this.$refs['searchPopover'].treeDataUpdateFun(res, 'parentOrgId')
      this.searchConfig.requireOptions[0].data = res[0].orgId
    })
  },
  activated() {
    this.getOrgTree()
  },
  methods: {
    clearMultipleSelection() {
      this.$refs.avueCrud.selectClear()
      this.multipleSelection = []
    },
    getOrgTree() {
      const params = this.searchParams
      this.tableLoading = true
      if (Array.isArray(params.parentOrgId)) params.parentOrgId = params.parentOrgId[0]['']
      getOrgTree(params).then((res) => {
        this.data = res
        this.multipleSelection = []
        this.tableLoading = false

        if (this.searchParams.orgName) {
          // this.data =[]
          let newData = []
          this.recursion(this.data, newData)
          this.data = newData
        }
      })
    },
    /**
     *  @author guanfenda
     *  @desc 处理扁平化数组
     * */
    recursion(data, newData) {
      data.filter((item) => {
        let it = JSON.parse(JSON.stringify(item))
        it.children && delete it.children
        newData.push(it)
        item.children && item.children.length > 0 && this.recursion(item.children, newData)
      })
    },
    toOrgDetail(row) {
      this.$router.push({ path: '/orgs/orgDetail?orgId=' + row.orgId })
    },
    handleSubmit(params) {
      this.searchParams = params
      this.getOrgTree()
      // this.getOrgTree(this.data)
    },
    handleCommand(command, row) {
      if (command === 'add') {
        this.createOrgDailog = true
        this.$refs.orgEdit.create()
      } else if (command === 'deleteOrg') {
        if (row.parentId === 0) {
          this.$message.error('顶级组织不可删除')
          return
        }
        if (row.children > 0) {
          this.$message.error('很抱歉，您选中的组织下存在子组织，请先将子组织调整后再删除!')
          return
        }
        if (row.jobNum > 0) {
          this.$message.error('很抱歉，您选中的组织下存在子职位，请先将子职位调整后再删除!')
          return
        }
        this.$confirm('您确定要删除选中的组织么？', '提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteOrg({ ids: row.orgId }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getOrgTree()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    multipleDeleteClick() {
      let isError = false
      let params = {
        ids: this.multipleSelection
          .map((item) => {
            if (item.parentId === 0) {
              this.$message.error('顶级组织不可删除')
              isError = true
            }
            if (item.children > 0) {
              this.$message.error('很抱歉，您选中的组织下存在子组织，请先将子组织调整后再删除!')
              isError = true
            }
            if (item.jobNum > 0) {
              this.$message.error('很抱歉，您选中的组织下存在子职位，请先将子职位调整后再删除!')
              isError = true
            }
            return item.orgId
          })
          .join(',')
      }
      if (isError) return
      deleteOrg(params).then(() => {
        this.$message.success('删除成功')
        this.getOrgTree()
      })
    },
    handleOrgEdit(row) {
      this.$refs.orgEdit.edit(row)
    },
    handleCreateChild(row) {
      this.$refs.orgEdit.createChild(row)
    },
    columnChange() {
      this.option.column = column.filter((item) => {
        return this.checkColumn.indexOf(item.prop) > -1
      })
    },
    toggleSelection(rows, flag) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.avueCrud.toggleRowSelection(row, flag)
        })
      } else {
        this.$refs.avueCrud.selectClear()
      }
    },
    rowSelect(selection, row) {
      this.multipleSelection = selection
      if (selection.indexOf(row) > -1 && row.children && row.children.length > 0) {
        // this.toggleSelection(row.children, true)
        this.deepCheck(selection, true)
      }
    },
    deepCheck(arr, check) {
      arr.forEach((item) => {
        if (item.children && item.children.length > 0) {
          this.deepCheck(item.children, check)
        }
        if (this.multipleSelection.indexOf(item) === -1 && check) {
          this.multipleSelection.push(item)
        }
        // this.toggleSelection(item.children, check)
      })
    },
    selectAll(selection) {
      var flag = false // 默认 为全不选
      // selection.forEach((item) => {
      if (this.multipleSelection.length === 0) {
        flag = true
      }
      // })
      this.multipleSelection = selection
      if (!flag) {
        this.toggleSelection()
        this.multipleSelection = []
      } else {
        this.deepCheck(selection, true)
      }
    },
    toSort() {
      this.$router.push({ path: '/orgs/orgSort' })
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-container--block {
  height: calc(100% - 92px);
  min-height: calc(100% - 92px);
}
.originColumn {
  height: 25px;
}
.transitionBox {
  position: relative;
  height: 50px;
}
.searchBox {
  position: absolute;
  width: 100%;
  > div {
    display: flex;
    :first-child {
      flex: 1;
    }
    > button {
      height: 34px;
    }
  }
}
.multipleBox {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  .multipleLeft {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 20px;
    .multipleLength {
      padding: 0 20px;
      margin-right: 20px;
      border-right: 1px solid #999999;
    }
  }
}

/deep/ .avue-crud__pagination {
  height: 0px;
}
.newOrgDailog {
  .el-select {
    width: 100%;
  }
}
/deep/ .avue-crud__pagination {
  display: none;
}
</style>

<template>
  <basic-container>
    <div class="org-header">
      <h4>组织机构管理</h4>
      <el-dropdown @command="handleCommand">
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
          <el-dropdown-item>Excel导入</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div
      v-show="multipleSelection.length === 0"
      class="searchBox"
    >
      <search-popoover
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
      <el-button
        icon="el-icon-upload2"
        size="medium"
      >
        导出
      </el-button>
      <el-popover
        placement="bottom"
        width="40"
        trigger="click"
        style="margin-left:10px"
      >
        <el-checkbox-group
          v-model="checkColumn"
          @change="columnChange"
        >
          <el-checkbox
            v-for="item in originColumn"
            :key="item.prop"
            :label="item.prop"
            :disabled="item.prop === 'orgName'"
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
        >
          批量删除
        </el-button>
        <el-button
          size="medium"
          type="text"
          icon="el-icon-upload2"
        >
          批量导出
        </el-button>
      </div>
      <el-button
        size="medium"
        type="text"
        icon="el-icon-close"
      />
    </div>
    <avue-crud
      ref="avueCrud"
      :option="option"
      :data="data"
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
        >{{ row.orgName }}</span>
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
        <div>
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
    />
  </basic-container>
</template>

<script>
import { getOrgTree } from '@/api/org/org'
import { tableOptions } from '@/util/constant'
import SearchPopoover from '@/components/searchPopover/index'
import OrgEdit from './components/orgEdit'

const column = [
  {
    label: '组织名称',
    prop: 'orgName',
    align: 'left',
    slot: true
  },
  {
    label: '组织类型',
    prop: 'orgType',
    slot: true
  },
  {
    label: '组织编码',
    prop: 'orgCode'
  },
  {
    label: '负责人姓名',
    prop: 'userName'
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
]

export default {
  components: { SearchPopoover, OrgEdit },
  data() {
    return {
      checkColumn: ['orgName', 'orgType', 'orgCode', 'userName', 'jobNum', 'userNum', 'wordNum', 'remark'],
      originColumn: column,
      searchConfig: {
        requireOptions: [
          {
            type: 'select',
            field: 'parentOrgId',
            label: '',
            defaultValue: '0',
            defaultLabel: '@Qy4DZc',
            options: [],
            config: { tree: true, nodeKey: 'orgId', treeLabel: 'orgName' }
          },
          {
            type: 'input',
            field: 'orgName',
            label: '',
            options: [],
            config: { placeholder: '组织名称' }
          }
        ],
        popoverOptions: [
          {
            type: 'select',
            field: 'orgType',
            label: '组织类型',
            options: [{ Enterprise: '企业' }, { Company: '公司' }, { Department: '部门' }, { Group: '小组' }]
          },
          {
            type: 'numInterval',
            field: 'minUserNum,maxUserNum',
            label: '组织人数'
          },
          {
            type: 'select',
            field: 'userId',
            label: '负责人',
            options: []
          }
        ]
      },
      data: [],
      multipleSelection: [],
      option: {
        ...tableOptions,
        headerAlign: 'center',
        align: 'center',
        border: false,
        defaultExpandAll: true,
        selection: true,
        formHeight: 20,
        height: 'auto',
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
  created() {
    getOrgTree({ parentOrgId: 0 }).then((res) => {
      this.searchConfig.requireOptions[0].options.push(...res)
    })
    this.getOrgTree()
  },
  methods: {
    getOrgTree() {
      const params = this.searchParams
      getOrgTree(params).then((res) => {
        this.data = res
      })
    },
    toOrgDetail(row) {
      this.$router.push({ path: '/orgs/orgDetail?orgId=' + row.orgId })
    },
    handleSubmit(params) {
      this.searchParams = params
      // this.getOrgTree(this.data)
    },
    handleCommand(command) {
      if (command === 'add') {
        this.createOrgDailog = true
        this.$refs.orgEdit.create()
      } else if (command === 'deleteOrg') {
        this.$confirm('您确定要删除选中的组织么？', '提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
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
      if (selection.indexOf(row) > -1 && row.children.length > 0) {
        this.toggleSelection(row.children, true)
        this.deepCheck(selection, true)
      }
      //   if (selection.indexOf(row) === -1 && row.children.length > 0) {
      //     this.toggleSelection(row.children, false)
      //     this.deepCheck(selection, false)
      //   }
      //   if (selection.indexOf(row) > -1 && row.menuLevel === 2) {
      //     let s = this.data.filter((item) => {
      //       if (item.id === row.menuPid) {
      //         return item
      //       }
      //     })
      //     this.toggleSelection(s, true)
      //   }
    },
    deepCheck(arr, check) {
      arr.forEach((item) => {
        if (item.children.length > 0) {
          this.deepCheck(item.children, check)
        }
        if (this.multipleSelection.indexOf(item) === -1 && check) {
          this.multipleSelection.push(item)
        }
        this.toggleSelection(item.children, check)
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
.org-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.searchBox {
  display: flex;
  :first-child {
    flex: 1;
  }
  > button {
    height: 38px;
  }
}
.multipleBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .multipleLeft {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .multipleLength {
      padding: 0 20px;
      margin-right: 20px;
      border-right: 1px solid #999999;
    }
  }
}
.newOrgDailog {
  .el-select {
    width: 100%;
  }
}
</style>

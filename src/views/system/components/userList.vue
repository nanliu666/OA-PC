<template>
  <basic-container block>
    <common-table
      ref="crud"
      :config="tableConfig"
      :columns="columns"
      :loading="loading"
      :data="data"
      :page="page"
      @selection-change="selectionChange"
      @current-page-change="currentChange"
      @page-size-change="sizeChange"
    >
      <template
        slot="multiSelectMenu"
        slot-scope="{ selection }"
      >
        <el-button
          type="text"
          style="margin-bottom:0;"
          @click="handleResetBatch(selection)"
        >
          批量重置密码
        </el-button>
      </template>
      <template slot="topMenu">
        <el-input
          v-model="query.name"
          placeholder="姓名/工号"
          suffix-icon="el-icon-search"
          style="width:200px;margin-right:12px;"
        />
        <el-button
          type="primary"
          size="medium"
          plain
        >
          添加员工
        </el-button>
      </template>
      <template
        slot="handler"
        slot-scope="{ row }"
      >
        <el-button
          size="medium"
          type="text"
          @click="handleEditRole(row)"
        >
          角色设置
        </el-button>
        <el-button
          size="medium"
          type="text"
          @click="handleReset(row)"
        >
          密码重置
        </el-button>
        <el-dropdown
          style="float:right;"
          trigger="click"
          @command="(command) => handleCommand(command, row)"
        >
          <span
            class="el-dropdown-link"
            style="line-height:32px;"
          > <i class="el-icon-more" /> </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="suspend">
              冻结
            </el-dropdown-item>
            <el-dropdown-item command="suspend">
              解冻
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </common-table>
    <user-role-edit :visible.sync="editVisible" />
  </basic-container>
</template>

<script>
import { getList, resetPassword } from '@/api/system/user'
import { mapGetters } from 'vuex'

export default {
  name: 'User',
  components: {
    // 员工角色编辑
    userRoleEdit: () => import('./userRoleEdit')
  },
  data() {
    return {
      selectionList: [],
      query: {
        name: ''
      },
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      tableConfig: {
        showHandler: true,
        enableMultiSelect: true
      },
      columns: [
        {
          label: '工号',
          prop: 'account'
        },
        {
          label: '所属租户',
          prop: 'tenantName'
        },
        {
          label: '姓名',
          prop: 'realName'
        },
        {
          label: '部门',
          prop: 'deptName'
        },
        {
          label: '职位',
          prop: 'roleName'
        }
      ],
      data: [],
      editVisible: false
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    ids() {
      let ids = []
      this.selectionList.forEach((ele) => {
        ids.push(ele.id)
      })
      return ids.join(',')
    }
  },
  created() {
    this.onLoad(this.page)
  },
  methods: {
    handleEditRole() {
      this.editVisible = true
    },
    selectionChange(list) {
      this.selectionList = list
    },
    selectionClear() {
      this.selectionList = []
      this.$refs.crud.toggleSelection()
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    handleResetBatch(selection) {
      // eslint-disable-next-line
      console.log('selection:', selection)
    },
    handleReset(row) {
      this.$confirm('确定将选择账号密码重置为123456?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return resetPassword([row.id])
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.$refs.crud.toggleSelection()
        })
    },
    onLoad(page, params = {}) {
      this.loading = true
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query), this.treeDeptId).then((data) => {
        this.page.total = data.total
        this.data = data.records
        this.loading = false
        // this.selectionClear()
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>

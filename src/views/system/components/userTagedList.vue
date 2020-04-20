<template>
  <basic-container>
    <avue-crud
      ref="crud"
      :option="option"
      :table-loading="loading"
      :data="data"
      :permission="permissionList"
      :page="page"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @size-change="sizeChange"
      @refresh-change="refreshChange"
      @on-load="onLoad"
    >
      <template v-if="selectionList.length === 0">
        <template slot="menuLeft">
          <el-input
            v-model="query.name"
            placeholder="姓名/工号"
            suffix-icon="el-icon-search"
          />
        </template>
        <template slot="menuRight">
          <el-button
            v-if="permission.user_add"
            type="primary"
            size="small"
            plain
            @click="handleAddTagMember"
          >
            添加员工
          </el-button>
        </template>
      </template>
      <template v-else>
        <template slot="menuLeft">
          <div style="line-height:40px;">
            <span>
              已选中 <span>{{ selectionList.length }}</span> 项
            </span>
            <el-divider direction="vertical" />
            <el-button
              type="text"
              style="margin-bottom:0;"
            >
              批量移出
            </el-button>
          </div>
        </template>
        <template slot="menuRight">
          <i
            class="el-icon-close"
            style="line-height: 40px;margin-right:10px;"
            @click="selectionClear"
          />
        </template>
      </template>
      <template
        slot="menu"
        slot-scope="{ row, label, type, size }"
      >
        <el-button
          :size="size"
          :type="type"
          @click="handleDelete(row)"
        >
          移出
        </el-button>
      </template>
    </avue-crud>
    <user-taged-edit :visible.sync="editVisible" />
  </basic-container>
</template>

<script>
import { remove } from '@/api/system/user'
import { mapGetters } from 'vuex'
import { tableOptions } from '@/util/constant'

export default {
  name: 'User',
  components: {
    // 标签成员编辑
    userTagedEdit: () => import('./userTagedEdit')
  },
  data() {
    return {
      selectionList: [],
      query: {
        name: ''
      },
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      activeTag: {},
      editVisible: false,
      option: {
        height: 'auto',
        calcHeight: 80,
        border: true,
        index: true,
        selection: true,
        menuWidth: 160,
        ...tableOptions,
        column: [
          {
            label: '工号',
            prop: 'account',
            display: false
          },
          {
            label: '姓名',
            prop: 'realName',
            display: false
          },
          {
            label: '手机号',
            prop: 'phone',
            display: false
          },
          {
            label: '部门',
            prop: 'deptName',
            display: false
          },
          {
            label: '职位',
            prop: 'roleName',
            display: false
          }
        ]
      },
      data: [
        {
          id: '112359882138675201',
          tenantId: '000000',
          code: '',
          account: 'admin',
          name: '管理员',
          realName: '管理员',
          tenantName: '管理组',
          roleName: '超级管理员',
          deptName: '刀锋科技',
          postName: '首席执行官',
          sexName: '男'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'permission']),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.user_add, false),
        viewBtn: this.vaildData(this.permission.user_view, false),
        delBtn: this.vaildData(this.permission.user_delete, false),
        editBtn: this.vaildData(this.permission.user_edit, false)
      }
    },
    ids() {
      let ids = []
      this.selectionList.forEach((ele) => {
        ids.push(ele.id)
      })
      return ids.join(',')
    }
  },
  methods: {
    handleAddTagMember() {
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
    refreshChange() {},
    handleDelete(row) {
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return remove(row.id)
        })
        .then(() => {
          this.onLoad(this.page)
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.$refs.crud.toggleSelection()
        })
    },

    onLoad() {
      // this.loading = true
      // getList(page.currentPage, page.pageSize, Object.assign(params, this.query), this.treeDeptId).then((res) => {
      //   const data = res.data.data
      //   this.page.total = data.total
      //   this.data = data.records
      //   this.loading = false
      //   this.selectionClear()
      // })
    }
  }
}
</script>

<style lang="scss" scoped></style>

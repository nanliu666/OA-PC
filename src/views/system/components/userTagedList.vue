<template>
  <basic-container
    block
    style="padding-top:0;"
  >
    <common-table
      ref="crud"
      :config="tableConfig"
      :columns="columns"
      :loading="loading"
      :data="data"
      :page="page"
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
          @click="handleDelete(selection)"
        >
          批量移出
        </el-button>
      </template>
      <template slot="topMenu">
        <div class="flex flex-flow flex-justify-between flex-items">
          <el-input
            v-model="query.name"
            placeholder="姓名/工号"
            suffix-icon="el-icon-search"
            style="width:200px;margin-right:12px;"
            @change="currentChange(1)"
          />
          <!--        <el-button-->
          <!--          type="primary"-->
          <!--          size="medium"-->
          <!--          style="float:right;"-->
          <!--          plain-->
          <!--          @click="handleEditTagUser"-->
          <!--        >-->
          <!--          添加员工-->
          <!--        </el-button>-->
          <div>
            <span
              class="addUser"
              @click="handleEditTagUser"
            >添加员工</span>
            <span
              class="icon  el-icon-refresh-right"
              @click="loadData"
            />
          </div>
        </div>
      </template>
      <template
        slot="handler"
        slot-scope="{ row }"
      >
        <el-button
          size="medium"
          type="text"
          @click="handleDelete(row)"
        >
          移出
        </el-button>
      </template>
    </common-table>
    <user-taged-edit
      ref="userTagedEdit"
      :visible.sync="editVisible"
      :tag-id="activeTag ? activeTag.id : null"
      @after-submit="handleAfterSubmit"
    />
  </basic-container>
</template>

<script>
import { getTagUserList, delTagUser } from '@/api/system/user'

export default {
  name: 'User',
  components: {
    // 标签成员编辑
    userTagedEdit: () => import('./userTagedEdit')
  },
  props: {
    activeTag: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      loading: false,
      query: {
        name: ''
      },
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      tableConfig: {
        showHandler: true,
        enableMultiSelect: true,
        enablePagination: true,
        showIndexColumn: false,
        rowKey: 'userId'
      },
      columns: [
        {
          label: '姓名',
          prop: 'name'
        },
        //员工状态，Try-试用期，Formal-正式，WaitLeave-待离职
        {
          label: '状态',
          prop: 'status',
          formatter(record) {
            return (
              {
                Try: '试用期',
                Formal: '正式',
                WaitLeave: '待离职'
              }[record.status] || ''
            )
          }
        },
        {
          label: '部门',
          prop: 'orgName'
        },
        {
          label: '职位',
          prop: 'jobName'
        }
      ],
      data: [],
      editVisible: false
    }
  },
  watch: {
    activeTag: function() {
      this.loadData()
    }
  },
  methods: {
    loadData() {
      if (!this.activeTag) {
        return
      }
      this.loading = true
      getTagUserList({
        pageNo: this.page.currentPage,
        pageSize: this.page.size,
        tagId: this.activeTag.id,
        search: this.query.name
      })
        .then((res) => {
          this.page.total = res.totalNum
          this.data = res.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage
      this.loadData()
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    handleDelete(data) {
      let msg = '确定将用户移出该标签么？'
      let userId = data.userId
      if (Array.isArray(data)) {
        msg = `确定将选中的${data.length}个用户移出该标签么？`
        userId = data.map((item) => item.userId).join(',')
      }
      this.$confirm(msg, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return delTagUser(this.activeTag.id, userId)
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.$refs.crud.clearSelection()
          this.handleAfterSubmit()
        })
    },
    handleAfterSubmit() {
      this.loadData()
      this.$emit('refresh-tag')
    },
    handleEditTagUser() {
      if (!this.activeTag) {
        this.$message({
          type: 'error',
          message: '请先创建标签!'
        })
      }
      this.$refs['userTagedEdit'].init({
        tagId: this.activeTag.id,
        userList: this.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.addUser {
  font-size: 14px;
  display: inline-block;
  color: #757c85;
  line-height: 14px;
  cursor: pointer;
  padding-right: 12px;
  border-right: 0.5px solid #e9e9e9;
}
.icon {
  margin-left: 12px;
  font-size: 18px;
  color: #a0a8ae;
  cursor: pointer;
}
</style>

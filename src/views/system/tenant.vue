<template>
  <div>
    <pageHeader title="商户管理">
      <template slot="rightMenu">
        <el-button
          size="medium"
          type="primary"
          @click="createTenant"
        >
          新建商户
        </el-button>
      </template>
    </pageHeader>
    <basic-container block>
      <common-table
        style="width: 100%"
        :data="data"
        :config="tableConfig"
        :columns="columns"
        :loading="loading"
        :page="page"
        @current-page-change="handleCurrentPageChange"
        @page-size-change="handlePageSizeChange"
      >
        <template slot="topMenu">
          <div class="flex flex-flow flex-justify-between flex-items">
            <el-input
              v-model="form.tenantName"
              placeholder="商户名称"
              suffix-icon="el-icon-search"
              style="width:200px;margin-right:12px;"
              @input="loadData"
            />
            <div>
              <!--            <span-->
              <!--              class="addUser"-->
              <!--              @click="jumpAddUser"-->
              <!--            ></span>-->
              <i
                class="icon  el-icon-refresh-right"
                @click="loadData"
              />
            </div>
          </div>
        </template>
        <template
          slot="handler"
          slot-scope="scope"
        >
          <el-button
            type="text"
            size="medium"
            @click="handleWatch(scope.row)"
          >
            查看
          </el-button>
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
            @click.stop="handleWorkNo(scope.row, scope.index)"
          >
            工号
          </el-button>
        </template>
      </common-table>
    </basic-container>
    <tenant-dialog
      v-if="dialogVisible"
      :dialog-visible.sync="dialogVisible"
      :row="row"
      :title="title"
      @updataData="loadData"
    />
    <watch-dialog
      v-if="watchDialog"
      :row="rowData"
      :dialog-visible.sync="watchDialog"
    />
    <workno-dialog
      v-if="worknoDialog"
      :row="rowData"
      :dialog-visible.sync="worknoDialog"
    />
  </div>
</template>

<script>
import { getTenant } from '@/api/system/tenant'
import tenantDialog from './components/tenantDialog'
import watchDialog from './components/watchTenantDialog'
import worknoDialog from './components/worknoDialog'
export default {
  name: 'Tenant',
  components: {
    tenantDialog,
    watchDialog,
    worknoDialog
  },
  data() {
    return {
      title: '',
      watchDialog: false,
      worknoDialog: false,
      row: {},
      rowData: {},
      dialogVisible: false,
      form: {
        tenantName: ''
      },
      data: [],
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      loading: false,
      params: {
        pageSize: 10,
        pageNo: 1,
        pagerCount: 1
      },
      tableConfig: {
        showHandler: true,
        showIndexColumn: false,
        rowKey: 'id',
        enableMultiSelect: false
      },
      columns: [
        {
          label: '租户ID',
          prop: 'tenantId'
        },
        {
          label: '租户名称',
          prop: 'tenantName'
        },
        {
          label: '绑定的域名',
          prop: 'domain',
          width: 150
        },
        {
          label: '版权',
          prop: 'copyright'
        },
        {
          label: '租户状态',
          prop: 'status'
        },
        {
          label: '创建时间',
          prop: 'createTime'
        }
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    createTenant() {
      this.dialogVisible = true
      this.title = '创建商户'
      this.row = {}
    },
    jumpAddUser() {},
    loadData() {
      this.getData()
    },
    getData() {
      let params = {
        pageNo: this.params.pageNo,
        pageSize: this.params.pageSize,
        tenantName: this.form.tenantName
      }
      getTenant(params).then((res) => {
        this.data = res.data
        this.page.total = res.totalNum
      })
    },
    handleCurrentPageChange(val) {
      this.params.pageNo = val
      this.getData()
    },
    handlePageSizeChange(val) {
      this.params.pageSize = val
      this.params.pageNo = 1
      this.page.pagerCount = 1
      this.getData()
    },
    handleEdit(row) {
      this.row = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
      this.title = '编辑商户'
    },
    handleWorkNo(row) {
      this.rowData = JSON.parse(JSON.stringify(row))
      this.worknoDialog = true
    },
    /**
     *  @author guanfenda
     *  @desc 查看
     * */
    handleWatch(row) {
      this.watchDialog = true
      this.rowData = JSON.parse(JSON.stringify(row))
      this.rowData = JSON.parse(JSON.stringify(row))
    }
  }
}
</script>

<style lang="scss" scoped></style>

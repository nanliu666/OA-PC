<template>
  <div>
    <el-dialog
      :title="`${roleName ? `【roleName】` : ''}用户列表`"
      :visible.sync="dialogVisible"
      width="800px"
      :close-on-click-modal="false"
      append-to-body
    >
      <div v-loading="loading">
        <div style="text-align: right;margin-bottom: 10px;">
          <el-button
            type="primary"
            size="medium"
            @click="onClickAdd"
          >
            添加用户
          </el-button>
        </div>
        <avue-crud
          :data="data"
          :option="option"
          :page.sync="page"
          @on-load="onLoad"
        />
      </div>
    </el-dialog>
    <userEdit
      v-if="addVisible"
      :visible.sync="addVisible"
      :role-id="roleId"
      @onAddUser="onAddUser"
    />
  </div>
</template>
<script>
import userEdit from './roleUserEdit'
import { tableOptions } from '../../../util/constant'
import { getUser } from '../../../api/system/role'

export default {
  name: 'UserList',
  components: {
    userEdit
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    roleName: {
      type: String,
      default: ''
    },
    roleId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      dialogVisible: true,
      addVisible: false,
      page: {
        pageSize: 10,
        pagerCount: 5,
        total: 100
      },
      data: [],
      option: {
        ...tableOptions,
        menu: false,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: '工号',
            prop: 'workNo'
          },
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '状态',
            prop: 'status',
            formatter(row, value) {
              let str = ''
              switch (value) {
                case 'Try':
                  str = '试用期'
                  break
                case 'Formal':
                  str = '正式'
                  break
                case 'Leaved':
                  str = '已离职'
                  break
                case 'WaitLeave':
                  str = '待离职'
                  break
              }
              return str
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
        ]
      }
    }
  },
  computed: {
    // dialogVisible: {
    //   get: function() {
    //     return this.visible
    //   },
    //   set: function(val) {
    //     this.$emit('update:visible', val)
    //   }
    // }
  },
  watch: {
    dialogVisible: {
      handler: function() {
        this.$emit('update:visible', this.dialogVisible)
      }
    }
  },
  methods: {
    // 加载用户列表
    onLoad(page) {
      const params = {
        pageNo: page.currentPage,
        pageSize: page.pageSize,
        roleId: this.roleId
      }
      this.loading = true
      getUser(params).then((res) => {
        this.loading = false
        this.data = res.data
        this.page.total = res.totalNum
      })
    },
    // 添加用户完成后的操作
    onAddUser() {
      this.page.currentPage = 1
      this.onLoad(this.page)
    },
    // 点击添加
    onClickAdd() {
      this.addVisible = !this.addVisible
    }
  }
}
</script>

<style scoped></style>

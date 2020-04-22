<template>
  <div>
    <el-dialog
      :title="`${roleName ? `【roleName】` : ''}用户列表`"
      :visible.sync="dialogVisible"
      width="800px"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <div>
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
    <userEdit :visible.sync="addVisible" />
  </div>
</template>
<script>
import userEdit from './roleUserEdit'
import { tableOptions } from '../../../util/constant'

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
    }
  },
  data() {
    return {
      addVisible: false,
      page: {
        pageSize: 20,
        pagerCount: 5,
        total: 100
      },
      data: [
        {
          num: 'L0009383',
          name: '张彩云',
          status: '正常',
          dept: '会计处',
          position: '总账会计'
        },
        {
          num: 'L0002383',
          name: '黎成',
          status: '正常',
          dept: '资金管理部',
          position: '总经理'
        }
      ],
      option: {
        ...tableOptions,
        menu: false,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: '工号',
            prop: 'num'
          },
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '状态',
            prop: 'status'
          },
          {
            label: '部门',
            prop: 'dept'
          },
          {
            label: '职位',
            prop: 'position'
          }
        ]
      }
    }
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.visible
      },
      set: function(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    onLoad() {},
    onClickAdd() {
      this.addVisible = !this.addVisible
    }
  }
}
</script>

<style scoped></style>

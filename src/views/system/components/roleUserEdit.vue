<template>
  <div>
    <el-dialog
      v-loading="loading"
      title="添加用户"
      :visible.sync="dialogVisible"
      type="selection"
      top="5%"
      width="800px"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <div class="add-wrap">
        <div class="add-user_left">
          <div>
            <span class="add-title">待添加列表</span>
          </div>
          <div style="width: 300px;margin: 10px 0">
            <el-input
              v-model="searchInput"
              placeholder="请输入内容"
              @keyup.enter.native="onClickSearch"
            >
              <i
                slot="suffix"
                class="el-icon-search el-input__icon"
                @click="onClickSearch"
              />
            </el-input>
          </div>
          <el-table
            ref="table"
            :data="tableData"
            stripe
            style="width: 100%"
            @select="handleSelection"
            @select-all="selectAll"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              v-for="(item, index) in attr"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            />
          </el-table>
          <div style="text-align: right">
            <el-pagination
              :current-page.sync="page.currentPage"
              :page-size="10"
              :pager-count="5"
              layout="prev, pager, next"
              :total="page.total"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
        <div class="add-user_right">
          <div class="selected-title">
            <span class="add-title"> 已添加列表</span>
            <span
              style="color: #409EFF;cursor: pointer"
              @click="onDelAll"
            >
              全部清除
            </span>
          </div>
          <div class="tag-wrap">
            <div
              v-for="(tag, index) in tags"
              :key="index"
              class="tag-item"
            >
              <el-tag
                closable
                type="info"
                @close="onDel(tag, index)"
              >
                {{ tag.name + ` (${tag.workNo}) ` }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="medium"
          @click="onClickCancel"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          size="medium"
          @click="onClickSave"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUnuser, addUser } from '../../../api/system/role'

export default {
  name: 'UserEdit',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      searchInput: '',
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      },
      attr: [
        {
          prop: 'workNo',
          label: '工号',
          width: '120'
        },
        {
          prop: 'name',
          label: '姓名',
          width: '100'
        },
        {
          prop: 'orgName',
          label: '部门',
          width: '180'
        }
      ],
      tableData: [],
      tags: []
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
  created() {
    this.getAddList()
  },
  methods: {
    // 搜索
    onClickSearch() {
      this.page.currentPage = 1
      this.getAddList()
    },
    // 查询用户列表
    getAddList() {
      return new Promise((resolve) => {
        const params = {
          pageNo: this.page.currentPage,
          pageSize: this.page.pageSize,
          roleId: this.roleId,
          name: this.searchInput
        }
        getUnuser(params).then((res) => {
          this.tableData = res.data
          this.page.total = res.totalNum
          resolve()
        })
      })
    },
    // 表格多选，改变右侧已选列表
    handleSelection(selection, row) {
      const checkIndex = selection.indexOf(row)
      if (checkIndex > -1) {
        this.tags.push(row)
      } else {
        this.tags.splice(this.tags.indexOf(row), 1)
      }
    },

    // 表格全选，改变右侧已选列表
    selectAll(selection) {
      if (selection.length > 0) {
        // 全选
        selection.forEach((item) => {
          if (this.tags.findIndex((it) => item.userId === it.userId) === -1) {
            this.tags.push(item)
          }
        })
      } else if (selection.length == 0) {
        // 反选
        this.tableData.forEach((item) => {
          const num = this.tags.findIndex((it) => item.userId === it.userId)
          if (num > -1) {
            this.tags.splice(num, 1)
          }
        })
      }
    },

    // 根据右侧已选列表，勾选左侧表格列表
    toggleSelection(rows, flag = true) {
      if (rows) {
        this.$nextTick(() => {
          const arr = this.tableData.filter(
            (item) => rows.findIndex((it) => item.userId === it.userId) > -1
          )
          arr.forEach((row) => {
            this.$refs.table.toggleRowSelection(row, flag)
          })
        })
      }
    },
    // 翻页
    async handleCurrentChange(val) {
      this.page.currentPage = val
      await this.getAddList()

      this.toggleSelection(this.tags) // 翻页时，根据右侧已选列表，勾选左侧表格列表
    },
    // 删除已选tag
    onDel(tag, index) {
      this.tags.splice(index, 1)
      this.toggleSelection([tag], false)
    },
    // 删除全部已选tag
    onDelAll() {
      this.toggleSelection(this.tags, false)
      this.tags = []
    },
    // 关闭弹窗
    onClickCancel() {
      this.$emit('update:visible', false)
    },
    // 点击保存
    onClickSave() {
      let users = []
      this.tags.map((it) => {
        users.push(it.userId)
      })
      const params = {
        roleId: this.roleId,
        users: users
      }
      this.loading = true
      addUser(params).then(() => {
        this.loading = false
        this.$message.success('用户添加成功')
        this.$emit('onAddUser')
        this.onClickCancel()
        this.onDelAll()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-wrap {
  display: flex;

  .add-user_left {
    flex: 1;
  }

  .add-title {
    font-size: 16px;
  }

  .add-user_right {
    width: 300px;
  }

  .add-user_left {
    border-right: 1px solid #f2f2f2;
    padding-right: 10px;
    margin-right: 10px;
  }

  .add-user_right {
    .selected-title {
      display: flex;
      justify-content: space-between;
      /*align-items: baseline;*/
    }

    .tag-wrap {
      padding-top: 10px;

      .tag-item {
        display: inline-block;
        width: 50%;
        margin-bottom: 5px;
      }
    }
  }
}

.dialog-footer {
  text-align: center;
}
</style>

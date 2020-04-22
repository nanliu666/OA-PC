<template>
  <div>
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      type="selection"
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
              popper-class="my-autocomplete"
              placeholder="请输入内容"
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
              @click="onCloseAll"
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
                @close="onClose(tag, index)"
              >
                {{ tag.name + ` (${tag.num}) ` }}
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
export default {
  name: 'UserEdit',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchInput: '',
      page: {
        currentPage: 1,
        total: 100
      },
      attr: [
        {
          prop: 'num',
          label: '工号',
          width: '120'
        },
        {
          prop: 'name',
          label: '姓名',
          width: '100'
        },
        {
          prop: 'dept',
          label: '部门',
          width: '180'
        }
      ],
      tableData: [
        {
          num: 'L00001',
          name: '张彩云',
          dept: '会计部',
          id: 0
        },
        {
          num: 'L00002',
          name: '黎成',
          dept: '资金管理部',
          id: 1
        },
        {
          num: 'L00002',
          name: '黎成',
          dept: '资金管理部',
          id: 2
        },
        {
          num: 'L00002',
          name: '黎成',
          dept: '资金管理部',
          id: 3
        },
        {
          num: 'L00002',
          name: '黎成',
          dept: '资金管理部',
          id: 4
        },
        {
          num: 'L00002',
          name: '黎成',
          dept: '资金管理部',
          id: 5
        }
      ],
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
  methods: {
    onClickSearch() {},
    handleSelection(selection, row) {
      const checkIndex = selection.indexOf(row)
      if (checkIndex > -1) {
        this.tags.push(row)
      } else {
        this.tags.splice(this.tags.indexOf(row), 1)
      }
    },
    toggleSelection(rows, flag = true) {
      if (rows) {
        this.$nextTick(() => {
          rows.forEach((row) => {
            this.$refs.table.toggleRowSelection(row, flag)
          })
        })
      }
    },
    handleCurrentChange() {
      this.toggleSelection(this.tags)
    },
    onClose(tag, index) {
      this.tags.splice(index, 1)
      this.toggleSelection([tag], false)
    },
    onCloseAll() {
      this.toggleSelection(this.tags, false)
      this.tags = []
    },
    onClickCancel() {
      this.$emit('update:visible', false)
    },
    onClickSave() {
      this.$emit('onClickSave')
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

<template>
  <el-aside class="aside-wrap">
    <div class="role-aside_wrap">
      <div class="tree-wrap">
        <div>
          角色分类
        </div>
        <el-divider />
        <asideTree
          :props="props"
          :current-id="currentId"
          :tree-list="treeList"
          @del="handleDel"
          @edit="handleEdit"
          @reload="reload"
        />
      </div>
      <div class="bottom-wrap">
        <div
          class="bottom-item"
          @click="onClickVisible(type.group, true)"
        >
          <i class="el-icon-circle-plus" />
          新建分组
        </div>
        <div
          class="bottom-item"
          @click="onClickVisible(type.cate, true)"
        >
          <i class="el-icon-circle-plus" />
          新建分类
        </div>
      </div>
    </div>
    <el-dialog
      :title="groupForm.groupId ? '编辑分组' : '新建分组'"
      :visible.sync="groupVisible"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <div style="padding: 0 40px">
        <avue-form
          ref="groupForm"
          v-model="groupForm"
          :option="groupOption"
        />
        <el-scrollbar
          v-if="groupForm.groupData !== 0"
          class="tree-container"
        >
          <asideTree
            :props="groupForm.groupData === 1 ? props : positionProps"
            :tree-list="groupForm.groupData === 1 ? treeList : positions"
            :show-more="false"
            :show-search="false"
          />
        </el-scrollbar>
        <div />
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          style="margin-right: 15px;"
          size="medium"
          @click="onClickVisible(type.group)"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          size="medium"
          @click="onClickSave(type.group)"
        >
          保存
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="cateForm.categoryId ? '编辑分类' : '新建分类'"
      :visible.sync="cateVisible"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <div style="padding: 0 40px">
        <avue-form
          ref="cateForm"
          v-model="cateForm"
          :option="cateOption"
        />
        <div />
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          style="margin-right: 15px;"
          size="medium"
          @click="onClickVisible(type.cate)"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          size="medium"
          @click="onClickSave(type.cate)"
        >
          保存
        </el-button>
      </div>
    </el-dialog>
  </el-aside>
</template>

<script>
import asideTree from './roleAsideTree'
import { createGroup, updateGroup, createCate, updateCate } from '../../../api/system/role'

const type = {
  group: 'group',
  cate: 'cate'
}
export default {
  name: 'RoleAside',
  components: {
    asideTree
  },
  props: {
    treeList: {
      type: Array,
      default: () => []
    },
    currentId: {
      type: [String, Number],
      default: ''
    },
    props: {
      type: Object,
      default: () => {
        return {}
      }
    },
    positionProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    positions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      type,
      groupVisible: false,
      cateVisible: false,
      searchInput: '',
      groupForm: {
        groupId: '',
        groupName: '',
        groupData: 0
      },
      groupOption: {
        menuBtn: false,
        labelPosition: 'top',
        size: 'medium',
        column: [
          {
            label: '分组名称',
            prop: 'groupName',
            row: true,
            span: 24,
            placeholder: '请输入分组名称',
            rules: [
              {
                required: true,
                message: '请输入分组名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '同步分类数据',
            display: true,
            prop: 'groupData',
            type: 'radio',
            row: true,
            span: 24,
            rules: [
              {
                required: true,
                message: '请选择同步分类数据',
                trigger: 'change'
              }
            ],
            dicData: [
              {
                label: '无同步',
                value: 0
              },
              {
                label: '同步组织分类',
                value: 1
              },
              {
                label: '同步岗位分类',
                value: 2
              }
            ]
          }
        ]
      },
      cateForm: {
        categoryId: '',
        categoryName: '',
        groupId: 1
      },
      cateOption: {
        menuBtn: false,
        labelPosition: 'top',
        size: 'medium',
        column: [
          {
            label: '分类名称',
            prop: 'categoryName',
            row: true,
            span: 24,
            placeholder: '请输入分类名称',
            rules: [
              {
                required: true,
                message: '请输入分组名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '所属分组',
            prop: 'groupId',
            props: {
              label: this.props.label,
              value: this.props.id
            },
            type: 'select',
            row: true,
            span: 24,
            rules: [
              {
                required: true,
                message: '请选择所属分组',
                trigger: 'change'
              }
            ],
            dicData: [
              // {
              //     label: '默认',
              //     value: 0
              // },
              // {
              //     label: '财务部',
              //     value: 1
              // },
              // {
              //     label: '设计部',
              //     value: 2
              // }
            ]
          }
        ]
      }
    }
  },
  watch: {
    'groupForm.groupId': {
      handler(val) {
        this.groupOption.column.forEach((item) => {
          if (item.prop === 'groupData') {
            item.display = !val
          }
        })
      }
    },
    treeList: {
      handler(val) {
        this.cateOption.column.forEach((item) => {
          if (item.prop === 'groupId') {
            item.dicData = val
          }
        })
      }
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    onClickSearch() {
      this.$refs.tree.filter(this.searchInput)
    },
    onClickVisible(str, node, data) {
      if (str === type.group) {
        // 分组
        this.$nextTick(() => {
          if (!data) {
            // 新增，初始化表单数据
            this.groupForm.groupId = ''
            if (this.$refs.groupForm) {
              this.$refs.groupForm.resetForm()
            }
          } else {
            // 点击的是编辑
            this.groupForm.groupId = data[this.props.id]
            this.groupForm.groupName = data[this.props.label]
          }
        })
        this.groupVisible = !this.groupVisible
      } else {
        //分类
        this.$nextTick(() => {
          if (!data) {
            // 新增，初始化表单数据
            this.cateForm.categoryId = ''
            if (this.$refs.cateForm) {
              this.$refs.cateForm.resetForm()
            }
          } else {
            // 点击的是编辑
            this.cateForm.categoryId = data[this.props.id]
            this.cateForm.categoryName = data[this.props.label]
          }
        })

        this.cateVisible = !this.cateVisible
      }
    },
    /**
     * @description 点击分类树节点
     * @param node 当前节点的 Node 对象
     * @param data 当前节点的数据
     */
    handleEdit(node, data) {
      this.onClickVisible(node.level === 1 ? type.group : type.cate, node, data)
    },
    handleDel(node, data) {
      if (node.level === 1) {
        if (node.childNodes.length > 0) {
          let dataIndex = node.childNodes.findIndex((item) => item.data.roleNum > 0)
          if (dataIndex > -1) {
            this.$alert('很抱歉，您选中的分组下存在员工，请先将员工调整后再删除', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              dangerouslyUseHTMLString: true
            })
            return
          }
        }
        this.delGroup(node, data)
      } else {
        if (data.roleNum > 0) {
          this.$alert('很抱歉，您选中的分类下存在员工，请先将员工调整后再删除', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            dangerouslyUseHTMLString: true
          })
          return
        }
        this.delCate(node, data)
      }
    },

    delGroup(node, data) {
      this.$confirm('您确定要删除该分组吗？<br/> 删除后，该分组下的角色分类和角色也会同步清除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          this.delFunc(node, data)
        })
        .catch(() => {})
    },

    delCate(node, data) {
      this.$confirm('您确定要删除该分类吗？<br/> 删除后，该分类下的角色也会同步清除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          this.delFunc(node, data)
        })
        .catch(() => {})
    },

    delFunc() {},

    onClickSave(str) {
      if (str === type.group) {
        this.groupForm.groupId ? this.updateGroupFunc(str) : this.createGroupFunc(str)
      } else {
        this.cateForm.categoryId ? this.updateCateFunc(str) : this.createCateFunc(str)
      }
    },

    createGroupFunc(str) {
      const params = {
        groupName: this.groupForm.groupName,
        categories: this.getCategories
      }
      createGroup(params).then(() => {
        this.$message.success('新建分类成功')
        this.onClickVisible(str)
        this.$emit('reload')
      })
    },

    getCategories() {
      return []
    },

    createCateFunc(str) {
      const params = {
        categoryName: this.cateForm.categoryName,
        groupId: this.cateForm.groupId
      }
      createCate(params).then(() => {
        this.$message.success('新建分组成功')
        this.onClickVisible(str)
        this.$emit('reload')
      })
    },

    updateGroupFunc(str) {
      const params = {
        categoryId: this.cateForm.categoryId,
        categoryName: this.cateForm.categoryName,
        groupId: this.cateForm.groupId
      }
      updateCate(params).then(() => {
        this.$message.success('修改分组成功')
        this.onClickVisible(str)
        this.$emit('reload')
      })
    },

    updateCateFunc(str) {
      const params = {
        groupId: this.groupForm.groupId,
        groupName: this.groupForm.groupName
      }
      updateGroup(params).then(() => {
        this.$message.success('新建分类成功')
        this.onClickVisible(str)
        this.$emit('reload')
      })
    },

    reload(data) {
      this.$emit('reload', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.aside-wrap {
  margin-left: -16px;
}

.role-aside_wrap {
  display: flex;
  flex-direction: column;
  height: 100%;

  .tree-wrap {
    padding: 0 16px;
    flex: 1;
  }
}

.tree-container {
  border: 1px solid #f2f2f2;
  height: 150px;
}

.bottom-wrap {
  margin-top: 10px;
  /*border-top: 1px solid rgba(215, 215, 215, 1) ;*/
  display: flex;
  height: 64px;
  line-height: 64px;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.0980392156862745);

  .bottom-item {
    flex: 1;
    text-align: center;
    color: #409eff;
    cursor: pointer;
  }
}
</style>
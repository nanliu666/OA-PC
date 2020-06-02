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
      v-if="groupVisible"
      :title="groupForm.groupId ? '编辑分组' : '新建分组'"
      :visible.sync="groupVisible"
      width="550px"
      append-to-body
    >
      <div style="padding: 0 40px">
        <avue-form
          ref="groupForm"
          v-model="groupForm"
          :option="groupOption"
          @submit="handleSubmit"
        />
        <el-scrollbar
          v-if="groupForm.groupData !== 0"
          class="tree-container"
        >
          <asideTree
            :props="groupForm.groupData === 1 ? jobProps : positionProps"
            :tree-list="groupForm.groupData === 1 ? preTreeList : positions"
            :show-more="false"
            :show-search="false"
            :show-folder="false"
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
          v-loading="loading"
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
      width="550px"
      append-to-body
    >
      <div style="padding: 0 40px">
        <avue-form
          ref="cateForm"
          v-model="cateForm"
          :option="cateOption"
          @submit="handleSubmit"
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
          v-loading="loading"
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
import {
  createGroup,
  updateGroup,
  createCate,
  updateCate,
  delCate,
  delGroup,
  getOrgList,
  getPosition
} from '../../../api/system/role'

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
    }
  },
  data() {
    return {
      loading: false,
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
            change: (val) => {
              if (val.value == 1 && !this.groupForm.groupName) {
                this.groupForm.groupName = this.preTreeList[0].orgName
              }
            },
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
        groupId: ''
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
                message: '请输入分类名称',
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
            dicData: []
          }
        ]
      },
      preTreeList: [],
      positions: [],
      positionProps: {
        label: 'name'
      },
      jobProps: {
        label: 'orgName'
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
    groupVisible: {
      handler: function(val) {
        if (!val) {
          this.$refs.groupForm.resetForm()
        }
      }
    },
    cateVisible: {
      handler: function(val) {
        if (!val) {
          this.$refs.cateForm.resetForm()
        }
      }
    },
    treeList: {
      handler(val) {
        let data = this.cateOption.column.find((item) => item.prop === 'groupId')
        this.cateForm.groupId = val[0] ? val[0][this.props.id] : ''
        data.dicData = val
      },
      deep: true
    }
  },
  created() {
    this.getPreTree()
    this.getPositionList()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    onClickSearch() {
      this.$refs.tree.filter(this.searchInput)
    },

    // 查询组织机构列表
    getPreTree() {
      const params = {
        parentOrgId: 0
      }
      getOrgList(params).then((res) => {
        this.preTreeList = res
      })
    },

    getPositionList() {
      getPosition().then((res) => {
        this.positions = res
      })
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
            // console.log('handleCommand____',node,data)
            // 点击的是编辑
            this.groupForm.groupId = data[this.props.id]
            this.groupForm.groupName = data[this.props.label]
          }
        })
        this.groupVisible = !this.groupVisible
      } else {
        // 分类
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
            this.cateForm.groupId = data.groupId
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
        this.delGroup(node, data)
      } else {
        this.delCate(node, data)
      }
    },

    // 删除分组提示
    delGroup(node, data) {
      this.$confirm(
        '您确定要删除该分组吗？<br/> 删除后，该分组下的角色分类和角色也会同步清除',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          this.delGroupFunc(node, data)
        })
        .catch(() => {})
    },

    // 删除分类提示
    delCate(node, data) {
      this.$confirm('您确定要删除该分类吗？<br/> 删除后，该分类下的角色也会同步清除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          this.delCateFunc(node, data)
        })
        .catch(() => {})
    },

    // 删除分组
    delGroupFunc(node, data) {
      const params = {
        groupId: data[this.props.id]
      }
      delGroup(params).then(() => {
        this.$message.success('删除分组成功')
        this.$emit('update:currentId', '')
        this.reload()
      })
    },

    // 删除分类
    delCateFunc(node, data) {
      const params = {
        categoryId: data[this.props.id]
      }
      delCate(params).then(() => {
        this.$message.success('删除分类成功')
        if (data[this.props.id] === this.currentId) {
          // 如果删除的分类是当前激活的分类，清空激活分类，重新获取
          this.$emit('update:currentId', '')
        }
        this.reload()
      })
    },

    // 点击保存
    onClickSave(str) {
      if (str === type.group) {
        this.groupForm.groupId ? this.updateGroupFunc(str) : this.createGroupFunc(str)
      } else {
        this.cateForm.categoryId ? this.updateCateFunc(str) : this.createCateFunc(str)
      }
    },

    // 新增分组
    createGroupFunc(str) {
      this.$refs.groupForm.validate((valid) => {
        if (!valid) return
        const params = {
          groupName: this.groupForm.groupName,
          categories: this.getCategories(this.groupForm.groupData)
        }
        this.loading = true
        createGroup(params)
          .then(() => {
            this.loading = false
            this.$message.success('新建分类成功')
            this.onClickVisible(str)
            this.$emit('reload')
          })
          .catch(() => {
            this.loading = false
          })
      })
    },

    getCategories(type) {
      if (type === 0) {
        return []
      } else if (type === 1) {
        let categoryList = []
        this.preTreeList.map((item) => {
          categoryList.push({ categoryName: item.orgName })
        })
        return categoryList
      } else {
        let categoryList = []
        this.positions.map((item) => {
          categoryList.push({ categoryName: item.name })
        })
        return categoryList
      }
    },

    // 新增分类
    createCateFunc(str) {
      const params = {
        categoryName: this.cateForm.categoryName,
        groupId: this.cateForm.groupId
      }
      this.loading = true
      createCate(params)
        .then(() => {
          this.loading = false
          this.$message.success('新建分组成功')
          this.onClickVisible(str)
          this.$emit('reload')
        })
        .catch(() => {
          this.loading = false
        })
    },

    // 更新分组
    updateGroupFunc(str) {
      const params = {
        groupName: this.groupForm.groupName,
        groupId: this.groupForm.groupId
      }
      this.loading = true
      updateGroup(params)
        .then(() => {
          this.$message.success('修改分组成功')
          this.onClickVisible(str)
          this.$emit('reload')
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    // 更新分类
    updateCateFunc(str) {
      const params = {
        categoryId: this.cateForm.categoryId,
        categoryName: this.cateForm.categoryName,
        groupId: this.cateForm.groupId
      }
      this.loading = true
      updateCate(params)
        .then(() => {
          this.loading = false
          this.$message.success('修改分类成功')
          this.onClickVisible(str)
          this.$emit('reload')
        })
        .catch(() => {
          this.loading = false
        })
    },

    // 父组件role重新加载数据
    reload(data) {
      this.$emit('reload', data)
    },
    // 清除avue表单组件防重提交
    handleSubmit(form, done) {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__header {
  padding: 16px 0;
  margin: 0 24px;
  border-bottom: 1px solid rgba(208, 211, 214, 0.44);
  font-size: 18px;
  color: #202940;
  line-height: 24px;
}

/deep/ .el-dialog__body {
  padding: 24px;
}

/deep/ .el-dialog__footer {
  padding: 0px 24px 24px;
}

/deep/ .el-form-item__label {
  line-height: 20px;
  font-size: 14px;
  color: #0f0000;
}

/deep/ .el-form-item {
  margin-bottom: 24px;
}
.dialog-footer {
  text-align: right;
}
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

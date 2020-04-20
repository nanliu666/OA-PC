<template>
  <el-aside class="aside-wrap">
    <div class="role-aside_wrap">
      <div class="tree-wrap">
        <div>
          角色分类
        </div>
        <el-divider />
        <asideTree
          @del="handleDel"
          @edit="handleEdit"
        />
      </div>
      <div class="bottom-wrap">
        <div
          class="bottom-item"
          @click="onClickVisible(type.group, true)"
        >
          <i class="el-icon-circle-plus" />
          新建分类组
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
      :title="groupId ? '编辑分组' : '新建分组'"
      :visible.sync="groupVisible"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <div style="padding: 0 40px">
        <avue-form
          ref="form"
          v-model="groupForm"
          :option="groupOption"
        />
        <el-scrollbar
          v-if="groupForm.groupData !== 0"
          class="tree-container"
        >
          <asideTree
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
      :title="cateId ? '编辑分类' : '新建分类'"
      :visible.sync="cateVisible"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <div style="padding: 0 40px">
        <avue-form
          ref="form"
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

const type = {
  group: 'group',
  cate: 'cate'
}
export default {
  name: 'RoleAside',
  components: {
    asideTree
  },
  data() {
    return {
      type,
      groupId: '',
      groupVisible: false,
      cateId: '',
      cateVisible: false,
      filterList: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      searchInput: '',
      groupForm: {
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
        cateName: '',
        cateData: 0
      },
      cateOption: {
        menuBtn: false,
        labelPosition: 'top',
        size: 'medium',
        column: [
          {
            label: '分类名称',
            prop: 'cateName',
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
            prop: 'cateData',
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
              {
                label: '默认',
                value: 0
              },
              {
                label: '财务部',
                value: 1
              },
              {
                label: '设计部',
                value: 2
              }
            ]
          }
        ]
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
    onClickVisible(str, isAdd = false) {
      if (str === type.group) {
        if (isAdd) {
          this.groupForm.groupId = ''
        }
        this.groupVisible = !this.groupVisible
      } else {
        if (isAdd) {
          this.cateForm.cateId = ''
        }
        this.cateVisible = !this.cateVisible
      }
    },
    handleEdit(node, data) {
      console.log(node, data)
      this.onClickVisible(node.level === 1 ? type.group : type.cate)
    },
    handleDel(node, data) {
      this.$confirm('您确定要删除该分组吗？<br/> 删除后，该分组下的角色分类和角色也会同步清除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          console.log(node, data)
        })
        .catch(() => {})
    },
    onClickSave() {}
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

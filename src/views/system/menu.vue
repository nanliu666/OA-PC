<template>
  <basic-container>
    <avue-crud
      ref="crud"
      v-model="form"
      :option="option"
      :table-loading="loading"
      :data="data"
      :before-open="beforeOpen"
      :before-close="beforeClose"
      @row-del="rowDel"
      @row-update="rowUpdate"
      @row-save="rowSave"
      @search-change="searchChange"
      @search-reset="searchReset"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @size-change="sizeChange"
      @refresh-change="refreshChange"
      @on-load="onLoad"
      @tree-load="treeLoad"
    >
      <template slot="menuLeft">
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          plain
          @click="handleDelete"
        >
          删 除
        </el-button>
      </template>

      <template
        slot="menu"
        slot-scope="scope"
      >
        <el-button
          type="text"
          icon="el-icon-circle-plus-outline"
          size="small"
          @click.stop="handleAddChild(scope.row, scope.index)"
        >
          新增子项
        </el-button>
      </template>
      <template
        slot="icon"
        slot-scope="{ row }"
      >
        <div style="text-align:center">
          <i :class="row.icon" />
        </div>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  getMenuTree,
  getMenuInfo,
  postMenuInfo,
  putMenuInfo,
  deleteMenuInfo
} from '@/api/system/menu'
import { mapGetters } from 'vuex'
import iconList from '@/config/iconList'
import func from '@/util/func'

export default {
  data() {
    return {
      form: {},
      query: {},
      loading: true,
      selectionList: [],
      parentId: '0',
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      option: {
        lazy: true,
        tip: false,
        simplePage: true,
        searchShow: true,
        searchMenuSpan: 6,
        dialogWidth: '60%',
        tree: true,
        border: true,
        index: true,
        selection: true,
        viewBtn: true,
        menuWidth: 300,
        dialogClickModal: false,
        rowKey: 'menuId',
        column: [
          {
            label: '菜单名称',
            prop: 'name',
            search: true,
            rules: [
              {
                required: true,
                message: '请输入菜单名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '请求地址',
            prop: 'path'
          },
          {
            label: '上级菜单',
            prop: 'parentId',
            type: 'tree',
            dicData: [],
            hide: true,
            props: {
              label: 'name',
              value: 'menuId'
            },
            rules: [
              {
                required: false,
                message: '请选择上级菜单',
                trigger: 'click'
              }
            ]
          },
          {
            label: '菜单图标',
            prop: 'icon',
            type: 'icon-select',
            slot: true,
            iconList: iconList,
            rules: [
              {
                required: true,
                message: '请输入菜单图标',
                trigger: 'click'
              }
            ]
          },
          {
            label: '菜单编号',
            prop: 'code',
            search: true,
            rules: [
              {
                required: true,
                message: '请输入菜单编号',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '菜单类型',
            prop: 'menuType',
            type: 'radio',
            dicData: [
              // Dir：目录，Menu：菜单；Button：按钮
              {
                label: '目录',
                value: 'Dir'
              },
              {
                label: '菜单',
                value: 'Menu'
              },
              {
                label: '按钮',
                value: 'Button'
              }
            ],
            rules: [
              {
                required: true,
                message: '请选择菜单类型',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '隐藏菜单',
            prop: 'isShow',
            type: 'radio',
            dicData: [
              {
                label: '显示',
                value: 1
              },
              {
                label: '隐藏',
                value: 0
              }
            ],
            hide: true
          },
          {
            label: '菜单别名',
            prop: 'alias',
            search: true,
            rules: [
              {
                required: true,
                message: '请输入菜单别名',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '菜单排序',
            prop: 'sort',
            type: 'number',
            rules: [
              {
                required: true,
                message: '请输入菜单排序',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '菜单备注',
            prop: 'remark',
            type: 'textarea',
            span: 24,
            minRows: 2,
            hide: true
          },
          {
            label: '状态',
            prop: 'status',
            type: 'radio',
            dicData: [
              {
                label: '有效',
                value: 'VALID'
              },
              {
                label: '失效',
                value: 'INVALID'
              }
            ]
          }
        ]
      },
      data: []
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    ids() {
      let ids = []
      this.selectionList.forEach((ele) => {
        ids.push(ele.id)
      })
      return ids.join(',')
    }
  },
  watch: {
    'form.category'() {
      const category = func.toInt(this.form.category)
      this.$refs.crud.option.column.filter((item) => {
        if (item.prop === 'path') {
          item.rules[0].required = category === 1
        }
      })
    }
  },
  methods: {
    initData() {
      getMenuTree().then((res) => {
        const column = this.findObject(this.option.column, 'parentId')
        column.dicData = res
      })
    },
    handleAddChild(row) {
      this.$refs.crud.value.parentId = row.menuId
      this.$refs.crud.option.column.filter((item) => {
        if (item.prop === 'parentId') {
          item.value = row.menuId
          item.addDisabled = true
        }
      })
      this.$refs.crud.rowAdd()
    },
    rowSave(row, done, loading) {
      // console.log(row)
      if (!row.parentId) {
        row.parentId = '0'
      }
      postMenuInfo(row).then(
        (res) => {
          // 获取新增数据的相关字段
          row.menuId = res.menuId
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          // 数据回调进行刷新
          // this.refreshChange()
          done(row)
        },
        (error) => {
          window.console.log(error)
          loading()
        }
      )
    },
    rowUpdate(row, index, done, loading) {
      putMenuInfo(row).then(
        () => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          // 数据回调进行刷新
          done(row)
        },
        (error) => {
          window.console.log(error)
          loading()
        }
      )
    },
    rowDel(row, index, done) {
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return deleteMenuInfo(row.menuId)
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          // 数据回调进行刷新
          done(row)
        })
    },
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning('请选择至少一条数据')
        return
      }
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return deleteMenuInfo(this.ids)
        })
        .then(() => {
          // 刷新表格数据并重载
          this.data = []
          this.parentId = '0'
          this.$refs.crud.refreshTable()
          this.$refs.crud.toggleSelection()
          // 表格数据重载
          this.onLoad(this.page)
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        })
    },
    searchReset() {
      this.query = {}
      this.parentId = '0'
      this.onLoad(this.page)
    },
    searchChange(params, done) {
      this.query = params
      this.parentId = '0'
      this.page.currentPage = 1
      this.onLoad(this.page, params)
      done()
    },
    selectionChange(list) {
      this.selectionList = list
    },
    selectionClear() {
      this.selectionList = []
      this.$refs.crud.toggleSelection()
    },
    beforeOpen(done, type) {
      if (['add', 'edit'].includes(type)) {
        this.initData()
      }
      if (type == 'add') {
        this.form = { isShow: 1, status: 'VALID' }
      }
      done()
    },
    beforeClose(done) {
      this.$refs.crud.value.parentId = ''
      this.$refs.crud.value.addDisabled = false
      this.$refs.crud.option.column.forEach((item) => {
        if (item.prop === 'parentId') {
          item.value = ''
          item.addDisabled = false
        }
      })
      done()
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    refreshChange() {
      this.onLoad(this.page, this.query)
    },
    onLoad(page, params = {}) {
      this.loading = true
      getMenuInfo(this.parentId, Object.assign(params, this.query)).then((res) => {
        res.forEach((it) => {
          it.hasChildren = true
        })
        this.data = res
        this.$nextTick(() => {
          this.loading = false
          this.selectionClear()
        })
      })
    },
    treeLoad(tree, treeNode, resolve) {
      const parentId = tree.menuId
      getMenuInfo(parentId)
        .then((res) => {
          resolve(res)
        })
        .catch(() => {
          resolve([])
        })
    }
  }
}
</script>

<style></style>

<template>
  <el-dialog
    :before-close="close"
    :title="_.get(dialog, 'title', '')"
    :visible="visible"
    append-to-body
    class="MenuAdd"
    top="5%"
    width="800px"
  >
    <common-form
      ref="form"
      class="form"
      :model="formData"
      :columns="formData | formColumnsFilter"
    >
      <template #icon="{iconList}">
        <icon-select
          v-model="formData.icon"
          :icon-list="iconList"
        />
      </template>
    </common-form>
    <span slot="footer">
      <el-button
        size="medium"
        @click="close"
      >取 消</el-button>
      <el-button
        :loading="submitting"
        size="medium"
        type="primary"
        @click="handleSubmit"
      >
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getMenuTree } from '@/api/system/menu'
import iconList from '@/config/iconList'

const DIALOG_TYPE = {
  add: {
    eventName: 'submitAdd',
    title: '添加菜单'
  },
  edit: {
    eventName: 'submitEdit',
    title: '编辑菜单'
  },
  addItem: {
    eventName: 'submitAddItem',
    title: '添加子项'
  }
}

// 表单配置
const FORM_COLUMNS = [
  {
    label: '菜单名称',
    itemType: 'input',
    prop: 'name',
    span: 11,
    offset: 0,
    required: true
  },
  {
    label: '请求地址',
    itemType: 'input',
    prop: 'path',
    span: 11,
    offset: 2
  },
  {
    label: '上级菜单',
    itemType: 'treeSelect',
    prop: 'parentId',
    span: 11,
    offset: 0,
    props: {
      selectParams: {
        placeholder: '请选择上级菜单',
        multiple: false
      },
      treeParams: {
        'check-strictly': true,
        'default-expand-all': false,
        'expand-on-click-node': false,
        clickParent: true,
        data: [],
        filterable: false,
        props: {
          children: 'children',
          label: 'name',
          value: 'menuId'
        },
        required: true
      }
    }
  },
  {
    label: '菜单图标',
    itemType: 'slot',
    prop: 'icon',
    span: 11,
    offset: 2,
    type: 'icon-select',
    iconList: iconList
  },
  {
    itemType: 'input',
    label: '菜单编号',
    offset: 0,
    prop: 'code',
    required: true,
    search: true,
    span: 11
  },
  {
    label: '菜单类型',
    itemType: 'radio',
    prop: 'menuType',
    span: 11,
    offset: 2,
    type: 'radio',
    options: [
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
    required: true
  },
  {
    itemType: 'input',
    label: '菜单别名',
    offset: 0,
    prop: 'alias',
    required: true,
    search: true,
    span: 11
  },
  {
    hide: true,
    itemType: 'radio',
    label: '是否展示',
    offset: 2,
    prop: 'isShow',
    required: true,
    span: 11,
    type: 'radio',
    options: [
      {
        label: '展示',
        value: 1
      },
      {
        label: '隐藏',
        value: 0
      }
    ]
  },
  {
    itemType: 'input',
    label: '菜单排序',
    offset: 0,
    prop: 'sort',
    props: {
      onlyNumber: true
    },
    required: true,
    span: 11,
    type: 'number'
  },

  {
    itemType: 'input',
    label: '菜单备注',
    minRows: 2,
    offset: 0,
    prop: 'remark',
    span: 24,
    type: 'textarea'
  }
  // {
  //   label: '状态',
  //   itemType: 'radio',
  //   prop: 'status',
  //   span: 11,
  //   offset: 0,
  //   options: [
  //     {
  //       label: '有效',
  //       value: 'VALID'
  //     },
  //     {
  //       label: '失效',
  //       value: 'INVALID'
  //     }
  //   ]
  // }
]

export default {
  name: 'MenuEdit',
  components: {
    IconSelect: () => import('@/components/icon-select')
  },
  filters: {
    formColumnsFilter: function(formData) {
      let res = _(FORM_COLUMNS)
      if (_.eq(formData.menuType, 'Button') || _.isNil(formData.menuType)) {
        res = res.difference([_.find(FORM_COLUMNS, { prop: 'sort' })])
      }
      return res.value()
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: null,
      formColumns: FORM_COLUMNS,
      formData: {},
      loading: false,
      submitting: false
    }
  },
  created() {
    this.loadParentIdData()
  },
  methods: {
    close() {
      this.submitting = false
      this.$emit('update:visible', false)
    },
    clearValidate() {
      this.$nextTick(() => this.$refs.form.clearValidate())
    },

    // 提交
    handleSubmit() {
      this.$refs.form.validate().then(() => {
        this.submitting = true
        this.$emit(this.dialog.eventName, this.formData)
      })
      // .catch((rules) => {
      // })
    },
    init(row = {}) {
      // 设置title
      this.formData = _.cloneDeep(row)
      this.dialog = _.isEmpty(row.menuId)
        ? _.isEmpty(row.parentId)
          ? DIALOG_TYPE.add
          : DIALOG_TYPE.addItem
        : DIALOG_TYPE.edit
      this.$emit('update:visible', true)
      this.clearValidate()
    },

    // 加载树形组件的上级菜单列表
    async loadParentIdData() {
      const children = await getMenuTree()
      _.find(this.formColumns, { prop: 'parentId' }).props.treeParams.data = [
        {
          children,
          menuId: '0',
          name: '顶级菜单'
        }
      ]
    }
  }
}
</script>

<style lang="sass">
$padding: 2rem

.MenuAdd
  .form
    padding:
      left: $padding
      right: $padding
</style>

<template>
  <el-dialog
    title="权限配置"
    :visible.sync="dialogVisible"
    width="800px"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
  >
    <div class="limit-wrap">
      <el-scrollbar class="scroll-item">
        <div class="limit-item">
          <checkLimits
            v-model="org"
            title="组织"
            :check-list="orgs"
            :default-props="{
              value: 'orgId',
              label: 'orgName'
            }"
          />
        </div>
      </el-scrollbar>
      <el-scrollbar class="scroll-item scroll-tree">
        <div class="limit-item">
          <treeLimits
            v-model="tree"
            title="菜单权限"
            :data="trees"
          />
        </div>
      </el-scrollbar>
      <el-scrollbar class="scroll-item">
        <div class="limit-item">
          <checkLimits
            v-model="page"
            title="页面控制权限"
            :check-list="pages"
            :default-props="{
              value: 'orgId',
              label: 'orgName'
            }"
          />
        </div>
      </el-scrollbar>
      <el-scrollbar class="scroll-item">
        <div class="limit-item">
          <checkLimits
            v-model="rule"
            title="数据规则权限"
            :check-list="ruleList"
            :default-props="{
              value: 'orgId',
              label: 'orgName'
            }"
          />
        </div>
      </el-scrollbar>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        @click="onClose"
      >
        取消
      </el-button>
      <el-button
        type="primary"
        size="medium"
        @click="onClickSave"
      >
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import checkLimits from './roleCheckPermission'
import treeLimits from './roleTreePermission'
const orgs = [
  {
    orgName: '百利宏集团',
    orgId: 0
  },
  {
    orgName: '石化公司',
    orgId: 1
  },
  {
    orgName: '油气公司',
    orgId: 2
  },
  {
    orgName: '金融公司',
    orgId: 3
  }
]
const pages = [
  {
    orgName: '新建',
    orgId: 'create'
  },
  {
    orgName: '修改',
    orgId: 'update'
  },
  {
    orgName: '查看',
    orgId: 'watch'
  },
  {
    orgName: '删除',
    orgId: 'del'
  }
]
const ruleList = [
  {
    orgName: '自定义',
    orgId: 'customize'
  },
  {
    orgName: '部门可见',
    orgId: 'org'
  },
  {
    orgName: '全部可见',
    orgId: 'all'
  },
  {
    orgName: '个人可见',
    orgId: 'personal'
  }
]
const trees = [
  {
    label: '工作台',
    value: 0,
    children: [
      {
        label: '通知公告',
        value: 1
      },
      {
        label: '快捷操作',
        value: 2
      },
      {
        label: '我的待办',
        value: 3
      }
    ]
  },
  {
    label: '人事管理',
    value: 4,
    children: [
      {
        label: '招聘需求管理',
        value: 5
      },
      {
        label: '我的招聘需求',
        value: 6
      },
      {
        label: '候选人管理',
        value: 7
      },
      {
        label: '人才库管理',
        value: 8
      }
    ]
  }
]
export default {
  name: 'RolePermission',
  components: {
    checkLimits,
    treeLimits
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      orgs,
      trees,
      pages,
      ruleList,
      page: [],
      rule: [],
      org: [0, 1, 2],
      tree: []
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
    onClickSave() {},
    onClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
.limit-wrap {
  display: flex;
  height: 400px;
  .scroll-item {
    border-right: 1px solid #f2f2f2;
    min-width: 150px;
    &.scroll-tree {
      min-width: 200px;
    }
    .limit-item {
      padding: 0 15px;
      /*flex: 1;*/
    }
  }
}
</style>

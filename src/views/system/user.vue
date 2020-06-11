<template>
  <div style="height:100%">
    <page-header title="用户管理" />
    <el-row
      style="height: calc(100% - 80px);"
      :gutter="8"
    >
      <el-col
        style="height:100%"
        :xs="9"
        :sm="7"
        :md="6"
      >
        <basic-container
          block
          style="padding-left:0;"
        >
          <el-tabs
            v-model="activeTabName"
            style="height:100%;"
          >
            <el-tab-pane
              v-loading="treeLoading"
              label="组织架构"
              name="orgTree"
            >
              <el-input
                v-model="treeSearch"
                suffix-icon="el-icon-search"
                placeholder="组织名称"
                style="margin-bottom:10px;"
              />
              <el-tree
                ref="orgTree"
                :filter-node-method="filterNode"
                :data="treeData"
                node-key="orgId"
                :props="treeProps"
                :expand-on-click-node="false"
                default-expand-all
                @node-click="nodeClick"
              >
                <span
                  slot-scope="{ node, data }"
                  class="custom-tree-node"
                >
                  <span>{{ data.orgName }}{{ '  ' }} ({{ data.workNum }})</span>
                </span>
              </el-tree>
            </el-tab-pane>
            <el-tab-pane
              name="tags"
              style="height:100%"
            >
              <span slot="label">
                标签
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="对用户进行的自定义分组，不包含业务属性"
                  placement="top-start"
                >
                  <i class="el-icon-warning" />
                </el-tooltip>
              </span>
              <user-tag
                ref="tags"
                :active-tag.sync="activeTag"
              />
            </el-tab-pane>
          </el-tabs>
        </basic-container>
      </el-col>
      <el-col
        :xs="15"
        :sm="17"
        :md="18"
        style="height:100%"
      >
        <user-list
          v-show="activeTabName === 'orgTree'"
          ref="userList"
          :active-org="activeOrg"
          style="padding-right:0;"
        />
        <user-taged-list
          v-show="activeTabName === 'tags'"
          ref="userTagedList"
          style="padding-right:0;"
          :active-tag="activeTag"
          @refresh-tag="handleRefreshTag"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getOrganization } from '@/api/system/user'
import { mapGetters } from 'vuex'

export default {
  name: 'User',
  components: {
    // 用户标签
    userTag: () => import('./components/userTag'),
    // 用户列表组件
    userList: () => import('./components/userList'),
    // 用户列表组件
    userTagedList: () => import('./components/userTagedList')
  },
  data() {
    return {
      activeTabName: 'orgTree',
      loading: true,
      treeData: [],
      treeProps: {
        labelText: '标题',
        label: 'orgName',
        value: 'orgId',
        children: 'children'
      },
      activeTag: null,
      activeOrg: null,
      treeSearch: '',
      treeLoading: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    treeSearch(val) {
      this.$refs.orgTree.filter(val)
    }
  },
  mounted() {
    this.loadTree()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.orgName.indexOf(value) !== -1
    },
    nodeClick(data) {
      this.activeOrg = data
    },
    handleAddTagMember() {
      this.tagMemberVisible = true
    },
    loadTree(parentOrgId = '0') {
      this.treeLoading = true
      getOrganization({ parentOrgId })
        .then((data) => {
          this.treeData = data
          this.treeLoading = false
        })
        .catch(() => {
          this.treeLoading = false
        })
    },
    handleRefreshTag() {
      this.$refs['tags'].loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-tabs__content {
  height: calc(100% - 55px);
  overflow: auto;
}
</style>

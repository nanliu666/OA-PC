<template>
  <div class="fill">
    <page-header title="用户管理" />
    <el-row
      style="height: calc(100% - 92px);"
      :gutter="8"
    >
      <el-col class="fill sidebar">
        <basic-container block>
          <el-tabs
            v-model="activeTabName"
            class="fill"
          >
            <el-tab-pane
              v-loading="treeLoading"
              element-loading-text="正在加载中"
              label="组织架构"
              name="orgTree"
              class="fill"
            >
              <el-input
                v-model="treeSearch"
                clearable
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
              class="fill"
            >
              <span slot="label">
                标签
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="对用户进行的自定义分组，不包含业务属性"
                  placement="top-start"
                >
                  <i
                    style="color:#A0A8AE;position:relative;top:1px;"
                    class="iconfont icon-tips-question-outlined"
                  />
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
        class="content"
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
/deep/ .basic-container--block {
  height: 100%;
  min-height: 100%;
  > .el-card {
    height: 100%;
    > .el-card__body {
      height: 100%;
      overflow: auto;
    }
  }
}
.sidebar {
  width: 250px;
}
.content {
  width: calc(100% - 250px);
}
.fill /deep/.el-tree-node__content {
  line-height: 36px;
}
</style>

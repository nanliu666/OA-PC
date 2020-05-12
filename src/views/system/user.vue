<template>
  <el-row style="height: calc(100% - 32px);">
    <el-col
      style="height:100%"
      :xs="9"
      :sm="7"
      :md="6"
    >
      <basic-container block>
        <el-tabs v-model="activeTabName">
          <el-tab-pane
            label="组织架构"
            name="orgTree"
          >
            <el-tree
              :data="treeData"
              node-key="orgId"
              :props="treeProps"
              :expand-on-click-node="false"
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
          <el-tab-pane name="tags">
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
      />
      <user-taged-list
        v-show="activeTabName === 'tags'"
        ref="userTagedList"
        :active-tag="activeTag"
        @refresh-tag="handleRefreshTag"
      />
    </el-col>
  </el-row>
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
      activeOrg: null
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.loadTree()
  },
  methods: {
    nodeClick(data) {
      this.activeOrg = data
    },
    handleAddTagMember() {
      this.tagMemberVisible = true
    },
    loadTree(parentOrgId = '0') {
      getOrganization({ parentOrgId }).then((data) => {
        this.treeData = data
      })
    },
    handleRefreshTag() {
      this.$refs['tags'].loadData()
    }
  }
}
</script>

<style></style>

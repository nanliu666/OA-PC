<template>
  <el-row>
    <el-col :span="5">
      <basic-container>
        <el-tabs v-model="activeTabName">
          <el-tab-pane
            label="组织架构"
            name="tree"
          >
            <avue-tree
              :option="treeOption"
              :data="treeData"
              @node-click="nodeClick"
            />
          </el-tab-pane>
          <el-tab-pane
            label="标签"
            name="tags"
          >
            <user-tag :active-tag.sync="activeTag" />
          </el-tab-pane>
        </el-tabs>
      </basic-container>
    </el-col>
    <el-col :span="19">
      <user-list
        v-if="activeTabName === 'tree'"
        ref="userList"
        :active-dep="activeDep"
      />
      <user-taged-list
        v-else
        ref="userTagedList"
        :active-tag="activeTag"
      />
    </el-col>
  </el-row>
</template>

<script>
import { getDeptLazyTree } from '@/api/system/dept'
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
      activeTabName: 'tree',
      loading: true,
      treeDeptId: '',
      treeData: [],
      treeOption: {
        nodeKey: 'id',
        lazy: true,
        treeLoad: function(node, resolve) {
          const parentId = node.level === 0 ? 0 : node.data.id
          getDeptLazyTree(parentId).then((data) => {
            resolve(
              data.map((item) => {
                return {
                  ...item,
                  leaf: !item.hasChildren
                }
              })
            )
          })
        },
        addBtn: false,
        menu: false,
        size: 'small',
        props: {
          labelText: '标题',
          label: 'title',
          value: 'value',
          children: 'children'
        }
      },
      activeTag: {},
      activeDep: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'permission']),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.user_add, false),
        viewBtn: this.vaildData(this.permission.user_view, false),
        delBtn: this.vaildData(this.permission.user_delete, false),
        editBtn: this.vaildData(this.permission.user_edit, false)
      }
    },
    ids() {
      let ids = []
      this.selectionList.forEach((ele) => {
        ids.push(ele.id)
      })
      return ids.join(',')
    }
  },
  mounted() {
    // this.initData(website.tenantId)
  },
  methods: {
    nodeClick(data) {
      this.activeDep = data
      // this.page.currentPage = 1
      // this.onLoad(this.page)
    },
    handleAddTagMember() {
      this.tagMemberVisible = true
    }
  }
}
</script>

<style></style>

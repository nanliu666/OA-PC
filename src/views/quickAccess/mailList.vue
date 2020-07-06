<template>
  <div class="fill">
    <page-header
      title="通讯录"
      show-back
    />
    <basic-container block>
      <div class="mailList-wrap">
        <!-- 左侧通讯录 -->
        <div
          v-loading="mailLoading"
          class="left-aside"
        >
          <el-input
            v-model="filterText"
            placeholder="组织/员工"
            class="input-with-select"
          >
            <i
              slot="append"
              class="el-icon-search"
            />
          </el-input>
          <!--  -->

          <el-tree
            v-show="(!orgList.length && !userList.length) || !filterText"
            ref="tree"
            :data="treeData"
            :expand-on-click-node="false"
            :check-on-click-node="true"
            :filter-node-method="filterNode"
            node-key="id"
            :default-expanded-keys="defaultExpandedArr"
          >
            <div
              slot-scope="{ node, data }"
              class="custom-tree-node"
            >
              <div
                class="content"
                @click="handelClickNode({ node, data })"
              >
                <i
                  v-if="data.orgName"
                  class="el-icon-folder-opened"
                />
                <el-avatar
                  v-else
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                />
                <span
                  class="item"
                >{{ data.label }} {{ data.orgName ? `(${data.users.length})` : '' }}</span>
              </div>
            </div>
          </el-tree>
          <!-- 搜索部门列表 -->

          <el-tree
            v-show="orgList.length && filterText"
            :data="orgList"
            :expand-on-click-node="false"
            :check-on-click-node="true"
          >
            <div
              slot-scope="{ node, data }"
              class="custom-tree-node"
            >
              <div
                class="content"
                @click="handelClickNode({ node, data })"
              >
                <i
                  v-if="data.orgName"
                  class="el-icon-folder-opened"
                />
                <el-avatar
                  v-else
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                />
                <!-- <i :class="data.orgName ? 'el-icon-folder-opened' : 'el-icon-user-solid'"></i> -->
                <span
                  class="item"
                >{{ data.label }} {{ data.orgName ? `(${data.users.length})` : '' }}</span>
              </div>
            </div>
          </el-tree>
          <!-- 搜索员工列表 -->
          <el-tree
            v-show="userList.length && filterText"
            :data="userList"
            :expand-on-click-node="false"
            :check-on-click-node="true"
          >
            <div
              slot-scope="{ node, data }"
              class="custom-tree-node"
            >
              <div
                class="content"
                @click="handelClickNode({ node, data })"
              >
                <el-avatar
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                />
                <span class="item">{{ data.label }}</span>
              </div>
            </div>
          </el-tree>
        </div>
        <!-- 信息 -->
        <div
          v-loading="mailLoading"
          class="main-connent"
        >
          <div class="root-node">
            {{ rootNode }}
          </div>
          <div
            v-if="showUserOrOrg === 'user' ? true : false"
            v-loading="userInfoLoading"
            class="userInfo-wrap"
          >
            <div class="header-wrap">
              <el-avatar
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
              <div class="name">
                {{ userInfo.name }}
              </div>
              <div class="workNo">
                {{ userInfo.workNo }}
              </div>
            </div>

            <div class="detail-content">
              <div class="item">
                <div class="title">
                  手机号码 :
                </div>

                <div class="detail">
                  {{ userInfo.phonenum }}
                </div>
              </div>
              <div class="item">
                <div class="title">
                  公司邮箱 :
                </div>

                <div class="detail">
                  {{ userInfo.email }}
                </div>
              </div>
              <div class="item">
                <div class="title">
                  部门 :
                </div>

                <div class="detail">
                  {{ userInfo.orgName }}
                </div>
              </div>
              <div class="item">
                <div class="title">
                  职位 :
                </div>

                <div class="detail">
                  {{ userInfo.jobName }}
                </div>
              </div>
              <div class="item">
                <div class="title">
                  上级领导 :
                </div>

                <div class="detail">
                  {{ userInfo.leaderName }}
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="showUserOrOrg === 'org' ? true : false"
            class="orgName-wrap"
          >
            <div class="orgName-row">
              {{ orgInfo.orgName }} {{ `${orgInfo.staffNum}(人)` }}
            </div>
          </div>
        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { getOrgUserTree } from '@/api/system/user'
import { getStaffBasicInfo } from '@/api/personalInfo'
import { filterTree, deepClone } from '@/util/util'
export default {
  name: 'MailList',
  data() {
    return {
      // 树状数据
      treeData: [],
      userList: [],
      orgList: [],
      cloneList: [],
      // loading
      mailLoading: false,
      userInfoLoading: false,
      // 员工信息
      userInfo: {},
      // 部门信息
      orgInfo: {},
      // 搜索条件
      filterText: '',
      // 默认展开第一列
      defaultExpandedArr: [],
      //
      rootNode: '',
      // 显示部门或者人员信息
      showUserOrOrg: 'org'
    }
  },

  watch: {
    // 监听输入的关键字刷选员工和组织
    filterText(val) {
      this.handelSearch(val)
      // this.$refs.tree.filter(val)
    }
  },
  created() {
    this.loadingData()
  },
  methods: {
    // load数据
    async loadingData() {
      this.mailLoading = true
      this.treeData = await getOrgUserTree().finally(() => {
        this.mailLoading = false
      })
      this.rootNode = this.treeData[0].orgName
      this.orgInfo.orgName = this.treeData[0].orgName
      this.orgInfo.staffNum = this.treeData[0].users.length
      this.handelData(this.treeData)
      // 默认展开第一列
      this.defaultExpandedArr = [this.treeData[0].id]
    },
    // 处理数据
    handelData(arr) {
      arr.forEach((item) => {
        if (!item.children) {
          item.children = []
        }
        item.id = item.orgId || item.workNo
        item.label = item.orgName || item.name
        item.children.push(...(item.users || []))
        // item.children = [...item.children,...(item.users||[])]
        // item.children.push.apply(item.children, item.users)
        this.handelData(item.children)
      })
    },
    // 点击节点
    async handelClickNode({ data }) {
      if (data.userId) {
        this.userInfoLoading = true
        this.userInfo = await getStaffBasicInfo({ userId: data.userId }).finally(() => {
          this.userInfoLoading = false
        })
        this.showUserOrOrg = 'user'
        return
      } else {
        this.orgInfo = {
          staffNum: data.users.length,
          orgName: data.orgName
        }
        this.showUserOrOrg = 'org'
      }
    },
    // 帅选数据
    filterNode(value, data) {
      if (!value) return true
      this.userList = filterTree(
        this.cloneList,
        (data) => !data.orgId && data.label.indexOf(value) !== -1,
        true
      )
      this.orgList = filterTree(
        this.cloneList,
        (data) => data.orgId && data.label.indexOf(value) !== -1,
        true
      )
      return data.label.indexOf(value) !== -1
    },
    // 搜索
    handelSearch(val) {
      this.cloneList = deepClone(this.treeData)
      this.$refs.tree.filter(val)
      // 右侧内容默认展示第一个信息
      if (this.orgList.length) {
        this.orgInfo.orgName = this.orgList[0].orgName
        this.orgInfo.staffNum = this.orgList[0].users.length
        this.showUserOrOrg = 'org'
      }
      if (!this.orgList.length && this.userList.length) {
        let { userId } = this.userList[0]
        this.showUserOrOrg = 'user'
        this.userInfoLoading = true
        getStaffBasicInfo({ userId })
          .then((res) => {
            this.userInfo = res
          })
          .finally(() => {
            this.userInfoLoading = false
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-container--block {
  height: calc(100% - 92px);
  min-height: calc(100% - 92px);
}
/dee/.el-tree-node__content:hover {
  background-color: #f2faff;
}
/deep/.el-tree-node__content {
  height: 36px;
  line-height: 36px;
}
.el-input {
  margin-bottom: 20px;
}

// .custom-tree-node {
// 	height: 36px;
// 	.el-icon-folder-opened {
// 		color: #207efa;
// 		font-size: 14px;
// 	}
// 	.item {
// 		font-size: 14px;
// 		color: #202940;
// 		line-height: 20px;
// 	}
// }

.mailList-wrap {
  display: flex;
  justify-content: space-between;
  // 树状图
  .left-aside {
    flex: 1;
    .custom-tree-node {
      font-size: 14px;
      color: #202940;
      .content {
        display: flex;
        align-items: center;
        // i {
        // 	padding: 0 9px;
        // }
        .el-avatar {
          width: 24px;
          height: 24px;
          line-height: 36px;
          margin-right: 8px;
        }
        .el-icon-folder-opened {
          margin-right: 8px;
          color: #207efa;
          font-size: 24px;
        }
      }
    }
  }
  // 信息
  .main-connent {
    flex: 4;
    margin-left: 24px;
    .root-node {
      font-size: 14px;
      color: #a0a8ae;
      line-height: 20px;
      padding: 16px 0;
      border-bottom: 1px solid #e3e7e9;
    }
    .userInfo-wrap {
      //员工信息
      .header-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 56px;
        line-height: 56px;
        .name {
          font-size: 16px;
          color: #202940;
          font-weight: bolder;
          margin: 0 16px 0 8px;
        }
        .workNo {
          font-size: 16px;
          color: #718199;
        }
      }
      .detail-content {
        padding: 16px;
        background: #f7f8fa;
        display: flex;
        flex-wrap: wrap;
        .item {
          display: flex;
          height: 34px;
          line-height: 34px;
          width: 50%;
          margin: 8px 0;
          .title {
            font-size: 14px;
            color: #718199;
            text-align: right;
            flex: 1;
            margin-right: 8px;
          }
          .detail {
            padding-left: 12px;
            font-size: 14px;
            color: #202940;
            background: #ffffff;
            border-radius: 4px;
            flex: 5;
          }
        }
      }
    }
    .orgName-wrap {
      display: flex;
      margin-top: 16px;
      .orgName-row {
        font-weight: bolder;
        font-size: 16px;
        color: #202940;
        line-height: 20px;
      }
    }
  }
}
</style>

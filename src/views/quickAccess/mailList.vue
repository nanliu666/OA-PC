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
            v-model.lazy="filterText"
            placeholder="组织/员工"
            class="input-with-select"
            @keyup.enter.native="handelSearch(filterText)"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handelSearch(filterText)"
            />
          </el-input>
          <!-- 一开始显示的树 -->
          <div v-show="isSearch">
            <el-tree
              :props="props"
              :expand-on-click-node="false"
              :check-on-click-node="true"
              :load="loadNode"
              lazy
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
                    v-if="data.type"
                    class="el-icon-folder-opened"
                  />
                  <el-avatar
                    v-else
                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                  />
                  <span
                    class="item"
                  >{{ data.lable }}{{ data.workNum ? `(${data.workNum})` : `` }}</span>
                </div>
              </div>
            </el-tree>
          </div>
          <!-- 搜素时显示的树 -->
          <div v-show="!isSearch">
            <el-tree
              :data="treeData"
              :props="props"
              :expand-on-click-node="false"
              :check-on-click-node="true"
              :load="loadSeach"
              lazy
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
                    v-if="data.type"
                    class="el-icon-folder-opened"
                  />
                  <el-avatar
                    v-else
                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                  />
                  <span
                    class="item"
                  >{{ data.lable }}{{ data.workNum ? `(${data.workNum})` : `` }}</span>
                </div>
              </div>
            </el-tree>
          </div>
        </div>
        <!-- 信息 -->
        <div class="main-connent">
          <div class="root-node">
            {{ rootNode }}
          </div>
          <div
            v-if="showUserOrOrg === 'user' ? true : false"
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
              {{ orgInfo.orgName }}
              {{ orgInfo.workNum === undefined ? '' : `${orgInfo.workNum}(人)` }}
            </div>
          </div>
        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>
// import { getOrgUserTree } from '@/api/system/user'
// import { getStaffBasicInfo } from '@/api/personalInfo'
import { getBookUser, getBookOrg } from '@/api/mailList/mailList'

export default {
  name: 'MailList',
  data() {
    return {
      // 树状数据
      treeData: [],
      mailLoading: false,
      // 员工信息
      userInfo: {},
      // 部门信息
      orgInfo: {},
      // 搜索条件
      filterText: '',
      //
      rootNode: '',
      // 显示部门或者人员信息
      showUserOrOrg: 'org',
      // 树配置
      props: {
        lable: 'lable',
        children: 'children',
        isLeaf: 'leaf'
      },
      // 控制树的显示
      isSearch: true
    }
  },

  methods: {
    // 懒加载树节点
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.mailLoading = true
        getBookOrg({
          parentOrgId: 0
        })
          .then((res) => {
            res[0].lable = res[0].orgName
            this.rootNode = res[0].orgName
            this.orgInfo = res[0]
            resolve(res)
          })
          .finally(() => {
            this.mailLoading = false
          })
      }
      if (node.level >= 1) {
        Promise.all([
          getBookOrg({ parentOrgId: node.data.orgId }),
          getBookUser({ orgId: node.data.orgId })
        ]).then((res) => {
          let orgList = res[0]
          let userList = res[1]
          userList.forEach((item) => {
            item.lable = item.name
            item.leaf = true
          })
          orgList.forEach((item) => {
            item.lable = item.orgName
            item.name = 'children'
          })
          resolve([...orgList, ...userList])
        })
      }
    },
    // 点击节点
    handelClickNode({ data }) {
      if (data.code) {
        this.showUserOrOrg = 'org'
        this.orgInfo = data
      } else {
        this.showUserOrOrg = 'user'
        this.userInfo = data
      }
    },
    // 搜索
    handelSearch(filterText) {
      if (filterText === '') {
        this.isSearch = true
      } else {
        Promise.all([getBookOrg({ orgName: filterText }), getBookUser({ name: filterText })]).then(
          (res) => {
            let orgList = res[0]
            let userList = res[1]
            userList.forEach((item) => {
              item.lable = item.name
              item.leaf = true
            })
            orgList.forEach((item) => {
              item.lable = item.orgName
              item.name = 'children'
            })
            this.treeData = [...orgList, ...userList]
            this.isSearch = false
          }
        )
      }
    },
    // 懒加载树节点
    loadSeach(node, resolve) {
      Promise.all([
        getBookOrg({ parentOrgId: node.data.orgId }),
        getBookUser({ orgId: node.data.orgId })
      ]).then((res) => {
        let orgList = res[0]
        let userList = res[1]
        userList.forEach((item) => {
          item.lable = item.name
          item.leaf = true
        })
        orgList.forEach((item) => {
          item.lable = item.orgName
          item.name = 'children'
        })
        resolve([...orgList, ...userList])
      })
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
/deep/.el-tree-node.is-current > .el-tree-node__content {
  background-color: #ffffff;
}
.el-input {
  margin-bottom: 20px;
}
.el-button {
  cursor: pointer;
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
            // border: 1px solid #c6cbce;
            background: #ffffff;
            border-radius: 4px;
            flex: 5;
            box-sizing: border-box;
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

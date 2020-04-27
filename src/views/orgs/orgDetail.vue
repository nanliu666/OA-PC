<template>
  <div style="height: 100%">
    <el-page-header
      content="组织详情"
      class="pageHeader"
      @back="goBack"
    />
    <basic-container :block="true">
      <div class="container">
        <div class="treeBox">
          <el-input
            v-model="filterText"
            placeholder="输入关键字进行过滤"
          />
          <el-tree
            ref="tree"
            class="filter-tree"
            :data="treeData"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
          />
        </div>
        <div class="detailBox">
          <div class="mainHeader">
            <h3>{{ orgData.orgName }}</h3>
            <div class="btnBox">
              <el-button
                size="medium"
                type="text"
                icon="el-icon-edit-outline"
                @click="handleOrgEdit(orgData)"
              >
                编辑
              </el-button>
              <el-button
                type="text"
                size="medium"
                icon="el-icon-delete"
                @click="deleteOrg"
              >
                删除
              </el-button>
            </div>
          </div>
          <div class="mainNum">
            <div class="parent">
              上级组织：{{ findFatherOrgName(orgData) || '' }}
            </div>
            <div class="numInfo">
              在职人数 {{ orgData.workNum }} 人
            </div>
            <div class="numInfo">
              用户人数 {{ orgData.userNum }} 人
            </div>
            <div class="numInfo">
              职位 {{ orgData.jobNum }} 个
            </div>
          </div>
          <div class="baseInfo">
            <h4>基本信息</h4>
            <div class="infoBox">
              <el-col :span="4">
                组织编码
              </el-col>
              <el-col :span="20">
                {{ orgData.orgCode }}
              </el-col>
              <el-col :span="4">
                组织类型
              </el-col>
              <el-col :span="20">
                {{ orgTypeObj[orgData.orgType] }}
              </el-col>
              <el-col :span="4">
                组织负责人
              </el-col>
              <el-col :span="20">
                {{ orgData.userName }}
              </el-col>
              <el-col :span="4">
                备注
              </el-col>
              <el-col :span="20">
                {{ orgData.remark }}
              </el-col>
            </div>
          </div>
        </div>
      </div>
      <org-edit
        ref="orgEdit"
        :visible.sync="createOrgDailog"
      />
    </basic-container>
  </div>
</template>

<script>
import { getOrgTree, deleteOrg } from '@/api/org/org'
import OrgEdit from './components/orgEdit'

export default {
  components: { OrgEdit },
  data() {
    return {
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'orgName'
      },
      orgData: {},
      orgTypeObj: { Enterprise: '企业', Company: '公司', Department: '部门', Group: '小组' },
      createOrgDailog: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      getOrgTree({ parentOrgId: 0 }).then((res) => {
        this.treeData = res
        this.handleNodeClick(res[0])
      })
    },
    deleteOrg() {
      const params = {
        orgs: [{ orgId: this.orgData.orgId }]
      }
      deleteOrg(params).then(() => {
        this.$message.success('删除成功')
        this.loadData()
      })
    },
    handleOrgEdit(row) {
      this.$refs.orgEdit.edit(row)
    },
    findFatherOrgName(org) {
      let fatherOrg = this.findFather(org)
      return (fatherOrg && fatherOrg.orgName) || ''
    },
    findFather(row) {
      let fatherOrg
      function deep(arr, orgId) {
        arr.forEach((item) => {
          if (item.children.length > 0) {
            item.children.forEach((it) => {
              if (it.orgId === orgId) fatherOrg = item
            })
            deep(item.children, orgId)
          }
        })
      }
      deep(this.treeData, row.orgId)
      return fatherOrg
    },
    handleNodeClick(data) {
      this.orgData = data
    },
    goBack() {
      this.$router.push('/orgs/orgManagement')
    },
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    }
  }
}
</script>

<style lang="scss" scoped>
.pageHeader {
  height: 48px;
  padding: 0 24px;
  line-height: 48px;
  font-size: 18px;
}
.basic-container--block {
  height: calc(100% - 48px);
}
.container {
  display: flex;
  height: 100%;
  padding: 20px 0;
  .treeBox {
    flex: 1;
    height: 100%;
    padding: 0 10px;
    border-right: 1px solid #f2f2f2;
    .filter-tree {
      margin-top: 20px;
    }
  }
  .detailBox {
    flex: 4;
    padding: 0 50px;
    .mainHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .mainNum {
      margin-bottom: 40px;
      .parent {
        color: #999999;
      }
      .numInfo {
        float: right;
        margin-left: 20px;
      }
    }
    .baseInfo {
      .infoBox {
        padding: 0 40px;
        .el-col {
          margin-bottom: 20px;
        }
        .el-col-4 {
          color: #999999;
        }
      }
    }
  }
}

/deep/ .el-card__body {
  height: 100%;
}
/deep/ .el-tree-node__content {
  height: 40px;
}
</style>

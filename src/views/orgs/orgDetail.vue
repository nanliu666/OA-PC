<template>
  <basic-container>
    <el-page-header
      content="组织详情"
      @back="goBack"
    />
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
        />
      </div>
      <div class="detailBox">
        <div class="mainHeader">
          <h3>综合管理部</h3>
          <div class="btnBox">
            <el-button
              size="medium"
              type="text"
              icon="el-icon-edit-outline"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="medium"
              icon="el-icon-delete"
            >
              删除
            </el-button>
          </div>
        </div>
        <div class="mainNum">
          <div class="parent">
            上级组织：
          </div>
          <div class="numInfo">
            在职人数 56 人
          </div>
          <div class="numInfo">
            用户人数 56 人
          </div>
          <div class="numInfo">
            职位 16 个
          </div>
        </div>
        <div class="baseInfo">
          <h4>基本信息</h4>
          <div class="infoBox">
            <el-col :span="4">
              组织编码
            </el-col>
            <el-col :span="20">
              A02A01A01
            </el-col>
            <el-col :span="4">
              组织类型
            </el-col>
            <el-col :span="20">
              部门
            </el-col>
            <el-col :span="4">
              组织负责人
            </el-col>
            <el-col :span="20">
              朱怡胜
            </el-col>
            <el-col :span="4">
              备注
            </el-col>
            <el-col
              :span="20"
            >
              综合管理部是单位的综合管理部门，主要是负责单位的日常各项行政、人力资源及法律事务等工作；还有组织单位策划、贯标、开展单位研发及代表单位与其他团体联系等职能。
            </el-col>
          </div>
        </div>
      </div>
    </div>
  </basic-container>
</template>

<script>
export default {

  data() {
    return {
      filterText: '',
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
  display: flex;
  .treeBox {
    flex: 1;
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
</style>

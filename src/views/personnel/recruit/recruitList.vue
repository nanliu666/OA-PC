<template>
  <div>
    <div class="roster-header">
      <el-row
        style="width:100%;"
        type="flex"
        justify="center"
        :gutter="24"
      >
        <el-col :span="3">
          <el-button
            type="text"
            class="bigText"
          >
            我提交的招聘需求
          </el-button>
        </el-col>
        <el-col :span="19">
          <el-button
            type="text"
            class="bigText"
          >
            全部招聘需求
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            type="text"
            class="bigText"
            @click="jumpToDetail"
          >
            新建招聘需求
          </el-button>
        </el-col>
      </el-row>
    </div>
    <basic-container>
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="招聘中"
          name="inrecruitment"
        >
          <common-table
            :data="data"
            :page="page"
            :columns="columns"
            :page-config="pageConfig"
            :config="tableConfig"
            @current-page-change="currentPageChange"
            @page-size-change="pageSizeChange"
          >
            <template slot="topMenu">
              <div class="flex-flow flex justify-content align-items ">
                <div>
                  <search-popover
                    ref="searchPopover"
                    :require-options="searchConfig.requireOptions"
                    @submit="handleSubmit"
                  />
                </div>
                <div class="resetEdge">
                  <el-button
                    type="primary"
                    size="medium"
                    @click="getTableData"
                  >
                    <i class="el-icon-refresh" />
                  </el-button>
                </div>
              </div>
            </template>
          </common-table>
        </el-tab-pane>
        <el-tab-pane
          label="已结束"
          name="Finished                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             "
        >
          配置管理
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
import SearchPopover from '@/components/searchPopOver/index'
import { getMyRecruitment } from '@/api/personnel/recruitment'
export default {
  name: 'RecruitList',
  components: {
    SearchPopover
  },
  data() {
    return {
      activeName: 'inrecruitment',
      searchConfig: {
        requireOptions: [
          {
            type: 'input',
            field: 'jobName',
            label: '',
            data: [],
            month: [],
            value: [],
            config: {
              placeholder: '职位名称'
            }
          }
        ]
      },
      data: [],
      columns: [
        {
          label: '需求编号',
          prop: 'id'
        },
        {
          label: '用人部门',
          prop: 'orgName'
        },
        {
          label: '职位',
          prop: 'jobName'
        },
        {
          label: '岗位',
          prop: 'positionName'
        },
        {
          label: '需求人数',
          prop: 'needNum'
        },
        {
          label: '已入职人数',
          prop: 'entryNum'
        },
        {
          label: '候选人数',
          prop: 'candidateNum'
        },
        {
          label: '到岗日期',
          prop: 'joinDate'
        },
        {
          label: '工作年限',
          prop: 'workYear'
        },
        {
          label: '学历要求',
          prop: 'educationalLevel'
        },
        {
          label: '最低薪资',
          prop: 'minSalary'
        },
        {
          label: '最高薪酬',
          prop: 'maxSalary'
        }
      ],

      tableConfig: {
        enablePagination: true
      },
      params: {
        pageNo: 1,
        pageSize: 10
      },
      //   分页器配置
      page: { currentPage: 1, size: 10, total: 0 },
      pageConfig: {
        pageSizes: [10, 20, 30, 40, 50]
      }
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData(params) {
      if (typeof params === 'undefined') params = this.params
      getMyRecruitment(params).then((res) => {
        this.data = res.data
      })
    },

    Decorator(paramsData) {
      let request = {
        jobName: paramsData.jobName || '',
        pageNo: paramsData.pageNo || 1,
        pageSize: paramsData.pageSize || 10
      }
      return request
    },

    handleSubmit(params) {
      let request = this.Decorator(params)
      return this.getTableData(request)
    },
    jumpToDetail() {
      this.$router.push('/personnel/recruit/recruitmentNeeds')
    },
    pageSizeChange(param) {
      let paramsInfo = {}
      paramsInfo.pageSize = param
      return this.getTableData(paramsInfo)
    },
    currentPageChange(param) {
      let paramsInfo = {}
      paramsInfo.pageNo = param
      return this.getTableData(paramsInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.roster-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  h4 {
    font-size: 18px;
  }
}
.state {
  display: flex;
  padding: 0 6px;
  margin-bottom: 10px;
  .on {
    flex: 4;
    background: #ffffff;
    border-radius: 4px;
    margin-right: 20px;
    display: flex;
    > div {
      flex: 1;
      text-align: center;
      height: 46px;
      margin: 30px 0;
      line-height: 46px;
      border-right: 1px solid #e3e7e9;
      cursor: pointer;
      .bottomBox {
        height: 2px;
        width: 68px;
        background: #207efa;
        margin: 0 auto;
        margin-top: 28px;
      }
    }
    :last-of-type {
      border-right: 0;
    }
    .current {
      color: #207efa;
    }
  }
  .left {
    flex: 1;
    background: #ffffff;
    border-radius: 4px;
    > div {
      flex: 1;
      text-align: center;
      height: 46px;
      margin: 30px 0;
      line-height: 46px;
      cursor: pointer;
      .bottomBox {
        height: 2px;
        width: 68px;
        background: #207efa;
        margin: 0 auto;
        margin-top: 28px;
      }
    }
    .current {
      color: #207efa;
    }
  }
}

.bigText {
  font-weight: 500;
  font-size: 18px;
}

.resetEdge {
  position: absolute;
  right: 20px;
}
</style>

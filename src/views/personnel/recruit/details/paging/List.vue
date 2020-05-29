<template>
  <div>
    <div class="roster-header">
      <div class="state">
        <div class="on">
          <div>
            销售经理
            <div class="bottomBox">
              职位名称
            </div>
          </div>
          <div>
            2020-02-12
            <div class="bottomBox">
              最迟到岗日期
            </div>
          </div>
          <div>
            特急
            <div class="bottomBox">
              紧急程度
            </div>
          </div>
          <div>
            20
            <div class="bottomBox">
              需求总数
            </div>
          </div>
          <div>
            10
            <div class="bottomBox">
              已入职
            </div>
          </div>
          <div>
            50%
            <div class="bottomBox">
              招聘进度
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 class="Header">
      已入职员工
    </h3>
    <basic-container>
      <common-table
        :data="data"
        :page="page"
        :columns="columns"
        :page-config="pageConfig"
        :config="tableConfig"
        @pageSizeChange="sizeChange"
        @currentPageChange="currentChange"
      >
        <template
          slot="name"
          slot-scope="{ row }"
        >
          <el-button
            type="text"
            size="medium"
            @click="jumpToDetail(row.personId)"
          >
            {{ row.name }}
          </el-button>
        </template>
      </common-table>
    </basic-container>
  </div>
</template>
<script>
import { getRecruitmentDetail } from '@/api/personnel/selectedPerson'
export default {
  name: 'RecruitList',
  data() {
    return {
      row: {},
      data: [],
      tableConfig: {
        showIndexColumn: false,
        enableMultiSelect: false,
        enablePagination: true
      },
      columns: [
        {
          label: '姓名',
          prop: 'name',
          slot: true
        },
        {
          label: '性别',
          prop: 'sex'
        },
        {
          label: '候选人状态',
          prop: 'status'
        },
        {
          label: '手机号码',
          prop: 'phonenum'
        },
        {
          label: '个人邮箱',
          prop: 'email'
        },

        {
          label: '毕业学校',
          prop: 'university'
        },
        {
          label: '工作年限',
          prop: 'workAge'
        },
        {
          label: '学历要求',
          prop: 'educationalLevel'
        }
      ],
      params: {
        pageNo: 1,
        pageSize: 10
      },
      page: {
        pageSize: 100,
        pagerCount: 1,
        total: 10
      },
      pageConfig: {
        pageSizes: [10, 20, 30, 40, 50]
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getRecruitmentDetail().then((res) => {
        this.data = res.data
      })
    },
    jumpToDetail(personId) {
      this.$router.push(`/personnel/detail/${personId}`)
    },
    currentChange(val) {
      this.params.pageNo = val
      this.page.pagerCount = val
      this.getData()
    },
    sizeChange(val) {
      this.params.pageSize = val
      this.params.pageNo = 1
      this.page.pagerCount = 1
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.state {
  display: flex;
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
      .bottomBox {
        font-size: 12px;
        height: 2px;
        width: 90px;
        margin: 0 auto;
        color: #ccc;
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

.Header {
  margin-top: 40px;
  margin-bottom: 0px;
}

/deep/ .top-menu {
  height: 0px;
  margin-bottom: 0px;
}
</style>

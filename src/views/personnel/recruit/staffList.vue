<template>
  <div>
    <page-header
      title="需求详情"
      class="pageHeader"
      show-back
    />
    <basic-container style="margin-button: 40px">
      <el-row :gutter="24">
        <el-col class="fullName">
          {{ name }}提交的招聘需求
        </el-col>
      </el-row>
      <el-row
        :gutter="24"
        type="flex"
        style="margin-top:20px"
      >
        <el-col :span="9">
          <span class="nodetitle">需求编号:</span>
          <span class="content">{{ number }}</span>
        </el-col>

        <el-col :span="9">
          <span class="nodetitle">提交人:</span>
          <span class="content">{{ name }}</span>
        </el-col>

        <el-col :span="9">
          <span class="nodetitle">提交时间:</span>
          <span class="content">{{ time }}</span>
        </el-col>

        <el-col :span="9">
          <span class="nodetitle">状态:</span>
          <span
            class="content"
            style="color: #207EFA"
          >{{ status }}</span>
        </el-col>
        <el-col>
          <el-button
            style="float: right ;   margin-top: 8px ;"
            size="medium"
            type="primary"
          >
            更改需求状态
          </el-button>
        </el-col>
      </el-row>
    </basic-container>

    <basic-container>
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="招聘进度"
          name="inrecruitment"
        >
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
              <template
                slot="sex"
                slot-scope="{ row }"
              >
                {{ calcSex(row.sex) }}
              </template>
              <template
                slot="educationalLevel"
                slot-scope="{ row }"
              >
                {{ calcEducation(row.educationalLevel) }}
              </template>
            </common-table>
          </basic-container>
        </el-tab-pane>
        <el-tab-pane
          label="招聘需求详情"
          name="recruitmentdemand"
        >
          <details-details />
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getRecruitmentDetail } from '@/api/personnel/selectedPerson'
import { getEntryDetails } from '@/api/personnel/recruitment'
import DetailsDetails from './paging/details'
export default {
  name: 'StaffList',
  components: {
    DetailsDetails
  },
  data() {
    return {
      id: '暂无数据',
      name: 'xxx',
      activeName: 'inrecruitment',
      number: '暂无数据',
      time: '暂无数据',
      status: '暂无状态',
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
          prop: 'sex',
          slot: true
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
          prop: 'educationalLevel',
          slot: true
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
      },
      EducationalLevel: []
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  watch: {
    '$route.query.id': function(newval) {
      if (newval) {
        this.ReplicationCache(newval)
      }
    }
  },
  mounted() {
    this.getData()
    this.ReplicationCache(this.$route.query.id)
    this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
      this.EducationalLevel = res
    })
  },
  methods: {
    ReplicationCache(id) {
      getEntryDetails({ userId: this.userId, recruitmentId: id }).then((res) => {
        this.data = res.data
      })
    },
    getData() {
      getRecruitmentDetail().then((res) => {
        this.data = res.data
      })
    },
    calcSex(sex) {
      let typeWord
      let whoSex = [
        { sex: 1, result: '男' },
        { sex: 0, result: '女' }
      ]
      whoSex.forEach((item) => {
        if (item.sex === sex) {
          typeWord = item.result
        }
      })
      return typeWord
    },
    calcEducation(educationalLevel) {
      let typeLevel
      this.EducationalLevel.forEach((item) => {
        if (item.dictKey === educationalLevel) {
          typeLevel = item.dictValue
        }
      })

      return typeLevel
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
.pageHeader {
  height: 48px;
  line-height: 48px;
  font-size: 18px;
}

.resetEdge {
  position: absolute;
  right: 20px;
}
.fullName {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #202940;
  line-height: 24px;
  font-weight: 600;
}

.nodetitle {
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #718199;
  line-height: 18px;
  display: block;
}
content {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #202940;
}

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
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #212a3f;
}

/deep/ .top-menu {
  height: 0px;
  margin-bottom: 0px;
}

/deep/ .basic-container {
  margin: 10px 0;
}
</style>

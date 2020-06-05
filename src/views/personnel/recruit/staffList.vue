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
          {{ user.userName }}提交的招聘需求
        </el-col>
      </el-row>
      <el-row
        :gutter="24"
        type="flex"
        style="margin-top:20px"
      >
        <el-col :span="9">
          <span class="nodetitle">需求编号:</span>
          <span>{{ user.id }}</span>
        </el-col>

        <el-col :span="9">
          <span class="nodetitle">提交人:</span>
          <span>{{ user.userName }}</span>
        </el-col>

        <el-col :span="9">
          <span class="nodetitle">到岗时间:</span>
          <span>{{ user.joinDate }}</span>
        </el-col>

        <el-col :span="9">
          <span class="nodetitle">状态:</span>
          <span style="color: #207EFA">{{ status }}</span>
        </el-col>
        <el-col>
          <el-button
            style="float: right;margin-top: 8px ;"
            size="medium"
            type="primary"
            @click="ChangeContent"
          >
            更改需求状态
          </el-button>
        </el-col>
      </el-row>
    </basic-container>
    <basic-container>
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-if="$route.query.status === 'UnHandle'"
          label="分配信息"
          name="inrecruitment"
        >
          <Unassignedfrom :child-data="childData" />
        </el-tab-pane>
        <el-tab-pane
          v-else
          label="招聘进度"
          name="inrecruitment"
        >
          <Introduce :status="childData" />
          <div v-if="$route.query.myneeds === 'myneeds'">
            <h3 class="Header">
              关联候选人
            </h3>
            <candidatepeople />
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
          <details-details :child-data="childData" />
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getEntryDetails, getRecruitmentDetail } from '@/api/personnel/recruitment'
import Candidatepeople from './components/candidatepeople'
import Introduce from './components/introduce'
import Unassignedfrom from './components/unassigned'
import DetailsDetails from './paging/details'
export default {
  name: 'StaffList',
  components: {
    DetailsDetails,
    Unassignedfrom,
    Introduce,
    Candidatepeople
  },
  data() {
    return {
      childData: [],
      user: {
        joinDate: null,
        userName: null,
        id: null
      },
      status: '招聘中',
      activeName: 'inrecruitment',
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
      EducationalLevel: [],
      progress: 'Approved'
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
    jumpToDetail() {},
    ReplicationCache(id) {
      getEntryDetails({ userId: this.userId, recruitmentId: id }).then((res) => {
        this.data = res.data
        this.page.total = res.totalPage
      })
    },
    getData() {
      getRecruitmentDetail({ recruitmentId: this.$route.query.id }).then((res) => {
        this.user = res
        this.childData = res
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
    },
    ChangeContent() {
      this.$router.push({
        path: '/personnel/recruit/components/chang'
      })
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
  right: 62px;
  margin-top: 3px;
}
.fullName {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #202940;
  line-height: 24px;
  font-weight: 600;
}

.nodetitle {
  margin-bottom: 8px;
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #718199;
  line-height: 18px;
  display: block;
}
.content {
  display: block;
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #202940;
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

.demandSize {
  display: block;
  font-size: 12px;
  color: #718199;
  line-height: 18px;
  text-align: center;
}

.frame {
  border-right: solid 1px #ccc;
}
</style>

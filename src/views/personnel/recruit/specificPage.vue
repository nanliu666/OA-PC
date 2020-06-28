<template>
  <div>
    <page-header
      title="需求详情"
      class="pageHeader"
      show-back
    />
    <basic-container
      v-loading="loading"
      style="margin-button: 40px"
    >
      <el-row type="flex">
        <el-col
          class="fullName"
          :span="3"
        >
          {{ user.userName }}提交的招聘需求
        </el-col>
        <!-- 当页面是全部招聘状态打开页面标签描述 -->
        <template v-if="$route.query.status === 'aRequirements'">
          <el-col :span="2">
            <el-tag
              v-if="childData.status === 'UnHandle'"
              type="danger"
            >
              待分配
            </el-tag>

            <el-tag v-else>
              已分配
            </el-tag>
          </el-col>
        </template>
      </el-row>
      <el-row
        :gutter="24"
        type="flex"
        style="margin-top:20px"
      >
        <el-col :span="6">
          <span class="nodetitle">需求编号:</span>
          <span>{{ user.id }}</span>
        </el-col>
        <template v-if="$route.query.status === 'iSubmit'">
          <el-col :span="6">
            <span class="nodetitle">分配人:</span>
            <span>{{ user.userName }}</span>
          </el-col>

          <el-col :span="6">
            <span class="nodetitle">分配时间:</span>
            <span>{{ user.createTime }}</span>
          </el-col>
        </template>
        <template v-else>
          <el-col :span="6">
            <span class="nodetitle">提交人:</span>
            <span>{{ user.userName }}</span>
          </el-col>

          <el-col :span="6">
            <span class="nodetitle">提交时间:</span>
            <span>{{ user.createTime }}</span>
          </el-col>
        </template>
        <el-col :span="6">
          <span class="nodetitle">状态:</span>
          <span style="color: #207EFA">{{
            user.needNum !== user.entryNum ? '招聘中' : '已结束'
          }}</span>
        </el-col>
        <Buttongroup-from :child-data="childData" />
      </el-row>
      <el-tabs v-model="activeName">
        <!-- 全部招聘需求 -->
        <el-tab-pane
          v-if="$route.query.status === 'aRequirements'"
          label="分配信息"
          name="inrecruitment"
        >
          <Introduce :status="childData" />
          <h3 class="Header">
            分配详情
          </h3>
          <distri-buteall :child-data="childData" />
          <div>
            <h3 class="Header">
              已入职员工
            </h3>
            <Entrystaff />
          </div>
        </el-tab-pane>

        <!-- 我的招聘需求 -->
        <el-tab-pane
          v-else-if="$route.query.status === 'mNeeds'"
          label="招聘进度"
          name="inrecruitment"
        >
          <Introduce :status="childData" />
          <h3 class="Header">
            分配详情
          </h3>
          <distri-buteall />
          <div v-if="childData.status === 'Handled'">
            <h3 class="Header">
              已入职员工
            </h3>
            <Entrystaff />
          </div>
        </el-tab-pane>

        <!-- 我的提交招聘需求 -->
        <el-tab-pane
          v-else-if="$route.query.status === 'iSubmit'"
          label="招聘进度"
          name="inrecruitment"
        >
          <Introduce :status="childData" />
          <h3 class="Header">
            关联候选人
            <el-button
              class="buttonPrimary"
              type="primary"
              size="medium"
              @click="JumpCandidate()"
            >
              添加候选人
            </el-button>
          </h3>
          <Candidatepeople />
          <h3 class="Header">
            已入职员工
          </h3>
          <Entrystaff />
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
import { getRecruitmentDetail } from '@/api/personnel/recruitment'
import Candidatepeople from './components/candidatepeople'
import Introduce from './components/introduce'
import DetailsDetails from './paging/details'
import Entrystaff from './components/entrystaff'
import DistriButeall from './components/Distributeall'
import ButtongroupFrom from './components/buttongroup'
export default {
  name: 'StaffList',
  components: {
    DetailsDetails,
    Introduce,
    Candidatepeople,
    Entrystaff,
    DistriButeall,
    ButtongroupFrom
  },
  data() {
    return {
      loading: false,
      childData: [],
      user: {
        joinDate: null,
        userName: null,
        id: null,
        needNum: null,
        entryNum: null
      },
      status: '招聘中',
      activeName: 'inrecruitment',
      row: {},
      data: [],
      tableConfig: {
        showIndexColumn: false,
        enableMultiSelect: false,
        enablePagination: true
      }
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  activated() {
    if (this.$route.query.id) {
      this.getData()
    }
  },
  mounted() {
    // 当其他页面进入详情页面时 仅展示需求详情页面
    if (!this.$route.query.status) {
      this.activeName = 'recruitmentdemand'
    }
  },
  methods: {
    getData() {
      this.loading = true
      getRecruitmentDetail(this.$route.query.id)
        .then((res) => {
          this.loading = false
          this.user = res
          this.childData = res
        })
        .catch(() => {
          this.loading = false
        })
    },
    JumpCandidate() {
      this.$router.push({
        path: '/personnel/editPerson',
        query: { recruitmentId: this.$route.query.id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pageHeader {
  line-height: 48px;
  font-size: 18px;
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
  margin-top: 10px;
  line-height: 30px;
  margin-bottom: 0px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #212a3f;
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

.buttonPrimary {
  float: right;
  margin-right: 25px;
}
</style>

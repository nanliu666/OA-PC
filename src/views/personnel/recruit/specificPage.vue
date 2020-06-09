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
        <Buttongroup-from :child-data="childData" />
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
          v-else-if="$route.query.status === 'Handled'"
          label="分配信息"
          name="inrecruitment"
        >
          <Introduce :status="childData" />
          <h3 class="Header">
            分配详情
          </h3>
          <distri-buteall />
          <h3 class="Header">
            已入职员工
          </h3>
          <Entrystaff />
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
              <el-button
                class="buttonPrimary"
                type="primary"
                size="medium"
                @click="JumpCandidate(row)"
              >
                添加候选人
              </el-button>
            </h3>

            <candidatepeople />
          </div>
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
import Unassignedfrom from './components/unassigned'
import DetailsDetails from './paging/details'
import Entrystaff from './components/entrystaff'
import DistriButeall from './components/Distributeall'
import ButtongroupFrom from './components/buttongroup'
export default {
  name: 'StaffList',
  components: {
    DetailsDetails,
    Unassignedfrom,
    Introduce,
    Candidatepeople,
    Entrystaff,
    DistriButeall,
    ButtongroupFrom
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
      progress: 'Approved'
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  activated() {
    if (typeof this.$route.query.id !== 'undefined') {
      this.getData()
    }
  },
  methods: {
    getData() {
      getRecruitmentDetail({ recruitmentId: this.$route.query.id }).then((res) => {
        this.user = res
        this.childData = res
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
  height: 48px;
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
  margin-top: 40px;
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
}
</style>

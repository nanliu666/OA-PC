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
      block
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
        <el-col :span="7">
          <span class="nodetitle">需求编号:</span>
          <span>{{ user.id }}</span>
        </el-col>
        <template v-if="$route.query.status === 'iSubmit'">
          <el-col :span="7">
            <span class="nodetitle">分配人:</span>
            <span>{{ user.userName }}</span>
          </el-col>

          <el-col :span="7">
            <span class="nodetitle">分配时间:</span>
            <span>{{ user.createTime }}</span>
          </el-col>
        </template>
        <template v-else>
          <el-col :span="7">
            <span class="nodetitle">提交人:</span>
            <span>{{ user.userName }}</span>
          </el-col>

          <el-col :span="7">
            <span class="nodetitle">提交时间:</span>
            <span>{{ user.createTime }}</span>
          </el-col>
        </template>
        <el-col :span="3">
          <span class="nodetitle">状态:</span>
          <span style="color: #207EFA">
            {{ translator({ dictKey: 'progress', value: user.progress }) }}
          </span>
        </el-col>
        <ButtongroupFrom :child-data="childData" />
      </el-row>
      <el-tabs v-model="activeName">
        <!-- 全部招聘需求 -->
        <el-tab-pane
          v-if="$route.query.status === 'aRequirements'"
          label="分配信息"
          name="inrecruitment"
        >
          <Overview
            :data="childData"
            :props="overviewProps"
          />
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

        <!-- 我的任务 -->
        <el-tab-pane
          v-else-if="$route.query.status === 'mNeeds'"
          label="招聘进度"
          name="inrecruitment"
        >
          <Overview
            :data="childData"
            :props="overviewProps"
          />
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
          <Overview
            :data="childData"
            :props="overviewProps"
          />
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
import DetailsDetails from './paging/details'
import Entrystaff from './components/entrystaff'
import DistriButeall from './components/Distributeall'
import ButtongroupFrom from './components/buttongroup'
import { claAccuracy } from '@/views/personnel/recruit/components/percentage'

const OVERVIEW_PROPS = [
  // 显示在<overview/>中的属性 格式: ["prop", "label", {config}]
  ['jobName', '职位名称'],
  ['joinDate', '到岗日期'],
  [
    'emerType',
    '紧急程度',
    {
      className: ({ emerType }) => {
        let className = ''
        switch (emerType) {
          case 'Super': // 与 urgent 相同处理
          case 'urgent':
            className = 'color--danger'
            break
          case 'common':
            className = 'color--info'
            break
          case 'suit':
            className = 'color--success'
            break
          default:
        }
        return className
      },
      dictKey: 'emerType'
    }
  ],
  ['needNum', '需求总数'],
  ['entryNum', '已入职'],
  [
    '$_process',
    '招聘进度',
    {
      // 设置 CSS class 属性
      className: 'color--active text--bold',
      // 处理 value
      handler: ({ needNum, entryNum }) => _.toString(claAccuracy(needNum, entryNum)) + '%'
    }
  ],
  ['candidateNum', '候选人数']
]

const PROGRESS_DICTS = [
  {
    dictKey: 'Approved',
    dictValue: '招聘中'
  },
  {
    dictKey: 'Finished',
    dictValue: '已结束'
  }
]

export default {
  name: 'StaffList',
  components: {
    ButtongroupFrom,
    Candidatepeople,
    DetailsDetails,
    DistriButeall,
    Entrystaff,
    Overview: () => import('./components/Overview')
  },
  data() {
    return {
      loading: false,
      childData: {},
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
        enablePagination: true
      },
      dictionary: {
        progress: PROGRESS_DICTS
      }
    }
  },
  computed: {
    ...mapGetters(['userId']),
    overviewProps: () => OVERVIEW_PROPS
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
    },

    // 翻译字典
    translator({ value, dictKey, $config: config }) {
      if (!(dictKey = dictKey || _.get(config, 'dictKey'))) {
        return value
      }

      const dicts = this.dictionary[dictKey]
      // 如果字典为 undefined 时候加载字典
      if (!dicts) this.loadDictionary(dictKey)
      let result = value
      _.each(dicts, (item) => {
        if (item.dictKey === _.trim(value)) {
          result = item.dictValue
          return false
        }
      })
      return result
    },
    // 添加字典
    async loadDictionary(dictKey) {
      const dict = await this.$store.dispatch('CommonDict', dictKey)
      this.$set(this.dictionary, dictKey, dict)
      return dict
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-container--block {
  min-height: 100%;
  height: 500px;
}

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

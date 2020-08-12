<template>
  <div class="fill">
    <page-header title="人才库管理">
      <template slot="rightMenu">
        <el-dropdown @command="handleCommand">
          <el-button
            type="primary"
            size="medium"
          >
            添加人才
            <i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add">
              单个添加人才
            </el-dropdown-item>
            <!-- <el-dropdown-item>Excel导入人才</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </page-header>
    <basic-container block>
      <common-table
        ref="crud"
        :config="tableConfig"
        :columns="columns"
        :loading="loading"
        :data="data"
        :page="page"
        @current-page-change="currentChange"
        @page-size-change="sizeChange"
      >
        <template slot="topMenu">
          <div class="menu-wr">
            <div>
              <search-popover
                ref="searchPopover"
                :require-options="searchConfig.requireOptions"
                :popover-options="searchConfig.popoverOptions"
                @submit="handleSubmit"
              />
            </div>
            <i
              class="icon-basics-refresh-outlined refresh"
              @click="loadData"
            />
          </div>
        </template>
        <template
          slot="name"
          slot-scope="{ row }"
        >
          <el-button
            type="text"
            size="medium"
            @click="jumpToDetail(row)"
          >
            {{ row.name }}
          </el-button>
        </template>
        <template
          slot="recruitment"
          slot-scope="{ row }"
        >
          {{
            (recruitmentOptions.find((item) => item.dictKey === row.recruitment) || {}).dictValue
          }}
        </template>
        <template
          slot="educationalLevel"
          slot-scope="{ row }"
        >
          {{
            (educationalLevelOptions.find((item) => item.dictKey === row.educationalLevel) || {})
              .dictValue
          }}
        </template>
        <template
          slot="handler"
          slot-scope="{ row }"
        >
          <el-button
            size="medium"
            type="text"
            @click="addToCandidate(row)"
          >
            添加到候选人
          </el-button>
          <el-dropdown @command="handleCommand($event, row)">
            <el-button
              type="text"
              style="margin-left: 10px"
            >
              <i class="el-icon-arrow-down iconfont icon-basics-more-outlined" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="download">
                下载简历
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </common-table>
    </basic-container>
    <change-job-dialog
      ref="changeJobDialog"
      :visible.sync="editVisible"
      @refresh="loadData"
    />
  </div>
</template>
<script>
import { getTalentList } from '@/api/personnel/person'
import { provinceAndCityData } from 'element-china-area-data'

export default {
  name: 'TalentList',
  components: {
    pageHeader: () => import('@/components/page-header/pageHeader'),
    searchPopover: () => import('@/components/searchPopOver'),
    changeJobDialog: () => import('../candidate/components/changeJobDialog')
  },
  data() {
    return {
      editVisible: false,
      params: {},
      loading: false,
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      tableConfig: {
        showHandler: true,
        showIndexColumn: false,
        enablePagination: true,
        handlerColumn: {
          width: '140'
        }
      },
      columns: [
        {
          label: '姓名',
          prop: 'name',
          slot: true,
          width: 100
        },
        {
          label: '招聘渠道',
          prop: 'recruitment',
          width: 100,
          slot: true
        },
        {
          label: '期望薪资',
          prop: 'monthSalary',
          width: 120
        },
        {
          label: '性别',
          prop: 'sex',
          width: 80,
          formatter(record) {
            return { '0': '女', '1': '男' }[record.sex] || ''
          }
        },
        {
          label: '手机号',
          prop: 'phonenum',
          width: 120
        },
        {
          label: '邮箱',
          prop: 'email',
          width: 160
        },
        {
          label: '目前所在地',
          prop: 'address',
          minWidth: 160,
          formatter: (record) => {
            return `${record.provinceName}${record.cityName}`
          }
        },
        {
          label: '学历',
          prop: 'educationalLevel',
          slot: true,
          width: 80
        },
        {
          label: '毕业学校',
          prop: 'university',
          width: 120
        },
        {
          label: '工作年限',
          prop: 'workAge',
          width: 80
        },
        {
          label: '最近工作单位',
          prop: 'lastCompany',
          minWidth: 160
        }
      ],
      data: [],
      searchConfig: {
        requireOptions: [
          {
            type: 'input',
            field: 'search',
            label: '',
            data: '',
            config: { placeholder: '姓名/邮箱/手机号码', 'suffix-icon': 'el-icon-search' }
          }
        ],
        popoverOptions: [
          {
            type: 'select',
            field: 'educationalLevel',
            label: '学历',
            data: '',
            options: [],
            config: { optionLabel: 'dictValue', optionValue: 'dictKey' }
          },
          {
            type: 'select',
            field: 'sex',
            data: '',
            label: '性别',
            options: [
              { value: '0', label: '女' },
              { value: '1', label: '男' }
            ],
            config: {}
          },
          {
            type: 'input',
            field: 'university',
            data: '',
            label: '毕业院校'
          },
          {
            type: 'cascader',
            field: 'provinceCode,cityCode',
            data: [],
            label: '目前所在地区',
            options: provinceAndCityData,
            config: {}
          },
          {
            type: 'numInterval',
            field: 'minWorkAge,maxWorkAge',
            data: { min: '', max: '' },
            label: '工作年限',
            config: {}
          }
        ]
      },
      recruitmentOptions: [],
      educationalLevelOptions: []
    }
  },
  async created() {
    this.educationalLevelOptions = await this.$store.dispatch('CommonDict', 'EducationalLevel')
    this.searchConfig.popoverOptions[0].options = this.educationalLevelOptions
    this.recruitmentOptions = await this.$store.dispatch('CommonDict', 'RecruitmentChannel')
  },
  activated() {
    this.loadData()
  },
  methods: {
    addToCandidate(row) {
      this.$refs.changeJobDialog.init('add', row)
    },
    handleSubmit(params) {
      this.params = params
      this.loadData()
    },
    handleCommand(command, row) {
      if (command === 'add') {
        this.$router.push('/personnel/editPerson?isTalent=1')
      } else {
        if (command === 'download') {
          if (row.resumeUrl) {
            window.open(row.resumeUrl)
          } else {
            this.$message.error('该用户暂无简历附件')
          }
        }
      }
    },
    jumpToDetail({ personId, recruitmentId }) {
      this.$router.push(
        `/personnel/personDetail/${personId}?isTalent=1&recruitmentId=${recruitmentId}&tagName=人才库详情`
      )
    },
    loadData() {
      this.loading = true
      getTalentList({
        pageNo: this.page.currentPage,
        pageSize: this.page.size,
        ...this.params
      })
        .then((res) => {
          this.page.total = res.totalNum
          this.data = res.data
          // this.selectionClear()
        })
        .finally(() => {
          this.loading = false
        })
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage
      this.loadData()
    },
    sizeChange(pageSize) {
      this.page.size = pageSize
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-wr {
  display: flex;
  justify-content: space-between;
}
.refresh {
  color: #a0a8ae;
  font-size: 16px;
  line-height: 40px;
  cursor: pointer;
}
.basic-container--block {
  height: calc(100% - 92px);
  min-height: calc(100% - 92px);
}
</style>

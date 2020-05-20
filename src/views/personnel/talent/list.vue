<template>
  <div>
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
    <basic-container>
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
            <div>
              <el-button
                size="medium"
                @click="loadData"
              >
                <i class="el-icon-refresh" />
              </el-button>
            </div>
          </div>
        </template>
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
        // enableMultiSelect: true,
        enablePagination: true,
        handlerColumn: {
          width: '180'
        }
      },
      columns: [
        {
          label: '姓名',
          prop: 'name',
          slot: true
        },
        {
          label: '招聘渠道',
          prop: 'recruitment',
          slot: true
        },
        {
          label: '期望薪资',
          prop: 'monthSalary'
        },
        {
          label: '性别',
          prop: 'sex',
          formatter(record) {
            return { '0': '女', '1': '男' }[record.sex] || ''
          }
        },
        {
          label: '手机号',
          prop: 'phonenum'
        },
        {
          label: '邮箱',
          prop: 'email'
        },
        {
          label: '目前所在地',
          prop: 'address',
          formatter: (record) => {
            return `${record.proviceName}${record.cityName}`
          }
        },
        {
          label: '学历',
          prop: 'educationalLevel',
          slot: true
        },
        {
          label: '最近工作单位',
          prop: 'lastCompany'
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
            config: { optionLabel: '请选择', optionValue: '' }
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
            label: '入职日期',
            config: {}
          },
          {
            type: 'cascader',
            field: 'address',
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
    this.recruitmentOptions = await this.$store.dispatch('CommonDict', 'RecruitmentChannel')
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
    handleCommand(command) {
      if (command === 'add') {
        this.$router.push('/personnel/editPerson?isTalent=1')
      }
    },
    jumpToDetail(personId) {
      this.$router.push(`/personnel/personDetail/${personId}?isTalent=1`)
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
</style>

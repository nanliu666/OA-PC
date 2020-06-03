<template>
  <div>
    <common-table
      :data="data"
      :page="page"
      :columns="columns"
      :page-config="pageConfig"
      :config="tableConfig"
      @current-page-change="currentPageChange"
      @page-size-change="currentPageChange"
    >
      <template slot="topMenu">
        <div class="flex-flow flex justify-content align-items ">
          <div>
            <search-popover
              ref="searchPopover"
              :require-options="searchConfig.requireOptions"
              :popover-options="searchConfig.popoverOptions"
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
      <template
        slot="id"
        slot-scope="{ row }"
      >
        <el-button
          type="text"
          size="medium"
          @click="jumpToDetail(row.id)"
        >
          {{ row.id }}
        </el-button>
      </template>
      <template
        slot="workYear"
        slot-scope="{ row }"
      >
        {{ getWorkYear(row.workYear) }}
      </template>
      <template
        slot="educationalLevel"
        slot-scope="{ row }"
      >
        {{ getEducationalLevel(row.educationalLevel) }}
      </template>

      <template
        slot="handler"
        slot-scope="{ row }"
      >
        <el-button
          v-if="params.progress === 'Approved'"
          size="medium"
          type="text"
          @click="JumpChange(row)"
        >
          更改需求人数
        </el-button>
        <el-button
          v-else
          size="medium"
          type="text"
          @click="JumpNewlybuild(row.id)"
        >
          复制
        </el-button>
      </template>
    </common-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchPopover from '@/components/searchPopOver/index'
import { getMyRecruitment, getPost } from '@/api/personnel/recruitment'
import { getOrgTreeSimple } from '@/api/org/org'
export default {
  name: 'DetailsList',
  components: {
    SearchPopover
  },
  data() {
    return {
      recruit: false,
      change: true,
      activeName: 'inrecruitment',
      searchConfig: {
        requireOptions: [
          {
            type: 'input',
            field: 'jobName',
            label: '',
            data: '',
            config: {
              placeholder: '职位名称'
            }
          }
        ],
        popoverOptions: [
          {
            type: 'treeSelect',
            field: 'orgId',
            label: '用人部门',
            config: {
              selectParams: {
                placeholder: '请输入内容',
                multiple: false
              },
              treeParams: {
                data: [],
                'check-strictly': true,
                'default-expand-all': false,
                'expand-on-click-node': false,
                clickParent: true,
                filterable: false,
                props: {
                  children: 'children',
                  label: 'orgName',
                  disabled: 'disabled',
                  value: 'orgId'
                }
              }
            }
          },
          {
            type: 'select',
            data: '',
            label: '岗位',
            field: 'positionId',
            arrField: 'positionId',
            config: { optionLabel: 'name', optionValue: 'id' },
            options: []
          },
          {
            type: 'select',
            data: '',
            label: '工作年限',
            field: 'workYear',
            config: { optionLabel: 'dictValue', optionValue: 'dictKey' },
            options: []
          },
          {
            type: 'select',
            data: '',
            label: '学历要求',
            field: 'educationalLevel',
            options: [],
            config: { optionLabel: 'dictValue', optionValue: 'dictKey' }
          },
          {
            type: 'select',
            field: 'emerType',
            data: '',
            label: '紧急程度',
            options: [],
            config: { optionLabel: 'dictValue', optionValue: 'dictKey' }
          },
          {
            type: 'dataPicker',
            data: '',
            label: '到岗日期',
            field: 'beginJoinDate,endJoinDate',
            config: { type: 'daterange', 'range-separator': '至' }
          }
        ]
      },
      data: [],
      columns: [
        {
          label: '需求编号',
          prop: 'id',
          slot: true
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
          prop: 'workYear',
          slot: true
        },
        {
          label: '学历要求',
          prop: 'educationalLevel',
          slot: true
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
        showHandler: true,
        showIndexColumn: false,
        enableMultiSelect: false,
        enablePagination: true
      },
      params: {
        progress: 'Approved',
        userId: null
      },
      page: { currentPage: 1, size: 10, total: 0 },
      pageConfig: {
        pageSizes: [10, 20, 30, 40, 50]
      },
      createOrgDailog: false,
      setElement: [
        {
          choice: 'WorkYear',
          target: 2
        },
        {
          choice: 'EmerType',
          target: 3
        },
        {
          choice: 'EducationalLevel',
          target: 4
        }
      ],
      WorkYear: [],
      getLevel: []
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    this.getTableData()
    getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
      this.$refs['searchPopover'].treeDataUpdateFun(res, 'orgId')
    })
    getPost().then((res) => {
      this.searchConfig.popoverOptions[1].options = res
    })
    this.$store.dispatch('CommonDict', 'WorkYear').then((res) => {
      this.WorkYear = res
    })
    this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
      this.getLevel = res
    })
    this.getDictionarygroup()
  },
  methods: {
    getEducationalLevel(type) {
      let typeWord
      this.getLevel.forEach((item) => {
        if (item.dictKey === type) {
          typeWord = item.dictValue
        }
      })
      return typeWord
    },
    getWorkYear(type) {
      let typeWord
      this.WorkYear.forEach((item) => {
        if (item.dictKey === type) {
          typeWord = item.dictValue
        }
      })
      return typeWord
    },
    init(progress) {
      this.params.progress = progress.trim()
      this.getTableData()
    },
    getTableData(params) {
      if (typeof params === 'undefined') params = this.params
      this.decorator(params)
      getMyRecruitment(params).then((res) => {
        this.data = res.data
        this.page.total = res.totalPage
      })
    },
    decorator(params) {
      params.pageNo = this.page.currentPage
      params.pageSize = this.page.size
      params.userId = this.userId
      params.progress = this.params.progress
      return params
    },

    handleSubmit(params) {
      this.decorator(params)
      getMyRecruitment(params).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    jumpToDetail(id) {
      this.$router.push({ path: '/personnel/recruit/staffList', query: { id: id } })
    },
    JumpNewlybuild(id) {
      this.$router.push({
        path: '/personnel/recruit/recruitmentNeeds',
        query: { id: id }
      })
    },
    currentPageChange(param) {
      let paramsInfo = {}
      paramsInfo.pageNo = param
      this.getTableData(paramsInfo)
    },
    getDictionarygroup() {
      this.setElement.forEach((item) => {
        this.$store.dispatch('CommonDict', item.choice).then((res) => {
          this.searchConfig.popoverOptions[item.target].options = res
        })
      })
    },
    JumpChange() {
      this.$router.push({
        path: '/personnel/recruit/components/chang'
      })
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
.bigText {
  font-weight: 500;
  font-size: 18px;
}

.resetEdge {
  position: absolute;
  right: 20px;
}
</style>

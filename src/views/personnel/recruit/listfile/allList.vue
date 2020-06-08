<template>
  <div>
    <common-table
      :data="data"
      :page="page"
      :columns="columns"
      :page-config="pageConfig"
      :config="tableConfig"
      @current-page-change="currentPageChange"
      @page-size-change="sizeChange"
      @expand-change="recruitmentSituation"
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
              icon="el-icon-refresh-right"
              size="medium"
              class="topBtn"
              type="text"
              @click="getTableData"
            />
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
          @click="jumpToDetail(row)"
        >
          {{ row.id }}
        </el-button>
      </template>
      <template
        v-if="params.progress === 'Approved'"
        slot="handler"
        slot-scope="{ row }"
      >
        <el-button
          size="medium"
          type="text"
          @click="handleEdit(row)"
        >
          {{ row.status == 'UnHandle' ? '分配' : '重新分配' }}
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
        slot="status"
        slot-scope="{ row }"
      >
        <el-tag
          v-if="row.status === 'Handled'"
          size="medium"
          type="primary"
          plain
        >
          {{ isStatus(row.status) }}
        </el-tag>
        <el-tag
          v-else
          size="medium"
          type="danger"
          plain
        >
          {{ isStatus(row.status) }}
        </el-tag>
      </template>
      <template
        slot="expand"
        slot-scope="{ row }"
      >
        <div v-loading="row.loading">
          <el-row
            :gutter="20"
            type="flex"
          >
            <el-col
              :span="5"
              class="internalDetails"
            >
              招聘人员
            </el-col>
            <el-col
              :span="5"
              class="internalDetails"
            >
              任务数
            </el-col>
            <el-col
              :span="5"
              class="internalDetails"
            >
              入职数
            </el-col>
            <el-col
              :span="5"
              class="internalDetails"
            >
              候选人数
            </el-col>
            <el-col
              :span="4"
              class="internalDetails noborder "
            >
              招聘进度
            </el-col>
          </el-row>
          <el-row
            v-for="item in row.detail"
            :key="item.userId"
            :gutter="20"
            type="flex"
          >
            <el-col
              :span="5"
              class="taskInformation"
            >
              {{ item.name }}
            </el-col>
            <el-col
              :span="5"
              class="taskInformation"
            >
              {{ item.taskNum }}
            </el-col>
            <el-col
              :span="5"
              class="taskInformation"
            >
              {{ item.entryNum }}
            </el-col>
            <el-col
              :span="5"
              class="taskInformation"
            >
              {{ item.candidateNum }}
            </el-col>
            <el-col
              :span="4"
              class="taskInformation   isBlue  noborder"
            >
              {{ getPercent(item.taskNum, item.entryNum) }}
            </el-col>
          </el-row>
        </div>
      </template>
    </common-table>

    <again
      ref="Again"
      :visible.sync="createAgain"
      @getTableData="getTableData"
    />
    <assigned
      ref="Assigned"
      :visible.sync="createAssigned"
      @getTableData="getTableData"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchPopover from '@/components/searchPopOver/index'
import { getAllRecruitment, getPost, queryDistribution } from '@/api/personnel/recruitment'
import { getOrgTreeSimple } from '@/api/org/org'
import Again from '@/views/personnel/recruit/details/again'
import Assigned from '@/views/personnel/recruit/details/Assigned'
export default {
  name: 'AllList',
  components: {
    SearchPopover,
    Again,
    Assigned
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
            data: '',
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
          },
          {
            type: 'select',
            field: 'status',
            label: '需求状态',
            data: '',
            options: [
              { value: 'UnHandle', label: '待分配' },
              { value: 'Handled', label: '已分配' }
            ],
            config: { optionLabel: '', optionValue: '' }
          }
        ]
      },
      data: [],
      columns: [
        {
          prop: 'expand',
          type: 'expand',
          slot: true
        },
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
          label: '需求状态',
          prop: 'status',
          slot: true
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
      createAgain: false,
      createAssigned: false,
      setElement: [
        {
          choice: 'WorkYear',
          target: 2
        },
        {
          choice: 'EmerType',
          target: 4
        }
      ],
      WorkYear: [],
      getLevel: [],
      management: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
      this.searchConfig.popoverOptions[0].config.treeParams.data.push(...res)
      this.$refs['searchPopover'].treeDataUpdateFun(res, 'orgId')
    })
  },
  mounted() {
    this.getTableData()

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
    getWorkProperty(type) {
      let typeWord
      this.WorkProperty.forEach((item) => {
        if (item.dictKey === type) {
          typeWord = item.dictValue
        }
      })
      return typeWord
    },
    init(progress) {
      this.params.progress = progress
      this.getTableData()
    },
    getTableData(params) {
      if (typeof params === 'undefined') params = this.params
      this.decorator(params)
      getAllRecruitment(params).then((res) => {
        this.data = res.data.map((item) => ({ ...item, detail: [], loading: false }))
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
      getAllRecruitment(params).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    jumpToDetail(row) {
      let { id, status } = row
      let rotate
      if (row.status === 'Handled') {
        rotate = 'allHandled'
      } else {
        rotate = 'allUnHandle'
      }
      this.$router.push({
        path: '/personnel/recruit/specificPage',
        query: { id: id, status: status, rotate: rotate }
      })
    },
    currentPageChange(param) {
      this.page.currentPage = param
      this.getTableData()
    },
    sizeChange(pageSize) {
      this.page.size = pageSize
      this.getTableData()
    },
    getDictionarygroup() {
      this.setElement.forEach((item) => {
        this.$store.dispatch('CommonDict', item.choice).then((res) => {
          this.searchConfig.popoverOptions[item.target].options = res
        })
      })
      this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
        this.searchConfig.popoverOptions[3].options = res
      })
    },
    handleEdit(row) {
      if (row.status === 'Handled') {
        this.$refs.Assigned.init(row)
      } else {
        this.$refs.Again.init(row)
      }
    },
    isStatus(status) {
      let typeStatus
      let calcStatus = [
        {
          label: '待分配',
          value: 'UnHandle'
        },
        {
          label: '已分配',
          value: 'Handled'
        },
        {
          label: '审批中',
          value: 'Approve'
        }
      ]
      calcStatus.forEach((item) => {
        if (item.value === status) {
          typeStatus = item.label
        }
      })
      return typeStatus
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
    getEducationalLevel(type) {
      let typeWord
      this.getLevel.forEach((item) => {
        if (item.dictKey === type) {
          typeWord = item.dictValue
        }
      })
      return typeWord
    },
    recruitmentSituation(row) {
      if (!row.detail || row.detail.length === 0) {
        row.loading = true

        queryDistribution({ recruitmentId: row.id }).then((res) => {
          row.detail = res
          row.loading = false
        })
      }
    },
    getPercent(curNum, totalNum) {
      curNum = parseFloat(curNum)
      totalNum = parseFloat(totalNum)
      if (isNaN(curNum) || isNaN(totalNum)) {
        return '-'
      }
      return Math.round((totalNum / curNum) * 10000) / 100 + '%'
    }
  }
}
</script>

<style lang="scss" scoped>
.isBlue {
  color: #207efa !important;
}

.bigText {
  font-weight: 500;
  font-size: 18px;
}

.resetEdge {
  position: absolute;
  right: 62px;
  margin-top: 3px;
}

/deep/ .el-table__expanded-cell[class*='cell'] {
  padding: 8px 50px !important;
}
.noborder {
  border: none !important;
}

.internalDetails {
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #a0a8ae;
  padding-left: 23px !important;
  border-right: 1px solid #ccc;
  margin: 0;
}

.taskInformation {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #202940;
  line-height: 20px;
  padding-left: 23px !important;
  border-right: 1px solid #ccc;
  margin: 0;
}
</style>

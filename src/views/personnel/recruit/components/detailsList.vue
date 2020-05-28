/* eslint-disable no-unused-vars */
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
    </common-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchPopover from '@/components/searchPopOver/index'
import { getMyRecruitment } from '@/api/personnel/recruitment'
import { getOrgTreeSimple } from '@/api/org/org'
export default {
  name: 'RecruitList',
  components: {
    SearchPopover
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
            config: {},
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
          prop: 'workYear'
        },
        {
          label: '学历要求',
          prop: 'educationalLevel'
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
        showHandler: false,
        showIndexColumn: false,
        enableMultiSelect: false,
        enablePagination: true
      },
      params: {
        pageNo: 1,
        pageSize: 10,
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
      ]
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.getTableData()
    getOrgTreeSimple({ orgId: 0 }).then((res) => {
      this.$refs['searchPopover'].treeDataUpdateFun(res, 'orgId')
    })
    this.getDictionarygroup()
  },
  methods: {
    init(row) {
      this.params.progress = row.trim()
      this.getTableData()
    },
    getTableData(params) {
      if (typeof params === 'undefined') params = this.params
      params.userId = this.userId
      params.progress = this.params.progress
      getMyRecruitment(params).then((res) => {
        this.data = res.data
      })
    },

    Decorator(paramsData) {
      let request = {
        jobName: paramsData.jobName || '',
        pageNo: paramsData.pageNo || 1,
        pageSize: paramsData.pageSize || 10,
        positionId: paramsData.positionId || '',
        workYear: paramsData.paramsData || '',
        educationalLevel: paramsData.educationalLevel || '',
        reason: paramsData.reason || '',
        emerType: paramsData.emerType || '',
        beginJoinDate: paramsData.beginJoinDate || '',
        endJoinDate: paramsData.endJoinDate || ''
      }
      return request
    },

    handleSubmit(params) {
      let request = this.Decorator(params)
      getMyRecruitment(request).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    jumpToDetail(id) {
      this.$router.push(`/personnel/recruit/details/staffList/${id}`)
    },
    currentPageChange(param) {
      let paramsInfo = {}
      paramsInfo.pageNo = param
      return this.getTableData(paramsInfo)
    },

    getDictionarygroup() {
      this.setElement.forEach((item) => {
        this.$store.dispatch('CommonDict', item.choice).then((res) => {
          this.searchConfig.popoverOptions[item.target].options = res
        })
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
.state {
  display: flex;
  padding: 0 6px;
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
      cursor: pointer;
      .bottomBox {
        height: 2px;
        width: 68px;
        background: #207efa;
        margin: 0 auto;
        margin-top: 28px;
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

.bigText {
  font-weight: 500;
  font-size: 18px;
}

.resetEdge {
  position: absolute;
  right: 20px;
}
</style>

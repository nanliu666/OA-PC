<template>
  <div>
    <div class="roster-header">
      <el-row
        style="width:100%;"
        type="flex"
        justify="center"
        :gutter="24"
      >
        <el-col :span="3">
          <el-button
            type="text"
            class="bigText"
          >
            我提交的招聘需求
          </el-button>
        </el-col>
        <el-col :span="19">
          <el-button
            type="text"
            class="bigText"
          >
            全部招聘需求
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            type="text"
            class="bigText"
            @click="jumpToDetail"
          >
            新建招聘需求
          </el-button>
        </el-col>
      </el-row>
    </div>
    <basic-container>
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="招聘中"
          name="inrecruitment"
        >
          <common-table
            :data="data"
            :columns="columns"
            @pageSizeChange="getTableData"
            @currentPageChange="getTableData"
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
                <div class="edge">
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
              v-if="scope.row.isDefault === 0"
              slot="handler"
              slot-scope="scope"
            >
              <el-button
                type="text"
                size="medium"
                @click.stop="handleEdit(scope.row, scope.index)"
              >
                编辑
              </el-button>
              <el-button
                type="text"
                size="medium"
                @click.stop="handleDelete(scope.row, scope.index)"
              >
                删除
              </el-button>
            </template>
          </common-table>
        </el-tab-pane>
        <el-tab-pane
          label="已结束"
          name="Finished                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             "
        >
          配置管理
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
import SearchPopover from '@/components/searchPopOver/index'
import { getMyRecruitment } from '@/api/personnel/recruitment'
import { getOrgJob } from '@/api/personnel/roster'

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
            field: 'search',
            label: '',
            data: [],
            month: [],
            config: {
              placeholder: '姓名/工号'
            }
          }
        ],
        popoverOptions: [
          {
            type: 'treeSelect',
            field: 'parentOrgId',
            label: '部门',
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
            label: '职位',
            field: 'jobs',
            arrField: 'jobId',
            config: {},
            options: [],
            loading: false,
            noMore: false,
            firstLoad(flag, item) {
              if (flag && item.options.length === 0) {
                item.loadMoreFun(item)
              }
            },
            loadMoreFun(item) {
              if (item.loading || item.noMore) return
              item.loading = true
              getOrgJob().then((res) => {
                if (res.length > 0) {
                  item.options.push(...res)
                  item.noMore = true
                }
              })
            }
          },
          {
            type: 'dataPicker',
            data: '',
            label: '入职日期',
            field: 'beginEntryDate,endEntryDate',
            config: { type: 'daterange', 'range-separator': '至' }
          },
          {
            type: 'dataPicker',
            data: '',
            label: '转正日期',
            field: 'beginFormalDate,endFormalDate',
            config: { type: 'daterange', 'range-separator': '至' }
          },
          {
            type: 'select',
            field: 'probation',
            data: '',
            label: '试用期',
            options: [
              { label: '无试用期', value: 0 },
              { label: '一个月', value: 1 },
              { label: '两个月', value: 2 },
              { label: '三个月', value: 3 },
              { label: '四个月', value: 4 },
              { label: '五个月', value: 5 },
              { label: '六个月', value: 6 }
            ],
            config: {}
          },
          {
            type: 'select',
            field: 'orgType',
            data: '',
            label: '申请状态',
            options: [
              { label: '未申请', value: 0 },
              { label: '已驳回', value: 1 },
              { label: '申请中', value: 2 }
            ],
            config: {}
          }
        ]
      },
      createOrgDailog: false,
      numberofpersonnel: null,
      number: 0,
      row: {},
      data: [],
      columns: [
        {
          label: '需求编号',
          prop: 'id'
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
      params: {
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData(params) {
      if (typeof params === 'undefined') params = this.params
      getMyRecruitment(params).then((res) => {
        this.data = res.data
        this.numberofpersonnel = res.totalNum
      })
    },

    Decorator(paramsData) {
      let request = {
        search: paramsData.search || '',
        pageNo: 1,
        pageSize: 10,
        orgs: [paramsData.parentOrgId] || ' ',
        jobs: [...paramsData.jobs] || ' ',
        probations: [paramsData.probation] || ' '
      }
      request.beginEntryDate = paramsData.beginEntryDate
      request.endEntryDate = paramsData.endEntryDate
      request.beginFormalDate = paramsData.beginFormalDate
      request.endFormalDate = paramsData.endFormalDate

      return request
    },

    handleSubmit(params) {
      let request = this.Decorator(params)
      return this.getTableData(request)
    },
    jumpToDetail() {
      this.$router.push('/personnel/recruit/recruitmentNeeds')
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
</style>

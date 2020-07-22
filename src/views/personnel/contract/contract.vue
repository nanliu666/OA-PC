<template>
  <div>
    <!--    <div class="header">-->
    <!--      <div>合同管理</div>-->
    <!--    </div>-->
    <pageHeader title="合同管理" />
    <basic-container>
      <div v-loading="loading">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            label="已签订合同"
            name="1"
          >
            <signed
              :table-data="signedData"
              :pages="page"
              :columns="signedColumns"
              @sizeChange="sizeChangeAlready"
              @currentChange="currentChangeAlready"
            >
              <template
                v-if="signedtotalNum"
                slot="nav"
              >
                <nav
                  v-if="show"
                  class="nav"
                >
                  <span
                    class="flex flex-flow justify-content"
                    style="padding: 10px 0"
                  >
                    <span><i
                      class="el-icon-warning"
                      style="font-size:16px;color:#EED30B;"
                    />到期提醒
                    </span>
                    <span class="flex flex-flow-column flex-items">
                      <span
                        class="flex flex-flow flex-items"
                      >：近2个月内共有 {{ signedtotalNum }} 名员工合同即将到期
                        <el-link
                          style="margin:0 10px;"
                          type="primary"
                          @click="handleLook"
                        >查看</el-link></span>
                    </span>
                  </span>
                  <!--        <span-->
                  <!--          class="el-icon-close"-->
                  <!--          style="color:#207EFA;font-size: 20px"-->
                  <!--          @click="close"-->
                  <!--        />-->
                </nav>
              </template>
              <template v-slot:screen>
                <SearchPopover
                  ref="searchPopover"
                  :require-options="searchConfig.requireOptions"
                  :popover-options="searchConfig.popoverOptions"
                  @submit="handleSubmit"
                />
              </template>
              <template slot="refresh">
                <span
                  class="icon  el-icon-refresh-right"
                  @click="refresh"
                />
              </template>
              <template
                slot="operation"
                slot-scope="scope"
              >
                <el-button
                  type="text"
                  size="medium"
                  @click.stop="handleRenewal(scope.row, scope.index)"
                >
                  续签合同
                </el-button>
                <el-button
                  type="text"
                  size="medium"
                  @click.stop="handleEdit(scope.row, 'edit')"
                >
                  编辑
                </el-button>
              </template>
            </signed>
          </el-tab-pane>
          <el-tab-pane
            label="待处理合同"
            name="2"
          >
            <signed
              :table-data="todoData"
              :pages="pageT"
              :columns="todoColumns"
              @sizeChange="sizeChangeTodo"
              @currentChange="currentChangeTodo"
            >
              <template
                v-if="signedTodoTotalNum"
                slot="nav"
              >
                <nav
                  v-if="show"
                  class="nav"
                >
                  <span
                    class="flex flex-flow justify-content"
                    style="padding: 10px 0"
                  >
                    <span><i
                      class="el-icon-warning"
                      style="font-size:16px;color:#EED30B;"
                    />未续签提醒
                    </span>
                    <span class="flex flex-flow-column flex-items">
                      <span
                        class="flex flex-flow flex-items"
                      >： {{ signedTodoTotalNum }} 名员工合同到期未续签
                        <el-link
                          style="margin:0 10px;"
                          type="primary"
                          @click="handleLookTodo"
                        >查看</el-link></span>
                    </span>
                  </span>
                </nav>
              </template>
              <template v-slot:screen>
                <SearchPopover
                  ref="searchPopoverTodo"
                  :require-options="searchConfigTodo.requireOptions"
                  :popover-options="searchConfigTodo.popoverOptions"
                  @submit="handleSubmitTodo"
                />
              </template>
              <template slot="refresh">
                <span
                  class="icon  el-icon-refresh-right"
                  @click="refreshTodo"
                />
              </template>
              <template
                slot="operation"
                slot-scope="scope"
              >
                <el-button
                  v-if="scope.row.contractStatus === contractStatus[2]"
                  type="text"
                  size="medium"
                  @click.stop="handleRenewal(scope.row, scope.index)"
                >
                  续签合同
                </el-button>
                <el-button
                  v-if="scope.row.contractStatus === contractStatus[3]"
                  type="text"
                  size="medium"
                  @click.stop="handleEdit(scope.row)"
                >
                  签订合同
                </el-button>
              </template>
            </signed>
          </el-tab-pane>
          <el-tab-pane
            label="合同签订记录"
            name="3"
          >
            <signed
              :table-data="recordData"
              :pages="pageR"
              :table-config="recordTableConfig"
              :columns="recordColumns"
              @sizeChange="sizeChangeR"
              @currentChange="currentChangeR"
            >
              <template v-slot:screen>
                <SearchPopover
                  ref="searchPopover"
                  :require-options="searchConfigR.requireOptions"
                  :popover-options="searchConfigR.popoverOptions"
                  @submit="handleSubmitRecord"
                />
              </template>
              <template slot="refresh">
                <span
                  class="icon  el-icon-refresh-right"
                  @click="refreshR"
                />
              </template>
            </signed>
          </el-tab-pane>
        </el-tabs>
        <div />
      </div>
    </basic-container>
  </div>
</template>

<script>
import mixin from './components/mixin'
import signed from '@/views/personnel/contract/components/signed'
import { postSigned, postContractRecord, postContractTodo } from '@/api/personnel/contart'
import SearchPopover from '@/components/searchPopOver/index'
import {
  searchConfig,
  searchConfigTodo,
  searchConfigRecord
} from '@/views/personnel/contract/components/searchConfig'
import { getJob, getTree } from '@/api/personnel/selectedPerson'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  name: 'Cantract',
  components: {
    signed,
    SearchPopover
  },
  mixins: [mixin],
  data() {
    return {
      signedColumns: [
        {
          label: '姓名',
          width: 120,
          prop: 'name',
          slot: true
        },
        {
          label: '工号',
          width: 120,
          prop: 'workNo'
        },
        {
          label: '部门',
          prop: 'orgName',
          width: 120
        },
        {
          label: '职位',
          width: 120,
          prop: 'jobName'
        },
        {
          label: '岗位',
          width: 120,
          prop: 'positionName'
        },
        {
          label: '工作性质',
          width: 120,
          prop: 'workProperty',
          slot: true
        },
        {
          label: '员工状态',
          width: 120,
          prop: 'status',
          slot: true
        },
        {
          label: '入职日期',
          width: 120,
          prop: 'entryDate'
        },
        {
          label: '手机号码',
          prop: 'phonenum',
          width: 120
        },
        {
          label: '合同公司',
          width: 120,
          prop: 'contractName'
        },
        {
          label: '合同编号',
          width: 120,
          prop: 'contractCode'
        },
        {
          label: '合同类型',
          width: 120,
          prop: 'contractType',
          slot: true
        },
        {
          label: '合同状态',
          prop: 'contractStatus',
          width: 120,
          slot: true
        },
        {
          label: '合同开始日期',
          prop: 'beginContractDate',
          width: 120
        },
        {
          label: '合同结束日期',
          prop: 'endContractDate',
          width: 120
        },
        {
          label: '合同签订日期',
          prop: 'signDate',
          width: 120
        },
        {
          label: '合同签订次数',
          prop: 'signNum',
          width: 120
        }
      ],
      todoColumns: [
        {
          label: '姓名',
          width: 120,
          prop: 'name',
          slot: true
        },
        {
          label: '工号',
          width: 120,
          prop: 'workNo'
        },
        {
          label: '部门',
          prop: 'orgName',
          width: 120
        },
        {
          label: '职位',
          width: 120,
          prop: 'jobName'
        },
        {
          label: '岗位',
          width: 120,
          prop: 'positionName'
        },
        {
          label: '工作性质',
          width: 120,
          prop: 'workProperty',
          slot: true
        },
        {
          label: '员工状态',
          width: 120,
          prop: 'status',
          slot: true
        },
        {
          label: '入职日期',
          width: 120,
          prop: 'entryDate'
        },
        {
          label: '手机号码',
          prop: 'phonenum',
          width: 120
        },
        {
          label: '合同公司',
          width: 120,
          prop: 'contractName'
        },
        {
          label: '合同编号',
          width: 120,
          prop: 'contractCode'
        },
        {
          label: '合同类型',
          width: 120,
          prop: 'contractType',
          slot: true
        },
        {
          label: '合同状态',
          prop: 'contractStatus',
          width: 120,
          slot: true
        },
        {
          label: '合同开始日期',
          prop: 'beginContractDate',
          width: 120
        },
        {
          label: '合同结束日期',
          prop: 'endContractDate',
          width: 120
        },
        {
          label: '合同签订日期',
          prop: 'signDate',
          width: 120
        },
        {
          label: '合同签订次数',
          prop: 'signNum',
          width: 120
        }
      ],
      recordColumns: [
        {
          label: '姓名',
          width: 120,
          prop: 'name',
          slot: true
        },
        {
          label: '工号',
          width: 120,
          prop: 'workNo'
        },
        {
          label: '部门',
          prop: 'orgName',
          width: 120
        },
        {
          label: '职位',
          width: 120,
          prop: 'jobName'
        },
        {
          label: '岗位',
          width: 120,
          prop: 'positionName'
        },
        {
          label: '工作性质',
          width: 120,
          prop: 'workProperty',
          slot: true
        },
        {
          label: '员工状态',
          width: 120,
          prop: 'status',
          slot: true
        },
        {
          label: '入职日期',
          width: 120,
          prop: 'entryDate'
        },
        {
          label: '手机号码',
          prop: 'phonenum',
          width: 120
        },
        {
          label: '合同公司',
          width: 150,
          prop: 'contractName'
        },
        {
          label: '合同编号',
          width: 120,
          prop: 'contractCode'
        },
        {
          label: '合同类型',
          width: 120,
          prop: 'contractType',
          slot: true
        },
        {
          label: '合同状态',
          prop: 'contractStatus',
          width: 120,
          slot: true
        },
        {
          label: '合同开始日期',
          prop: 'beginContractDate',
          width: 120
        },
        {
          label: '合同结束日期',
          prop: 'endContractDate',
          width: 120
        },
        {
          label: '合同签订日期',
          prop: 'signDate',
          width: 120
        }
      ],
      recordTableConfig: {
        showHandler: false,
        enablePagination: true,
        handlerColumn: {
          width: 120
        }
      },
      signedtotalNum: 0,
      signedTodoTotalNum: 0,
      activeName: '1',
      form: {
        name: ''
      },
      contractStatus: ['UnExecute', 'InExecute', 'Expired', 'UnSign', 'Relieve'],
      Status: {
        UnExecute: '未执行',
        InExecute: '执行中',
        Expired: '已到期',
        UnSign: '未签订',
        Relieve: '已解除'
      },
      searchConfig: searchConfig,
      searchConfigR: searchConfigRecord,
      searchConfigTodo: searchConfigTodo,
      signedData: [],
      selectionList: [],
      loading: false,
      isEdit: false,
      isShow: false,
      title: '',
      stationDialog: false,
      dialogVisible: false,
      isBatch: false,
      show: true,
      number: 0,
      row: {},
      data: [],
      searchForm: {},
      searchFormRecord: {},
      searchFormTodo: {},
      recordData: [],
      todoData: [],
      params: {
        pageNo: 1,
        pageSize: 10
      },
      paramsTodo: {
        pageNo: 1,
        pageSize: 10
      },
      paramsRecord: {
        pageNo: 1,
        pageSize: 10
      },
      pageT: {
        pageSize: 2,
        pagerCount: 1,
        total: 10
      },
      pageR: {
        pageSize: 2,
        pagerCount: 1,
        total: 10
      },
      endDate: '',
      endDateTodo: ''
    }
  },
  watch: {
    'infoForm.contractBeginDate': {
      handler(val) {
        if (val && this.infoForm.contractPeriod) {
          this.infoForm.contractEndDate = moment(val)
            .add(this.infoForm.contractPeriod, 'Y')
            .format('YYYY-MM-DD')
        }
      },
      immediate: true,
      deep: true
    },
    'infoForm.contractPeriod': {
      handler(val) {
        if (val && this.infoForm.contractBeginDate) {
          this.infoForm.contractEndDate = moment(this.infoForm.contractBeginDate)
            .add(this.infoForm.contractPeriod, 'Y')
            .format('YYYY-MM-DD')
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.getData()
    this.getRecordData()
    this.getTodoData()
    this.getTowData()
    this.getTowTodoData()
    this.getJob()
    this.getTree()

    this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
      this.searchConfig.popoverOptions[3].options = res
      this.searchConfigR.popoverOptions[3].options = res
      this.searchConfigTodo.popoverOptions[3].options = res
    })
    this.$store.dispatch('CommonDict', 'ContractType').then((res) => {
      this.searchConfig.popoverOptions[7].options = res
      this.searchConfigR.popoverOptions[7].options = res
    })
  },
  activated() {
    this.getData()
    this.getRecordData()
    this.getTodoData()
  },
  methods: {
    getTree() {
      let params = {
        parentOrgId: '0'
      }
      getTree(params).then((res) => {
        this.searchConfig.popoverOptions[1].config.treeParams.data = res
        this.searchConfigR.popoverOptions[1].config.treeParams.data = res
        this.searchConfigTodo.popoverOptions[1].config.treeParams.data = res
      })
    },
    /***
     * @author 关芬达
     * @desc 获取职位
     * */
    getJob() {
      let params = {
        jobName: '',
        orgId: ''
      }
      getJob(params).then((res) => {
        this.searchConfig.popoverOptions[2].options = res
        this.searchConfigR.popoverOptions[2].options = res
        this.searchConfigTodo.popoverOptions[2].options = res
      })
    },
    /***
     * @author 关芬达
     * @desc 差看最近两个月过期合同
     *
     */
    handleLook() {
      let beginEndDate = moment().format('YYYY-MM-DD')
      this.endEndDate = moment()
        .add(2, 'M')
        .format('YYYY-MM-DD')
      this.searchConfig.popoverOptions.forEach((item) => {
        if (item.field === 'beginEndDate,endEndDate') {
          item.data = [beginEndDate, this.endEndDate]
        }
      })
      this.getData(beginEndDate, this.endEndDate)
    },
    handleLookTodo() {
      // let beginEndDate = moment().format('YYYY-MM-DD')
      // this.endDateTodo = moment()
      //   .add(2, 'M')
      //   .format('YYYY-MM-DD')
      this.$refs.searchPopoverTodo.resetForm()
      this.searchConfigTodo.popoverOptions.forEach((item) => {
        if (item.field === 'contractStatuses') {
          item.data = ['Expired']
        }
      })

      this.$refs.searchPopoverTodo.submitSearch()
      // this.getTodoData()
    },
    refresh() {
      this.getData()
    },

    getTowData() {
      let beginEndDate = moment().format('YYYY-MM-DD')
      let endEndDate = moment()
        .add(2, 'M')
        .format('YYYY-MM-DD')
      let params = {
        pageNo: 1,
        pageSize: 10,
        beginEndDate,
        endEndDate,
        ...this.searchForm
      }
      postSigned(params).then((res) => {
        // console.log(res)
        this.signedtotalNum = res.totalNum
      })
    },

    /***
     * @author guanfenda
     * @desc 获取table数据
     *
     */
    getData(beginEndDate, endEndDate) {
      let params = {
        ...this.params,
        ...this.searchForm
      }
      if (endEndDate) {
        params = {
          ...this.params,
          beginEndDate,
          endEndDate
        }
      }
      this.loading = true
      postSigned(params).then((res) => {
        // console.log(res)
        this.loading = false
        this.signedData = res.data
        this.page.total = res.totalNum
      })
    },
    sizeChangeAlready(val) {
      this.params.pageSize = val
      this.getData()
    },
    currentChangeAlready(val) {
      this.params.pageNo = val
      this.getData()
    },
    getTowTodoData() {
      let params = {
        pageNo: 1,
        pageSize: 10,
        contractStatuses: ['Expired'],
        ...this.searchFormTodo
      }
      postContractTodo(params).then((res) => {
        this.signedTodoTotalNum = res.totalNum
      })
    },
    getTodoData(beginEndDate, endEndDate) {
      let params = {
        ...this.paramsTodo,
        ...this.searchFormTodo
      }
      if (endEndDate) {
        params = {
          ...this.params,
          beginEndDate,
          endEndDate
        }
      }
      this.loading = true
      postContractTodo(params).then((res) => {
        this.loading = false
        this.todoData = res.data
        this.pageT.total = res.totalNum
      })
    },
    refreshTodo() {
      this.getTodoData()
    },
    handleSubmitTodo(data) {
      this.searchFormTodo = data
      this.getTodoData()
    },
    sizeChangeTodo(val) {
      this.paramsTodo.pageSize = val
      this.getTodoData()
    },
    currentChangeTodo(val) {
      this.paramsTodo.pageNo = val
      this.getTodoData()
    },
    getRecordData() {
      let params = {
        ...this.paramsRecord,
        ...this.searchFormRecord
      }
      this.loading = true
      postContractRecord(params).then((res) => {
        this.loading = false
        this.recordData = res.data
        this.pageR.total = res.totalNum
      })
    },
    sizeChangeR(val) {
      this.paramsRecord.pageSize = val
      this.getRecordData()
    },
    currentChangeR(val) {
      this.paramsRecord.pageNo = val
      this.getRecordData()
    },
    handleSubmitRecord(data) {
      this.searchFormRecord = data
      // this.contracTypes
      this.getRecordData()
    },
    refreshR() {
      this.getRecordData()
    },
    search() {},
    handleClick() {},
    handleSubmit(data) {
      this.searchForm = data
      // this.contracTypes
      this.getData()
    },
    handleRenewal(row) {
      let params = {
        jobName: row.jobName,
        orgName: row.orgName,
        phonenum: row.phonenum,
        workNo: row.workNo,
        name: row.name,
        userId: row.userId,
        contractId: row.contractId
      }
      this.$router.push({
        path: '/personnel/contract/renewal',
        query: params
      })
    },
    handleEdit(row, edit) {
      let params = {
        jobName: row.jobName,
        orgName: row.orgName,
        phonenum: row.phonenum,
        workNo: row.workNo,
        name: row.name,
        userId: row.userId,
        contractId: row.contractId
      }
      if (edit) {
        params.edit = edit
      }
      this.$router.push({
        path: '/personnel/contract/signedContract',
        query: params
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avue-view {
  height: auto;
}
.flex {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
}
.flex-flow {
  flex-flow: row nowrap;
}
.flex-flow-w {
  flex-flow: row wrap;
}
.flex-flow-column {
  flex-flow: column nowrap;
}

.justify-content {
  justify-content: space-between;
}
.align-items {
  align-items: center;
}

.input-with-select {
  width: 250px;
}
.condition {
  margin: 20px 0 10px 0;
}

.all {
  /*border: 1px solid #efefef;*/
  cursor: pointer;
  padding: 10px;
  span:first-child {
    border-right: 1px solid #999;
    padding-right: 15px;
  }
  span {
    margin-right: 20px;
  }
}

/deep/ .el-card__body {
  padding-bottom: 0 !important;
}

/deep/ .avue-crud__menu {
  min-height: 0;
}
.icon {
  padding-left: 12px;
  font-size: 18px;
  color: #a0a8ae;
  cursor: pointer;
}
</style>

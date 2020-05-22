<template>
  <div style="height: 100%">
    <div class="roster-header">
      <div class="header">
        候选人管理
      </div>
      <el-dropdown @command="handleCommand">
        <el-button
          type="primary"
          size="medium"
        >
          添加候选人
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="add">
            单个添加候选人
          </el-dropdown-item>
          <!-- <el-dropdown-item>Excel导入候选人</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="state">
      <div class="on">
        <div
          class="onItem"
          @click="tabClick('all')"
        >
          <div class="status">
            <div
              :id="tabStatus === 'all' ? 'current' : ''"
              class="statusWork"
            >
              全部
            </div>
            <div
              :id="tabStatus === 'all' ? 'current' : ''"
              class="statusNum"
            >
              {{ getCandidateNum('all') }}人
            </div>
          </div>
          <div
            v-show="tabStatus === 'all'"
            class="bottomBox"
          />
        </div>
        <div
          class="onItem"
          @click="tabClick('1')"
        >
          <div class="status">
            <div
              :id="tabStatus === '1' ? 'current' : ''"
              class="statusWork"
            >
              待沟通
            </div>
            <div
              :id="tabStatus === '1' ? 'current' : ''"
              class="statusNum"
            >
              {{ getCandidateNum('1') }}人
            </div>
          </div>
          <div
            v-show="tabStatus === '1'"
            class="bottomBox"
          />
        </div>
        <div
          class="onItem"
          @click="tabClick('2')"
        >
          <div class="status">
            <div
              :id="tabStatus === '2' ? 'current' : ''"
              class="statusWork"
            >
              初选通过
            </div>
            <div
              :id="tabStatus === '2' ? 'current' : ''"
              class="statusNum"
            >
              {{ getCandidateNum('2') }}人
            </div>
          </div>
          <div
            v-show="tabStatus === '2'"
            class="bottomBox"
          />
        </div>
        <div
          class="onItem"
          @click="tabClick('3')"
        >
          <div class="status">
            <div
              :id="tabStatus === '3' ? 'current' : ''"
              class="statusWork"
            >
              面试中
            </div>
            <div
              :id="tabStatus === '3' ? 'current' : ''"
              class="statusNum"
            >
              {{ getCandidateNum('3') }}人
            </div>
          </div>

          <div
            v-show="tabStatus === '3'"
            class="bottomBox"
          />
        </div>
        <div
          class="onItem"
          @click="tabClick('4')"
        >
          <div class="status">
            <div
              :id="tabStatus === '4' ? 'current' : ''"
              class="statusWork"
            >
              面试通过
            </div>
            <div
              :id="tabStatus === '4' ? 'current' : ''"
              class="statusNum"
            >
              {{ getCandidateNum('4') }}人
            </div>
          </div>

          <div
            v-show="tabStatus === '4'"
            class="bottomBox"
          />
        </div>
        <div
          class="onItem"
          @click="tabClick('5')"
        >
          <div class="status">
            <div
              :id="tabStatus === '5' ? 'current' : ''"
              class="statusWork"
            >
              待发Offer
            </div>
            <div
              :id="tabStatus === '5' ? 'current' : ''"
              class="statusNum"
            >
              {{ getCandidateNum('5') }}人
            </div>
          </div>

          <div
            v-show="tabStatus === '5'"
            class="bottomBox"
          />
        </div>
        <div
          class="onItem"
          @click="tabClick('6')"
        >
          <div class="status">
            <div
              :id="tabStatus === '6' ? 'current' : ''"
              class="statusWork"
            >
              已发Offer
            </div>
            <div
              :id="tabStatus === '6' ? 'current' : ''"
              class="statusNum"
            >
              {{ getCandidateNum('6') }}人
            </div>
          </div>

          <div
            v-show="tabStatus === '6'"
            class="bottomBox"
          />
        </div>
      </div>
      <div class="left">
        <div
          :id="tabStatus === '0' ? 'current' : ''"
          class="onItem"
          @click="tabClick('0')"
        >
          <div class="status">
            <div
              :id="tabStatus === '0' ? 'current' : ''"
              class="statusWork"
            >
              已淘汰
            </div>
            <div
              :id="tabStatus === '0' ? 'current' : ''"
              class="statusNum"
            >
              {{ getCandidateNum('0') }}人
            </div>
          </div>

          <div
            v-show="tabStatus === '0'"
            class="bottomBox"
          />
        </div>
      </div>
    </div>
    <basic-container>
      <common-table
        ref="commonTable"
        style="width: 100%;height:100%"
        :data="data"
        :page="page"
        :loading="loading"
        :config="tableConfig"
        :columns="columns"
        @current-page-change="currentChange"
        @page-size-change="sizeChange"
      >
        <template slot="topMenu">
          <div style="display: flex;justify-content: space-between;">
            <search-popover
              ref="searchPopover"
              :require-options="searchConfig.requireOptions"
              :popover-options="searchConfig.popoverOptions"
              @submit="handleSubmit"
            />
            <div>
              <el-button
                icon="el-icon-upload2"
                size="medium"
                class="topBtn"
                type="text"
                @click="handleExport"
              >
                导出
              </el-button>
              <el-button
                icon="el-icon-refresh-right"
                size="medium"
                class="topBtn"
                type="text"
                @click="handleRefresh"
              />
              <el-popover
                placement="bottom"
                width="40"
                trigger="click"
                style="margin:0 12px"
              >
                <div class="checkColumn">
                  <el-checkbox-group
                    v-model="checkColumn"
                    @change="columnChange"
                  >
                    <el-checkbox
                      v-for="item in originColumn"
                      :key="item.prop"
                      :label="item.prop"
                      :disabled="item.prop === 'name' || item.prop === 'jobName'"
                      class="originColumn"
                    >
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
                <el-button
                  slot="reference"
                  icon="el-icon-setting"
                  size="medium"
                  class="topBtn"
                  type="text"
                />
              </el-popover>
            </div>
          </div>
        </template>
        <template slot="multiSelectMenu">
          <!-- slot-scope="{ selection }" -->
          <!-- <el-button type="text" style="margin-bottom:0;" @click="handlerDeleteAll(selection)">
            <i class="el-icon-delete" />批量淘汰
          </el-button>-->
          <!-- 待沟通 -->
          <!-- <el-button
            v-show="tabStatus === '1'"
            type="text"
            style="margin-bottom:0;"
            @click="hadlePushAudit(selection)"
          >
            <i class="el-icon-coordinate" />批量推送审核
          </el-button> -->
          <!-- 初选通过 -->
          <el-button
            v-show="tabStatus === '2'"
            type="text"
            style="margin-bottom:0;"
          >
            <i class="el-icon-coordinate" />批量安排面试
          </el-button>
          <!-- 面试中 -->
          <el-button
            v-show="tabStatus === '3'"
            type="text"
            style="margin-bottom:0;"
          >
            <i class="el-icon-coordinate" />批量重新安排面试
          </el-button>
          <el-button
            v-show="tabStatus === '3'"
            type="text"
            style="margin-bottom:0;"
          >
            <i class="el-icon-coordinate" />批量发送面试登记表
          </el-button>
          <!-- 面试通过 -->
          <el-button
            v-show="tabStatus === '4'"
            type="text"
            style="margin-bottom:0;"
          >
            <i class="el-icon-coordinate" />批量安排复试
          </el-button>
          <el-button
            type="text"
            style="margin-bottom:0;"
          >
            <i class="el-icon-folder" />批量导出
          </el-button>
        </template>
        <template
          slot="name"
          slot-scope="{ row }"
        >
          <span
            style="cursor: pointer"
            @click="toDetail(row)"
          >
            <el-button type="text">{{ row.name }}</el-button>
          </span>
        </template>
        <template
          slot="status"
          slot-scope="{ row }"
        >
          {{ statusWord[row.status] }}
        </template>
        <template
          slot="sex"
          slot-scope="{ row }"
        >
          {{ row.sex == 1 ? '男' : '女' }}
        </template>
        <template
          slot="interview"
          slot-scope="{ row }"
        >
          {{ row.sex == 1 ? '已发送' : '未发送' }}
        </template>
        <template
          slot="provinceCode"
          slot-scope="{ row }"
        >
          {{ row.provinceName + row.cityName }}
        </template>
        <template
          slot="handler"
          slot-scope="{ row }"
        >
          <div class="handlerRow">
            <!-- 待沟通 -->
            <template v-if="row.status === '1'">
              <!-- <el-button
                type="text"
                @click="hadlePushAudit(row)"
              >
                推送审核
              </el-button> -->
              <el-button
                type="text"
                @click="handleWeedOut(row)"
              >
                淘汰
              </el-button>
              <el-dropdown @command="handleCommand($event, row)">
                <el-button
                  type="text"
                  style="margin-left: 10px"
                >
                  <i class="el-icon-arrow-down el-icon-more" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="changeJob">
                    更改应聘职位
                  </el-dropdown-item>
                  <el-dropdown-item command="edit">
                    编辑
                  </el-dropdown-item>
                  <!-- <el-dropdown-item command>
                    下载简历
                  </el-dropdown-item> -->
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <!-- 初选通过 -->
            <template v-if="row.status === '2'">
              <el-button
                type="text"
                @click="handleArrange(row)"
              >
                安排面试
              </el-button>
              <el-button
                type="text"
                @click="handleWeedOut(row)"
              >
                淘汰
              </el-button>
              <el-dropdown @command="handleCommand($event, row)">
                <el-button
                  type="text"
                  style="margin-left: 10px"
                >
                  <i class="el-icon-arrow-down el-icon-more" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="edit">
                    编辑
                  </el-dropdown-item>
                  <!-- <el-dropdown-item command>
                    下载简历
                  </el-dropdown-item> -->
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <!-- 面试中 -->
            <template v-if="row.status === '3'">
              <el-button type="text">
                重新安排面试
              </el-button>
              <el-button type="text">
                发送面试登记表
              </el-button>
              <el-dropdown @command="handleCommand($event, row)">
                <el-button
                  type="text"
                  style="margin-left: 10px"
                >
                  <i class="el-icon-arrow-down el-icon-more" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="weedOut">
                    淘汰
                  </el-dropdown-item>
                  <el-dropdown-item command="edit">
                    编辑
                  </el-dropdown-item>
                  <el-dropdown-item command>
                    下载简历
                  </el-dropdown-item>
                  -->
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <!-- 面试通过 -->
            <template v-if="row.status === '4'">
              <el-button
                type="text"
                @click="handleApplyEmploy(row)"
              >
                申请录用
              </el-button>
              <!-- <el-button type="text" @click="handleCheckEmploy(row)">
                查看申请
              </el-button> -->
              <el-button
                type="text"
                @click="handleWeedOut(row)"
              >
                淘汰
              </el-button>
              <el-dropdown @command="handleCommand($event, row)">
                <el-button
                  type="text"
                  style="margin-left: 10px"
                >
                  <i class="el-icon-arrow-down el-icon-more" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="arrange">
                    安排复试
                  </el-dropdown-item>
                  <el-dropdown-item command="edit">
                    编辑
                  </el-dropdown-item>
                  <el-dropdown-item command>
                    查看面试评价
                  </el-dropdown-item>
                  <el-dropdown-item command="toRegistrationForm">
                    查看面试登记表
                  </el-dropdown-item>
                  <!-- <el-dropdown-item command>
                    下载简历
                  </el-dropdown-item> -->
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <!-- 待发Offer -->
            <template v-if="row.status === '5'">
              <el-button
                type="text"
                @click="handleSendOffer(row)"
              >
                发送Offer
              </el-button>
              <el-button
                type="text"
                @click="handleWeedOut(row)"
              >
                淘汰
              </el-button>
              <el-dropdown @command="handleCommand($event, row)">
                <el-button
                  type="text"
                  style="margin-left: 10px"
                >
                  <i class="el-icon-arrow-down el-icon-more" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="edit">
                    编辑
                  </el-dropdown-item>
                  <!-- <el-dropdown-item command>
                    下载简历
                  </el-dropdown-item> -->
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <!-- 已发Offer -->
            <template v-if="row.status === '6'">
              <el-button
                type="text"
                @click="handleAcceptOffer(row)"
              >
                接受
              </el-button>
              <el-button
                type="text"
                @click="handleWeedOut(row)"
              >
                淘汰
              </el-button>
              <el-dropdown @command="handleCommand($event, row)">
                <el-button
                  type="text"
                  style="margin-left: 10px"
                >
                  <i class="el-icon-arrow-down el-icon-more" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="offerChange">
                    Offer变更
                  </el-dropdown-item>
                  <el-dropdown-item command="edit">
                    编辑
                  </el-dropdown-item>
                  <!-- <el-dropdown-item command>
                    下载简历
                  </el-dropdown-item> -->
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <!-- 已淘汰 -->
            <template v-if="row.status === '0'">
              <el-button
                type="text"
                @click="handleRecover(row)"
              >
                恢复为候选人
              </el-button>
              <el-dropdown @command="handleCommand($event, row)">
                <el-button
                  type="text"
                  style="margin-left: 10px"
                >
                  <i class="el-icon-arrow-down el-icon-more" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item command>
                    下载简历
                  </el-dropdown-item> -->
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </div>
        </template>
      </common-table>
    </basic-container>
    <weed-out-dialog
      ref="weedOutgDialog"
      :visible.sync="weedOutgDialog"
      @refresh="loadAllData(1)"
    />
    <push-audit-dialog
      ref="pushAuditDialog"
      :visible.sync="pushAuditDialog"
      @refresh="loadAllData(1)"
    />
    <change-job-dialog
      ref="changeJobDialog"
      :visible.sync="changeJobDialog"
      @refresh="loadAllData(1)"
    />
    <arrange
      v-if="arrangeDialog"
      :dialog-visible.sync="arrangeDialog"
      :row="row"
    />
  </div>
</template>

<script>
const column = [
  {
    label: '姓名',
    prop: 'name',
    slot: true
  },
  {
    label: '应聘职位',
    prop: 'jobName'
  },
  {
    label: '用人部门',
    prop: 'orgName'
  },
  {
    label: '招聘负责人',
    prop: 'userName'
  },
  {
    label: '候选人状态',
    prop: 'status',
    slot: true
  },
  {
    label: '面试登记表',
    prop: 'interview',
    slot: true
  },
  {
    label: '性别',
    prop: 'sex',
    slot: true
  },
  {
    label: '年龄',
    prop: 'age'
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
    prop: 'provinceCode',
    slot: true
  },
  {
    label: '最高学历',
    prop: 'educationalLevel'
  },
  {
    label: '毕业学校',
    prop: 'university'
  },
  {
    label: '毕业专业',
    prop: 'major'
  },
  {
    label: '工作年限',
    prop: 'workAge'
  },
  {
    label: '最近工作单位',
    prop: 'lastCompany'
  },
  {
    label: '应聘渠道',
    prop: 'recruitment'
  },
  {
    label: '期望月薪',
    prop: 'monthSalary'
  },
  {
    label: '备注',
    prop: 'remark'
  },
  {
    label: '候选人添加时间',
    prop: 'createTime'
  }
]

import SearchPopover from '@/components/searchPopOver/index'
import WeedOutDialog from './components/weedOutDialog'
import PushAuditDialog from './components/pushAuditDialog'
import ChangeJobDialog from './components/changeJobDialog'

import {
  getCandidateStatusStat,
  getCandidateList,
  acceptCandidateOffer,
  changeCandidateOffer
} from '@/api/personnel/candidate'
import { getOrgJob } from '@/api/personnel/roster'
import { getOrgTreeSimple } from '@/api/org/org'
import arrange from './components/arrangeInterview'

export default {
  name: 'Candidate',
  components: { SearchPopover, WeedOutDialog, PushAuditDialog, ChangeJobDialog, arrange },
  data() {
    return {
      arrangeDialog: false,
      row: {},
      checkColumn: [
        'name',
        'jobName',
        'orgName',
        'userName',
        'status',
        'interview',
        'sex',
        'age',
        'phonenum',
        'email',
        'provinceCode',
        'educationalLevel',
        'university',
        'major',
        'workAge',
        'lastCompany',
        'recruitment',
        'monthSalary',
        'remark',
        'createTime'
      ],
      originColumn: column,
      candidateStatus: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0
      },
      tabStatus: 'all',
      statusWord: {
        '0': '已淘汰',
        '1': '待沟通',
        '2': '初选通过',
        '3': '面试中',
        '4': '面试通过',
        '5': '待发Offer',
        '6': '已发Offer'
      },
      loading: false,
      data: [],
      columns: column,
      tableConfig: {
        showHandler: true,
        enableMultiSelect: true,
        enablePagination: true,
        uniqueKey: 'personId',
        highlightSelect: true,
        handlerColumn: {
          width: 250
        }
      },
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      searchParams: {},
      searchConfig: {
        requireOptions: [
          {
            type: 'input',
            field: 'search',
            label: '',
            data: '',
            options: [],
            config: { placeholder: '姓名/邮箱/手机号码', 'suffix-icon': 'el-icon-search' }
          }
        ],
        popoverOptions: [
          {
            type: 'select',
            field: 'jobId',
            label: '应聘职位',
            data: '',
            options: [],
            config: { optionLabel: 'jobName', optionValue: 'jobId' }
          },
          {
            type: 'treeSelect',
            field: 'orgId',
            label: '用人部门',
            data: '',
            config: {
              selectParams: {
                placeholder: '请选择用人部门',
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
            field: 'recruitment',
            label: '应聘渠道',
            data: '',
            options: [],
            config: { optionLabel: 'dictValue', optionValue: 'dictKey' }
          },
          {
            type: 'select',
            data: '',
            label: '性别',
            field: 'sex',
            config: {},
            options: [
              { label: '男', value: '1' },
              { label: '女', value: '0' }
            ]
          },
          {
            type: 'dataPicker',
            data: '',
            label: '添加时间',
            field: 'beginCreateDate,endCreateDate',
            config: { type: 'daterange', 'range-separator': '至' }
          }
        ]
      },
      weedOutgDialog: false,
      pushAuditDialog: false,
      changeJobDialog: false
    }
  },
  created() {
    this.getCandidateStatus()
    this.$store.dispatch('CommonDict', 'RecruitmentChannel').then((res) => {
      this.searchConfig.popoverOptions[2].options = res
    })
    getOrgJob().then((res) => {
      this.searchConfig.popoverOptions[0].options = res
    })
    getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
      this.searchConfig.popoverOptions[1].config.treeParams.data.push(...res)
      this.$refs['searchPopover'].treeDataUpdateFun(res, 'orgId')
    })
    this.loadData()
  },
  methods: {
    handleCheckEmploy(row) {
      this.$router.push('/personnel/candidate/applyDetail/' + row.personId)
    },
    handleApplyEmploy(row) {
      this.$router.push('/personnel/candidate/apply/' + row.personId)
    },
    handleApply() {
      this.$router.push({
        path: '/personnel/candidate/apply'
      })
    },
    handleArrange(row) {
      this.arrangeDialog = true
      this.row = JSON.parse(JSON.stringify(row))
    },
    handleExport() {},
    handleSendOffer(row) {
      this.$router.push('/personnel/candidate/editOffer?personId=' + row.personId)
    },
    toDetail(row) {
      this.$router.push('/personnel/personDetail/' + row.personId)
    },
    handleAcceptOffer(row) {
      this.$confirm('您确认要替候选人接受入职offer？接受后该候选人后将会进入待入职状态', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          recruitmentId: row.recruitmentId,
          personId: row.personId,
          userId: this.$store.state.user.userInfo.user_id
        }
        const loading = this.$loading({ lock: true })
        acceptCandidateOffer(params)
          .then(() => {
            this.$message.success('接受成功')
            loading.close()
            this.loadAllData(1)
          })
          .catch(() => {
            loading.close()
          })
      })
    },
    handleWeedOut(item) {
      if (item.status === '3') {
        this.$confirm(
          '已选的候选人中存在已安排面试，淘汰候选人后原面试安排将自动取消，您确认要淘汰这些候选人吗？',
          '确认淘汰候选人？',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            this.$refs.weedOutgDialog.out(item)
          })
          .catch(() => {
            this.$message.info('已取消删除')
          })
      } else {
        this.$refs.weedOutgDialog.out(item)
      }
    },
    hadlePushAudit(data) {
      this.$refs.pushAuditDialog.pushAudit(data)
    },
    handleRefresh() {
      this.loadData(1)
    },
    columnChange() {
      this.columns = column.filter((item) => {
        return this.checkColumn.indexOf(item.prop) > -1
      })
    },
    handleRecover(data) {
      this.$refs.changeJobDialog.recover(data)
    },
    handleCommand(command, data) {
      if (command === 'changeJob') {
        this.$refs.changeJobDialog.changeJob(data)
      } else if (command === 'weedOut') {
        this.$refs.weedOutgDialog.out(data)
      } else if (command === 'offerChange') {
        this.$confirm('您确认要重新发起录用申请么？重新发起后，已发送的offer将自动作废。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            personId: data.personId,
            userId: this.$store.state.user.userInfo.user_id
          }
          const loading = this.$loading({ lock: true })
          changeCandidateOffer(params)
            .then(() => {
              this.$message.success('发起成功')
              loading.close()
              this.loadAllData(1)
            })
            .catch(() => {
              loading.close()
            })
        })
      } else if (command === 'edit') {
        this.$router.push('/personnel/editPerson?personId=' + data.personId)
      } else if (command === 'add') {
        this.$router.push('/personnel/editPerson')
      } else if (command === 'toRegistrationForm') {
        this.$router.push('/personnel/candidate/registrationForm/', data.personId)
      }
    },
    handleSubmit(params) {
      this.searchParams = params
      this.loadData()
    },
    loadAllData(pageNo) {
      Object.assign(this.$data.candidateStatus, this.$options.data().candidateStatus)
      this.getCandidateStatus()
      this.loadData(pageNo)
    },
    loadData(pageNo) {
      let params = { ...this.searchParams }
      if (pageNo) this.page.currentPage = pageNo
      params.pageNo = this.page.currentPage
      params.pageSize = this.page.size
      params.status = this.tabStatus === 'all' ? '' : this.tabStatus
      this.loading = true
      getCandidateList(params).then((res) => {
        this.page.total = res.totalNum
        this.data = res.data
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
    },
    getCandidateNum(state) {
      if (state === 'all') {
        let num = 0
        for (let key in this.candidateStatus) {
          num += this.candidateStatus[key]
        }
        return num || 0
      } else {
        return this.candidateStatus[state] || 0
      }
    },
    tabClick(status) {
      this.tabStatus = status
      this.$refs.commonTable.clearSelection()
      this.loadData()
    },
    getCandidateStatus() {
      getCandidateStatusStat().then((res) => {
        res.forEach((item) => {
          this.$set(this.candidateStatus, item.status, item.statusNum)
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
  // padding: 0 24px;
  .header {
    font-weight: bold;
    font-size: 18px;
    padding: 14px 0 16px;
  }
}

.topBtn {
  color: #a0a8ae;
}

.state {
  display: flex;
  // padding: 0 6px;
  margin-bottom: 10px;
  .on {
    flex: 7;
    background: #ffffff;
    border-radius: 4px;
    margin-right: 20px;
    display: flex;
    .onItem {
      flex: 1;
      text-align: center;
      height: 46px;
      margin: 30px 0;
      border-right: 1px solid #e3e7e9;
      cursor: pointer;
      .status {
        .statusWork {
          font-size: 12px;
          color: #718199;
          line-height: 18px;
        }
        .statusNum {
          font-size: 16px;
          color: #202940;
          line-height: 24px;
        }
      }
      .bottomBox {
        height: 2px;
        width: 68px;
        background: #207efa;
        margin: 0 auto;
        margin-top: 32px;
      }
    }
    :last-of-type {
      border-right: 0;
    }
    #current {
      color: #207efa;
    }
  }
  .left {
    flex: 1;
    background: #ffffff;
    border-radius: 4px;
    .onItem {
      flex: 1;
      text-align: center;
      height: 46px;
      margin: 30px 0;
      cursor: pointer;
      .status {
        .statusWork {
          font-size: 12px;
          color: #718199;
          line-height: 18px;
        }
        .statusNum {
          font-size: 16px;
          color: #202940;
          line-height: 24px;
        }
      }
      .bottomBox {
        height: 2px;
        width: 68px;
        background: #207efa;
        margin: 0 auto;
        margin-top: 32px;
      }
    }
    #current {
      color: #207efa !important;
    }
  }
}

.candidate {
  margin-top: 16px;
  background: #ffffff;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 24px !important;
  height: 100%;
  min-height: calc(100% - 224px);
}

.originColumn {
  height: 25px;
}
.checkColumn {
  height: 200px;
  overflow: scroll;
}

/deep/ .handlerRow {
  display: flex;
  justify-content: flex-start;
  .el-button--text {
    flex: 1;
  }
}
</style>

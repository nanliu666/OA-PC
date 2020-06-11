<template>
  <div>
    <page-header
      :title="title"
      show-back
      :back="goBack"
    />
    <!-- 用户提交的申请 -->
    <basic-container>
      <!-- 申请信息 -->
      <div class="apply-info-wrap">
        <div class="title">
          {{ ApplyInfo.userName }}提交的{{ title }}申请
        </div>
        <div class="info">
          <div class="num-box">
            <div>
              <div>审批编号：</div>
              <div>{{ ApplyInfo.apprNo }}</div>
            </div>
          </div>
          <div class="apply-user-box">
            <div>
              <div>申请人：</div>
              <div>{{ ApplyInfo.userName }}</div>
            </div>
          </div>
          <div class="apply-time">
            <div>
              <div>申请时间：</div>
              <div>{{ ApplyInfo.applyTime }}</div>
            </div>
          </div>
          <div class="apply-status">
            <div>
              <div>状态</div>
              <div>{{ ApplyInfo.status | filterstatus }}</div>
            </div>
          </div>
        </div>
      </div>
    </basic-container>
    <!-- 审批详情标题 -->
    <basic-container class="apply-detail-title">
      <div
        class="title-box"
        @click="show = !show"
      >
        <div class="title">
          审批详情
        </div>
        <div
          v-if="show"
          class="btn-box"
        >
          <i
            class="el-icon-arrow-up icon"
            style="margin-right:12px"
          /> 收起
        </div>
        <div
          v-else
          class="btn-box"
        >
          <i
            class="el-icon-arrow-down icon"
            style="margin-right:12px"
          /> 打开
        </div>
      </div>
    </basic-container>
    <!-- 审批详情 -->
    <transition name="show">
      <basic-container
        v-show="show"
        class="apply-detail"
      >
        <!-- 招聘审批详情 -->
        <div
          v-if="apprInfo.formKey === 'Recruitment'"
          class="detail-box"
        >
          <div class="detail-item">
            <div>部门名称 :</div>
            <div>{{ applyData.orgName }}</div>
          </div>
          <div class="detail-item">
            <div>职位名称 :</div>
            <div>{{ applyData.jobName }}</div>
          </div>
          <div class="detail-item">
            <div>岗位名称 :</div>
            <div>{{ applyData.positionName }}</div>
          </div>
          <div class="detail-item">
            <div>工作性质 :</div>
            <div>{{ applyData.workProperty | CommonDictType(WorkProperty) }}</div>
          </div>
          <div class="detail-item">
            <div>紧急程度 :</div>
            <div>{{ applyData.emerType | CommonDictType(EmerType) }}</div>
          </div>
          <div class="detail-item">
            <div>需求人数 :</div>
            <div>{{ applyData.needNum }}</div>
          </div>
          <div class="detail-item">
            <div>已入职人数 :</div>
            <div>{{ applyData.entryNum }}</div>
          </div>
          <div class="detail-item">
            <div>候选人数 :</div>
            <div>{{ applyData.candidateNum }}</div>
          </div>
          <div class="detail-item">
            <div>到岗日期 :</div>
            <div>{{ applyData.joinDate }}</div>
          </div>
          <div class="detail-item">
            <div>工作年限 :</div>
            <div>{{ applyData.workYear | CommonDictType(WorkYear) }}</div>
          </div>
          <div class="detail-item">
            <div>学历要求 :</div>
            <div>{{ applyData.educationalLevel | CommonDictType(EducationalLevel) }}</div>
          </div>
          <div class="detail-item">
            <div>最低薪酬 :</div>
            <div>{{ applyData.minSalary }} 元</div>
          </div>
          <div class="detail-item">
            <div>最高薪酬 :</div>
            <div>{{ applyData.maxSalary }} 元</div>
          </div>
          <div class="detail-item">
            <div>职位要求 :</div>
            <div>{{ applyData.requirement }}</div>
          </div>
          <div class="detail-item">
            <div>工作职责 :</div>
            <div>{{ applyData.duty }}</div>
          </div>
          <div class="detail-item">
            <div>招聘原因 :</div>
            <div>{{ applyData.reason | CommonDictType(RecruitmentReason) }}</div>
          </div>
          <div class="detail-item">
            <div>原因补充说明 :</div>
            <div>{{ applyData.reasonNote }}</div>
          </div>

          <div class="detail-item">
            <div>申请理由 :</div>
            <div>{{ applyData.remark }}</div>
          </div>
          <div class="detail-item">
            <div>提交人姓名 :</div>
            <div>{{ applyData.userName }}</div>
          </div>
          <div class="detail-item">
            <div>公司名称 :</div>
            <div>{{ applyData.companyName }}</div>
          </div>
        </div>

        <!-- 录用审批详情 -->
        <div
          v-else-if="apprInfo.formKey === 'PersonOfferApply'"
          class="detail-box"
        >
          <div class="detail-item">
            <div>预计入职日期 :</div>
            <div>{{ applyData.entryDate }}</div>
          </div>
          <div class="detail-item">
            <div>试用期 :</div>
            <div>{{ applyData.probation }} 月</div>
          </div>
          <div class="detail-item">
            <div>入职公司名称 :</div>
            <div>{{ applyData.companyName }}</div>
          </div>
          <div class="detail-item">
            <div>部门名称 :</div>
            <div>{{ applyData.orgName }}</div>
          </div>
          <div class="detail-item">
            <div>职位名称 :</div>
            <div>{{ applyData.jobName }}</div>
          </div>
          <div class="detail-item">
            <div>岗位名称 :</div>
            <div>{{ applyData.positionName }}</div>
          </div>
          <div class="detail-item">
            <div>工作性质 :</div>
            <div>{{ applyData.workProperty | CommonDictType(WorkProperty) }}</div>
          </div>

          <div class="detail-item">
            <div>详细地址 :</div>
            <div>{{ applyData.address }}</div>
          </div>
          <div class="detail-item">
            <div>工作城市 :</div>
            <div>{{ applyData.workProviceName + applyData.workCityName }}</div>
          </div>
          <div class="detail-item">
            <div>试用期月薪 :</div>
            <div>{{ applyData.probationSalary }} 元</div>
          </div>
          <div class="detail-item">
            <div>转正月薪 :</div>
            <div>{{ applyData.formalSalary }} 元</div>
          </div>
          <div class="detail-item">
            <div>合同类型 :</div>
            <div>{{ applyData.contractType | CommonDictType(ContractType) }}</div>
          </div>
          <div class="detail-item">
            <div>合同开始日期 :</div>
            <div>{{ applyData.contractBeginDate }}</div>
          </div>
          <div class="detail-item">
            <div>合同结束日期 :</div>
            <div>{{ applyData.contractEndDate }}</div>
          </div>
          <div class="detail-item">
            <div>合同期限 :</div>
            <div>{{ applyData.contractPeriod }} 年</div>
          </div>
          <div class="detail-item">
            <div>是否缴纳社会保险 :</div>
            <div>{{ applyData.isShbx | isOrNo }}</div>
          </div>
          <div class="detail-item">
            <div>社会保险基数 :</div>
            <div>{{ applyData.baseMoney }} 元</div>
          </div>
          <div class="detail-item">
            <div>是否缴纳养老保险 :</div>
            <div>{{ applyData.isYangl | isOrNo }}</div>
          </div>
          <div class="detail-item">
            <div>是否缴纳医疗保险 :</div>
            <div>{{ applyData.isYil | isOrNo }}</div>
          </div>
          <div class="detail-item">
            <div>是否缴纳工伤保险 :</div>
            <div>{{ applyData.isGs | isOrNo }}</div>
          </div>
          <div class="detail-item">
            <div>是否缴纳失业保险 :</div>
            <div>{{ applyData.isShiy | isOrNo }}</div>
          </div>
          <div class="detail-item">
            <div>是否缴纳生育保险 :</div>
            <div>{{ applyData.isShengy | isOrNo }}</div>
          </div>
          <div class="detail-item">
            <div>是否缴纳住房公积金 :</div>
            <div>{{ applyData.isGjj | isOrNo }}</div>
          </div>
          <div class="detail-item">
            <div>办公位安排 :</div>
            <div>{{ applyData.officeSpace }}</div>
          </div>
          <div class="detail-item">
            <div>电话配备 :</div>
            <div>{{ applyData.telphone }}</div>
          </div>
          <div class="detail-item">
            <div>是否电脑配备 :</div>
            <div>{{ applyData.isComputer | isOrNo }}</div>
          </div>
          <div class="detail-item">
            <div>其他 :</div>
            <div>{{ applyData.other }}</div>
          </div>
          <div class="detail-item">
            <div>是否安排住房 :</div>
            <div>{{ applyData.isHouse | isOrNo }}</div>
          </div>
          <div class="detail-item">
            <div>住房标准 :</div>
            <div>{{ applyData.houseStandard }}</div>
          </div>
          <div class="detail-item">
            <div>备注 :</div>
            <div>{{ applyData.remark }}</div>
          </div>
          <div class="detail-item">
            <div>提交人姓名 :</div>
            <div>{{ applyData.userName }}</div>
          </div>
        </div>

        <!-- 转正审批详情 -->
        <div
          v-else-if="apprInfo.formKey === 'UserFormalInfo'"
          class="detail-box"
        >
          <div class="detail-item">
            <div>用户 :</div>
            <div>{{ applyData.userName }}</div>
          </div>
          <div class="detail-item">
            <div>试用期工作总结 :</div>
            <div>{{ applyData.summary }}</div>
          </div>
          <div class="detail-item">
            <div>对公司的意见和建议 :</div>
            <div>{{ applyData.advise }}</div>
          </div>
          <div class="detail-item">
            <div>入职日期 :</div>
            <div>{{ applyData.entryDate }}</div>
          </div>
          <div class="detail-item">
            <div>转正日期 :</div>
            <div>{{ applyData.formalDate }}</div>
          </div>
          <div class="detail-item" />
        </div>
        <!-- 员工合同续签审批详情 -->
        <div
          v-else-if="apprInfo.formKey === 'UserContractInfo'"
          class="detail-box"
        >
          <div class="detail-item">
            <div>用户名称 :</div>
            <div>{{ applyData.userName }}</div>
          </div>
          <div class="detail-item">
            <div>合同编号 :</div>
            <div>{{ applyData.code }}</div>
          </div>
          <div class="detail-item">
            <div>合同公司 :</div>
            <div>{{ applyData.name }}</div>
          </div>
          <div class="detail-item">
            <div>合同类型 :</div>
            <div>{{ applyData.type | CommonDictType(ContractType) }}</div>
          </div>
          <div class="detail-item">
            <div>合同开始日期 :</div>
            <div>{{ applyData.beginDate }}</div>
          </div>
          <div class="detail-item">
            <div>合同结束日期 :</div>
            <div>{{ applyData.endDate }}</div>
          </div>
          <div class="detail-item">
            <div>签订合同日期 :</div>
            <div>{{ applyData.signDate }}</div>
          </div>
          <div class="detail-item">
            <div>合同期限 :</div>
            <div>{{ applyData.period }} 年</div>
          </div>
          <div class="detail-item">
            <div>备注 :</div>
            <div>{{ applyData.remark }}</div>
          </div>
          <div class="detail-item" />
        </div>

        <!-- 员工离职信息审批详情 -->
        <div
          v-else-if="apprInfo.formKey === 'UserLeaveInfo'"
          class="detail-box"
        >
          <div class="detail-item">
            <div>用户名称 :</div>
            <div>{{ applyData.userName }}</div>
          </div>
          <div class="detail-item">
            <div>最后工作日期 :</div>
            <div>{{ applyData.lastDate }}</div>
          </div>
          <div class="detail-item">
            <div>申请离职日期 :</div>
            <div>{{ applyData.applyDate }}</div>
          </div>
          <div class="detail-item">
            <div>实际离职日期 :</div>
            <div>{{ applyData.leaveDate }}</div>
          </div>
          <div class="detail-item">
            <div>离职原因 :</div>
            <div>{{ applyData.reason | CommonDictType(LeaveReason) }}</div>
          </div>
          <div class="detail-item">
            <div>离职原因说明 :</div>
            <div>{{ applyData.remark }}</div>
          </div>

          <div class="detail-item" />
        </div>

        <!-- 人事异动申请审批详情 -->
        <div
          v-else-if="apprInfo.formKey === 'UserChangeInfo'"
          class="detail-box"
        >
          <div class="detail-item">
            <div>用户名称 :</div>
            <div>{{ applyData.userName }}</div>
          </div>
          <div class="detail-item">
            <div>异动类型 :</div>
            <div>{{ applyData.type | changeType }}</div>
          </div>
          <div class="detail-item">
            <div>异动原因 :</div>
            <div>{{ applyData.reason }}</div>
          </div>
          <div class="detail-item">
            <div>原公司名称 :</div>
            <div>{{ applyData.companyName }}</div>
          </div>
          <div class="detail-item">
            <div>原部门名称 :</div>
            <div>{{ applyData.orgName }}</div>
          </div>
          <div class="detail-item">
            <div>原职位名称 :</div>
            <div>{{ applyData.jobName }}</div>
          </div>
          <div class="detail-item">
            <div>原岗位名称 :</div>
            <div>{{ applyData.positionName }}</div>
          </div>
          <div class="detail-item">
            <div>新公司名称 :</div>
            <div>{{ applyData.newCompanyName }}</div>
          </div>
          <div class="detail-item">
            <div>新部门名称 :</div>
            <div>{{ applyData.newOrgName }}</div>
          </div>
          <div class="detail-item">
            <div>新职位名称 :</div>
            <div>{{ applyData.newJobName }}</div>
          </div>
          <div class="detail-item">
            <div>新岗位名称 :</div>
            <div>{{ applyData.newPositionName }}</div>
          </div>
          <div class="detail-item">
            <div>生效日期 :</div>
            <div>{{ applyData.effectDate }}</div>
          </div>
          <div class="detail-item">
            <div>备注 :</div>
            <div>{{ applyData.remark }}</div>
          </div>
          <div class="detail-item" />
        </div>
        <!-- 更改需求人数审批详情 -->
        <div
          v-else-if="apprInfo.formKey === 'RecruitmentChangeNum'"
          class="detail-box"
        >
          <div class="detail-item">
            <div>招聘职位名称 :</div>
            <div>{{ applyData.jobName }}</div>
          </div>
          <div class="detail-item">
            <div>需求人数 :</div>
            <div>{{ applyData.needNum }}</div>
          </div>
          <div class="detail-item">
            <div>已入职人数 :</div>
            <div>{{ applyData.entryNum }}</div>
          </div>
          <div class="detail-item">
            <div>用人部门名称 :</div>
            <div>{{ applyData.orgName }}</div>
          </div>
          <div class="detail-item">
            <div>更改后的需求人数 :</div>
            <div>{{ applyData.changeNum }}</div>
          </div>
          <div class="detail-item">
            <div>提交用户名 :</div>
            <div>{{ applyData.userName }}</div>
          </div>
          <div class="detail-item">
            <div>更改原因 :</div>
            <div>{{ applyData.reason }}</div>
          </div>
          <div class="detail-item" />
        </div>
      </basic-container>
    </transition>

    <basic-container v-loading="loading">
      <!-- 流程进度 -->
      <div class="progress-wrap">
        <div class="progress-wrap-title">
          流程进度
        </div>
        <div>
          <el-steps
            :active="isCancel ? activeStep : activeStep + 1"
            align-center
          >
            <el-step
              v-for="(item, index) in progressList"
              :key="item.id"
            >
              <!-- 自定义图标 -->
              <template slot="icon">
                <div>
                  <div
                    class="icon "
                    :class="[{ active: index <= activeStep }, { cancel: isCancel && index == 0 }]"
                  />
                </div>
              </template>
              <!-- 自定义标题 -->
              <template slot="title">
                <div class="title">
                  {{ item.name || '提交申请' }}
                </div>
              </template>
              <!-- 自定义内容 -->
              <template slot="description">
                <div class="description-box">
                  <div>{{ item.userName }}</div>
                  <div>{{ item.approveTime }}</div>
                  <div v-if="!isCancel && index != 0 && index == activeStep && !isShowBtns">
                    <div
                      class="isUrge"
                      @click="handelUrge(item)"
                    >
                      催一下 <i class="el-icon-bell" />
                    </div>
                  </div>
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
      </div>

      <!-- 审批记录 -->
      <div class="record-wrap">
        <div class="record-wrap-title">
          审批记录
        </div>
        <!-- 没撤销 -->
        <div v-if="!isCancel">
          <el-steps
            direction="vertical"
            align-center
          >
            <el-step
              v-for="(item, index) in recordList"
              :key="item.id"
            >
              <!-- 自定义图标 -->
              <template slot="icon">
                <div class="icon active" />
              </template>
              <!-- 自定义标题 -->
              <template slot="title">
                <div class="title">
                  {{ item.name || '提交申请' }}
                </div>
              </template>
              <!-- 自定义内容 -->
              <template slot="description">
                <div class="description-box">
                  <div class="img-box">
                    <img
                      src="http://b-ssl.duitang.com/uploads/item/201707/10/20170710210234_y3Kf5.jpeg"
                      alt=""
                    >
                  </div>
                  <div class="detail-box">
                    <div>
                      {{ item.userName
                      }}<span
                        v-if="index == recordList.length - 1"
                        class="initiateAppl"
                      >发起审批</span>
                      <span
                        v-else-if="item.result === 'Pass'"
                        class="isPass"
                      >同意</span>
                      <span
                        v-else-if="item.result === 'Reject'"
                        class="isReject"
                      >拒绝</span>
                      <span
                        v-else
                        class="appring"
                      >审批中</span>
                    </div>
                    <div class="jobName-row">
                      <div>{{ item.jobName }}</div>
                      <div>{{ item.remark }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
        <!-- 已撤销 -->
        <div v-else>
          <el-steps
            direction="vertical"
            align-center
          >
            <el-step>
              <!-- 自定义图标 -->
              <template slot="icon">
                <div class="icon active" />
              </template>
              <!-- 自定义标题 -->
              <template slot="title">
                <div class="title">
                  {{ recordList.name || '申请撤销' }}
                </div>
              </template>
              <!-- 自定义内容 -->
              <template slot="description">
                <div class="description-box">
                  <div class="img-box">
                    <img
                      src="http://b-ssl.duitang.com/uploads/item/201707/10/20170710210234_y3Kf5.jpeg"
                      alt=""
                    >
                  </div>
                  <div class="detail-box">
                    <div>
                      {{ recordList.userName }}
                      <span class="isCancel">已撤销</span>
                    </div>
                    <div>{{ recordList.jobName }}</div>
                  </div>
                </div>
              </template>
            </el-step>
            <el-step>
              <!-- 自定义图标 -->
              <template slot="icon">
                <div class="icon active" />
              </template>
              <!-- 自定义标题 -->
              <template slot="title">
                <div class="title">
                  {{ recordList.name || '提交申请' }}
                </div>
              </template>
              <!-- 自定义内容 -->
              <template slot="description">
                <div class="description-box">
                  <div class="img-box">
                    <img
                      src="http://b-ssl.duitang.com/uploads/item/201707/10/20170710210234_y3Kf5.jpeg"
                      alt=""
                    >
                  </div>
                  <div class="detail-box">
                    <div>{{ recordList.userName }}<span class="initiateAppl">发起审批</span></div>
                    <div>{{ recordList.jobName }}</div>
                  </div>
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
      </div>
      <!-- 按钮 -->
      <div
        v-if="!isCancel && !isFished && !isReject"
        class="cancel-btn-box"
      >
        <el-button
          v-if="!isShowCancel"
          type="primary"
          size="medium"
          @click="handelCancel"
        >
          撤回
        </el-button>
        <el-button
          v-if="isShowBtns"
          type="primary"
          size="medium"
          @click="handelClick('Reject')"
        >
          拒绝
        </el-button>
        <el-button
          v-if="isShowBtns"
          type="primary"
          size="medium"
          @click="handelClick('Pass')"
        >
          同意
        </el-button>
      </div>
    </basic-container>

    <!-- 审批意见模态框 -->
    <el-dialog
      :title="apprTitle"
      :visible.sync="dialogVisible"
      width="600px"
      top="40vh"
      :modal-append-to-body="false"
    >
      <el-input
        v-model="apprRemark"
        type="textarea"
        :rows="4"
        placeholder="请输入审批意见"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="medium"
          @click="dialogVisible = false"
        >取 消</el-button>
        <el-button
          size="medium"
          type="primary"
          @click="handelConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { FormKeysCN, apprStatusCN } from '@/const/approve'
import { mapGetters } from 'vuex'
import {
  getApplyDetail,

  // 审批详情
  getRecruitmentApply,
  getOfferApply,
  getOperationApply,
  getContractApply,
  getLeaveApply,
  getChangeApply,
  getRecChangeNumApply,
  // 流程进度和审批记录
  getApplyRecord,
  // 撤回
  cancelApply,
  // 催一下
  createdUrge,
  // 同意审批
  createdPassAppr,
  // 拒绝审批
  createdRejectAppr
} from '@/api/approval/approval'

export default {
  filters: {
    // 过滤审批状态
    filterstatus: (status) => {
      if (!status) return ''
      return apprStatusCN[status]
    },
    // 字典组过滤 根据 dictKey =》 dictValue
    // CommonDictarr字典组数组
    CommonDictType: (value, CommonDictarr) => {
      if (!value) return ''
      let result = ''
      CommonDictarr.forEach((item) => {
        if (item.dictKey == value.trim()) {
          result = item.dictValue
          return
        }
      })

      return result
    },
    // 根据0  1 显示 是否
    isOrNo(value) {
      if (!value) return ''
      if (value == '1') return '是'
      return '否'
    },
    // 过滤异动类型
    changeType(value) {
      let changeTypeCN = {
        Position: '调岗',
        Up: '晋升',
        Down: '降级'
      }
      return changeTypeCN[value] || ''
    }
  },
  data() {
    return {
      // apprNo formId formKey  用户提交的申请
      apprInfo: this.$route.query,
      ApplyInfo: {
        apprNo: '',
        userName: '',
        applyTime: '',
        status: ''
      },
      // 申请详情
      // 控制申请详情是否显示
      show: false,
      // 审批详情
      applyData: {},
      // 字典组
      EmerType: [],
      WorkYear: [],
      EducationalLevel: [],
      RecruitmentReason: [],
      WorkProperty: [],
      ContractType: [],
      LeaveReason: [],
      ChangeReason: [],
      // 流程进度数据
      progressList: [],
      // 审批记录
      recordList: [],
      // 流程进度当前的节点
      activeStep: 0,
      // 当前审批节点的审批人ID
      apprUserId: '',
      // 提交人ID
      applyUserId: '',
      // 是否已经撤回
      isCancel: false,
      // 是否已经完成
      isFished: false,
      // 是否已经拒绝
      isReject: false,
      // 控制显示模态框
      dialogVisible: false,
      // 判断是同意审批还是拒绝审批
      apprType: '',
      // 审批意见
      apprRemark: '',
      loading: true
    }
  },
  computed: {
    // // 标题
    title() {
      return FormKeysCN[this.apprInfo.formKey]
    },
    // 按钮是否可用
    isShowCancel() {
      let res = false
      if (this.isCancel) {
        res = true
      } else if (this.activeStep > 1) {
        res = true
      }
      return res
    },
    // 模态框标题
    apprTitle() {
      let apprTitleCN = {
        Pass: '审批同意意见',
        Reject: '审批拒绝意见'
      }
      return apprTitleCN[this.apprType] || ''
    },
    // 拒绝同意是否显示 审批节点的审批人的用户id和当前用户相同显示
    isShowBtns() {
      if (this.userId === this.apprUserId) {
        return true
      }
      return false
    },
    // 提交人跟当前用户是否同一个人
    isUser() {
      if (this.userId === this.applyUserId) {
        return true
      }
      return false
    },
    ...mapGetters(['userId'])
  },
  async created() {
    await this.getApplyInfo()
    this.getApprDetail()
    this.getApprProgress()
    this.getCommonDict()
  },
  async activated() {
    await this.getApplyInfo()
    this.getApprDetail()
    this.getApprProgress()
    this.getCommonDict()
  },

  methods: {
    // 获取用户申请详情
    async getApplyInfo() {
      let res = await getApplyDetail({ apprNo: this.$route.query.apprNo })
      this.ApplyInfo = res
    },

    // 获取审批详情信息
    async getApprDetail() {
      let { formId, formKey } = this.ApplyInfo
      // 根据不同的formKey 调用不同申请详情查询接口
      let res = ''
      if (formKey === 'Recruitment') {
        res = await getRecruitmentApply({ recruitmentId: formId })
      } else if (formKey === 'PersonOfferApply') {
        res = await getOfferApply({ id: formId })
      } else if (formKey === 'UserFormalInfo') {
        res = await getOperationApply({ id: formId })
      } else if (formKey === 'UserContractInfo') {
        res = await getContractApply({ id: formId })
      } else if (formKey === 'UserLeaveInfo') {
        res = await getLeaveApply({ id: formId, userId: this.userId })
      } else if (formKey === 'UserChangeInfo') {
        res = await getChangeApply({ id: formId })
      } else if (formKey === 'RecruitmentChangeNum') {
        res = await getRecChangeNumApply({ id: formId })
      }
      this.applyData = res
    },

    // 获取相关字典组
    getCommonDict() {
      let commonDictNameArr = [
        'EmerType',
        'WorkYear',
        'EducationalLevel',
        'RecruitmentReason',
        'WorkProperty',
        'ContractType',
        'LeaveReason',
        'ChangeReason'
      ]
      commonDictNameArr.forEach((item) => {
        this.$store.dispatch('CommonDict', item).then((res) => {
          // this.workPropertyList = res
          // 将res =》 [{dictKey:"",dictValue:"",id:""},{dictKey:"",dictValue:"",id:""}]
          let targetArr = []
          res.forEach((el) => {
            targetArr.push({ dictKey: el.dictKey, dictValue: el.dictValue, id: el.id })
          })
          this[item] = targetArr
        })
      })
    },
    // 流程进度和审批记录
    async getApprProgress() {
      this.loading = true
      let { apprNo } = this.ApplyInfo
      let res = await getApplyRecord({ apprNo })
      let arr = []
      // 获取提交节点
      let indexApprove = res.findIndex((item) => {
        return item.isApprove == '0'
      })
      arr.push(res[indexApprove])
      // 获取审批开始节点
      let indexStart = res.findIndex((item) => {
        return item.isStart === 1
      })
      arr.push(res[indexStart])
      // 排序
      this.sordByChildId(arr, res)
      // 流程进度数据
      this.progressList = arr

      // 获取流程走到哪个节点
      this.activeStep = this.progressList.findIndex((item) => {
        return item.result === '' && item.isApprove !== '0'
      })

      // 等于-1审批已经完成
      if (this.activeStep === -1) {
        this.isFished = true
        this.activeStep = arr.length
      } else {
        // 还没完成，获取当前审批节点
        this.apprUserId = this.progressList[this.activeStep].userId
      }
      let hasReject = arr.some((item) => {
        return item.result === 'Reject'
      })
      // 有拒绝显示到拒绝节点  没有拒绝节点显示到同意审批的下一个节点
      if (hasReject === true) {
        arr = arr.slice(0, this.activeStep)
        this.activeStep -= 1
        this.isReject = true
      } else {
        arr = arr.slice(0, this.activeStep + 1)
      }
      arr.reverse()

      // 判断是否已经撤销 最后一项是提交节点
      // 审批记录数据
      if (arr[arr.length - 1].result === 'Cancel') {
        this.isCancel = true
        this.recordList = arr[arr.length - 1]
      } else {
        this.isCancel = false
        this.recordList = arr
      }
      this.loading = false
      // 提交申请人的id
      this.applyUserId = this.progressList[this.progressList.length - 1].userId
    },
    // 根据子节点Id排序
    sordByChildId(resList, dataList) {
      if (resList.length == dataList.length) {
        return
      }
      for (let i = 0; i <= dataList.length; i++) {
        if (dataList[i].id == resList[resList.length - 1].childId) {
          resList.push(dataList[i])
          break
        }
      }
      this.sordByChildId(resList, dataList)
    },

    // 撤回申请
    async handelCancel() {
      let { apprNo } = this.$route.query
      let res = await this.$confirm('确定撤销申请吗?', '撤销申请', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (res != 'confirm') {
        return
      }
      await cancelApply({ apprNo })
      this.$message.success('撤回成功')
      this.$router.go(-1)
    },
    // 点击同意或拒绝按钮展示模态框
    handelClick(type) {
      this.apprType = type
      ;(this.dialogVisible = true), (this.apprRemark = '')
    },
    // 点击确定审批
    async handelConfirm() {
      let { userId, id: nodeId } = this.progressList[this.activeStep]
      let { apprNo } = this.$route.query
      if (this.apprType === 'Reject') {
        await createdRejectAppr({
          userId,
          nodeId,
          apprNo,
          remark: this.apprRemark
        })
        this.$message({
          type: 'success',
          message: '你已拒绝这个申请'
        })
      } else if (this.apprType === 'Pass') {
        await createdPassAppr({
          userId,
          nodeId,
          apprNo,
          remark: this.apprRemark
        })
        this.$message({
          type: 'success',
          message: '你已同意这个申请'
        })
      }
      this.dialogVisible = false
      this.goBack()
    },
    // 点击催一下
    async handelUrge(params) {
      let { userId, id: nodeId } = params
      let { apprNo } = this.$route.query
      await createdUrge({ userId, nodeId, apprNo })
      this.$message({
        type: 'success',
        message: '催办成功'
      })
      this.dialogVisible = false
    },
    // goback
    goBack() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
// 用户提交的申请
.apply-info-wrap {
  .title {
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #333333;
    font-weight: bold;
  }
  .info {
    display: flex;
    justify-content: space-between;
    & > div {
      margin-top: 16px;
      height: 43px;
    }
    & > div :first-child {
      margin-bottom: 7px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #545b66;
    }
    & > div :last-child {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #a1a7ae;
    }
    .num-box {
      flex: 1;
    }
    .apply-user-box {
      text-align: center;
      flex: 1;
      display: flex;
      justify-content: center;
      > div {
        text-align: start;
      }
      border-left: 1px solid #e3e7e9;
    }
    .apply-time {
      text-align: center;
      flex: 1.5;
      border-left: 1px solid #e3e7e9;
      display: flex;
      justify-content: center;
      > div {
        text-align: start;
      }
    }
    .apply-status {
      text-align: end;
      border-left: 1px solid #e3e7e9;
      flex: 0.5;
      :nth-child(2) {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #368afa;
        font-weight: bold;
      }
    }
  }
}
// 申请详情标题
.apply-detail-title {
  margin-top: 24px;
  margin-bottom: 2px;
  .title-box {
    display: flex;
    justify-content: space-between;

    // border-bottom: #c6cbce solid 1px;
    .title {
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #333333;
      font-weight: bold;
    }
    .btn-box {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #757c85;
      text-align: right;
      cursor: pointer;
    }
  }
}

// 收起动画

// 审批详情
.apply-detail {
  border-bottom: 2px transparent solid;
  .detail-box {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    .detail-item {
      width: 50%;
      display: flex;
      margin-bottom: 30px;
      font-size: 14px;
      :first-child {
        margin-right: 15px;
        font-family: PingFangSC-Regular;
        color: #718199;
        text-align: right;
        width: 246px;
        vertical-align: middle;
      }
      :nth-child(2) {
        max-width: 252px;
      }
    }
  }
}
// 流程进度
.progress-wrap {
  .progress-wrap-title {
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #202940;
    line-height: 25px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  /deep/ .el-step__icon.is-text {
    border: 0px;
  }

  /deep/ .el-step__title.is-wait .title {
    color: #738399;
  }
  /deep/.el-step__title.is-process .title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #212a3f;
  }
  /deep/.el-step__title.is-finish .title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #212a3f;
  }

  // 小圆圈
  .icon {
    width: 9px;
    height: 9px;
    background: #a0a8ae;
    border-radius: 100%;
  }

  .description-box {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #738399;
  }
  // 催一下
  .isUrge {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #368afa;
    cursor: pointer;
  }
  .active {
    background: #368afa;
  }
  .active.cancel {
    background: red;
  }
}
// <!-- 审批记录 -->
.record-wrap {
  margin-top: 43px;
  /deep/ .el-step__icon.is-text {
    border: 0px;
  }
  /deep/.el-step__description.is-wait {
    padding-right: 0;
  }
  .record-wrap-title {
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #202940;
    line-height: 25px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  // 小圆圈
  .icon {
    width: 9px;
    height: 9px;
    background: #368afa;
    border-radius: 100%;
  }
  .icon.isReject {
    background: red;
  }
  .title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #212a3f;
    line-height: 24px;
  }
  .description-box {
    margin-top: 5px;
    background: #f7f8fa;
    display: flex;
    margin-bottom: 50px;
    .img-box {
      width: 48px;
      height: 48px;
      img {
        width: 48px;
        height: 48px;
        border-radius: 100%;
      }
    }
    .detail-box {
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      :first-child {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #333333;
        line-height: 30px;
        span {
          margin: 6px 0 0 8px;
          display: inline-block;
          font-family: PingFangSC-Medium;
          font-size: 12px;
          line-height: 14px;
          padding: 5px 10px;
        }
        .isPass {
          background-color: #f2fbf3;
          color: #7ad683;
        }
        .isReject {
          color: #ff8b8a;
          background-color: #fff3f3;
        }
        .appring {
          color: #6aafff;
          background: #edf8ff;
        }
        .initiateAppl {
          color: #7ad683;
          background: #f0fff0;
        }
        .isCancel {
          color: #ff8b8a;
          background-color: #fff3f3;
        }
      }
      :nth-child(2) {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #757c85;
        display: flex;
        :nth-child(2) {
          margin-left: 18px;
          line-height: 30px;
        }
      }
    }
  }
}

// 撤回
.cancel-btn-box {
  display: flex;
  justify-content: center;
}
</style>

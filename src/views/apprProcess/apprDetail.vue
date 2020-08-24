<template>
  <div v-loading="loading">
    <page-header
      :title="`${applyDetail.processName}`"
      show-back
      :back="goBack"
    />
    <!-- 用户提交的申请 -->
    <basic-container>
      <!-- 申请信息 -->
      <div class="apply-info-wrap">
        <div class="title">
          <div>{{ applyDetail.title }}申请</div>
          <!-- <el-button
            v-if="isReapply"
            type="primary"
            size="medium"
            @click="goToReapply"
          >
            重新申请
          </el-button> -->
        </div>
        <div class="info">
          <div class="num-box">
            <div>
              <div>审批编号：</div>
              <div>{{ applyDetail.apprNo }}</div>
            </div>
          </div>
          <div class="apply-user-box">
            <div>
              <div>申请人：</div>
              <div>{{ applyDetail.userName }}</div>
            </div>
          </div>
          <div class="apply-time">
            <div>
              <div>申请时间：</div>
              <div>{{ applyDetail.applyTime }}</div>
            </div>
          </div>
          <div class="apply-status">
            <div>
              <div>状态</div>
              <div>{{ StatusCN[applyDetail.status] }}</div>
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
        <!-- 审批详情 -->
        <ApplyRecruitment
          v-if="applyDetail.formKey === 'Recruitment'"
          :form-key="applyDetail.formKey"
          :form-id="applyDetail.formId"
        />
        <ApplyPersonOffer
          v-else-if="applyDetail.formKey === 'PersonOfferApply'"
          :form-key="applyDetail.formKey"
          :form-id="applyDetail.formId"
        />
        <el-row
          v-else
          class="detail-box"
        >
          <el-col
            v-for="(item, index) in applyDetail.formData"
            :key="index"
            class="detail-item"
            :span="item.span || 12"
          >
            <div>{{ `${item.label} :` }}</div>
            <div>{{ item.content || item.value }}</div>
          </el-col>

          <div class="detail-item" />
        </el-row>
      </basic-container>
    </transition>
    <basic-container>
      <!-- 流程进度 -->
      <div class="progress-wrap">
        <div class="progress-wrap-title">
          流程进度
        </div>
        <div>
          <el-steps
            :active="activeStep + 1"
            align-center
          >
            <template v-for="(item, index) in progressRecord">
              <el-step
                v-if="item.type !== 'empty' && item.type"
                :key="index"
              >
                <!-- 自定义图标 -->
                <template slot="icon">
                  <!-- :class="[{ active: index <= activeStep }, { cancel: isCancel && index == 0 }]" -->
                  <div class="icon-box">
                    <div
                      v-if="index == 0 && isCancel"
                      class="tip cancel-text"
                    >
                      已撤回
                    </div>
                    <div
                      v-else-if="index == activeStep && isReject"
                      class="tip reject-text"
                    >
                      已拒绝
                    </div>
                    <div
                      v-else-if="index == activeStep && isFished"
                      class="tip fished-text"
                    >
                      已通过
                    </div>
                    <div
                      class="icon"
                      :class="iconClass(index)"
                    />
                  </div>
                </template>
                <!-- 自定义标题 -->
                <template slot="title">
                  <div
                    v-if="index === 0"
                    class="title"
                  >
                    {{ `${item.userName}提交的申请` }}
                  </div>
                  <div
                    v-else
                    class="title"
                  >
                    {{ `${(item.properties && item.properties.title) || ''} 审批` }}
                  </div>
                </template>
                <!-- 自定义内容 -->
                <template slot="description">
                  <div class="description-box">
                    <div v-if="item.approveList">
                      <span
                        v-for="(it, i) in item.approveList"
                        :key="it.id"
                      >
                        <span :class="[it.result, !it.result ? 'result' : '']">
                          {{ it.userName }}</span>
                        <span v-if="item.properties.counterSign && i < item.approveList.length - 1">
                          +
                        </span>
                        <span
                          v-if="!item.properties.counterSign && i < item.approveList.length - 1"
                        >
                          /
                        </span>
                      </span>
                    </div>
                    <div v-else-if="item.type !== 'start'">
                      <span
                        v-for="(it, i) in item.userList"
                        :key="it.id"
                      >
                        <span>{{ it.name }}</span>
                        <span v-if="item.properties.counterSign && i < item.userList.length - 1">
                          +
                        </span>
                        <span v-if="!item.properties.counterSign && i < item.userList.length - 1">
                          /
                        </span>
                      </span>
                    </div>
                    <div>{{ item.userName }}</div>
                    <div>{{ item.approveTime }}</div>
                    <div>
                      <div
                        v-if="
                          !isCancel &&
                            index != 0 &&
                            index == activeStep &&
                            !(isShowBtns && item.userList.length === 1) &&
                            !isReject &&
                            !isFished &&
                            isApplyUser
                        "
                        class="isUrge"
                        @click="handelUrge(item)"
                      >
                        催一下 <i class="el-icon-bell" />
                      </div>
                    </div>
                  </div>
                </template>
              </el-step>
            </template>
          </el-steps>
        </div>
      </div>
      <!-- 审批记录 -->
      <div class="record-wrap">
        <div class="record-wrap-title">
          审批记录
        </div>
        <!-- 没撤销 -->
        <div>
          <el-steps
            direction="vertical"
            align-center
          >
            <el-step
              v-for="(item, index) in recordlist"
              :key="index"
            >
              <!-- 自定义图标 -->
              <template slot="icon">
                <div class="icon active" />
              </template>
              <!-- 自定义标题 -->
              <template slot="title">
                <div class="title">
                  <span v-if="item.type === 'start'">
                    {{ item.name || '提交申请' }}
                  </span>
                  <span v-else>
                    {{ item.properties.title || '' }}
                    <span
                      v-if="item.properties.counterSign"
                      class="counterSign_text"
                    >需所有人同意（会签）</span>
                    <span
                      v-else-if="item.properties.counterSign === false"
                      class="counterSign_text"
                    >1人审批（或签）</span>
                  </span>
                </div>
              </template>
              <!-- 自定义内容 -->
              <template slot="description">
                <div
                  v-if="item.type === 'start'"
                  class="description-box"
                >
                  <div class="img-box">
                    <el-avatar :src="circleUrl" />
                  </div>
                  <div class="flex flex-flow-column record_start">
                    <div>
                      {{ item.userName }} <span class="text">{{ item.jobName }}</span>
                      <span class="time">{{ item.approveTime }}</span>
                    </div>
                    <div style="color:#7ad683">
                      发起审批
                    </div>
                  </div>
                </div>
                <div v-if="item.properties.counterSign">
                  <div
                    v-for="(it, i) in item.approveList"
                    :key="i"
                    class="description-box"
                  >
                    <div class="img-box">
                      <el-avatar :src="circleUrl" />
                    </div>
                    <div class="detail-box">
                      <div>
                        {{ it.userName }}
                        <span class="text">{{ it.jobName }}</span>
                        <span class="time">{{ it.approveTime }}</span>
                      </div>
                      <div :class="[it.result, !it.result ? 'result' : '']">
                        {{ it.result | result }}
                      </div>
                      <div
                        v-if="it.remark"
                        :class="[it.result, !it.result ? 'result' : '']"
                      >
                        审批意见:{{ it.remark }}
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div>
                    <div class="description-box ">
                      <div
                        v-for="(it, i) in item.approveList"
                        :key="i"
                        class="flex flex-items justify-center"
                      >
                        <div class="img-box">
                          <el-avatar :src="circleUrl" />
                        </div>
                        <span
                          v-if="
                            !item.properties.counterSign &&
                              i < item.userList.length - 1 &&
                              item.approveList.length === item.userList.length
                          "
                          style="margin:5px;font-weight: 800"
                        >
                          /
                        </span>
                      </div>
                      <div class="textName ">
                        <span
                          v-for="(it, i) in item.approveList"
                          :key="it.id"
                        >
                          <span>{{ it.userName }}</span>
                          <span
                            v-if="
                              !item.properties.counterSign &&
                                i < item.userList.length - 1 &&
                                item.approveList.length === item.userList.length
                            "
                            style="margin:5px;font-weight: 800"
                          >
                            /
                          </span>
                          <span
                            v-if="it.approveTime && it.approveTime"
                            style="margin:0 15px"
                          >
                            {{ it.jobName }}
                          </span>
                          <span v-if="it.approveTime">
                            {{ it.approveTime }}
                          </span>
                        </span>
                        <div
                          v-for="(it, i) in item.approveList"
                          :key="it.id"
                        >
                          <div
                            v-if="i == 0"
                            :class="[it.result, !it.result ? 'result' : '']"
                          >
                            {{ it.result | result }}
                          </div>
                          <span
                            v-if="it.remark"
                            :class="[it.result, !it.result ? 'result' : '']"
                          >审批意见:{{ it.remark }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
      </div>
      <!-- 按钮 -->
      <!-- v-if="!isCancel && !isFished && !isReject" -->
      <div
        v-if="!isCancel && !isFished && !preview"
        class="cancel-btn-box"
      >
        <!-- v-if="!isShowCancel && isApplyUser" -->
        <el-button
          v-if="isShowCancel && isApplyUser && !loading"
          type="primary"
          size="medium"
          @click="handelCancel"
        >
          撤回
        </el-button>
        <!-- v-if="isShowBtns" -->
        <el-tooltip
          effect="dark"
          content="拒绝审批后，该审批将终止"
          :enterable="false"
          placement="top"
        >
          <el-button
            v-if="isShowBtns"
            type="primary"
            size="medium"
            @click="handelClick('Reject')"
          >
            拒绝
          </el-button>
        </el-tooltip>
        <!-- v-if="isShowBtns" -->
        <el-tooltip
          effect="dark"
          content="同意该审批，审批将继续向下流转"
          :enterable="false"
          placement="top"
        >
          <el-button
            v-if="isShowBtns"
            type="primary"
            size="medium"
            @click="handelClick('Pass')"
          >
            同意
          </el-button>
        </el-tooltip>

        <!--        重新申请-->
        <el-tooltip
          effect="dark"
          content="重新申请"
          :enterable="false"
          placement="top"
        >
          <el-button
            v-if="isReject && isApplyUser"
            type="primary"
            size="medium"
            @click="jump"
          >
            重新申请
          </el-button>
        </el-tooltip>
      </div>
    </basic-container>
    <!-- 审批意见模态框 -->
    <el-dialog
      :title="apprTitle"
      :visible.sync="dialogVisible"
      width="600px"
      top="40vh"
      :modal-append-to-body="false"
      :before-close="resetRules"
    >
      <el-form
        ref="apprForm"
        label-position="top"
        :model="apprForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="审批意见"
          :prop="isOpinion ? 'comment' : ''"
        >
          <el-input
            v-model="apprForm.comment"
            type="textarea"
            :rows="4"
            :placeholder="tip"
          />
        </el-form-item>
      </el-form>
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
          :loading="btnloading"
          @click="handelConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getApprDetail,
  getApprRecord,
  createApprCancel,
  createApprPass,
  createApprReject,
  createApprUrge,
  getProcessDetail
} from '@/api/apprProcess/apprProcess'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import ApplyRecruitment from './components/applyRecruitment'
import ApplyPersonOffer from './components/applyPersonOffer'
export default {
  name: 'Apprv2Detail',
  components: {
    ApplyRecruitment,
    ApplyPersonOffer
  },
  filters: {
    result(data) {
      let result = {
        Pass: '审批同意',
        Reject: '审批拒绝',
        Cancel: '审批已撤回'
      }
      return result[data] || '审批中'
    }
  },
  data() {
    return {
      preview: false,
      recordlist: [],
      progressRecord: [],
      loading: false,
      // 审批编号
      apprNo: '',
      // 审批实例ID
      processInstanceId: '',
      // 流程ID
      processId: '',
      // 申请人ID
      applyUserId: '',
      // 当前审批人id
      apprUserIdList: [],
      // 审批详情
      applyDetail: {},
      StatusCN: {
        Approve: '审批中',
        Pass: '已通过',
        Reject: '已拒绝',
        Cancel: '已撤回'
      },
      show: false,
      // 审批进度
      progressList: [],
      activeStep: 0,
      // 是否已撤销 已拒绝 已完成
      isCancel: false,
      isFished: false,
      isReject: false,
      // 审批记录
      recordList: [],
      // 控制显示模态框
      dialogVisible: false,
      btnloading: false,
      // 审批同意，拒绝参数
      apprForm: {
        processInstanceId: '',
        taskId: '',
        userId: '',
        comment: ''
      },

      // 校验是否审批意见是否必填
      rules: {
        comment: [{ required: true, message: '请输入审批意见', trigger: 'blur' }]
      },
      // 判断是同意审批还是拒绝审批
      apprType: '',
      // 头像配置
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      // 审批提示
      tip: '',
      // 审批意见是否必填
      isOpinion: 0,
      isFirst: true
    }
  },

  computed: {
    // iconClass
    iconClass() {
      // 已撤回
      if (this.isCancel) {
        return function(index) {
          // 第一个显示红色
          if (index === 0) {
            return 'cancel'
          }
          return ''
        }
      }
      // 已拒绝
      else if (this.isReject) {
        return function(index) {
          if (index < this.activeStep) {
            return 'active'
          } else if (index == this.activeStep) {
            return 'reject'
          } else {
            return ''
          }
        }
      } else {
        return function(index) {
          if (index <= this.activeStep) {
            return 'active'
          }
        }
      }
    },
    // 模态框标题
    apprTitle() {
      let apprTitleCN = {
        Pass: '同意审批',
        Reject: '拒绝审批'
      }
      return apprTitleCN[this.apprType] || ''
    },
    // 撤回按钮是否显示
    isShowCancel() {
      let res = false
      let result = []
      this.progressList.map((it) => {
        result.push(it.result)
      })
      !result.includes('Pass') &&
        !result.includes('Reject') &&
        !result.includes('Cancel') &&
        (res = true)
      return res
    },
    // 拒绝同意是否显示 审批节点的审批人的用户id和当前用户相同显示
    isShowBtns() {
      let result = false
      this.apprUserIdList.forEach((item) => {
        if (item == this.userId) {
          result = true
        }
      })

      // if (this.userId === this.apprUserId) {
      // 	return true
      // }
      return result
    },
    // 提交人跟当前用户是否同一个人
    isApplyUser: function() {
      if (this.userId !== this.applyUserId) {
        return false
      } else {
        return true
      }
    },
    ...mapGetters(['userId'])
  },
  watch: {
    progressRecord: {
      handler(val) {
        val && (this.recordlist = JSON.parse(JSON.stringify(val)).reverse())
        this.recordlist = this.recordlist.filter((it) => {
          if (it.type === 'start' || it.approveList) {
            return it
          }
        })
        // this.progressRecord = val.filter((it) => {
        //   if (it.type !== 'copy') {
        //     return it
        //   }
        // })
      },
      deep: true
    }
  },
  created() {
    this.loadData()
    this.preview = this.$route.query.preview
  },
  activated() {
    if (!this.isFirst) {
      this.loadData()
    }
  },
  methods: {
    jump() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.push({
        path: '/apprProcess/apprSubmit',
        query: { processId: this.processId }
      })
    },
    // loadData
    async loadData() {
      this.loading = true
      // 计算发送请求的次数，countAjax=0则loading=false
      let countAjax = 2
      this.apprNo = this.$route.query.apprNo
      await new Promise((resolve, reject) => {
        getApprDetail(this.$route.query)
          .then((res) => {
            this.applyDetail = res
            this.applyDetail.formData = this.applyDetail.formData
              ? JSON.parse(this.applyDetail.formData)
              : {}
            this.apprNo = res.apprNo
            resolve(true)
          })
          .catch(() => {
            reject(false)
          })
          .finally(() => {
            countAjax--
            countAjax || (this.loading = false)
          })
      })

      await new Promise((resolve, reject) => {
        getApprRecord({ apprNo: this.apprNo })
          .then((res) => {
            let { data, processInstanceId, processId } = res
            this.apprForm.processInstanceId = processInstanceId
            this.processInstanceId = processInstanceId
            this.processId = processId
            this.applyUserId = data[0].userId
            // 审批进度Data数组
            this.progressList = res.data
            //如果不是 以上状态 ，在审批中，获取流程走到哪个节点
            if (!this.isCancel && !this.isReject && !this.isFished) {
              this.apprUserIdList = []
              this.progressList.forEach((item, index) => {
                if (item.result === '' && index != 0) {
                  this.apprUserIdList.push(item.userId)
                }
              })
            }
            resolve(true)
          })
          .catch(() => {
            reject(false)
          })
          .finally(() => {
            countAjax--
            countAjax || (this.loading = false)
            this.isFirst = false
          })
      })

      let nodeData = JSON.parse(this.applyDetail.nodeData || '{}')
      nodeData = nodeData.filter((it) => {
        if (it.type !== 'copy') {
          return it
        }
      })
      // 判断是否已撤回，已拒绝,已完成
      this.progressList &&
        this.progressList.length > 0 &&
        this.progressList.map((it) => {
          nodeData &&
            nodeData.length > 0 &&
            nodeData.map((item) => {
              if (it.nodeId === item.type) {
                item.approveTime = it.approveTime
                item.jobName = it.jobName
                item.userName = it.userName
                item.result = it.result
              }
              if (it.nodeId === item.nodeId) {
                !item.timeList && (item.timeList = [])
                it.approveTime && item.timeList.push(Date.parse(it.approveTime))

                !item.approveList && (item.approveList = [])
                item.approveList.push(it)
                let maxTime = item.timeList.length > 0 ? Math.max(...item.timeList) : 0
                if (item.timeList.length === item.approveList.length) {
                  //判断是否审批节点是否结束。结束才能赋值（时间）
                  item.approveTime =
                    maxTime > 0 ? moment(parseInt(maxTime)).format('YYYY-MM-DD HH:mm:ss') : ''
                } else {
                  item.approveTime = ''
                }
              }
            })
        })

      nodeData &&
        nodeData.length > 0 &&
        nodeData.map((it, index) => {
          let result = []
          it.approveList &&
            it.approveList.length > 0 &&
            it.approveList.map((item) => {
              result.push(item.result)
            })
          if (it.approveList && it.approveList.length > 0) {
            if (result.includes('Reject')) {
              this.isReject = true
              this.activeStep = index
            } else if (result.includes('Cancel')) {
              this.isCancel = true
              this.activeStep = index
            } else if (result.includes('')) {
              this.activeStep = index
            } else if (index === nodeData.length - 1 && result.includes('Pass')) {
              this.isFished = true
              this.activeStep = index
            }
          }
          if (it.type === 'start') {
            it.result === 'Cancel' && (this.isCancel = true)
          }
        })
      // this./**/
      nodeData.length > 0 &&
        (nodeData = nodeData.filter((it) => {
          if (it.type !== 'copy') {
            return it
          }
        }))
      this.progressRecord = nodeData
    },
    goBack() {
      // 返回
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
    },
    // 撤回申请
    handelCancel() {
      this.$confirm('确定撤销申请吗?', '撤销申请', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true

        createApprCancel({ processInstanceId: this.processInstanceId })
          .then(() => {
            this.$message.success('撤回成功')
            this.$router.go(-1)
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    // 点击同意或拒绝按钮展示模态框
    handelClick(type) {
      this.apprType = type
      // 获取审批流程，获取审批意见是否必填，和审批提示语
      getProcessDetail({ processId: this.processId })
        .then((res) => {
          let { isOpinion, tip } = res
          this.tip = tip
          this.isOpinion = isOpinion
          this.dialogVisible = true
          this.apprForm.comment = ''
        })
        .finally(() => {})
    },
    // 点击确定审批
    handelConfirm() {
      this.$refs.apprForm.validate((result) => {
        if (!result) return
        this.btnloading = true
        // let { userId, taskId } = this.progressList[this.activeStep]
        let userId = this.userId
        let taskId = ''
        this.progressList.map((it) => {
          userId === it.userId && (taskId = it.taskId)
        })
        if (this.apprType === 'Reject') {
          createApprReject({
            userId,
            taskId,
            processInstanceId: this.processInstanceId,
            comment: this.comment
          })
            .then(() => {
              this.$message({
                type: 'success',
                message: '你已拒绝这个申请'
              })
            })
            .finally(() => {
              this.dialogVisible = false
              this.btnloading = false
              this.goBack()
            })
        } else if (this.apprType === 'Pass') {
          createApprPass({
            userId,
            taskId,
            processInstanceId: this.processInstanceId,
            comment: this.apprForm.comment
          })
            .then(() => {
              this.$message({
                type: 'success',
                message: '你已同意这个申请'
              })
            })
            .finally(() => {
              this.dialogVisible = false
              this.btnloading = false
              this.goBack()
            })
        }
      })
    },
    // 点击催一下
    handelUrge() {
      createApprUrge({
        apprNo: this.apprNo,
        processInstanceId: this.processInstanceId
      }).then(() => {
        this.$message({
          type: 'success',
          message: '催办成功'
        })
      })
    },
    // 关闭表单后移出校验
    resetRules(done) {
      this.$refs.apprForm.resetFields()
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
// 用户提交的申请
.apply-info-wrap {
  .title {
    display: flex;
    justify-content: space-between;
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

// 审批详情
.apply-detail {
  border-bottom: 2px transparent solid;

  /deep/.detail-box {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;

    .detail-item {
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
    color: #212a3f;
    font-size: 14px;
  }

  /deep/ .el-step__title.is-process {
    font-weight: normal;
  }

  /deep/ .el-step__title.is-process .title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #212a3f;
  }

  /deep/ .el-step__title.is-finish .title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #212a3f;
  }

  .icon-box {
    position: relative;

    .tip {
      position: absolute;
      top: -30px;
      left: -20px;
    }

    .cancel-text {
      color: red;
    }

    .reject-text {
      color: red;
    }

    .fished-text {
      color: #368afa;
    }
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

  .cancel {
    background: red;
  }

  .reject {
    background: red;
  }
}

// <!-- 审批记录 -->
.record-wrap {
  margin-top: 43px;

  /deep/ .el-step__icon.is-text {
    border: 0px;
  }

  /deep/ .el-step__description.is-wait {
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
    margin-bottom: 20px;

    .img-box {
      width: 63px;
      height: 63px;
      display: flex;
      align-items: center;
      justify-content: center;
      // img {
      //   width: 48px;
      //   height: 48px;
      //   border-radius: 100%;
      // }
      .el-avatar {
        width: 48px;
        height: 48px;
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

.cancel-btn-box {
  display: flex;
  justify-content: center;
}

// 审批框
/deep/ .el-form--label-top .el-form-item__label {
  padding: 0;
}

/deep/ .el-dialog__body {
  padding: 0 20px;
}

.result {
  color: #6aafff !important;
}

.Pass {
  color: #7ad683 !important;
}

.Reject {
  color: #ff8b8a !important;
}

.Cancel {
  color: #ff8b8a !important;
}

.record_start {
  line-height: 30px;
  margin-left: 15px;
  font-size: 14px;
  color: #333;

  .text {
    color: #999;
    margin: 0 12px;
  }

  .time {
    color: #999;
    font-size: 14px;
  }
}

.counterSign_text {
  margin-left: 8px;
  color: #999;
}

.textName {
  color: #333;
  font-size: 14px;

  span {
    display: inline-block;
    line-height: 30px;
  }
}
</style>

<template>
  <!--https://github.com/SNFocus/approvalFlow源码地址-->
  <div
    v-loading="loading"
    class="page"
    @click="hidePreview()"
  >
    <header class="page__header">
      <div class="page-actions">
        <div
          style="border-right: 1px solid #c5c5c5; cursor: pointer"
          @click="exit"
        >
          <i class="el-icon-arrow-left" /> 返回
        </div>
        <div>{{ Title }} <span style="color: transparent">11</span></div>
      </div>
      <div class="step-tab">
        <div
          v-for="(item, index) in steps"
          :key="index"
          class="step"
          :class="[
            activeStep == item.key ? 'active' : '',
            { disable: formKey && item.key === 'formDesign' }
          ]"
          @click="changeSteps(item)"
        >
          <span class="step-index">
            <i
              class="iconfont"
              :class="[item.icon]"
            />
          </span>
          {{ item.label }}
        </div>
        <div
          class="ghost-step step"
          :style="{ transform: translateX }"
        />
      </div>
      <div class="button-group-box">
        <el-popover
          v-model="isPreviewClick"
          placement="top"
          width="350"
          trigger="manual"
        >
          <div
            v-loading="previewLoading"
            class="preview-box"
          >
            <div class="preview-description">
              通过模拟发起人，来模拟运行整个审批的流程，检测是否有不合理和遗漏
            </div>
            <div class="preview-content">
              <div class="content-title">
                移动端扫码预览
              </div>
              <div>
                {{ this.qrcode.url }}
              </div>
              <div class="mobile-qr-code">
                <vue-qr
                  class="qr-code-img"
                  :text="qrcode.url"
                  :margin="0"
                  color-light="#fff"
                  :logo-src="qrcode.logo"
                  :logo-corner-radius="11"
                  :size="200"
                />
                <div class="preview-description">
                  请用微信扫码预览
                </div>
              </div>
            </div>
            <div class="preview-content">
              <div class="content-title">
                PC端链接预览
              </div>
              <div>{{ host }}{{ previewLink }}</div>
              <div class="preview-button">
                <el-button
                  style="margin-top: 10px"
                  class="publish-btn"
                  size="medium"
                  type="primary"
                  @click="openNewLink"
                >
                  打开链接
                </el-button>
              </div>
            </div>
          </div>
          <el-button
            slot="reference"
            size="medium"
            @click.stop="previewClick"
          >
            预览
          </el-button>
        </el-popover>
        <el-button
          class="publish-btn"
          size="medium"
          type="primary"
          @click="toPublish"
        >
          发布
        </el-button>
      </div>
    </header>
    <section class="page__content">
      <BasicSetting
        v-show="activeStep === 'basicSetting'"
        ref="basicSetting"
        :conf="mockData.basicSetting"
        tab-name="basicSetting"
        @jump="jumpStep"
        @initiatorChange="onInitiatorChange"
      />

      <FormDesign
        v-show="activeStep === 'formDesign'"
        ref="formDesign"
        :conf="mockData.formData"
        :form-key="formKey"
        tab-name="formDesign"
      />

      <Process
        v-show="activeStep === 'processDesign'"
        ref="processDesign"
        :conf="mockData.processData"
        tab-name="processDesign"
        @startNodeChange="onStartChange"
      />

      <AdvancedSetting
        v-show="activeStep === 'advancedSetting'"
        ref="advancedSetting"
        :conf="mockData.advancedSetting"
        @jump="jumpStep"
      />
    </section>
  </div>
</template>

<script>
import Process from './components/Process/Process'
import vueQr from 'vue-qr'
import logo from '@/assets/images/logo_c.png'
import FormDesign from './components/FormDesign/FormDesign'
import BasicSetting from './components/BasicSetting/BasicSetting'
import AdvancedSetting from './components/AdvancedSetting/AdvancedSetting'
import { Base64 } from 'js-base64'
import { getApprProcess, postApprProcess, putApprProcess } from '@/api/processDesign/basicSetting'
import { createApprRreview } from '@/api/apprProcess/apprProcess'
import { mapGetters } from 'vuex'

const beforeUnload = function(e) {
  var confirmationMessage = '离开网站可能会丢失您编辑得内容'
  ;(e || window.event).returnValue = confirmationMessage // Gecko and Trident
  return confirmationMessage // Gecko and WebKit
}
const notEmptyArray = (arr) => Array.isArray(arr) && arr.length > 0
const hasBranch = (data) => notEmptyArray(data.conditionNodes)
const hasParallelBranch = (data) => notEmptyArray(data.parallelNodes)
const mobileHost = 'http://192.168.0.113:2000/' //开发环境
// const mobileHost = 'http://apitest.epro.com.cn/' //测试环境
export default {
  name: 'ProcessDesign',
  components: {
    vueQr,
    Process,
    FormDesign,
    BasicSetting,
    AdvancedSetting
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isPreviewClick: false,
      previewLoading: false,
      qrcode: {
        url: '',
        logo
      },
      host: location.host,
      previewLink: '',
      loading: false,
      Title: this.title,
      base: [],
      lineList: [],
      condition: [],
      endNode: [],
      prevData: '', // 一进入暂存数据原先的
      mockData: {}, // 可选择诸如 $route.param，Ajax获取数据等方式自行注入
      activeStep: 'basicSetting', // 激活的步骤面板
      processMap: {},
      flowName: 'flowName',
      flowId: 'fsdf',
      flowCategory: 'fsd',
      baseJson: '',
      formKey: null,
      steps: [
        {
          label: '基础设置',
          key: 'basicSetting',
          icon: 'icon-approval-info-outlined'
        },
        {
          label: '表单设计',
          key: 'formDesign',
          icon: 'icon-approval-form-outlined'
        },
        {
          label: '流程设计',
          key: 'processDesign',
          icon: 'icon-approval-flow-outlined'
        },
        {
          label: '高级设置',
          key: 'advancedSetting',
          icon: 'icon-approval-setup-outlined'
        }
      ]
    }
  },
  beforeRouteEnter(to, from, next) {
    window.addEventListener('beforeunload', beforeUnload)
    next()
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener('beforeunload', beforeUnload)
    next()
  },
  computed: {
    translateX() {
      return `translateX(${this.steps.findIndex((t) => t.key === this.activeStep) * 100}%)`
    },

    processId() {
      return _.get(this.$route.query, 'processId', null)
    },

    ...mapGetters(['userId'])
  },
  created() {
    if (this.processId) {
      this.initData()
    }
    this.formKey = this.$route.query.formKey
  },
  activated() {
    this.formKey = this.$route.query.formKey
  },
  methods: {
    openNewLink() {
      window.open(this.previewLink)
    },
    initData() {
      const { processId } = this
      let params = {
        processId
      }
      getApprProcess(params).then((res) => {
        this.Title = res.processName
        this.mockData = JSON.parse(Base64.decode(res.baseJson))
        // 暂存之前的表单设计以及流程设计的数据
        this.prevData = JSON.stringify({
          formData: this.mockData.formData,
          processData: this.mockData.processData
        })
        this.mockData.basicSetting.categoryId = res.categoryId
      })
    },
    jumpStep(data) {
      this.activeStep = data
    },
    changeSteps(item) {
      if (this.formKey && item.key === 'formDesign') {
        this.$message({
          showClose: true,
          message: '特殊流程不可修改表单',
          type: 'warning'
        })
        return
      }
      this.activeStep = item.key
    },
    /**
     * 预览参数与发布参数一致
     */
    previewClick() {
      this.toPublish('preview')
    },
    hidePreview() {
      this.isPreviewClick = false
    },
    handlePreview(params) {
      let previewParams = _.assign(params, { userId: this.userId })
      // this.$refs.basicSetting.getData().then(res => {
      //   console.log('res==', res.formData)
      // })
      this.previewLoading = true
      createApprRreview(previewParams)
        .then((res) => {
          this.previewLoading = false
          const data = res.processId
          this.qrcode.url = `${mobileHost}selfhelper/approval/apprApply?processId=${data}&type=preview`
          this.previewLink = `#/apprProcess/apprSubmit?processId=${data}&type=preview`
        })
        .catch(() => {
          this.previewLoading = false
        })
    },
    /**
     * @author guanfenda
     * @desc 发布事件
     *
     * */
    toPublish(type) {
      const getCmpData = (name) => this.$refs[name].getData()
      // basicSetting  formDesign processDesign 返回的是Promise 因为要做校验
      // advancedSetting返回的就是值
      const p1 = getCmpData('basicSetting')
      const p2 = getCmpData('formDesign')
      const p3 = getCmpData('processDesign')
      const p4 = getCmpData('advancedSetting')
      Promise.all([p1, p2, p3, p4])
        .then((res) => {
          const param = {
            basicSetting: res[0].formData,
            formData: res[1].formData,
            processData: res[2].formData,
            advancedSetting: res[3]
          }
          // 区分预览和发布操作
          this.isPreviewClick = type === 'preview' ? true : false
          this.sendToServer(param)
        })
        .catch((err) => {
          err.target && (this.activeStep = err.target)
          err.msg && this.$message.warning(err.msg)
        })
    },
    /**
     * author guanfenda
     * @decs 处理数据，提交给后台
     *
     * */
    sendToServer(param) {
      // 修改后的parma内的表单设计、流程设计
      const laterData = JSON.stringify({ formData: param.formData, processData: param.processData })
      // 1表示需要发布新版本， 0表示不需要发布新版
      const newVersion = laterData == this.prevData ? 0 : 1
      const { processId, userId } = this
      this.base = []
      this.lineList = [] //节点线
      this.condition = [] //条件节点
      this.processMap = {}
      this.endNode = [] //最后节点线
      let processData = JSON.parse(JSON.stringify(param.processData))
      this.lineEnd(processData)
      this.recursion(processData, param.processData)
      let item = {
        id: 'end',
        name: '结束',
        type: 'end'
      }
      this.base.push(item)
      this.base = [...this.base, ...this.lineList, ...this.condition, ...this.endNode]
      let { icon, processName, processAdmin, remark, categoryId } = { ...param.basicSetting }
      let { tip, isOpinion, approverDistinct, approverNull } = { ...param.advancedSetting }
      let processVisible = []
      //处理发起人节点转成后台processVisible属性
      this.handleProcessVisible(param, processVisible)

      let config = {
        icon,
        processName,
        remark,
        processVisible,
        tip,
        approverDistinct,
        categoryId,
        isOpinion: isOpinion ? 1 : 0,
        processAdmin: processAdmin,
        approverNull: approverNull,
        formKey: this.formKey
      }

      //处理空节点导致的连线。
      this.filterEemty(param)
      // 新建流程，添加userId入参
      let fixParams = {
        processId,
        userId,
        processData: this.base,
        processMap: this.processMap,
        baseJson: Base64.encode(JSON.stringify(param)),
        ...config
      }
      // 预览和发布走不同路线
      if (this.isPreviewClick) {
        this.handlePreview(fixParams)
      } else {
        // 修改接口判断条件：当存在processId未修改接口，否则为新增审批接口
        const ApprProcess = processId ? putApprProcess : postApprProcess
        // 参数设置，在修改时，需要判断是否为发布新版本
        fixParams = processId ? _.assign(fixParams, { newVersion }) : fixParams
        this.loading = true
        ApprProcess(fixParams)
          .then(() => {
            this.$message.success('提交成功')
            setTimeout(() => {
              this.$router.push({
                path: '/apprProcess/approvalList'
              })
            }, 1000)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    /**
     * @author guanfenda
     * @desc 处理发起人范围 转成，ProcessVisible属性
     * */
    handleProcessVisible(param, processVisible) {
      if (_.isArray(param.basicSetting.initiator) && param.basicSetting.initiator.length > 0) {
        param.basicSetting.initiator.map((it) => {
          let type = ''
          if (it.type) {
            let typeObect = {
              tag: 'Tag',
              user: 'User',
              position: 'Position'
            }
            type = typeObect[it.type]
          } else {
            type = 'Org'
          }
          processVisible.push({
            type: type,
            bizId: it.userId || it.orgId,
            bizName: it.name || it.orgName
          })
        })
      } else {
        processVisible.push({
          type: 'All'
        })
      }
    },
    /**
     * @author guanfenda
     * @desc 处理前端数据的空节点导致的连线问题处理掉
     * @params param 引用类型
     * */
    filterEemty(param) {
      let emptyList = []
      this.base.map((it) => {
        if (it.type === 'empty') {
          emptyList.push(it)
        }
      })

      let emptyRelation = []
      if (emptyList.length > 0) {
        emptyList.map((it) => {
          if (param.processData.childNode) {
            it.prevId =
              param.processData.childNode.nodeId === it.id
                ? param.processData.childNode.prevId
                : this.prevId_(param.processData, it.id)
          }
          this.base.map((item) => {
            if (it.id === item.source || it.id === item.target) {
              emptyRelation.push(item)
            }
          })
        })
        emptyRelation.map((it) => {
          if (it.source)
            emptyList.map((item) => {
              if (it.source == item.id) {
                it.source = item.prevId
              }
              if (it.target === item.id) {
                if (it.source.indexOf('parallelGateway') > -1) {
                  it.target = it.hasBranch + item.id
                } else {
                  it.target = 'gateway_' + item.id
                }
              }
            })
        })
      }
    },
    prevId_(data, id) {
      let priv = []
      this.prevId(data, id, priv)
      return priv[0]
    },
    prevId(data, id, priv) {
      if (data.nodeId === id) {
        priv.push('gateway_' + data.prevId)
      } else {
        if (hasBranch(data)) {
          data.conditionNodes.map((d) => {
            this.prevId(d, id, priv)
          })
        }
        data.childNode && this.prevId(data.childNode, id, priv)
      }
    },
    /**
     * @author guanfenda
     * @desc 处理结束节点问题
     * */
    lineEnd(data) {
      let endChild = this.childNode(data)
      if (data.nodeId !== endChild.nodeId && !hasBranch(endChild) && !hasParallelBranch(endChild)) {
        // 结束ID=当前ID && 结束节点无条件 && 当前节点无条件

        let line = {
          type: 'flow',
          id: endChild.nodeId + 'end',
          name: '',
          source: endChild.nodeId,
          target: 'end'
        }
        this.endNode.push(line)
      } else if (hasBranch(endChild)) {
        endChild.conditionNodes.map((it) => {
          this.lineEnd(it)
        })
      } else if (hasParallelBranch(endChild)) {
        let line = {
          type: 'flow',
          id: endChild.nodeId + 'end',
          name: '',
          source: 'parallelGateway_' + endChild.nodeId + '_end',
          target: 'end'
        }
        this.endNode.push(line)
      }
    },
    /**
     * @author guanfenda
     * 前端转后端格式函数
     * */
    recursion(data, origin, conditionNextNodeId_) {
      let type = {
        //类型
        start: 'start', //开始节点
        approver: 'task', //审批人节点,
        parallel: 'task',
        copy: 'ccTask', // 发送人节点
        condition: 'flow', //条件节点
        empty: 'empty'
      }
      let item = {
        // 处理节点（重新定义节点）
        type: type[data.type], // flow, start, end, task, ccTask, gateway 类型
        id: data.nodeId,
        name: data.properties.title // 非必填
      }
      // 开始节点
      this.startNode(data, item)
      //抄送人
      this.copyNode(data, item)
      //审批人
      this.ApprovalNode(data, item, origin)
      //条件
      this.conditionNode(data, origin, conditionNextNodeId_)
      //并行审批
      this.parallelNode(data, origin, conditionNextNodeId_)
      //处理节点线，
      //有前节点且前节点不为no_flow,且节点类型不能为条件节点（带有条件节点，他的子节点不在这么算进去）
      this.evenLine(data, item)
      // 过滤节点不能为条件节点,因为在处理条件节点是会处理。这里就过滤条件
      this.addBaseNode(data, item)
      data.childNode && this.recursion(data.childNode, origin.childNode) //有子节点，递归节点
    },
    /**
     * @author guafenda
     * @desc 除去条件节点其他节点
     * @params item 引用类型
     * */
    addBaseNode(data, item) {
      if (data.type !== 'condition') {
        //过滤节点不能为条件节点,因为在处理条件节点是会处理。这里就过滤条件
        this.base.push(item)
      }
    },
    /**
     * @author guanfenda
     *@desc 除去条件节点其他节点的连线
     * @params data 引用类型
     * */
    evenLine(data) {
      if (
        data.prevId &&
        data.prevId !== 'no_flow' &&
        data.type !== 'condition' &&
        data.type !== 'start' &&
        data.type !== 'parallel'
      ) {
        //有前节点且前节点不为no_flow,且节点类型不能为条件节点（带有条件节点，他的子节点不在这么算进去）
        let items = {
          //节点线
          type: 'flow', // flow, start, end, task, ccTask, gateway
          id: data.prevId + data.nodeId,
          name: data.properties.title, // 非必填
          source: data.prevId,
          target: data.nodeId
        }
        this.lineList.push(items)
      }
    },
    /**
     * @author guanfenda
     * @desc 处理开始节点转换成后台需要节点
     * @params data，item 引用类型
     *
     * */
    startNode(data, item) {
      if (data.type === 'start') {
        //开始节点
        item.initiator = 'initiator'
        // item.id = 'start'
      }
    },
    /**
     * @author guanfenda
     * @desc 处理抄送人节点转换成后台格式
     * @params data item 引用类型
     * */
    copyNode(data, item) {
      if (data.type === 'copy') {
        //抄送人节点
        item.assignee = 'copyUser_' + data.properties.attribute
      }
    },
    /**
     *  @author guanfenda
     *  @desc 处理审批人节点转换成后台需要节点
     *  @params data,item,origin 引用类型
     * */
    ApprovalNode(data, item, origin) {
      if (data.type === 'approver' || data.type === 'parallel') {
        //审批指定职位·指定岗位，上级领导，标签
        let list = Object.keys(data.properties.infoForm || [])
        if (list.includes(`${data.properties.assigneeType}Id`)) {
          item.assignee = '${' + `${data.properties.assigneeType}_` + data.nodeId + '_id}'
          this.processMap[`${data.properties.assigneeType}_` + data.nodeId + '_id'] = ''
          origin.variable = `${data.properties.assigneeType}_` + data.nodeId + '_id'
        } else if (data.properties.assigneeType === 'user') {
          //指定成员人，
          item.assignee = 'taskUser_' + data.properties.attribute
          let length = data.content.split(',').length
          if (length > 1) {
            origin.variable = 'optional_' + data.nodeId //这个前端发起用的变量
            item.assignee = '${taskUser_' + data.nodeId + '}'
            item.completion = data.properties.counterSign ? '1' : '0' //0 或签，1会签
            item.element = 'taskUser_' + data.nodeId
            item.collection = 'optional_' + data.nodeId
          }
        } else if (data.properties.assigneeType === 'optional') {
          // 发起人自选
          item.assignee = '${optional_' + data.nodeId + '_id}'
          if (!data.properties.optionalMultiUser) {
            //
            origin.variable = 'optional_' + data.nodeId + '_id' //这个前端发起用的变量
            this.processMap['optional_' + data.nodeId + '_id'] = '' // 后端对应前端变量
          } else if (data.properties.optionalMultiUser) {
            origin.variable = 'optional_' + data.nodeId //这个前端发起用的变量
            item.collection = 'optional_' + data.nodeId //后台接收前端变量
            item.completion = data.properties.counterSign ? '1' : '0' //0 或签，1会签
            // item.assignee = '${optional_' + data.nodeId + '_id}' // assignee 和 element 后端 处理循环用得到、
            item.element = 'optional_' + data.nodeId + '_id' //会签或签 assignee 和 element 后端 处理循环用得到//这是个集合，后台for循环
            this.processMap['optional_' + data.nodeId] = ''
          }
        } else {
          item.assignee = 'taskUser_' + data.properties.attribute //
        }
      }
    },
    /**
     * @author guanfenda
     * @desc 处理并行节点转换成后台需要节点 （格式化）
     * @params  data origin  conditionNextNodeId_引用类型
     * */
    parallelNode(data, origin, fisrtbranchChild) {
      if (hasParallelBranch(data)) {
        //判断是否存在条件，如果有。。。
        let conditionNextNodeId = fisrtbranchChild
          ? fisrtbranchChild
          : data.childNode
          ? data.childNode.nodeId
          : '' //判断第一个条件是否存在子节点
        let parallelGatewayNode = this.addParallelGatewayNode(data)

        if (data.childNode) {
          data.childNode.prevId = 'no_flow' //避免重新连线（后面处理线，不给连线）
        }
        this.enterBeforeLine(data)
        this.leaveBeforeLine(data, conditionNextNodeId)
        data.parallelNodes.map((d, index) => {
          let targetId = ''
          let sourceId = ''
          if (d.childNode) {
            let endChild = this.childNode(d, data)
            targetId = parallelGatewayNode.end && parallelGatewayNode.end.id
            sourceId = endChild.nodeId
          } else if (d.conditionNodes) {
            targetId = data.VirtualNodeId ? data.VirtualNodeId.id : ''
          } else if (d.parallelNodes) {
            targetId = 'parallelGateway_' + d.nodeId
            sourceId = d.nodeId
          } else {
            targetId = parallelGatewayNode.end && parallelGatewayNode.end.id
            sourceId = d.nodeId
          }

          this.enterAfterlLine(d, parallelGatewayNode.start)

          if (!d.conditionNodes && !d.parallelNodes) {
            //不处理有条件的节点和有并行的节点
            this.leaveLine(data, d, targetId, sourceId)
          } else {
            d.fisrtParallelBanchNodeId = d.fisrtParallelBanchNodeId
              ? d.fisrtParallelBanchNodeId
              : data.nodeId
          }
          this.recursion(d, origin.parallelNodes[index], conditionNextNodeId)
        })
      }
    },
    enterBeforeLine(data) {
      if (data.type !== 'empty' && data.type !== 'condition') {
        //这里处理的除了空节点以外的节点和网关节点的连线

        let enptyLine = {
          type: 'flow',
          id: data.nodeId + '_1parallelGateway_' + data.nodeId,
          name: '',
          source: data.nodeId,
          target: 'parallelGateway_' + data.nodeId
        }
        this.condition.push(enptyLine)
      }
    },
    leaveBeforeLine(data, conditionNextNodeId) {
      if (data.childNode) {
        let endLine = {
          type: 'flow',
          id: data.nodeId + '_' + 'parallelGateway_' + data.childNode.nodeId,
          name: '',
          source: 'parallelGateway_' + data.nodeId + '_end',
          target: data.childNode.nodeId,
          hasBranch: hasBranch(data.childNode)
            ? 'gateway_'
            : hasParallelBranch(data.childNode)
            ? 'parallelGateway_'
            : ''
        }
        this.condition.push(endLine)
        let endChild = this.childNode(data)
        if (
          endChild.nodeId !== conditionNextNodeId &&
          !hasParallelBranch(endChild) &&
          !hasBranch(endChild) &&
          data.fisrtParallelBanchNodeId
        ) {
          let leaveLine = {
            type: 'flow',
            id: data.nodeId + '_parallelGateway_' + conditionNextNodeId,
            name: '',
            source: endChild.nodeId,
            target: 'parallelGateway_' + data.fisrtParallelBanchNodeId + '_end'
          }
          this.condition.push(leaveLine)
        }
      } else if (conditionNextNodeId && data.type !== 'condition') {
        let endLine = {
          type: 'flow',
          id: data.nodeId + '_' + 'parallelGateway_' + conditionNextNodeId,
          name: '',
          source: 'parallelGateway_' + data.nodeId + '_end',
          target: 'parallelGateway_' + conditionNextNodeId + '_end'
        }
        this.condition.push(endLine)
      } else if (data.fisrtParallelBanchNodeId) {
        let endLine = {
          type: 'flow',
          id: data.nodeId + '_' + 'parallelGateway_' + data.fisrtParallelBanchNodeId,
          name: '',
          source: 'parallelGateway_' + data.nodeId + '_end',
          target: 'parallelGateway_' + data.fisrtParallelBanchNodeId + '_end'
        }
        this.condition.push(endLine)
      } else if (data.fisrtBanchNodeId) {
        let endLine = {
          type: 'flow',
          id: data.nodeId + '_' + 'parallelGateway_' + data.fisrtBanchNodeId,
          name: '',
          source: 'parallelGateway_' + data.nodeId + '_end',
          target: data.fisrtBanchNodeId
        }
        this.condition.push(endLine)
      }
    },
    leaveLine(data, d, targetId, sourceId) {
      let endChild = this.childNode(d)
      if (!hasBranch(endChild) && !hasParallelBranch(endChild)) {
        let excludeCdCdline = {
          type: 'flow',
          id: 'parallelGateway_' + data.nodeId + d.nodeId,
          name: '',
          source: sourceId, //前节点
          target: targetId // 当前节点
        }
        this.condition.push(excludeCdCdline)
      }
    },
    enterAfterlLine(data, startParallelGateway) {
      //有前节点且前节点不为no_flow,且节点类型不能为条件节点（带有条件节点，他的子节点不在这么算进去）
      let startParallelLine = {
        //节点线
        type: 'flow', // flow, start, end, task, ccTask, gateway
        id: startParallelGateway.id + '_' + data.nodeId,
        source: startParallelGateway.id,
        target: data.nodeId
      }
      this.lineList.push(startParallelLine)
    },
    /**
     * @author guanfenda
     * @desc 添加并行网关节点
     * @params data
     * */
    addParallelGatewayNode(data) {
      let startParallelGatewayNode = {
        //并行网关节点
        type: 'parallelGateway',
        id: 'parallelGateway_' + data.nodeId,
        name: ''
      }
      let endParallelGatewayNode = {
        //并行网关节点
        type: 'parallelGateway',
        id: 'parallelGateway_' + data.nodeId + '_end',
        name: ''
      }
      this.condition.push(startParallelGatewayNode)
      this.condition.push(endParallelGatewayNode)
      return {
        start: startParallelGatewayNode,
        end: endParallelGatewayNode
      }
    },
    /**
     * @author guanfenda
     * @desc 处理条件节点转换成后台需要节点 （格式化）
     * @params  data origin  conditionNextNodeId_引用类型
     * */
    conditionNode(data, origin, conditionNextNodeId_) {
      if (hasBranch(data)) {
        //判断是否存在条件，如果有。。。
        let conditionNextNodeId = conditionNextNodeId_
          ? conditionNextNodeId_
          : data.childNode
          ? data.childNode.nodeId
          : '' //判断条件是否存在子节点
        if (data.childNode) {
          data.childNode.prevId = 'no_flow' //避免重新连线（后面处理线，不给连线）
        }
        //处理条件节点（后台没有条件节点这个概念，可以理解为分叉点），转换成网关节点 ,返回网关节点，给下面使用
        let gatewayNode = this.addGatewayNode(data)
        //处理有空节点和条件下有条件的节点(特殊节点) 和 这里处理的除了空节点以外的节点和网关节点的连线
        this.specialNode(data)
        data.conditionNodes.map((d, index) => {
          d.VirtualNodeId = gatewayNode
          // 虚拟节点
          let targetId = ''
          this.childNode(d, data, 'condition')
          if (d.childNode) {
            targetId = d.childNode.nodeId
            d.childNode.prevId = 'no_flow' // 避免重新连线（后面处理线，不给连线）
          } else if (d.conditionNodes) {
            targetId = data.VirtualNodeId ? data.VirtualNodeId.id : ''
          } else if (d.parallelNodes) {
            targetId = 'parallelGateway_' + d.nodeId
          } else if (data.fisrtParallelBanchNodeId) {
            targetId = 'parallelGateway_' + data.fisrtParallelBanchNodeId + '_end'
          } else {
            targetId = conditionNextNodeId || 'end'
          }

          //整合条件节点的条件，格式化成后台格式
          let conditionExpression = this.concordanceConditions(d)
          if (!d.conditionNodes) {
            //不处理有条件的节点
            this.excludeCdCdLine(data, targetId, conditionExpression, d)
          } else {
            //处理有条件的节点整合条件节点的条件，格式化成后台格式
            let prevNodeLine = {
              //网关线
              name: d.properties.title,
              source: 'gateway_' + data.nodeId, //前节点
              target: targetId, // 当前节点
              conditionExpression: conditionExpression
            }
            d.condition = prevNodeLine //给递归使用（前面代码有用到）
          }
          //处理有条件存在，有子节点的最后节点和条件节点父节点的子节点连起来（离开是的连线）
          this.conditoinEndLine(conditionNextNodeId, d, data)

          this.recursion(d, origin.conditionNodes[index], conditionNextNodeId)
        })
      }
    },
    /**
     * @author guanfenda
     * 获取最后一个节点
     * */
    childNode(data, fisrtBranchData, condition) {
      !condition &&
        fisrtBranchData &&
        (data.fisrtParallelBanchNodeId =
          fisrtBranchData.fisrtParallelBanchNodeId || fisrtBranchData.nodeId)
      condition &&
        fisrtBranchData &&
        fisrtBranchData.childNode &&
        (data.fisrtBanchNodeId =
          fisrtBranchData.fisrtBanchNodeId || fisrtBranchData.childNode.nodeId)
      if (data.childNode) {
        return this.childNode(data.childNode, fisrtBranchData, condition)
      } else {
        return data
      }
    },
    /**
     * @author guanfenda
     * @desc 添加网关节点
     * @params data
     * */
    addGatewayNode(data) {
      let gatewayNode = {
        //网关节点
        type: 'gateway',
        id: 'gateway_' + data.nodeId,
        name: ''
      }
      this.condition.push(gatewayNode)
      return gatewayNode
    },
    /**
     * @author guanfenda
     * @desc 处理有空节点和条件下有条件的节点 和 这里处理的除了空节点以外的节点和网关节点的连线
     *
     * */
    specialNode(data) {
      if (data.condition) {
        //处理条件节点下的有条件的节点，用线链接起来
        let multipleConditionsLine = {
          //进网关线
          type: 'flow',
          id: data.nodeId + 'gateway_' + data.nodeId,
          name: '',
          source: data.VirtualNodeId.id,
          target: 'gateway_' + data.nodeId,
          conditionExpression: data.condition.conditionExpression
        }

        this.condition.push(multipleConditionsLine)
      } else if (data.type !== 'empty') {
        //这里处理的除了空节点以外的节点和网关节点的连线
        let enptyLine = {
          //空节线
          type: 'flow',
          id: data.nodeId + 'gateway_' + data.nodeId,
          name: '',
          source: data.nodeId,
          target: 'gateway_' + data.nodeId
        }
        this.condition.push(enptyLine)
      }
    },
    /**
     *@author guanfenda
     * @desc 整合条件节点的条件，格式化成后台格式
     * @parmas d，conditionExpression 引用类型
     * */
    concordanceConditions(d) {
      let conditionExpression = []
      d.properties.conditions.map((it) => {
        this.processMap[it.vModel] = ''
        let val = ''
        if (['money', 'number', 'daterange'].includes(it.type) && it.defaultValue.type === 'bet') {
          val = it.defaultValue.value[1] == 'lt' ? 'gt' : 'gte'
          // 介于两值之间
          conditionExpression.push(
            '${' +
              it.vModel +
              ' ' +
              val +
              ' ' +
              it.defaultValue.value[0] +
              ' and ' +
              it.vModel +
              ' ' +
              it.defaultValue.value[2] +
              ' ' +
              it.defaultValue.value[3] +
              '}'
          )
        } else if (!['checkbox', 'radio'].includes(it.type)) {
          // 为了处理数字类型，其他的类型都不经过此处
          conditionExpression.push(
            '${' + it.vModel + ' ' + it.defaultValue.type + ' ' + it.defaultValue.value + '}'
          )
        }

        it.type === 'radio' && conditionExpression.push('${' + it.vModel + ' eq \'' + it.val + '\'}')
        // 添加对多选的类型处，当作string类型，发起的时候要注意顺序。
        if (it.type === 'checkbox') {
          const val = it.selectMode === 'some' ? [-1, ...it.val] : it.val
          conditionExpression.push('${' + it.vModel + ' eq \'' + _.sortBy(val) + '\'}')
        }
      })

      let strs = ''
      if (d.properties.initiator && d.properties.initiator.length > 0) {
        //如果有部门，字符串拼接
        d.properties.initiator.map((it, i) => {
          strs +=
            ' initiator_org eq ' +
            '\'' +
            it.orgId +
            '\'' +
            (i === d.properties.initiator.length - 1 ? '' : ' or ')
        })
      }
      conditionExpression = conditionExpression.join('&&') //除部门外的其他条件拼接
      conditionExpression = conditionExpression.replace(/}&&\${/g, ' and ') //格式化字符
      if (strs) {
        //处理部门条件
        strs = conditionExpression ? ' and (' + strs + ')' : '${ ' + strs + ' }'
        conditionExpression =
          conditionExpression.slice(0, -1) + strs + conditionExpression.slice(-1)
      }
      return conditionExpression
    },
    /**
     *@author guanfenda
     *@desc 处理条件节点下的节点的线（排除有条件的节点）
     * */
    excludeCdCdLine(data, targetId, conditionExpression, d) {
      let excludeCdCdline = {
        //出网关线
        type: 'flow',
        id: 'gateway_' + data.nodeId + d.nodeId + targetId,
        name: d.properties.title,
        source: 'gateway_' + data.nodeId, //前节点
        target: targetId, // 当前节点
        conditionExpression: conditionExpression
      }

      this.condition.push(excludeCdCdline)
    },
    /**
     * @author guanfenda
     * @desc
     * */
    conditoinEndLine(conditionNextNodeId, d, data) {
      if (conditionNextNodeId && d.childNode) {
        //处理有条件存在，有子节点的最后节点和条件节点父节点的子节点连起来
        let endNode = this.childNode(d.childNode)
        if (data.fisrtParallelBanchNodeId) {
          conditionNextNodeId = 'parallelGateway_' + data.fisrtParallelBanchNodeId + '_end'
        }
        if (!endNode.parallelNodes) {
          let endLine = {
            type: 'flow',
            id: endNode.nodeId + conditionNextNodeId,
            name: '',
            source: endNode.nodeId,
            target: conditionNextNodeId
          }
          this.condition.push(endLine)
        }
      }
    },
    exit() {
      this.$confirm('离开此页面您得修改将会丢失, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push({
            path: '/apprProcess/approvalList'
          })
        })
        .catch(() => {})
    },
    /**
     * 同步基础设置发起人和流程节点发起人
     */
    onInitiatorChange(val, labels) {
      const processCmp = this.$refs.processDesign
      const startNode = processCmp.processData // 修复取值错误（data ==> processData）
      startNode.properties.initiator = val
      startNode.content = labels || '所有人'
      processCmp.forceUpdate()
    },
    /**
     * 监听 流程节点发起人改变 并同步到基础设置 发起人数据
     */
    onStartChange(node) {
      const basicSetting = this.$refs.basicSetting
      basicSetting.formData.initiator = node.properties.initiator
    }
  }
}
</script>
<style lang="stylus" scoped>
$header-height = 54px;
.preview-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  .preview-description {
    font-size:12px;
    color: #999999;
    margin-bottom: 10px
  }
  .preview-content {
    margin-bottom: 10px;
    .content-title {
      font-size: 16px;
      color: #1e1e1e;
      font-weight: 550;
    }
    .mobile-qr-code {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .qr-code-img {
        width: 150px;
        height: 150px;
        margin: 4px 0;
      }
    }
    .preview-button {
      display: flex;
      justify-content: center;
    }
  }
}
.page {
  width: 100vw;
  height: 100vh;
  padding-top: $header-height;
  box-sizing: border-box;

  .page__header {
    width: 100%;
    height: $header-height;
    flex-center()
    justify-content: space-between;
    box-sizing: border-box;
    /*color: white;*/
    /*background: #3296fa;*/
    background: #fff;
    color: #757C85;
    font-size: 14px;
    position: fixed;
    top: 0;

    .page-actions {
      height: 100%;
      text-align: center;
      line-height: $header-height;

      > div {
        height: 100%;
        padding-left: 20px;
        padding-right: 20px;
        display: inline-block;
      }

      i {
        font-size: 22px;
        vertical-align: middle;
      }
    }

    .step-tab {
      display: flex;
      justify-content: center;
      height: 100%;
      position: relative;

      > .step {
        width: 140px;
        font-size: 16px;
        line-height: $header-height;
        text-align: center;
        cursor: pointer;
        position: relative;

        &.ghost-step {
          position: absolute;
          height: $header-height;
          left: 0;
          z-index: -1;
          /*background: #4483f2;*/
          background: #fff;
          transition: transform .5s;

          &::after {
            content: '';
            border-width: 6px 6px 6px;
            border-style: solid;
            border-color: transparent transparent white;
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -6px;
          }
        }

        &.active {
          font-size: 16px;
          color: #202940;
          border-bottom: 2px solid #207EFA;
        }

        &.active > .step-index {
          background: white;
          color: #202940;
        }

        &.disable {
          opacity: 0.5
        }

        > .step-index {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 1px solid #fff;
          border-radius: 8px;
          line-height: 18px;
          text-align: center;
          box-sizing: border-box;
        }
      }
    }
  }

  .page__content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background #f5f5f7;
    padding-top: 15px;
  }
}

.publish-btn {
  margin: 0 15px;
}

.github {
  position fixed
  bottom 10px
  left 20px
}
</style>

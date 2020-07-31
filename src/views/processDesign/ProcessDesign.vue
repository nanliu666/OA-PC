<template>
  <div class="page">
    <header class="page__header">
      <div class="page-actions">
        <div
          style="border-right:1px solid #c5c5c5;cursor: pointer;"
          @click="exit"
        >
          <i class="el-icon-arrow-left" /> 返回
        </div>
        <div>{{ title }} <span style="color: transparent">11</span></div>
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
      <el-button
        size="small"
        class="publish-btn"
        type="primary"
        @click="publish"
      >
        发布
      </el-button>
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
// @ is an alias to /src
import Process from './components/Process/Process'
import FormDesign from './components/FormDesign/FormDesign'
import BasicSetting from './components/BasicSetting/BasicSetting'
import AdvancedSetting from './components/AdvancedSetting/AdvancedSetting'
// import { postDeploy } from '../../api'
import { Base64 } from 'js-base64'
import { getApprProcess, postApprProcess } from '@/api/processDesign/basicSetting'
// import mockData from "@/views/processDesign/mockData";

const beforeUnload = function(e) {
  var confirmationMessage = '离开网站可能会丢失您编辑得内容'
  ;(e || window.event).returnValue = confirmationMessage // Gecko and Trident
  return confirmationMessage // Gecko and WebKit
}
const notEmptyArray = (arr) => Array.isArray(arr) && arr.length > 0
const hasBranch = (data) => notEmptyArray(data.conditionNodes)
export default {
  name: 'ProcessDesign',
  components: {
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
      base: [],
      lineList: [],
      condition: [],
      endNode: [],
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
    }
  },
  created() {
    if (this.$route.query.processId) {
      this.initData()
    }
    this.formKey = this.$route.query.formKey
  },
  activated() {
    this.formKey = this.$route.query.formKey
  },
  methods: {
    initData() {
      let params = {
        processId: this.$route.query.processId
      }
      getApprProcess(params).then((res) => {
        this.title = res.processName
        this.mockData = JSON.parse(Base64.decode(res.baseJson))
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
    publish() {
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
          this.sendToServer(param)
        })
        .catch((err) => {
          err.target && (this.activeStep = err.target)
          err.msg && this.$message.warning(err.msg)
        })
    },
    sendToServer(param) {
      this.$notify({
        title: '数据已整合完成',
        message: '请在控制台中查看数据输出',
        position: 'bottom-right'
      })
      this.base = []
      this.lineList = []
      this.condition = []
      this.processMap = {}
      this.endNode = []
      // let endN= this.childNode(param.processData)
      // this.endNode = endN.nodeId
      let processData = JSON.parse(JSON.stringify(param.processData))
      this.resfun(processData)
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
      if (param.basicSetting.initiator && param.basicSetting.initiator.length > 0) {
        param.basicSetting.initiator.map((it) => {
          let type = ''
          if (it.type) {
            type = 'User'
          } else {
            type = 'Org'
          }
          processVisible.push({
            type: type,
            bizId: '',
            bizName: ''
          })
        })
      } else {
        // type
        processVisible = [
          {
            type: 'All'
          }
        ]
      }
      let config = {
        icon,
        processName,
        remark,
        processVisible,
        tip,
        approverDistinct,
        categoryId,
        isOpinion: isOpinion ? 1 : 0,
        processAdmin: [processAdmin],
        approverNull: approverNull
      }
      // 基础设置
      // "flowName": "转正申请",      // 流程名称
      //     // 流程ID，创建流程不用传；修改时传待修改的流程ID
      //     "flowId": "c3158e3f-bf2b-11ea-bf93-d0278889fb56",
      //     "flowKey": "UserFormalInfo", // 流程的标识
      //     "flowCategory": "leave"，    // 流程分类
      // "baseJson": "base64Json",    // 前端的json字符串，后端保存，必要时再回传给前端
      let params = {
        processData: this.base,
        processMap: this.processMap,
        baseJson: Base64.encode(JSON.stringify(param)),
        ...config
      }
      // eslint-disable-next-line
      console.log(JSON.stringify(param))
      postApprProcess(params).then(() => {
        this.$message.success('提交成功')
      })
      // postDeploy(params).then(() => {
      //   this.$message.success('提交成功')
      // })
    },
    resfun(data) {
      let endChild = this.childNode(data)
      // let istrue = hasBranch(endChild)
      if (data.nodeId !== endChild.nodeId && !hasBranch(endChild)) {
        // 结束ID=当前ID && 结束节点无条件 && 当前节点无条件
        // return

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
          this.resfun(it)
        })
      }
    },
    recursion(data, origin) {
      let type = {
        //类型
        start: 'start', //开始节点
        approver: 'task', //审批人节点
        copy: 'ccTask', // 发送人节点
        condition: 'flow' //条件节点
      }
      let item = {
        // 处理节点（重新定义节点）
        type: type[data.type], // flow, start, end, task, ccTask, gateway 类型
        id: data.nodeId,
        name: data.properties.title // 非必填
      }
      if (data.type === 'start') {
        //开始节点
        item.initiator = 'initiator'
      }
      if (data.type === 'copy') {
        //抄送人节点
        item.assignee = 'copyUser_' + data.properties.attribute
      }
      if (data.type === 'approver') {
        //审批人节点
        if (data.properties.assigneeType === 'user') {
          //指定成员人，
          item.assignee = 'taskUser_' + data.properties.attribute
          let length = data.content.split(',').length
          if (length > 1) {
            origin.variable = 'optional_' + data.nodeId
            item.assignee = '${taskUser_' + data.nodeId + '}'
            item.completion = data.properties.counterSign ? '1' : '0' //0 或签，1会签
            item.element = 'taskUser_' + data.nodeId
            item.collection = 'optional_' + data.nodeId
          }
        } else if (data.properties.assigneeType === 'role') {
          //角色
          item.assignee = '${role_' + data.nodeId + '_id}'
          this.processMap['role_' + data.nodeId + '_id'] = ''
        } else if (data.properties.assigneeType === 'position') {
          // 岗位
          item.assignee = '${position_' + data.nodeId + '_id}'
          this.processMap['position_' + data.nodeId + '_id'] = ''
        } else if (data.properties.assigneeType === 'optional') {
          // 发起人自选
          item.assignee = '${optional_' + data.nodeId + '_id}'
          let length = data.content.split(',').length
          if (length < 2 && !data.properties.optionalMultiUser) {
            origin.variable = 'optional_' + data.nodeId + '_id'
            this.processMap['optional_' + data.nodeId + '_id'] = ''
          }
          if (
            data.properties.optionalMultiUser ||
            (length > 1 && !data.properties.optionalMultiUser)
          ) {
            origin.variable = 'optional_' + data.nodeId
            item.completion = data.properties.counterSign ? '1' : '0' //0 或签，1会签
            item.collection = 'optional_' + data.nodeId
            item.element = 'optional_' + data.nodeId + '_id'
            this.processMap['optional_' + data.nodeId] = ''
          }
        } else if (data.properties.assigneeType === 'director') {
          // 主管
          origin.variable = 'director_' + data.nodeId + '_id'
          item.assignee = '${director_' + data.nodeId + '_id}'
          this.processMap['director_' + data.nodeId + '_id'] = ''
        } else if (data.properties.assigneeType === 'mySelf') {
          //发起人自己
          item.assignee = '${initiator}'
        } else {
          item.assignee = 'taskUser_' + data.properties.attribute
        }
      }
      if (data.prevId && data.prevId !== 'no_flow' && data.type !== 'condition') {
        //有前节点且前节点不为no_flow,且节点类型不能为条件节点
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
      if (data.type !== 'condition') {
        //过滤节点不能为条件节点,因为在处理条件节点是会处理。这里就过滤条件
        this.base.push(item)
      }
      data.childNode && this.recursion(data.childNode, origin.childNode) //有子节点，递归节点
      if (hasBranch(data)) {
        //判断是否存在条件，如果有。。。
        let conditionNextNodeId = data.childNode ? data.childNode.nodeId : '' //判断条件是否存在子节点
        if (data.childNode) {
          data.childNode.prevId = 'no_flow' //避免重新连线
        }
        let newItem = {
          //网关节点
          type: 'gateway',
          id: 'gateway_' + data.nodeId,
          name: ''
        }
        this.condition.push(newItem)
        let newIt = {
          //进网关线
          type: 'flow',
          id: data.nodeId + 'gateway_' + data.nodeId,
          name: '',
          source: data.nodeId,
          target: 'gateway_' + data.nodeId
        }
        this.condition.push(newIt)
        data.conditionNodes.map((d, index) => {
          let targetId = ''
          if (d.childNode) {
            targetId = d.childNode.nodeId
            d.childNode.prevId = 'no_flow' // 避免重新连线
          } else {
            targetId = conditionNextNodeId || 'end'
          }

          let conditionExpression = []
          d.properties.conditions.map((it) => {
            it.type === 'number' &&
              conditionExpression.push(
                '${' + it.vModel + ' ' + it.defaultValue.type + ' ' + it.defaultValue.value + '}'
              )
          })
          conditionExpression = conditionExpression.join('&&')
          // if(d.properties.conditions)
          // d.content === '其他情况进入此流程' ? '${days gt 3}' : '${days ge 3}'
          let newIt = {
            //出网关线
            type: 'flow',
            id: 'gateway_' + data.nodeId + d.nodeId + targetId,
            name: d.properties.title,
            source: 'gateway_' + data.nodeId, //前节点
            target: targetId, // 当前节点
            conditionExpression: conditionExpression
          }
          this.processMap['days'] = ''
          this.condition.push(newIt)
          if (conditionNextNodeId && d.childNode) {
            let endNode = this.childNode(d.childNode) //
            let endIt = {
              type: 'flow',
              id: endNode.nodeId + conditionNextNodeId,
              name: '',
              source: endNode.nodeId,
              target: conditionNextNodeId
            }
            this.condition.push(endIt)
          }
          this.recursion(d, origin.conditionNodes[index])
        })
      }
    },
    childNode(data) {
      if (data.childNode) {
        return this.childNode(data.childNode)
      } else {
        return data
      }
    },
    flat(data) {
      data.conditionNodes.map(() => {
        // flatList.push(it)
      })
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
          // this.$message({
          //   type: 'success',
          //   message: '模拟返回!'
          // })
        })
        .catch(() => {})
    },
    /**
     * 同步基础设置发起人和流程节点发起人
     */
    onInitiatorChange(val, labels) {
      const processCmp = this.$refs.processDesign
      const startNode = processCmp.data
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
  margin-right: 20px;
  /*color: #3296fa;*/
  color: #fff;
  background: #207EFA;
  border-radius: 4px;
  padding: 7px 20px;
  font-size: 14px;
}

.github {
  position fixed
  bottom 10px
  left 20px
}
</style>

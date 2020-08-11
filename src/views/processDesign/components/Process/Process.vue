<script>
/* eslint-disable no-unused-vars */
import FlowCard from './FlowCard/FlowCard.vue'
import PropPanel from './PropPanel/PropPanel.vue'
import { NodeUtils, getMockData } from './FlowCard/util.js'

export default {
  name: 'Process',
  props: ['tabName', 'conf'],
  data() {
    let data = getMockData()
    return {
      data, // 流程图数据

      scaleVal: 100, // 流程图缩放比例 100%
      step: 5, // 缩放步长
      updateId: 0, // key值 用于模拟$forceUpdate
      activeData: null, // 被激活的流程卡片数据，用于属性面板编辑
      isProcessCmp: true,
      verifyMode: false
    }
  },
  watch: {
    conf: {
      handler(val) {
        // alert(12)
        this.data = {
          type: 'start',
          content: '所有人',
          properties: { title: '发起人', initiator: 'ALL', formOperates: [] },
          nodeId: 'hb2',
          prevId: '__vue_devtool_undefined__',
          childNode: {
            type: 'approver',
            content: 'Zeus',
            properties: {
              title: '审批人',
              attribute: '1258244944030916609',
              approvers: [
                {
                  workNo: '0001',
                  name: 'Zeus',
                  userId: '1258244944030916609',
                  id: '1252523599903072258_1258244944030916609',
                  type: 'user'
                }
              ],
              assigneeType: 'user',
              formOperates: [],
              counterSign: true,
              optionalMultiUser: false,
              optionalRange: 'USER'
            },
            nodeId: 'ib2',
            prevId: 'hb2'
          },
          conditionNodes: [
            {
              type: 'condition',
              content: '[我付多少钱 > 15] \n',
              properties: {
                title: '条件1',
                conditions: [
                  {
                    vModel: 'field1',
                    type: 'number',
                    formId: 1,
                    defaultValue: { type: 'gt', value: 15 }
                  }
                ],
                initiator: null,
                priority: 0
              },
              nodeId: 'gb2',
              prevId: 'hb2',
              conditionNodes: [
                {
                  type: 'condition',
                  content: '[我买了 = 面包] \n',
                  properties: {
                    title: '条件1',
                    conditions: [
                      {
                        vModel: 'field2',
                        type: 'radio',
                        formId: 2,
                        defaultValue: '面包',
                        val: '面包'
                      }
                    ],
                    initiator: null,
                    priority: 0
                  },
                  nodeId: 'lb2',
                  prevId: 'gb2',
                  childNode: {
                    type: 'approver',
                    content: '游荣昌',
                    properties: {
                      title: '审批人',
                      attribute: '1262998215033409537',
                      approvers: [
                        {
                          workNo: '0002',
                          name: '游荣昌',
                          userId: '1262998215033409537',
                          id: '1252523599903072258_1262998215033409537',
                          type: 'user'
                        }
                      ],
                      assigneeType: 'user',
                      formOperates: [],
                      counterSign: true,
                      optionalMultiUser: false,
                      optionalRange: 'USER'
                    },
                    nodeId: 'nb2',
                    prevId: 'lb2'
                  }
                },
                {
                  type: 'condition',
                  content: '[我买了 = 牛奶] \n',
                  properties: {
                    title: '条件2',
                    conditions: [
                      {
                        vModel: 'field2',
                        type: 'radio',
                        formId: 2,
                        defaultValue: '牛奶',
                        val: '牛奶'
                      }
                    ],
                    initiator: null,
                    priority: 1
                  },
                  nodeId: 'mb2',
                  prevId: 'gb2',
                  childNode: {
                    type: 'approver',
                    content: '康儒',
                    properties: {
                      title: '审批人',
                      attribute: '1263771488998473730',
                      approvers: [
                        {
                          workNo: '0013',
                          name: '康儒',
                          userId: '1263771488998473730',
                          id: '1252523599903072258_1263771488998473730',
                          type: 'user'
                        }
                      ],
                      assigneeType: 'user',
                      formOperates: [],
                      counterSign: true,
                      optionalMultiUser: false,
                      optionalRange: 'USER'
                    },
                    nodeId: 'ob2',
                    prevId: 'mb2'
                  }
                }
              ]
            },
            {
              type: 'condition',
              content: '[我付多少钱 = 0] \n',
              properties: {
                title: '条件2',
                conditions: [
                  {
                    vModel: 'field1',
                    type: 'number',
                    formId: 1,
                    defaultValue: { type: 'eq', value: 0 }
                  }
                ],
                initiator: null,
                priority: 1
              },
              nodeId: 'kb2',
              prevId: 'hb2'
            }
          ]
        }
        // if (typeof val === 'object' && val !== null) {
        //
        //   this.data = Object.assign(this.data, data)
        // }
        this.forceUpdate()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 给父级组件提供的获取流程数据得方法
    getData() {
      this.verifyMode = true
      if (NodeUtils.checkAllNode(this.data)) {
        return Promise.resolve({ formData: this.data })
      } else {
        return Promise.reject({ target: this.tabName })
      }
    },
    /**
     * 接收所有FlowCard事件触发
     * @param { Object } data - 含有event(事件名称)/args(参数)两个属性
     */
    eventReciver({ event, args }) {
      if (event === 'edit') {
        this.activeData = args[0] // 打开属性面板
        return
      }
      // 本实例只监听了第一层数据（startNode）变动
      // 为了实时更新  采用$forceUpdate刷新 但是由于某些条件下触发失效（未排除清除原因）
      // 使用key + 监听父组件updateId方式强制刷新
      NodeUtils[event](...args)
      this.forceUpdate()
    },

    forceUpdate() {
      this.updateId = this.updateId + 1
    },
    /**
     * 控制流程图缩放
     * @param { Object } val - 缩放增量 是step的倍数 可正可负
     */
    changeScale(val) {
      if (this.scaleVal > 0 && this.scaleVal < 200) {
        // 缩放介于0%~200%
        this.scaleVal += val
      }
    },
    /**
     * 属性面板提交事件
     * @param { Object } value - 被编辑的节点的properties属性对象
     */
    onPropEditConfirm(value, content) {
      this.activeData.content = content || '请设置条件'
      let oldProp = this.activeData.properties
      this.activeData.properties = value
      // 修改优先级
      if (NodeUtils.isConditionNode(this.activeData) && value.priority !== oldProp.priority) {
        NodeUtils.resortPrioByCNode(this.activeData, oldProp.priority, this.data)
        NodeUtils.setDefaultCondition(this.activeData, this.data)
      }
      if (NodeUtils.isStartNode(this.activeData)) this.$emit('startNodeChange', this.data)
      this.onClosePanel()
      this.forceUpdate()
    },
    /**
     * 属性面板取消事件
     */
    onClosePanel() {
      this.activeData = null
    },

    // 传formIds 查询指定组件 未传时  判断所有组件
    isFilledPCon(formIds) {
      let res = false
      const loopChild = (parent, callback) => parent.childNode && loop(parent.childNode, callback)
      const loop = (data, callback) => {
        if (res || !data) return // 查找到就退出
        if (Array.isArray(data.conditionNodes)) {
          const uesd = data.conditionNodes.some((c) => {
            const cons = c.properties.conditions || []
            return Array.isArray(formIds)
              ? cons.some((item) => formIds.includes(item.formId)) // 查询特定组件
              : cons.length > 0 // 只要有节点设置了条件 说明就有组件作为条件被使用
          })
          uesd ? callback() : data.conditionNodes.forEach((t) => loopChild(t, callback))
        }
        loopChild(data, callback)
      }
      loop(this.data, () => (res = true))
      return res
    }
  },
  render: function(h) {
    NodeUtils.globalID = NodeUtils.getMaxNodeId(this.data)
    return (
      <div class="flow-container">
        <div class="scale-slider">
          <i class="btn  el-icon-minus" onClick={this.changeScale.bind(this, -this.step)}></i>
          <span style="font-size:14px;">{this.scaleVal}%</span>
          <i class="btn  el-icon-plus " onClick={this.changeScale.bind(this, this.step)}></i>
        </div>
        <FlowCard
          verifyMode={this.verifyMode}
          key={this.updateId}
          data={this.data}
          onEmits={this.eventReciver}
          style={{ transform: `scale(${this.scaleVal / 100})` }}
        />
        <PropPanel
          value={this.activeData}
          processData={this.data}
          onConfirm={this.onPropEditConfirm}
          onCancel={this.onClosePanel}
        />
      </div>
    )
  }
}
</script>

<style scoped lang="stylus">
$bg-color = #f5f5f7;

.flow-container {
  display: inline-block;
  background: $bg-color;
  padding: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  overflow: auto;
}

.scale-slider {
  position: fixed;
  right: 0;
  z-index: 99;

  .btn {
    display: inline-block;
    padding: 4px;
    border: 1px solid #cacaca;
    border-radius: 3px;
    background: #FFF;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>

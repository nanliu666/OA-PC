<script>
/* eslint-disable no-unused-vars */
import FlowCard from './FlowCard/FlowCard.vue'
import PropPanel from './PropPanel/PropPanel.vue'
import { mapGetters } from 'vuex'
import { NodeUtils, getMockData } from './FlowCard/util.js'
const notEmptyArray = (arr) => Array.isArray(arr) && arr.length > 0
const hasBranch = (data) => notEmptyArray(data.conditionNodes)
const hasParallelBranch = (data) => notEmptyArray(data.parallelNodes)
export default {
  name: 'Process',
  props: ['tabName', 'conf'],
  data() {
    let processData = getMockData()
    return {
      processData, // 流程图数据
      scaleVal: 100, // 流程图缩放比例 100%
      step: 5, // 缩放步长
      updateId: 0, // key值 用于模拟$forceUpdate
      activeData: null, // 被激活的流程卡片数据，用于属性面板编辑
      isProcessCmp: true,
      verifyMode: false
    }
  },
  computed: {
    ...mapGetters(['fieldList'])
  },
  watch: {
    conf: {
      handler(val) {
        if (typeof val === 'object' && val !== null) {
          this.processData = Object.assign({}, JSON.parse(JSON.stringify(val)))
          this.processData.isShow === 0 && delete this.processData.isShow
        }
        this.forceUpdate()
      },
      immediate: true,
      deep: true
    },
    data: {
      handler(val) {},
      deep: true
    },
    fieldList: {
      handler(newVal, oldVal) {
        if (newVal.length === 0) return
        NodeUtils.initAllOperate(this.processData, this.fieldList)
      },
      deep: true
    }
  },
  methods: {
    getAllDode(data, allNode) {
      // 處理唯一id（遍歷）
      allNode.push(data.nodeId)
      if (hasBranch(data)) {
        data.conditionNodes.map((d, index) => {
          // allNode.push(d.nodeId)
          this.getAllDode(d, allNode)
        })
      }
      if (hasParallelBranch(data)) {
        data.parallelNodes.map((d, index) => {
          this.getAllDode(d, allNode)
        })
      }
      if (data.childNode) {
        return this.getAllDode(data.childNode, allNode)
      }
    },
    // 给父级组件提供的获取流程数据得方法
    getData() {
      this.verifyMode = true
      if (NodeUtils.checkAllNode(this.processData)) {
        return Promise.resolve({ formData: this.processData })
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
        this.$store.commit('updateProcessData', this.processData)
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
      let allNode = []
      this.getAllDode(this.processData, allNode)
      localStorage.setItem('allNode', JSON.stringify(allNode))
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
        NodeUtils.resortPrioByCNode(this.activeData, oldProp.priority, this.processData)
        NodeUtils.setDefaultCondition(this.activeData, this.processData)
      }
      if (NodeUtils.isStartNode(this.activeData)) this.$emit('startNodeChange', this.processData)
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
          const used = data.conditionNodes.some((c) => {
            const cons = c.properties.conditions || []
            return Array.isArray(c.conditionNodes)
              ? loop(c, callback)
              : Array.isArray(formIds)
              ? cons.some((item) => formIds.includes(item.formId)) // 查询特定组件
              : cons.length > 0 // 只要有节点设置了条件 说明就有组件作为条件被使用
          })
          used ? callback() : data.conditionNodes.forEach((t) => loopChild(t, callback))
        }
        loopChild(data, callback)
      }
      loop(this.processData, () => (res = true))
      return res
    }
  },
  render: function(h) {
    NodeUtils.globalID = NodeUtils.getMaxNodeId(this.processData)
    let allNode = []
    NodeUtils.getAllNode(allNode)
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
          data={this.processData}
          onEmits={this.eventReciver}
          style={{ transform: `scale(${this.scaleVal / 100})` }}
        />
        <PropPanel
          value={this.activeData}
          processData={this.processData}
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

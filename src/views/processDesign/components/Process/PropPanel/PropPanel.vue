<template>
  <div>
    <el-drawer
      v-if="properties"
      size="360px"
      class="drawer"
      :visible.sync="visible"
      :show-close="false"
      style="text-align:left;"
      @close="cancel"
    >
      <!-- 标题 -->
      <header
        v-if="value && value.type == 'start' && properties.title"
        slot="title"
        class="header"
      >
        {{ properties.title }}
      </header>
      <header
        v-else
        slot="title"
        class="header"
      >
        <span
          v-show="!titleInputVisible"
          style="cursor:pointer;color: #202940;font-size: 16px;"
          @click="titleInputVisible = true"
        >
          {{ properties.title }}
          <i class="el-icon-edit" />
        </span>
        <el-input
          v-show="titleInputVisible"
          v-model="properties.title"
          v-clickoutside="(_) => (titleInputVisible = false)"
          size="mini"
          style="z-index:9;max-width: 200px;"
        />
        <el-select
          v-if="isConditionNode()"
          v-model="properties.priority"
          size="mini"
          class="priority-select"
        >
          <el-option
            v-for="item in priorityLength"
            :key="item"
            :value="item - 1"
            :label="'优先级' + item"
          />
        </el-select>
      </header>

      <!-- 条件  -->
      <section
        v-if="value && isConditionNode()"
        class="condition-pane"
      >
        <row-wrapper
          v-if="showingPCons.includes(-1)"
          title="发起人"
        >
          <fc-org-select
            ref="condition-org"
            v-model="initiator"
            :tab-list="['user']"
          />
        </row-wrapper>
        <template v-for="(item, index) in pconditions">
          <!-- 计数 -->
          <row-wrapper
            v-if="
              couldShowIt(
                item,
                'el-input-number',
                'fc-date-duration',
                'fc-time-duration',
                'fc-amount',
                'fc-calculate',
                'number'
              )
            "
            :key="index"
            :title="item.__config__.label"
          >
            <num-input
              :key="index"
              v-model="item.__config__.defaultValue"
              :title="timeTangeLabel(item)"
              style="padding-right: 6px;"
            />
            <template v-slot:action>
              <i
                class="el-icon-delete"
                style="cursor: pointer;"
                @click="onDelCondition(item)"
              />
            </template>
          </row-wrapper>
          <!-- 单选组 -->
          <row-wrapper
            v-if="couldShowIt(item, 'el-radio-group', 'radio')"
            :key="index"
            :title="item.__config__.label"
          >
            <el-radio-group
              v-model="item.__config__.defaultValue"
              class="radio-group"
            >
              <el-radio
                v-for="item in item.__slot__.options"
                :key="item.label"
                :label="item.label"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
            <template v-slot:action>
              <i
                class="el-icon-delete"
                style="cursor: pointer;"
                @click="onDelCondition(item)"
              />
            </template>
          </row-wrapper>
          <!--        多选-->
          <row-wrapper
            v-if="couldShowIt(item, 'el-radio-group', 'checkbox')"
            :key="index"
            :title="item.__config__.label"
          >
            <el-checkbox-group v-model="item.__config__.defaultValue">
              <el-checkbox
                v-for="city in item.__slot__.options"
                :key="city.label"
                :label="city.label"
              >
                {{ city.label }}
              </el-checkbox>
            </el-checkbox-group>
            <template v-slot:action>
              <i
                class="el-icon-delete"
                style="cursor: pointer;"
                @click="onDelCondition(item)"
              />
            </template>
          </row-wrapper>
          <!-- 下拉 -->
          <row-wrapper
            v-if="couldShowIt(item, 'el-select', 'select')"
            :key="index"
            :title="item.label"
          >
            <el-select
              v-model="item.__config__.defaultValue"
              style="width: 280px"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in item.__slot__.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <template v-slot:action>
              <i
                class="el-icon-delete"
                style="cursor: pointer;"
                @click="onDelCondition(item)"
              />
            </template>
          </row-wrapper>
          <!-- 组织机构 -->
          <row-wrapper
            v-if="couldShowIt(item, 'fc-org-select')"
            :key="index"
            :title="item.label"
          >
            <fc-org-select
              :ref="'org' + index"
              v-model="item.__config__.defaultValue"
              :tab-list="['org']"
            />
            <template v-slot:action>
              <i
                class="el-icon-delete"
                style="cursor: pointer;"
                @click="onDelCondition(item)"
              />
            </template>
          </row-wrapper>
        </template>
        <div style="padding-left:24px;margin-top:2em;">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="dialogVisible = true"
          >
            添加条件
          </el-button>
          <span style="color:#aaa;margin-left:16px;">还有{{ notUseConNum }}个可用条件</span>
        </div>
      </section>

      <!-- 审批人 -->
      <section
        v-if="value && (isApproverNode() || isStartNode())"
        class="approver-pane"
        style="height:100%;"
      >
        <div class="tabs_div flex flex-center flex-align-items">
          <div
            :class="[activeName == 'config' ? 'active' : '']"
            @click="activeName = 'config'"
            v-html="'设置' + (value.type === 'approver' ? '审批人' : '发起人')"
          />
          <div
            :class="[activeName == 'formAuth' ? 'active' : '']"
            @click="activeName = 'formAuth'"
          >
            表单权限
          </div>
        </div>
        <div v-if="activeName == 'config'">
          <!-- 开始节点 -->
          <el-row
            v-if="value.type === 'start'"
            style="padding: 24px;"
          >
            <el-row>
              <el-col style="font-size: 14px;line-height: 30px">
                发起人
              </el-col>
            </el-row>

            <el-col :span="24">
              <fc-org-select
                ref="start-org"
                v-model="initiator"
                :all="all"
              />
            </el-col>
          </el-row>
          <div v-else-if="value.type === 'approver'">
            <div style="padding: 24px;">
              <el-radio-group
                v-model="approverForm.assigneeType"
                style="line-height: 32px;"
                @change="resetOrgColl"
              >
                <el-radio
                  v-for="item in assigneeTypeOptions"
                  :key="item.value"
                  :label="item.value"
                  :disabled="item.disabled"
                  class="radio-item"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </div>
            <div style="padding-bottom: 24px;">
              <div
                v-if="approverForm.assigneeType === 'myself'"
                class="option-box"
                style="color: #a5a5a5;"
              >
                发起人自己将作为审批人处理审批单
              </div>
              <div
                v-else-if="approverForm.assigneeType === 'optional'"
                class="option-box"
              >
                <p>设置选择条件</p>
                <el-radio-group v-model="approverForm.optionalMultiUser">
                  <el-radio :label="false">
                    自选一个人
                  </el-radio>
                  <el-radio :label="true">
                    自选多个人
                  </el-radio>
                </el-radio-group>
                <!--              <el-switch-->
                <!--                v-model="approverForm.optionalMultiUser"-->
                <!--                active-color="#13ce66"-->
                <!--              />-->

                <p>选择范围</p>
                <el-select
                  v-model="approverForm.optionalRange"
                  style="width: 312px"
                  size="medium"
                >
                  <el-option
                    v-for="(item, index) in rangeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
                <div style="margin-top: 15px">
                  <fc-org-select
                    ref="approver-org"
                    v-model="orgCollection"
                    button-type="button"
                    title="指定成员"
                    :tab-list="
                      fcOrgTabList.includes(approverForm.assigneeType)
                        ? [approverForm.assigneeType]
                        : ['dep']
                    "
                    @change="onOrgChange"
                  />
                </div>
              </div>
              <div v-else-if="approverForm.assigneeType === 'director'">
                <div style="font-size: 14px;padding-left: 24px;">
                  <el-row>
                    <el-col style="line-height: 30px">
                      发起人的
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-select
                        v-model="directorLevel"
                        style="width: 312px"
                        size="small"
                      >
                        <el-option
                          v-for="item in 5"
                          :key="item"
                          :label="item === 1 ? '直接主管' : `第${item}级主管`"
                          :value="item"
                        />
                      </el-select>
                    </el-col>
                  </el-row>

                  <br>
                  <!--                <el-checkbox v-model="useDirectorProxy">-->
                  <!--                  找不到主管时，由上级主管代审批-->
                  <!--                </el-checkbox>-->
                </div>
              </div>
              <div
                v-else
                class="option-box"
              >
                <fc-org-select
                  ref="approver-org"
                  v-model="orgCollection"
                  button-type="button"
                  :title="getAssignTypeLabel()"
                  :tab-list="
                    fcOrgTabList.includes(approverForm.assigneeType)
                      ? [approverForm.assigneeType]
                      : ['dep']
                  "
                  @change="onOrgChange"
                />
              </div>
            </div>
            <div
              v-if="
                (orgCollection[approverForm.assigneeType] &&
                  orgCollection[approverForm.assigneeType].length > 1) ||
                  (['optional'].includes(approverForm.assigneeType) &&
                    approverForm.optionalMultiUser)
              "
              class="option-box"
            >
              <p>多人审批时采用的审批方式</p>
              <el-radio
                v-model="approverForm.counterSign"
                :label="true"
                class="radio-item"
              >
                会签（须所有审批人同意）
              </el-radio>
              <br>
              <el-radio
                v-model="approverForm.counterSign"
                :label="false"
                class="radio-item"
              >
                或签（一名审批人同意或拒绝即可）
              </el-radio>
            </div>
          </div>
        </div>
        <div
          v-if="activeName == 'formAuth'"
          class="formAuth"
        >
          <div class="form-auth-table">
            <header class="auth-table-header">
              <div class="row">
                <div class="label">
                  表单字段
                </div>
                <el-radio-group
                  v-model="globalFormOperate"
                  class="radio-group"
                  @change="changeAllFormOperate"
                >
                  <el-radio
                    :label="2"
                    style="margin-left: 1rem;"
                  >
                    可编辑
                  </el-radio>
                  <el-radio :label="1">
                    只读
                  </el-radio>
                  <el-radio :label="0">
                    隐藏
                  </el-radio>
                </el-radio-group>
              </div>
            </header>
            <div class="auth-table-body">
              <div
                v-for="item in getFormOperates()"
                :key="item.formId"
                class="row"
              >
                <div class="label flex flex-center flex-align-items">
                  <span
                    v-show="item.required"
                    class="required"
                  >*</span>
                  <!--                                {{item.label}}-->
                  <el-tooltip
                    :content="item.label"
                    placement="right-end"
                    effect="dark"
                  >
                    <div
                      class="label"
                      v-html="item.label"
                    />
                  </el-tooltip>
                </div>
                <el-radio-group
                  v-model="item.formOperate"
                  class="radio-group"
                >
                  <el-radio
                    :label="2"
                    style="margin-left: 1rem;"
                  >
                    <span style="opacity: 0;">可编辑</span>
                  </el-radio>
                  <el-radio :label="1">
                    <span style="opacity: 0;">只读</span>
                  </el-radio>
                  <el-radio :label="0">
                    <span style="opacity: 0;">隐藏</span>
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        v-if="value && isCopyNode()"
        style="padding-left: 24px;"
      >
        <!--            <p style="margin-top:0;padding-top: 0;">抄送人</p>-->
        <fc-org-select
          ref="copy-org"
          v-model="members"
          :tab-list="['copy']"
          button-type="button"
          title="抄送人"
        />
        <br>
        <!--      <el-checkbox v-model="properties.userOptional">-->
        <!--        允许发起人自选抄送人-->
        <!--      </el-checkbox>-->
      </section>

      <el-dialog
        title="选择条件"
        :visible.sync="dialogVisible"
        width="500px"
        :append-to-body="true"
        custom-class="condition-dialog"
      >
        <div style="margin-bottom: 10px">
          请选择用来区分审批流程的条件字段
        </div>
        <el-checkbox-group v-model="showingPCons">
          <!-- 发起人默认就有 -->
          <el-checkbox
            v-if="showingPCons.includes(-1)"
            style="margin-bottom: 10px;"
            :label="-1"
          >
            发起人
          </el-checkbox>
          <el-checkbox
            v-for="(item, index) in pconditions"
            :key="index"
            style="margin-bottom: 10px;"
            class="flex justify-space-around"
            :label="item.__config__.formId"
          >
            {{ item.__config__.label }}
          </el-checkbox>
        </el-checkbox-group>

        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="medium"
            @click="dialogVisible = false"
          >
            取 消
          </el-button>
          <el-button
            size="medium"
            type="primary"
            @click="showCons()"
          >
            确 定
          </el-button>
        </div>
      </el-dialog>

      <div class="actions">
        <div class="flex flex-align-items flex-center">
          <el-button
            class="btn"
            size="small"
            type="primary"
            @click="confirm"
          >
            保存
          </el-button>
          <el-button
            class="btn"
            size="small"
            @click="cancel"
          >
            取消
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'
import { NodeUtils } from '../FlowCard/util.js'
import RowWrapper from './RowWrapper'
import NumInput from './NumInput'

const rangeType = {
  lt: '<',
  lte: '≤',
  gt: '>',
  gte: '≥',
  eq: '='
}
const defaultApproverForm = {
  approvers: [], // 审批人集合
  assigneeType: 'user', // 指定审批人
  formOperates: [], // 表单操作权限集合
  counterSign: true, //是否为会签
  // 审批类型为自选 出现 optionalMultiUser optionalRange
  optionalMultiUser: false,
  optionalRange: 'USER' // USER<最多十个> / ALL / ROLE
}
export default {
  directives: {
    Clickoutside
  },
  components: {
    'num-input': NumInput,
    'row-wrapper': RowWrapper
  },
  props: [/*当前节点数据*/ 'value', /*整个节点数据*/ 'processData'],
  data() {
    return {
      coms: [],
      all: true, //显示所有人
      members: {
        //抄送节点
        dep: []
      },
      formConf: {
        fields: []
      },
      fcOrgTabList: ['dep', 'role', 'user', 'position', 'optional'],
      visible: false, // 控制面板显隐
      globalFormOperate: null, // 统一设置节点表单权限
      titleInputVisible: false, // 是否显示标题输入框  startNode 不显示
      activeName: 'config', // or formAuth  Tab面板key
      showingPCons: [], // 用户选择了得条件  被选中的才会被展示在面板上编辑
      pconditions: [], // 从vuex中获取的可以作为流程图条件的集合
      dialogVisible: false, // 控制流程条件选项Dialog显隐
      // 当前节点数据
      properties: {},
      // 发起人  start节点和condition节点需要
      initiator: [],
      priorityLength: 0, // 当为条件节点时  显示节点优先级选项的数据
      orgCollection: {
        dep: [],
        role: [],
        user: [],
        position: [],
        optional: []
      },
      useDirectorProxy: true, // 找不到主管时 上级主管代理审批
      directorLevel: 1, // 审批主管级别
      startForm: {
        formOperates: []
      },
      approverForm: JSON.parse(JSON.stringify(defaultApproverForm)),

      optionalOptions: [
        {
          label: '自选一个人',
          value: false
        },
        {
          label: '自选多个人',
          value: true
        }
      ],
      rangeOptions: [
        {
          label: '指定成员',
          value: 'USER'
        }
      ],

      assigneeTypeOptions: [
        {
          label: '发起人自选',
          value: 'optional',
          disabled: false
        },
        {
          label: '上级领导',
          value: 'director',
          disabled: true
        },
        {
          label: '指定成员',
          value: 'user',
          disabled: false
        },

        {
          label: '指定职位',
          value: 'role',
          disabled: true
        },
        {
          label: '指定岗位',
          value: 'position',
          disabled: true
        },
        {
          label: '指定标签',
          value: 'myself',
          disabled: true
        }
      ]
    }
  },
  computed: {
    // 未使用的条件个数
    notUseConNum() {
      // 发起人是默认就有得  所以需要加 1
      return this.pconditions.length - this.showingPCons.length + 1
    },
    usedFormItems() {
      return this.$store.state.formItemList
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        this.approverForm = JSON.parse(JSON.stringify(defaultApproverForm)) // 重置数据为默认状态
        return
      }
      this.processData.properties.formOperates = this.initFormOperates(
        this.processData
      ).map((t) => ({ formId: t.formId, formOperate: t.formOperate }))
      this.isStartNode() && this.initStartNodeData()
      this.isApproverNode() && this.initApproverNodeData()
      this.isConditionNode() && this.initConditionNodeData()
    },

    value(newVal) {
      if (newVal && newVal.properties) {
        this.visible = true
        this.properties = JSON.parse(JSON.stringify(newVal.properties))
        if (this.properties) {
          NodeUtils.isConditionNode(newVal) && this.getPriorityLength()
        }
      }
    }
  },
  methods: {
    showCons() {
      this.formConf.fields = []
      this.pconditions &&
        this.pconditions.map((it) => {
          if (this.showingPCons.includes(it.__config__.formId)) {
            it.__pc__.span = 24
            this.formConf.fields.push(it)
          }
        })
      this.dialogVisible = false
    },
    sumbitForm() {
      // console.log(data)
    },
    getFormOperates() {
      let res = []
      this.isApproverNode() && (res = this.approverForm.formOperates)
      this.isStartNode() && (res = this.startForm.formOperates)
      return res
    },
    resetOrgColl() {
      for (let key in this.orgCollection) {
        this.$set(this.orgCollection, key, [])
      }
    },
    onOrgChange() {},
    timeTangeLabel(item) {
      const index = ['fc-time-duration', 'fc-date-duration'].findIndex((t) => t === item.tag)
      if (index > -1) {
        return '时长' + ['(小时)', '(天)'][index]
      } else {
        return item.label
      }
    },
    getAssignTypeLabel() {
      const res = this.assigneeTypeOptions.find((t) => t.value === this.approverForm.assigneeType)
      return res ? res.label : ''
    },
    changeAllFormOperate(val) {
      const target = this.isStartNode() ? this.startForm : this.approverForm
      target.formOperates.forEach((t) => (t.formOperate = val))
    },
    // 是否可以显示当前条件组件
    couldShowIt(item, ...tag) {
      return (
        tag.includes(item.__config__.type) && this.showingPCons.includes(item.__config__.formId)
      )
    },

    initFormOperates(target) {
      const formOperates = (target.properties && target.properties.formOperates) || []
      // 自定义组件不加入权限控制
      const res = []
      const defaultType = this.isApproverNode() ? 1 : 2 // 操作权限 0 隐藏 1 只读 2 可编辑
      const getPermissionById = (id) => {
        const permission = formOperates.find((t) => t.formId === id)
        return permission !== undefined ? permission.formOperate : defaultType
      }
      const format = (list, parentName = '') =>
        list.map((t) => {
          const data = {
            formId: t.formId,
            required: t.required,
            label: parentName ? [parentName, t.label].join('.') : t.label,
            formOperate: getPermissionById(t.formId)
          }
          res.push(data)
          Array.isArray(t.children) && format(t.children, t.label)
        })
      const formItems = this.$store.state.process.formItemList.filter((t) => t.cmpType !== 'custom')
      format(formItems)
      return res
    },

    initCopyNode() {
      this.properties = this.value.properties
    },

    initStartNodeData() {
      this.initInitiator()
      this.startForm.formOperates = this.initFormOperates(this.value)
    },

    copyNodeConfirm() {
      let attribute = []
      this.members['copy'].map((it) => {
        attribute.push(it.id.split('_')[1])
      })
      attribute = attribute.join(',')
      this.properties.attribute = attribute
      this.properties.members = this.members['copy']
      this.$emit('confirm', this.properties, this.getOrgSelectLabel('copy') || '发起人自选')
      this.visible = false
    },

    /**
     * 条件节点确认保存得回调
     */
    conditionNodeComfirm() {
      let nodeContent = ''
      const conditions = []
      this.showingPCons
        .map((fid) => this.pconditions.find((t) => t.__config__.formId === fid))
        .forEach((t) => {
          if (!t) return // 发起人条件时 t 为空 发起人在其他地方获取
          const cValue = t.__config__.defaultValue
          if (cValue === undefined || cValue === null) {
            return
          }
          const numberTypeCmp = [
            'el-input-number',
            'fc-date-duration',
            'fc-time-duration',
            'fc-amount',
            'fc-calculate',
            'number'
          ]
          const res = {
            vModel: t.__vModel__,
            type: t.__config__.type,
            formId: t.__config__.formId,
            defaultValue: cValue
          }
          if (t.__config__.type === 'radio') {
            res.val = ''
            t.__slot__.options.map((it) => {
              it.label === cValue && (res.val = it.value)
            })
          }
          if (numberTypeCmp.includes(t.__config__.type)) {
            if (cValue.type === 'bet') {
              const numVal = cValue.value
              nodeContent +=
                `[${numVal[0]} ${rangeType[numVal[1]]} ${t.__config__.label} ${
                  rangeType[numVal[2]]
                } ${numVal[3]}] ` + '\n'
            } else {
              nodeContent +=
                `[${t.__config__.label} ${rangeType[cValue.type]} ${cValue.value}] ` + '\n'
            }
          } else if (t.tag === 'fc-org-select') {
            const index = this.pconditions.findIndex((p) => p.formId === t.formId)
            const labels = this.$refs['org' + index][0].selectedLabels
            nodeContent += `[${t.label} = ${labels}] ` + '\n'
          } else {
            nodeContent += `[${t.__config__.label} = ${cValue}] ` + '\n'
          }
          conditions.push(res)
        }, [])

      this.properties.conditions = conditions
      // 发起人虽然是条件 但是这里把发起人放到外部单独判断
      this.properties.initiator = this.initiator['user']
      this.initiator['user'] &&
        this.initiator['user'].length > 0 &&
        (nodeContent = `[发起人: ${this.getOrgSelectLabel('condition')}]` + '\n' + nodeContent)
      this.$emit('confirm', this.properties, nodeContent || '请设置条件')
      this.visible = false
    },

    getOrgSelectLabel(type) {
      return this.$refs[type + '-org'] ? this.$refs[type + '-org']['selectedLabels'] : ''
    },
    /**
     * 开始节点确认保存
     */
    startNodeComfirm() {
      this.properties.initiator = this.initiator
      const formOperates = this.startForm.formOperates.map((t) => ({
        formId: t.formId,
        formOperate: t.formOperate
      }))
      Object.assign(this.properties, { formOperates })
      this.$emit('confirm', this.properties, this.getOrgSelectLabel('start') || '所有人')
      this.visible = false
    },
    /**
     * 审批节点确认保存
     */
    approverNodeComfirm() {
      const assigneeType = this.approverForm.assigneeType
      let content = ''
      if (['myself'].includes(assigneeType)) {
        content = this.assigneeTypeOptions.find((t) => t.value === assigneeType).name
      } else if ('director' === assigneeType) {
        content = this.directorLevel === 1 ? '直接主管' : `第${this.directorLevel}级主管`
      } else {
        content = this.getOrgSelectLabel('approver')
      }
      const formOperates = this.approverForm.formOperates.map((t) => ({
        formId: t.formId,
        formOperate: t.formOperate
      }))
      this.approverForm.approvers = this.orgCollection[assigneeType]
      let attribute = []
      this.orgCollection[assigneeType] &&
        this.orgCollection[assigneeType].map((it) => {
          attribute.push(it.id.split('_')[1])
        })
      attribute = attribute.join(',')
      this.properties.attribute = attribute
      Object.assign(this.properties, this.approverForm, { formOperates })
      this.$emit('confirm', this.properties, content || '请设置审批人')
      this.visible = false
    },
    // 确认修改
    confirm() {
      this.isCopyNode() && this.copyNodeConfirm()
      this.isStartNode() && this.startNodeComfirm()
      this.isApproverNode() && this.approverNodeComfirm()
      this.isConditionNode() && this.conditionNodeComfirm()
    },
    // 关闭抽屉
    cancel() {
      setTimeout(() => {
        this.$emit('cancel')
        this.visible = false
      }, 0)
    },
    /**
     * 删除流程条件
     */
    onDelCondition(condition) {
      const index = this.showingPCons.findIndex((id) => id === condition.__config__.formId)
      if (index > -1) {
        this.showingPCons.splice(index, 1)
        this.pconditions.find((t) => t.formId === condition.formId).defaultValue = undefined
      }
    },
    // 配合getPriorityLength 获取前一个节点条件数组长度 用于设置优先级
    getPrevData() {
      return NodeUtils.getPreviousNode(this.value.prevId, this.processData)
    },
    // 用于获取节点优先级范围
    getPriorityLength() {
      this.priorityLength = this.getPrevData().conditionNodes.length
    },
    // 判断是否是条件节点
    isConditionNode() {
      return this.value ? NodeUtils.isConditionNode(this.value) : false
    },
    /** 判断是否是审批节点*/
    isApproverNode() {
      return this.value ? NodeUtils.isApproverNode(this.value) : false
    },

    isStartNode() {
      return this.value ? NodeUtils.isStartNode(this.value) : false
    },

    isCopyNode() {
      return this.value ? NodeUtils.isCopyNode(this.value) : false
    },

    initInitiator() {
      const initiator = this.value.properties && this.value.properties.initiator

      this.initiator = Array.isArray(initiator) ? initiator : []
    },
    /**
     * 初始化审批节点所需数据
     */
    initApproverNodeData() {
      for (const key in this.approverForm) {
        if (this.value.properties.hasOwnProperty(key)) {
          this.approverForm[key] = this.value.properties[key]
        }
      }
      const approvers = this.approverForm.approvers
      this.resetOrgColl()
      if (Array.isArray(this.approverForm.approvers)) {
        this.orgCollection[this.approverForm.assigneeType] = approvers
      }
      this.approverForm.formOperates = this.initFormOperates(this.value)
    },
    /**
     * 初始化条件节点数据
     */
    initConditionNodeData() {
      // 初始化条件表单数据
      this.showingPCons = []
      this.pconditions = []
      let nodeConditions = this.value.properties && this.value.properties.conditions
      this.pconditions = JSON.parse(JSON.stringify(this.$store.state.process.processConditions))
      this.initiator['user'] = this.value.properties.initiator
      if (Array.isArray(this.pconditions)) {
        let temp = undefined
        this.value.prevId === this.processData.nodeId && (this.showingPCons = [-1]) // 默认显示发起人
        this.pconditions.forEach((t) => {
          if (Array.isArray(nodeConditions)) {
            // if(nodeConditions.)
            const con = nodeConditions.find((item) => item.formId == t.__config__.formId)
            con &&
              con.defaultValue &&
              ((temp = con.defaultValue), this.showingPCons.push(t.__config__.formId))
          }

          this.$set(t.__config__, 'defaultValue', temp)
          t.__config__.type === 'checkbox' && this.$set(t.__config__, 'defaultValue', [])
        })
      }
    }
  }
}
</script>
<style lang="stylus">
.condition-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #eee;
  }
}
</style>
<style lang="stylus" scoped>
.drawer {
  font-size: 14px;
  color: #202940;

  >>> .el-drawer__header {
    margin-bottom: 0;
    /*border-bottom: 1px solid #c5c5c5;*/
    /*padding-bottom: 8px;*/
    padding: 24px;
  }

  >>> .el-drawer__body {
    padding-bottom: 60px;
    overflow: hidden;
  }

  .pane-tab {
    height: 100%;
  }

  .pane-tab >>> .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
  }

  >>> .el-tabs__item:focus {
    box-shadow: none !important;
  }

  >>> .el-tabs__header {
    margin-bottom: 0;
  }
}

.header {
  line-height: 28px;
}

.actions {
  position: absolute;
  bottom: 20px;
  left: 0;
  padding: 6px 12px;
  width: 100%;
  box-sizing: border-box;
  text-align: right;

  .btn {
    width: 84px;
  }
}

.radio-item {
  width: 110px;
  padding: 6px;
}

.priority-select {
  width: 118px;
  position: absolute;
  right: 26px;
}

.form-auth-table {
  font-size: 14px;
  margin-top: 24px;

  .auth-table-header {
    background: #fafafa;
    line-height: 40px;
  }

  .row {
    display: flex;
    align-items: center;
    line-height: 32px;
    padding: 8px 12px;
    border-bottom: 1px solid #efefef;

    &:hover {
      background: #f5f7fa;
    }

    .label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      .required {
        color: #f2725e;
      }
    }

    .radio-group {
      flex: 2;
      display: flex;
      justify-content: space-between;
    }
  }
}

.approver-pane {
  //  overflow-y: scroll;
  // overflow-x: hidden;

  .option-box {
    font-size 14px
    padding-left 24px
  }
}

.condition-pane {
  height: calc(100% -50px)
  ///*overflow scroll*/
}

.flex {
  display: flex;
  display: -webkit-flex;
  display: -ms-flex;
  display: -moz-flex;
  flex-flow: row nowrap;
}

.flex-center {
  justify-content: center;

}

.flex-align-items {
  align-items: center;
}

.tabs_div {
  margin: 0 auto;
  text-align center;
  border: 1px solid #C6CBCE;
  border-radius: 4px;
  width: 312px;

  > div {
    width: 156px;
    height: 34px;
    font-size: 14px;
    color: #202940;
    line-height: 34px;
    cursor: pointer;
  }

  .active {
    background: #207EFA;
    color: #FFFFFF;
  }
}

/deep/ .el-radio {
  color: #202940;
  cursor: pointer;
  margin-right: 30px;
}

.formAuth {
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 100px)
}
</style>

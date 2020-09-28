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
          title="发起部门"
        >
          <fc-org-select
            ref="condition-org"
            v-model="initiator"
            :tab-list="['user']"
            :org="org"
            :is-department="isDepartment"
          />
        </row-wrapper>
        <template v-for="(item, index) in pconditions">
          <!-- 计数 -->
          <row-wrapper
            v-if="
              couldShowIt(
                item,
                'daterange',
                'el-input-number',
                'fc-date-duration',
                'fc-time-duration',
                'fc-amount',
                'fc-calculate',
                'number'
              )
            "
            :key="index"
            :title="
              `${item.__config__.label}${item.__config__.type === 'daterange' ? '(时长/天)' : ''}`
            "
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
            <!-- 在这里设置多选的默认值 -->
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

          <!-- 日期选择器 -->
          <!-- <row-wrapper
            v-if="couldShowIt(item, 'daterange')"
            :key="index"
            :title="item.label"
          >
            {{ item.__config__.label }}
            <template v-slot:action>
              <i
                class="el-icon-delete"
                style="cursor: pointer;"
                @click="onDelCondition(item)"
              />
            </template>
          </row-wrapper> -->

          <!-- 下拉 -->
          <row-wrapper
            v-if="couldShowIt(item, 'el-select', 'select')"
            :key="index"
            :title="item.label"
          >
            <!-- 这里设置单选的默认值  -->
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

        <div v-show="activeName == 'config'">
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
                :tab-list="['user']"
                :all="all"
                :org="org"
                :type="type"
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
                v-else-if="approverForm.assigneeType === assigneeTypeObect.optional"
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
              <div v-else-if="approverForm.assigneeType === assigneeTypeObect.directorLevel">
                <div style="font-size: 14px;padding-left: 24px;">
                  <el-row>
                    <el-col style="line-height: 30px">
                      发起人的
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-select
                        v-model="infoForm.directorLevelId"
                        style="width: 312px"
                        size="small"
                      >
                        <el-option
                          v-for="item in ManageLevel"
                          :key="item.id"
                          :label="item.dictValue"
                          :value="item.dictKey"
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
              <div v-else-if="approverForm.assigneeType === assigneeTypeObect.job">
                <div style="padding-bottom: 24px;">
                  <commonForm
                    ref="jobData"
                    :model="infoForm"
                    :columns="jobData"
                  />
                </div>
              </div>
              <div v-else-if="approverForm.assigneeType === assigneeTypeObect.position">
                <commonForm
                  ref="positionData"
                  :model="infoForm"
                  :columns="positionData"
                />
              </div>
              <div v-else-if="approverForm.assigneeType === assigneeTypeObect.tag">
                <commonForm
                  ref="tagData"
                  :model="infoForm"
                  :columns="tagData"
                />
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
                  orgCollection[approverForm.assigneeType].length > 1 &&
                  !['optional'].includes(approverForm.assigneeType)) ||
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
          v-show="activeName == 'formAuth'"
          class="formAuth"
        >
          <div class="form-auth-table">
            <header class="auth-table-header">
              <div class="header-title">
                表单字段
              </div>
              <ul class="header-ul">
                <li
                  v-for="(item, index) in ['可编辑', '只读', '隐藏']"
                  :key="index"
                >
                  {{ item }}
                </li>
              </ul>
            </header>
            <div class="auth-table-body">
              <div
                v-for="(item, index) in properties.formOperates"
                :key="index"
                class="row"
              >
                <div class="label flex flex-center flex-align-items">
                  <span
                    v-show="item.required"
                    class="required"
                  >*</span>
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
                <el-tooltip
                  v-if="item.proCondition && isApproverNode()"
                  content="设置为条件后审批人将不能对这个字段进行编辑"
                  placement="right-end"
                  effect="dark"
                >
                  <div
                    class="label"
                    v-html="item.label"
                  />
                  <el-radio-group
                    v-model="item.formPrivilege"
                    class="radio-group"
                  >
                    <el-radio
                      :label="0"
                      disabled
                    >
                      <span style="display: none">可编辑</span>
                    </el-radio>
                    <el-radio
                      :label="1"
                      disabled
                    >
                      <span style="display: none">只读</span>
                    </el-radio>
                    <el-radio
                      :label="2"
                      disabled
                    >
                      <span style="display: none">隐藏</span>
                    </el-radio>
                  </el-radio-group>
                </el-tooltip>
                <el-radio-group
                  v-else
                  v-model="item.formPrivilege"
                  class="radio-group"
                  @change="$forceUpdate()"
                >
                  <el-radio :label="0">
                    <span style="display: none">可编辑</span>
                  </el-radio>
                  <el-radio :label="1">
                    <span style="display: none">只读</span>
                  </el-radio>
                  <el-radio :label="2">
                    <span style="display: none">隐藏</span>
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
        <fc-org-select
          ref="copy-org"
          v-model="members"
          :tab-list="['copy']"
          button-type="button"
          title="抄送人"
        />
        <br>
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
            v-if="isShowInitiator"
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
import { getOrgTreeSimple, getJob, getPosition, getTagList } from '@/api/org/org'
const notEmptyArray = (arr) => Array.isArray(arr) && arr.length > 0
const hasBranch = (data) => notEmptyArray(data.conditionNodes)
const rangeType = {
  lt: '<',
  lte: '≤',
  gt: '>',
  gte: '≥',
  eq: '='
}
// 默认表单模版
const defaultApproverForm = {
  approvers: [], // 审批人集合
  assigneeType: 'user', // 指定审批人
  formOperates: [], // 表单操作权限集合
  counterSign: true, //是否为会签
  // 审批类型为自选 出现 optionalMultiUser optionalRange
  optionalMultiUser: false,
  infoForm: {
    orgId: '', //部门
    jobId: '', //职位
    positionId: '', //岗位
    tagId: '', //标签
    directorLevelId: '1' //上级领导
  },
  optionalRange: 'USER' // USER<最多十个> / ALL / ROLE
}
import { mapGetters } from 'vuex'
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
      type: {
        istag: true,
        isposition: true
      },
      isValid: false,
      infoForm: {
        orgId: '',
        jobId: '',
        positionId: '',
        tagId: '',
        directorLevelId: '1'
      },
      tagData: [
        {
          span: 20,
          offset: 2,
          prop: 'tagId',
          options: [],
          itemType: 'select',
          clearable: true,
          label: '请选择标签',
          props: {
            label: 'name',
            value: 'id'
          },
          required: true
        }
      ],
      positionData: [
        {
          span: 20,
          offset: 2,
          prop: 'positionId',
          options: [],
          itemType: 'select',
          label: '请选择岗位',
          clearable: true,
          props: {
            label: 'name',
            value: 'id'
          },
          required: true
        }
      ],
      jobData: [
        {
          span: 20,
          prop: 'orgId',
          itemType: 'treeSelect',
          label: '请选择部门',
          required: true,
          offset: 2,
          props: {
            selectParams: {
              placeholder: '请选择部门',
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
          span: 20,
          offset: 2,
          prop: 'jobId',
          options: [],
          clearable: true,
          itemType: 'select',
          label: '请选择职位',
          props: {
            label: 'name',
            value: 'id'
          },
          required: true
        }
      ],
      ManageLevel: [],
      isShowInitiator: false,
      org: true,
      isDepartment: true,
      coms: [],
      all: true, //显示所有人
      members: {
        //抄送节点
        dep: [],
        copy: []
      },
      formConf: {
        fields: []
      },
      fcOrgTabList: ['dep', 'user', 'optional'],
      visible: false, // 控制面板显隐
      titleInputVisible: false, // 是否显示标题输入框  startNode 不显示
      activeName: 'config', // or formAuth/config Tab面板key
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
          value: 'directorLevel',
          disabled: false
        },
        {
          label: '指定成员',
          value: 'user',
          disabled: false
        },

        {
          label: '指定职位',
          value: 'job',
          disabled: false
        },
        {
          label: '指定岗位',
          value: 'position',
          disabled: false
        },
        {
          label: '指定标签',
          value: 'tag',
          disabled: false
        }
      ],
      assigneeTypeObect: {
        optional: 'optional',
        directorLevel: 'directorLevel',
        user: 'user',
        job: 'job',
        position: 'position',
        tag: 'tag'
      }
    }
  },
  computed: {
    ...mapGetters(['fieldList']),
    // 未使用的条件个数
    notUseConNum() {
      // 发起人是默认就有得  所以需要加 1
      if (this.showingPCons.includes(-1)) {
        return this.pconditions.length - this.showingPCons.length + 1
      } else {
        return this.pconditions.length - this.showingPCons.length
      }
    }
  },
  watch: {
    'infoForm.orgId': {
      async handler(val) {
        if (val) {
          await this.getJobData()
          // 处理如果部门改变了。职位跟部门一起改变
          let job = this.jobData
            .find((it) => it.prop === 'jobId')
            .options.find((it) => it.id === this.infoForm.jobId)
          if (!job) {
            this.infoForm.jobId = ''
          }
        }
      },
      deep: true
    },
    processData: {
      handler() {},
      deep: true
    },
    visible(val) {
      if (!val) {
        this.approverForm = JSON.parse(JSON.stringify(defaultApproverForm)) // 重置数据为默认状态
        return
      }
      this.isStartNode() && this.initStartNodeData()
      this.isApproverNode() && this.initApproverNodeData()
      this.isConditionNode() && this.initConditionNodeData()
      this.isCopyNode && this.initCopyNodeData()
    },

    value(newVal) {
      if (newVal && newVal.properties) {
        this.visible = true
        this.properties = _.cloneDeep(newVal.properties)
        if (this.properties) {
          NodeUtils.isConditionNode(newVal) && this.getPriorityLength()
        }
        let formOperatesTemp = newVal.properties.formOperates
        // 每次点击节点人员，会重置当前表单权限
        this.properties.formOperates = []
        // 表单设计内容不为空，才会去赋值（vuex存）
        if (this.fieldList.length !== 0) {
          // 已存在表单权限
          if (this.isSameCondition(formOperatesTemp)) {
            // 未对其进行修改(通过比较formId实现)
            this.properties.formOperates = formOperatesTemp
          } else {
            // this.handlerFieldList(newVal, formOperatesTemp)
            this.properties.formOperates = NodeUtils.initAllOperate(newVal, this.fieldList)
          }
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('CommonDict', 'ManageLevel').then((res) => {
      this.ManageLevel = res
    })
    this.getOrgTree()
    this.getPositionData()
    this.getTagData()
  },
  methods: {
    isSameCondition(formOperatesTemp) {
      let fieldTempArr = []
      let operateArr = []
      this.fieldList.map((item) => {
        fieldTempArr.push(item.__config__.formId)
      })
      formOperatesTemp.map((item) => {
        operateArr.push(item.formId)
      })
      return _.isEqual(operateArr, fieldTempArr)
    },
    valid() {
      const assigneeType = this.approverForm.assigneeType
      let refsForm = {
        tag: ['tagData'],
        position: ['positionData'],
        job: ['jobData']
      }
      if (!refsForm[assigneeType]) return
      return Promise.all(
        refsForm[assigneeType].map((it) => {
          return new Promise((resolve, reject) => {
            this.$refs[it]
              .validate()
              .then(() => {
                this.isValid = true
                resolve(true)
              })
              .catch(() => {
                this.isValid = true
                reject(false)
              })
          })
        })
      ).then(() => {})
    },
    /**
     *
     * @author guanfenda
     * @desc 获取标签
     *
     * */
    getTagData() {
      getTagList().then((res) => {
        this.tagData.find((it) => it.prop === 'tagId').options = res
      })
    },
    /**
     *  @author guanfenda
     *
     * */
    getPositionData() {
      getPosition().then((res) => {
        this.positionData.find((it) => it.prop === 'positionId').options = res
      })
    },
    /**
     * @author guanfenda
     * @desc 根据部门id获取职位
     *
     * */
    getJobData() {
      let params = {
        orgId: this.infoForm.orgId
      }
      return new Promise((resolve, reject) => {
        getJob(params)
          .then((res) => {
            this.jobData.find((it) => it.prop === 'jobId').options = res
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    /**
     * @author guanfenda
     * @desc 获取部门
     *
     * */
    getOrgTree() {
      getOrgTreeSimple({ parentOrgId: '0' }).then((res) => {
        this.jobData.find((item) => item.prop === 'orgId').props.treeParams.data = res
      })
    },
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
    sumbitForm() {},
    resetOrgColl(data) {
      let list = ['directorLevel', 'job', 'position', 'tag']
      if (list.includes(data)) {
        this.approverForm.counterSign = null
      }
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
    // 是否可以显示当前条件组件
    couldShowIt(item, ...tag) {
      return (
        tag.includes(item.__config__.type) && this.showingPCons.includes(item.__config__.formId)
      )
    },

    initStartNodeData() {
      this.initInitiator()
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
      let isTip = false
      this.showingPCons
        .map((fid) => this.pconditions.find((t) => t.__config__.formId === fid))
        .forEach((t) => {
          if (!t) return // 发起人条件时 t 为空 发起人在其他地方获取
          const cValue = t.__config__.defaultValue
          if (cValue === undefined || cValue === null) {
            return
          }
          const numberTypeCmp = [
            'daterange', // 日期类型作为数字处理
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
          } else if (t.__config__.type === 'checkbox') {
            res.val = []
            t.__slot__.options.map((it) => {
              cValue.includes(it.label) && res.val.push(it.value)
            })
          }
          if (t.__config__.type === 'checkbox') {
            res.val = t.__config__.defaultValue
            // TODO: 添加
          }
          if (numberTypeCmp.includes(t.__config__.type)) {
            if (cValue.type === 'bet') {
              if (!(cValue.value[0] <= cValue.value[3])) {
                this.$message.error(`${t.__config__.label} 第一个值应该小于等于第二个值`)
                isTip = true
                return
              }
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
      if (isTip) {
        //如果条件是数字条件是两者之间，要前者小于等于后者
        return
      }
      this.properties.conditions = conditions
      // 发起人虽然是条件 但是这里把发起人放到外部单独判断
      this.properties.initiator = this.initiator['user']
      this.initiator['user'] &&
        this.initiator['user'].length > 0 &&
        (nodeContent = `[发起人: ${this.getOrgSelectLabel('condition')}]` + '\n' + nodeContent) &&
        this.initiator['user'].map((it) => {
          it.children && delete it.children
          it.users && delete it.users
        })
      ;(this.properties.conditions &&
        this.properties.conditions.length > 0 &&
        delete this.properties.isDefault) ||
        (this.properties.initiator &&
          this.properties.initiator.length > 0 &&
          delete this.properties.isDefault)
      !this.showingPCons.includes(-1) &&
        this.properties.initiator &&
        this.properties.initiator.length > 0 &&
        ((this.properties.initiator = null), (nodeContent = null))
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
      this.properties.initiator = this.initiator['user']
      this.$emit('confirm', this.properties, this.getOrgSelectLabel('start') || '所有人')
      this.visible = false
    },
    /**
     * 审批节点确认保存
     */
    async approverNodeComfirm() {
      await this.valid()
      // if(!this.isValid) return
      const assigneeType = this.approverForm.assigneeType
      let content = ''
      if (this.assigneeTypeObect.position === assigneeType) {
        let positionName = ''
        let options = this.positionData.find((it) => it.prop === 'positionId').options
        options.map((it) => {
          it.id === this.infoForm.positionId && (positionName = it.name)
        })
        content = '岗位 = ' + positionName
      } else if (this.assigneeTypeObect.tag === assigneeType) {
        let tagName = ''
        let options = this.tagData.find((it) => it.prop === 'tagId').options
        options.map((it) => {
          it.id === this.infoForm.tagId && (tagName = it.name)
        })
        content = '标签 = ' + tagName
      } else if (this.assigneeTypeObect.job === assigneeType) {
        let jobName = ''
        let options = this.jobData.find((it) => it.prop === 'jobId').options
        options.map((it) => {
          it.id === this.infoForm.jobId && (jobName = it.name)
        })
        content = '职位 = ' + jobName
      } else if (this.assigneeTypeObect.directorLevel === assigneeType) {
        this.ManageLevel.map((item) => {
          if (item.dictKey === this.infoForm.directorLevelId) {
            content = item.dictValue
          }
        })
      } else {
        content = this.getOrgSelectLabel('approver')
      }
      let infoFormKeys = Object.keys(this.infoForm)
      infoFormKeys.map((it) => {
        if (it !== 'orgId' && `${assigneeType}Id` !== it) {
          this.infoForm[it] = null
        }
      })

      !this.infoForm.jobId && (this.infoForm.orgId = null)
      this.approverForm.infoForm = JSON.parse(JSON.stringify(this.infoForm))

      this.approverForm.approvers = this.orgCollection[assigneeType] //这里处理发起人自选和发起人及抄送人姓名等
      let attribute = []
      this.orgCollection[assigneeType] &&
        this.orgCollection[assigneeType].map((it) => {
          attribute.push(it.id.split('_')[1])
        })
      attribute = attribute.join(',')

      this.properties.attribute = attribute // 获取值（抄送人姓名等）
      this.approverForm.assigneeType === this.assigneeTypeObect.optional &&
        !this.approverForm.optionalMultiUser &&
        (this.approverForm.counterSign = null)

      if (
        this.approverForm.approvers &&
        this.approverForm.approvers.length.length < 2 &&
        this.approverForm.assigneeType !== this.assigneeTypeObect.optional
      ) {
        this.approverForm.counterSign = null
      }
      this.approverForm.formOperates = this.properties.formOperates
      Object.assign(this.properties, this.approverForm)
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
      this.initiator = Array.isArray(initiator) ? { user: initiator } : []
    },
    /**
     * 初始化审批节点所需数据
     */
    initApproverNodeData() {
      for (const key in this.approverForm) {
        if (this.value.properties.hasOwnProperty(key)) {
          this.approverForm[key] = this.value.properties[key]
        }
        if (key === 'infoForm') {
          this.infoForm = Object.assign(this.infoForm, this.value.properties[key])
        }
      }
      this.approverForm.counterSign =
        this.approverForm.counterSign === null ? true : this.approverForm.counterSign
      const approvers = this.approverForm.approvers
      this.resetOrgColl()
      if (Array.isArray(this.approverForm.approvers)) {
        this.orgCollection[this.approverForm.assigneeType] = approvers
      }
    },
    firstComdition(data, firstConditinoNode) {
      // 这里会查询第一个条件分支
      if (hasBranch(data)) {
        if (!firstConditinoNode.length > 0) {
          firstConditinoNode.push(data)
        }
      }
      if (data.childNode) {
        return this.firstComdition(data.childNode, firstConditinoNode)
      }
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
        this.value.prevId === this.processData.nodeId && (this.showingPCons = [-1]) //处理发起人子节点是条件。给他选择部门
        let firstConditinoNode = []
        this.firstComdition(this.processData, firstConditinoNode)
        if (!this.showingPCons.includes(-1)) {
          //处理发起人子节点是条件。给他选择部门
          firstConditinoNode[0].type === 'empty' && (this.showingPCons = [-1])
        }
        if (this.showingPCons.includes(-1)) {
          this.isShowInitiator = true
        } else {
          this.isShowInitiator = false
        }
        this.pconditions.forEach((t) => {
          if (Array.isArray(nodeConditions)) {
            // if(nodeConditions.)
            const con = nodeConditions.find((item) => item.formId == t.__config__.formId)
            con &&
              con.defaultValue &&
              ((temp = con.defaultValue), this.showingPCons.push(t.__config__.formId))
          }

          this.$set(t.__config__, 'defaultValue', temp)
          // fix undefined
          if (t.__config__.type === 'checkbox' && !temp) {
            this.$set(t.__config__, 'defaultValue', [])
          }
        })
      }
    },
    /**
     * @author guanfenda
     * @desc 初始发送人节点数据
     * */
    initCopyNodeData() {
      this.members.copy = []
      this.value.properties.members &&
        this.value.properties.members.length > 0 &&
        (this.members.copy = this.value.properties.members)
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
    padding-bottom: 0px;
    overflow: hidden;
    overflow-y: auto;
    margin-bottom: 60px;
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
  padding: 10px 24px;
  .auth-table-header {
    border-bottom: 1px solid #E3E7E9;
    line-height: 40px;
    font-size: 14px;
    font-weight: 550;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-title {
      flex: 1;
    }
    .header-ul {
      display: flex;
      width: 70%;
      align-items: center;
      justify-content: space-between;
    }
  }

  .row {
    display: flex;
    align-items: center;
    line-height: 32px;
    padding: 8px 0px;
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
      width: 70%;
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
  /*margin: 0 auto;*/
  text-align center;
  border: 1px solid #C6CBCE;
  border-radius: 4px;
  /*width: 312px;*/
    width :312px;
  margin-left :24px;
  > div {
    width: 312px;
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

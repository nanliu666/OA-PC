<template>
  <div class="Remind fill">
    <page-header title="人事提醒设置" />
    <el-alert
      style="margin-bottom: 16px"
      title="使用指南: 为人事事件设置特定的处理人，处理人将提前收到待办事项和消息通知，提高人事工作效率"
      type="info"
    />

    <basic-container block>
      <common-table
        :columns="tableColumns"
        :config="tableConfig"
        :data="tableData"
      >
        <template #personnelEvent="{row}">
          <div class="event">
            <span class="event__title">{{ row | title }}</span>
            <span class="event__description">{{ row | description }}</span>
          </div>
        </template>

        <template #executor="{row}">
          <div class="handler">
            <span class="handler__name">{{ _.get(row, 'executor.name', '') }}</span>
            <span class="handler__btn">
              <el-button
                type="text"
                @click="() => editInit({ type: row['personnelEvent'].type })"
              >
                <i class="icon-basics-edit-outlined" />
              </el-button>
            </span>
          </div>
        </template>
      </common-table>
    </basic-container>

    <el-dialog
      :before-close="editClose"
      :visible="editVisible"
      append-to-body
      class="edit"
      title="设置处理人"
      width="500px"
    >
      <common-form
        ref="form"
        :columns="formColumns"
        :model="form"
      >
        <template #userId>
          <lazy-select
            v-model="form.userId"
            :load="loadUsers"
            :option-props="{
              formatter: (item) => `${item.name}(${item.workNo})`,
              key: 'userId',
              value: 'userId'
            }"
            placeholder="请选择人员"
            searchable
          />
        </template>
      </common-form>

      <template #footer>
        <el-button
          size="medium"
          @click="editClose"
        >
          取 消
        </el-button>
        <el-button
          :loading="editSubmitting"
          size="medium"
          type="primary"
          @click="editSubmit"
        >
          确 定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { createRemindExecutor, getRemindExecutor } from '@/api/personnel/settings'
import { getWorklist } from '@/api/personnel/selectedPerson'

// 静态表格
const TABLE_CONFIG = {}

const TABLE_COLUMNS = [
  {
    label: '人事事件',
    minWidth: 200,
    prop: 'personnelEvent',
    slot: true
  },
  {
    label: '处理人',
    minWidth: 200,
    prop: 'executor',
    slot: true
  }
]
const TABLE_DATA = [
  {
    personnelEvent: {
      description: '对业务部门提交的招聘需求进行分配、变更等相关操作',
      title: '招聘需求管理',
      type: 'Recruitment'
    }
  },
  {
    personnelEvent: {
      description: '对待入职员工进行确认入职相关操作',
      title: '入职办理',
      type: 'Entry'
    }
  },
  {
    personnelEvent: {
      description: '对待离职员工进行确认离职相关操作',
      title: '离职办理',
      type: 'Leave'
    }
  }
]

const FORM_COLUMNS = [
  {
    itemType: 'slot',
    label: '处理人',
    options: [],
    prop: 'userId',
    required: true,
    span: 24
  }
]

export default {
  name: 'Remind',
  components: {
    LazySelect: () => import(/* webpackChunkName: "views" */ '@/components/lazy-select/lazySelect')
  },
  filters: {
    description: (row) => _.get(row, _.head(TABLE_COLUMNS).prop + '.description'),
    title: (row) => _.get(row, _.head(TABLE_COLUMNS).prop + '.title')
  },
  data() {
    return {
      form: {},
      editSubmitting: false,
      editVisible: false,
      formColumns: FORM_COLUMNS,
      tableColumns: TABLE_COLUMNS,
      tableConfig: TABLE_CONFIG,
      tableData: null
    }
  },

  watch: {
    form: {
      deep: true,
      handler() {
        this.$nextTick(() => this.$refs.form.clearValidate())
      }
    }
  },

  created() {
    getRemindExecutor().then((users) => {
      _.each(users, (user, i) => {
        TABLE_DATA[i].executor = user
      })
      this.tableData = TABLE_DATA
    })
  },
  methods: {
    editClose() {
      this.editVisible = false
    },
    editInit(data) {
      this.editVisible = true
      this.form = data
    },
    editSubmit() {
      this.$refs.form
        .validate()
        .then((form) => {
          this.editSubmitting = true
          createRemindExecutor(form)
            .then(() => {
              this.$message.success('提交成功')
              this.editClose()
            })
            .finally(() => (this.editSubmitting = false))
        })
        .catch(() => {})
    },
    loadUsers(params) {
      return getWorklist(params)
    }
  }
}
</script>

<style lang="sass">
.Remind
  .el-alert--info
    background: #edf8ff 100%
    border: 1px solid #73b9ff
    color: #0e001c
  .basic-container--block
    height: calc(100% - 92px - 52px)
    min-height: calc(100% - 92px - 52px)
  .handler
    &__btn
      i
        font-size: inherit
        margin-left: .5em
  .event
    display: flex
    flex-direction: column
    &__title
      color: #212A3F
      font-size: 14px
      font-style: normal
      font-weight: 400
      height: 20px
    &__description
      font-weight: 400
      font-style: normal
      font-size: 13px
      color: #A0A8AE
</style>

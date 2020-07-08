<template>
  <el-dialog
    title="添加分组"
    :visible="visible"
    width="600px"
    append-to-body
    :before-close="close"
    custom-class="group-edit-dialog"
  >
    <common-form
      ref="form"
      :model="form"
      :columns="form | formColumnsFilter"
    >
      <template #userId>
        <lazy-select
          v-model="form.userId"
          :load="loadUser"
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

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        @click="close"
      >取 消</el-button>
      <el-button
        :loading="submitting"
        size="medium"
        type="primary"
        @click="handleSubmit"
      >
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getUserWorkList } from '@/api/org/org'
import { modifyResignGroup, createResignGroup } from '@/api/personnel/settings'
import { mapGetters } from 'vuex'

// Org-部门负责人，User-指定人员，Job-指定职位
const TYPE_DICTIONARY = {
  Org: {
    label: '部门负责人',
    value: 'Org'
  },
  User: {
    label: '指定人员',
    value: 'User'
  }
  // Job: {
  //   label: '指定职位',
  //   value: 'Job'
  // }
}

// 表单配置
const FORM_COLUMNS = [
  {
    itemType: 'input',
    label: '分组名称',
    prop: 'name',
    required: true,
    span: 24
  },
  {
    itemType: 'radio',
    label: '交接人',
    options: [
      {
        label: '部门负责人',
        value: 'Org'
      },
      {
        label: '指定人员',
        value: 'User'
      }
    ],
    prop: 'type',
    required: true,
    span: 24
  },
  {
    itemType: 'slot',
    label: '请选择人员',
    prop: 'userId',
    placeholder: '请选择人员',
    required: true,
    span: 24
  }
]

export default {
  name: 'GroupEditDialog',
  components: {
    lazySelect: () => import('@/components/lazy-select/lazySelect')
  },
  filters: {
    formColumnsFilter(form) {
      let res = _(FORM_COLUMNS)
      switch (form.type) {
        case TYPE_DICTIONARY.User.value: {
          const VISIBLE_PROPS = ['name', 'type', 'userId']
          res = res.filter(({ prop }) => _.includes(VISIBLE_PROPS, prop))
          break
        }

        // 以下当作defalt处理
        // case TYPE_DICTIONARY.Job.value:
        case TYPE_DICTIONARY.Org.value:
        default: {
          const VISIBLE_PROPS = ['name', 'type']
          res = res.filter(({ prop }) => _.includes(VISIBLE_PROPS, prop))
          break
        }
      }
      return res.value()
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {},
      rules: {},
      typeDict: TYPE_DICTIONARY,
      submitting: false,
      orgOptions: {
        selectParams: {
          placeholder: '请选择组织',
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
      },
      jobList: []
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.$nextTick(() => this.$refs.form.clearValidate())
      }
    }
  },
  methods: {
    loadUser(params) {
      return getUserWorkList(params)
    },
    close() {
      this.clear()
      this.$emit('update:visible', false)
    },
    clear() {
      this.form = this.$options.data().form
      this.$refs['form'].clearValidate()
    },
    init(data) {
      // Object.assign(this.form, data)
      this.form = _.cloneDeep(data)
      this.$emit('update:visible', true)
    },
    handleSubmit() {
      this.$refs.form.validate().then(() => {
        let submitFunc = createResignGroup
        if (this.form.id) {
          submitFunc = modifyResignGroup
        }
        this.submitting = true
        submitFunc({ ...this.form, companyId: this.companyId })
          .then((res = {}) => {
            this.$message.success('操作成功')
            this.close()
            if (!this.form.id && res.id) {
              this.$emit('submit', res.id)
            } else {
              this.$emit('submit')
            }
          })
          .finally(() => {
            this.submitting = false
          })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.group-edit-dialog {
  .el-select {
    width: 100%;
  }
  .el-dialog__body {
    padding: 24px;
  }
  .el-dialog__footer {
    padding: 0 24px 24px;
  }
  .el-dialog__header {
    padding: 24px 24px 10px;
  }
}
</style>

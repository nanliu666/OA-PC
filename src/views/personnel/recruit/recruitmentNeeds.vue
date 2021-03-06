<template>
  <div class="RecruitmentNeeds">
    <page-header
      title="新建招聘需求"
      show-back
    />
    <basic-container>
      <el-row
        type="flex"
        justify="center"
        style="padding-top:40px;"
      >
        <el-col
          :xl="16"
          :lg="16"
          :md="18"
          :sm="20"
          :xs="22"
        >
          <h4>招聘信息</h4>
          <common-form
            ref="form"
            :v-loading="loading"
            :model="form"
            :columns="columns"
          >
            <num-interval
              slot="minSalary"
              v-model="range"
            />
          </common-form>
          <appr-picker
            ref="apprPicker"
            :process-data="processData"
          />
          <div class="page-bottom">
            <el-button
              size="medium"
              @click="handleEditRole"
            >
              取消
            </el-button>
            <el-button
              type="primary"
              size="medium"
              :loading="loading"
              @click="handleSubmit"
            >
              提交
            </el-button>
          </div>
        </el-col>
      </el-row>
    </basic-container>
    <CancelEdit
      ref="cancelEdit"
      :visible.sync="dialogVisible"
      @isDoNotSave="isDoNotSave"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { submitEewly, getJobInfo, getPost } from '@/api/personnel/recruitment'
import { getOrgTreeSimple } from '@/api/org/org'
import { getRecruitmentDetail } from '@/api/personnel/recruitment'
import { getStaffBasicInfo } from '@/api/personalInfo'
import { Base64 } from 'js-base64'
import { getProcessDetail, getProcessIDByFormKey } from '@/api/apprProcess/apprProcess'
import apprPicker from '@/components/appr-picker/apprPicker'
import { FormKeysCN } from '@/const/approve'
export default {
  name: 'Newrequirement',
  components: {
    CancelEdit: () => import('@/views/personnel/recruit/components/modals/CancelEdit'),
    NumInterval: () => import('@/components/numInterval/numInterval'),
    apprPicker
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      personId: null,
      formKey: 'Recruitment',
      processData: null,
      processId: null,
      form: {
        companyId: null,
        companyName: null,
        orgId: null,
        jobId: null,
        needNum: 1,
        joinDate: null,
        requirement: null,
        duty: null,
        reason: null,
        reasonNote: null,
        remark: null,
        userId: null,
        minSalary: null,
        maxSalary: null
      },
      range: {
        min: '',
        max: ''
      },
      reasonNote: {
        span: 24,
        label: '原因补充说明',
        prop: 'reasonNote',
        itemType: 'input',
        type: 'textarea',
        maxlength: 200,
        showWordLimit: true
      },
      columns: [
        {
          prop: 'companyName',
          itemType: 'input',
          label: '申请公司',
          options: [],
          disabled: true,
          required: true,
          rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
          placeholder: '若为空请联系管理员'
        },
        {
          prop: 'orgId',
          itemType: 'treeSelect',
          label: '用人部门',
          props: {
            selectParams: {
              placeholder: '请选择用人部门',
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
          offset: 4,
          equired: true,
          rules: [{ required: true, message: '请选择用人部门', trigger: 'blur' }],
          placeholder: '请选择用人部门'
        },
        {
          prop: 'jobId',
          itemType: 'select',
          label: '职位',
          options: [],
          props: {
            label: 'jobName',
            value: 'jobId'
          },
          required: true,
          rules: [{ required: true, message: '请选择职位', trigger: 'blur' }],
          placeholder: '请优先选择合适的用人部门'
        },
        {
          offset: 4,
          prop: 'positionId',
          itemType: 'select',
          label: '岗位',
          options: [],
          props: {
            label: 'name',
            value: 'id'
          },
          placeholder: '请选择职位'
        },
        {
          prop: 'workProperty',
          itemType: 'select',
          label: '工作性质',
          options: [],
          props: {
            label: 'dictValue',
            value: 'dictKey'
          },
          required: true,
          rules: [{ required: true, message: '请选择工作性质', trigger: 'blur' }]
        },
        {
          itemType: 'inputNumber',
          label: '需求人数',
          min: 0,
          offset: 4,
          options: [],
          prop: 'needNum',
          props: { onlyNumber: true },
          required: true,
          rules: [{ required: true, message: '请输入需求人数', trigger: 'blur' }]
        },
        {
          prop: 'joinDate',
          itemType: 'datePicker',
          label: '到岗日期',
          options: [],
          required: true,
          rules: [{ required: true, message: '请选择到岗日期', trigger: 'blur' }]
        },
        {
          offset: 4,
          prop: 'emerType',
          itemType: 'select',
          label: '紧急程度',
          options: [],
          props: {
            label: 'dictValue',
            value: 'dictKey'
          },
          required: true,
          rules: [{ required: true, message: '请选择紧急程度', trigger: 'blur' }]
        },
        {
          prop: 'minSalary',
          itemType: 'slot',
          label: '薪酬范围',
          field: 'minSalary,maxSalary'
        },
        {
          offset: 4,
          prop: 'workYear',
          itemType: 'select',
          label: '工作年限',
          options: [],
          props: {
            label: 'dictValue',
            value: 'dictKey'
          }
        },
        {
          prop: 'educationalLevel',
          itemType: 'select',
          label: '学历要求',
          options: [],
          props: {
            label: 'dictValue',
            value: 'dictKey'
          }
        },
        {
          span: 24,
          label: '职位要求',
          prop: 'requirement',
          itemType: 'input',
          type: 'textarea',
          maxlength: 200,
          showWordLimit: true
        },
        {
          span: 24,
          label: '工作职责',
          prop: 'duty',
          itemType: 'input',
          type: 'textarea',
          maxlength: 200,
          showWordLimit: true
        },
        {
          span: 24,
          label: '招聘原因',
          prop: 'reason',
          itemType: 'radio',
          props: {
            label: 'dictValue',
            value: 'dictKey'
          },
          required: true,
          rules: [{ required: true, message: '请选择招聘原因', trigger: 'blur' }]
        },
        {
          span: 24,
          label: '申请理由',
          prop: 'remark',
          itemType: 'input',
          type: 'textarea',
          maxlength: 200,
          showWordLimit: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  watch: {
    'form.companyId'(companyId) {
      this.loadOrgData(companyId)
    },
    'form.orgId': function(val) {
      if (val) {
        this.form.jobId = null
        getJobInfo({ orgId: val }).then((res) => {
          this.columns.find((item) => item.prop === 'jobId').options = res
        })
        this.closeRules()
      }
    },
    'form.reason': function(val) {
      let indexOfNumr = this.columns.findIndex((item) => item.prop === 'reason') + 1
      if (val === 'Other') {
        this.columns.splice(indexOfNumr, 0, this.reasonNote)
      } else {
        //  清除页面表单不保留数据
        this.columns = this.columns.filter((item) => item.prop !== 'reasonNote')
      }
    }
  },
  async created() {
    this.getUseInformation()
    this.dictionaryGroup()
    await this.getPost()
    // this.loadOrgData()
    this.getProcessDetail()
  },

  activated() {
    if (this.$route.query.id) {
      this.ReplicationCache(this.$route.query.id)
    }
    this.getUseInformation()
  },
  methods: {
    // 通过formKey获取processId
    getProcessId() {
      return getProcessIDByFormKey({ formKey: this.formKey })
    },
    getProcessDetail() {
      this.getProcessId().then((res) => {
        this.processId = res.processId
        getProcessDetail({ processId: res.processId }).then((res) => {
          this.json = res.baseJson
          const obj = JSON.parse(Base64.decode(res.baseJson))
          if (typeof obj === 'object') {
            this.processData = obj.processData
          }
        })
      })
    },
    handleEditRole() {
      this.dialogVisible = true
    },
    handleSubmit() {
      Promise.all([this.$refs['form'].validate(), this.$refs['apprPicker'].validate()]).then(() => {
        this.closeRules()
        this.form.userId = this.userId
        this.form.minSalary = this.range.min
        this.form.maxSalary = this.range.max
        this.loading = true
        submitEewly(this.form).then((res) => {
          if (res && res.id) {
            this.$refs['apprPicker']
              .submit({
                formId: res.id,
                formKey: this.formKey,
                processName: FormKeysCN[this.formKey],
                processId: this.processId
              })
              .then(() => {
                this.loading = false
                this.$message({ type: 'success', message: '提交成功' })
                this.isDoNotSave()
                this.goBack()
              })
          }
        })
      })
    },
    loadOrgData(orgId) {
      if (_.isNil(orgId)) {
        orgId = '0'
      }
      getOrgTreeSimple({ parentOrgId: orgId }).then((res) => {
        // 过滤掉集团下面orgType为"Company“”的
        this.columns.find((item) => item.prop === 'orgId').props.treeParams.data = res
      })
    },
    dictionaryGroup() {
      // 需要向vuex请求的字典组数据
      const Dictionary = [
        { label: 'WorkProperty', prop: 'workProperty' },
        { label: 'EmerType', prop: 'emerType' },
        { label: 'WorkYear', prop: 'workYear' },
        { label: 'EducationalLevel', prop: 'educationalLevel' },
        { label: 'RecruitmentReason', prop: 'reason' }
      ]
      Dictionary.forEach((DictItem) => {
        this.$store.dispatch('CommonDict', DictItem.label).then((res) => {
          this.columns.find((item) => item.prop === DictItem.prop).options = res
        })
      })
    },
    getPost() {
      getPost().then((res) => {
        this.columns.find((item) => item.prop === 'positionId').options = res
      })
    },

    ReplicationCache(id) {
      getRecruitmentDetail(id).then((res) => {
        if (res && res.minSalary && res.maxSalary) {
          this.range.min = res.minSalary
          this.range.max = res.maxSalary
        }
        this.form = res
      })
    },

    getUseInformation() {
      if (this && this.userId) {
        getStaffBasicInfo({ userId: this.userId }).then((res) => {
          this.form.companyName = res.companyName
          this.form.companyId = res.companyId
          this.form.orgId = res.orgId
        })
      } else {
        this.$message({
          showClose: true,
          message: '当前员工尚未被公司认证 请联系管理员',
          type: 'warning'
        })
      }
    },
    goBack() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
    },
    isDoNotSave() {
      for (let key in this.form) {
        const allFruit = ['needNum', 'companyName']
        if (allFruit.includes(key)) {
          // 置空页面数据
        } else {
          this.form[key] = null
        }
      }
      this.closeRules()
    },
    // 关闭页面element表单校验
    closeRules() {
      setTimeout(() => {
        this.$refs['form'].clearValidate()
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-cascader,
.el-select {
  width: 100%;
}
.el-col {
  margin-bottom: 0;
}
.page-bottom {
  display: inline-block;
  padding-bottom: 20px;
}
.RecruitmentNeeds {
  /deep/ .el-input__count {
    transform: translate(25%, 100%);
    background: #0000;
  }
}
</style>

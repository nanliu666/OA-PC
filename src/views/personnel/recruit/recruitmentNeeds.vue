<template>
  <div style="height">
    <page-header
      title="新建招聘需求"
      class="pageHeader"
      show-back
    />
    <basic-container>
      <inputArray
        ref="personInfo"
        :info-form.sync="NewRequirement"
        :form.sync="infoForm"
      />

      <template style="margin: 0 auto;">
        <el-button
          size="medium"
          @click="dialogVisible = true"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          size="medium"
          @click="submitForm"
        >
          提交
        </el-button>
      </template>
    </basic-container>

    <!-- <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import InputArray from '@/views/personnel/candidate/components/inputArray'
import { NewRequirement } from '@/views/personnel/recruit/components/userInfo'
import { getStaffBasicInfo } from '@/api/personalInfo'
import { submitEewly, getJobInfo, getPost } from '@/api/personnel/recruitment'
import { mapGetters } from 'vuex'
import { getOrganizationCompany } from '@/api/personnel/roster'
export default {
  name: 'AddRoster',
  components: {
    InputArray
  },
  data() {
    return {
      NewRequirement,
      infoForm: {
        positionId: null,
        companyId: null,
        companyName: null,
        department: null,
        position: null,
        userId: '',
        workProperty: null,
        needNum: 1,
        emerType: null,
        minSalary: null,
        maxSalary: null,
        workYear: null,
        educationalLevel: null,
        requirement: null,
        reason: null,
        reasonNote: null,
        remark: null
      },
      rules: {
        company: [],
        department: [{ required: true, message: '请输入用人部门', trigger: 'blur' }],
        companyId: [{ required: true, message: '请选择入职公司', trigger: 'change' }],
        position: [{ required: true, message: '请选择职位', trigger: 'change' }],
        needNum: [{ required: true, message: '请输入人数', trigger: 'change' }],
        joinDate: [{ required: true, message: '请选择到岗日期', trigger: 'change' }],
        workProperty: [{ required: true, message: '请输入工作性质', trigger: 'change' }],
        emerType: [{ required: true, message: '请选择部门', trigger: 'change' }]
      },
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    this.getUseInformation()
    this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
      this.dataFilter(res, this.NewRequirement, 'workProperty', 'dictValue', 'dictKey')
    })

    this.$store.dispatch('CommonDict', 'RecruitmentReason').then((res) => {
      this.dataFilter(res, this.NewRequirement, 'RecruitmentReason', 'dictValue', 'dictKey')
    })

    this.$store.dispatch('CommonDict', 'workYear').then((res) => {
      this.dataFilter(res, this.NewRequirement, 'workYear', 'dictValue', 'dictKey')
    })
    this.$store.dispatch('CommonDict', 'EmerType').then((res) => {
      this.dataFilter(res, this.NewRequirement, 'EmerType', 'dictValue', 'dictKey')
    })

    this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
      this.dataFilter(res, this.NewRequirement, 'EducationalLevel', 'dictValue', 'dictKey')
    })
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          submitEewly().then(this.$message({ type: 'success', message: '操作成功' }))
        }
      })
    },
    dataFilter(res, form, props, label, value) {
      let index = ''
      let dict = []
      res &&
        res.map((it) => {
          dict.push({ label: it[label], value: it[value] })
        })
      form.basicAttrs.map((it, i) => {
        if (it.props === props) index = i
      })
      form.basicAttrs[index].value = dict
    },
    getUseInformation() {
      let params = {
        userId: this.userId
      }
      getStaffBasicInfo(params).then((res) => {
        this.infoForm.companyName = res.companyName
        this.infoForm.companyId = res.companyId
      })
      // 页面初始化
      getOrganizationCompany({ parentOrgId: 0 }).then((res) => {
        this.dataFilter(res, this.NewRequirement, 'orgId', 'orgName', 'orgId')
      })
      // 招聘职位
      getJobInfo({}).then((res) => {
        this.dataFilter(res, this.NewRequirement, 'jobId', 'jobName', 'jobId')
      })

      getPost().then((res) => {
        this.dataFilter(res, this.NewRequirement, 'positionId', 'name', 'id')
      })
    },
    handleClose() {},
    submitForm() {
      this.infoForm.userId = this.userId
      let parms = this.infoForm
      parms.needNum = this.infoForm.needNum * 1
      submitEewly(parms).then(() => {
        this.$message({ type: 'success', message: '操作成功!' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pageHeader {
  height: 48px;
  line-height: 48px;
  font-size: 18px;
}

/deep/ .el-card__body {
  padding: 100px !important;
}

.dialogForm {
  .el-form-item {
    .el-form-item__content {
      .el-cascader {
        width: 100%;
      }
    }
  }
}
.levelOptions {
  width: 6px;
  height: 6px;
  border-radius: 100px;
  color: blue;
}

/deep/ .el-radio-group {
  width: 100% !important;
}
</style>

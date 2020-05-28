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
    </basic-container>
  </div>
</template>

<script>
import InputArray from '@/views/personnel/candidate/components/inputArray'
import { NewRequirement } from '@/views/personnel/recruit/components/userInfo'
import { getStaffBasicInfo } from '@/api/personalInfo'
import { submitEewly } from '@/api/personnel/recruitment'
import { mapGetters } from 'vuex'
export default {
  name: 'AddRoster',
  data() {
    return {
      NewRequirement,
      infoForm: {
        companyId: null,
        department: null,
        position: null,
        post: null,
        entryDate: null,
        probation: null,
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
      workProperty: [],
      companyList: [],
      workPropertyList: [],
      emerTypeList: [],
      workYearList: [],
      recruitmentReasonList: [],
      jobList: [],

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
      positionList: [],
      workAddress: [],
      dialogTableVisible: false,
      loadAddress: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  components: {
    InputArray
  },
  mounted() {
    this.getDictionarygroup()
    this.getUseInformation()
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          submitEewly().then(this.$message({ type: 'success', message: '操作成功' }))
        }
      })
    },
    getDictionarygroup() {
      this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
        this.workPropertyList = res
      })

      this.$store.dispatch('CommonDict', 'EmerType').then((res) => {
        this.emerTypeList = res
      })

      this.$store.dispatch('CommonDict', 'workYear').then((res) => {
        this.workYearList = res
      })

      this.$store.dispatch('CommonDict', 'workYear').then((res) => {
        this.workYearList = res
      })
      this.$store.dispatch('CommonDict', 'RecruitmentReason').then((res) => {
        this.recruitmentReasonList = res
      })
    },
    getUseInformation() {
      let params = {
        userId: this.userId
      }
      getStaffBasicInfo(params).then(() => {})
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
/deep/ .el-col {
  .el-form-item {
    .el-form-item__content {
      width: 250px;
      .el-select {
        width: 250px;
      }
      .el-cascader {
        width: 250px;
      }
      .el-input-group--append {
        .el-input__inner {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
        .el-input-group__append {
          background-color: #fff;
          border: 0;
          padding: 0 10px;
          color: cornflowerblue;
          cursor: pointer;
        }
      }
    }
  }
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
</style>

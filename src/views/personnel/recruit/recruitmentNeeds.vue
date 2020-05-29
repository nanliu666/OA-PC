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
          @click="handleEditRole"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          size="medium"
          @click="handleTownext"
        >
          提交
        </el-button>
      </template>
    </basic-container>
    <cancel-edit
      ref="CancelEdit"
      :visible.sync="dialogVisible"
      @isDoNotSave="isDoNotSave"
    />
  </div>
</template>

<script>
import CancelEdit from '@/views/personnel/recruit/components/cancelEdit'
import InputArray from '@/views/personnel/candidate/components/inputArray'
import { NewRequirement } from '@/views/personnel/recruit/components/userInfo'
import { getStaffBasicInfo } from '@/api/personalInfo'
import { submitEewly, getJobInfo, getPost } from '@/api/personnel/recruitment'
import { mapGetters } from 'vuex'
import { getOrganizationCompany } from '@/api/personnel/roster'
export default {
  name: 'AddRoster',
  components: {
    InputArray,
    CancelEdit
  },
  data() {
    return {
      NewRequirement,
      infoForm: {
        positionId: null,
        companyId: null,
        companyName: null,
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
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  watch: {
    'infoForm.minSalary': function(newval, oldval) {
      if (newval != oldval) {
        this.contrastMaxMin(newval)
      }
    },
    'infoForm.reason': function(newval) {
      if (newval === 'Other') {
        this.$refs.personInfo.explainshow = true
      } else {
        this.$refs.personInfo.explainshow = false
      }
    }
  },
  mounted() {
    this.getUseInformation()
    this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
      this.dataFilter(res, this.NewRequirement, 'workProperty', 'dictValue', 'dictKey')
    })
    this.$store.dispatch('CommonDict', 'RecruitmentReason').then((res) => {
      this.dataFilter(res, this.NewRequirement, 'reason', 'dictValue', 'dictKey')
    })

    this.$store.dispatch('CommonDict', 'workYear').then((res) => {
      this.dataFilter(res, this.NewRequirement, 'workYear', 'dictValue', 'dictKey')
    })
    this.$store.dispatch('CommonDict', 'EmerType').then((res) => {
      this.dataFilter(res, this.NewRequirement, 'emerType', 'dictValue', 'dictKey')
    })
    this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
      this.dataFilter(res, this.NewRequirement, 'educationalLevel', 'dictValue', 'dictKey')
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
    contrastMaxMin(newval) {
      if (this.infoForm.maxSalary === '' || this.infoForm.maxSalary !== null) {
        if (this.infoForm.maxSalary < newval) {
          return this.$message({
            showClose: true,
            message: '请注意! 最大薪资不可小于最小薪资范围',
            type: 'error'
          })
        }
      }
    },
    handleTownext() {
      return Promise.all(
        ['personInfo'].map((it) => {
          return new Promise((resolve) => {
            let form = this.$refs[it].submitForm()
            resolve(form)
          })
        })
      ).then(() => {
        this.infoForm.userId = this.userId
        let params = this.infoForm
        this.contrastMaxMin(this.infoForm.minSalary)
        submitEewly(params).then(() => {
          this.$message({ type: 'success', message: '操作成功!' })
        })
      })
    },
    handleEditRole() {
      this.$refs.CancelEdit.init()
    },
    isDoNotSave() {
      for (let key in this.infoForm) {
        const allFruit = ['needNum', 'companyName']
        if (allFruit.includes(!key)) {
          this.infoForm[key] = null
        }
      }
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

/deep/ .v-modal {
  z-index: 100 !important;
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

<template>
  <div style="height">
    <page-header
      title="新建招聘需求"
      class="pageHeader"
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
          <inputArray
            ref="personInfo"
            :info-form.sync="NewRequirement"
            :form.sync="infoForm"
          />

          <h4>审批流程</h4>
          <el-form
            ref="apprForm"
            :model="infoForm"
            :rules="rules"
          >
            <el-form-item prop="apprProgress">
              <appr-progress
                ref="apprProgress"
                form-key="UserFormalInfo"
              />
            </el-form-item>
          </el-form>

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
        </el-col>
      </el-row>
    </basic-container>
    <cancel-edit
      ref="CancelEdit"
      :visible.sync="dialogVisible"
      @isDoNotSave="isDoNotSave"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { NewRequirement } from '@/views/personnel/recruit/components/userInfo'
import { getStaffBasicInfo } from '@/api/personalInfo'
import { submitEewly, getJobInfo, getPost } from '@/api/personnel/recruitment'
import { getOrganizationCompany } from '@/api/personnel/roster'
import { getRecruitmentDetail } from '@/api/personnel/recruitment'
export default {
  name: 'RecruitmentNeeds',
  components: {
    CancelEdit: () => import('@/views/personnel/recruit/details/cancelEdit'),
    InputArray: () => import('@/views/personnel/candidate/components/inputArray'),
    apprProgress: () => import('@/components/appr-progress/apprProgress')
  },
  data() {
    var checkAppr = (rule, value, callback) => {
      if (!this.$refs['apprProgress'].validate()) {
        callback(new Error('请选择审批人'))
      } else {
        callback()
      }
    }
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
      dialogVisible: false,
      rules: {
        apprProgress: [{ validator: checkAppr }]
      }
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
  activated() {
    if (typeof this.$route.query.id !== 'undefined') {
      this.ReplicationCache(this.$route.query.id)
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

    this.SaveState()
  },
  methods: {
    SaveState() {
      if (typeof this.$route.query.id !== 'undefined') {
        this.ReplicationCache(this.$route.query.id)
      }
    },
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
        this.$refs['apprForm'].validate((valid) => {
          if (valid) {
            this.infoForm.userId = this.userId
            this.contrastMaxMin(this.infoForm.minSalary)
            submitEewly(this.infoForm).then((res) => {
              if (res && res.id) {
                this.$refs['apprProgress'].submit(res.id).then(() => {
                  this.$message({ type: 'success', message: '提交成功' })
                  this.goBack()
                })
              }
            })
          }
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
    },
    ReplicationCache(id) {
      getRecruitmentDetail({ recruitmentId: id }).then((res) => {
        this.infoForm = res
      })
    },
    goBack() {
      this.isDoNotSave()
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
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

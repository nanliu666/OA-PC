<template>
  <div style="height">
    <page-header
      title="新建招聘需求"
      class="pageHeader"
      show-back
    />
    <basic-container v-loading="loading">
      <el-row
        type="flex"
        justify="center"
      >
        <el-col :span="14">
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
            label-position="top"
            :rules="rules"
            inline
          >
            <el-col :span="24">
              <h4>招聘信息</h4>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="申请公司"
                prop="company"
              >
                <el-input
                  :value="form.company"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="用人部门"
                prop="department"
              >
                <el-select
                  v-model="form.department"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in positionList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="职位"
                prop="position"
              >
                <el-select
                  v-model="form.position"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in positionList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位">
                <el-input
                  v-model="form.post"
                  placeholder="请选择"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="工作性质"
                prop="workProperty"
              >
                <el-select
                  v-model="form.workProperty"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in workPropertyList"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="需求人数"
                prop="needNum"
              >
                <el-input-number
                  v-model="form.needNum"
                  controls-position="right"
                  :min="1"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="到岗日期"
                class="entryDate"
                prop="joinDate"
              >
                <el-date-picker
                  v-model="form.joinDate"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%;"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="紧急程度"
                prop="emerType"
              >
                <el-select
                  v-model="form.emerType"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in emerTypeList"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="薪酬范围">
                <el-row
                  :gutter="20"
                  type="flex"
                >
                  <el-col :span="14">
                    <el-input
                      v-model.number="form.minSalary"
                      placeholder="请输入"
                    />
                  </el-col>
                  <el-col :span="1">
                    至
                  </el-col>
                  <el-col :span="14">
                    <el-input
                      v-model.number="form.maxSalary"
                      placeholder="请输入"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="工作年限">
                <el-select
                  v-model="form.workYear"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in workYearList"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="学历要求">
                <el-select
                  v-model="form.educationalLevel"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in workYearList"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="职位要求">
                <el-input
                  v-model="form.requirement"
                  style="width: 300%;"
                  type="textarea"
                  placeholder="请输入内容"
                  maxlength="200"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="工作职责">
                <el-input
                  v-model="form.reason"
                  style="width: 300%;"
                  type="textarea"
                  placeholder="请输入内容"
                  maxlength="200"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="招聘原因">
                <el-radio-group
                  v-model="form.reason"
                  type="flex"
                >
                  <el-radio
                    v-for="item in workYearList"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey"
                  >
                    {{ item.dictValue }}
                  </el-radio>
                </el-radio-group>
                <el-input
                  v-model="form.reasonNote"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="申请理由">
                <el-input
                  v-model="form.remark"
                  style="width: 300%;"
                  type="textarea"
                  placeholder="请输入内容"
                  maxlength="200"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button
                  size="medium"
                  @click="submitAndCreate"
                >
                  取消
                </el-button>
                <el-button
                  type="primary"
                  size="medium"
                  @click="handleSubmit"
                >
                  保存
                </el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import { getStaffBasicInfo } from '@/api/personalInfo'
import { submitEewly } from '@/api/personnel/recruitment'
import { mapGetters } from 'vuex'
export default {
  name: 'AddRoster',
  data() {
    return {
      form: {
        company: null,
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
  mounted() {
    this.getDictionarygroup()
    this.getUseInformation()
  },
  methods: {
    handleCreateAddress() {},
    goBack() {
      this.$router.back(-1)
    },
    async submitAndCreate() {
      await this.onSubmit()
      Object.assign(this.$data.form, this.$options.data().form)
    },
    async handleSubmit() {
      await this.onSubmit()
      this.goBack()
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          submitEewly().then(this.$message({ type: 'success', message: '操作成功' }))
        }
        // const params = { ...this.form }
        // if (!params.probation) params.probation = 0
        // let inputValue = []
        // if (this.$refs.workProvinceArr.inputValue) {
        //   inputValue = this.$refs.workProvinceArr.inputValue.split(' / ')
        // }
        // params.workProvinceName = inputValue[0]
        // params.workCityName = inputValue[1]
        // params.workCountyName = inputValue[1]
        // params.workProvinceCode = params.workProvinceArr && params.workProvinceArr[0]
        // params.workCityCode = params.workProvinceArr && params.workProvinceArr[1]
        // params.workCountyCode = params.workProvinceArr && params.workProvinceArr[2]
        // params.subOrg = Array.from(new Set(params.subOrg))
        // params.subJob = Array.from(new Set(params.subJob))
        // this.loading = true
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

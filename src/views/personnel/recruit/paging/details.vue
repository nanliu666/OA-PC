<template>
  <div>
    <basic-container>
      <el-row
        type="flex"
        justify="center"
        style="padding-top:40px}"
      >
        <el-col
          :xl="16"
          :lg="16"
          :md="18"
          :sm="20"
          :xs="22"
        >
          <el-form
            ref="applyForm"
            :model="personnel"
            label-width="80px"
          >
            <el-row>
              <el-col :span="10">
                <el-form-item label="申请人">
                  <span class="distance">{{ personnel.userName }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="申请时间">
                  <span class="distance">
                    {{ personnel.createTime }}
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="申请公司">
                  <span class="distance">{{ personnel.companyName }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="用人部门">
                  <span class="distance">{{ personnel.orgName }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="职位">
                  <span class="distance">{{ personnel.jobName }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="岗位">
                  <span class="distance">{{ personnel.positionName }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="工作性质">
                  <span class="distance">{{ calWorkProperty(personnel.workProperty) }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="需求人数">
                  <span class="distance">{{ personnel.needNum }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="到岗日期">
                  <span class="distance">{{ personnel.joinDate }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="薪酬范围">
                  <span class="distance">
                    ￥{{ personnel.minSalary }} ~ ￥ {{ personnel.maxSalary }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="工作性质">
                  <span class="distance">{{ calWorkProperty(personnel.workProperty) }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="工作经验要求">
                  <span class="distance">{{ calWorkYear(personnel.workYear) }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="学历要求">
                  <span class="distance">{{
                    calEducationalLevel(personnel.educationalLevel)
                  }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="职位要求">
                  <span class="distance">
                    {{ personnel.requirement }}
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="工作职责">
                  <span class="distance">
                    {{ personnel.duty }}
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="招聘原因">
                  <span class="distance">{{ calReason(personnel.reason) }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="申请理由">
                  <span class="distance">
                    {{ personnel.remark }}
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
export default {
  name: 'Details',
  props: ['childData'],
  data() {
    return {
      personnel: {
        name: '',
        createTime: '',
        company: '',
        orgName: '',
        jobId: '',
        userName: ''
      },
      workProperty: [],
      workYear: [],
      reason: [],
      educationalLevel: []
    }
  },
  watch: {
    childData: function(newval) {
      this.init(newval)
    }
  },
  mounted() {
    this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
      this.workProperty = res
    })
    this.$store.dispatch('CommonDict', 'RecruitmentReason').then((res) => {
      this.reason = res
    })

    this.$store.dispatch('CommonDict', 'workYear').then((res) => {
      this.workYear = res
    })
    this.$store.dispatch('CommonDict', 'EmerType').then((res) => {
      this.emerType = res
    })
    this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
      this.educationalLevel = res
    })
  },
  methods: {
    init(newval) {
      this.personnel = newval
    },
    calWorkProperty(type) {
      let typeWord
      this.workProperty.forEach((item) => {
        if (item.dictKey === type) {
          typeWord = item.dictValue
        }
      })
      return typeWord
    },
    calWorkYear(type) {
      let typeWord
      this.workYear.forEach((item) => {
        if (item.dictKey === type) {
          typeWord = item.dictValue
        }
      })
      return typeWord
    },
    calReason(type) {
      let typeWord
      this.reason.forEach((item) => {
        if (item.dictKey === type) {
          typeWord = item.dictValue
        }
      })
      return typeWord
    },
    calEducationalLevel(type) {
      let typeWord
      this.educationalLevel.forEach((item) => {
        if (item.dictKey === type) {
          typeWord = item.dictValue
        }
      })
      return typeWord
    },
    calEmerType(type) {
      let typeWord
      this.emerType.forEach((item) => {
        if (item.dictKey === type) {
          typeWord = item.dictValue
        }
      })
      return typeWord
    }
  }
}
</script>

<style lang="scss" scoped>
.distance {
  margin-left: 10px;
}

/deep/ .el-form-item__label {
  width: 108px !important;
  text-align: left;
}
</style>

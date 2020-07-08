<template>
  <div>
    <page-header
      title="更改需求人数"
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
          <el-col>
            <el-alert
              title="更改需求人数将生成新的审批单进入「审批中」状态，现有招聘流程将不受影响"
              type="warning"
              :closable="false"
              show-icon
            />
          </el-col>
          <Overview :value="status | introProps" />

          <el-form
            ref="users"
            label-position="top"
            :rules="rules"
            :inline="true"
            :model="users"
          >
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item
                  label="您想将剩余需求总数更改为"
                  prop="changneedNum"
                >
                  <el-input-number
                    v-model="users.changneedNum"
                    size="medium"
                    controls-position="right"
                    :min="1"
                    :precision="0"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item
                  label="更改原因"
                  prop="changreason"
                >
                  <el-select
                    v-model="users.changreason"
                    size="medium"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in operatorTypeList"
                      :key="item.dictValue"
                      :label="item.dictValue"
                      :value="item.dictValue"
                    />
                  </el-select>
                </el-form-item>
                <h4>审批流程</h4>
                <el-form-item prop="apprProgress">
                  <appr-progress
                    ref="apprProgress"
                    form-key="RecruitmentChangeNum"
                  />
                </el-form-item>
              </el-col>
              <el-button
                size="medium"
                @click="resetForm()"
              >
                取消
              </el-button>
              <el-button
                type="primary"
                size="medium"
                @click="submitForm('users')"
              >
                提交
              </el-button>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRecruitmentDetail, getChange } from '@/api/personnel/recruitment'

const INTRODUCT_PROPS = [
  // 显示在<introduct/>中的属性 格式: ["prop", "label", {config}]
  ['jobName', '职位名称'],
  ['needNum', '需求总数'],
  ['entryNum', '已入职'],
  [
    '$_minus',
    '剩余需求总数',
    {
      handler: ({ needNum, entryNum }) =>
        _.isNumber(needNum - entryNum) ? needNum - entryNum : '-'
    }
  ]
]

export default {
  name: 'Chang',
  components: {
    Overview: () => import(/* webpackChunkName: "views" */ './Overview'),
    ApprProgress: () => import('@/components/appr-progress/apprProgress')
  },
  filters: {
    introProps: (data) => {
      if (_.isNull(data)) return []
      return _.map(INTRODUCT_PROPS, ([prop, label, config]) => {
        let res = { label, value: data[prop] }
        if (config && config.handler) {
          res.value = config.handler(data)
        }
        return res
      })
    }
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
      inputdisabled: true,
      status: null,
      users: {
        changneedNum: null,
        changreason: null
      },
      rules: {
        changneedNum: [{ required: true, message: '请您选择选择更改后的人数', trigger: 'chang' }],
        changreason: [{ required: true, message: '请您选择更改原因', trigger: 'blur' }],
        apprProgress: [{ validator: checkAppr }]
      },
      operatorTypeList: [
        {
          dictValue: '临时增加新任务'
        },
        {
          dictValue: '部门人手已足够'
        },
        {
          dictValue: '其它'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    getRecruitmentDetail(this.$route.query.id).then((res) => {
      this.users.changneedNum = res.needNum - res.entryNum
      this.status = res
    })
  },
  methods: {
    submitForm() {
      this.$refs['users'].validate((valid) => {
        if (valid) {
          getChange({
            recruitmentId: this.$route.query.id,
            userId: this.userId,
            changeNum: this.users.changneedNum,
            reason: this.users.changreason
          }).then((res) => {
            if (res && res.id) {
              this.$refs['apprProgress'].submit(res.id).then(() => {
                this.$message({ type: 'success', message: '提交成功' })
                this.goBack()
              })
            }
          })
        }
      })
    },
    resetForm() {
      this.users.needNum = ''
      this.users.changreason = ''
      this.goBack()
    },
    goBack() {
      this.$router.go(-1)
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  width: 48%;
}

.introduceP {
  margin-left: 92px;
  color: #207efa;
  height: 40px;
  font-size: 13px;
  line-height: 40px;
}

.isbox {
  color: #fff;
  width: 120px;
  height: 60px;
  font-size: 15px;
  line-height: 60px;
  background: #ccc;
  text-align: center;
}

.introduce {
  margin-left: 92px !important;
}

/deep/ .el-select--medium,
.el-input-number {
  width: 100% !important;
}
</style>

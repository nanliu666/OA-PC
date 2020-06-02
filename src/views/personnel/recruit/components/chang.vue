<template>
  <div>
    <page-header
      title="更改需求人数"
      class="pageHeader"
      show-back
    />
    <basic-container>
      <p class="introduceP">
        <i
          class="el-icon-warning-outline"
        />更改需求人数将生成新的审批单进入「审批中」状态，现有招聘流程将不受影响
      </p>
      <el-row
        :gutter="24"
        type="flex"
        class="introduce"
      >
        <div class="state">
          <div class="on">
            <div>
              销售经理
              <div class="bottomBox">
                职位名称
              </div>
            </div>
            <div>
              2020-02-12
              <div class="bottomBox">
                最迟到岗日期
              </div>
            </div>
            <div>
              特急
              <div class="bottomBox">
                紧急程度
              </div>
            </div>
            <div>
              20
              <div class="bottomBox">
                需求总数
              </div>
            </div>
            <div>
              10
              <div class="bottomBox">
                已入职
              </div>
            </div>
            <div>
              50%
              <div class="bottomBox">
                招聘进度
              </div>
            </div>
          </div>
        </div>
      </el-row>
      <el-form
        ref="users"
        label-position="top"
        :rules="rules"
        :inline="true"
        :model="users"
        class="demo-form-inline"
      >
        <el-row
          :gutter="24"
          style=" position: relative; left: 90px;"
        >
          <el-col :span="24">
            <el-form-item
              label="您想将剩余需求总数更改为"
              prop="taskNum"
            >
              <el-input-number
                v-model="users.taskNum"
                size="medium"
                type="textarea"
                :rows="2"
                placeholder="请输入"
                controls-position="right"
                :min="1"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item
              label="更改原因"
              prop="operatorType"
            >
              <el-select
                v-model="users.operatorType"
                size="medium"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in operatorTypeList"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
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
          </el-col>
        </el-row>
      </el-form>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { putTask } from '@/api/personnel/recruitment'
import { getStaffBasicInfo } from '@/api/personalInfo'
export default {
  name: 'Chang',
  data() {
    return {
      inputdisabled: true,
      users: {
        taskNum: '',
        operatorType: ''
      },
      rules: {
        operatorType: [{ required: true, message: '请您选择更改原因', trigger: 'blur' }],
        taskNum: [{ required: true, message: '请您输入更改原因', trigger: 'blur' }]
      },
      operatorTypeList: [
        {
          dictKey: 0,
          dictValue: '临时增加新任务'
        },
        {
          dictKey: 1,
          dictValue: '部门人手已足够'
        },
        {
          dictKey: 2,
          dictValue: '其它'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    let params = {
      userId: this.userId
    }
    getStaffBasicInfo(params).then(() => {})
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {}
          params.userId = this.userId
          params.operatorType = this.users.operatorType
          params.taskNum = this.users.taskNum
          putTask(params).then(() => {
            this.$message({ type: 'success', message: '操作成功' })
          })
          return this.resetForm()
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.users.taskNum = ''
      this.users.operatorType = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.pageHeader {
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  font-weight: bold;
}

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

.state {
  display: flex;
  margin-bottom: 10px;
  .on {
    flex: 4;
    border-radius: 4px;
    margin-right: 20px;
    display: flex;
    > div {
      flex: 1;
      text-align: center;
      height: 46px;
      margin: 30px 0;
      line-height: 46px;
      border-right: 1px solid #e3e7e9;
      .bottomBox {
        font-size: 12px;
        height: 2px;
        width: 90px;
        margin: 0 auto;
        color: #ccc;
      }
    }
    :last-of-type {
      border-right: 0;
    }
    .current {
      color: #207efa;
    }
  }
  .left {
    flex: 1;
    background: #ffffff;
    border-radius: 4px;
    > div {
      flex: 1;
      text-align: center;
      height: 46px;
      margin: 30px 0;
      line-height: 46px;
      cursor: pointer;
      .bottomBox {
        height: 2px;
        width: 68px;
        background: #207efa;
        margin: 0 auto;
        margin-top: 28px;
      }
    }
    .current {
      color: #207efa;
    }
  }
}
</style>

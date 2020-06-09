<template>
  <div>
    <page-header
      title="更改需求人数"
      class="pageHeader"
      show-back
    />
    <basic-container>
      <el-alert
        title="更改需求人数将生成新的审批单进入「审批中」状态，现有招聘流程将不受影响"
        type="warning"
        :closable="false"
        show-icon
      />
      <el-row
        type="flex"
        class="introduce"
      >
        <introduce />
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
            <el-form-item label="您想将剩余需求总数更改为">
              <el-input-number
                v-model="users.taskNum"
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
import { getStaffBasicInfo } from '@/api/personalInfo'
import Introduce from './introduce'
export default {
  name: 'Chang',
  components: {
    Introduce
  },
  data() {
    return {
      inputdisabled: true,
      users: {
        taskNum: '',
        operatorType: ''
      },
      rules: {
        operatorType: [{ required: true, message: '请您选择更改原因', trigger: 'blur' }]
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
          this.$message({
            showClose: true,
            message: '功能暂时没有支持请期待',
            type: 'warning'
          })
          // let params = {}
          // params.userId = this.userId
          // params.operatorType = this.users.operatorType
          // params.taskNum = this.users.taskNum
          // putTask(params).then(() => {
          //   this.$message({ type: 'success', message: '操作成功' })
          // })
          // return this.resetForm()
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
</style>

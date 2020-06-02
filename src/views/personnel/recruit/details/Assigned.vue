<template>
  <el-dialog
    title="分配招聘需求"
    :visible="visible"
    width="80%"
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <el-row
      type="flex"
      :gutter="52"
    >
      <el-col :span="8">
        <span class="demandSize"> 需求人数: {{ Totalnumberpeople }}</span>
      </el-col>
      <el-col :span="8">
        <span class="demandSize">
          已分配: <span id="assigned">{{ Assigned }}</span></span>
      </el-col>
      <el-col :span="8">
        <span class="demandSize">
          待分配: <span id="assigned">{{ Numberofpeople }}</span></span>
      </el-col>
    </el-row>

    <el-form
      ref="dynamicValidateForm"
      :model="dynamicValidateForm"
      class="textForm"
    >
      <el-row type="flex">
        <el-col :span="8">
          <span class="department">指定招聘人员</span>
        </el-col>
        <el-col :span="4">
          <span class="department">招聘任务</span>
        </el-col>
        <el-col :span="4">
          <span class="department">已入职</span>
        </el-col>
        <el-col :span="4">
          <span class="department">候选人</span>
        </el-col>
        <el-col :span="4">
          <span class="department">剩余任务</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            v-for="domain in dynamicValidateForm.users"
            :key="domain.key"
          >
            <el-row
              :span="24"
              :gutter="6"
              type="flex"
            >
              <el-col
                v-if="domain.Rendering === 'Rendering'"
                :span="8"
              >
                <el-select
                  v-model="domain.userId"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.name"
                    :label="item.name"
                    :value="item.userId"
                  />
                </el-select>
              </el-col>
              <el-col
                v-else
                :span="8"
              >
                <el-input
                  v-model="domain.name"
                  :disabled="domain.peopleDisabled"
                />
              </el-col>

              <el-col :span="4">
                <el-input
                  :value="domain.isTaskNum"
                  :disabled="domain.disabled"
                />
              </el-col>
              <el-col :span="4">
                <el-input
                  :value="domain.entryNum"
                  :disabled="domain.disabled"
                />
              </el-col>
              <el-col :span="4">
                <el-input
                  :value="domain.candidateNum"
                  :disabled="domain.disabled"
                />
              </el-col>
              <el-col :span="4">
                <!--     @change="handleChange" -->
                <el-input-number
                  v-model="domain.taskNum"
                  controls-position="right"
                  :min="1"
                  :max="Numberofpeople"
                />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button
          type="text"
          @click="addDomain"
        >
          <i class="el-icon-plus" />添加
        </el-button>
      </el-form-item>
    </el-form>
    <el-button
      size="medium"
      @click="handleClose"
    >
      取消
    </el-button>
    <el-button
      type="primary"
      size="medium"
      @click="onSubmitted"
    >
      确定
    </el-button>
  </el-dialog>
</template>

<script>
import { queryDistribution, putDistribution } from '@/api/personnel/recruitment'
import { getUserWorkList } from '@/api/org/org'
export default {
  name: 'Assigned',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recruitmentId: '',
      Totalnumberpeople: 25,
      Numberofpeople: 21,
      Assigned: 4,
      dynamicValidateForm: {
        users: [
          {
            name: '李嘉琪',
            isTaskNum: 1,
            peopleDisabled: true,
            disabled: true,
            entryNum: 3,
            candidateNum: 4,
            taskNum: 1
          }
        ]
      },
      options: []
    }
  },
  watch: {
    recruitmentId: function(newval, oldval) {
      if (newval !== oldval) {
        let itemArr = this.dynamicValidateForm.users.splice(0, 1)
        itemArr[0].userId = null
        this.dynamicValidateForm.users = itemArr
      }
    }
  },
  methods: {
    doNotSave() {
      this.$emit('isDoNotSave')
      this.$router.go(-1)
      return this.handleClose()
    },
    async init(row) {
      let { id } = row
      this.recruitmentId = id
      this.$emit('update:visible', true)
      await getUserWorkList({ pageNo: 1, pageSize: 15 }).then((res) => {
        this.options = res.data
      })
      this.queryData(this.recruitmentId)
    },
    queryData(mentId) {
      queryDistribution({ recruitmentId: mentId }).then((res) => {
        this.dynamicValidateForm.users = res.response
      })
    },

    handleClose() {
      this.$emit('update:visible', false)
    },
    addDomain() {
      this.calWhetherBeyond()
      this.dynamicValidateForm.users.push({
        userId: '',
        taskNum: 1,
        disabled: true,
        Rendering: 'Rendering'
      })
    },
    onSubmitted() {
      let accumulation = this.calWhetherBeyond()
      if (accumulation !== this.Numberofpeople) {
        this.$message({
          showClose: true,
          message: '请注意！分配需求人数要等与需求总人数',
          type: 'error'
        })
      } else {
        let parms = {}
        parms.recruitmentId = this.recruitmentId
        parms.users = this.dynamicValidateForm.users
        putDistribution(parms).then(() => {
          this.$message({ message: '操作成功', type: 'success' })
        })
      }
    },
    calWhetherBeyond() {
      var total = null
      this.dynamicValidateForm.users.forEach((item, index) => {
        this.dynamicValidateForm.users[index].operatorType = 'Update'
        total += item.taskNum
      })
      if (total > this.Numberofpeople) {
        this.$message({
          showClose: true,
          message: '请注意！ 需求总人数不能大于待分配人数',
          type: 'error'
        })
      }
      return total
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

/deep/ .el-dialog__header {
  border-bottom: 1px solid #ccc;
}

/deep/ .el-dialog__body {
  padding: 30px 35px;
}
.textForm {
  margin-top: 10px;
}
.demandSize {
  display: block;
  font-size: 12px;
  color: #718199;
  line-height: 18px;
  text-align: center;
}
#assigned {
  color: #1989fa;
}

.department {
  font-size: 14px;
  color: #212a3f;
  text-align: right;
  font-weight: 600;
}

.frame {
  border-right: 1px solid #ccc;
  margin-bottom: 20px;
}

.content {
  display: block;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #202940;
  line-height: 24px;
  margin-bottom: 10px;
  text-align: center;
}

/deep/ .el-input__inner {
  width: 100% !important;
}

/deep/ .el-select {
  width: 100% !important;
}
</style>

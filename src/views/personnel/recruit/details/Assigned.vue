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
                  <el-input
                    v-model="domain.personnel"
                    placeholder="姓名/工号"
                    @change="requeWorkList(5)"
                  >
                    <i
                      slot="prefix"
                      class="el-input__icon el-icon-search"
                      @click="requeWorkList(3)"
                    />
                  </el-input>
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
                <el-input-number
                  v-model="domain.taskNum"
                  controls-position="right"
                  :min="1"
                  :max="Numberofpeople"
                  @change="calWhetherBeyond"
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
            personnel: '',
            name: '',
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
      this.handleClose()
    },
    async init(row) {
      let { id, entryNum, needNum } = row
      this.recruitmentId = id
      this.Totalnumberpeople = needNum
      this.Assigned = entryNum
      this.Numberofpeople = needNum - entryNum
      this.$emit('update:visible', true)
      await this.requeWorkList()
      await this.queryData(this.recruitmentId)
    },
    requeWorkList(page) {
      getUserWorkList({ pageNo: 1, pageSize: page }).then((res) => {
        this.options = res.data
      })
    },
    queryData(mentId) {
      queryDistribution({ recruitmentId: mentId }).then((res) => {
        if (res.length !== 0) {
          res.forEach((item) => {
            item.peopleDisabled = true
            item.disabled = true
          })
          this.dynamicValidateForm.users = res
        }
      })
    },
    handleClose() {
      if (typeof this.dynamicValidateForm.users !== 'undefined') {
        let itemArr = this.dynamicValidateForm.users.splice(0, 1)
        itemArr[0].userId = null
        this.dynamicValidateForm.users = itemArr
      }
      this.$emit('update:visible', false)
    },
    addDomain() {
      this.calWhetherBeyond()
      // 判断当前请求返回数据是否有意义
      if (typeof this.dynamicValidateForm.users !== 'undefined') {
        this.dynamicValidateForm.users.push({
          userId: '',
          taskNum: 1,
          disabled: true,
          Rendering: 'Rendering'
        })
      } else {
        this.$message({
          showClose: true,
          message: '当前需求暂无可用员工, 请关闭重试',
          type: 'warning'
        })
        this.$emit('update:visible', false)
      }
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
        this.$emit('update:visible', false)
        this.$emit('getTableData')
      }
    },
    calWhetherBeyond() {
      var total = null
      if (typeof this.dynamicValidateForm.users !== 'undefined') {
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
}
</script>

<style lang="scss" scoped>
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

/deep/ .el-input__inner {
  width: 100% !important;
}

/deep/ .el-select {
  width: 100% !important;
}
</style>

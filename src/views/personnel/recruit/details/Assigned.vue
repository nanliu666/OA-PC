<template>
  <el-dialog
    title="重新分配招聘需求"
    :visible="visible"
    width="1200px"
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <el-row
      type="flex"
      :gutter="52"
    >
      <el-col :span="6">
        待分配: <span id="assigned">{{ Numberofpeople }}</span>
      </el-col>
      <!-- <el-col :span="8">
        <span class="demandSize">
          已分配: <span id="assigned">{{ Assigned }}</span></span>
      </el-col>
      <el-col :span="8">
        <span class="demandSize">
          待分配: <span id="assigned">{{ Numberofpeople }}</span></span>
      </el-col> -->
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

      <el-form-item
        v-for="domain in dynamicValidateForm.users"
        :key="domain.id"
      >
        <el-row
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
              :value="domain.olditem"
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
              :min="0"
              :max="Numberofpeople"
            />
          </el-col>
        </el-row>
      </el-form-item>
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
import { createUniqueID } from '@/util/util'
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
      jumpnot: null,
      recruitmentId: '',
      Totalnumberpeople: 0,
      Numberofpeople: 0,
      Assigned: 0,
      dynamicValidateForm: {
        users: [
          {
            id: createUniqueID(),
            personnel: '',
            name: '',
            peopleDisabled: true,
            disabled: true,
            entryNum: 0,
            candidateNum: 0,
            taskNum: 0
          }
        ]
      },
      options: []
    }
  },
  methods: {
    doNotSave() {
      this.$emit('isDoNotSave')
      this.$router.go(-1)
      this.handleClose()
    },
    async init(row) {
      let { id, entryNum, needNum, jumpnot } = row
      this.jumpnot = jumpnot
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
            item.olditem = item.taskNum
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
      if (this.jumpnot) {
        this.$emit('dataJump')
      }
    },
    addDomain() {
      if (
        this.dynamicValidateForm.users &&
        Object.keys(this.dynamicValidateForm.users).length === 0
      ) {
        this.$message({
          showClose: true,
          message: '当前需求暂无可用员工, 请关闭重试',
          type: 'warning'
        })
        this.$emit('update:visible', false)
      } else {
        this.dynamicValidateForm.users.push({
          userId: '',
          taskNum: 0,
          disabled: true,
          Rendering: 'Rendering'
        })
      }
    },
    calWhetherBeyond() {
      var total = null
      if (this.dynamicValidateForm.users) {
        this.dynamicValidateForm.users.forEach((item) => {
          total += item.taskNum
        })
        return total
      }
    },
    onSubmitted() {
      let total = this.calWhetherBeyond()
      if (total === this.Numberofpeople) {
        let parms = {}
        parms.recruitmentId = this.recruitmentId
        parms.users = this.dynamicValidateForm.users.map((item) => ({
          userId: item.userId,
          taskNum: item.taskNum,
          operatorType: this.calId(item.id)
        }))
        putDistribution(parms).then(() => {
          this.$message({ message: '操作成功', type: 'success' })
        })
        this.$emit('update:visible', false)
        this.$emit('getTableData')
      } else {
        this.$message({
          showClose: true,
          message: '请注意！分配需求人数要等与需求总人数',
          type: 'error'
        })
      }
    },
    calId(id) {
      if (id) {
        return 'Update'
      } else {
        return 'Add'
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
// .demandSize {
//   display: block;
//   font-size: 12px;
//   color: #718199;
//   line-height: 18px;
//   text-align: center;
// }
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
